<?php
$host = 'localhost';
$db = 'etat_civil_ci';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
} catch (PDOException $e) {
    die("Erreur de connexion: " . $e->getMessage());
}
?>