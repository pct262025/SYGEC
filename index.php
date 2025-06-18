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

    case 'login':
        require_once('controllers/AuthentificationController.php');
        $controller = new AuthentificationController();
        $controller->login();
        break;

    case 'register':
        require_once('controllers/AuthentificationController.php');
        $controller = new AuthentificationController();
        $controller->register();
        break;

    case 'deconnexion':
        require_once('controllers/AuthentificationController.php');
        $controller = new AuthentificationController();
        $controller->deconnexion();
        break;

    case 'traiterDemande':
        require_once('controllers/AdminController.php');
        $controller = new AdminController();
        $controller->traiterDemande();
        break;

    case 'cerificat':
        require_once('controllers/AdminController.php');
        $controller = new AdminController();
        $controller->cerificat();
        break;

    case 'suivi':
        require_once('controllers/SuiviController.php');
        $controller = new SuiviController();
        $controller->suivi();
        break;

    case 'demande':
        require_once('controllers/DemandeController.php');
        $controller = new DemandeController();
        $controller->demande();
        break;

    // Ajout de la route pour télécharger le PDF
    case 'telechargerPDF':
        require_once('controllers/DemandeController.php');
        $controller = new DemandeController();
        $controller->telechargerCertificatNaissance(); // avant c’était telechargerPDF()
        break;
    
    case 'telechargerCertificatNaissance':
        require_once('controllers/DemandeController.php');
        $controller = new DemandeController();
        $controller->telechargerPDF(); // avant c’était telechargerCertificatNaissance()
        break;
    
    case 'payement-par-qrcode':
        require_once('controllers/PaiementController.php');
        $controller = new PaiementController();
        $controller->validerPaiement2(); // avant c’était telechargerCertificatNaissance()
        break;

}
