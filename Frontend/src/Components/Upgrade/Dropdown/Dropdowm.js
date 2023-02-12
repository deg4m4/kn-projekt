import React,{useState} from 'react'
import './Dropdown.scss'
const Dropdowm = (props) => {
    const [isOpened, setisOpened] = useState(false)

    const handleInputClick = (country) =>{
        setisOpened((prevState)=>!prevState)
        props.handleDropdown(props.name,country)
    }
   
    return (
        <div className="upgrade__dropdown">
            <input value={props.value} onClick={()=>handleInputClick()} />
            {isOpened && 
            <div className="upgrade__dropdown-select">
                {props.items && props.items.map((item,index)=>{
                    return <div onClick={()=>handleInputClick(item)} className="upgrade__dropdown-item">
                            {item}
                         </div>
                })}
            </div>  }
        </div>
    )
}

export default Dropdowm
