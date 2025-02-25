import { useState } from 'react';

import Navbar from '../components/Nav';
import StartGameMenu from '../components/Start-Game-Menu';
import WordSearchGrid from '../components/Word-search-grid';
import useFetchWords from '../hooks/useFetchWordsearchWords';

function Home(){

  const [showWordsearch, setShowWordsearch] = useState(false);

  //const { theme, words, columns, rows, error } = useFetchWords("vehiculos");

  return (
    <div className='page-container'>
      <Navbar />

      <StartGameMenu 
      setShowWordsearch={setShowWordsearch} />

      {showWordsearch && 
      <div className="game-container">
        <WordSearchGrid />
      </div>
      }
    </div>
  );

}

export default Home;