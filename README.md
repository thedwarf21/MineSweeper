# MineSweeper
Here is a web "code only" minesweeper (no image used for graphical rendering). Which means that all of the graphical rendering has been managed with CSS, hard coding polygons, for exemple.

As usual (for the whom already knowing my works), the program has been coded in a MVC webcomponent oriented way : each square (containing a button, at the begining) is an instance of **FieldButton** extending **HtmlDivElement** and implementing its internal and external behaviors. By external behaviors, I mean the behaviors a **FieldButton** shall have against the main (and unique) controller, which, I know, prevents re-usability, even if it was not my purpose. On the other hand, a MineSweeper button could not be reused in another projet, anyway...

Like in classic MineSweeper, left clicking reveals the number of mines around ce square clicked (if the square is not a mine), and right clicking toggles the "mark" mode of the square: a marked square cannot be accidentally left-clicked. **On mobile devices, you can long touch the square, instead.**

The "?" state, usable in the Windows original game, is not usable in this web version of the game, not for complexity reasons (only 2 code lines are necessary to manage with this), but beacause it is not really useful for player, and brings nothing to gameplay, in my opinion.

Like in AsteroidsHarvest [github.com/thedwarf21/AsteroidsHarvest](https://github.com/thedwarf21/AsteroidsHarvest), this game embarks a **manifest.json** file, allowing you to add the page to the home screen of your mobile device, from your browser's menu, in order to use it like a standalone landscape display forced application.

## En Français, pour les Anglophobes
Ceci est un Démineur réalisé uniquement en code. C'est à dire qu'aucun visuel n'a été utilisé dans le rendu graphique du jeu. L'affichage des drapeaux et des mines a été codé en CSS (polygones créés via la propriété **clip-path**). Seule l'icône du jeu est une image (pour ajout à l'écran d'accueil de votre appareil mobile, c'est mieux s'il y a une icône).

Comme d'habitude, je me suis orienté vers une philosophie composants web : les boutons affichés sont issus de la classe **FieldButton** héritant de **HtmlDivElement**. Elle implémente les comportements liés au bouton (gestion des événements, utilisation des classes CSS pour le rendu, etc.). Certains impact sur le programme principal (controller du jeu), sont implémentés dans cette classe, ce qui j'en suis conscient, la rend impossible à réutiliser. Ceci dit, un bouton de jeu de démineur n'est pas utilisable hors d'un jeu de démineur, de toute manière...

Comme dans le Démineur classique, un clic gauche révèle le nombre de mines autour de la case (s'il ne s'agit pas d'une mine), et un clic droit permet de passer d'un état à l'autre : marquée et non-marquée. Une case marquée ne peut pas être cliquée par erreur (l'événement est désactivé). **Sur appareil mobile, un appui long remplace le clic droit.**

Vous constaterez que l'état "?", utilisable sur le jeu d'origine proposé par Windows, n'existe pas dans cette version. N'en voyant pas l'utilité, j'ai préféré ne pas gérer cette état. Non que cela aurait complexifié le programme (je ne vais pleurer pour deux lignes de codes à écrire, franchement), mais que cette fonctionnalité n'apporte rien au gameplay, à momn avis.

Comme pour le jeu AsteroidsHarvest [github.com/thedwarf21/AsteroidsHarvest](https://github.com/thedwarf21/AsteroidsHarvest), ce jeu embarque un fichier **manifest.json**, permettant d'ajouter un lien vers la page à l'écran d'accueil de votre téléphone, depuis le menu de votre navigateur, afin que celui-ci se comporte comme une application autonome forçant l'affichage en orientation paysage (techniquement, c'est un lien internet, mais à l'utilisation, c'est comme si vous l'aviez téléchargé depuis le store).
