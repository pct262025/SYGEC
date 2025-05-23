<?php 

class AuthentificationController{
    
    public function login(){
        require_once 'views/login.php';
    }

    public function register(){
        require_once 'views/register.php';
    }

    public function deconnexion(){
        require_once 'views/deconnexion.php';
    }
}

?>