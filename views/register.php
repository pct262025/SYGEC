
<?php
require_once 'models/Citoyen.php';

if ( isset($_POST['nom']) ) { // Cela veut dire que le formulaire a été validé

    $nom = $_POST['nom'];
    $prenoms = isset($_POST['prenoms']) ? $_POST['prenoms'] : null;
    $contact = isset($_POST['contact']) ? $_POST['contact'] : null;
    $login = isset($_POST['login']) ? $_POST['login'] : null;
    $motdepasse = isset($_POST['motdepasse']) ? password_hash( $_POST['motdepasse'] , PASSWORD_DEFAULT) : null;
    $nationalite = isset($_POST['nationalite']) ? $_POST['nationalite'] : null;
    $datenaissance = isset($_POST['datenaissance']) ? $_POST['datenaissance'] : null;
    $email = isset($_POST['email']) ? $_POST['email'] : null;
    $profession = isset($_POST['profession']) ? $_POST['profession'] : null;
    
    $existingUser = findByLogin($login);
    if ( $existingUser != null ){
        // Gerer un message d'erreur ici
        echo "<div class=\"popup\" id=\"popup\"> le login $login existe déja </div>";
        $color  = "#f8d7da";
        $textColor = "#721c24";
    }else{

        save($nom, $prenoms, $contact, $login, $motdepasse, $nationalite, $datenaissance, $email, $profession);
        echo "<div class=\"popup\" id=\"popup\"> Citoyen enregisté avec success </div>";
        $color  = "#d4edda";
        $textColor = "#155724";

        header("Refresh: 3; url=" . strtok($_SERVER["PHP_SELF"], '?') . "?action=accueil");
    }
    

}

?>


