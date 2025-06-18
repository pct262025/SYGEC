<?php

require_once 'models/PaiementModel.php';
require_once 'models/DemandeActe.php';

    if ( isset($_POST['montant']) ){

        // start enregistrer le paiement
        $montant = $_POST['montant'];
        $numero_carte = isset( $_POST['numero_carte'] ) ? $_POST['numero_carte'] : null;
        $nom_carte = isset( $_POST['nom_carte'] ) ? $_POST['nom_carte'] : null;
        $date_expiration = isset( $_POST['date_expiration'] ) ? $_POST['date_expiration'] : null;
        $cvv = isset( $_POST['cvv'] ) ? $_POST['cvv'] : null;
        $operateur = isset( $_POST['operateur'] ) ? $_POST['operateur'] : null;
        $numero_telephone = isset( $_POST['numero_telephone'] ) ? $_POST['numero_telephone'] : null;
        $id_demande = isset( $_GET['id_demande'] ) ? $_GET['id_demande'] : null;
        
        save((int) $montant, $numero_carte, $nom_carte, $date_expiration, $cvv, $operateur, $numero_telephone, (int) $id_demande);
        // end enregistrer le paiement
        
        // start changer le status de la demande
        if ( $id_demande != null ){
            peyerDemande($id_demande);
        }
        // end changer le status de la demande

        // Afficher le message de reussite
        echo "<div class=\"popup\" id=\"popup\"> Félicitation, Paiement effectué avec succeès </div>";
        $color  = "#d4edda";
        $textColor = "#155724";

        header("Refresh: 1; url=" . strtok($_SERVER["PHP_SELF"], '?') . "?action=suivi");

    }

?>


