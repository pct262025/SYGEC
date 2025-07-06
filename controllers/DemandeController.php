<?php
error_reporting(E_ERROR | E_PARSE);
class DemandeController {
    public function demande() {
        require_once 'views/demande.php';
    }

    public function telechargerPDF() {
        session_start();
        if (!isset($_SESSION["id"])) {
            header("Location: index.php?action=login");
            exit;
        }

        if (!isset($_GET['id_demande'])) {
            echo "Aucune demande spécifiée.";
            exit;
        }

        $id_demande = intval($_GET['id_demande']);
        require_once 'models/DemandeActe.php';
        $dossier = getDossierById($id_demande, $_SESSION["id"]);

        if (!$dossier) {
            echo "Demande introuvable.";
            exit;
        }

        require_once 'libs/tcpdf/tcpdf.php';
        $pdf = new TCPDF();
        $pdf->SetPrintFooter(false);
        $pdf->SetPrintHeader(false);

        $pdf->SetCreator(PDF_CREATOR);
        $pdf->SetAuthor('AYMAR N\'SANIGNA');
        $pdf->SetTitle('Extrait d\'acte de naissance');
        $pdf->SetSubject('Extrait');
        $pdf->SetMargins(20, 20, 20);
        $pdf->AddPage();

        $logoPath = 'assets/img/logo.png';
        if (file_exists($logoPath)) {
            $pdf->SetAlpha(0.1);
            $pdf->Image($logoPath, 30, 80, 150);
            $pdf->SetAlpha(1);
        }

        $pdf->SetFont('helvetica', 'B', 10);
        $pdf->SetTextColor(0, 255, 0);
        $pdf->SetAlpha(0.05);

        for ($x = 0; $x < $pdf->getPageWidth(); $x += 40) {
            for ($y = 0; $y < $pdf->getPageHeight(); $y += 30) {
                $pdf->StartTransform();
                $pdf->Rotate(45, $x, $y);
                $pdf->Text($x, $y, 'MAIRIE DE YAMOUSSOUKRO');
                $pdf->StopTransform();
            }
        }

        $pdf->SetAlpha(1);
        $pdf->SetTextColor(0, 0, 0);

        $pdf->SetFont('helvetica', '', 10);
        $pdf->SetXY(20, 5);
        $pdf->Cell(30, 5, 'MAIRIE DE YAMOUSSOUKRO ', 0, 0, 'L');

        if (file_exists($logoPath)) {
            $pdf->Image($logoPath, 20, 10, 30);
        }

        $pdf->SetFont('helvetica', 'U', 10);
        $pdf->SetXY(20, 42);
        $pdf->Cell(30, 5, 'ETAT CIVIL', 0, 1, 'C');

        $pdf->SetXY(20, 48);
        $pdf->Cell(30, 5, 'Commune de Yamoussoukro', 0, 1, 'C');

        $pdf->SetFont('helvetica', 'U', 12);
        $pdf->SetXY(150, 15);
        $pdf->Cell(40, 5, 'REPUBLIQUE DE COTE D\'IVOIRE', 0, 1, 'R');

        $pdf->SetFont('helvetica', '', 10);
        $pdf->SetXY(150, 21);
        $pdf->Cell(40, 5, 'UNION – DISCIPLINE – TRAVAIL', 0, 1, 'R');

        $pdf->SetFont('helvetica', 'B', 14);
        $pdf->SetXY(120, 35);
        $pdf->Cell(70, 7, "EXTRAIT D'ACTE DE NAISSANCE", 0, 1, 'R');

        $pdf->SetFont('helvetica', '', 10);
        $pdf->SetXY(120, 42);
        $annee = date('Y');
        $pdf->Cell(70, 5, "du Registre des actes de l'Etat Civil pour l'année $annee", 0, 1, 'R');

        $pdf->SetFont('helvetica', 'U', 12);
        $pdf->SetXY(20, 70);
        $pdf->SetFont('helvetica', '', 12); // Sans soulignement

        $numero_registre = isset($dossier['numero_registre']) ? $dossier['numero_registre'] : '';
        $pdf->Cell(0, 7, "N°: $numero_registre".'du registre', 0, 1, 'L');
        
        $pdf->SetFont('helvetica', 'U', 12);

        $pdf->Cell(0, 7, 'NAISSANCE DE:', 0, 1, 'L');

        // $pdf->SetFont('helvetica', '', 12);
        // $pdf->Cell(0, 7, ' DE :', 0, 1, 'L');
        $pdf->SetFont('helvetica', '', 12); // Sans soulignement
        $nom = isset($dossier['nom']) ? $dossier['nom'] : '';
        $prenom = isset($dossier['prenom']) ? $dossier['prenom'] : '';
        $lieu_naissance = isset($dossier['lieu_naissance']) ? $dossier['lieu_naissance'] : '';
        $nom_pere = isset($dossier['nom_pere']) ? $dossier['nom_pere'] : '';
        $nom_mere = isset($dossier['nom_mere']) ? $dossier['nom_mere'] : '';

        $pdf->Cell(100, 7, "$prenom $nom", 0, 0, 'L');
        $pdf->Cell(0, 7, "est né (e) à : $lieu_naissance", 0, 1, 'R');

        // $pdf->Cell(0, 7, $prenom, 0, 1, 'R');
        $pdf->Cell(0, 7, "fils/fille de : $nom_pere", 0, 1, 'C');
        $pdf->Cell(0, 7, "et de : $nom_mere", 0, 1, 'C');

        $x1 = 0;
        $x2 = $pdf->getPageWidth();
        $y = $pdf->GetY() + 5;

        $pdf->Line($x1, $y, $x2, $y);
        $y += 3;
        $pdf->Line($x1, $y, $x2, $y);

        $pdf->SetFont('helvetica', 'B', 10);
        $y += 5;
        $pdf->SetXY(0, $y);
        $pdf->Cell(0, 7, 'MENTIONS (éventuellement) :', 0, 1, 'C');

        $pdf->SetFont('helvetica', '', 10);
        $y += 7;
        $pdf->SetXY(20, $y);
        $pdf->Cell(0, 7, 'Marié(e)', 0, 1, 'L');
        $pdf->Cell(0, 7, "avec : ", 0, 1, 'L');
        $pdf->Cell(0, 7, "Mariage dissous par décision de divorce en date du :", 0, 1, 'L');
        $pdf->Cell(0, 7, "Décédé(e) le : ", 0, 1, 'L');
        $pdf->Cell(0, 7, "Certifié le présent extrait conforme aux indications portées au registre ", 0, 1, 'L');
        $pdf->Cell(0, 7, "Délivré à Yamoussoukro, le   : " . date('d/m/Y'), 0, 1, 'R');

        // $pdf->SetFont('helvetica', '', 12);
        // $pdf->Ln(5);
        // $pdf->Cell(0, 7, "Signature officielle", 0, 1, 'R');

        // Ajout du timbre en bas à gauche, horizontal
        $timbrePath = 'assets/img/timbre.jpg';
        // $cachetPath = 'assets/img/cachet.jpg';

        if (file_exists($timbrePath)) {
            $timbreWidth = 70; // largeur en mm
            $timbreHeight = 30; // hauteur en mm
            $x = 10; // 10 mm du bord gauche
            $y = $pdf->getPageHeight() - $timbreHeight - 40; // 15 mm du bas

            // Ajout du timbre
            $pdf->Image($timbrePath, $x, $y, $timbreWidth, $timbreHeight);

            // // Ajout du cachet à droite du timbre
            // if (file_exists($cachetPath)) {
            //     $cachetWidth = 45; // ajuste la taille si nécessaire
            //     $cachetHeight = 30;
            //     $x_cachet = $x + $timbreWidth + 5; // petit décalage de 5 mm
            //     $pdf->Image($cachetPath, $x_cachet, $y, $cachetWidth, $cachetHeight);
            // }
            $pdf->SetFont('helvetica', '', 12);
            $pdf->SetXY($x + $timbreWidth + 10, $y + ($timbreHeight / 2) - 3); // position centré verticalement avec un léger décalage
            $pdf->Cell(0, 7, "Signature du Maire", 0, 0, 'R');
        }

        
        $pdf->Output('extrait_acte_'.$id_demande.'.pdf', 'D');
        // changerStatus($id_demande, "Telechargé");
        exit;
    }

