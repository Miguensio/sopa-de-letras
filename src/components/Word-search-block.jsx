import { useState, useEffect } from 'react';
import './word-search-block-styles.css';

const WordSearchBlock = ({ letter, indexPos, handleItemSelected }) => {

    const [isSelected, setIsSelected] = useState("no-selected");
    const [notFound, setNotFound] = useState('');

    const handleClick = () => {
			handleItemSelected(isSelected, setIsSelected, indexPos, letter, setNotFound);
		}

    useEffect(() => {
      setIsSelected('no-selected')
    }, [])

    useEffect(() => {
      if(isSelected === 'select-error'){
        const timer = setTimeout(() => {
          setIsSelected('no-selected');
        }, 350);
    
        return () => clearTimeout(timer);
      }
      else if(isSelected === 'block-failed-match'){
        const timer = setTimeout(() => {
          setIsSelected('selected');
        }, 450);
    
        return () => clearTimeout(timer);
      }
    }, [isSelected]);

    return (
      <div className={`block ${isSelected} ${notFound}`} onClick={() => handleClick()}>
        {letter}
      </div>
    );
}

export default WordSearchBlock;