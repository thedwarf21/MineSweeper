# MineSweeper
Here is a web "code only" minesweeper (no image used for graphical rendering). Which means that all of the graphical rendering has been managed with CSS, hard coding polygons, for exemple.

As usual (for the whom already knowing my works), the program has been coded in a MVC webcomponent oriented way : each square (containing a button, at the begining) is an instance of **FieldButton** extending **HtmlDivElement** and implementing its internal and external behaviors. By external behaviors, I mean the behaviors a **FieldButton** shall have against the main (and unique) controller, which, I know, prevents re-usability, even if it was not my purpose. On the other hand, a MineSweeper button could not be reused in another projet, anyway...

Like in classic MineSweeper, left clicking reveals the number of mines around ce square clicked (if the square is not a mine), and right clicking toggles the "mark" mode of the square: a marked square cannot be accidentally left-clicked. **On mobile devices, you can long touch the square, instead.**

## En Français, pour les Anglophobes
Ceci est un Démineur réalisé uniquement en code. C'est à dire qu'aucun visuel n'a été utilisé dans le rendu graphique du jeu. L'affichage des drapeaux et des mines a été codé en CSS (polygones créés via la propriété **clip-path**). Seule l'icône du jeu est une image (pour ajout à l'écran d'accueil de votre appareil mobile, c'est mieux s'il y a une icône).

Comme d'habitude, je me suis orienté vers une philosophie composants web : les boutons affichés sont issus de la classe **FieldButton** héritant de **HtmlDivElement**. Elle implémente les comportements liés au bouton (gestion des événements, utilisation des classes CSS pour le rendu, etc.). Certains impact sur le programme principal (controller du jeu), sont implémentés dans cette classe, ce qui j'en suis conscient, la rend impossible à réutiliser. Ceci dit, un bouton de jeu de démineur n'est pas utilisable hors d'un jeu de démineur, de toute manière...

Comme dans le Démineur classique, un clic gauche révèle le nombre de mines autour de la case (s'il ne s'agit pas d'une mine), et un clic droit permet de passer d'un état à l'autre : marquée et non-marquée. Une case marquée ne peut pas être cliquée par erreur (l'événement est désactivé). **Sur appareil mobile, un appui long remplace le clic droit.**
