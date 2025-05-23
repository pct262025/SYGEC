<?php 
session_start();
session_destroy();

header("Refresh: 0; url=" . strtok($_SERVER["PHP_SELF"], '?') . "?action=accueil");
?>