<?php
require_once('models/PaiementModel.php');

class PaiementController {

    public function index() {
        require_once('views/paiement_form.php');
    }

    public function validerPaiement2() {
        require_once('views/valider_qrcode_paiement.php');
    }

    public function validerPaiement() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $montant = $_POST['montant'];
            $mode = $_POST['mode_payement'];
            // $id_demande = $_GET['id_demande'] ?? null; // Peut aussi être POST

            if (!empty($montant) && !empty($mode)) {
                $data = [
                    'montant' => $montant,
                    'mode' => $mode,
                    'statut' => 'en attente',
                    // 'id_demande' => $id_demande,
                    'numero_carte' => $_POST['numero_carte'] ?? null,
                    'nom_carte' => $_POST['nom_carte'] ?? null,
                    'date_expiration' => $_POST['date_expiration'] ?? null,
                    'cvv' => $_POST['cvv'] ?? null,
                    'operateur' => $_POST['operateur'] ?? null,
                    'numero_telephone' => $_POST['numero_telephone'] ?? null
                ];

                $paiementModel = new PaiementModel();
                $result = $paiementModel->enregistrerPaiement($data);

                if ($result) {
                    echo "<div class='alert alert-success'>Paiement de {$montant} FCFA via {$mode} enregistré avec succès.</div>";
                } else {
                    echo "<div class='alert alert-danger'>Une erreur est survenue lors de l'enregistrement.</div>";
                }
            } else {
                echo "<div class='alert alert-warning'>Veuillez remplir tous les champs obligatoires.</div>";
            }
        }
    }
}

