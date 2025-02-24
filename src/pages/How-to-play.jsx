import Selection from '../images/selection.png';
import SelectionNotValid from '../images/selection notvalid.png';
import WordSelection from '../images/wordselection.png';
import SelectionError from '../images/selection error.png';
import SelectionCorrect from '../images/selection correct.png';
import Navbar from '../components/Nav';

function HowToPlay(){
	return(
		<div className="page-container">
			<Navbar />
			<main className='main-text-content'>
			<div className='text-container'>
					<h2>¿Qué es una sopa de letras?</h2>
					<p>
						Una sopa de letras es un juego que consta de un cuadro con muchas letras y palabras que buscar, normalmente de una
						temática que las une. El jugador debe marcar las letras que al unirse formen las palabras que se tengan que buscar.
						<br /> <br />
						El jugador debe marcar las letras que formen la palabra una seguida de la otra, es decir, no puedes seleccionar letras
						que estén separadas de una dirección. Si seleccionas una letra, tienes que seleccionar las demás en una sola dirección,
						ya sea vertical, horizontal o diagonal.
					</p>
				</div>
				<div className='text-container'>
					<h2>¿Cómo jugar?</h2>
					<div className='rules-container'>
						<h3>1. Selecciona letras en el tablero</h3>
						<div className='rule-container'>
							<p>
								Pulsar encima de una letra en el cuadro de juego hará que se marque en verde.
							</p>
							<img src={Selection} alt="" />
						</div>
						<div className='rule-container'>
							<p>
								Si haces una selección inválida se marcará la letra en rojo. Recuerda que solo puedes seleccionar
								letras en una dirección en secuencia, y no puedes eliminar selecciones que no sean a los extremos.
							</p>
							<img src={SelectionNotValid} alt="" />
						</div>
						<h3>2. Selecciona las palabras</h3>
						<div className='rule-container'>
							<p>
								Debajo del cuadro de la sopa de letras están todas las palabras que debes buscar. Una vez tengas una selección
								de letras puedes pulsar encima de una palabra para compararla con tu selección.
							</p>
							<img src={WordSelection} alt="" />
						</div>
						<div className='rule-container'>
							<p>
								Si tu selección es correcta la palabra se colocará en verde y tu selección de letras quedará marcada con color verde.
								Ten en cuenta que de ser necesario puedes seleccionar las letras que quedaron marcadas para buscar otra
								palabra.
							</p>
							<img src={SelectionCorrect} alt="" />
						</div>
						<div className='rule-container'>
							<p>
								Si tu selección no concuerda con la palabra entonces la palabra y tu selección parpadearán en rojo por un momento.
							</p>
							<img src={SelectionError} alt="" />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default HowToPlay;