import { useEffect, useState, useRef } from 'react';

import Navbar from '../components/Nav';
import StartGameMenu from '../components/Start-Game-Menu';
import WordSearchGrid from '../components/Word-search-grid';
import Footer from '../components/Footer';

function Home(){
  const [showWordsearch, setShowWordsearch] = useState(false);
  const [wordsearchInfo, setWordsearchInfo] = useState({
    words: [],
    theme: null,
    columns: null,
    rows: null,
  })
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const wordsearchRef = useRef(null)

  useEffect(() => {
    if(wordsearchInfo.words.length !== 0){
      window.scrollTo({
        top: wordsearchRef.current.offsetTop,
        behavior: 'smooth'
      });
    }
  }, [wordsearchInfo]);

  useEffect(() => {
    if(error !== null){
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer);

    }
  }, [error]);

  const handleWordsearchInfo = (words, inputTheme, columns, rows) => {
    setWordsearchInfo({
      words: words,
      theme: inputTheme,
      columns: columns,
      rows: rows
    })
  }

  const handleShowWordsearch = (bool) => {
    setShowWordsearch(bool)
  }

  const handleIsLoading = (bool) => {
    setIsLoading(bool)
  }

  const handleError = (errorMessage) => {
    setError(errorMessage)
  }

  return (
    <div className='page-container'>
      <Navbar />

      <StartGameMenu 
      handleShowWordsearch={handleShowWordsearch}
      handleWordsearchInfo={handleWordsearchInfo} 
      handleIsLoading={handleIsLoading}
      handleError={handleError} />

      {isLoading &&
        <div className='loading'>
          <div className="spinner"></div>
        </div>
      }

      {showWordsearch &&
      <main ref={wordsearchRef} className="game-container">
        <WordSearchGrid 
        wordsearchInfo={wordsearchInfo} />
      </main>
      }

      {error && <div className='error-container'><p>Ocurrió un error procesando su acción. Intente de nuevo.</p></div>}

      <Footer />

    </div>
  );

}

export default Home;