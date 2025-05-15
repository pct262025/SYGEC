<?php
$action = isset($_GET['action']) ? $_GET['action'] : 'accueil';

switch ($action) {
    case 'accueil':
        require_once 'controllers/HomeController.php';
        $controller = new HomeController();
        $controller->index();
        break;
    case 'paiement':
    require_once('controllers/PaiementController.php');
    $controller = new PaiementController();
    $controller->index(); // <- ici on appelle index(), pas paiement_form()
    break;

case 'validerPaiement':
    require_once('controllers/PaiementController.php');
    $controller = new PaiementController();
    $controller->validerPaiement();
    break;

}
