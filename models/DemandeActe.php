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
        where demande_acte.statut = 'En attente de validation'
        and demande_acte.id_type_acte = 1";

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
        and demande_acte.id_type_acte = 1
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

function peyerDemande($id){

    $sql = "update demande_acte set statut = 'Payé' where id_demande = :id_demande";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(':id_demande', $id);
    $stmt->execute();
    return $stmt->fetch();
}




function listCertificatAttenteValidation (){

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
        and demande_acte.id_type_acte = 2";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll();
}

function certificatAttenteValidation ($id){

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
        and demande_acte.id_type_acte = 2
        AND demande_acte.id_demande = :id_demande ";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(':id_demande', $id);
    $stmt->execute();
    return $stmt->fetch();

}



function creerUneDemande ($statut, $id_type_acte, $id_citoyen){

    $sql = "INSERT INTO etat_civil_ci.demande_acte
            (statut, date_demande, id_type_acte, id_citoyen)
            VALUES(:statut, now(), :id_type_acte, :id_citoyen);";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(':statut', $statut);
    $stmt->bindParam(':id_type_acte', $id_type_acte);
    $stmt->bindParam(':id_citoyen', $id_citoyen);
    $stmt->execute();

}

function nbrDossier($id_citoyen, $id_type_acte){
    $sql = "select count(*)
        from demande_acte 
        where demande_acte.id_citoyen = :id_citoyen 
        and demande_acte.id_type_acte = :id_type_acte";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(":id_citoyen", $id_citoyen);
    $stmt->bindParam(":id_type_acte", $id_type_acte);
    $stmt->execute();
    return $stmt->fetchColumn();
}

function listDossierForSuivi($id_citoyen){
    $sql = "select 
            distinct demande_acte.id_demande,
            DATE_FORMAT(demande_acte.date_demande, '%d/%m/%Y %H:%i:%s') AS date_demande,
            type_acte.libele,
            citoyen.nom,
            citoyen.prenom,
            demande_acte.statut
            from demande_acte 
            inner join citoyen on citoyen.id_citoyen = demande_acte.id_citoyen
            inner join type_acte on type_acte.id_type_acte = demande_acte.id_type_acte 
            where 
            citoyen.id_citoyen = :id_citoyen 
            order by demande_acte.id_demande desc ";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(":id_citoyen", $id_citoyen);
    $stmt->execute();
    return $stmt->fetchAll();
}

?>