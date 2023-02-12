import React, { useEffect, useState, useRef } from 'react'
import './Modal.scss';
import Input from '../../Admin/Form/Input/Input';
import Button from '../../Admin/Form/Button/Button'
import CloseImage from '../../../assets/images/closeGrey.png'
import { Link } from 'react-router-dom';
const Modal = (props) => {
    const Modal = useRef();
    const SizeModal = useRef();
    const json__textarea = useRef();
    const importTextRef = useRef();

    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [image, setImage] = useState("")
    const [isJsonShowed, setisJsonShowed] = useState(false)


    const handleInputs = (name, event) => {
        switch (name) {
            case "Width":
                setWidth(parseInt(event.target.value))
                break;
            case "Height":
                setHeight(parseInt(event.target.value))
                break;
            case "Image":
                setImage(event.target.value)
                break;

            default:
                break;
        }
    }
    useEffect(() => {
        // console.log(props.selectedTemplatePlan);
        Modal.current.classList.add("editor__modal-showed")
        SizeModal.current.classList.add("editor__modal-body-size-showed")
    }, [props.selectedTemplatePlan])




    return (

        props.type== 'import' ? 
        <div id="editorModal" className="editor__modal" ref={Modal}>
        <div className="editor__modal-body-size" ref={SizeModal}>
            <div className='editor__modal-body-head'>
                <h3>Import</h3>
                <img  onClick={() => { props.setisImportShowed(false) }}  src={CloseImage} />
            </div>
            <p>Enter your design json here </p>
            <textarea ref={importTextRef} style={{width:'100%',height:'100px'}}></textarea>

            <div className="editor__modal-body-size--inputWrapper">
                <a className='btn-primaryModal' onClick={() => { props.loadFromJson(JSON.parse(importTextRef.current.value) )}}  > Submit </a>
                <a className='btn-primaryOutlined' onClick={() => { props.setisImportShowed(false) }}  >Back </a>

            </div>
        </div>
    </div>
        :
        
        props.type == "Size" ?
            <div id="editorModal" className="editor__modal" ref={Modal}>
                <div className="editor__modal-body-size" ref={SizeModal}>
                    <div className='editor__modal-body-head'>
                        <h3>Add size</h3>
                        <img  onClick={() => { props.setisModalShowed(false) }}  src={CloseImage} />
                    </div>
                    <div className="editor__modal-body-size--inputWrapper">
                        <Input handleInputs={handleInputs} name="Height" title="Width" />
                        <Input handleInputs={handleInputs} name="Width" title="Height" />
                        <a className='btn-primaryModal' onClick={() => { props.setCustomDimentions(width, height) }}  > Submit </a>
                        <a className='btn-primaryOutlined' onClick={() => { props.setisModalShowed(false) }}  >Back </a>

                    </div>
                </div>
            </div> : props.type == "Image" ?
                <div id="editorModal" className="editor__modal" ref={Modal}>
                    <div className="editor__modal-body-size" ref={SizeModal}>
                        <h3>Add Image</h3>
                        <div className="">
                            <Input handleInputs={handleInputs} name="Image" title="Image Url (https):" />
                            <div className="editor__modal-body-size--inputWrapper">
                                <a className='btn-primaryModal' onClick={() => {
                                    // Here we check if a rectangle is selected then we  add the image to the rectangle 
                                    if (props.selectedId !== null && props.elements[props.selectedElementArrayIndex] !== undefined) {
                                        if (props.elements[props.selectedElementArrayIndex].type == "path" || props.elements[props.selectedElementArrayIndex].type == "rectangle") {
                                            props.editBackgroundOfRectangle(props.selectedElementArrayIndex, image)
                                        }
                                    } else {
                                        props.addElement({
                                            type: "image",
                                            x: 20,
                                            x: 20,
                                            width: 300,
                                            height: 300,
                                            rotation: 0,
                                            src: image,
                                            text: Math.floor(Math.random() * 200000),
                                            isLocked: false
                                        })
                                    }

                                }} >  Submit </a>
                                <a className='btn-primaryOutlined' onClick={() => { props.setisAddImageShowed(false) }} >Back </a>
                            </div>
                        </div>
                    </div>

                </div> : <div id="editorModal" className="editor__modal" ref={Modal}>
                    
                    {/* Check if user is Premium or free */}
                    { props.selectedTemplatePlan == 'Premium' && props.plan == 'Free' ?
                        <div className="editor__modal-body-size" ref={SizeModal}>
                            <div className='editor__modal-body-head'>
                                <h3>Become a pro</h3>
                                <img src={CloseImage} onClick={()=>props.setIsExportShowed(false)} />
                            </div>
                            <div className="editor__modal-body">
                                <p>To export this design you need a pro account. become a pro member to unlock all features. </p>
                            </div>
                            <div className="editor__modal-pro">
                                <span  className='editor__modal-pro-name'>Pro Plan</span>
                                <span  className='editor__modal-pro-price'> <span>${props.monthly}</span>/mo</span>
                                <Link to='/upgrade'><span  className='editor__modal-pro-link'>See all features</span></Link>

                            </div>
                            
                            <div className="editor__modal-body-size--inputWrapper">
                            </div>
                        </div>

                        :
                        <div className="editor__modal-body-size" ref={SizeModal}>
                            <div className='editor__modal-body-head'>
                                <h3>Export</h3>
                                <img src={CloseImage} onClick={()=>props.setIsExportShowed(false)} />
                            </div>
                            <div className="editor__modal-body">
                                <p>Select which format you want to export. JSON for reusing/sharing your design. or PNG image for production. </p>
                            </div>
                            {isJsonShowed === true &&      <div className='editor__modal__json'>
                                <textarea ref={json__textarea}  />
                            </div>
}
                        
                            <div className="editor__modal-body-size--inputWrapper">
                                <a className='btn-primaryModal' onClick={() => { setisJsonShowed(true); setTimeout(() => {
                                    json__textarea.current.value = props.exportWork() ; 
                                }, 500);}} > JSON </a>
                                <a className='btn-primaryOutlined' onClick={() => { props.exportStage() }}  >Image </a>
                            </div>
                        </div>

                    }

{ props.selectedTemplatePlan == 'Free' &&  
                        <div className="editor__modal-body-size" ref={SizeModal}>
                            <div className='editor__modal-body-head'>
                                <h3>Export</h3>
                                <img src={CloseImage} onClick={()=>props.setIsExportShowed(false)} />
                            </div>
                            <div className="editor__modal-body">
                                <p>Select which format you want to export. JSON for reusing/sharing your design. or PNG image for production. </p>
                            </div>
                            {isJsonShowed === true &&      <div className='editor__modal__json'>
                                <textarea ref={json__textarea}  />
                            </div>
}
                        
                            <div className="editor__modal-body-size--inputWrapper">
                                <a className='btn-primaryModal' onClick={() => { setisJsonShowed(true); setTimeout(() => {
                                    json__textarea.current.value = props.exportWork() ; 
                                }, 500);}} > JSON </a>
                                <a className='btn-primaryOutlined' onClick={() => { props.exportStage() }}  >Image </a>
                            </div>
                        </div>

                    }

                </div>
    )
}

export default Modal