    //   TELECHARGEMENT DE CERTIFICAT
    public function telechargerCertificatNaissance() {
        session_start();
        if (!isset($_SESSION["id"])) {
            header("Location: index.php?action=login");
            exit;
        }

        if (!isset($_GET['id_demande'])) {
            echo "Aucune demande spécifiée.";
            exit;
        }

        $id_demande = intval($_GET['id_demande']);
        require_once 'models/DemandeActe.php';
        $dossier = getDossierById($id_demande, $_SESSION["id"]);

        if (!$dossier) {
            echo "Demande introuvable.";
            exit;
        }

        require_once 'libs/tcpdf/tcpdf.php';
        $pdf = new TCPDF();
        $pdf->SetPrintFooter(false);
        $pdf->SetPrintHeader(false);

        $pdf->SetCreator(PDF_CREATOR);
        $pdf->SetAuthor('AYMAR N\'SANIGNA');
        $pdf->SetTitle('Certificat de naissance');
        $pdf->SetSubject('Certificat');
        $pdf->SetMargins(20, 30, 20);

        // AJOUTE UNE SEULE PAGE
        $pdf->AddPage();

        // Couleur de fond
        $pdf->SetFillColor(255, 253, 208);
        $pdf->Rect(0, 0, $pdf->getPageWidth(), $pdf->getPageHeight(), 'F');

        // Emblème en filigrane
        $embleme = 'assets/img/embleme_ci1.png';
        $pdf->SetAlpha(0.1);
        $pdf->Image($embleme, 50, 70, 100);
        $pdf->SetAlpha(1);

        // Ajout des images en header
        $imgPathLeft = 'assets/img/embleme_ci1.png';
        $imgPathRight = 'assets/img/logo_droite.png';

        $pdf->Image($imgPathLeft, 20, 10, 30);
        $pdf->Image($imgPathRight, 160, 10, 30);

        // Texte en haut à droite
        $pdf->SetFont('helvetica', 'B', 12);
        $pdf->SetXY(150, 15);
        $pdf->Cell(40, 5, 'REPUBLIQUE DE COTE D\'IVOIRE', 0, 1, 'R');

        $pdf->SetFont('helvetica', '', 10);
        $pdf->SetXY(150, 21);
        $pdf->Cell(40, 5, 'UNION – DISCIPLINE – TRAVAIL', 0, 1, 'R');

        // Sous l’emblème
        $pdf->SetFont('helvetica', 'B', 10);
        $pdf->SetXY(20, 42);
        $pdf->Cell(60, 5, 'MINISTERE DE LA JUSTICE', 0, 1, 'L');

        $pdf->SetFont('helvetica', '', 10);
        $pdf->SetXY(20, 48);
        $pdf->Cell(60, 5, 'TRIBUNAL DE PREMIERE INSTANCE', 0, 1, 'L');

        // YOPOUGON avec deux traits
        $pdf->SetFont('helvetica', 'B', 10);
        $pdf->SetXY(20, 54);
        $pdf->Cell(60, 5, 'YOPOUGON', 0, 1, 'L');
        $x1 = 20; $y1 = 59; $x2 = 60;
        $pdf->Line($x1, $y1, $x2, $y1);
        $pdf->Line($x1, $y1 + 1, $x2, $y1 + 1);

        // Section
        $pdf->SetFont('helvetica', '', 10);
        $pdf->SetXY(20, 62);
        $pdf->Cell(60, 5, 'Section d’', 0, 1, 'L');

        // Titre
        $pdf->Ln(10);
        $pdf->SetFont('helvetica', 'B', 14);
        $pdf->Cell(0, 10, 'CERTIFICAT DE NATIONALITE IVOIRIENNE', 0, 1, 'C');
        $pdf->Ln(5);

        // Infos soulignées
        $pdf->SetFont('helvetica', '', 12);
        $lines = [
            'N°: ' . $dossier['numero_acte'],
            'M. KACOU BREDOUMOU FLORENT',
            'LE PRESIDENT DU TRIBUNAL INSTANCE DE YOPOUGON'
        ];
        foreach ($lines as $line) {
            $pdf->Cell(0, 10, $line, 0, 1, 'L');
            $y = $pdf->GetY();
            $pdf->Line(20, $y, 190, $y);
            $pdf->Ln(2);
        }

        // Ligne sans soulignement
        $pdf->Cell(0, 10, 'Certifie, au vu des pièces produites que', 0, 1, 'L');

        // Infos avec soulignement
        $fields = [
            'M/Mme: ' . $dossier['nom'] . ' ' . $dossier['prenom'],
            'demeurant à ' . $dossier['lieu_habitation'],
            'né(e) à: ' . $dossier['lieu_naissance'] . ' le ' . $dossier['date_naissance'],
            'Lieu de naissance: ' . $dossier['lieu_naissance'],
            'de: ' . $dossier['nom_pere'] . ' né(e) à ' . $dossier['lieu_naissance_pere'] . ' le ' . $dossier['date_naissance_pere'],
            'et de: ' . $dossier['nom_mere'] . ' né(e) à ' . $dossier['lieu_naissance_mere'] . ' le ' . $dossier['date_naissance_mere']
        ];
        foreach ($fields as $field) {
            $pdf->Cell(0, 10, $field, 0, 1, 'L');
            $y = $pdf->GetY();
            $pdf->Line(20, $y, 190, $y);
            $pdf->Ln(2);
        }

        // Phrase finale
        $pdf->Cell(0, 10, 'est ivoirien(ne) en vertu de l\'article 6 du code de nationalité', 0, 1, 'L');
        $pdf->Ln(10);

        // Fait à YOPOUGON avec soulignement
        $pdf->Cell(0, 10, 'Fait à YOPOUGON, le: ' . date('d/m/Y'), 0, 1, 'R');
        $y = $pdf->GetY();
        $pdf->Line(20, $y, 190, $y); // soulignement
        $pdf->Ln(15);

        // Signature
        $pdf->Cell(0, 8, 'P/ LE PRESIDENT DU TRIBUNAL', 0, 1, 'R');
        $pdf->Cell(0, 8, 'N\'SANIGNA Magistrat', 0, 1, 'R');

        // Génère le PDF
        $pdf->Output('certificat_nationalité_'.$id_demande.'.pdf', 'D');
        // changerStatus($id_demande, "Telechargé");
        exit;
    }

