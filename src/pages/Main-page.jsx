import Navbar from '../components/Nav';
import WordSearchGrid from '../components/Word-search-grid';
import useFetchWords from '../hooks/useFetchWordsearchWords';

function Home(){

  useFetchWords("vehiculos");

    return (
        <div className='page-container'>
          <Navbar />

          <div className='input-container'>
            <input type="text" placeholder='Introduzca una temática'/>
            <button>Generar</button>
          </div>

          <div className="game-container">
            <WordSearchGrid />
          </div>
        </div>
      );

}

export default Home;