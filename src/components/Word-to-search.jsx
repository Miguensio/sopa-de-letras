import { useState } from "react";

function WordToSearch({ word, handleFoundWord }){

  const [wordFound, setWordFound] = useState('');

  return(
		<p className={`word ${wordFound}`} onClick={() => handleFoundWord(word, setWordFound)}>-{ word }</p>
  );

}

export default WordToSearch;