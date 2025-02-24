import Navbar from '../components/Nav';
import WordSearchGrid from '../components/Word-search-grid';

function Home(){

    return (
        <div className='page-container'>
          <Navbar />
          <div className="game-container">
            <WordSearchGrid />
          </div>
        </div>
      );

}

export default Home;