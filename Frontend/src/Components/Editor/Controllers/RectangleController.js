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

const RectangleController = (props) => {



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
            case "strokeWidth":
                props.editImageElement("strokeWidth", parseInt(event.target.value))
                break;
            case "strokeColor":
                props.editImageElement("strokeColor", parseInt(event.target.value))
                break;
            case "bgScale":
                props.editImageElement("bgScale", parseFloat(event.target.value))
                break;
            case "bgRotation":
                    props.editImageElement("bgRotation", parseInt(event.target.value))
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
                <span>Shape Properties</span>
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
            <div className="editor__configRow">
                {/* Row icon */}
                <div className="editor__configRow-details">
                    <FlipToFrontSharpIcon className="editor__configRow-icon" />
                    <span>Background Offset</span>
                </div>
                {/* Row Controls */}
                <div className="editor__control">
                    <NumberPicker value={parseInt(props.elements[props.selectedElementArrayIndex].fillPatternOffsetX)} name="bgOffsetX" handleNumberInput={handleNumberInput} Text="x" />
                    <NumberPicker value={parseInt(props.elements[props.selectedElementArrayIndex].fillPatternOffsetY)} name="bgOffsetY" handleNumberInput={handleNumberInput} Text="y" />
                </div>
                {/*  */}
            </div>

            {/* Row */}
            <div className="editor__configRow">
                {/* Row icon */}
                <div className="editor__configRow-details">
                    <BorderStyleIcon className="editor__configRow-icon" />
                    <span>Radius</span>
                </div>
                {/* Row Controls */}
                <div className="editor__control">
                    <NumberPicker value={parseInt(props.elements[props.selectedElementArrayIndex].cornerRadius)} min={0} name="radius" handleNumberInput={handleNumberInput} Icon={<BorderStyleIcon className="numberIcon" />} />

                </div>
                {/*  */}
            </div>


            {/* Row */}
            <div className="editor__configRow">
                {/* Row icon */}
                <div className="editor__configRow-details">
                    <BorderStyleIcon className="editor__configRow-icon" />
                    <span>Background</span>
                </div>
                {/* Row Controls */}
                <div className="editor__control">
                    <ColorPicker name="fontColor" editImageElement={props.editImageElement} setselectedColor={props.setselectedColor} />
                </div>
                {/*  */}
            </div>

            {/* Row */}
            <div className="editor__configRow">
                {/* Row icon */}
                <div className="editor__configRow-details">
                    <BorderStyleIcon className="editor__configRow-icon" />
                    <span>Stroke width</span>
                </div>
                {/* Row Controls */}
                <div className="editor__control">
                    <NumberPicker value={parseInt(props.elements[props.selectedElementArrayIndex].strokeWidth)} name="strokeWidth" handleNumberInput={handleNumberInput} Icon={<BorderStyleIcon className="numberIcon" />} />
                    <ColorPicker name="strokeColor" editImageElement={props.editImageElement} setselectedColor={props.setselectedColor} />
                </div>
                {/*  */}
            </div>


            {/* Rotate */}
            <div className="editor__configRow">
                {/* Row icon */}
                <div className="editor__configRow-details">
                    <Rotate90DegreesCcwSharpIcon className="editor__configRow-icon" />
                    <span>Rotate</span>
                </div>
                {/* Row Controls */}
                <div className="editor__control">
                    <NumberPicker value={parseInt(props.elements[props.selectedElementArrayIndex].rotation)} name="rotate" handleNumberInput={handleNumberInput} Text="d" />
                </div>
                {/*  */}
            </div>
            {/* BgScale */}
            <div className="editor__configRow">
              
                <div className="editor__configRow-details">
                    <Rotate90DegreesCcwSharpIcon className="editor__configRow-icon" />
                    <span>Background scale</span>
                </div>
               
                <div className="editor__control">
                    <NumberPicker step="0.1" name="bgScale" handleNumberInput={handleNumberInput} />
                </div>
                {/*  */}
            </div>
                     {/* BgScale */}
                     <div className="editor__configRow">
              
              <div className="editor__configRow-details">
                  <Rotate90DegreesCcwSharpIcon className="editor__configRow-icon" />
                  <span>Background Rotation</span>
              </div>
             
              <div className="editor__control">
                  <NumberPicker value={parseInt(props.elements[props.selectedElementArrayIndex].fillPatternRotation)} step="1" name="bgRotation" handleNumberInput={handleNumberInput} />
              </div>
              {/*  */}
          </div>
        </React.Fragment>
    )
}

export default RectangleController