<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Simuler un Paiement</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background: #f8f9fa;
            font-family: 'Segoe UI', sans-serif;
        }

        .form-container {
            max-width: 600px;
            margin: 50px auto;
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        h2 {
            text-align: center;
            margin-bottom: 25px;
            color: #0d6efd;
        }

        label {
            font-weight: 500;
        }

        button {
            width: 100%;
        }

        .form-group {
            margin-bottom: 15px;
        }

        .operateur-logos {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-bottom: 15px;
        }

        .operateur-logos img {
            height: 90px;
            width: auto;
            transition: transform 0.3s;
        }

        .operateur-logos img:hover {
            transform: scale(1.1);
        }

        .img-actif {
            transform: scale(1.5);
        }

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
        /* end popup */

        /* start qr-code */
        .qrcode-container{
            /* text-align: center; */
        }
        .qrcode{
            display: inline-block;
            margin-left: 40%;
        }
        /* end qr-code */
    </style>


    <script src="qrcode/jquery.min.js"></script>
    <script src="qrcode/qrcode.min.js"></script>
</head>
<body>

<div class="form-container">
    <h2>Payer votre Timbre ici</h2>
    <!-- <form method="post" action="index.php?page=validerPaiement" onsubmit="return validerPaiement();"> -->
    <form method="post" action="#" onsubmit="return validerPaiement();">

        <div class="form-group">
            <label>Montant :</label>
            <input type="number" name="montant" id="montant" <?php if (isset($_GET["montant"])){echo "value=".$_GET["montant"];} ?> class="form-control" onchange="setMontant()" required>
        </div>

        <div class="form-group">
            <label>Mode de paiement :</label>
            <select name="mode_payement" id="mode_paiement" class="form-select" required onchange="afficherChampsPaiement()">
                <option value="">-- Choisir --</option>
                <option value="Carte bancaire">Carte bancaire</option>
                <option value="Mobile Money">Mobile Money</option>
            </select>
        </div>

        <!-- Carte bancaire -->
        <div id="carte_bancaire_fields" style="display: none;">
            <div class="form-group">
                <label>Numéro de carte :</label>
                <input type="text" name="numero_carte" class="form-control">
            </div>
            <div class="form-group">
                <label>Nom sur la carte :</label>
                <input type="text" name="nom_carte" class="form-control">
            </div>
            <div class="form-group">
                <label>Date d'expiration :</label>
                <input type="month" name="date_expiration" class="form-control">
            </div>
            <div class="form-group">
                <label>Code CVV :</label>
                <input type="text" name="cvv" maxlength="3" class="form-control">
            </div>
        </div>

        <!-- Mobile Money -->
        <div id="mobile_money_fields" style="display: none;">
            <div class="operateur-logos">
                <div class="operateur-logos">
                          <img class="icons" src="assets/img/mtn.png" alt="MTN" onclick="setOperateur('MTN')">
                          <img class="icons" src="assets/img/moov.jpg" alt="Moov" onclick="setOperateur('Moov')">
                          <img class="icons" src="assets/img/orange.jpg" alt="Orange" onclick="setOperateur('Orange')">
                          <img class="icons" src="assets/img/wave.jpg" alt="Wave" onclick="setOperateur('Wave')">
                </div>

            </div>

            <input type="hidden" name="operateur" id="operateur">

            <div id="qrcode-container" class="qrcode-container" style="display: none;">
                <span class="qrcode" id="qr-codes"></span>
            </div>

        </div>
        

          <!-- Bloc de confirmation de paiement -->
<div id="confirmation_paiement" style="display: none;" class="text-center mt-3">
    <button type="button" class="btn btn-success" onclick="confirmerPaiement()">J'ai déjà payé</button>
    <p id="message_confirmation" class="mt-2 text-success fw-bold" style="display: none;">
        Merci ! Votre paiement est en cours de vérification.
    </p>
</div>

        <button type="submit" class="btn btn-primary mt-3">Valider le paiement</button>
    </form>
</div>

<script>
let intervalId = null;

function afficherChampsPaiement() {
    const mode = document.getElementById('mode_paiement').value;
    document.getElementById('carte_bancaire_fields').style.display = (mode === 'Carte bancaire') ? 'block' : 'none';
    document.getElementById('mobile_money_fields').style.display = (mode === 'Mobile Money') ? 'block' : 'none';

    if ( mode === 'Carte bancaire' && intervalId != null ){
         clearInterval(intervalId);
    } 
    else if ( mode === 'Mobile Money' ) {
        intervalId = setInterval(verifierStatut, 1000);
    }
}

function validerPaiement() {
    let montant = document.getElementById('montant').value;
    let mode = document.getElementById('mode_paiement').value;
    if (montant <= 0 || mode === '') {
        alert("Veuillez saisir un montant valide et choisir un mode de paiement.");
        return false;
    }
    return true;
}


// start logique de paiement par qrcode

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const id_demande = params.get("id_demande");
let montant = document.getElementById('montant').value ;
let operateur = document.getElementById('operateur').value ;

function setOperateur(arg){
    document.getElementById('operateur').value = arg;
    document.getElementById('qrcode-container').style.display = "block";

    montant = document.getElementById('montant').value ;
    operateur = document.getElementById('operateur').value ;
    genererQrCode();
}

function setMontant(){
    montant = document.getElementById('montant').value;
    genererQrCode();
}


function genererQrCode(){

    const qrContainer = document.getElementById("qr-codes");

    // ❌ Supprime l'ancien QR Code
    qrContainer.innerHTML = "";

    new QRCode(qrContainer, {
        text: `http://192.168.1.7/sygec/?action=payement-par-qrcode&id_demande=${id_demande}&montant=${montant}&operateur=${operateur}`,
        // text: `http://192.168.1.7/sygec/`,
        width: 128,
        height: 128,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}

function verifierStatut() {
    console.log("verifier que le paiement est fait");
    fetch(`http://localhost/sygec/models/api/checkSTatusApi.php/?id_demande=${id_demande}`)
    .then(response => response.json())
    .then(data => {
        if (data === false) {
            // Ne rien faire si réponse false
            return;
        }
        if (data.status === 1) {

            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            params.set('action', 'suivi');
            url.search = params.toString();
            window.location.href = url.toString();
        }
    })
    .catch(error => {
        console.error('Erreur API :', error);
    });
}

// end logique de paiement par qrcode

// start rendre un operateur actif
const icons = document.querySelectorAll('.icons');
icons.forEach(icon => {
  icon.addEventListener('click', () => {
    // enlever la classe 'okok' de tous les items
    icons.forEach(el => el.classList.remove('img-actif'));
    
    // ajouter la classe 'okok' à l'élément cliqué
    icon.classList.add('img-actif');

    selectedOperateur = icon.getAttribute('data-operateur');
    // mettre à jour le champ caché
    // document.getElementById('operateur').value = selectedOperateur;
  });
});


// end rendre un operateur actif

// document.querySelectorAll('.icons').forEach(img => {
//     img.addEventListener('click', () => {
//         selectedOperateur = img.getAttribute('data-operateur');
//         console.log('Sélectionné :', selectedOperateur);

//         // mettre à jour le champ caché
//         document.getElementById('operateur').value = selectedOperateur;
        
//         // Optionnel: effet visuel pour montrer la sélection
//         document.querySelectorAll('.icons').forEach(el => el.classList.remove('okok'));
//         img.classList.add('okok');
//     });
// });
// end
</script>

</body>
</html>
