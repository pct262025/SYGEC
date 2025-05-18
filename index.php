<?php
$action = isset($_GET['action']) ? $_GET['action'] : 'accueil';

switch ($action) {
    case 'accueil':
        require_once 'controllers/HomeController.php';
        $controller = new HomeController();
        $controller->index();
        break;


    case 'demande':
        require_once('controllers/HomeController.php');
        $controller = new HomeController();
        $controller->demande();
        break;

}
