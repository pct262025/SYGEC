
<?php

require_once 'models/PaiementModel.php';
require_once 'models/DemandeActe.php';

$id_demande = null;
$montant = null;
$operateur = null;

if ( isset($_GET['id_demande']) ) $id_demande = $_GET['id_demande'];
if ( isset($_GET['montant']) ) $montant = $_GET['montant'];
if ( isset($_GET['operateur']) ) $operateur = $_GET['operateur'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <style>
        /* div{
            border: 1px solid #222;
        } */
        .w-40 { width: 40% !important; }
        .w-80 { width: 80% !important; }
    </style>
</head>
<body>
    
    <div class="container">

<?php 
    if ( $id_demande != null && $montant != null && $operateur != null ){

save((int) $montant, null, null, null, null, $operateur, null, (int) $id_demande);
peyerDemande($id_demande);
?>

        <div class="text-center" >
            <h2 class="mt-5">Félicitation</h2>
            <h4>paiement effectué avec succès</h4>
            <img src="assets/img/icon_validate.png" alt="okok">
        </div>
<?php 
    }
    else{
?>
        <div class="text-center" >
            <h2 class="mt-5">Oups</h2>
            <h4>Veillez recommencer la procedure de paiement</h4>
            <img src="assets/img/refus.png" alt="okok">
        </div>
    </div>
<?php 
    }
?>

</body>
</html>