<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Inscription </title>
    <style>
        body {
            background-color: #191c24;
            color: #fff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
        }

        .login-card {
            background-color: #1f2232;
            border-radius: 15px;
            padding: 40px;
            width: 100%;
            max-width: 500px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
        }

        .login-card h2 {
            text-align: center;
            margin-bottom: 25px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-label {
            display: block;
            margin-bottom: 5px;
            color: #ccc;
            font-weight: bold;
        }

        .form-control {
            width: 100%;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #444;
            background-color: #2a2d3e;
            color: #fff;
            font-size: 14px;
        }

        .form-control:focus {
            background-color: #2a2d3e;
            color: #fff;
            border-color: #0f0;
            outline: none;
            box-shadow: none;
        }

        .btn-primary {
            width: 100%;
            padding: 12px;
            background-color: #0f0;
            color: #000;
            font-weight: bold;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .btn-primary:hover {
            background-color: #0c0;
        }

        a {
            color: #0f0;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        .mt-30{
            margin-top: 30px;
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

    <div class="login-card mt-30">
        <h2>Créer un compte</h2>
        <form method="post" action="#">
            <h4>Informations obligatoires</h4>
            <div class="form-group">
                <label for="nom" class="form-label">Nom</label>
                <input type="text" id="nom" name="nom" class="form-control" required>
            </div>

            <div class="form-group">
                <label for="prenoms" class="form-label">Prénoms</label>
                <input type="text" id="prenoms" name="prenoms" class="form-control" required>
            </div>

            <div class="form-group">
                <label for="contact" class="form-label">Contact</label>
                <input type="number" id="contact" name="contact" class="form-control" placeholder=" +225 01233222" required>
            </div>

            <div class="form-group">
                <label for="email" class="form-label">Login</label>
                <input type="text" id="login" name="login" class="form-control" required>
            </div>

            <div class="form-group">
                <label for="motdepasse" class="form-label">Mot de passe</label>
                <input type="password" id="motdepasse" name="motdepasse" class="form-control" required>
            </div>
            

            <div class="form-group">
                <label for="nationalite" class="form-label">Nationalité</label>
                <select id="nationalite" name="nationalite" class="form-control" required>
                    <option value="">Sélectionner...</option>
                    <option value="CI">CÔTE D’IVOIRE</option>
                    <option value="AF">AFGHANISTAN</option>
                    <option value="ZA">AFRIQUE DU SUD</option>
                    <option value="AL">ALBANIE</option>
                    <option value="DZ">ALGÉRIE</option>
                    <option value="DE">ALLEMAGNE</option>
                    <option value="AD">ANDORRE</option>
                    <option value="AO">ANGOLA</option>
                    <option value="AI">ANGUILLA</option>
                    <option value="AQ">ANTARCTIQUE</option>
                    <option value="AG">ANTIGUA-ET-BARBUDA</option>
                    <option value="AN">ANTILLES NÉERLANDAISES</option>
                    <option value="SA">ARABIE SAOUDITE</option>
                    <option value="AR">ARGENTINE</option>
                    <option value="AM">ARMÉNIE</option>
                    <option value="AW">ARUBA</option>
                    <option value="AU">AUSTRALIE</option>
                    <option value="AT">AUTRICHE</option>
                    <option value="AZ">AZERBAÏDJAN</option>
                    <option value="BS">BAHAMAS</option>
                    <option value="BH">BAHREÏN</option>
                    <option value="BD">BANGLADESH</option>
                    <option value="BB">BARBADE</option>
                    <option value="BY">BÉLARUS</option>
                    <option value="BE">BELGIQUE</option>
                    <option value="BZ">BELIZE</option>
                    <option value="BJ">BÉNIN</option>
                    <option value="BM">BERMUDES</option>
                    <option value="BT">BHOUTAN</option>
                    <option value="BO">BOLIVIE</option>
                    <option value="BA">BOSNIE-HERZÉGOVINE</option>
                    <option value="BW">BOTSWANA</option>
                    <option value="BR">BRÉSIL</option>
                    <option value="BN">BRUNÉI DARUSSALAM</option>
                    <option value="BG">BULGARIE</option>
                    <option value="BF">BURKINA FASO</option>
                    <option value="BI">BURUNDI</option>
                    <option value="KH">CAMBODGE</option>
                    <option value="CM">CAMEROUN</option>
                    <option value="CA">CANADA</option>
                    <option value="CV">CAP-VERT</option>
                    <option value="CL">CHILI</option>
                    <option value="CN">CHINE</option>
                    <option value="CY">CHYPRE</option>
                    <option value="CO">COLOMBIE</option>
                    <option value="KM">COMORES</option>
                    <option value="CG">CONGO</option>
                    <option value="KP">CORÉE DU NORD</option>
                    <option value="KR">CORÉE DU SUD</option>
                    <option value="CR">COSTA RICA</option>
                    <option value="HR">CROATIE</option>
                    <option value="CU">CUBA</option>
                    <option value="DK">DANEMARK</option>
                    <option value="DJ">DJIBOUTI</option>
                    <option value="DM">DOMINIQUE</option>
                    <option value="EG">ÉGYPTE</option>
                    <option value="SV">EL SALVADOR</option>
                    <option value="AE">ÉMIRATS ARABES UNIS</option>
                    <option value="EC">ÉQUATEUR</option>
                    <option value="ER">ÉRYTHRÉE</option>
                    <option value="ES">ESPAGNE</option>
                    <option value="EE">ESTONIE</option>
                    <option value="VA">ÉTAT DE LA CITÉ DU VATICAN</option>
                    <option value="FM">ÉTATS FÉDÉRÉS DE MICRONÉSIE</option>
                    <option value="US">ÉTATS-UNIS</option>
                    <option value="ET">ÉTHIOPIE</option>
                    <option value="FJ">FIDJI</option>
                    <option value="FI">FINLANDE</option>
                    <option value="FR">FRANCE</option>
                    <option value="GA">GABON</option>
                    <option value="GM">GAMBIE</option>
                    <option value="GS">GÉORGIE DU SUD ET LES ÎLES SANDWICH DU SUD</option>
                    <option value="GE">GÉORGIE</option>
                    <option value="GH">GHANA</option>
                    <option value="GI">GIBRALTAR</option>
                    <option value="GR">GRÈCE</option>
                    <option value="GD">GRENADE</option>
                    <option value="GL">GROENLAND</option>
                    <option value="GP">GUADELOUPE</option>
                    <option value="GU">GUAM</option>
                    <option value="GT">GUATEMALA</option>
                    <option value="GG">GUERNESEY</option>
                    <option value="GQ">GUINÉE ÉQUATORIALE</option>
                    <option value="GN">GUINÉE</option>
                    <option value="GW">GUINÉE-BISSAU</option>
                    <option value="GY">GUYANA</option>
                    <option value="GF">GUYANE FRANÇAISE</option>
                    <option value="HT">HAÏTI</option>
                    <option value="HN">HONDURAS</option>
                    <option value="HK">HONG KONG</option>
                    <option value="HU">HONGRIE</option>
                    <option value="BV">ÎLE BOUVET</option>
                    <option value="CX">ÎLE CHRISTMAS</option>
                    <option value="IM">ÎLE DE MAN</option>
                    <option value="NF">ÎLE NORFOLK</option>
                    <option value="AX">ÎLES ÅLAND</option>
                    <option value="KY">ÎLES CAÏMANS</option>
                    <option value="CC">ÎLES COCOS - KEELING</option>
                    <option value="CK">ÎLES COOK</option>
                    <option value="FO">ÎLES FÉROÉ</option>
                    <option value="HM">ÎLES HEARD ET MACDONALD</option>
                    <option value="FK">ÎLES MALOUINES</option>
                    <option value="MP">ÎLES MARIANNES DU NORD</option>
                    <option value="MH">ÎLES MARSHALL</option>
                    <option value="UM">ÎLES MINEURES ÉLOIGNÉES DES ÉTATS-UNIS</option>
                    <option value="SB">ÎLES SALOMON</option>
                    <option value="TC">ÎLES TURKS ET CAÏQUES</option>
                    <option value="VG">ÎLES VIERGES BRITANNIQUES</option>
                    <option value="VI">ÎLES VIERGES DES ÉTATS-UNIS</option>
                    <option value="IN">INDE</option>
                    <option value="ID">INDONÉSIE</option>
                    <option value="IQ">IRAK</option>
                    <option value="IR">IRAN</option>
                    <option value="IE">IRLANDE</option>
                    <option value="IS">ISLANDE</option>
                    <option value="IL">ISRAËL</option>
                    <option value="IT">ITALIE</option>
                    <option value="JM">JAMAÏQUE</option>
                    <option value="JP">JAPON</option>
                    <option value="JE">JERSEY</option>
                    <option value="JO">JORDANIE</option>
                    <option value="KZ">KAZAKHSTAN</option>
                    <option value="KE">KENYA</option>
                    <option value="KG">KIRGHIZISTAN</option>
                    <option value="KI">KIRIBATI</option>
                    <option value="KW">KOWEÏT</option>
                    <option value="LA">LAOS</option>
                    <option value="LS">LESOTHO</option>
                    <option value="LV">LETTONIE</option>
                    <option value="LB">LIBAN</option>
                    <option value="LR">LIBÉRIA</option>
                    <option value="LY">LIBYE</option>
                    <option value="LI">LIECHTENSTEIN</option>
                    <option value="LT">LITUANIE</option>
                    <option value="LU">LUXEMBOURG</option>
                    <option value="MO">MACAO</option>
                    <option value="MK">MACÉDOINE</option>
                    <option value="MG">MADAGASCAR</option>
                    <option value="MY">MALAISIE</option>
                    <option value="MW">MALAWI</option>
                    <option value="MV">MALDIVES</option>
                    <option value="ML">MALI</option>
                    <option value="MT">MALTE</option>
                    <option value="MA">MAROC</option>
                    <option value="MQ">MARTINIQUE</option>
                    <option value="MU">MAURICE</option>
                    <option value="MR">MAURITANIE</option>
                    <option value="YT">MAYOTTE</option>
                    <option value="MX">MEXIQUE</option>
                    <option value="MD">MOLDAVIE</option>
                    <option value="MC">MONACO</option>
                    <option value="MN">MONGOLIE</option>
                    <option value="ME">MONTÉNÉGRO</option>
                    <option value="MS">MONTSERRAT</option>
                    <option value="MZ">MOZAMBIQUE</option>
                    <option value="MM">MYANMAR</option>
                    <option value="NA">NAMIBIE</option>
                    <option value="NR">NAURU</option>
                    <option value="NP">NÉPAL</option>
                    <option value="NI">NICARAGUA</option>
                    <option value="NE">NIGER</option>
                    <option value="NG">NIGÉRIA</option>
                    <option value="NU">NIUE</option>
                    <option value="NO">NORVÈGE</option>
                    <option value="NC">NOUVELLE-CALÉDONIE</option>
                    <option value="NZ">NOUVELLE-ZÉLANDE</option>
                    <option value="OM">OMAN</option>
                    <option value="UG">OUGANDA</option>
                    <option value="UZ">OUZBÉKISTAN</option>
                    <option value="PK">PAKISTAN</option>
                    <option value="PW">PALAOS</option>
                    <option value="PA">PANAMA</option>
                    <option value="PG">PAPOUASIE-NOUVELLE-GUINÉE</option>
                    <option value="PY">PARAGUAY</option>
                    <option value="NL">PAYS-BAS</option>
                    <option value="PE">PÉROU</option>
                    <option value="PH">PHILIPPINES</option>
                    <option value="PN">PITCAIRN</option>
                    <option value="PL">POLOGNE</option>
                    <option value="PF">POLYNÉSIE FRANÇAISE</option>
                    <option value="PR">PORTO RICO</option>
                    <option value="PT">PORTUGAL</option>
                    <option value="QA">QATAR</option>
                    <option value="CF">RCA</option>
                    <option value="CD">RDC</option>
                    <option value="ZZ">RÉGION INDÉTERMINÉE</option>
                    <option value="DO">RÉPUBLIQUE DOMINICAINE</option>
                    <option value="CZ">RÉPUBLIQUE TCHÈQUE</option>
                    <option value="RE">RÉUNION</option>
                    <option value="RO">ROUMANIE</option>
                    <option value="GB">ROYAUME-UNI</option>
                    <option value="RU">RUSSIE</option>
                    <option value="RW">RWANDA</option>
                    <option value="EH">SAHARA OCCIDENTAL</option>
                    <option value="BL">SAINT-BARTHÉLÉMY</option>
                    <option value="SH">SAINTE-HÉLÈNE</option>
                    <option value="LC">SAINTE-LUCIE</option>
                    <option value="KN">SAINT-KITTS-ET-NEVIS</option>
                    <option value="SM">SAINT-MARIN</option>
                    <option value="MF">SAINT-MARTIN</option>
                    <option value="PM">SAINT-PIERRE-ET-MIQUELON</option>
                    <option value="VC">SAINT-VINCENT-ET-LES GRENADINES</option>
                    <option value="AS">SAMOA AMÉRICAINES</option>
                    <option value="WS">SAMOA</option>
                    <option value="ST">SAO TOMÉ-ET-PRINCIPE</option>
                    <option value="SN">SÉNÉGAL</option>
                    <option value="RS">SERBIE</option>
                    <option value="CS">SERBIE-ET-MONTÉNÉGRO</option>
                    <option value="SC">SEYCHELLES</option>
                    <option value="SL">SIERRA LEONE</option>
                    <option value="SG">SINGAPOUR</option>
                    <option value="SK">SLOVAQUIE</option>
                    <option value="SI">SLOVÉNIE</option>
                    <option value="SO">SOMALIE</option>
                    <option value="SD">SOUDAN</option>
                    <option value="LK">SRI LANKA</option>
                    <option value="SE">SUÈDE</option>
                    <option value="CH">SUISSE</option>
                    <option value="SR">SURINAME</option>
                    <option value="SJ">SVALBARD ET ÎLE JAN MAYEN</option>
                    <option value="SZ">SWAZILAND</option>
                    <option value="SY">SYRIE</option>
                    <option value="TJ">TADJIKISTAN</option>
                    <option value="TW">TAÏWAN</option>
                    <option value="TZ">TANZANIE</option>
                    <option value="TD">TCHAD</option>
                    <option value="TF">TERRES AUSTRALES FRANÇAISES</option>
                    <option value="IO">TERRITOIRE BRITANNIQUE DE L&#039;OCÉAN INDIEN</option>
                    <option value="PS">TERRITOIRE PALESTINIEN</option>
                    <option value="TH">THAÏLANDE</option>
                    <option value="TL">TIMOR ORIENTAL</option>
                    <option value="TG">TOGO</option>
                    <option value="TK">TOKELAU</option>
                    <option value="TO">TONGA</option>
                    <option value="TT">TRINITÉ-ET-TOBAGO</option>
                    <option value="TN">TUNISIE</option>
                    <option value="TM">TURKMÉNISTAN</option>
                    <option value="TR">TURQUIE</option>
                    <option value="TV">TUVALU</option>
                    <option value="UA">UKRAINE</option>
                    <option value="UY">URUGUAY</option>
                    <option value="VU">VANUATU</option>
                    <option value="VE">VENEZUELA</option>
                    <option value="VN">VIÊT NAM</option>
                    <option value="WF">WALLIS-ET-FUTUNA</option>
                    <option value="YE">YÉMEN</option>
                    <option value="ZM">ZAMBIE</option>
                    <option value="ZW">ZIMBABWE</option>
                </select>
                <!-- Ajoutez d'autres options ici -->
                </select>

            </div>

            <br><hr><br>

            <h4>Autres informations</h4>

            <div class="form-group">
                <label for="datenaissance" class="form-label">Date de naissance</label>
                <input type="date" id="datenaissance" name="datenaissance" class="form-control" >
            </div>

            
            <div class="form-group">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" name="email" class="form-control" >
            </div>

            <div class="form-group">
                <label for="profession" class="form-label">Profession</label>
                <input type="text" id="profession" name="profession" placeholder="profession" class="form-control"
                    >
            </div>

            <button type="submit" class="btn-primary">S'inscrire</button> <br><br>
            <p class="mt-4 text-center connect">Déjà un compte ? <a href="#">Se connecter</a></p>
        </form>
    </div>



    <script>
        document.querySelector('.connect').addEventListener('click', function(event) {
            event.preventDefault(); // Empêche la navigation immédiate
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            // Remplace ou ajoute 'action=login'
            params.set('action', 'login');
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
