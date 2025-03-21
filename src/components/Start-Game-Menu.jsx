import { useState } from 'react';
import './start-game-styles.css';
import useFetchWords from '../hooks/useFetchWordsearchWords';

function StartGameMenu({ handleShowWordsearch, handleWordsearchInfo, handleIsLoading, handleError }){
	const [theme, setTheme] = useState('')

	const handleClickRandom = () => {
		handleShowWordsearch(false);
		handleIsLoading(true);
		useFetchWords("aleatorio", handleWordsearchInfo, handleShowWordsearch, handleIsLoading, handleError);
	}

	const handleClickTheme = () => {
		handleShowWordsearch(false);
		handleIsLoading(true);
		useFetchWords(theme, handleWordsearchInfo, handleShowWordsearch, handleIsLoading, handleError);
	}

	const handleInput = (e) => {
		setTheme(e.target.value)
	}

	return(
		<div className="start-menu-container">
			<div className="start-menu-content">
				<h2>Introduzca un tema para la sopa de letras...</h2>
				<div className="input-container">
					<input type="text" value={theme} onChange={handleInput} placeholder="Introduzca un tema"/>
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