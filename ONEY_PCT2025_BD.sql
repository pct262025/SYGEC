-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: etat_civil_ci
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `citoyen`
--

DROP TABLE IF EXISTS `citoyen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `citoyen` (
  `id_citoyen` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `lieu_naissance` varchar(255) DEFAULT NULL,
  `date_naissance` datetime DEFAULT NULL,
  `heure_naissance` time DEFAULT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  `login` varchar(255) DEFAULT NULL,
  `mot_de_passe` varchar(255) DEFAULT NULL,
  `numero_registre` varchar(255) DEFAULT NULL,
  `login_citoyen_pere` varchar(255) DEFAULT NULL,
  `login_citoyen_mere` varchar(255) DEFAULT NULL,
  `login_citoyen_tuteur` varchar(255) DEFAULT NULL,
  `id_fonction` int(11) DEFAULT NULL,
  `marie_a` varchar(255) DEFAULT NULL,
  `marie_avec` varchar(255) DEFAULT NULL,
  `marie_le` datetime DEFAULT NULL,
  `divorce_le` datetime DEFAULT NULL,
  `deces_a` varchar(255) DEFAULT NULL,
  `deces_le` datetime DEFAULT NULL,
  PRIMARY KEY (`id_citoyen`),
  KEY `citoyen_fonction_FK` (`id_fonction`),
  CONSTRAINT `citoyen_fonction_FK` FOREIGN KEY (`id_fonction`) REFERENCES `fonction` (`id_fonction`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citoyen`
--

