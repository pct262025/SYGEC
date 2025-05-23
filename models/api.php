<?php
session_start();
header('Content-Type: application/json');
require_once '../config/database.php';

$sql = "select * from citoyen WHERE id_citoyen = :id_citoyen ";
$stmt = Database::getConnection()->prepare($sql);
$stmt->bindParam(":id_citoyen", $_SESSION["id"]);
$stmt->execute();

$data = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($data);
?>