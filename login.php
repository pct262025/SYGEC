<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Connexion - Système de Gestion des Etats Civil</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f9;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        header {
            background-color: green;
            color: white;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .logo-gauche, .logo-droite {
            height: 60px;
        }

        header h1 {
            font-size: 26px;
            margin: 0;
            flex: 1;
            text-align: center;
        }

        nav {
            background-color: #eee;
            padding: 10px 20px;
            display: flex;
            justify-content: center;
            gap: 30px;
            position: relative;
        }

        nav a {
            text-decoration: none;
            color: #005a87;
            font-weight: bold;
            position: relative;
        }

        nav a:hover {
            text-decoration: underline;
        }

        .login-container {
            display: flex;
            justify-content: flex-end;
            padding: 10px 20px;
            background-color: #eee;
        }

        .login-button {
            background-color: orange;
            color: #005A87;
            border: none;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            text-decoration: none;
            font-size: 16px;
            display: inline-block;
            transition: background-color 0.3s ease;
        }

        .login-button:hover {
            background-color: darkorange;
        }

        .row {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
        }

        .col-md-4 {
            width: 100%;
            max-width: 400px;
            padding: 15px;
        }

        .login-form-container {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .form-group {
            margin-bottom: 15px;
            text-align: left;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            color: #005a87;
        }

        .form-group input {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }

        button {
            width: 100%;
            padding: 10px;
            background-color: orange;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        button:hover {
            background-color: darkorange;
        }

        .login-options {
            margin-top: 15px;
            display: flex;
            justify-content: space-between;
        }

        .login-options a {
            color: #005a87;
            text-decoration: none;
        }

        .login-options a:hover {
            text-decoration: underline;
        }

        footer {
            background-color: green;
            color: white;
            padding: 30px 20px;
            margin-top: auto;
        }

        .footer-container {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
        }

        .footer-section {
            flex: 1;
            min-width: 250px;
            margin: 10px;
        }

        .footer-section h3 {
            border-bottom: 2px solid white;
            padding-bottom: 5px;
            margin-bottom: 10px;
        }

        .footer-section ul {
            list-style: none;
            padding: 0;
        }

        .footer-section li {
            margin-bottom: 8px;
        }
    </style>
</head>
<body>

<header>
    <img src="assets/img/logo_yakro.png" alt="Logo de la mairie" class="logo-gauche">
    <h1>SYSTEME DE GESTION D'ETATS CIVIL - YAMOUSSOUKRO</h1>
    <img src="assets/img/embleme_ci.png" alt="Image à droite" class="logo-droite">
</header>

<nav>
    <a href="#">Demande d’acte</a>
    <a href="#">Declaration d'acte</a>
    <a href="#">Tarifs</a>
    <a href="#">Contacts</a>

    <div class="login-container">
        <a href="login.html" class="login-button">
            <i class="fas fa-arrow-right"></i> Se connecter
        </a>
    </div>
</nav>

<div class="row">
    <div class="col-md-4">
        <form action="" method="post" id="formLogin" class="login-form-container">
            <h2>Connexion</h2>
            <div class="form-group">
                <label for="username">Login :</label>
                <input type="text" class="form-control" id="username" name="_username" value="" required="required"/>
            </div>
            <div class="form-group">
                <label for="password">Mot de passe :</label>
                <input type="password" class="form-control" id="password" name="_password" required="required"/>
            </div>
            <input type="hidden" name="_csrf_token" value="Eghk1pj3U4ua6OSUOf__YusBCVfEH7iTAuLCEuKwZYk">
            <button type="submit" class="btn btn-primary">Connexion</button>
            <div class="login-options">
                <a href="register.html">Inscrivez-vous</a>
                <a href="motdepasse.html">Mot de passe oublié</a>
            </div>
        </form>
    </div>
</div>

<footer>
    <div class="footer-container">
        <div class="footer-section">
            <h3>Services</h3>
            <ul>
                <li>Déclaration de naissance</li>
                <li>Déclaration de mariage</li>
                <li>Déclaration de décès</li>
                <li>Demande d'actes</li>
            </ul>
        </div>
        <div class="footer-section">
            <h3>Contact</h3>
            <ul>
                <li>Téléphone : +225 01 23 45 67 89</li>
                <li>Email : contact@etatcivil.ci</li>
                <li>Adresse : Hôtel de Ville, Yakro, Côte d'Ivoire</li>
            </ul>
        </div>
    </div>
</footer>

</body>
</html>
