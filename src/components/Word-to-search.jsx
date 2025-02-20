import { use, useState } from "react";

function WordToSearch({ word, selectedLetters }){

  const [wordFound, setWordFound] = useState('');

  const handleClick = (word, selectedLetters) => {
    let wordLetters = [];
    let foundWord;

    for(let i = 0; i < word.length; i++){
      wordLetters.push(word[i]);
    }

    wordLetters.sort();
    selectedLetters.sort();

    if(wordLetters.length === selectedLetters.length){
      for(let i = 0; i < wordLetters.length; i++){
        if(!wordLetters[i] === selectedLetters[i]){
          foundWord = false;
          break;
        }
        else{
          foundWord = true
        }
      }
    }
    else{
      foundWord = false;
    }

    if(foundWord){
      setWordFound('found-word');
    }
    else{
      console.log("La palabra no coincide");
    }

  }

  return(
		<p className={`word ${wordFound}`} onClick={() => handleClick(word, selectedLetters)}>-{ word }</p>
  );

}

export default WordToSearch;