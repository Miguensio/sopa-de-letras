import './start-game-styles.css';

function StartGameMenu({ setShowWordsearch }){

	const handleClick = () => {
		setShowWordsearch(true);
	}

	return(
		<div className="start-menu-container">
			<div className="start-menu-content">
				<h2>Introduzca un tema para la sopa de letras...</h2>
				<div className="input-container">
					<input type="text" placeholder="Introduzca una temática"/>
					<button onClick={handleClick}>Generar</button>
				</div>
				<h2>O genere una sopa de letras de tema aleatorio.</h2>
				<div className="button-container">
					<button onClick={handleClick}>Generar sopa aleatoria</button>
				</div>
			</div>
		</div>
	);

}

export default StartGameMenu;