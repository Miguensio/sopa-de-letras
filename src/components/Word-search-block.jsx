import { useState, useEffect } from 'react';
import './word-search-block-styles.css';

const WordSearchBlock = ({ letter, indexPos, handleItemSelected }) => {

    const [isSelected, setIsSelected] = useState("no-selected");

    const handleClick = () => {
			handleItemSelected(isSelected, setIsSelected, indexPos, letter);
		}


        useEffect(() => {
            if (isSelected === 'select-error') {
              const timer = setTimeout(() => {
                setIsSelected('no-selected');
              }, 350);
          
              return () => clearTimeout(timer);
            }
          }, [isSelected, setIsSelected]);

          
    return (
        <div className={`block ${isSelected}`} onClick={() => handleClick()}>
            {letter}
        </div>
    );
}

export default WordSearchBlock;