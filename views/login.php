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
    </style>
</head>

<body>

    <div class="login-card">
        <h2 class="text-center mb-4">Connexion</h2>
        <form>
            <div class="mb-3">
                <label for="email" class="form-label">Login</label>
                <input type="email" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Mot de passe</label>
                <input type="password" class="form-control" id="password" placeholder="••••••••" required>
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
    </script>
</body>

</html>
