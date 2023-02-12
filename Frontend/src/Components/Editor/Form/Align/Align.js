import React,{useState} from 'react';
import './Align.scss';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
const Align = (props) => {

    const [selected, setselected] = useState("left")

    const handleItemClick=(align)=>{
            setselected(align)
            props.editImageElement(props.name,align)
    }

    return (
        <div className="align">
            <div onClick={()=>{handleItemClick("left")}} className={selected == "left" ? "align__item-active" : "align__item"}>
                <FormatAlignLeftIcon  className="align__item-icon" />
            </div>
            <div onClick={()=>{handleItemClick("center")}} className={selected == "center" ? "align__item-active" : "align__item"}>
                <FormatAlignCenterIcon   className="align__item-icon" />
            </div>
            <div onClick={()=>{handleItemClick("right")}} className={selected == "right" ? "align__item-active" : "align__item"}>
                <FormatAlignRightIcon  className="align__item-icon" />
            </div>
        </div>
    )
}

export default Align
