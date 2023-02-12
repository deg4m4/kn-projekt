import React,{useState} from 'react'

import ImageController from './Controllers/ImageController';
import RectangleController from './Controllers/RectangleController';
import TextController from './Controllers/TextController';
import  RightArrow from '../../assets/images/right-arrow.png'
const ElementConfig = (props) => {



    return (
        <div className= {props.isMobileShowed == true ?  "editor__elementConfig editor__elementConfig-showed" : "editor__elementConfig"}  >
            {props.elements[props.selectedElementArrayIndex] == undefined  && <div className='editor__elementConfig-notSelected'>
                
                <h3>No element selected</h3>
                <p>Please select an element to be able to configure it.</p>
                <img  onClick={()=>props.handleMenuClick()} src={RightArrow} alt='back' />
                </div>}
            {  props.elements[props.selectedElementArrayIndex] !== undefined && props.elements[props.selectedElementArrayIndex].type == "image" &&
                <ImageController isMobileShowed={props.isMobileShowed} handleMenuClick={props.handleMenuClick} setIsDragging={props.setIsDragging} selectedElementArrayIndex={props.selectedElementArrayIndex} elements={props.elements} editImageElement={props.editImageElement} />}
            {  props.elements[props.selectedElementArrayIndex] !== undefined && props.elements[props.selectedElementArrayIndex].type == "rectangle" &&
                <RectangleController handleMenuClick={props.handleMenuClick}  setselectedColor={props.setselectedColor}  setIsDragging={props.setIsDragging} selectedElementArrayIndex={props.selectedElementArrayIndex} elements={props.elements} editImageElement={props.editImageElement} />}
                
            {  props.elements[props.selectedElementArrayIndex] !== undefined && props.elements[props.selectedElementArrayIndex].type == "path" &&
                <RectangleController handleMenuClick={props.handleMenuClick}  setselectedColor={props.setselectedColor}  setIsDragging={props.setIsDragging} selectedElementArrayIndex={props.selectedElementArrayIndex} elements={props.elements} editImageElement={props.editImageElement} />}

            { props.elements[props.selectedElementArrayIndex] !== undefined && props.elements[props.selectedElementArrayIndex].type == "text" &&
                <TextController handleMenuClick={props.handleMenuClick}  setselectedColor={props.setselectedColor} setIsDragging={props.setIsDragging} selectedElementArrayIndex={props.selectedElementArrayIndex} elements={props.elements} editImageElement={props.editImageElement} />
            }

        </div>
    )
}

export default ElementConfig
