import './App.css'
import WordSearchBlock from './components/word-search-block';

function App() {

  const words = ["hola","polola","probando","tal"];
  const [rows, columns] = [10, 10];
  const size = rows * columns;

  console.log(size);

  //Functions that check if it's possible to fill the array in different directions with the letters of a word

  //wordLimit stores how much space the word is going to occupy
  //availableSpace stores the positions it would travel in the array to create the full word

  function checkSpacePositionUp(randomPosition, gameArray, word, rows, wordSize){
    let controlPosition = 0;
    for(let j = 0; j < wordSize; j++){
      let startingPosition = randomPosition - controlPosition;
      if(gameArray[startingPosition] === undefined || gameArray[startingPosition] === word[j]){
        controlPosition = controlPosition + rows;
      }
      else{
        return false;
      }
    }
    return true;
  }

  function checkSpaceUp(position, rows, wordLength, gameArray, word){
    let wordLimit = wordLength * rows;
    let availableSpace = position - wordLimit;
    let isAvailable;

    if(availableSpace > 0){
      isAvailable = checkSpacePositionUp(position, gameArray, word, rows, wordLength);
      return isAvailable;
    }
    else{
      return false;
    }
  }

  function checkSpacePositionDown(randomPosition, gameArray, word, rows, wordSize){
    let controlPosition = 0;
    for(let j = 0; j < wordSize; j++){
      let startingPosition = randomPosition + controlPosition;
      if(gameArray[startingPosition] === undefined || gameArray[startingPosition] === word[j]){
        controlPosition = controlPosition + rows;
      }
      else{
        return false;
      }
      console.log(startingPosition);
    }
    return true;
  }

  function checkSpaceDown(position, rows, wordLength, arrayLength, gameArray, word){
    let wordLimit = wordLength * rows;
    let availableSpace = position + wordLimit;
    let isAvailable;

    if(availableSpace < arrayLength){
      isAvailable = checkSpacePositionDown(position, gameArray, word, rows, wordLength);
      return isAvailable;
    }
    else{
      return false;
    }
  }

  //rowBreak is the trunc number that defines if the letter is in a valid row or not

  function checkSpacePositionLeft(position, word, wordLength, gameArray){
    let controlPosition = 0
    for(let j = 0; j < wordLength; j++){
      let startingPosition = position - controlPosition;
      if(gameArray[startingPosition] === undefined || gameArray[startingPosition] === word[j]){
        controlPosition = controlPosition - 1;
      }
      else{
        return false;
      }
    }
    return true;
  }

  function checkSpaceLeft(position, columns, wordLength, word, gameArray){
    let wordLimit = wordLength;
    let availableSpace = position - wordLimit;
    let rowBreak = Math.trunc(position / columns);
    let isAvailable;

    if(availableSpace > 0 && rowBreak === Math.trunc(availableSpace)){
      isAvailable = checkSpacePositionLeft(position, word, wordLength, gameArray);
      return isAvailable;
    }
    else{
      return false;
    }
  }

  function checkSpacePositionRight(position, word, wordLength, gameArray){
    let controlPosition = 0
    for(let j = 0; j < wordLength; j++){
      let startingPosition = position - controlPosition;
      if(gameArray[startingPosition] === undefined || gameArray[startingPosition] === word[j]){
        controlPosition = controlPosition + 1;
      }
      else{
        return false;
      }
    }
    return true;
  }

  function checkSpaceRight(position, columns, wordLength, arrayLength, word, gameArray){
    let wordLimit = wordLength;
    let availableSpace = position + wordLimit;
    let rowBreak = Math.trunc(position / columns);
    let isAvailable;

    if(availableSpace < arrayLength && rowBreak === Math.trunc(availableSpace)){
      isAvailable = checkSpacePositionRight(position, word, wordLength, gameArray);
      return isAvailable;
    }
    else{
      return false;
    }
  }

  //Functions to fill the array in 4 directions

  function fillUp(randomPosition, gameArray, string, rows, wordSize){
    let controlPosition = 0;
    for(let j = 0; j < wordSize; j++){
      let startingPosition = randomPosition + controlPosition;
      gameArray[startingPosition] = string[j];
      controlPosition = controlPosition + rows;
    }
  }

  function fillDown(randomPosition, gameArray, string, rows, wordSize){
    let controlPosition = 0;
    for(let j = 0; j < wordSize; j++){
      let startingPosition = randomPosition + controlPosition;
      gameArray[startingPosition] = string[j];
      controlPosition = controlPosition + rows;
    }
  }

  function fillLeft(randomPosition, gameArray, string, wordSize){
    let controlPosition = 0
    for(let j = 0; j < wordSize; j++){
      let startingPosition = randomPosition - controlPosition;
      gameArray[startingPosition] === string[j];
      controlPosition = controlPosition - 1;
    }
  }

  function fillRight(randomPosition, gameArray, string, wordSize){
    let controlPosition = 0
    for(let j = 0; j < wordSize; j++){
      let startingPosition = randomPosition - controlPosition;
      gameArray[startingPosition] === string[j];
      controlPosition = controlPosition + 1;
    }
  }

  const createGameArray = (words) => {
    const gameArray = new Array(size);

    for(let i = 0; i < words.length; i++){
      let string = words[i];
      let wordSize = string.length;

      let randomPosition = Math.floor(Math.random() * size);

      let positionUp = checkSpaceUp(randomPosition, rows, wordSize, gameArray, string);

      if(positionUp){
        fillUp(randomPosition, gameArray, string, rows, wordSize);
      }

      let positionDown = checkSpaceDown(randomPosition, rows, wordSize, gameArray, string);

      if(positionDown){
        fillDown(randomPosition, gameArray, string, rows, wordSize);
      }

      let positionLeft = checkSpaceLeft(randomPosition, columns, wordSize, string, gameArray);

      if(positionLeft){
        fillLeft(randomPosition, gameArray, string, wordSize);
      }

      let positionRight = checkSpaceRight(randomPosition, columns, wordSize, string, gameArray);

      if(positionRight){
        fillRight(randomPosition, gameArray, string, wordSize);
      }
      console.log(gameArray);
    }
  }

  createGameArray(words);

  return (
    <div className='container'>
      
    </div>
  )
}

export default App
