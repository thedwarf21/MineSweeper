//---------------------------------------------------------------------------------------------------
//                             Gestion d'une case du champ de mine virtuel
//---------------------------------------------------------------------------------------------------
/* Usage JS Uniquement */
class FieldButton extends HTMLDivElement {
  static STATE_DEFAULT = "";
  static STATE_FLAGGED = "flagged-square"; 

  /**
   * Constructeur de la classe : crée un bouton dans la case, avant de lui câbler un événement "onTap"
   * Il remplace également la valeur de la case par l'objet qui en découle, au sein de la matrice.
   *
   * @param      {number}  value   Score de la case: si pas une mine, correspond au nombre de mines autour de la case
   * @param      {number}  x       Indice de la colonne de la case
   * @param      {number}  y       Indice de la ligne de la case
   */
  constructor(value, x, y) {
    super();
    this.classList.add("square");
    this.value = value || 0;
    this.x = x;
    this.y = y;
    this.state = FieldButton.STATE_DEFAULT;

    this.button = document.createElement("DIV");
    this.button.classList.add("button");
    this.appendChild(this.button);

    this.button.addEventListener('mousedown', ()=> {
      if (!document.currentController.scope.game_over)
        document.currentController.setSmiley('fear');
    });
    this.button.addEventListener('click', ()=> { this.buttonClicked(); });
    this.addEventListener('contextmenu', (e)=> { this.changeButtonState(e); });
  }

  /**
   * Gestion du click sur le bouton :
   *    - Si c'est une mine   -> fin de partie
   *    - Sinon               -> affichage du nombre de mines autour de la case, à la place du bouton
   *                             Puis, si aucune mine autour 
   *                                => simulation d'un click sur chacune des cases entourant la case
   */
  buttonClicked() {
    if (this.state == FieldButton.STATE_DEFAULT && !document.currentController.scope.game_over) {
      if (this.value == MINE_VALUE) {
        document.currentController.setSmiley('defeat');
        this.classList.add("error");
        document.currentController.gameLost();
      } else {
        document.currentController.setSmiley('default');
        this.classList.add("value" + this.value);
        this.innerHTML = this.value;
        delete this.button;

        // Si aucune mine n'est autour de la case, les boutons autour sont cliqués automatiquement
        if (this.value == BLANK_VALUE) {
          document.currentController.forEachAroundSquare(this.x, this.y, (targetX, targetY)=> {
            let target_square = document.currentController.scope.field_matrix[targetX][targetY];
            if (target_square.button)
              target_square.buttonClicked();
          });
        }

        // Vérification des conditions de victoire
        document.currentController.checkVictory();
      }
    }
  }

  /**
   * Modifie l'état du bouton et lui applique l'aspect idoine
   *
   * @param      {<type>}  e       Objet événement issu du listener
   */
  changeButtonState(event) {
    event.preventDefault();

    let scope = document.currentController.scope;
    if (!scope.game_over) {
      document.currentController.setSmiley('default');
      this.state = this.state == FieldButton.STATE_DEFAULT
                 ? FieldButton.STATE_FLAGGED
                 : FieldButton.STATE_DEFAULT;

      if (this.state == FieldButton.STATE_DEFAULT) {
        this.button.classList.remove(FieldButton.STATE_FLAGGED);
        scope.remaining_flags++;
      } else {
        this.button.classList.add(FieldButton.STATE_FLAGGED);
        scope.remaining_flags--;
      }
    }
  }
}
customElements.define('js-field-button', FieldButton, { extends: 'div' });
