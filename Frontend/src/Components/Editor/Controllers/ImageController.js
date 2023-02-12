import React from 'react'
import FormatShapesIcon from '@material-ui/icons/FormatShapes';
import NumberPicker from '../Form/NumberPicker/NumberPicker';
import HeightIcon from '@material-ui/icons/Height';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import FlipToFrontSharpIcon from '@material-ui/icons/FlipToFrontSharp';
import Rotate90DegreesCcwSharpIcon from '@material-ui/icons/Rotate90DegreesCcwSharp';
import BorderStyleIcon from '@material-ui/icons/BorderStyle';
import ColorPicker from '../Form/Colorpicker/Colorpicker'

import RightArrow from '../../../assets/images/right-arrow.png'
const ImageController = (props) => {



    const handleNumberInput = (name, event) => {

        switch (name) {
            case "posX":
                props.editImageElement("posX", parseInt(event.target.value))

                break;
            case "posY":
                props.editImageElement("posY", parseInt(event.target.value))

                break;
            case "radius":
                props.editImageElement("radius", parseInt(event.target.value))

                break;
            case "opacity":
                props.editImageElement("opacity", parseFloat(event.target.value))
                break;
            case "bgOffsetX":
                props.editImageElement("bgOffsetX", parseInt(event.target.value))

                break;
            case "bgOffsetY":
                props.editImageElement("bgOffsetY", parseInt(event.target.value))
                break;
            case "rotate":
                props.editImageElement("rotate", parseInt(event.target.value))
                break;
            case "width":
                props.editImageElement("width", parseInt(event.target.value))
                break;
            case "height":
                props.editImageElement("height", parseInt(event.target.value))
                break;
            default:
                break
        }
    }

    return (
        <React.Fragment>

            <div className="editor__configHead">
                <span>Image Properties</span>
                <img onClick={()=>props.handleMenuClick()} src={RightArrow} />
            </div>
            {/* Row */}
            <div className="editor__configRow">
                {/* Row icon */}
                <div className="editor__configRow-details">
                    <FormatShapesIcon className="editor__configRow-icon" />
                    <span>Dimensions</span>
                </div>
                {/* Row Controls */}
                <div className="editor__control">
                    <NumberPicker name="height" value={parseInt(props.elements[props.selectedElementArrayIndex].height)} handleNumberInput={handleNumberInput} Icon={<HeightIcon className="numberIcon" />} />
                    <NumberPicker name="width" value={parseInt(props.elements[props.selectedElementArrayIndex].width)} handleNumberInput={handleNumberInput} Icon={<SyncAltIcon className="numberIcon" />} />
                </div>
                {/*  */}
            </div>

            {/* Row */}
            <div className="editor__configRow">
                {/* Row icon */}
                <div className="editor__configRow-details">
                    <FlipToFrontSharpIcon className="editor__configRow-icon" />
                    <span>Move</span>
                </div>
                {/* Row Controls */}
                <div className="editor__control">
                    <NumberPicker name="posX" value={parseInt(props.elements[props.selectedElementArrayIndex].x)} handleNumberInput={handleNumberInput} Text="x" />
                    <NumberPicker name="posY" value={parseInt(props.elements[props.selectedElementArrayIndex].y)} handleNumberInput={handleNumberInput} Text="y" />
                </div>
                {/*  */}
            </div>


            {/* Row */}
            <div className="editor__configRow">
                {/* Row icon */}
                <div className="editor__configRow-details">
                    <FlipToFrontSharpIcon className="editor__configRow-icon" />
                    <span>Opacity</span>
                </div>
                {/* Row Controls */}
                <div className="editor__control">
                    <NumberPicker value={parseFloat(props.elements[props.selectedElementArrayIndex].opacity)} min={0} step={"0.1"} name="opacity" handleNumberInput={handleNumberInput} />
                </div>
                {/*  */}
            </div>


            {/* Row */}
            {/* <div className="editor__configRow">
                <div className="editor__configRow-details">
                    <FlipToFrontSharpIcon className="editor__configRow-icon" />
                    <span>Background Offset</span>
                </div>
                <div className="editor__control">
                  <NumberPicker    name="bgOffsetX"  handleNumberInput={handleNumberInput} Text="x"/> 
                  <NumberPicker name="bgOffsetY"   handleNumberInput={handleNumberInput} Text="y"/> 
                </div>
            </div> */}

            {/* Row */}
            {/* <div className="editor__configRow">
                <div className="editor__configRow-details">
                    <BorderStyleIcon className="editor__configRow-icon" />
                    <span>Radius</span>
                </div>
                <div className="editor__control">
                  <NumberPicker   name="radius"  handleNumberInput={handleNumberInput} Icon={<BorderStyleIcon className="numberIcon" />}/> 
                  <ColorPicker name="fontColor"   editImageElement={props.editImageElement} setselectedColor={props.setselectedColor} />

                </div>
            </div> */}

            {/* Rotate */}
            <div className="editor__configRow">
                {/* Row icon */}
                <div className="editor__configRow-details">
                    <Rotate90DegreesCcwSharpIcon className="editor__configRow-icon" />
                    <span>Rotate</span>
                </div>
                {/* Row Controls */}
                <div className="editor__control">
                    <NumberPicker name="rotate" value={parseInt(props.elements[props.selectedElementArrayIndex].rotation)} handleNumberInput={handleNumberInput} Text="d" />

                </div>
                {/*  */}
            </div>
        </React.Fragment>
    )
}

export default ImageController
