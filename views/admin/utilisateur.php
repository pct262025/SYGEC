
<?php 
session_start();
require_once 'models/Utilisateur.php';
require_once 'utils/sendMail.php';

function redirectAfterDeleteParam ($param){
     // Supprimer 'valider' du tableau $_GET
    $params = $_GET;
    unset($params[$param]);

    // Reconstruire l'URL avec les autres paramètres
    $query = http_build_query($params);
    $url = strtok($_SERVER["REQUEST_URI"], '?');
    $newUrl = $url . ($query ? "?$query" : "");

    header("Location: $newUrl");
    exit;
}

function genererMotDePasse($longueur = 8) {
    $caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $motDePasse = '';
    $maxIndex = strlen($caracteres) - 1;

    for ($i = 0; $i < $longueur; $i++) {
        $indexAleatoire = random_int(0, $maxIndex);
        $motDePasse .= $caracteres[$indexAleatoire];
    }
    return $motDePasse;
}

function creer(){
    
    $nom = isset( $_POST['nom'] ) ? $_POST['nom'] : null;
    $prenom = isset( $_POST['prenom'] ) ? $_POST['prenom'] : null;
    $login = isset( $_POST['login'] ) ? $_POST['login'] : null;
    $email = isset( $_POST['email'] ) ? $_POST['email'] : null;
    $id_role = isset( $_POST['id_role'] ) ? $_POST['id_role'] : null;

    $mot_de_passe = genererMotDePasse();
    $final_mot_de_passe = password_hash($mot_de_passe, PASSWORD_DEFAULT);

    creerUtilisateur($nom, $prenom, $login, $email, $final_mot_de_passe, $id_role);
    
    sendPassword("{$nom} {$prenom}", $mot_de_passe, $email);

    header("Refresh: 0; url=" . strtok($_SERVER["PHP_SELF"], '?') . "?action=utilisateur");
}

function update(){
    
    $nom = isset( $_POST['nom'] ) ? $_POST['nom'] : null;
    $prenom = isset( $_POST['prenom'] ) ? $_POST['prenom'] : null;
    $login = isset( $_POST['login'] ) ? $_POST['login'] : null;
    $email = isset( $_POST['email'] ) ? $_POST['email'] : null;
    $id_role = isset( $_POST['id_role'] ) ? $_POST['id_role'] : null;
    $id_utilisateur = isset( $_POST['id_utilisateur'] ) ? $_POST['id_utilisateur'] : null;

    updateUtilisateur($nom, $prenom, $login, $email, $id_role, $id_utilisateur);
    header("Refresh: 0; url=" . strtok($_SERVER["PHP_SELF"], '?') . "?action=utilisateur");
}

if ( isset($_POST['action']) ){
    if ( $_POST['action'] == 'creer' ){
        creer();
    }else if ( $_POST['action'] == 'modifier' ){
        update();
    }
}
if ( isset($_GET["supprimer"]) && isset($_GET["id"]) ){
    var_dump($_GET);
    deleteUtilisateur($_GET["id"]);
    header("Refresh: 0; url=" . strtok($_SERVER["PHP_SELF"], '?') . "?action=utilisateur");
}

if ( isset($_GET['valider'])  ){
    validerDemande($_GET['valider']);
    
    redirectAfterDeleteParam('valider');
}
if ( isset($_GET['annuler'])  ){
    annulerDemande($_GET['annuler']);


    redirectAfterDeleteParam('annuler');
}

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">

    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/menu.css">
    <link rel="stylesheet" href="assets/css/footer.css">
    <link rel="stylesheet" href="assets/css/other_style.css">

    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    <style>
        /* div{
            border: 1px solid #aaa;
        } */

        .min-height-40vh {
            min-height: 40vh;
        }
        .asterisk-rouge{
            color: red;
        }

    </style>
</head>
<body>

<!-- start menu -->
<?php 
require_once 'views/menu.php'; 
?>
<!-- end menu -->

