# MineSweeper
Here is a web "code only" minesweeper (no image used for graphical rendering). Which means that all of the graphical rendering has been managed with CSS, hard coding polygons, for exemple.

As usual (for the whom already knowing my works), the program has been coded in a MVC webcomponent oriented way : each square (containing a button, at the begining) is an instance of **FieldButton** extending **HtmlDivElement** and implementing its internal and external behaviors. By external behaviors, I mean the behaviors a **FieldButton** shall have against the main (and unique) controller.

Like in classic MineSweeper, left clicking reveals the number of mines around ce square clicked (if the square is not a mine), and right clicking toggles the "mark" mode of the square: a marked square cannot be accidentally left-clicked.

The game is still not designed for tactile devices (smartphones or tabs) but I've planned to create an alternative Mine Sweeper game (including some surprises), designed for these devices.
