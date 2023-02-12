import React, { useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { useState } from 'react';
import { ReactComponent as TextImage } from '../../assets/images/text.svg'
import { ReactComponent as ImagesImage } from '../../assets/images/image.svg'
import { ReactComponent as ObjectsImage } from '../../assets/images/object.svg'
import { ReactComponent as TemplatesImage } from '../../assets/images/layout.svg'
import { ReactComponent as InfoImage } from '../../assets/images/info.svg'
import { ReactComponent as LayersImage } from '../../assets/images/layers.svg'


import AddImage from '../../assets/images/add.png'
import RectangleImage from '../../assets/images/rounded-rectangle.png'
import CircleImage from '../../assets/images/circle-outline.png'
import BleachImage from '../../assets/images/bleach.png'
import StarImage from '../../assets/images/star.png'
import RightArrow from '../../assets/images/objects/right-arrow.svg'
import Blur from '../../assets/images/objects/blur.svg'
import Phone from '../../assets/images/objects/call.svg'
import Rhombus from '../../assets/images/objects/rhombus.svg'
import Polygon from '../../assets/images/objects/polygon.svg'
import Square from '../../assets/images/objects/square.svg'
import Splash from '../../assets/images/objects/splash.svg'

// default images
import Image1 from '../../assets/images/editor/image1.jpg'
import Image2 from '../../assets/images/editor/image2.jpg'

import ArrowRight from '../../assets/images/objects/dot-arrow.svg'
import PatternImage from '../../assets/images/objects/pattern.svg'
import Soundwaves from '../../assets/images/objects/sound-waves.svg'
import { conf } from '../../conf/conf';
import axios from 'axios';
import Templates from './SidebarComponents/Templates';

const Sidebar = (props) => {

    const [isOpened, setIsOpened] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const [selected, setSelected] = useState(null)
    const [imagesList, setImagesList] = useState([])

    const handleItemClick = (type) => {
        switch (type) {
            case "text":
                props.addElement({
                    type: "text",
                    x: 20,
                    x: 20,
                    width: 100,
                    height: 100,
                    text: Math.floor(Math.random() * 200000),
                    rotation: 0,
                    fontFamily: "Roboto",
                    align: "center",
                    text: "Sample Text",
                    fontStyle: 400,
                    fontSize: 40
                })
                setSelected("text")
                setIsOpened(false)


                break;
            case "image":
                setIsOpened(prevState => prevState && selected == "image" ? false : true)
                setSelected("image")
                break;
            case "shapes":
                setIsOpened(prevState => prevState && selected == "shapes" ? false : true)
                setSelected("shapes")
                break;
            case "templates":
                setIsOpened(prevState => prevState && selected == "templates" ? false : true)
                setSelected("templates")
                //  props.exportWork();
                break;
            case "Elements":
                setIsOpened(prevState => prevState && selected == "Elements" ? false : true)
                setSelected("Elements")
                //  props.exportWork();
                break;

            default:
                break;
        }
    }



    useEffect(() => {
        axios.post(conf.endPoint + "/api/images/get", { data: { page: currentPage, limit: 10 } }).then((resp) => {
            setImagesList(resp.data);


        })
    }, [])




    const handleImageClick = (src, width, height) => {
        // Here we check if a rectangle is selected then we  add the image to the rectangle 
        if (props.selectedId !== null && props.elements[props.selectedElementArrayIndex] !== undefined) {
            if (props.elements[props.selectedElementArrayIndex].type == "path" || props.elements[props.selectedElementArrayIndex].type == "rectangle") {
                props.editBackgroundOfRectangle(props.selectedElementArrayIndex, src)
            }
        }
        else {
            // if not we add an image to the stage
            props.addElement({
                type: "image",
                x: 20,
                x: 20,
                width: width,
                height: height,
                rotation: 0,
                src: src,
                text: Math.floor(Math.random() * 200000),
                isLocked: false
            })
        }
    }

    const handleRectangleClick = (width, height) => {
        props.addElement({
            type: "rectangle",
            x: 20,
            x: 20,
            width: width,
            height: height,
            rotation: 0,
            fill: "black",
            fillPatternImage: null,
            fillPatternOffsetX: null,
            fillPatternOffsetY: null,
            fillPatternRotation: null,
            isLocked: false,
            opacity: 1,
            fillPatternScaleY: 1,
            fillPatternScaleX: 1,
        })


    }

    const handleCircleClick = (width, height) => {
        props.addElement({
            type: "circle",
            x: 20,
            x: 20,
            width: width,
            height: height,
            rotation: 0,
            fill: "black",
            cornerRadius: 0,
            fillPatternImage: null,
            fillPatternOffsetX: null,
            fillPatternOffsetY: null,

            isLocked: false

        })
    }

    const handlePathClick = (src) => {
        props.addElement({
            type: "path",
            x: 20,
            x: 20,
            width: 50,
            height: 50,
            scaleX: 0.2,
            scaleY: 0.2,
            rotation: 0,
            fill: "black",
            cornerRadius: 0,
            fillPatternImage: null,
            data: src,
            fillPatternOffsetX: null,
            fillPatternOffsetY: null,
            fillPatternScaleY: 1,
            fillPatternScaleX: 1,
            fillPatternRotation: null,

            isLocked: false,
            opacity: 1


        })
    }
    return (
        <div className="sidebar__wrapper">

            <div className="editor__sidebar">
                <div onClick={() => handleItemClick("text")} className={selected == "text" ? "sidebar__item sidebar__item-active" : "sidebar__item"}>
                    <TextImage />
                    <div className="sidebar__item-name">Text</div>
                </div>

                <div onClick={() => handleItemClick("image")} className={selected == "image" ? "sidebar__item sidebar__item-active" : "sidebar__item"}>
                    <ImagesImage />
                    <div className="sidebar__item-name">Images</div>
                </div>

                <div onClick={() => handleItemClick("shapes")} className={selected == "shapes" ? "sidebar__item sidebar__item-active" : "sidebar__item"}>
                    <ObjectsImage />
                    <div className="sidebar__item-name">Objects</div>
                </div>

                <div onClick={() => handleItemClick("templates")} className={selected == "templates" ? "sidebar__item sidebar__item-active" : "sidebar__item"}>
                    <TemplatesImage />
                    <div className="sidebar__item-name">Templates</div>
                </div>

                <div onClick={() => handleItemClick("Elements")} className={selected == "Elements" ? "sidebar__item sidebar__item-active" : "sidebar__item"}>
                    <LayersImage />
                    <div className="sidebar__item-name">Elements</div>
                </div>

            </div>
            <div    className={ isOpened ? "editor__sidebarWindow editor__sidebarWindow-opened" : "editor__sidebarWindow"}   >

                {selected == "image" &&
                    <React.Fragment>

                        <div className="editor__window-title">
                            <span>Photos</span>
                            <img onClick={() => props.setisAddImageShowed(true)} src={AddImage} alt="add photo" />
                        </div>
                        <div className="window__images">

                            <div onClick={() => { handleImageClick(Image1, 200, 200) }} className="window__images-item">
                                <img src={Image1} alt="img" />
                            </div>
                            {imagesList.map((image, index) => (
                                <div key={index} onClick={() => { handleImageClick(conf.endPoint + "/api/images/max/" + image.name.replace(/\s+/g, ''), 200, 200) }} className="window__images-item">
                                    <img src={conf.endPoint + "/api/images/md/" + image.name.replace(/\s+/g, '')} alt="img" />
                                </div>
                            ))
                            }

                            
                        </div>
                    </React.Fragment>

                }

                {selected == "shapes" &&
                    <React.Fragment>

                        <div className="editor__window-title">
                            <span>Shapes</span>
                            <img src={AddImage} alt="add photo" />
                        </div>
                        <div className="window__images">


                            <div onClick={() => { handleRectangleClick(200, 200) }} className="window__images-item ">
                                <img className="shapeImage" src={Square} />
                                <span >Square</span>
                            </div>
                            <div onClick={() => { handlePathClick("M256,0C115.39,0,0,115.39,0,256s115.39,256,256,256s256-115.39,256-256S396.61,0,256,0z") }} className="window__images-item ">
                                <img className="shapeImage" src={CircleImage} />
                                <span >Circle</span>
                            </div>

                            <div onClick={() => { handlePathClick("M507.52,427.39,282.65,52.62a31.09,31.09,0,0,0-53.31,0L4.48,427.39C-7.95,448.11,7,474.47,31.13,474.47H480.87C505,474.47,520,448.11,507.52,427.39Z") }} className="window__images-item ">
                                <img className="shapeImage" src={BleachImage} />
                                <span >Trinagle</span>
                            </div>
                            <div onClick={() => { handlePathClick("M171.647,2.874L169.3,0L36.582,176.082l-1.414,1.861l142.007,168.378l0.664,0.792l132.685-178.324l1.423-1.853L171.647,2.874z") }} className="window__images-item ">
                                <img className="shapeImage" src={Rhombus} />
                                <span >Rhombus</span>
                            </div>
                            <div onClick={() => { handlePathClick("M59.662,26.042L30.701,0.458c-0.377-0.332-0.94-0.334-1.319-0.004L0.343,25.79c-0.306,0.267-0.42,0.692-0.289,1.076l11,32.249c0.138,0.405,0.519,0.677,0.946,0.677h35.954c0.427,0,0.806-0.271,0.945-0.674l11.046-32C60.077,26.735,59.966,26.311,59.662,26.042z") }} className="window__images-item ">
                                <img className="shapeImage" src={Polygon} />
                                <span >Polygon</span>
                            </div>

                            <div onClick={() => { handlePathClick("m422.609375 263.808594c18.015625.195312 37.238281-7.644532 50.121094-20.523438 28.671875-28.679687 28.625-75.390625-.113281-104.128906-25.753907-25.753906-64.007813-27.945312-97.449219-5.585938-7.542969 5.039063-16.351563 5.019532-21.425781-.050781-1.574219-1.574219-6.359376-6.359375-2.832032-21.175781 3.621094-15.183594 1.425782-31.933594-6.347656-48.449219-6.984375-14.847656-16.796875-26.304687-23.792969-33.304687-19.6875-19.683594-45.878906-30.5507815-73.75-30.589844-.054687 0-.101562 0-.15625 0-27.828125 0-53.949219 10.796875-73.5625 30.410156-24.523437 24.523438-35.457031 57.832032-29.25 89.089844.871094 4.402344-.496093 9.175781-3.484375 12.164062-4.59375 4.589844-12.425781 4.996094-22.652344 1.171876-8.46875-3.167969-34.242187-12.804688-52.828124 5.785156-9 9-13.746094 22.164062-12.691407 35.21875.859375 10.59375 6.273438 20.804687 14.488281 27.316406 6.566407 5.210938 12.414063 7.992188 17.113282 10.222656.703125.335938 1.394531.667969 2.085937 1 5.554688 2.707032 9.570313 4.660156 14.203125 9.003906 8.148438 7.636719 12.734375 17.953126 12.910156 29.054688.171876 10.464844-3.808593 20.546875-10.921874 27.660156-6.308594 6.308594-13.582032 9.9375-23.585938 11.777344-2.058594.378906-4.140625.742188-6.242188 1.101562-16.707031 2.878907-35.648437 6.140626-50.457031 20.953126-13.890625 13.890624-21.523437 32.390624-21.488281 52.09375.035156 19.660156 7.707031 38.136718 21.601562 52.03125 13.839844 13.835937 32.125 21.632812 51.492188 21.941406 19.550781.304687 37.816406-7.011719 51.433594-20.628906l.816406-.832032c3.257812-3.375 8.6875-9.261718 11.273438-12.320312 1.382812-1.636719 2.855468-3.238282 4.371093-4.753906 14.597657-14.597657 33.015625-21.261719 49.265625-17.832032 10.082032 2.128906 23.871094 9.257813 32.355469 31.199219l.339844.859375c8.125 21.039062 19.253906 49.847656 37.121093 67.714844 19.683594 19.683594 45.863282 30.550781 73.722657 30.597656h.179687c27.828125 0 53.953125-10.804688 73.570313-30.421875 19.804687-19.804687 30.921875-45.410156 31.304687-72.097656.390625-26.988281-10.191406-52.691407-29.792968-72.371094l-.582032-.570313c-8.078125-7.804687-14.039062-13.648437-15.964844-15.664062-11.6875-12.160156-10.371093-32.875 2.933594-46.179688 7.523438-7.519531 15.980469-11.003906 26.667969-10.886718zm0 0") }} className="window__images-item ">
                                <img className="shapeImage" src={Splash} />
                                <span >Splash</span>
                            </div>
                            <div onClick={() => { handlePathClick("M922.38,403.83a10.68,10.68,0,0,0-9.93-7.37l-137.29-2.79L730.07,264.35a10.67,10.67,0,0,0-20.14,0L664.84,393.67l-137.29,2.79a10.67,10.67,0,0,0-6.21,19.18l109.41,82.69L591,629.35a10.67,10.67,0,0,0,16.29,11.86L720,563l112.72,78.21A10.67,10.67,0,0,0,849,629.35l-39.76-131,109.41-82.69A10.69,10.69,0,0,0,922.38,403.83Z ") }} className="window__images-item ">
                                <img className="shapeImage" src={StarImage} />
                                <span >Star</span>
                            </div>

                            <div onClick={() => { handlePathClick("M484.14,226.886L306.46,49.202c-5.072-5.072-11.832-7.856-19.04-7.856c-7.216,0-13.972,2.788-19.044,7.856l-16.132,16.136c-5.068,5.064-7.86,11.828-7.86,19.04c0,7.208,2.792,14.2,7.86,19.264L355.9,207.526H26.58C11.732,207.526,0,219.15,0,234.002v22.812c0,14.852,11.732,27.648,26.58,27.648h330.496L252.248,388.926c-5.068,5.072-7.86,11.652-7.86,18.864c0,7.204,2.792,13.88,7.86,18.948l16.132,16.084c5.072,5.072,11.828,7.836,19.044,7.836c7.208,0,13.968-2.8,19.04-7.872l177.68-177.68c5.084-5.088,7.88-11.88,7.86-19.1C492.02,238.762,489.228,231.966,484.14,226.886z") }} className="window__images-item ">
                                <img className="shapeImage" src={RightArrow} />
                                <span >Star</span>
                            </div>

                            <div onClick={() => { handlePathClick("M353.188,252.052c-23.51,0-46.594-3.677-68.469-10.906c-10.719-3.656-23.896-0.302-30.438,6.417l-43.177,32.594c-50.073-26.729-80.917-57.563-107.281-107.26l31.635-42.052c8.219-8.208,11.167-20.198,7.635-31.448c-7.26-21.99-10.948-45.063-10.948-68.583C132.146,13.823,118.323,0,101.333,0H30.813C13.823,0,0,13.823,0,30.813C0,225.563,158.438,384,353.188,384c16.99,0,30.813-13.823,30.813-30.813v-70.323C384,265.875,370.177,252.052,353.188,252.052z") }} className="window__images-item ">
                                <img className="shapeImage" src={Phone} />
                                <span >Phone</span>
                            </div>

                            <div onClick={() => { handleImageClick(ArrowRight, 200, 200) }} className="window__images-item ">
                                <img className="shapeImage" src={ArrowRight} />
                                <span >Star</span>
                            </div>

                            <div onClick={() => { handleImageClick(PatternImage, 200, 200) }} className="window__images-item ">
                                <img className="shapeImage" src={PatternImage} />
                                <span >Star</span>
                            </div>

                            <div onClick={() => { handleImageClick(Soundwaves, 200, 200) }} className="window__images-item ">
                                <img className="shapeImage" src={Soundwaves} />
                                <span >Star</span>
                            </div>

                            <div onClick={() => { handleImageClick(Blur, 200, 200) }} className="window__images-item ">
                                <img className="shapeImage" src={Blur} />
                                <span >Star</span>
                            </div>






                        </div>
                    </React.Fragment>

                }

                {selected == "templates" &&
                    <React.Fragment>
                        {/* <div className="editor__window-title">
                            <span>Templates</span>
                            <img src={AddImage} alt="add photo" />
                        </div>
                        <div className="window__images">
                            {Images.map((image, index) => (
                                <div key={index} onClick={() => { handleImageClick(image.src, 200, 200) }} className="window__images-item">
                                </div>
                            ))
                            }
                        </div> */}
                        <Templates setisModalShowed={props.setisModalShowed} handleTemplateClickEditor={props.handleTemplateClickEditor} />
                    </React.Fragment>

                }

                {selected == "Elements" &&
                    <React.Fragment>
                        <div className="editor__window-title-elements">
                            <span>Elements</span>
                            <p>In here you can change the order of each element.</p>
                        </div>

                        <div className='editor__window-layers'>


                            {props.elements.map((value, index) => {
                                return <div className={props.selectedId == value.id ? 'editor__window-layer editor__window-layer-active':'editor__window-layer'} >
                                   Element {value.id} 
                                   <div className='editor__window-layer--controls'>
                                       <button className='editor__window-layer--controls-btnUp' onClick={()=>{props.MoveUp(props.selectedId)}}>Move up</button>
                                       <button className='editor__window-layer--controls-btnDown' onClick={()=>{props.MoveDown(props.selectedId)}}>Move down</button>

                                   </div>
                                </div>
                            })}
                        </div>

                    </React.Fragment>

                }


            </div>
        </div>

    )
}

export default Sidebar
