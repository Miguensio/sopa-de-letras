import { useState } from 'react';

import Navbar from '../components/Nav';
import StartGameMenu from '../components/Start-Game-Menu';
import WordSearchGrid from '../components/Word-search-grid';

function Home(){
  const [showWordsearch, setShowWordsearch] = useState(false);
  const [words, setWords] = useState([]);
  const [columns, setColumns] = useState('');
  const [rows, setRows] = useState('');
  const [inputTheme, setInputTheme] = useState('');

  //const { theme, words, columns, rows, error } = useFetchWords("vehiculos");

  return (
    <div className='page-container'>
      <Navbar />

      <StartGameMenu 
      setShowWordsearch={setShowWordsearch}
      setInputTheme={setInputTheme}
      setWords={setWords}
      setColumns={setColumns}
      setRows={setRows} />

      {showWordsearch && 
      <div className="game-container">
        <WordSearchGrid 
        theme={inputTheme}
        words={words}
        columns={columns}
        rows={rows} />
      </div>
      }
    </div>
  );

}

export default Home;