<div class="container-fluid">
    <div class="row">
        <!-- start sous-menu-admin -->
        <div class="col-2  min-height-80vh sous-menu-bg">
            
            <div class="row mt-5">
                <div id="demandes" class="fw-bold menu-principal col-12 menu-item ">
                    <span id="demandes-toggle-icon" class="icon">−</span> Gestion des demandes
                </div>
                <a href="#?action=traiterDemande" id="demandes-menu-actes-naissance" class="col-11 offset-1 menu-item text-dark annuler-text-decoration annuler-heritage-color-hover acte-naissance">Actes de naissance</a>
                <a href="#" id="demandes-menu-certification-nationalite" class="col-11 offset-1 text-dark menu-item annuler-text-decoration annuler-heritage-color-hover certificat">Certificat de Nationalité</a>
                <a href="#" id="demandes-menu-actes-mariage" class="col-11 offset-1 text-dark menu-item annuler-text-decoration annuler-heritage-color-hover acte-mariage">Actes de mariage</a>
            </div>
            <div class="row">
                <div id="users" class="fw-bold menu-principal col-12 menu-item ">
                    <span id="users-toggle-icon" class="icon">−</span> Gestion des utilisateurs
                </div>
                <a href="#" id="users-menu-utilisateur" class="col-11 offset-1 orange menu-item annuler-text-decoration annuler-heritage-color-hover utilisateur">Utilisateurs</a>
                <a href="#" id="users-menu-role" class="col-11 offset-1 text-dark menu-item annuler-text-decoration annuler-heritage-color-hover">Roles</a>
                <a href="#" id="users-menu-actions" class="col-11 offset-1 text-dark menu-item annuler-text-decoration annuler-heritage-color-hover">Actions</a>
            </div>

        </div>
        <!-- edn sous-menu-admin -->

        <!-- start tableau demande en attente de validation -->
        <div class="col">
            <div class="row d-flex justify-content-center ">
                <div class="col-11">

<?php 
$detail = false;
if ( isset($_GET["for"]) ) { 
    $detail = true;
    $info_utilisateur = isset($_GET['id']) ? unUtilisateur($_GET['id']) : [];
    if ( $info_utilisateur !== null ){
?>
<div class="row ">
    
    <hr>
    <form method="POST" action="#" class="col-8 offset-2 ombre min-height-40vh bg-white mt-5 mb-5 p-3 ">
        <h4 class="mb-0 mt-3"><?php echo isset($_GET['id']) ? "Modifier" : "Créer"; ?> un utilisateur</h4>
        <hr>


        <label for="nom">Nom</label> <span class="asterisk-rouge">*</span>
        <input class="form-control mt-1 mb-3" name="nom" type="text" placeholder="Le nom" required value="<?php echo isset($info_utilisateur['nom']) ? $info_utilisateur['nom'] : ""; ?>" >
    
        <label for="prenom">Prénoms</label> <span class="asterisk-rouge">*</span>
        <input class="form-control mt-1 mb-3" name="prenom" type="text" placeholder="Les prénoms" required value="<?php echo isset($info_utilisateur['prenom']) ? $info_utilisateur['prenom'] : ""; ?>" >
    
        <label for="login">Login</label> <span class="asterisk-rouge">*</span>
        <input class="form-control mt-1 mb-3" name="login" type="text" placeholder="Le login" required value="<?php echo isset($info_utilisateur['login']) ? $info_utilisateur['login'] : ""; ?>" >
    
        <label for="email">Email</label> <span class="asterisk-rouge">*</span>
        <input class="form-control mt-1 mb-3" name="email" type="text" placeholder="Le email" required value="<?php echo isset($info_utilisateur['email']) ? $info_utilisateur['email'] : ""; ?>" >
    
        <label for="id_role">Role</label> <span class="asterisk-rouge">*</span>
        <select class="form-control" id="id_role" name="id_role" required value="<?php echo isset($info_utilisateur['id_role']) ? $info_utilisateur['id_role'] : ""; ?>" >
            <option <?php echo !isset($info_utilisateur['id_role']) ? "selected" : "" ?> >Choisir...</option>
            <option value="2" <?php echo isset($info_utilisateur['id_role']) && $info_utilisateur['id_role'] == 2 ? "selected" : "" ?> >AGENT</option>
            <option value="1" <?php echo isset($info_utilisateur['id_role']) && $info_utilisateur['id_role'] == 1 ? "selected" : "" ?> >ADMIN</option>
        </select>

        <input type="hidden" name="action" value="<?php echo isset($_GET['id']) ? "modifier" : "creer" ?>" />
        <input type="hidden" name="id_utilisateur" value="<?php echo isset($_GET['id']) ? $_GET['id'] : null ?>" />
        

        <div class="mt-5 text-end">
            <!-- <span type="button" class="btn btn-secondary ferme-modal " >Annuler</span> -->
            <span type="reset" id="btn-annulation" <?php if ( isset($_GET["id"]) ){ echo "data-id=\"".$_GET["id"]."\""; } ?> class="btn btn-danger ">Annuler</span>
            <input type="submit" id="btn-validation" data-id="<?php if ( isset($_GET["id"]) ) echo $_GET["id"]; else echo null; ?>" class="btn btn-primary" value="<?php if ( isset($_GET['id']) ) echo 'Modifier'; else echo "Créer"; ?>" /> 
        </div>
        
    </form>
</div>
<?php
    }
}

