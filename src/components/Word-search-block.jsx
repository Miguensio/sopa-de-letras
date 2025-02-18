import { useState } from 'react';
import './word-search-block-styles.css';

const WordSearchBlock = ({ value }) => {

    const [isSelected, setIsSelected] = useState("no-selected");

    const handleClick = () => {
        if(isSelected === "no-selected"){
            setIsSelected("selected");
        }
        else{
            setIsSelected("no-selected");
        }
    }

    return (
        <div className={`block ${isSelected}`} onClick={handleClick}>
            {value}
        </div>
    );
}

export default WordSearchBlock;