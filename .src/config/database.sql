DROP DATABASE IF EXISTS SW;
CREATE DATABASE SW;
USE SW;

CREATE TABLE utilisateur(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(30),
    prenom VARCHAR(30),
    courriel VARCHAR(255),
    cle_api VARCHAR (30),
    password VARCHAR(100)
);
CREATE TABLE taches(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	utilisateur_id INTEGER, #
    titre VARCHAR(100),
    description VARCHAR(500),
    date_debut DATE,
    date_echeance DATE,
    complete TINYINT(1),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id)
);
CREATE TABLE sous_taches(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    tache_id INTEGER, 
    titre VARCHAR(100),
    complete TINYINT(1),
	FOREIGN KEY (tache_id) REFERENCES taches(id)
);






















