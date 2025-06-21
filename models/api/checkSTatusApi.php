<?php 

session_start();
header('Content-Type: application/json');
require_once '../../config/database.php';

$sql = " select statut = 'Payé' as status from demande_acte where id_demande = :id_demande ";
$stmt = Database::getConnection()->prepare($sql);
$stmt->bindParam(":id_demande", $_GET["id_demande"]);
$stmt->execute();

$data = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($data);

?>