import { useRef } from 'react';
import WordSearchBlock from './word-search-block';
import './word-search-grid-styles.css';

const WordSearchGrid = () => {

  let itemSelected = false;
  let firstClickedIndex;
  let clickedIndexes = [];
  let direction = '';

  //Functions that check if it's possible to fill the array in different directions with the letters of a word

  //wordLimit stores how much space the word is going to occupy
  //availableSpace stores the positions it would travel in the array to create the full word

  function checkSpacePositionUp(randomPosition, gameArray, word, columns, wordSize){
    let controlPosition = 0;
    for(let j = 0; j < wordSize; j++){
      let startingPosition = randomPosition - controlPosition;
      if(gameArray[startingPosition] === '0' || gameArray[startingPosition] === word[j]){
        controlPosition = controlPosition + columns;
      }
      else{
        return false;
      }
    }
    return true;
  }

  function checkSpaceUp(position, columns, wordLength, gameArray, word){
    let wordLimit = (wordLength - 1) * columns;
    let availableSpace = position - wordLimit;
    let isAvailable;

    if(availableSpace > 0){
      isAvailable = checkSpacePositionUp(position, gameArray, word, columns, wordLength);
      return isAvailable;
    }
    else{
      return false;
    }
  }

  function checkSpacePositionDown(randomPosition, gameArray, word, columns, wordSize){
    let controlPosition = 0;
    for(let j = 0; j < wordSize; j++){
      let startingPosition = randomPosition + controlPosition;
      if(gameArray[startingPosition] === '0' || gameArray[startingPosition] === word[j]){
        controlPosition = controlPosition + columns;
      }
      else{
        return false;
      }
    }
    return true;
  }

  function checkSpaceDown(position, columns, wordLength, arrayLength, gameArray, word){
    let wordLimit = (wordLength - 1) * columns;
    let availableSpace = position + wordLimit;
    let isAvailable;

    if(availableSpace < arrayLength){
      isAvailable = checkSpacePositionDown(position, gameArray, word, columns, wordLength);
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

  function checkSpacePositionUpLeft(position, columns, wordLength, word, gameArray){
    let controlPosition = 0;
    for(let j = 0; j < wordLength; j++){
      let startingPosition = position - controlPosition;
      if(gameArray[startingPosition] === '0' || gameArray[startingPosition] === word[j]){
        controlPosition = controlPosition + columns + 1;
      }
      else{
        return false;
      }
    }
    return true;
  }

  function checkSpaceUpLeft(position, rows, columns, wordLength, word, gameArray){
    let wordLimit = ((wordLength - 1) * rows) - (wordLength - 1);
    let availableSpace = position - wordLimit;
    let wordLimitLeft = wordLength - 1;
    let availableSpaceLeft = position - wordLimitLeft;
    let rowBreak = Math.trunc(position / columns);
    let isAvailable;

    if(availableSpace > 0 && rowBreak === Math.trunc(availableSpaceLeft / columns)){
      isAvailable = checkSpacePositionUpLeft(position, columns, wordLength, word, gameArray);
      return isAvailable;
    }
    else{
      return false;
    }
  }

  function checkSpacePositionUpRight(position, columns, wordLength, word, gameArray){
    let controlPosition = 0;
    for(let j = 0; j < wordLength; j++){
      let startingPosition = position - controlPosition;
      if(gameArray[startingPosition] === '0' || gameArray[startingPosition] === word[j]){
        controlPosition = controlPosition + columns - 1;
      }
      else{
        return false;
      }
    }
    return true;
  }

  function checkSpaceUpRight(position, rows, columns, wordLength, word, gameArray){
    let wordLimit = ((wordLength - 1) * rows) + (wordLength - 1);
    let availableSpace = position - wordLimit;
    let wordLimitRight = wordLength - 1;
    let availableSpaceRight = position + wordLimitRight;
    let rowBreak = Math.trunc(position / columns);
    let isAvailable;

    if(availableSpace > 0 && rowBreak === Math.trunc(availableSpaceRight / columns)){
      isAvailable = checkSpacePositionUpRight(position, columns, wordLength, word, gameArray);
      return isAvailable;
    }
    else{
      return false;
    }
  }

  //Functions to fill the array in 8 directions

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

  function fillUpRight(randomPosition, columns, wordLength, word, gameArray){
    let controlPosition = 0;
    for(let j = 0; j < wordLength; j++){
      let startingPosition = randomPosition - controlPosition;
      gameArray[startingPosition] = word[j];
      controlPosition = controlPosition + columns - 1;
    }
  }

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
      
      let positionUp = checkSpaceUp(randomPosition, columns, wordSize, gameArray, string);

      console.log("Checkeo si se puede hacia arriba: ", string, "desde la posición: ",randomPosition, positionUp);

      if(positionUp){
        fillUp(randomPosition, gameArray, string, columns, wordSize);
        i++;
        continue;
      }
      let positionDown = checkSpaceDown(randomPosition, columns, wordSize, gameArray.length, gameArray, string);

      console.log("Checkeo si se puede hacia abajo: ", string, "desde la posición: ",randomPosition, positionDown);

      if(positionDown){
        fillDown(randomPosition, gameArray, string, columns, wordSize);
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
  
      let positionDownLeft = checkSpaceDownLeft(randomPosition, rows, columns, wordSize, gameArray.length, string, gameArray);

      console.log("Checkeo si se puede hacia abajo-izquierda: ", string, "desde la posición: ",randomPosition, positionDownLeft);

      if(positionDownLeft){
        fillDownLeft(randomPosition, columns, wordSize, string, gameArray);
        i++;
        continue;
      }

      let positionUpLeft = checkSpaceUpLeft(randomPosition, rows, columns, wordSize, string, gameArray);

      console.log("Checkeo si se puede hacia arriba-izquierda: ", string, "desde la posición: ",randomPosition, positionUpLeft);

      if(positionUpLeft){
        fillUpLeft(randomPosition, columns, wordSize, string, gameArray);
        i++;
        continue;
      }

      let positionUpRight = checkSpaceUpRight(randomPosition, rows, columns, wordSize, string, gameArray);

      console.log("Checkeo si se puede hacia arriba-derecha: ", string, "desde la posición: ",randomPosition, positionUpRight);

      if(positionUpRight){
        fillUpRight(randomPosition, columns, wordSize, string, gameArray);
        i++;
        continue;
      }

    }
    console.log(gameArray);
    return gameArray;
  }

  const chunkArray = (array, chunkSize) => {
    const numberOfChunks = Math.ceil(array.length / chunkSize);
  
    return [...Array(numberOfChunks)]
      .map((value, index) => {
        return array.slice(index * chunkSize, (index + 1) * chunkSize);
      })
  }

  //const words = ["HOLA","POLOLA","PROBANDO","TAL","COMPA","PARALO"];
  const words = ["HOLA","CONSOLA","DIAGONAL","POLOLA","PROBA","COLA","TROLA","DALE","COMPA","DROGA"];
  const [rows, columns] = [12,15];
  const size = rows * columns;

  console.log(size);

  let gameArray = createGameArray(words);

  let gameArrayChunks = chunkArray(gameArray, columns);

  console.log(gameArrayChunks);

  const handleSelection = (propState, setPropState, index) => {
    //If no item is selected yet the prop state is changed and the index is saved
    //If there's an item selected then a direction needs to be decided based on the next element the user selects
    if(!itemSelected){
      if(propState === "no-selected"){
        setPropState("selected");
        itemSelected = true;
        firstClickedIndex = index;
        clickedIndexes.push(index);
      }
    }
    else{
      if(direction === ''){
        if(firstClickedIndex - index === -1){
          direction = 'right';
          setPropState('selected');
          clickedIndexes.push(index);
        }
        else if(firstClickedIndex - index === 1){
          direction = 'left';
          setPropState('selected');
          clickedIndexes.push(index);
        }
        else if(firstClickedIndex - index === columns * -1){
          direction = 'down';
          setPropState('selected');
          clickedIndexes.push(index);
        }
        else if(firstClickedIndex - index === columns){
          direction = 'up';
          setPropState('selected');
          clickedIndexes.push(index);
        }
        else if(firstClickedIndex - index === (columns + 1) * -1){
          direction = 'down-right';
          setPropState('selected');
          clickedIndexes.push(index);
        }
        else if(firstClickedIndex - index === columns + 1){
          direction = 'up-left';
          setPropState('selected');
          clickedIndexes.push(index);
        }
        else if(firstClickedIndex - index === columns - 1){
          direction = 'up-right';
          setPropState('selected');
          clickedIndexes.push(index);
        }
        else if(firstClickedIndex - index === (columns - 1) * -1){
          direction = 'down-left';
          setPropState('selected');
          clickedIndexes.push(index);
        }
      }
      else if(direction === 'right'){
        if(clickedIndexes[0] - 1 === index || clickedIndexes[clickedIndexes.length - 1] + 1 === index){
          
        }
      }
    }
    console.log(clickedIndexes);
    console.log(itemSelected);
    console.log(index);
    console.log(direction);
  }

  return (
    <>
      <div className="word-search-grid-container">
        {gameArrayChunks.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((value, index) => (
              <WordSearchBlock 
              value={value}
              indexPos={rowIndex * gameArrayChunks[0].length + index}
              handleItemSelected={handleSelection}
              key={rowIndex * gameArrayChunks[0].length + index} />
            ))}
          </div>
        ))}
      </div>
      <div className='words-container'>
        <div className='words'>
          {words.map((word, index) => (
            <p key={index}>- {word}</p>
          ))}
        </div>
      </div>
    </>
  );

}

export default WordSearchGrid