import { useEffect, useState } from 'react';

import Navbar from '../components/Nav';
import StartGameMenu from '../components/Start-Game-Menu';
import WordSearchGrid from '../components/Word-search-grid';
import Footer from '../components/Footer';

function Home(){
  const [showWordsearch, setShowWordsearch] = useState(false);
  const [words, setWords] = useState([]);
  const [columns, setColumns] = useState('');
  const [rows, setRows] = useState('');
  const [inputTheme, setInputTheme] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(words.length !== 0){
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  }, [words]);

  useEffect(() => {
    if(error !== null){
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer);

    }
  }, [error]);

  return (
    <div className='page-container'>
      <Navbar />

      <StartGameMenu 
      setShowWordsearch={setShowWordsearch}
      setInputTheme={setInputTheme}
      setWords={setWords}
      setColumns={setColumns}
      setRows={setRows} 
      setIsLoading={setIsLoading}
      setError={setError} />

      {isLoading &&
        <div className='loading'>
          <div className="spinner"></div>
        </div>
      }

      {showWordsearch &&
      <main className="game-container">
        <WordSearchGrid 
        theme={inputTheme}
        words={words}
        columns={columns}
        rows={rows} />
      </main>
      }

      {error && <div className='error-container'><p>Ocurrió un error procesando su acción. Intente de nuevo.</p></div>}

      <Footer />

    </div>
  );

}

export default Home;