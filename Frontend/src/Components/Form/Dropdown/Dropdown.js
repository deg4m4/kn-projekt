import React, { useState } from 'react';
import './Dropdown.scss';
const Dropdown = (props) => {

    const [isOpened, setIsOpened] = useState(false);
   const [inputValue,setInputValue] = useState("")
    const handleInputClick = () => {
        setIsOpened(prevState => !prevState)
    }
    const handleItemClick = (item)=>{
         setInputValue(item.name)
        props.handleInputs(item.name , props.name)
        setIsOpened(false)

    }

    return (
        <div className="dropdown">
            {/* Input */}
            <input id={props.id} value={inputValue} onClick={() => { handleInputClick() }} />
            {/*  Select Box */}
            {isOpened &&
                <div className="selectBox">
                    {/* Drop down Item */}
                    {props.elements &&
                        props.elements.map((item, index) => {
                            return <div key={index} onClick={()=>handleItemClick(item)} className="selectItem">
                                <span>{item.name}</span>                </div>

                        })
                    }
                </div>
            }

        </div>
    )
}

export default Dropdown
