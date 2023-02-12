import React, { useState } from 'react';
import './Dropdown.scss';
const Dropdown = (props) => {
    const [isOpened, setIsOpened] = useState(false);
    const handleClick = () => {
        setIsOpened(prevState => (!isOpened))
    }
    const handleItemClick = (value, name) => {
        props.handleItemClick(value, name)
        setIsOpened(prevState => (!isOpened))
    }
    return (
        <div className="admin__dropdown">
            {props.title && <span>{props.title}</span>}
            <input onClick={() => handleClick()} placeholder={props.placeholder !== undefined && props.placeholder} readOnly value={props.value && props.value} />
            {isOpened &&
                <div className="admin__dropdown-select">
                    {props.items && props.items.map((item, index) =>
                        <div onClick={() => handleItemClick(item, props.name)} className="admin__dropdown-select--item">
                            <span>{item}</span>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}
export default Dropdown
