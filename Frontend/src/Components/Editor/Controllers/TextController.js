import React from 'react'
import FormatShapesIcon from '@material-ui/icons/FormatShapes';
import NumberPicker from '../Form/NumberPicker/NumberPicker';
import HeightIcon from '@material-ui/icons/Height';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import FlipToFrontSharpIcon  from '@material-ui/icons/FlipToFrontSharp';
import Rotate90DegreesCcwSharpIcon from '@material-ui/icons/Rotate90DegreesCcwSharp';
import FontDownloadOutlinedIcon from '@material-ui/icons/FontDownloadOutlined';
import Dropdown from '../../Editor/Form/Dropdown/Dropdown'
import {fonts} from '../Controllers/fonts'
import WebFont from 'webfontloader';
import Colorpicker from '../Form/Colorpicker/Colorpicker';
import InputController from '../Form/InputController/InputController';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import FormatSizeIcon from '@material-ui/icons/FormatSize';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Align from '../Form/Align/Align';
import RightArrow from '../../../assets/images/right-arrow.png'

const TextController = (props) => {
    
    const handleNumberInput= (name,event,fontName)=>{
        switch (name){
            case "font":
                    // Load font here
                    WebFont.load({
                        google: {
                          families: [fontName+":bold" , fontName+":medium",fontName+":regular",fontName+":thin" ]
                        }
                      });
                props.editImageElement("font",fontName)
                document.fonts.onloadingdone = function (fontFaceSetEvent) {
                     props.setIsDragging(true)
                     props.setIsDragging(false)

                 };
                  break;
                  case "fontsize":
                    props.editImageElement("fontsize",parseInt(event.target.value))
                    break;
                    case "fontWeight":
                        props.editImageElement("fontWeight",parseInt(event.target.value))
                        break;
                    case "text":
                        props.editImageElement("text",event.target.value)
                    break;
                    case "align":
                        props.editImageElement("align",event)
                    break;
             case "fontColor":
                props.editImageElement("fontColor",parseInt(event.target.value))
                
                break;
            case "posX":
                props.editImageElement("posX",parseInt(event.target.value))
                
                break;
                case "posY":
                    props.editImageElement("posY",parseInt(event.target.value))
                    
                    break;
                    case "rotate":
                        props.editImageElement("rotate",parseInt(event.target.value))
                        break;
                        case "width":
                            props.editImageElement("width",parseInt(event.target.value))
                            break;
                            case "height":
                                props.editImageElement("height",parseInt(event.target.value))
                                break;
             default:
                 break   
        }
    }


    return (
        <React.Fragment>
            
            <div className="editor__configHead">
                <span>Text Properties</span>
                <img onClick={()=>props.handleMenuClick()} src={RightArrow} />

            </div>


                 {/* Row */}
                 <div className="editor__configRow">
                {/* Row icon */}
                <div className="editor__configRow-details">
                    <ChatBubbleOutlineIcon className="editor__configRow-icon" />
                    <span>Text</span>
                </div>
                {/* Row Controls */}
                <div className="editor__control">
                    <InputController  handleNumberInput={handleNumberInput}   name="text" />
                </div>
                {/*  */}
            </div>

                        {/* Row */}
                        <div className="editor__configRow">
                {/* Row icon */}
                <div className="editor__configRow-details">
                    <ViewHeadlineIcon className="editor__configRow-icon" />
                    <span>Alignment</span>
                </div>
                {/* Row Controls */}
                <div className="editor__control">
                    <Align name="align" editImageElement={props.editImageElement} />
                </div>
                {/*  */}
            </div>

                 {/* Row */}
                 <div className="editor__configRow">
                {/* Row icon */}
                <div className="editor__configRow-details">
                    <FontDownloadOutlinedIcon className="editor__configRow-icon" />
                    <span>Font</span>
                </div>
                {/* Row Controls */}
                <div className="editor__control">
                    <Dropdown items={fonts} name="font" handleNumberInput={handleNumberInput} />
                </div>
                {/*  */}
            </div>

                 {/* Row */}
                 <div className="editor__configRow">
                {/* Row icon */}
                <div className="editor__configRow-details">
                    <FormatSizeIcon className="editor__configRow-icon" />
                    <span>Font Size</span>
                    
                </div>
                {/* Row Controls */}
                <div className="editor__control">
                    <NumberPicker name="fontsize" handleNumberInput={handleNumberInput} />
                    <Colorpicker   editImageElement={props.editImageElement} setselectedColor={props.setselectedColor} />
                </div>
                {/*  */}
            </div>

                             {/* Row */}
                             <div className="editor__configRow">
                {/* Row icon */}
                <div className="editor__configRow-details">
                    <FormatSizeIcon className="editor__configRow-icon" />
                    <span>Font Weight</span>
                    
                </div>
                {/* Row Controls */}
                <div className="editor__control">
                    <NumberPicker step={100} name="fontWeight" handleNumberInput={handleNumberInput} />
                </div>
                {/*  */}
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
                  <NumberPicker name="height"   handleNumberInput={handleNumberInput}   Icon ={<HeightIcon className="numberIcon" />}/> 
                  <NumberPicker name="width"   handleNumberInput={handleNumberInput} Icon ={<SyncAltIcon className="numberIcon" />}/> 
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
                  <NumberPicker   name="posX"  handleNumberInput={handleNumberInput} Text="x"/> 
                  <NumberPicker name="posY"   handleNumberInput={handleNumberInput} Text="y"/> 
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
                  <NumberPicker  name="rotate"   handleNumberInput={handleNumberInput}  Text="d"/> 
          
                </div>
                {/*  */}
            </div>
        </React.Fragment>
    )
}

export default TextController
