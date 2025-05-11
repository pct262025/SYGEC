<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Inscription - Système de Gestion des Etats Civil</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f9;
            margin: 0;
            padding: 0;
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

        .dropdown {
            position: relative;
        }

        .dropdown-toggle {
            text-decoration: none;
            color: #005a87;
            font-weight: bold;
            cursor: pointer;
        }

        .dropdown-content {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            background-color: white;
            min-width: 180px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            z-index: 1;
        }

        .dropdown-content a {
            display: block;
            padding: 10px;
            color: #005a87;
            text-decoration: none;
        }

        .dropdown-content a:hover {
            background-color: #f0f0f0;
        }

        .dropdown:hover .dropdown-content {
            display: block;
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

        .form-container {
            background-color: white;
            max-width: 500px;
            margin: 40px auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .form-container h2 {
            text-align: center;
            color: #005a87;
        }

        .form-group {
            margin-bottom: 15px;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            color: #005a87;
        }

        .form-group input, .form-group select {
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

        .prev-btn {
            background-color: #ccc;
        }

        .prev-btn:hover {
            background-color: #bbb;
        }

        .mws-form-inline {
            display: none;
        }

        .mws-form-inline.active {
            display: block;
        }

        footer {
            background-color: green;
            color: white;
            padding: 30px 20px;
            margin-top: 40px;
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
    <div class="dropdown">
        <a class="dropdown-toggle">Demande d’acte ▾</a>
        <div class="dropdown-content">
            <a href="index.php?action=demande&type=naissance">Acte de naissance</a>
            <a href="index.php?action=demande&type=mariage">Acte de mariage</a>
            <a href="index.php?action=demande&type=deces">Acte de décès</a>
        </div>
    </div>
    <div class="dropdown">
        <a class="dropdown-toggle">Declaration d'acte ▾</a>
        <div class="dropdown-content">
            <a href="index.php?action=demande&type=naissance">Déclaration de Naissance</a>
            <a href="index.php?action=demande&type=mariage">Déclaration de mariage</a>
            <a href="index.php?action=demande&type=deces">Déclaration de décès</a>
        </div>
    </div>
    <a href="#">Tarifs</a>
    <a href="#">Contacts</a>

    <div class="login-container">
        <a href="login.html" class="login-button">
            <i class="fas fa-arrow-right"></i> Se connecter
        </a>
    </div>
</nav>

<div class="form-container">
    <h2>Inscription</h2>
    <form name="form" method="post" class="mws-form wzd-validate form-horizontal">
        <!-- Etape 1 -->
        <fieldset class="wizard-step mws-form-inline active">
            <h3 class="fs-title">Informations Personnelles</h3>
            <div class="form-group">
                <label for="form_nom">Nom:</label>
                <input type="text" id="form_nom" name="form[nom]" required class="form-control" placeholder="Entrer le Nom" />
            </div>
            <div class="form-group">
                <label for="form_prenoms">Prénoms :</label>
                <input type="text" id="form_prenoms" name="form[prenoms]" required class="form-control" placeholder="Entrer le prénoms" />
            </div>
            <div class="form-group">
                <label for="form_datenaissance">Date de Naissance :</label>
                <input type="date" id="form_datenaissance" name="form[datenaissance]" required class="form-control" />
            </div>
            <button type="button" class="next-btn">Suivant</button>
        </fieldset>

        <!-- Etape 2 -->
        <fieldset class="wizard-step mws-form-inline">
            <h3 class="fs-title">Informations Complémentaires</h3>
            <div class="form-group">
                <label for="form_nationalite">Nationalité :</label>
                <select id="form_nationalite" name="form[nationalite]" required class="form-control">
                    
                    <option value="CI">CÔTE D’IVOIRE</option><option value="AF">AFGHANISTAN</option><option value="ZA">AFRIQUE DU SUD</option><option value="AL">ALBANIE</option><option value="DZ">ALGÉRIE</option><option value="DE">ALLEMAGNE</option><option value="AD">ANDORRE</option><option value="AO">ANGOLA</option><option value="AI">ANGUILLA</option><option value="AQ">ANTARCTIQUE</option><option value="AG">ANTIGUA-ET-BARBUDA</option><option value="AN">ANTILLES NÉERLANDAISES</option><option value="SA">ARABIE SAOUDITE</option><option value="AR">ARGENTINE</option><option value="AM">ARMÉNIE</option><option value="AW">ARUBA</option><option value="AU">AUSTRALIE</option><option value="AT">AUTRICHE</option><option value="AZ">AZERBAÏDJAN</option><option value="BS">BAHAMAS</option><option value="BH">BAHREÏN</option><option value="BD">BANGLADESH</option><option value="BB">BARBADE</option><option value="BY">BÉLARUS</option><option value="BE">BELGIQUE</option><option value="BZ">BELIZE</option><option value="BJ">BÉNIN</option><option value="BM">BERMUDES</option><option value="BT">BHOUTAN</option><option value="BO">BOLIVIE</option><option value="BA">BOSNIE-HERZÉGOVINE</option><option value="BW">BOTSWANA</option><option value="BR">BRÉSIL</option><option value="BN">BRUNÉI DARUSSALAM</option><option value="BG">BULGARIE</option><option value="BF">BURKINA FASO</option><option value="BI">BURUNDI</option><option value="KH">CAMBODGE</option><option value="CM">CAMEROUN</option><option value="CA">CANADA</option><option value="CV">CAP-VERT</option><option value="CL">CHILI</option><option value="CN">CHINE</option><option value="CY">CHYPRE</option><option value="CO">COLOMBIE</option><option value="KM">COMORES</option><option value="CG">CONGO</option><option value="KP">CORÉE DU NORD</option><option value="KR">CORÉE DU SUD</option><option value="CR">COSTA RICA</option><option value="HR">CROATIE</option><option value="CU">CUBA</option><option value="DK">DANEMARK</option><option value="DJ">DJIBOUTI</option><option value="DM">DOMINIQUE</option><option value="EG">ÉGYPTE</option><option value="SV">EL SALVADOR</option><option value="AE">ÉMIRATS ARABES UNIS</option><option value="EC">ÉQUATEUR</option><option value="ER">ÉRYTHRÉE</option><option value="ES">ESPAGNE</option><option value="EE">ESTONIE</option><option value="VA">ÉTAT DE LA CITÉ DU VATICAN</option><option value="FM">ÉTATS FÉDÉRÉS DE MICRONÉSIE</option><option value="US">ÉTATS-UNIS</option><option value="ET">ÉTHIOPIE</option><option value="FJ">FIDJI</option><option value="FI">FINLANDE</option><option value="FR">FRANCE</option><option value="GA">GABON</option><option value="GM">GAMBIE</option><option value="GS">GÉORGIE DU SUD ET LES ÎLES SANDWICH DU SUD</option><option value="GE">GÉORGIE</option><option value="GH">GHANA</option><option value="GI">GIBRALTAR</option><option value="GR">GRÈCE</option><option value="GD">GRENADE</option><option value="GL">GROENLAND</option><option value="GP">GUADELOUPE</option><option value="GU">GUAM</option><option value="GT">GUATEMALA</option><option value="GG">GUERNESEY</option><option value="GQ">GUINÉE ÉQUATORIALE</option><option value="GN">GUINÉE</option><option value="GW">GUINÉE-BISSAU</option><option value="GY">GUYANA</option><option value="GF">GUYANE FRANÇAISE</option><option value="HT">HAÏTI</option><option value="HN">HONDURAS</option><option value="HK">HONG KONG</option><option value="HU">HONGRIE</option><option value="BV">ÎLE BOUVET</option><option value="CX">ÎLE CHRISTMAS</option><option value="IM">ÎLE DE MAN</option><option value="NF">ÎLE NORFOLK</option><option value="AX">ÎLES ÅLAND</option><option value="KY">ÎLES CAÏMANS</option><option value="CC">ÎLES COCOS - KEELING</option><option value="CK">ÎLES COOK</option><option value="FO">ÎLES FÉROÉ</option><option value="HM">ÎLES HEARD ET MACDONALD</option><option value="FK">ÎLES MALOUINES</option><option value="MP">ÎLES MARIANNES DU NORD</option><option value="MH">ÎLES MARSHALL</option><option value="UM">ÎLES MINEURES ÉLOIGNÉES DES ÉTATS-UNIS</option><option value="SB">ÎLES SALOMON</option><option value="TC">ÎLES TURKS ET CAÏQUES</option><option value="VG">ÎLES VIERGES BRITANNIQUES</option><option value="VI">ÎLES VIERGES DES ÉTATS-UNIS</option><option value="IN">INDE</option><option value="ID">INDONÉSIE</option><option value="IQ">IRAK</option><option value="IR">IRAN</option><option value="IE">IRLANDE</option><option value="IS">ISLANDE</option><option value="IL">ISRAËL</option><option value="IT">ITALIE</option><option value="JM">JAMAÏQUE</option><option value="JP">JAPON</option><option value="JE">JERSEY</option><option value="JO">JORDANIE</option><option value="KZ">KAZAKHSTAN</option><option value="KE">KENYA</option><option value="KG">KIRGHIZISTAN</option><option value="KI">KIRIBATI</option><option value="KW">KOWEÏT</option><option value="LA">LAOS</option><option value="LS">LESOTHO</option><option value="LV">LETTONIE</option><option value="LB">LIBAN</option><option value="LR">LIBÉRIA</option><option value="LY">LIBYE</option><option value="LI">LIECHTENSTEIN</option><option value="LT">LITUANIE</option><option value="LU">LUXEMBOURG</option><option value="MO">MACAO</option><option value="MK">MACÉDOINE</option><option value="MG">MADAGASCAR</option><option value="MY">MALAISIE</option><option value="MW">MALAWI</option><option value="MV">MALDIVES</option><option value="ML">MALI</option><option value="MT">MALTE</option><option value="MA">MAROC</option><option value="MQ">MARTINIQUE</option><option value="MU">MAURICE</option><option value="MR">MAURITANIE</option><option value="YT">MAYOTTE</option><option value="MX">MEXIQUE</option><option value="MD">MOLDAVIE</option><option value="MC">MONACO</option><option value="MN">MONGOLIE</option><option value="ME">MONTÉNÉGRO</option><option value="MS">MONTSERRAT</option><option value="MZ">MOZAMBIQUE</option><option value="MM">MYANMAR</option><option value="NA">NAMIBIE</option><option value="NR">NAURU</option><option value="NP">NÉPAL</option><option value="NI">NICARAGUA</option><option value="NE">NIGER</option><option value="NG">NIGÉRIA</option><option value="NU">NIUE</option><option value="NO">NORVÈGE</option><option value="NC">NOUVELLE-CALÉDONIE</option><option value="NZ">NOUVELLE-ZÉLANDE</option><option value="OM">OMAN</option><option value="UG">OUGANDA</option><option value="UZ">OUZBÉKISTAN</option><option value="PK">PAKISTAN</option><option value="PW">PALAOS</option><option value="PA">PANAMA</option><option value="PG">PAPOUASIE-NOUVELLE-GUINÉE</option><option value="PY">PARAGUAY</option><option value="NL">PAYS-BAS</option><option value="PE">PÉROU</option><option value="PH">PHILIPPINES</option><option value="PN">PITCAIRN</option><option value="PL">POLOGNE</option><option value="PF">POLYNÉSIE FRANÇAISE</option><option value="PR">PORTO RICO</option><option value="PT">PORTUGAL</option><option value="QA">QATAR</option><option value="CF">RCA</option><option value="CD">RDC</option><option value="ZZ">RÉGION INDÉTERMINÉE</option><option value="DO">RÉPUBLIQUE DOMINICAINE</option><option value="CZ">RÉPUBLIQUE TCHÈQUE</option><option value="RE">RÉUNION</option><option value="RO">ROUMANIE</option><option value="GB">ROYAUME-UNI</option><option value="RU">RUSSIE</option><option value="RW">RWANDA</option><option value="EH">SAHARA OCCIDENTAL</option><option value="BL">SAINT-BARTHÉLÉMY</option><option value="SH">SAINTE-HÉLÈNE</option><option value="LC">SAINTE-LUCIE</option><option value="KN">SAINT-KITTS-ET-NEVIS</option><option value="SM">SAINT-MARIN</option><option value="MF">SAINT-MARTIN</option><option value="PM">SAINT-PIERRE-ET-MIQUELON</option><option value="VC">SAINT-VINCENT-ET-LES GRENADINES</option><option value="AS">SAMOA AMÉRICAINES</option><option value="WS">SAMOA</option><option value="ST">SAO TOMÉ-ET-PRINCIPE</option><option value="SN">SÉNÉGAL</option><option value="RS">SERBIE</option><option value="CS">SERBIE-ET-MONTÉNÉGRO</option><option value="SC">SEYCHELLES</option><option value="SL">SIERRA LEONE</option><option value="SG">SINGAPOUR</option><option value="SK">SLOVAQUIE</option><option value="SI">SLOVÉNIE</option><option value="SO">SOMALIE</option><option value="SD">SOUDAN</option><option value="LK">SRI LANKA</option><option value="SE">SUÈDE</option><option value="CH">SUISSE</option><option value="SR">SURINAME</option><option value="SJ">SVALBARD ET ÎLE JAN MAYEN</option><option value="SZ">SWAZILAND</option><option value="SY">SYRIE</option><option value="TJ">TADJIKISTAN</option><option value="TW">TAÏWAN</option><option value="TZ">TANZANIE</option><option value="TD">TCHAD</option><option value="TF">TERRES AUSTRALES FRANÇAISES</option><option value="IO">TERRITOIRE BRITANNIQUE DE L&#039;OCÉAN INDIEN</option><option value="PS">TERRITOIRE PALESTINIEN</option><option value="TH">THAÏLANDE</option><option value="TL">TIMOR ORIENTAL</option><option value="TG">TOGO</option><option value="TK">TOKELAU</option><option value="TO">TONGA</option><option value="TT">TRINITÉ-ET-TOBAGO</option><option value="TN">TUNISIE</option><option value="TM">TURKMÉNISTAN</option><option value="TR">TURQUIE</option><option value="TV">TUVALU</option><option value="UA">UKRAINE</option><option value="UY">URUGUAY</option><option value="VU">VANUATU</option><option value="VE">VENEZUELA</option><option value="VN">VIÊT NAM</option><option value="WF">WALLIS-ET-FUTUNA</option><option value="YE">YÉMEN</option><option value="ZM">ZAMBIE</option><option value="ZW">ZIMBABWE</option></select>
                    <!-- Ajoutez d'autres options ici -->
                </select>
            </div>
            <div class="form-group">
                <label for="form_email">Email :</label>
                <input type="email" id="form_email" name="form[email]" required class="form-control" placeholder="Email" />
            </div>
            <div class="form-group">
                <label for="form_contact">Contact :</label>
                <input type="text" id="form_contact" name="form[contact]" required class="form-control" placeholder="Contact" />
            </div>
            <div class="form-group">
                <label for="form_sexe">Genre :</label>
                <select id="form_sexe" name="form[sexe]" required class="form-control">
                    <option value="M">Masculin</option>
                    <option value="F">Féminin</option>
                </select>
            </div>
            <button type="button" class="prev-btn">Précédent</button>
            <button type="button" class="next-btn">Suivant</button>
        </fieldset>

        <!-- Etape 3 -->
        <fieldset class="wizard-step mws-form-inline">
            <h3 class="fs-title">Informations d'Accès</h3>
            <div class="form-group">
                <label for="form_login">Choix Login :</label>
                <input type="text" id="form_login" name="form[login]" required maxlength="15" class="form-control" placeholder="login compris entre 2 et 15 caracteres" />
            </div>
            <div class="form-group">
                <label for="form_password">Mot de passe :</label>
                <input type="password" id="form_password" name="form[password]" required class="form-control" placeholder="Password" />
            </div>
            <button type="button" class="prev-btn">Précédent</button>
            <button type="submit">S'inscrire</button>
        </fieldset>
    </form>
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

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const steps = document.querySelectorAll('.wizard-step');
        let currentStep = 0;

        function showStep(stepIndex) {
            steps.forEach((step, index) => {
                step.classList.toggle('active', index === stepIndex);
            });
        }

        document.querySelectorAll('.next-btn').forEach(button => {
            button.addEventListener('click', function() {
                if (currentStep < steps.length - 1) {
                    currentStep++;
                    showStep(currentStep);
                }
            });
        });

        document.querySelectorAll('.prev-btn').forEach(button => {
            button.addEventListener('click', function() {
                if (currentStep > 0) {
                    currentStep--;
                    showStep(currentStep);
                }
            });
        });

        showStep(currentStep);
    });
</script>
</body>
</html>
