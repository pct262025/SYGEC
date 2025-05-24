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

        header("Refresh: 2; url=" . strtok($_SERVER["PHP_SELF"], '?') . "?action=suivi");

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
    </style>
</head>
<body>

<div class="form-container">
    <h2>Payer votre Timbre ici</h2>
    <!-- <form method="post" action="index.php?page=validerPaiement" onsubmit="return validerPaiement();"> -->
    <form method="post" action="#" onsubmit="return validerPaiement();">

        <div class="form-group">
            <label>Montant :</label>
            <input type="number" name="montant" id="montant" class="form-control" required>
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
                          <img src="assets/img/mtn.png" alt="MTN">
                          <img src="assets/img/moov.jpg" alt="Moov">
                          <img src="assets/img/orange.jpg" alt="Orange">
                          <img src="assets/img/wave.jpg" alt="Wave">
                </div>

            </div>

            <div class="form-group">
                <label>Choisir l'opérateur :</label>
                <select name="operateur" class="form-select">
                    <option value="">-- Sélectionner --</option>
                    <option value="MTN">MTN</option>
                    <option value="Moov">Moov</option>
                    <option value="Orange">Orange</option>
                    <option value="Wave">Wave</option>
                </select>
            </div>

            <div class="form-group">
                <label>Numéro de téléphone :</label>
                <input type="tel" name="numero_telephone" class="form-control">
            </div>
             <div id="numero_reception" class="alert alert-info">
                 Veuillez effectuer le paiement Mobile Money au numéro suivant : <strong>07 07 07 07 07</strong>
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
function afficherChampsPaiement() {
    const mode = document.getElementById('mode_paiement').value;
    document.getElementById('carte_bancaire_fields').style.display = (mode === 'Carte bancaire') ? 'block' : 'none';
    document.getElementById('mobile_money_fields').style.display = (mode === 'Mobile Money') ? 'block' : 'none';
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
</script>

</body>
</html>
