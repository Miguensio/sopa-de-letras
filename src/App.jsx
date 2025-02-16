import './App.css'
import WordSearchBlock from './components/word-search-block';

function App() {

  const words = ["hola","polola","probando","tal"];
  const [rows, columns] = [10, 10];
  const size = rows * columns;

  console.log(size);

  function checkUp(position, rows, wordLength){
    let wordLimit = wordLength * rows;
    let availableSpace = position - wordLimit;

    if(availableSpace > 0){
      return true;
    }
    else{
      return false;
    }
  }

  const createGameArray = (words) => {
    const gameArray = new Array(size);

    for(let i = 0; i < words.length; i++){
      let string = words[i];
      let wordSize = string.length;

      let randomPosition = Math.floor(Math.random() * size);

      console.log("random position: ", randomPosition);

      let positionUp = checkUp(randomPosition, rows, wordSize);

      console.log("Se puede hacia arriba con la palabra ",string, ": " ,positionUp);

      if(positionUp){
        let controlPosition = 0;
        for(let j = 0; j < wordSize; j++){
          let startingPosition = randomPosition - controlPosition;
          gameArray[startingPosition] = string[j];
          controlPosition = controlPosition + rows;
          console.log(startingPosition);
        }
        return console.log(gameArray);
      }

    }
  }

  createGameArray(words);

  return (
    <div className='container'>
      
    </div>
  )
}

export default App
