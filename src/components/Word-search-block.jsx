import { useState, useEffect } from 'react';
import './word-search-block-styles.css';

const WordSearchBlock = ({ value, indexPos, handleItemSelected }) => {

    const [isSelected, setIsSelected] = useState("no-selected");

    const handleClick = () => {
			handleItemSelected(isSelected, setIsSelected, indexPos);
		}


        useEffect(() => {
            if (isSelected === 'select-error') {
              const timer = setTimeout(() => {
                setIsSelected('no-selected');
                console.log('timeout');
              }, 350);
          
              return () => clearTimeout(timer);
            }
          }, [isSelected, setIsSelected]);

          
    return (
        <div className={`block ${isSelected}`} onClick={() => handleClick()}>
            {value}
        </div>
    );
}

export default WordSearchBlock;