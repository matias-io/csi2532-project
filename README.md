CSI 2532 - Project 

# Les Contraintes

Pour chaque chaîne hôtelière,

-- Le Nom de L'hotel? (THIS IS ME)

    -- l’adresse de ses bureaux centraux,

    -- le nombre de ses hôtels,

    -- les adresses électroniques (E-mails) de contact

    -- les numéros de téléphones.

-- Classement des hotels (1 starts - 5 stars) [FOREIGN KEY TO HOTELS]


Pour chaque hôtel

-- le nombre de chambres

-- les adresses électroniques (E-mails)

-- les numéros de téléphones

-- Classement des hotels (1 starts - 5 stars)


---



Pour chaque chaîne hôtelière, nous avons besoin de connaître l’adresse de ses bureaux centraux,

le nombre de ses hôtels, les adresses électroniques (E-mails) de contact et les numéros de

téléphones. Les hôtels des chaînes hôtelières sont classés (par exemple, 1 étoile à 5 étoiles).


Pour chaque hôtel, nous avons besoin de connaître le nombre de chambres, l’adresse de l’hôtel

et les numéros de téléphone et de courriel de contact de cet hôtel. Pour les chambres d’un hôtel,

nous devons connaître leur prix, toutes les commodités (par exemple, TV, air conditionné,

réfrigérateur, etc.), la capacité de la chambre (par exemple, simple, double, etc.), si elles ont

une vue sur la mer ou la montagne, si elles peuvent être étendues (par exemple, ajouter un lit

supplémentaire) et s’il y a des problèmes / dommages dans la chambre. Pour les clients, nous

devons stocker leur nom complet, leur adresse et leur numéro de sécurité sociale / NAS, la date

de leur enregistrement dans notre système.


Pour les employés des hôtels, nous devons stocker leur nom complet, leur adresse et leur

numéro de sécurité sociale / NAS. Les employés peuvent avoir différents rôles / postes dans un

hôtel. Chaque hôtel a besoin d’un gestionnaire. Les clients peuvent rechercher et réserver des

chambres via l’application en ligne pour des dates spécifiques. Lorsqu’ils s’enregistrent à

l’hôtel, leur réservation de chambre se transforme en location et ils peuvent également payer

pour cette location. L’employé qui effectue l’enregistrement pour un client est responsable de

la transformation de la réservation de la chambre en location. Un client peut se présenter

physiquement dans un hôtel sans réservation et demander directement une chambre. Dans ce

cas, l’employé de l’hôtel peut faire la location de la chambre immédiatement sans réservation

préalable.


Nous devons stocker dans la base de données l’historique des réservations et des locations

(archives), mais nous n’avons pas besoin de stocker l’historique des paiements. Les

informations sur une ancienne réservation / location de chambre (archivée) doivent exister dans

la base de données, même si les informations sur la chambre elle-même n’existent plus dans la

base de données. Nous devrions pouvoir supprimer de notre base de données les chaînes

hôtelières, les hôtels et les chambres. Nous ne pouvons pas avoir dans la base de données des

informations sur une chambre sans avoir dans la base de données les informations sur l’hôtel

correspondant (c’est-à-dire l’hôtel auquel la chambre appartient aussi). De la même manière,

nous ne pouvons pas avoir dans la base de données des informations sur un hôtel sans avoir

dans la base de données les informations sur la chaîne hôtelière correspondante (c’est-à-dire la

chaîne hôtelière à laquelle l’hôtel appartient également).
