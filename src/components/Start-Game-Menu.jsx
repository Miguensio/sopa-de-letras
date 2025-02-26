import './start-game-styles.css';
import useFetchWords from '../hooks/useFetchWordsearchWords';

function StartGameMenu({ setShowWordsearch, setInputTheme, setWords, setColumns, setRows }){

	const handleClickRandom = () => {
		useFetchWords("aleatorio", setInputTheme, setWords, setColumns, setRows, setShowWordsearch);
	}

	const handleClickTheme = () => {
		const theme = document.getElementById("theme-input").value;
		useFetchWords(theme, setInputTheme, setWords, setColumns, setRows, setShowWordsearch);
	}

	return(
		<div className="start-menu-container">
			<div className="start-menu-content">
				<h2>Introduzca un tema para la sopa de letras...</h2>
				<div className="input-container">
					<input id="theme-input" type="text" placeholder="Introduzca una temática"/>
					<button onClick={handleClickTheme}>Generar</button>
				</div>
				<h2>O genere una sopa de letras de tema aleatorio.</h2>
				<div className="button-container">
					<button onClick={handleClickRandom}>Generar sopa aleatoria</button>
				</div>
			</div>
		</div>
	);

}

export default StartGameMenu;