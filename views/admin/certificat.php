
<?php 
session_start();
require_once 'models/DemandeActe.php';

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
                <a href="#?action=traiterDemande" id="demandes-menu-actes-naissance" class="col-11 offset-1 text-dark menu-item orange annuler-text-decoration annuler-heritage-color-hover acte-naissance">Actes de naissance</a>
                <a href="#" id="demandes-menu-certification-nationalite" class="col-11 offset-1 menu-item orange annuler-text-decoration annuler-heritage-color-hover certificat">Certificat de Nationalité</a>
                <a href="#" id="demandes-menu-actes-mariage" class="col-11 offset-1 text-dark menu-item annuler-text-decoration annuler-heritage-color-hover acte-mariage">Actes de mariage</a>
            </div>
            <div class="row">
                <div id="users" class="fw-bold menu-principal col-12 menu-item ">
                    <span id="users-toggle-icon" class="icon">−</span> Gestion des utilisateurs
                </div>
                <a href="#" id="users-menu-utilisateur" class="col-11 offset-1 text-dark menu-item annuler-text-decoration annuler-heritage-color-hover">Utilisateurs</a>
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
if ( isset($_GET['id']) ) { 
    $info_demande = certificatAttenteValidation($_GET['id']);
    if ( $info_demande != null ){
        $detail = true;

?>
<div class="row ">
    <div class="col-10 offset-1 ombre min-height-80vh bg-white m-5 p-3 ">
    
        <h1 class="mt-5 text-center" >INFORMATIONS DE LA DEMANDE</h1>
        <p class="text-center">*************************************************************</p>
        
        <div class="row mt-5">
            <div class="col-4 btn btn-light text-start">Nom</div>
            <div class="offset-1 col-7 btn btn-light text-start"><?php echo $info_demande['nom'] != null ? $info_demande['nom'] : '---Neant---' ; ?></div>
        </div>
        
        <div class="row">
            <div class="col-4 btn btn-light text-start">Prénoms</div>
            <div class="offset-1 col-7 btn btn-light text-start"><?php echo $info_demande['prenom'] != null ? $info_demande['prenom'] : '---Neant---' ; ?></div>
        </div>
        
        <div class="row">
            <div class="col-4 btn btn-light text-start">Date de naissance</div>
            <div class="offset-1 col-7 btn btn-light text-start"><?php echo $info_demande['date_naissance'] != null ? $info_demande['date_naissance'] : '---Neant---' ; ?></div>
        </div>
        
        <div class="row">
            <div class="col-4 btn btn-light text-start">Lieu de naissance</div>
            <div class="offset-1 col-7 btn btn-light text-start"><?php echo $info_demande['lieu_naissance'] != null ? $info_demande['lieu_naissance'] : '---Neant---' ; ?></div>
        </div>
        
        <div class="row">
            <div class="col-4 btn btn-light text-start">heure de naissance</div>
            <div class="offset-1 col-7 btn btn-light text-start"><?php echo $info_demande['heure_naissance'] != null ? $info_demande['heure_naissance'] : '---Neant---' ; ?></div>
        </div>
        
        <div class="row">
            <div class="col-4 btn btn-light text-start">Nom du père</div>
            <div class="offset-1 col-7 btn btn-light text-start"><?php echo $info_demande['nom_pere'] != null ? $info_demande['nom_pere'] : '---Neant---' ; ?></div>
        </div>
        
        <div class="row">
            <div class="col-4 btn btn-light text-start">Prénoms du père</div>
            <div class="offset-1 col-7 btn btn-light text-start"><?php echo $info_demande['prenom_pere'] != null ? $info_demande['prenom_pere'] : '---Neant---' ; ?></div>
        </div>
        
        <div class="row">
            <div class="col-4 btn btn-light text-start">Date de naissance du père</div>
            <div class="offset-1 col-7 btn btn-light text-start"><?php echo $info_demande['date_naissance_pere'] != null ? $info_demande['date_naissance_pere'] : '---Neant---' ; ?></div>
        </div>
        
        <div class="row">
            <div class="col-4 btn btn-light text-start">Lieu de naissance du père</div>
            <div class="offset-1 col-7 btn btn-light text-start"><?php echo $info_demande['lieu_naissance_pere'] != null ? $info_demande['lieu_naissance_pere'] : '---Neant---' ; ?></div>
        </div>
        
        <div class="row">
            <div class="col-4 btn btn-light text-start">Nom de la mère</div>
            <div class="offset-1 col-7 btn btn-light text-start"><?php echo $info_demande['nom_mere'] != null ? $info_demande['nom_mere'] : '---Neant---' ; ?></div>
        </div>
        
        <div class="row">
            <div class="col-4 btn btn-light text-start">Prénoms de la mère</div>
            <div class="offset-1 col-7 btn btn-light text-start"><?php echo $info_demande['prenom_mere'] != null ? $info_demande['prenom_mere'] : '---Neant---' ; ?></div>
        </div>
        
        <div class="row">
            <div class="col-4 btn btn-light text-start">Date de naissance de la mère</div>
            <div class="offset-1 col-7 btn btn-light text-start"><?php echo $info_demande['date_naissance_mere'] != null ? $info_demande['date_naissance_mere'] : '---Neant---' ; ?></div>
        </div>
        
        <div class="row">
            <div class="col-4 btn btn-light text-start">Lieu de naissance de la mère</div>
            <div class="offset-1 col-7 btn btn-light text-start"><?php echo $info_demande['lieu_naissance_mere'] != null ? $info_demande['lieu_naissance_mere'] : '---Neant---' ; ?></div>
        </div>
        
        <div class="row">
            <div class="col-4 btn btn-light text-start">Marié le</div>
            <div class="offset-1 col-7 btn btn-light text-start"><?php echo $info_demande['marie_le'] != null ? $info_demande['marie_le'] : '---Neant---' ; ?></div>
        </div>
        
        <div class="row">
            <div class="col-4 btn btn-light text-start">Marié à</div>
            <div class="offset-1 col-7 btn btn-light text-start"><?php echo $info_demande['marie_a'] != null ? $info_demande['marie_a'] : '---Neant---' ; ?></div>
        </div>
        
        <div class="row">
            <div class="col-4 btn btn-light text-start">Marié avec</div>
            <div class="offset-1 col-7 btn btn-light text-start"><?php echo $info_demande['marie_avec'] != null ? $info_demande['marie_avec'] : '---Neant---' ; ?></div>
        </div>
        <div class="row">
            <div class="col-4 btn btn-light text-start">Divorcé le</div>
            <div class="offset-1 col-7 btn btn-light text-start"><?php echo $info_demande['divorce_le'] != null ? $info_demande['divorce_le'] : '---Neant---' ; ?></div>
        </div>
        
        <div class="row">
            <div class="col-4 btn btn-light text-start">Décédé le</div>
            <div class="offset-1 col-7 btn btn-light text-start"><?php echo $info_demande['deces_le'] != null ? $info_demande['deces_le'] : '---Neant---' ; ?></div>
        </div>

        <?php if ( $info_demande['piece_jointe'] != null ) { ?>
        <h3 class="mt-5 text-center" >PIECES JOINTES</h3>
        <p class="text-center">***********************************</p>

        <div class="row ">
            <div class="offset-3 col-6">
                <img class="text-center img-fluid" src="<?php echo $info_demande['piece_jointe']; ?>" alt="La piece jointe">
            </div>
        </div>
        <?php } ?>

        <div class="mt-5 text-end">
            <span type="button" class="btn btn-secondary ferme-modal " >Close</span>

            <?php if ($info_demande['statut'] == 'En attente de validation' ) { ?>
            <span type="button" id="btn-annulation" <?php if ( isset($_GET["id"]) ){ echo "data-id=\"".$_GET["id"]."\""; } ?> class="btn btn-danger ">Rejeter</span>
            <?php } ?>

            <?php if ($info_demande['statut'] == 'Rejeter' || $info_demande['statut'] == 'En attente de validation' ) { ?>
            <span type="button" id="btn-validation" <?php if ( isset($_GET["id"]) ){ echo "data-id=\"".$_GET["id"]."\""; } ?> class="btn btn-primary ">Accepter</span>
            <?php } ?>
        </div>
        
    </div>
</div>
<?php
    }
}
if ( $detail == false ){
    $all_certificat = listCertificatAttenteValidation();
    if ( empty($all_certificat) ){ 
?>
    <div class="row">
        <div class="col-8 offset-2">
            <img class="img-fluid" src="assets/img/marquer_liste_vide.png" alt="liste_vide">
        </div>
    </div>
            
<?php 
    }
    else{
    
?>

                    <table class="table mt-5">
                        <thead class="table-success">
                            <tr>
                                <th scope="col-2">Identifiant demande</th>
                                <th scope="col-3">nom du démandeur</th>
                                <th scope="col-3">Prénom du démandeur</th>
                                <th scope="col-2">status</th>
                                <th scope="col-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
<?php foreach($all_certificat as $certificat){
        
     ?>
                            <tr>
                                <td class="col-2"> <?php echo $certificat['id_demande'] != null ? $certificat['id_demande'] : '---Néant---'; ?> </th>
                                <td class="col"> <?php echo $certificat['nom'] != null ? $certificat['nom'] : '---Néant---'; ?> </td>
                                <td class="col"> <?php echo $certificat['prenom'] != null ? $certificat['prenom'] : '---Néant---'; ?> </td>
                                <td class="col"> <?php echo $certificat['statut'] != null ? $certificat['statut'] : '---Néant---'; ?> </td>
                                <td class="col-1 justify-content-center "> 
                                    <div class="d-flex justify-content-center">
                                        <a class="one-certificat" href="#" data-id="<?php echo $certificat['id_demande']; ?>">
                                            <span class="btn btn-primary">
                                                Editer
                                            </span>
                                        </a>
                                    </div>  
                                </td>
                            </tr>
<?php    
    }
}
?>                       
                        </tbody>
                    </table>

<?php
   
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
            document.getElementById('demandes'),
            document.getElementById('demandes-toggle-icon'),
            document.getElementById('demandes-menu-actes-naissance'),
            document.getElementById('demandes-menu-certification-nationalite'),
            document.getElementById('demandes-menu-actes-mariage'),
        ];

        let secondeList = [
            document.getElementById('users'),
            document.getElementById('users-toggle-icon'),
            document.getElementById('users-menu-utilisateur'),
            document.getElementById('users-menu-role'),
            document.getElementById('users-menu-actions'),
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

        Array.from( document.getElementsByClassName('one-certificat') ).forEach (element => {
            element.addEventListener('click', function(event) {
                const id = this.getAttribute('data-id'); // récupère l'id dynamique
                const url = new URL(window.location.href);
                const params = new URLSearchParams(url.search);
                params.set('id', id); // définit le nouveau paramètre 'id'
                url.search = params.toString();
                window.location.href = url.toString(); 
            });
        });

        function supprimerParam(parm){
                const url = new URL(window.location.href);
                url.searchParams.delete(parm);
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
                const url = supprimerParam("id");

                const params = new URLSearchParams(url.search);
                params.set('valider', valider); // définit le nouveau paramètre 'id'
                url.search = params.toString();
                window.location.href = url.toString(); // recharge la page 
            });
        }

        const buttonAnnulation = document.getElementById('btn-annulation');
        if ( buttonAnnulation != null ){
            buttonAnnulation.addEventListener('click', function(event) {
                const annuler = this.getAttribute('data-id'); // récupère l'id dynamique
                const url = supprimerParam("id");

                const params = new URLSearchParams(url.search);
                params.set('annuler', annuler); // définit le nouveau paramètre 'id'
                url.search = params.toString();
                window.location.href = url.toString(); // recharge la page 
            });
        }
        

    </script>

</body>
</html>



