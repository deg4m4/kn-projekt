import React,{useState} from 'react'
import './Colorpicker.scss'
import { SketchPicker } from 'react-color';

const Colorpicker = (props) => {

    const [isPickerShowed, setisPickerShowed] = useState(false) 
    const [selectedColor, setselectedColor] = useState("black")
    const handleBtnClick = ()=>{
         setisPickerShowed(!isPickerShowed)   
    }
   const  handleChange =(color,event)=>{
    //    console.log("rgba("+color.rgb.r+","+color.rgb.g+","+color.rgb.b+","+color.rgb.a+")");
       setselectedColor("rgba("+color.rgb.r+","+color.rgb.g+","+color.rgb.b+","+color.rgb.a+")")
       props.setselectedColor("rgba("+color.rgb.r+","+color.rgb.g+","+color.rgb.b+","+color.rgb.a+")")
       props.name== "strokeColor" ? 
       props.editImageElement("strokeColor","rgba("+color.rgb.r+","+color.rgb.g+","+color.rgb.b+","+color.rgb.a+")")

       :
       props.editImageElement("fontColor","rgba("+color.rgb.r+","+color.rgb.g+","+color.rgb.b+","+color.rgb.a+")")
   }
    return (
        <div className="colorPicker">
            <div onClick={()=>handleBtnClick()}  style={{backgroundColor:selectedColor}} className="colorPicker__selected"> 

            </div>
            {isPickerShowed &&  <SketchPicker         color={ selectedColor } onChange={ handleChange }  onChangeComplete={ handleChange } className="pickerStyles" />}
            
        </div>
    )
}

export default Colorpicker
