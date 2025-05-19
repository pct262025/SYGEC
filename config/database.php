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


class Database{

    private static $host = 'localhost';
    private static $db = 'etat_civil_ci';
    private static $user = 'root';
    private static $pass = '';

    public static function getConnection() {
        try {
            return new PDO("mysql:host=".self::$host.";dbname=".self::$db.";charset=utf8", self::$user, self::$pass);
        } catch (PDOException $e) {
            die("Erreur de connexion: " . $e->getMessage());
        }
    }
}

?>