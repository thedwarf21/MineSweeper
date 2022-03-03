/**
 *   Ce programme est un jeu de démineur développé from scratch, s'appuyant sur une philosophie orientée composant web.
 * 
 *   La solution retenue pour modéliser la disposition des mines, a été d'élaborer, lors de l'initialisation du
 * champ de mine virtuel, une matrice de valeurs. Chaque valeur de la matrice correspond à l'un des boutons du
 * champ de mine virtuel.
 * 		-> Les mines sont représentées par des valeurs à -1 (constante)
 * 		-> La valeur des cases non occupées par des mines est initialisée avec le nombre de mines, autour de la case correspondante
 * 		
 *   Il en résultera une initialisation un peu plus longue et plus complexe, tandis que le code du composant créé pour générer le 
 * champ de mine virtuel s'en trouvera allégé.
 * 
 *   De cette manière, il sera aisé de le faire évoluer vers un mode "Aventure" dans lequel le joueur contrôle un personnage
 * devant traverser un champ de mines à l'aide d'un détecteur de métaux, dont le cadran serait représenté dans l'interface.
 */

const SQUARE_SIZE = 8;

const ROWS_NUMBER = 10;
const COLS_NUMBER = 15;
const MAX_ROWS_IDX = ROWS_NUMBER - 1;
const MAX_COLS_IDX = COLS_NUMBER - 1;
const MINES_NUMBER = 30;

const BLANK_VALUE = 0;
const MINE_VALUE = -1;

const SMILEY = {
	default: ":)",
	fear: ":•",
	victory: "8)",
	defeat: ":("
}


/**
 * Classe contrôlant l'interface principale
 *
 * @class      MineSweeperController (name)
 */
class MineSweeperController {


	/**
	 * Constructeur de la classe : initialise le jeu à partir des dimensions et nombre de mines paramétrés en constantes.
	 */
	constructor() { this.initGame(); }

	/**
	 *   Exécute une action pour toutes les cases située autour d'une case du plateau, dont les coordonnées
	 * sont passées en paramètres.
	 *   La fonction exécutée pour chaque élément de la matrice, reçoit les coordonnées de la case courante 
	 * du parcours, en paramètres. 
	 *
	 * @param      {number}    x       Coordonnées (indice colonne)
	 * @param      {number}    y       Coordonnées (indice ligne)
	 * @param      {Function}  fn      La fonction exécutée pour chaque élément
	 */
	forEachAroundSquare(x, y, fn) {

		// Parcours des cases autour de la case ciblée
		let matrix = this.scope.field_matrix;
		for (let deltaX=-1; deltaX<=1; deltaX++) {
			for (let deltaY=-1; deltaY<=1; deltaY++) {

				// Si la case ciblée n'est pas la case présente ET
				// Si les coordonnées cible ne sont pas hors limite
				if ((deltaX != 0 || deltaY != 0) &&
					(x + deltaX) >= 0 && (x + deltaX) < COLS_NUMBER &&
					(y + deltaY) >= 0 && (y + deltaY) < ROWS_NUMBER) 
				{
					fn(x + deltaX, y + deltaY);
				}
			}
		}
	}

	/**
	 * Appelle une fonction pour chaque case du "plateau"
	 *
	 * @param      {Function}  fn      La fonction, recevant la case courante en paramètre
	 */
	forEachSquare(fn) {
		let matrix = this.scope.field_matrix;
		for (let x=0; x<COLS_NUMBER; x++) {
			for (let y=0; y<ROWS_NUMBER; y++) {
				fn(matrix[x][y]);
			}
		}
	}

	/**
	 * Modifie le smiley affiché sur le bouton de redémarrage
	 *
	 * @param      {<type>}  smiley_name  The smiley name
	 */
	setSmiley(smiley_name) {
		if (SMILEY.hasOwnProperty(smiley_name))
			document.getElementById("emoji-face").innerHTML = SMILEY[smiley_name];
		else console.error(`Aucun émoji de ce nom: ${smiley_name}`); 
	}

	//---------------- Les fonctions ci-dessous sont liées à l'initialisation du jeu ---------------
	
	/**
	 * Initialise le jeu :
	 * 		- Initialisation des données de scope (nombre de mines et matrice vierge)
	 * 		- Mise en place du nombre de mines attendu
	 * 		- Calcul des scores de chaque case (doit correspondre au nombre de mines autour de la case, sauf pour les cases minées)
	 */
	initGame() {
		this.scope = {
			remaining_flags: MINES_NUMBER,
			field_matrix: this.getBlankMatrix(),
			game_over: false
		};

		for (let i=0; i<MINES_NUMBER; i++)
			this.createMine();

		for (let x=0; x<COLS_NUMBER; x++)
			for (let y=0; y<ROWS_NUMBER; y++)
				this.initValue(x, y);
	}