if ( $detail == false ){
?> 
        <div class="row mt-5">
            <div class="offset-10 col">
                <span class="creer-one-utilisateur btn btn-dark ">Créer un utilisateur</span>
            </div>
        </div>
<?php
    $all_utilisateur = listUtilisateurs();
    if ( empty($all_utilisateur) ){
    ?>
    
    <div class="row">
        <div class="col-8 offset-2">
            <img class="img-fluid" src="assets/img/marquer_liste_vide.png" alt="liste_vide">
        </div>
    </div>
    <span class="btn"></span>
<?php
    }else{
    
?>
                    <table class="table mt-3">
                        <thead class="table-success">
                            <tr>
                                <th scope="col">Identifiant utilisateur</th>
                                <th scope="col">nom </th>
                                <th scope="col">Prénom(s)</th>
                                <!-- <th scope="col-2">status</th> -->
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
<?php foreach($all_utilisateur as $utilisateur){
        
     ?>
                            <tr>
                                <td class="col-3"> <?php echo $utilisateur['id_utilisateur'] != null ? $utilisateur['id_utilisateur'] : '---Néant---'; ?> </th>
                                <td class="col"> <?php echo $utilisateur['nom'] != null ? $utilisateur['nom'] : '---Néant---'; ?> </td>
                                <td class="col"> <?php echo $utilisateur['prenom'] != null ? $utilisateur['prenom'] : '---Néant---'; ?> </td>
                                <td class="col-2 justify-content-center "> 
                                    <div class="d-flex justify-content-center">
                                        <a class="annuler-text-decoration" href="#" >
                                            <span class="delete-one-utilisateur btn btn-danger btn-sm" data-id="<?php echo $utilisateur['id_utilisateur']; ?>" >Supprimer</span>
                                            <span class="one-utilisateur btn btn-primary btn-sm" data-id="<?php echo $utilisateur['id_utilisateur']; ?>" >modifier</span>
                                        </a>
                                    </div>  
                                </td>
                            </tr>
<?php    }?>                       
                        </tbody>
                    </table>

<?php
   
    } 
}
?>
        
                    
                </div>
            </div>

        </div>
        <!-- end tableau demande en attente de validation -->
    </div>
</div>


