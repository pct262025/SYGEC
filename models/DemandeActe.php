<?php 

require_once('config/Database.php');

function listDemandeAttenteValidation (){

    $sql = "select 
        distinct demande_acte.id_demande,
        demande_acte.statut,
        citoyen.nom,
        citoyen.prenom,
        DATE_FORMAT(citoyen.date_naissance, '%d/%m/%Y %H:%i:%s') AS date_naissance,
        citoyen.lieu_naissance,
        DATE_FORMAT(citoyen.marie_le, '%d/%m/%Y %H:%i:%s') AS marie_le,
        citoyen.marie_a,
        citoyen.marie_avec,
        DATE_FORMAT(citoyen.divorce_le, '%d/%m/%Y %H:%i:%s') AS divorce_le,
        DATE_FORMAT(citoyen.deces_le, '%d/%m/%Y %H:%i:%s') AS deces_le,
        citoyen.deces_a,
        citoyenPere.nom as nom_pere,
        citoyenPere.prenom as prenom_pere,
        citoyenMere.nom as nom_mere,
        citoyenMere.prenom as prenom_mere
        from demande_acte 
        inner join citoyen on citoyen.id_citoyen = demande_acte.id_citoyen 
        left join citoyen citoyenPere on citoyenPere.login = citoyen.login_citoyen_pere 
        left join citoyen citoyenMere on citoyenMere.login = citoyen.login_citoyen_mere
        where demande_acte.statut = 'En attente de validation'";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll();
}

function demandeAttenteValidation ($id){

    $sql = "select 
        distinct demande_acte.id_demande,
        demande_acte.statut,
        citoyen.nom,
        citoyen.prenom,
        DATE_FORMAT(citoyen.date_naissance, '%d/%m/%Y %H:%i:%s') AS date_naissance,
        citoyen.lieu_naissance,
        DATE_FORMAT(citoyen.marie_le, '%d/%m/%Y %H:%i:%s') AS marie_le,
        citoyen.marie_a,
        citoyen.marie_avec,
        DATE_FORMAT(citoyen.divorce_le, '%d/%m/%Y %H:%i:%s') AS divorce_le,
        DATE_FORMAT(citoyen.deces_le, '%d/%m/%Y %H:%i:%s') AS deces_le,
        citoyen.deces_a,
        citoyenPere.nom as nom_pere,
        citoyenPere.prenom as prenom_pere,
        citoyenMere.nom as nom_mere,
        citoyenMere.prenom as prenom_mere
        from demande_acte 
        inner join citoyen on citoyen.id_citoyen = demande_acte.id_citoyen 
        left join citoyen citoyenPere on citoyenPere.login = citoyen.login_citoyen_pere 
        left join citoyen citoyenMere on citoyenMere.login = citoyen.login_citoyen_mere
        where demande_acte.statut = 'En attente de validation'
        AND demande_acte.id_demande = :id_demande ";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(':id_demande', $id);
    $stmt->execute();
    return $stmt->fetch();

}

function validerDemande($id){

    $sql = "update demande_acte set statut = 'En attente de paiement' where id_demande = :id_demande";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(':id_demande', $id);
    $stmt->execute();
    return $stmt->fetch();
}

function annulerDemande($id){

    $sql = "update demande_acte set statut = 'Annuler' where id_demande = :id_demande";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(':id_demande', $id);
    $stmt->execute();
    return $stmt->fetch();
}

?>