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
						<br />
						El jugador debe marcar las letras que formen la palabra una seguida de la otra, es decir, no puedes seleccionar letras
						que estén separadas de una dirección. Si seleccionas una letra, tienes que seleccionar las demás en una sola dirección,
						ya sea vertical, horizontal o diagonal.
					</p>
				</div>
				<div className='text-container'>
					<h2>Cómo jugar</h2>
					<div className='rules-container'>
						<h3>1. Selecciona letras</h3>
						<div className='rule-container'>
							<p>
								Pulsar encima de una letra en el cuadro de juego hará que se marque.
							</p>
						</div>
						<div className='rule-container'>
							<p>
								Si haces una selección inválida se marcará la letra en rojo. Recuerda que solo puedes seleccionar
								letras en una dirección en secuencia, y no puedes eliminar selecciones que no sean a los extremos.
							</p>
						</div>
						<h3>2. Selecciona palabra</h3>
						<div className='rule-container'>
							<p>
								Debajo del cuadro de la sopa de letras están todas las palabras que debes buscar. Una vez tengas una selección
								de letras puedes pulsar encima de una palabra para compararla con tu selección.
							</p>
						</div>
						<div className='rule-container'>
							<p>
								Si tu selección es correcta la palabra aparecerá en verde.
							</p>
						</div>
						<div className='rule-container'>
							<p>
								Pero si es errónea se marcará en rojo por un momento.
							</p>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default HowToPlay;