LOCK TABLES `citoyen` WRITE;
/*!40000 ALTER TABLE `citoyen` DISABLE KEYS */;
INSERT INTO `citoyen` VALUES (1,'Namane','Sous délégué','Bouake','2000-01-01 06:00:00','06:00:00','0142204346','nam','1234','num',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'Aymar','Dynamique Codeur','Yakro','2000-01-01 06:00:00','06:00:00','0142204346','Aym','1234','num',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'Hermane','Délégué très très fort','Yamoussoukro','2000-01-01 06:00:00','06:00:00','0142204346','Her','1234','num',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,'Désiré','Dynamique codeuse','Abidjan','2000-01-01 06:00:00','06:00:00','0142204346','Des','1234','num',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'Jacob','Extraordinaire Front-end','Adjake','2000-01-01 06:00:00','06:00:00','0142204346','Jac','1234','num',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'Emi','Dynamique admin bd','Adjake','2000-01-01 06:00:00','06:00:00','0142204346','Emi','1234','num',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `citoyen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `demande_acte`
--

DROP TABLE IF EXISTS `demande_acte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `demande_acte` (
  `id_demande` int(11) NOT NULL AUTO_INCREMENT,
  `statut` varchar(50) DEFAULT NULL,
  `justificatif_path` text DEFAULT NULL,
  `date_demande` datetime DEFAULT NULL,
  `id_type_acte` int(11) DEFAULT NULL,
  `id_sous_prefecture` int(11) DEFAULT NULL,
  `id_citoyen` int(11) DEFAULT NULL,
  `id_utilisateur` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_demande`),
  KEY `demande_acte_citoyen_FK` (`id_citoyen`),
  KEY `demande_acte_type_acte_FK` (`id_type_acte`),
  KEY `demande_acte_sous_prefecture_FK` (`id_sous_prefecture`),
  KEY `demande_acte_utilisateur_FK` (`id_utilisateur`),
  CONSTRAINT `demande_acte_citoyen_FK` FOREIGN KEY (`id_citoyen`) REFERENCES `citoyen` (`id_citoyen`),
  CONSTRAINT `demande_acte_sous_prefecture_FK` FOREIGN KEY (`id_sous_prefecture`) REFERENCES `sous_prefecture` (`id_sous_prefecture`),
  CONSTRAINT `demande_acte_type_acte_FK` FOREIGN KEY (`id_type_acte`) REFERENCES `type_acte` (`id_type_acte`),
  CONSTRAINT `demande_acte_utilisateur_FK` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `demande_acte`
--

LOCK TABLES `demande_acte` WRITE;
/*!40000 ALTER TABLE `demande_acte` DISABLE KEYS */;
INSERT INTO `demande_acte` VALUES (1,'En attente de validation',NULL,'2025-05-18 00:00:00',NULL,NULL,1,NULL),(2,'En attente de validation',NULL,'2025-05-18 00:00:00',NULL,NULL,2,NULL),(3,'En attente de validation',NULL,'2025-05-18 00:00:00',NULL,NULL,3,NULL),(4,'En attente de validation',NULL,'2025-05-18 00:00:00',NULL,NULL,4,NULL),(5,'En attente de validation',NULL,'2025-05-18 00:00:00',NULL,NULL,5,NULL),(6,'En attente de validation',NULL,'2025-05-18 00:00:00',NULL,NULL,6,NULL);
/*!40000 ALTER TABLE `demande_acte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fonction`
--

DROP TABLE IF EXISTS `fonction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fonction` (
  `id_fonction` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_fonction`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fonction`
--

LOCK TABLES `fonction` WRITE;
/*!40000 ALTER TABLE `fonction` DISABLE KEYS */;
/*!40000 ALTER TABLE `fonction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fonctionalite`
--

DROP TABLE IF EXISTS `fonctionalite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fonctionalite` (
  `id_fonctionalite` int(11) NOT NULL AUTO_INCREMENT,
  `libele` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_fonctionalite`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fonctionalite`
--

LOCK TABLES `fonctionalite` WRITE;
/*!40000 ALTER TABLE `fonctionalite` DISABLE KEYS */;
/*!40000 ALTER TABLE `fonctionalite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paiement`
--

DROP TABLE IF EXISTS `paiement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paiement` (
  `id_paiement` int(11) NOT NULL AUTO_INCREMENT,
  `montant` float DEFAULT NULL,
  `code_payement` varchar(255) DEFAULT NULL,
  `date_paiement` datetime DEFAULT NULL,
  `statut_paiement` varchar(255) DEFAULT NULL,
  `id_demande` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_paiement`),
  KEY `paiement_demande_acte_FK` (`id_demande`),
  CONSTRAINT `paiement_demande_acte_FK` FOREIGN KEY (`id_demande`) REFERENCES `demande_acte` (`id_demande`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paiement`
--

LOCK TABLES `paiement` WRITE;
/*!40000 ALTER TABLE `paiement` DISABLE KEYS */;
/*!40000 ALTER TABLE `paiement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id_role` int(11) NOT NULL AUTO_INCREMENT,
  `libele` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_fonctionalite`
--

DROP TABLE IF EXISTS `role_fonctionalite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_fonctionalite` (
  `id_role_fonctionalite` int(11) NOT NULL AUTO_INCREMENT,
  `id_role` int(11) DEFAULT NULL,
  `id_fonctionalite` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_role_fonctionalite`),
  KEY `role_fonctionalite_role_FK` (`id_role`),
  KEY `role_fonctionalite_fonctionalite_FK` (`id_fonctionalite`),
  CONSTRAINT `role_fonctionalite_fonctionalite_FK` FOREIGN KEY (`id_fonctionalite`) REFERENCES `fonctionalite` (`id_fonctionalite`),
  CONSTRAINT `role_fonctionalite_role_FK` FOREIGN KEY (`id_role`) REFERENCES `role` (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_fonctionalite`
--

LOCK TABLES `role_fonctionalite` WRITE;
/*!40000 ALTER TABLE `role_fonctionalite` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_fonctionalite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sous_prefecture`
--

DROP TABLE IF EXISTS `sous_prefecture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sous_prefecture` (
  `id_sous_prefecture` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `ville` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_sous_prefecture`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sous_prefecture`
--

LOCK TABLES `sous_prefecture` WRITE;
/*!40000 ALTER TABLE `sous_prefecture` DISABLE KEYS */;
/*!40000 ALTER TABLE `sous_prefecture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_acte`
--

DROP TABLE IF EXISTS `type_acte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_acte` (
  `id_type_acte` int(11) NOT NULL AUTO_INCREMENT,
  `libele` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_type_acte`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_acte`
--

LOCK TABLES `type_acte` WRITE;
/*!40000 ALTER TABLE `type_acte` DISABLE KEYS */;
/*!40000 ALTER TABLE `type_acte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateur` (
  `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `login` varchar(255) DEFAULT NULL,
  `mot_de_passe` varchar(255) DEFAULT NULL,
  `id_role` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_utilisateur`),
  KEY `utilisateur_role_FK` (`id_role`),
  CONSTRAINT `utilisateur_role_FK` FOREIGN KEY (`id_role`) REFERENCES `role` (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur`
--

LOCK TABLES `utilisateur` WRITE;
/*!40000 ALTER TABLE `utilisateur` DISABLE KEYS */;
/*!40000 ALTER TABLE `utilisateur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur_role`
--

DROP TABLE IF EXISTS `utilisateur_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateur_role` (
  `id_utilisateur_role` int(11) NOT NULL AUTO_INCREMENT,
  `id_utilisateur` int(11) DEFAULT NULL,
  `id_role` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_utilisateur_role`),
  KEY `utilisateur_role_utilisateur_FK` (`id_utilisateur`),
  KEY `utilisateur_role_role_FK` (`id_role`),
  CONSTRAINT `utilisateur_role_role_FK` FOREIGN KEY (`id_role`) REFERENCES `role` (`id_role`),
  CONSTRAINT `utilisateur_role_utilisateur_FK` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur_role`
--

LOCK TABLES `utilisateur_role` WRITE;
/*!40000 ALTER TABLE `utilisateur_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `utilisateur_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'etat_civil_ci'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-19  0:52:38
