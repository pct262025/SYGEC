<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mot de passe oublié</title>

    <style>
        body {
            margin: 0;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            background-color: #0d1117;
            color: #e6edf3;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        .container {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 30px 10px;
        }

        .login-card {
            background-color: #161b22;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 15px rgba(0, 255, 0, 0.2);
            width: 100%;
            max-width: 400px;
        }

        .login-card h2 {
            text-align: center;
            margin-bottom: 25px;
            color: #0f0;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: #ccc;
            font-weight: bold;
        }

        .form-control {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 6px;
            background-color: #0d1117;
            color: #fff;
            border: 1px solid #30363d;
        }

        .form-control:focus {
            outline: none;
            border-color: #0f0;
        }

        .btn-primary {
            width: 100%;
            padding: 12px;
            background-color: #0f0;
            color: #000;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            transition: background-color 0.3s ease;
        }

        .btn-primary:disabled {
            background-color: #444;
            color: #999;
            cursor: not-allowed;
        }

        .btn-primary:hover:enabled {
            background-color: #0a0;
        }

        footer {
            margin-top: 60px;
            padding: 30px 20px;
            background-color: #11141c;
            color: #ccc;
            font-size: 14px;
        }

        .footer-container {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            max-width: 1000px;
            margin: auto;
        }

        .footer-section {
            flex: 1;
            min-width: 250px;
            margin: 10px;
        }

        .footer-section h3 {
            color: #0f0;
            margin-bottom: 15px;
        }

        .footer-section ul {
            list-style-type: none;
            padding: 0;
        }

        .footer-section ul li {
            margin-bottom: 8px;
            color: #bbb;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="login-card">
            <h2>Mot de passe oublié</h2>
            <form action="/mot-de-passe-oublie" method="post" id="formLogin">
                <div class="form-group">
                    <label for="email">Adresse email</label>
                    <input type="email" id="email" name="email" class="form-control" placeholder="Entrez votre email"
                        required />
                </div>

                <div class="form-group">
                    <label for="login">Nom d'utilisateur (login)</label>
                    <input type="text" id="login" name="login" class="form-control" placeholder="Entrez votre login"
                        required />
                </div>

                <div class="form-group">
                    <div id="captcha"></div>
                </div>

                <button type="submit" id="btnConnexion" class="btn-primary" disabled>Valider</button>
            </form>
        </div>
    </div>

    < <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer>
        </script>
        <script>
            var onloadCallback = function () {
                grecaptcha.render('captcha', {
                    'sitekey': '6LdeRzUrAAAAAFO3zBB8RW6GQmGkolyU9lrwb7gz',
                    'callback': function (response) {
                        document.getElementById('btnConnexion').disabled = false;
                    }
                });
            };
        </script>
</body>

</html>
