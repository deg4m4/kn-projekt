import React from 'react'
import './NumberPicker.scss';
const NumberPicker = (props) => {
  

    const handleInputs =(event)=>{
    //    console.log("input change");
        props.handleNumberInput(props.name,event)
    }

    

    return (
        <div className="number__wrapper">
            { props.Icon && props.Icon}
            { props.Text && <div className="iconText"> {props.Text} </div>}

            <input min={props.min && props.min }  step={props.step ? props.step: 1} value={props.value}  onChange={(event)=>handleInputs(event)} type={props.type == "noStep" ? "text" : "number"} />
        </div>
    )
}

export default NumberPicker
