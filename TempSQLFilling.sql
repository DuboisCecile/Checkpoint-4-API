INSERT INTO sitecategory
(name)
VALUES('Site touristique'), ('Coaching sportif'), ('Tutoriel de loisirs créatifs'), ('Spectacle');

INSERT INTO evadit.`user`
(email, password, pseudo, avatarUrl, `role`, gems)
VALUES('duboiscecilepro@gmail.com', 'azertyuiop', 'Cecile', '', 'user', 0);

INSERT INTO gemscost
(amount, price, label)
VALUES(25, 4.49, 'Quelques gemmes dans ma poche'),(50, 8.95, 'Quelques gemmes dans mes deux poches'),(100, 17.95, 'Une bourse pleine de gemmes'),(250, 44.95, 'Un sac de gemmes'),(500, 89.95, 'Un coffre rempli de gemmes'),(1000, 179.90, 'La salle du trésor');
