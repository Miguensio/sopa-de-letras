import { useState } from 'react';
import './word-search-block-styles.css';

const WordSearchBlock = ({ value, indexPos, handleItemSelected }) => {

    const [isSelected, setIsSelected] = useState("no-selected");

    const handleClick = () => {
			handleItemSelected(isSelected, setIsSelected, indexPos);
		}

    return (
        <div className={`block ${isSelected}`} onClick={() => handleClick()}>
            {value}
        </div>
    );
}

export default WordSearchBlock;