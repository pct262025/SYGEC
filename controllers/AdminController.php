

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
    
}

?>