<!-- start footer -->
<?php require_once 'views/footer.php'; ?>
<!-- start footer -->


    <script>

        

        let firstList = [
            document.getElementById('users'),
            document.getElementById('users-toggle-icon'),
            document.getElementById('users-menu-utilisateur'),
            document.getElementById('users-menu-role'),
            document.getElementById('users-menu-actions'),
        ];

        let secondeList = [
            document.getElementById('demandes'),
            document.getElementById('demandes-toggle-icon'),
            document.getElementById('demandes-menu-actes-naissance'),
            document.getElementById('demandes-menu-certification-nationalite'),
            document.getElementById('demandes-menu-actes-mariage'),
        ];

        let allList = [firstList, secondeList];

        for (const listItem of allList) {
            // Par défaut, on cache tous les sous-menus sauf ceux du premier bloc (demandes)
            let isMenuVisible = listItem === firstList;

            listItem[1].textContent = isMenuVisible ? '−' : '+';
            for (let i = 2; i < listItem.length; i++) {
                listItem[i].style.display = isMenuVisible ? 'block' : 'none';
            }

            listItem[0].addEventListener('click', () => {
                isMenuVisible = !isMenuVisible;
                listItem[1].textContent = isMenuVisible ? '−' : '+';
                for (let i = 2; i < listItem.length; i++) {
                    listItem[i].style.display = isMenuVisible ? 'block' : 'none';
                }
            });
        }


        document.querySelector('.acte-naissance').addEventListener('click', function(event) {
            event.preventDefault(); // Empêche la navigation immédiate
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            // Remplace ou ajoute 'action=login'
            params.set('action', 'traiterDemande');
            // Reconstruit l'URL avec les nouveaux paramètres
            url.search = params.toString();
            // Redirige vers la nouvelle URL
            window.location.href = url.toString();
        });

        document.querySelector('.certificat').addEventListener('click', function(event) {
            event.preventDefault(); // Empêche la navigation immédiate
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            // Remplace ou ajoute 'action=login'
            params.set('action', 'cerificat');
            // Reconstruit l'URL avec les nouveaux paramètres
            url.search = params.toString();
            // Redirige vers la nouvelle URL
            window.location.href = url.toString();
        });

        document.querySelector('.acte-mariage').addEventListener('click', function(event) {
            event.preventDefault(); // Empêche la navigation immédiate
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            // Remplace ou ajoute 'action=login'
            params.set('action', 'acte-mariage');
            // Reconstruit l'URL avec les nouveaux paramètres
            url.search = params.toString();
            // Redirige vers la nouvelle URL
            window.location.href = url.toString();
        });

        document.querySelector('.utilisateur').addEventListener('click', function(event) {
            event.preventDefault(); // Empêche la navigation immédiate
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            params.set('action', 'utilisateur');
            url.search = params.toString();
            window.location.href = url.toString();
        });



        Array.from( document.getElementsByClassName('one-utilisateur') ).forEach (element => {
            element.addEventListener('click', function(event) {
                const id = this.getAttribute('data-id'); // récupère l'id dynamique
                const url = new URL(window.location.href);
                const params = new URLSearchParams(url.search);
                params.set('id', id); // définit le nouveau paramètre 'id'
                params.set('for', 1); // définit le nouveau paramètre 'for'
                url.search = params.toString();
                window.location.href = url.toString(); 
            });
        });
        Array.from( document.getElementsByClassName('creer-one-utilisateur') ).forEach (element => {
            element.addEventListener('click', function(event) {
                const url = new URL(window.location.href);
                const params = new URLSearchParams(url.search);
                params.set('for', 1); // définit le nouveau paramètre 'for'
                url.search = params.toString();
                window.location.href = url.toString(); 
            });
        });

        function supprimerParam(parm){
                const url = new URL(window.location.href);
                url.searchParams.delete(parm);
                return url;
        }
        function supprimerParams(parms){
            console.log(parms);
            const url = new URL(window.location.href);
            console.log(`url avant suppression: ${url}`);
            for ( let parm of parms ){
                console.log(`parm: ${parm}`);
                url.searchParams.delete(parm);
                console.log(`url avant suppression du param: ${parm} : ${url}`);
            }
            return url;
        }
        Array.from( document.getElementsByClassName('ferme-modal') ).forEach (element => {
            element.addEventListener('click', function(event) {
                const url = supprimerParam("id");
                window.location.href = url.toString(); // recharge la page avec le paramètre supprimé
            });
        });

        const buttonValidation = document.getElementById('btn-validation');
        if ( buttonValidation != null ){
            buttonValidation.addEventListener('click', function(event) {
                const valider = this.getAttribute('data-id'); // récupère l'id dynamique
                // let url = supprimerParam("id");
                // const url = supprimerParam("for");
                const url = supprimerParams(["id", "for"]);

                const params = new URLSearchParams(url.search);
                // params.set('valider', valider); 
                url.search = params.toString();
                // window.location.href = url.toString(); 
            });
        }

        const buttonAnnulation = document.getElementById('btn-annulation');
        if ( buttonAnnulation != null ){
            buttonAnnulation.addEventListener('click', function(event) {
                const annuler = this.getAttribute('data-id'); // récupère l'id dynamique
                const url = supprimerParams(["id", "for"]);

                const params = new URLSearchParams(url.search);
                // params.set('annuler', annuler); 
                url.search = params.toString();
                window.location.href = url.toString(); 
            });
        }

        Array.from( document.getElementsByClassName('delete-one-utilisateur') ).forEach (element => {
            element.addEventListener('click', function(event) {
                event.preventDefault(); 
                const id = this.getAttribute('data-id');
                const url = new URL(window.location.href);
                const params = new URLSearchParams(url.search);

                params.set('id', id);
                params.set('supprimer', "supprimer");

                url.search = params.toString();
                window.location.href = url.toString();
            });
        });
        

    </script>

</body>
</html>