    // ACTE DE MARIAGE
    public function telechargerActeMariage() {
        session_start();
    
        if (!isset($_SESSION["id"])) {
            header("Location: index.php?action=login");
            exit;
        }
    
        if (!isset($_GET['id_demande'])) {
            echo "Aucune demande spécifiée.";
            exit;
        }
    
        $id_demande = intval($_GET['id_demande']);
        require_once 'models/DemandeActe.php';
        $dossier = getDossierMariageById($id_demande, $_SESSION["id"]);
    
        if (!$dossier) {
            echo "Demande introuvable.";
            exit;
        }
    
        require_once 'libs/tcpdf/tcpdf.php';
        $pdf = new TCPDF();
        $pdf->SetPrintFooter(false);
        $pdf->SetPrintHeader(false);
    
        $pdf->SetCreator(PDF_CREATOR);
        $pdf->SetAuthor('AYMAR N\'SANIGNA');
        $pdf->SetTitle('Acte de mariage');
        $pdf->SetSubject('Mariage');
        $pdf->SetMargins(20, 30, 20);
    
        $pdf->AddPage();
        // Emblème en filigrane
        $embleme = 'assets/img/logo.png';
        $pdf->SetAlpha(0.1);
        $pdf->Image($embleme, 50, 70, 100);
        $pdf->SetAlpha(1);
    
        // 📌 Images en-tête
        $pdf->Image('assets/img/logo.png', 20, 10, 30); // logo mairie
        $pdf->Image('assets/img/embleme_ci1.png', 160, 10, 30); // emblème CI
    
        $pdf->Ln(15); // espace après les logos
        
    
        // ✅ Contenu texte
        $pdf->SetTextColor(0, 0, 0);
        $pdf->SetFont('helvetica', 'B', 14);
        $pdf->Cell(0, 10, 'EXTRAIT D\'ACTE DE MARIAGE', 0, 1, 'C');
        $pdf->Ln(10);
    
        $pdf->SetFont('helvetica', '', 10);
        $pdf->Cell(0, 10, 'N° Registre: ' . $dossier['numero_registre'], 0, 1);
        $pdf->Cell(0, 10, 'Date de mariage: ' . $dossier['date_mariage'], 0, 1);
        $pdf->Cell(0, 10, 'Lieu de mariage: ' . $dossier['lieu_mariage'], 0, 1);
    
        $pdf->Ln(5);
        $pdf->Cell(0, 10, 'ÉPOUX:' . $dossier['nom'] .' '. $dossier['prenom'], 0, 1);
        // $pdf->Cell(0, 10, $dossier['nom'] . ' ' . $dossier['prenom'], 0, 1);
        $pdf->Cell(0, 10, 'Né(e) le: ' . $dossier['date_naissance'] . ' à ' . $dossier['lieu_naissance'], 0, 1);
    
        $pdf->Ln(5);
        $pdf->Cell(0, 10, 'ÉPOUSE:'. $dossier['nom_conjoint']  .' '. $dossier['prenom_conjoint'], 0, 1);
        // $pdf->Cell(0, 10, $dossier['nom_conjoint'] . ' ' . $dossier['prenom_conjoint'], 0, 1);
        $pdf->Cell(0, 10, 'Née le: ' . $dossier['date_naissance_epouse'] . ' à ' . $dossier['lieu_naissance_conjoint'], 0, 1);
    
        $pdf->Ln(10);
        $pdf->Cell(0, 10, 'Officier d\'état civil:  KOUAKOU NOBERT' . $dossier['officier_etat_civil'], 0, 1);
    
        $pdf->Ln(15);
        $pdf->Cell(0, 10, 'Délivré à Yamoussoukro, le: ' . date('d/m/Y'), 0, 1, 'R');
    
        $pdf->Output('acte_mariage_'.$id_demande.'.pdf', 'D');
        exit;
    }
    

}
?>