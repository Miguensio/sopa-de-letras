import WordSearchBlock from './word-search-block';
import './word-search-grid-styles.css';
import WordToSearch from './Word-to-search';

const WordSearchGrid = ({ wordsearchInfo }) => {

  const { words, theme, columns, rows } = wordsearchInfo

  let itemSelected = false;
  let foundWords = 0;
  let firstClickedIndex;
  let clickedIndexes = [];
  let selectedLetters = [];
  let selectedStates = [];
  let selectedFound = [];
  let direction = '';
  let rowBreak;

  let toBeDeleted = [];

  const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

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
        controlPosition = controlPosition + 1;
      }
      else{
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
        controlPosition = controlPosition + 1;
      }
      else{
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
    let count = 0;

    let i = 0;

    while(i < words.length){
      let string = words[i];
      let wordSize = string.length;

      let randomPosition = Math.floor(Math.random() * size);
      if(!(gameArray[randomPosition] === string[0] || gameArray[randomPosition] === '0' )){
        continue;
      }

      let positionDownRight = checkSpaceDownRight(randomPosition, rows, columns, wordSize, gameArray.length, string, gameArray);

      if(positionDownRight){
        fillDownRight(randomPosition, columns, wordSize, string, gameArray);
        i++;
        count = 0;
        continue;
      }
  
      let positionDownLeft = checkSpaceDownLeft(randomPosition, rows, columns, wordSize, gameArray.length, string, gameArray);

      if(positionDownLeft){
        fillDownLeft(randomPosition, columns, wordSize, string, gameArray);
        i++;
        count = 0;
        continue;
      }

      let positionUpLeft = checkSpaceUpLeft(randomPosition, rows, columns, wordSize, string, gameArray);

      if(positionUpLeft){
        fillUpLeft(randomPosition, columns, wordSize, string, gameArray);
        i++;
        count = 0;
        continue;
      }

      let positionUpRight = checkSpaceUpRight(randomPosition, rows, columns, wordSize, string, gameArray);

      if(positionUpRight){
        fillUpRight(randomPosition, columns, wordSize, string, gameArray);
        i++;
        count = 0;
        continue;
      }

      let positionUp = checkSpaceUp(randomPosition, columns, wordSize, gameArray, string);

      if(positionUp){
        fillUp(randomPosition, gameArray, string, columns, wordSize);
        i++;
        count = 0;
        continue;
      }
      let positionDown = checkSpaceDown(randomPosition, columns, wordSize, gameArray.length, gameArray, string);

      if(positionDown){
        fillDown(randomPosition, gameArray, string, columns, wordSize);
        i++;
        count = 0;
        continue;
      }

      let positionLeft = checkSpaceLeft(randomPosition, columns, wordSize, string, gameArray);

      if(positionLeft){
        fillLeft(randomPosition, gameArray, string, wordSize);
        i++;
        count = 0;
        continue;
      }

      let positionRight = checkSpaceRight(randomPosition, columns, wordSize, gameArray.length, string, gameArray);

      if(positionRight){
        fillRight(randomPosition, gameArray, string, wordSize);
        i++;
        count = 0;
        continue;
      }

      if(count > 50){
        toBeDeleted.push(i);
        count = 0;
        i++;
        continue;
      }
      else{
        count++
      }

    }

    if(toBeDeleted.length > 0){
      for(let i = 0; i < toBeDeleted.length; i++){
        words.splice(toBeDeleted[i])
      }
    }

    return gameArray;
  }

  const chunkArray = (array, chunkSize) => {
    const numberOfChunks = Math.ceil(array.length / chunkSize);
  
    return [...Array(numberOfChunks)]
      .map((value, index) => {
        return array.slice(index * chunkSize, (index + 1) * chunkSize);
      })
  }

  const deselectBlock = (clickedIndexes, index, setPropState, selectedLetters, selectedStates, selectedFound) => {
    if(clickedIndexes[0] === index){
      clickedIndexes.shift();
      selectedLetters.shift();
      selectedStates.shift();
      selectedFound.shift();
      setPropState('no-selected');
    }
    else if(clickedIndexes[clickedIndexes.length - 1] === index){
      clickedIndexes.pop();
      selectedLetters.pop();
      selectedStates.pop();
      selectedFound.pop();
      setPropState('no-selected');
    }
  }

  const handleFoundWord = (word, setWordFound, isFound, setIsFound) => {
    if(!isFound){
      let wordLetters = [];
      let foundWord;

      for(let i = 0; i < word.length; i++){
        wordLetters.push(word[i]);
      }

      wordLetters.sort();
      selectedLetters.sort();

      if(wordLetters.length === selectedLetters.length){
        for(let i = 0; i < wordLetters.length; i++){
          if(!(wordLetters[i] === selectedLetters[i])){
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
        for(let i = 0; i < selectedStates.length; i++){
          let setSelectedState = selectedStates[i];
          let setFoundState = selectedFound[i];
          setSelectedState('no-selected');
          setFoundState('found');
        }
        resetSelections();
        foundWords++;
        setIsFound(true);
      }
      else{
        setWordFound('no-match');
        for(let i = 0; i < selectedStates.length; i++){
          let setSelectedState = selectedStates[i];
          setSelectedState('block-failed-match');
        }
      }
    }
  }

  const resetSelections = () => {
    itemSelected = false;
    firstClickedIndex = null;
    clickedIndexes = [];
    selectedLetters = [];
    selectedStates = [];
    selectedFound = [];
    direction = '';
  }

  const addLetters = (gameArray, letters) => {
    for(let i = 0; i < gameArray.length; i++){
      if(gameArray[i] === '0'){
        gameArray[i] = letters[Math.floor((Math.random() * letters.length))];
      }
    }
    return gameArray;
  }

  const size = rows * columns;

  let gameArray = createGameArray(words);

  gameArray = addLetters(gameArray, letters);

  let gameArrayChunks = chunkArray(gameArray, columns);

  const handleSelection = (propState, setPropState, index, letter, setNotFound) => {
    //If no item is selected yet the prop state is changed and the index is saved
    //If there's an item selected then a direction needs to be decided based on the next element the user selects
    if(!itemSelected){
      if(propState === "no-selected"){
        setPropState("selected");
        itemSelected = true;
        firstClickedIndex = index;
        clickedIndexes.push(index);
        selectedLetters.push(letter);
        selectedStates.push(setPropState);
        selectedFound.push(setNotFound);
      }
    }
    else{
      //If there's no set direction, then a direction gets set, and the index gets pushed or unshifted to the indexes array
      //depending in the decided direction
      if(direction === ''){
        if(firstClickedIndex - index === -1){
          direction = 'right';
          setPropState('selected');
          rowBreak = Math.trunc(index / columns);
          clickedIndexes.push(index);
          selectedLetters.push(letter);
          selectedStates.push(setPropState);
          selectedFound.push(setNotFound);
        }
        else if(firstClickedIndex - index === 1){
          direction = 'left';
          setPropState('selected');
          rowBreak = Math.trunc(index / columns);
          clickedIndexes.unshift(index);
          selectedLetters.unshift(letter);
          selectedStates.unshift(setPropState);
          selectedFound.unshift(setNotFound);
        }
        else if(firstClickedIndex - index === columns * -1){
          direction = 'down';
          setPropState('selected');
          clickedIndexes.push(index);
          selectedLetters.push(letter);
          selectedStates.push(setPropState);
          selectedFound.push(setNotFound);
        }
        else if(firstClickedIndex - index === columns){
          direction = 'up';
          setPropState('selected');
          clickedIndexes.unshift(index);
          selectedLetters.unshift(letter);
          selectedStates.unshift(setPropState);
          selectedFound.unshift(setNotFound);
        }
        else if(firstClickedIndex - index === (columns + 1) * -1){
          direction = 'down-right';
          setPropState('selected');
          clickedIndexes.push(index);
          selectedLetters.push(letter);
          selectedStates.push(setPropState);
          selectedFound.push(setNotFound);
        }
        else if(firstClickedIndex - index === columns + 1){
          direction = 'up-left';
          setPropState('selected');
          clickedIndexes.unshift(index);
          selectedLetters.unshift(letter);
          selectedStates.unshift(setPropState);
          selectedFound.unshift(setNotFound);
        }
        else if(firstClickedIndex - index === columns - 1){
          direction = 'up-right';
          setPropState('selected');
          clickedIndexes.unshift(index);
          selectedLetters.unshift(letter);
          selectedStates.unshift(setPropState);
          selectedFound.unshift(setNotFound);
        }
        else if(firstClickedIndex - index === (columns - 1) * -1){
          direction = 'down-left';
          setPropState('selected');
          clickedIndexes.push(index);
          selectedLetters.push(letter);
          selectedStates.push(setPropState);
          selectedFound.push(setNotFound);
        }
        else if(firstClickedIndex === index){
          setPropState('no-selected');
          clickedIndexes.pop();
          selectedLetters.pop();
          selectedStates.pop();
          selectedFound.pop();
          itemSelected = false;
        }
        else{
          for(let i = 1; i < (clickedIndexes.length - 1); i++){
            if(clickedIndexes[i] === index){
              let setState = selectedStates[i];
              setState('block-failed-match');
              return;
            }
          }
          setPropState('select-error');
        }
      }
      //If there's a decided direction then the indexes that can be selected are stored accordingly
      else if(direction === 'right' || direction === 'left'){
        if(clickedIndexes[clickedIndexes.length - 1] + 1 === index && rowBreak === Math.trunc(index / columns)){
          clickedIndexes.push(index);
          selectedLetters.push(letter);
          selectedStates.push(setPropState);
          selectedFound.push(setNotFound);
          setPropState('selected');
        }
        else if(clickedIndexes[0] - 1 === index && rowBreak === Math.trunc(index / columns)){
          clickedIndexes.unshift(index);
          selectedLetters.unshift(letter);
          selectedStates.unshift(setPropState);
          selectedFound.unshift(setNotFound);
          setPropState('selected');
        }
        else if(clickedIndexes[0] === index || clickedIndexes[clickedIndexes.length - 1] === index){
          deselectBlock(clickedIndexes, index, setPropState, selectedLetters, selectedStates, selectedFound);
        }
        else{
          for(let i = 1; i < (clickedIndexes.length - 1); i++){
            if(clickedIndexes[i] === index){
              let setState = selectedStates[i];
              setState('block-failed-match');
              return;
            }
          }
          setPropState('select-error');
        }
      }
      else if(direction === 'up' || direction === 'down'){
        if(clickedIndexes[clickedIndexes.length - 1] + columns === index){
          clickedIndexes.push(index);
          selectedLetters.push(letter);
          selectedStates.push(setPropState);
          selectedFound.push(setNotFound);
          setPropState('selected');
        }
        else if(clickedIndexes[0] - columns === index){
          clickedIndexes.unshift(index);
          selectedLetters.unshift(letter);
          selectedStates.unshift(setPropState);
          selectedFound.unshift(setNotFound);
          setPropState('selected');
        }
        else if(clickedIndexes[0] === index || clickedIndexes[clickedIndexes.length - 1] === index){
          deselectBlock(clickedIndexes, index, setPropState, selectedLetters, selectedStates, selectedFound);
        }
        else{
          for(let i = 1; i < (clickedIndexes.length - 1); i++){
            if(clickedIndexes[i] === index){
              let setState = selectedStates[i];
              setState('block-failed-match');
              return;
            }
          }
          setPropState('select-error');
        }
      }
      else if(direction === 'down-right' || direction === 'up-left'){
        if(clickedIndexes[clickedIndexes.length - 1] + (columns + 1) === index){
          clickedIndexes.push(index);
          selectedLetters.push(letter);
          selectedStates.push(setPropState);
          selectedFound.push(setNotFound);
          setPropState('selected');
        }
        else if(clickedIndexes[0] - (columns + 1) === index){
          clickedIndexes.unshift(index);
          selectedLetters.unshift(letter);
          selectedStates.unshift(setPropState);
          selectedFound.unshift(setNotFound);
          setPropState('selected');
        }
        else if(clickedIndexes[0] === index || clickedIndexes[clickedIndexes.length - 1] === index){
          deselectBlock(clickedIndexes, index, setPropState, selectedLetters, selectedStates, selectedFound);
        }
        else{
          for(let i = 1; i < (clickedIndexes.length - 1); i++){
            if(clickedIndexes[i] === index){
              let setState = selectedStates[i];
              setState('block-failed-match');
              return;
            }
          }
          setPropState('select-error');
        }
      }
      else if(direction === 'down-left' || direction === 'up-right'){
        if(clickedIndexes[clickedIndexes.length - 1] + (columns - 1) === index){
          clickedIndexes.push(index);
          selectedLetters.push(letter);
          selectedStates.push(setPropState);
          selectedFound.push(setNotFound);
          setPropState('selected');
        }
        else if(clickedIndexes[0] - (columns - 1) === index){
          clickedIndexes.unshift(index);
          selectedLetters.unshift(letter);
          selectedStates.unshift(setPropState);
          selectedFound.unshift(setNotFound);
          setPropState('selected');
        }
        else if(clickedIndexes[0] === index || clickedIndexes[clickedIndexes.length - 1] === index){
          deselectBlock(clickedIndexes, index, setPropState, selectedLetters, selectedStates, selectedFound);
        }
        else{
          for(let i = 1; i < (clickedIndexes.length - 1); i++){
            if(clickedIndexes[i] === index){
              let setState = selectedStates[i];
              setState('block-failed-match');
              return;
            }
          }
          setPropState('select-error');
        }
      }
      //If the array has 1 element after multiple deselections then direction is not decided
      if(clickedIndexes.length < 2){
        direction = '';
        firstClickedIndex = clickedIndexes[0];
      }

    }
  }

  return (
    <>
      <h2 className='wordsearch-theme' >{ theme }</h2>
      <div className="word-search-grid-container">
        {gameArrayChunks.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((letter, index) => (
              <WordSearchBlock 
              letter={letter}
              indexPos={rowIndex * gameArrayChunks[0].length + index}
              handleItemSelected={handleSelection}
              key={letter + index + Math.random()*100} />
            ))}
          </div>
        ))}
      </div>
      <div className='words-container'>
        <div className='words'>
          {words.map((word, index) => (
            <WordToSearch 
            word={word}
            handleFoundWord={handleFoundWord}
            key={word + index + Math.random()*100} />
          ))}
        </div>
      </div>
    </>
  );

}

export default WordSearchGrid