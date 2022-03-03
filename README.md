# MineSweeper
Here is a web "code only" minesweeper (no image used for graphical rendering). Which means that all of the graphical rendering has been managed with CSS, hard coding polygons, for exemple.

As usual (for the whom already knowing my works), the program has been coded in a MVC webcomponent oriented way : each square (containing a button, at the begining) is an instance of **FieldButton** extending **HtmlDivElement** and implementing its internal and external behaviors. By external behaviors, I mean the behaviors a **FieldButton** against the main (and unique) controller. 
