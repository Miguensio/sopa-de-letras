import { useEffect, useState } from "react";

function WordToSearch({ word, handleFoundWord }){

  const [wordFound, setWordFound] = useState('');
  const [isFound, setIsFound] = useState(false);

  useEffect(() => {
    setWordFound('')
    setIsFound(false)
  }, [])

  useEffect(() => {
    if(wordFound === 'no-match'){
      const timer = setTimeout(() => {
        setWordFound('fade-out');
      }, 500);
  
      return () => clearTimeout(timer);
    }
  }, [wordFound]);

  return(
		<p className={`word ${wordFound}`} onClick={() => handleFoundWord(word, setWordFound, isFound, setIsFound)}>-{ word }</p>
  );

}

export default WordToSearch;