	/**
	 * Génère une matrice aux dimensions paramétrées en constante.
	 * Cette matrice est alimentée avec des 0.
	 * La matrice liste des colonnes, pour pouvoir noter matrice[x][y] => cohérence d'utilisation
	 *
	 * @return     {Array}  La matrice vierge
	 */
	getBlankMatrix() {
		let blank_matrix = [];
		for (let x=0; x<COLS_NUMBER; x++) {
			let blank_col = [];
			for (let y=0; y<ROWS_NUMBER; y++)
				blank_col.push(BLANK_VALUE);
			blank_matrix.push(blank_col);
		}
		return blank_matrix;
	}

	/**
	 * Génère des coordonnées aléatoires, afin d'y marquer l'emplacement d'une mine, dans la matrice.
	 * Si l'emplacement est déjà miné, de nouvelles coordonnées sont générées, jusqu'à tomber sur un emplacement libre.
	 */
	createMine() {
		let randomed_x, randomed_y;
		do {
			randomed_x = Math.round(Math.random() * MAX_COLS_IDX);
			randomed_y = Math.round(Math.random() * MAX_ROWS_IDX);
		} while (this.scope.field_matrix[randomed_x][randomed_y] == MINE_VALUE);
		this.scope.field_matrix[randomed_x][randomed_y] = MINE_VALUE;
	}

	/**
	 * Initialise le score de la case située aux coordonnées passées en paramètres, si celle-ci n'est pas minée.
	 * La matrice "this.scope.field_matrix" est mise à jour par cette méthode.
	 *
	 * @param      {number}  x
	 * @param      {number}  y
	 */
	initValue(x, y) {
		let matrix = this.scope.field_matrix;
		if (matrix[x][y] != MINE_VALUE) {
	        this.forEachAroundSquare(x, y, function(targetX, targetY) {
	        	if (matrix[targetX][targetY] == MINE_VALUE)
					matrix[x][y]++;
	        })
		}
	}

	/**
	 * Méthode appelée dans l'événement onLoad du <BODY> afin de paramétrer la grille d'affichage en fonction des constantes
	 */
	pageLoaded() {
		let grille = document.getElementById("mine-field");
		grille.style.gridTemplateColumns = `repeat(${COLS_NUMBER}, ${SQUARE_SIZE}vh)`;
		grille.style.gridAutoRows = `${SQUARE_SIZE}vh`;
		grille.style.width = `${COLS_NUMBER * SQUARE_SIZE}vh`;
		grille.style.height = `${ROWS_NUMBER * SQUARE_SIZE}vh`;

		for (let y=0; y<ROWS_NUMBER; y++) {
			for (let x=0; x<COLS_NUMBER; x++) {
				let new_field_square = new FieldButton(this.scope.field_matrix[x][y], x, y);
				this.scope.field_matrix[x][y] = new_field_square;
				grille.appendChild(new_field_square);
			}
		}

		let flags_left_element = document.getElementById("flags-left");
		new RS_Binding({ object: this.scope, property: "remaining_flags" }).addBinding(flags_left_element, "innerHTML");
	}

	/**
	 * Méthode de ré-initialisation du jeu
	 */
	restart() {
		document.getElementById("mine-field").innerHTML = "";
		this.initGame();
		this.pageLoaded();
		this.setSmiley('default');
	}

	//------------- Méthodes liées au fonctionnement du jeu -----------
	
	/**
	 * Fonction de fin de partie (défaite)
	 * Met à jour l'affichage du plateau afin de mettre en évidence: 
	 * 		- les mines non trouvées
	 * 		- les drapeaux posés au mauvais endroit 
	 */
	gameLost() {
		this.scope.game_over = true;
		this.forEachSquare((currentSquare)=> {
			if (currentSquare.state != FieldButton.STATE_FLAGGED && currentSquare.value == MINE_VALUE)
				currentSquare.button.classList.add("unfound-mine");
			else if (currentSquare.state == FieldButton.STATE_FLAGGED && currentSquare.value != MINE_VALUE)
				currentSquare.button.classList.add("error");
		});
	}

	/**
	 * Appelle la fonction de victoire si c'est pertinent
	 */
	checkVictory() {
		let buttons_left = 0;
		this.forEachSquare((currentSquare)=> {
			if (currentSquare.button)
				buttons_left++;
		});

		// S'il reste autant de cases non dévoilées que de mines, le travail est achevé => victoire !!!
		if (buttons_left == MINES_NUMBER)
			this.applyVictory();
	}

	/**
	 * Fonction de fin de partie (victoire)
	 */
	applyVictory() {
		this.scope.game_over = true;
		this.scope.remaining_flags = 0;
		this.forEachSquare((currentSquare)=> {
			if (currentSquare.button)
				currentSquare.button.classList.add(FieldButton.STATE_FLAGGED);
		});
		this.setSmiley('victory');
	}
}
