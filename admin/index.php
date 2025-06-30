
<?php 

session_start();
// session_unset(); 
// session_destroy();
// require_once '../../models/Utilisateur.php';
require_once('../config/Database.php');

function findByLogin ($login){

    $sql = "select * from utilisateur where login = :login";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(':login', $login);
    $stmt->execute();
    return $stmt->fetch();

}

if ( isset($_POST['login']) ){
    $login = $_POST['login'];
    $password = $_POST['password'];

    // verifier que le login existe
    $existingUser = findByLogin($login);
    if ( $existingUser == null ){
        // Gerer un message d'erreur ici
        echo "<div class=\"popup\" id=\"popup\"> le login $login n'existe pas </div>";
        $color  = "#f8d7da";
        $textColor = "#721c24";
    }
    else{
        if ( !password_verify($password, $existingUser['mot_de_passe']) ){
            // Gerer un message d'erreur ici
            echo "<div class=\"popup\" id=\"popup\"> login, mot de passe incorrecte </div>";
            $color  = "#f8d7da";
            $textColor = "#721c24";
        }
        else{
            $_SESSION["id"] = $existingUser["id_utilisateur"];
            $_SESSION["nom"] = $existingUser["nom"];
            $_SESSION["prenom"] = $existingUser["prenom"];
            $_SESSION["id_role"] = $existingUser["id_role"];

            // Afficher le message de reussite
            echo "<div class=\"popup\" id=\"popup\"> Félicitation, Vous êtes bien connectés. </div>";
            $color  = "#d4edda";
            $textColor = "#155724";

            $redirect = "?action=dashboard";
            // header("Refresh: 0; url=" . strtok($_SERVER["PHP_SELF"], '?') . $redirect);
            header("Refresh: 0; url=http://localhost/sygec/" . $redirect);
            // header("Refresh: 3; url=" . strtok($_SERVER["PHP_SELF"], '?') . "?action=accueil");
        }
    }
}

?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Connexion</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #191c24;
            color: #fff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .login-card {
            background-color: #1f2232;
            border-radius: 15px;
            padding: 40px;
            width: 100%;
            max-width: 400px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
        }

        .form-control {
            background-color: #2a2d3e;
            border: 1px solid #444;
            color: #fff;
        }

        .form-control:focus {
            background-color: #2a2d3e;
            color: #fff;
            border-color: #0f0;
            box-shadow: none;
        }

        .form-label {
            color: #ccc;
        }

        .btn-primary {
            background-color: #0f0;
            border: none;
        }



        a {
            color: #0f0;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }
        
        /* start popup */
        .popup {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: <?= $color ?>;
            color: <?= $textColor ?>;
            border: 1px solid <?= $textColor ?>;
            padding: 15px 25px;
            border-radius: 8px;
            font-weight: bold;
            z-index: 9999;
            box-shadow: 0 0 10px rgba(0,0,0,0.2);
            animation: fadeIn 0.5s;
        }
        @keyframes fadeIn {
            from { opacity: 0; top: 0px; }
            to { opacity: 1; top: 20px; }
        }
        /* end popup */

    </style>
</head>

<body>

    <div class="login-card">
        <h2 class="text-center mb-4">Connexion</h2>
        <form action="#" method="post">
            <div class="mb-3">
                <label for="login" class="form-label">Login</label>
                <input type="login" name="login" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Mot de passe</label>
                <input type="password" name="password" class="form-control" id="password" placeholder="••••••••" required>
            </div>
            <div class="mb-3 form-check d-flex justify-content-between">
                <div>
                    <input type="checkbox" class="form-check-input" id="remember">
                    <label class="form-check-label text-light" for="remember">Se souvenir de moi</label>
                </div>
                <a href="motdepasse.php">Mot de passe oublié ?</a>
            </div>
            <button type="submit" class="btn btn-primary w-100">Se connecter</button>
        </form>
        <p class="mt-4 text-center inscript">Pas encore de compte ? <a href="#">S'inscrire</a></p>
    </div>

    <script>
        document.querySelector('.inscript').addEventListener('click', function(event) {
            event.preventDefault(); // Empêche la navigation immédiate
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            // Remplace ou ajoute 'action=login'
            params.set('action', 'register');
            // Reconstruit l'URL avec les nouveaux paramètres
            url.search = params.toString();
            // Redirige vers la nouvelle URL
            window.location.href = url.toString();
        });

        // start faire disparaitre le popup
        setTimeout(function () {
            const popup = document.getElementById('popup');
            if ( popup != null ){
                popup.style.opacity = '0';
                setTimeout(() => popup.style.display = 'none', 500); // attend la transition
            }
        }, 3000);
        // end faire disparaitre le popup
    </script>
</body>

</html>
