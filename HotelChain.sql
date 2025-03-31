-- Création de la base de données
drop database if exists eHotels;

create database eHotels;

use eHotels;

-- Table Bureau_Central
create table Bureau_Central
(
    bureau_id INT AUTO_INCREMENT primary key,
    adresse   VARCHAR(255) not null
);

-- Table des chaînes hôtelières
create table Chaine
(
    chaine_id     INT AUTO_INCREMENT primary key,
    email         VARCHAR(255),
    telephone     VARCHAR(20),
    nom           VARCHAR(255) not null,
    nombre_hotels INT          not null,
    bureau_id     INT,
    foreign KEY (bureau_id) references Bureau_Central (bureau_id) on delete set null
);

-- Table des hôtels
create table Hotel
(
    hotel_id        INT AUTO_INCREMENT primary key,
    chain_id        INT,
    adresse         VARCHAR(255) not null,
    nombre_chambres INT          not null,
    email           VARCHAR(255),
    telephone       VARCHAR(20),
    etoile          INT check (etoile between 1 and 5),
    foreign KEY (chain_id) references Chaine (chaine_id) on delete CASCADE
);

-- Table des chambres
create table Chambre
(
    numero_chambre INT primary key,
    hotel_id       INT,
    capacite       VARCHAR(50)    not null,
    prix           DECIMAL(10, 2) not null,
    vue            ENUM ('mer', 'montagne', 'aucune'),
    etendu         BOOLEAN,
    commodites     TEXT,
    problemes      TEXT,
    foreign KEY (hotel_id) references Hotel (hotel_id) on delete CASCADE
);

-- Table des clients
create table Client
(
    client_id         INT AUTO_INCREMENT primary key,
    nom               VARCHAR(255) not null,
    adresse           VARCHAR(255),
    nas               VARCHAR(15) unique,
    date_registration DATE         not null
);

-- Table des réservations
create table Reservation
(
    reservation_id INT AUTO_INCREMENT primary key,
    client_id      INT,
    hotel_id       INT,
    numero_chambre INT,
    date_debut     DATE not null,
    date_fin       DATE not null,
    foreign KEY (client_id) references Client (client_id) on delete CASCADE,
    foreign KEY (hotel_id, numero_chambre) references Chambre (hotel_id, numero_chambre) on delete CASCADE
);

-- Table des employés
create table Employe
(
    employe_id INT AUTO_INCREMENT primary key,
    hotel_id   INT,
    nom        VARCHAR(255) not null,
    adresse    VARCHAR(255),
    nas        VARCHAR(15) unique,
    role       VARCHAR(50),
    foreign KEY (hotel_id) references Hotel (hotel_id) on delete CASCADE
);

-- Table des locations
create table En_Location
(
    location_id    INT AUTO_INCREMENT primary key,
    client_id      INT,
    hotel_id       INT,
    numero_chambre INT,
    employe_id     INT,
    date_debut     DATE not null,
    date_fin       DATE not null,
    foreign KEY (client_id) references Client (client_id) on delete CASCADE,
    foreign KEY (hotel_id, numero_chambre) references Chambre (hotel_id, numero_chambre) on delete CASCADE,
    foreign KEY (employe_id) references Employe (employe_id) on delete set null
);

-- Table des archives
create table Archive
(
    archive_id         INT AUTO_INCREMENT primary key,
    location_id        INT,
    nombre_reservation INT not null,
    nombre_location    INT not null,
    foreign KEY (location_id) references En_Location (location_id) on delete CASCADE

);


-- Création d'un trigger pour archiver les réservations lors du check-in (Contrainte)
DELIMITER $$
CREATE TRIGGER after_check_in
    AFTER INSERT
    ON En_Location
    FOR EACH ROW
BEGIN
    DELETE
    FROM Reservation
    WHERE client_id = NEW.client_id
      AND hotel_id = NEW.hotel_id
      AND numero_chambre = NEW.numero_chambre;
END $$
DELIMITER ;

-- Requêtes SQL
-- 1. Nombre de chambres disponibles par hôtel
create view AvailableRoomsByHotel as
select h.hotel_id,
       h.adresse,
       COUNT(c.numero_chambre) as available_rooms
from Hotel h
         join Chambre c on h.hotel_id = c.hotel_id
         left join En_Location l on c.numero_chambre = l.numero_chambre
    and c.hotel_id = l.hotel_id
where l.location_id is null
group by h.hotel_id,
         h.adresse;

-- 2. Capacité des chambres d'un hôtel spécifique
create view RoomCapacityByHotel as
select h.adresse as hotel_adresse,
       c.capacite,
       COUNT(*)  as total_rooms
from Hotel h
         join Chambre c on h.hotel_id = c.hotel_id
group by h.adresse,
         c.capacite;