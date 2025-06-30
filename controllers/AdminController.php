

<?php  

class AdminController{
    
    public function traiterDemande(){
        require_once 'views/admin/traiterDemande.php';
    }
    
    public function cerificat(){
        require_once 'views/admin/certificat.php';
    }
    
    public function acteMariage(){
        require_once 'views/admin/acteMariage.php';
    }
    
    public function utilisateur(){
        require_once 'views/admin/utilisateur.php';
    }
    
    public function role(){
        require_once 'views/admin/role.php';
    }
    
}

?>