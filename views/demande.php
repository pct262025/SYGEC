
<?php
    session_start();
    require_once 'models/DemandeActe.php';
    require_once 'models/Citoyen.php';

    // start si l'utilisateur n'est pas connecté, on le redirige vers la connexions
    if ( !isset($_SESSION["id"]) ){
        header("Refresh: 0; url=" . strtok($_SERVER["PHP_SELF"], '?') . "?action=login");
    }
    // start si l'utilisateur n'est pas connecté, on le redirige vers la connexions

    if ( isset($_POST["nom"]) ){
        
        if ( !isset($_POST["typeacte"]) ){

            echo "<div class=\"popup\" id=\"popup\"> Vous n'avez pas renseigner le type d'acte </div>";
            $color  = "#f8d7da";
            $textColor = "#721c24";

        }else{

            $statut = 'En attente de validation';
            $id_type_acte = $_POST["typeacte"] == "naissance" ? 1 : 2;
            $id_citoyen = $_SESSION["id"];

            creerUneDemande($statut, $id_type_acte, $id_citoyen);

            
            $nom = $_POST["nom"];
            $prenom = isset($_POST["prenom"]) ? $_POST["prenom"] : null;
            $lieu_naissance = isset($_POST["lieunaissance"]) ? $_POST["lieunaissance"] : null;
            $date_naissance = isset($_POST["datenaissance"]) ? $_POST["datenaissance"] : null;
            $heure_naissance = isset($_POST["heurNaissance"]) ? $_POST["heurNaissance"] : null;
            $lieu_habitation = isset($_POST["lieuhabitat"]) ? $_POST["lieuhabitat"] : null;
            $nom_pere = isset($_POST["nompere"]) ? $_POST["nompere"] : null;
            $prenom_pere = isset($_POST["pnompere"]) ? $_POST["pnompere"] : null;
            $date_naissance_pere = isset($_POST["datenaissp"]) ? $_POST["datenaissp"] : null;
            $lieu_naissance_pere = isset($_POST["lieunaissp"]) ? $_POST["lieunaissp"] : null;
            $proffession_pere = isset($_POST["jobpere"]) ? $_POST["jobpere"] : null;
            $nom_mere = isset($_POST["nommere"]) ? $_POST["nommere"] : null;
            $prenom_mere = isset($_POST["pnommere"]) ? $_POST["pnommere"] : null;
            $date_naissance_mere = isset($_POST["datenaissm"]) ? $_POST["datenaissm"] : null;
            $lieu_naissance_mere = isset($_POST["lieunaissm"]) ? $_POST["lieunaissm"] : null;
            $proffession_mere = isset($_POST["jobmere"]) ? $_POST["jobmere"] : null;
            $marie_le = isset($_POST["datemariage"]) ? $_POST["datemariage"] : null;
            $marie_a = isset($_POST["lieumariage"]) ? $_POST["lieumariage"] : null;
            $divorce_le = isset($_POST["datedivorce"]) ? $_POST["datedivorce"] : null;
            $nom_conjoint = isset($_POST["nomcj"]) ? $_POST["nomcj"] : null;
            $prenom_conjoint = isset($_POST["pnomcj"]) ? $_POST["pnomcj"] : null;
            $email = isset($_POST["email"]) ? $_POST["email"] : null;
            $contact = isset($_POST["telephone"]) ? $_POST["telephone"] : null;

            updateWithDemandeInfo(
                $nom,
                $prenom,
                $lieu_naissance,
                $date_naissance,
                $heure_naissance,
                $lieu_habitation,
                $nom_pere,
                $prenom_pere,
                $date_naissance_pere,
                $lieu_naissance_pere,
                $proffession_pere,
                $nom_mere,
                $prenom_mere,
                $date_naissance_mere,
                $lieu_naissance_mere,
                $proffession_mere,
                $marie_le,
                $marie_a,
                $divorce_le,
                $nom_conjoint,
                $prenom_conjoint,
                $email,
                $contact,

                $id_citoyen
            );

            // Afficher le message de reussite
            echo "<div class=\"popup\" id=\"popup\"> Félicitation, Votre demande a été créé avec succès </div>";
            $color  = "#d4edda";
            $textColor = "#155724";

            header("Refresh: 3; url=" . strtok($_SERVER["PHP_SELF"], '?') . "?action=accueil");

        }
        


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
    <link rel="stylesheet" href="assets/css/demande.css">

    <style>
        /* start popup */
        .popup {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: <?= $color ?>;
            color: <?= $textColor ?>;
            border: 1px solid <?= $textColor ?>;
            padding: 15px 25px;
            border-radius: 8px;
            font-weight: bold;
            z-index: 9999;
            box-shadow: 0 0 10px rgba(0,0,0,0.2);
            animation: fadeIn 0.5s;
        }
        @keyframes fadeIn {
            from { opacity: 0; top: 0px; }
            to { opacity: 1; top: 20px; }
        }
    </style>

</head>
<body>

<!-- start menu -->
<?php 
require_once 'views/menu.php'; 
?>
<!-- end menu -->
    <div class="body">
        <div class="form-container-dem">
            <form id="multiStepForm" method="post" action="#">
                <div class="progress-bar1">
                    <div class="step active">1</div>
                    <div class="step">2</div>
                    <div class="step">3</div>
                    <div class="step">4</div>
                </div>

                <!-- Étape 1 -->
                <div class="form-step active">
                    <h2>Type d'acte & Identité</h2>
                    <div class="form-row">


                        <div class="form-group">
                            <label>Nom <b>*</b></label>
                            <input type="text" id="nom" name="nom" required/>
                        </div>

                        <div class="form-group">
                            <label>Prénoms <b>*</b></label>
                            <input type="text" id="prenom" name="prenom" required/>
                        </div>

                        <div class="form-group">
                            <label>lieu de naissance <b>*</b></label>
                            <input type="text" id="lieuNaissance" name="lieunaissance" required/>
                        </div>
                        <div class="form-group">
                            <label>Date de naissance <b>*</b></label>
                            <input type="date" id="dateNaissance" name="datenaissance" required/>
                        </div>

                        <div class="form-group">
                            <label>Type d'acte <b>*</b></label>
                            <select id="acteType" name="typeacte" required>
                                <option value="" disabled selected>Choix du type d'acte</option>
                                <option value="naissance">Extrait de naissance</option>
                                <option value="certificat">Certificat de nationalité</option>
                            </select>
                        </div>

                        <div class="form-group hide" id="hnais">
                            <label>Heure de naissance </label>
                            <input type="time" id="heurNaissance" name="heurNaissance" />
                        </div>
                        <div class="form-group hide" id="lhab">
                            <label>Lieu d'habitation </label>
                            <input type="text" id="lieuhabitat" name="lieuhabitat" />
                        </div>

                    </div>
                    <div class="fbtn">
                        <button type="button" class="next">Suivant</button>
                    </div>
                </div>

                <!-- Étape 2 -->
                <div class="form-step ">
                    <h2>Informations complémentaires</h2>
                    <div class="form-row">

                        <div class="form-group">
                            <label>Nom du père</label>
                            <input type="text" id="nompere" name="nompere" />
                        </div>
                        <div class="form-group">
                            <label>Prénoms du père</label>
                            <input type="text" id="pnompere" name="pnompere"  />
                        </div>
                        <div class="form-group hide" id="naissp">
                            <label>Date de naissance du père</label>
                            <input type="date" id="datenaissp" name="datenaissp"  />
                        </div>
                        <div class="form-group hide" id="lnaissp">
                            <label>Lieu de naissance du père</label>
                            <input type="input" id="lieunaissp" name="lieunaissp" />
                        </div>
                        <div class="form-group hide" id="jobp">
                            <label>profession du père</label>
                            <input type="text" id="jobpere" name="jobpere" />
                        </div>
                        <!-- <div class="form-group hide" id="decp">
                            <label>Date de décès du père</label>
                            <input type="date" id="datedecesp" required/>
                        </div>
                        <div class="form-group hide" id="ldecp">
                            <label>Lieu du décès du père</label>
                            <input type="input"  id="lieudecesp" required/>
                        </div> -->
                        <div class="form-group">
                            <label>Nom de la mère</label>
                            <input type="text" id="nommere" name="nommere" />
                        </div>
                        <div class="form-group">
                            <label>Prénoms de la mère</label>
                            <input type="text" id="pnommere" name="pnommere" />
                        </div>
                        <div class="form-group hide" id="naissm">
                            <label>Date de naissance de la mère</label>
                            <input type="date"  id="datenaissm" name="datenaissm" />
                        </div>
                        <div class="form-group hide" id="lnaissm">
                            <label>lieu de naissance de la mère</label>
                            <input type="text" id="lieunaissm" name="lieunaissm" />
                        </div>
                        <div class="form-group hide" id="jobm">
                            <label>profession de la mère</label>
                            <input type="text" id="jobmere" name="jobmere" />
                        </div>
                        <!-- <div class="form-group hide" id="decm">
                            <label>Date de décès de la mère</label>
                            <input type="date" id="datedecesm" required/>
                        </div>
                        <div class="form-group hide" id="ldecm">
                            <label>Lieu du décès de la mère</label>
                            <input type="input" id="lieudecesm" required/>
                        </div> -->
                        <div class="form-group hide" id="datmar">
                            <label>Date de mariage</label>
                            <input type="date" id="datemariage" name="datemariage" />
                        </div>
                        <div class="form-group hide" id="locmar">
                            <label>Lieu de mariage</label>
                            <input type="text" id="lieumariage" name="lieumariage" />
                        </div>
                        <div class="form-group hide" id="datdiv">
                            <label>Date de divorce</label>
                            <input type="date" id="datedivorce" name="datedivorce" />
                        </div>

                    </div>
                    <div class="form-row">
                        <div class="form-group hide" id="ncj">
                            <label>Nom conjoint(e)</label>
                            <input type="text" id="nomcj" name="nomcj" />
                        </div>
                        <div class="form-group hide" id="pncj">
                            <label>Prénoms conjoint(e)</label>
                            <input type="text" id="pnomcj" name="pnomcj" />
                        </div>
                    </div>

                    <div class="btns">
                        <button type="button" class="prev">Précédent</button>
                        <button type="button" class="next">Suivant</button>
                    </div>
                </div>


                <!-- Étape 3 -->
                <div class="form-step">
                    <h2>Coordonnées & Document</h2>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Email <b>*</b></label>
                            <input type="email" id="email" name="email" required/>
                        </div>

                        <div class="form-group">
                            <label>Téléphone <b>*</b></label>
                            <input type="tel" id="telephone" name="telephone" required/>
                        </div>

                        <!-- <div class="form-group" style="flex: 1 1 100%;">
                            <label>Adresse</label>
                            <input type="text" id="adresse" required/>
                        </div> -->

                        <div class="form-group" style="flex: 1 1 100%;">
                            <label id='labeldoc'>Joindre un document PDF</label>
                            <input type="file" id="documentPDF" accept="application/pdf" />
                        </div>
                    </div>

                    <div class="btns">
                        <button type="button" class="prev">Précédent</button>
                        <button type="button" class="next">Suivant</button>
                    </div>
                </div>

                <!-- Étape 4 -->
                <div class="form-step">
                    <h2>Confirmation</h2>
                    <div class="recap-list" id="recap"></div>
                    <div class="btns">
                        <button type="button" class="prev">Précédent</button>
                        <button type="submit">Envoyer</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
        

<!-- start footer -->
<?php require_once 'views/footer.php'; ?>
<!-- end footer -->


    <script>
        const steps = document.querySelectorAll(".form-step");
        const progress = document.querySelectorAll(".step");
        const nextBtns = document.querySelectorAll(".next");
        const prevBtns = document.querySelectorAll(".prev");
        const acteType = document.getElementById("acteType");

        let currentStep = 0;

        function updateStep(index) {
            steps.forEach((step, i) => {
                step.classList.remove("active");
                if (i === index) {
                    step.classList.add("active");
                }
                progress[i].classList.toggle("active", i <= index);
            });

            if (index === 3) generateRecap();
        }

        nextBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                if (currentStep < steps.length - 1) {
                    currentStep++;
                    updateStep(currentStep);
                }
            });
        });

        prevBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                if (currentStep > 0) {
                    currentStep--;
                    updateStep(currentStep);
                }
            });
        });

        // document.getElementById("multiStepForm").addEventListener("submit", (e) => {
        //     // alert("Demande envoyée avec succès !");
        //     // e.preventDefault();
            
        // });

        acteType.addEventListener("change", () => {

            const value = acteType.value;
            if (value === "naissance") {
                document.getElementById("labeldoc").textContent = "Joindre une copie de l'extrait";
                document.getElementById("lhab").classList.add("hide");
                document.getElementById("naissp").classList.add("hide");
                document.getElementById("naissm").classList.add("hide");
                document.getElementById("jobm").classList.remove("hide");
                document.getElementById("jobp").classList.remove("hide");
                document.getElementById("hnais").classList.remove("hide");
                document.getElementById("ncj").classList.remove("hide");
                document.getElementById("pncj").classList.remove("hide");
                document.getElementById("datmar").classList.remove("hide");
                document.getElementById("locmar").classList.remove("hide");
                document.getElementById("datdiv").classList.remove("hide");
                // document.getElementById("decm").classList.remove("hide");
                // document.getElementById("decp").classList.remove("hide");
                // document.getElementById("ldecm").classList.remove("hide");
                // document.getElementById("ldecp").classList.remove("hide");
            } else {
                document.getElementById("lhab").classList.remove("hide");
                document.getElementById("naissp").classList.remove("hide");
                document.getElementById("naissm").classList.remove("hide");
                document.getElementById("jobm").classList.add("hide");
                document.getElementById("jobp").classList.add("hide");
                document.getElementById("hnais").classList.add("hide");
                document.getElementById("ncj").classList.add("hide");
                document.getElementById("pncj").classList.add("hide");
                document.getElementById("datmar").classList.add("hide");
                document.getElementById("locmar").classList.add("hide");
                document.getElementById("datdiv").classList.add("hide");
                // document.getElementById("decm").classList.add("hide");
                // document.getElementById("decp").classList.add("hide");
                // document.getElementById("ldecm").classList.add("hide");
                // document.getElementById("ldecp").classList.add("hide");

            }
        });

        function generateRecap() {
            const recap = document.getElementById("recap");
            // const type = acteType.options[select.selectedIndex].text;
            const type = acteType.value;
            const file = document.getElementById("documentPDF").files[0];

            const recapData = [
                `<p><strong>Type d'acte :</strong> ${type}</p>`,
                `<p><strong>Nom :</strong> ${document.getElementById("nom").value}</p>`,
                `<p><strong>Prénom :</strong> ${document.getElementById("prenom").value}</p>`,
                `<p><strong>Date de naissance :</strong> ${document.getElementById("dateNaissance").value}</p>`

            ];

            if (type === "naissance") {
                recapData.push(`<p><strong>Heure de naissane :</strong> ${document.getElementById("heurNaissance").value}</p>`);
                recapData.push(`<p><strong>Nom du père :</strong> ${document.getElementById("nompere").value}</p>`);
                recapData.push(`<p><strong>Prénom du père :</strong> ${document.getElementById("pnompere").value}</p>`);
                recapData.push(`<p><strong>profession du père :</strong> ${document.getElementById("jobpere").value}</p>`);
                // recapData.push(`<p><strong>Date de décès du père :</strong> ${document.getElementById("datedecesp").value}</p>`);
                // recapData.push(`<p><strong>Lieu du décès du père :</strong> ${document.getElementById("lieudecesp").value}</p>`);
                recapData.push(`<p><strong>Nom de la mère :</strong> ${document.getElementById("nommere").value}</p>`);
                recapData.push(`<p><strong>Prénom de la mère :</strong> ${document.getElementById("pnommere").value}</p>`);
                recapData.push(`<p><strong>profession de la mère :</strong> ${document.getElementById("jobmere").value}</p>`);
                // recapData.push(`<p><strong>Date de décès de la mère :</strong> ${document.getElementById("datedecesm").value}</p>`);
                // recapData.push(`<p><strong>Lieu du décès de la mère :</strong> ${document.getElementById("lieudecesm").value}</p>`);
                recapData.push(`<p><strong>Date de mariage :</strong> ${document.getElementById("datemariage").value}</p>`);
                recapData.push(`<p><strong>Lieu de mariage :</strong> ${document.getElementById("lieumariage").value}</p>`);
                recapData.push(`<p><strong>Date de divorce :</strong> ${document.getElementById("datedivorce").value}</p>`);
                recapData.push(`<p><strong>Nom conjoint(e) :</strong> ${document.getElementById("nomcj").value}</p>`);
                recapData.push(`<p><strong>Prénom conjoint(e) :</strong> ${document.getElementById("pnomcj").value}</p>`);

            } else {
                recapData.push(`<p><strong>Lieu d'habitation :</strong> ${document.getElementById("lieuhabitat").value}</p>`);
                recapData.push(`<p><strong>Nom du père :</strong> ${document.getElementById("nompere").value}</p>`);
                recapData.push(`<p><strong>Prénom du père :</strong> ${document.getElementById("pnompere").value}</p>`);
                recapData.push(`<p><strong>Date de naissance du père :</strong> ${document.getElementById("datenaissp").value}</p>`);
                recapData.push(`<p><strong>Nom de la mère :</strong> ${document.getElementById("nommere").value}</p>`);
                recapData.push(`<p><strong>Prénom de la mère :</strong> ${document.getElementById("pnommere").value}</p>`);
                recapData.push(`<p><strong>Date de naissance de la mère :</strong> ${document.getElementById("datenaissm").value}</p>`);
            }

            recapData.push(`<p><strong>Email :</strong> ${document.getElementById("email").value}</p>`);
            recapData.push(`<p><strong>Téléphone :</strong> ${document.getElementById("telephone").value}</p>`);
            // recapData.push(`<p><strong>Adresse :</strong> ${document.getElementById("adresse").value}</p>`);
            recapData.push(`<p><strong>Fichier joint :</strong> ${file ? file.name : "Aucun"}</p>`);

            recap.innerHTML = recapData.join("");
        }


        // start faire disparaitre le popup
        setTimeout(function () {
            const popup = document.getElementById('popup');
            if ( popup != null ){
                popup.style.opacity = '0';
                setTimeout(() => popup.style.display = 'none', 500); // attend la transition
            }
        }, 3000);
        // end faire disparaitre le popup

        // start preremplir les champs
        function formatDateToFr(isoDateTime) {
            const dateObj = new Date(isoDateTime);
            const jour = String(dateObj.getDate()).padStart(2, '0');
            const mois = String(dateObj.getMonth() + 1).padStart(2, '0'); // mois de 0 à 11
            const annee = dateObj.getFullYear();
            return `${jour}/${mois}/${annee}`;
        }

        

        // window.addEventListener('DOMContentLoaded', () => {
        function fettt (){
            fetch('models/api.php')
            .then(response => response.json())
            .then(data => {
                document.getElementById('nom').value = data.nom || '';
                document.getElementById('prenom').value = data.prenom || '';
                document.getElementById('lieuNaissance').value = data.lieu_naissance || '';
                document.getElementById('dateNaissance').value = data.date_naissance.split(' ')[0] || '';
                document.getElementById('heurNaissance').value = data.heure_naissance || '';
                document.getElementById('lieuhabitat').value = data.lieu_habitation || '';
                document.getElementById('nompere').value = data.nom_pere || '';
                document.getElementById('pnompere').value = data.prenom_pere || '';
                document.getElementById('datenaissp').value = data.date_naissance_pere.split(' ')[0] || '';
                document.getElementById('lieunaissp').value = data.lieu_naissance_pere || '';
                document.getElementById('jobpere').value = data.proffession_pere || '';
                document.getElementById('nommere').value = data.nom_mere || '';
                document.getElementById('pnommere').value = data.prenom_mere || '';
                document.getElementById('datenaissm').value = data.date_naissance_mere.split(' ')[0] || '';
                document.getElementById('lieunaissm').value = data.lieu_naissance_mere || '';
                document.getElementById('jobmere').value = data.proffession_mere || '';
                document.getElementById('datemariage').value = data.marie_le.split(' ')[0] || '';
                document.getElementById('lieumariage').value = data.marie_a || '';
                document.getElementById('datedivorce').value = data.divorce_le.split(' ')[0] || '';
                document.getElementById('nomcj').value = data.nom_conjoint || '';
                document.getElementById('pnomcj').value = data.prenom_conjoint || '';
                document.getElementById('email').value = data.email || '';
                document.getElementById('telephone').value = data.contact || '';

                // Formater la date (datetime vers jj/mm/aaaa)
                if (data.date_naissance) {
                document.getElementById('date_naissance').value = formatDateToFr(data.date_naissance);
                }

                // Heure au format hh:mm:ss → directement utilisable pour <input type="time">
                if (data.heure_rdv) {
                document.getElementById('heure_rdv').value = data.heure_rdv;
                }
            })
            .catch(error => console.error('Erreur:', error));
        // });
        }
        fettt();
        // end preremplir les champs
    </script>

</body>
</html>