import './App.css'
import WordSearchBlock from './components/word-search-block';

function App() {

  //Functions that check if it's possible to fill the array in different directions with the letters of a word

  //wordLimit stores how much space the word is going to occupy
  //availableSpace stores the positions it would travel in the array to create the full word

  function checkSpacePositionUp(randomPosition, gameArray, word, rows, wordSize){
    let controlPosition = 0;
    for(let j = 0; j < wordSize; j++){
      let startingPosition = randomPosition - controlPosition;
      if(gameArray[startingPosition] === '0' || gameArray[startingPosition] === word[j]){
        controlPosition = controlPosition + rows;
      }
      else{
        return false;
      }
    }
    return true;
  }

  function checkSpaceUp(position, rows, wordLength, gameArray, word){
    let wordLimit = (wordLength - 1) * rows;
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
      if(gameArray[startingPosition] === '0' || gameArray[startingPosition] === word[j]){
        controlPosition = controlPosition + rows;
      }
      else{
        return false;
      }
    }
    return true;
  }

  function checkSpaceDown(position, rows, wordLength, arrayLength, gameArray, word){
    let wordLimit = (wordLength - 1) * rows;
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
      if(gameArray[startingPosition] === '0' || gameArray[startingPosition] === word[j]){
        console.log("Posición: ", startingPosition, gameArray[startingPosition], word[j]);
        controlPosition = controlPosition + 1;
      }
      else{
        console.log("Retorna falso: ", "Posición: ", startingPosition, gameArray[startingPosition], word[j]);
        return false;
      }
    }
    return true;
  }

  function checkSpaceLeft(position, columns, wordLength, word, gameArray){
    let wordLimit = wordLength - 1;
    let availableSpace = position - wordLimit;
    let rowBreak = Math.trunc(position / columns);
    let isAvailable;

    if(availableSpace > 0 && rowBreak === Math.trunc(availableSpace / columns)){
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
      let startingPosition = position + controlPosition;
      if(gameArray[startingPosition] === '0' || gameArray[startingPosition] === word[j]){
        console.log("Posición: ", startingPosition, gameArray[startingPosition], word[j]);
        controlPosition = controlPosition + 1;
      }
      else{
        console.log("Retorna falso: ", "Posición: ", startingPosition, gameArray[startingPosition], word[j]);
        return false;
      }
    }
    return true;
  }

  function checkSpaceRight(position, columns, wordLength, arrayLength, word, gameArray){
    let wordLimit = wordLength - 1;
    let availableSpace = position + wordLimit;
    let rowBreak = Math.trunc(position / columns);
    let isAvailable;

    if(availableSpace < arrayLength && rowBreak === Math.trunc(availableSpace / columns)){
      isAvailable = checkSpacePositionRight(position, word, wordLength, gameArray);
      return isAvailable;
    }
    else{
      return false;
    }
  }

  //To check diagonals I check the same way I would do to the right or the left combined with the total space the word takes

  function checkSpacePositionDownRight(position, columns, wordLength, word, gameArray){
    let controlPosition = 0;
    for(let j = 0; j < wordLength; j++){
      let startingPosition = position + controlPosition;
      if(gameArray[startingPosition] === '0' || gameArray[startingPosition] === word[j]){
        controlPosition = controlPosition + columns + 1;
      }
      else{
        return false;
      }
    }
    return true;
  }

  function checkSpaceDownRight(position, rows, columns, wordLength, arrayLength, word, gameArray){
    let wordLimit = ((wordLength - 1) * rows) + (wordLength - 1);
    let availableSpace = position + wordLimit;
    let wordLimitRight = wordLength - 1;
    let availableSpaceRight = position + wordLimitRight;
    let rowBreak = Math.trunc(position / columns);
    let isAvailable;

    if(availableSpace < arrayLength && rowBreak === Math.trunc(availableSpaceRight / columns)){
      isAvailable = checkSpacePositionDownRight(position, columns, wordLength, word, gameArray);
      return isAvailable;
    }
    else{
      return false;
    }
  }

  function checkSpacePositionDownLeft(position, columns, wordLength, word, gameArray){
    let controlPosition = 0;
    for(let j = 0; j < wordLength; j++){
      let startingPosition = position + controlPosition;
      if(gameArray[startingPosition] === '0' || gameArray[startingPosition] === word[j]){
        controlPosition = controlPosition + columns - 1;
      }
      else{
        return false;
      }
    }
    return true;
  }

  function checkSpaceDownLeft(position, rows, columns, wordLength, arrayLength, word, gameArray){
    let wordLimit = ((wordLength - 1) * rows) - (wordLength - 1);
    let availableSpace = position + wordLimit;
    let wordLimitLeft = wordLength - 1;
    let availableSpaceLeft = position - wordLimitLeft;
    let rowBreak = Math.trunc(position / columns);
    let isAvailable;

    if(availableSpace < arrayLength && availableSpaceLeft > 0 && rowBreak === Math.trunc(availableSpaceLeft / columns)){
      isAvailable = checkSpacePositionDownLeft(position, columns, wordLength, word, gameArray);
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
      controlPosition = controlPosition - rows;
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
      gameArray[startingPosition] = string[j];
      controlPosition = controlPosition + 1;
    }
  }

  function fillRight(randomPosition, gameArray, string, wordSize){
    let controlPosition = 0
    for(let j = 0; j < wordSize; j++){
      let startingPosition = randomPosition + controlPosition;
      gameArray[startingPosition] = string[j];
      controlPosition = controlPosition + 1;
    }
  }

  function fillDownRight(randomPosition, columns, wordLength, word, gameArray){
    let controlPosition = 0;
    for(let j = 0; j < wordLength; j++){
      let startingPosition = randomPosition + controlPosition;
      gameArray[startingPosition] = word[j];
      controlPosition = controlPosition + columns + 1;
    }
  }

  function fillDownLeft(randomPosition, columns, wordLength, word, gameArray){
    let controlPosition = 0;
    for(let j = 0; j < wordLength; j++){
      let startingPosition = randomPosition + controlPosition;
      gameArray[startingPosition] = word[j];
      controlPosition = controlPosition + columns - 1;
    }
  }

  function fillUpLeft(randomPosition, columns, wordLength, word, gameArray){
    let controlPosition = 0;
    for(let j = 0; j < wordLength; j++){
      let startingPosition = randomPosition - controlPosition;
      gameArray[startingPosition] = word[j];
      controlPosition = controlPosition + columns + 1;
    }
  }

  //const words = ["HOLA","POLOLA","PROBANDO","TAL","COMPA","PARALO"];
  const words = ["HOLA","POLOLA","PROBANDO"];
  const [rows, columns] = [10, 10];
  const size = rows * columns;

  console.log(size);

  const createGameArray = (words) => {
    const gameArray = new Array(size);
    gameArray.fill('0');

    let i = 0;

    while(i < words.length){
      let string = words[i];
      let wordSize = string.length;

      let randomPosition = Math.floor(Math.random() * size);
      if(!(gameArray[randomPosition] === string[0] || gameArray[randomPosition] === '0' )){
        continue;
      }
      /*
      let positionUp = checkSpaceUp(randomPosition, rows, wordSize, gameArray, string);

      console.log("Checkeo si se puede hacia arriba: ", string, "desde la posición: ",randomPosition, positionUp);

      if(positionUp){
        fillUp(randomPosition, gameArray, string, rows, wordSize);
        i++;
        continue;
      }
      let positionDown = checkSpaceDown(randomPosition, rows, wordSize, gameArray.length, gameArray, string);

      console.log("Checkeo si se puede hacia abajo: ", string, "desde la posición: ",randomPosition, positionDown);

      if(positionDown){
        fillDown(randomPosition, gameArray, string, rows, wordSize);
        i++;
        continue;
      }

      let positionLeft = checkSpaceLeft(randomPosition, columns, wordSize, string, gameArray);

      console.log("Checkeo si se puede hacia la izquierda: ", string, "desde la posición: ",randomPosition, positionLeft);

      if(positionLeft){
        fillLeft(randomPosition, gameArray, string, wordSize);
        i++;
        continue;
      }

      let positionRight = checkSpaceRight(randomPosition, columns, wordSize, gameArray.length, string, gameArray);

      console.log("Checkeo si se puede hacia la derecha: ", string, "desde la posición: ",randomPosition, positionRight);

      if(positionRight){
        fillRight(randomPosition, gameArray, string, wordSize);
        i++;
        continue;
      }
      

      let positionDownRight = checkSpaceDownRight(randomPosition, rows, columns, wordSize, gameArray.length, string, gameArray);

      console.log("Checkeo si se puede hacia abajo-derecha: ", string, "desde la posición: ",randomPosition, positionDownRight);

      if(positionDownRight){
        fillDownRight(randomPosition, columns, wordSize, string, gameArray);
        i++;
        continue;
      }
        */
  
      let positionDownLeft = checkSpaceDownLeft(randomPosition, rows, columns, wordSize, gameArray.length, string, gameArray);

      console.log("Checkeo si se puede hacia abajo-izquierda: ", string, "desde la posición: ",randomPosition, positionDownLeft);

      if(positionDownLeft){
        fillDownLeft(randomPosition, columns, wordSize, string, gameArray);
        i++;
        continue;
      }

    }
    console.log(gameArray);
    return gameArray;
  }

  let gameArray = createGameArray(words);

  const chunkArray = (array, chunkSize) => {
    const numberOfChunks = Math.ceil(array.length / chunkSize);
  
    return [...Array(numberOfChunks)]
      .map((value, index) => {
        return array.slice(index * chunkSize, (index + 1) * chunkSize);
      })
  }

  let gameArrayChunks = chunkArray(gameArray, columns);

  console.log(gameArrayChunks);

  return (
    <div className="container">
      {gameArrayChunks.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((value, index) => (
            <WordSearchBlock value={value} key={index} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default App
