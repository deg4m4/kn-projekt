import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Editor.scss'
import Sidebar from './Sidebar';
// Konva
import { Stage, Layer, Text, Line } from 'react-konva';
import { returnElements } from './utils';
import WebFont from 'webfontloader';
// Lottie
import Modal from "./Modal/Modal"
// Handling key press 
import useKeypress from 'react-use-keypress';
import ElementConfig from './ElementConfig';
import ZoomController from './ZoomController/ZoomController';
import downloadjs from 'downloadjs'
import { useParams } from 'react-router';
import { conf } from '../../conf/conf';


const Editor = (props) => {
  // Editor initalisation 
  let { id } = useParams();
  ////// Refs 
  const stageRef = React.useRef();
  const layerRef = React.useRef();
  const LoadingRef = React.useRef();
  ////// States
  const [isDragging, setIsDragging] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [selectedColor, setselectedColor] = useState("black")
  const [selectedLockedStatus, setselectedLockedStatus] = useState(false)
  const [zoom, setzoom] = useState(60)
  const [selectedElementArrayIndex, setSelectedElementArrayIndex] = useState(null)
  const [stageDimensions, setStageDimensions] = useState({ width: 0, height: 0 })
  const [XGuideLines, setXguideLines] = useState([]);
  const [xSnapPoints, setxSnapPoints] = useState([]);
  const [elements, setElements] = useState([]);
  const [isMobileShowed, setisMobileShowed] = useState(false)
  const [isImportShowed, setisImportShowed] = useState(false)
  const [selectedTemplatePlan, setselectedTemplatePlan] = useState()
  // Modals
  const [isModalShowed, setisModalShowed] = useState(false);
  const [isAddImageShowed, setisAddImageShowed] = useState(false);
  const [isExportShowed, setIsExportShowed] = useState(false);
  const sizes = {
    fbPost: { width: 1200, height: 630 },
    twPost: { width: 1200, height: 675 },
    inPost: { width: 1080, height: 1080 },
    youtubeThumbnail: { width: 1280, height: 720 },
  }
  useEffect(
    () => {
      // console.log('aralna l user');
      // console.log(props.user);
      axios.post(conf.endPoint + "/api/templates/return/editor", { data: { name: id.replace("_", ' ') } }, { withCredentials: true }).then((resp) => {
        if (resp.data) {
          if (resp.data.status == false) {
            setIsExportShowed(true)
            setselectedTemplatePlan('Premium')
          } else {
            setselectedTemplatePlan(resp.data.plan)
          }
          loadFromJson(JSON.parse(resp.data.json))
          switch (resp.data.platform) {
            case "Facebook Post":
              setStageDimensions({ width: sizes.fbPost.width, height: sizes.fbPost.height })
              setxSnapPoints([...[0, sizes.fbPost.width / 2, sizes.fbPost.width]])
              break;
            case "Instagram Post":
              setStageDimensions({ width: sizes.inPost.width, height: sizes.inPost.height })
              setxSnapPoints([...[0, sizes.inPost.width / 2, sizes.inPost.width]])
              break;
            case "Twitter Post":
              setStageDimensions({ width: sizes.twPost.width, height: sizes.twPost.height })
              setxSnapPoints([...[0, sizes.twPost.width / 2, sizes.twPost.width]])
              break;
            case "Youtube Thumbnail":
              setStageDimensions({ width: sizes.youtubeThumbnail.width, height: sizes.youtubeThumbnail.height })
              setxSnapPoints([...[0, sizes.youtubeThumbnail.width / 2, sizes.youtubeThumbnail.width]])
              break;
            case "Custom":
              var dim = resp.data.size.split('x')
              setStageDimensions({ width: dim[0], height: dim[1] })
              setxSnapPoints([...[0, dim[0] / 2, dim[0]]])
              break;
            default:
              break;
          }
        }
      })
      //  loadFromJson([{"id":7513,"type":"path","x":576.65959092502,"y":139.7537890521899,"width":50,"height":50,"scaleX":1.5313825642263001,"scaleY":1.5313825642262986,"fill":"rgba(255,207,67,1)","data":"M171.647,2.874L169.3,0L36.582,176.082l-1.414,1.861l142.007,168.378l0.664,0.792l132.685-178.324l1.423-1.853L171.647,2.874z","fillPatternImage":null,"fillPatternOffsetX":null,"fillPatternOffsetY":null,"isLocked":false,"rotation":-6.103054675504172},{"id":243,"type":"path","x":1406.9999394376464,"y":-604.910131004434,"width":50,"height":50,"scaleX":2.3857610598660886,"scaleY":2.3857610598660837,"fill":"rgba(255,207,69,1)","data":"M171.647,2.874L169.3,0L36.582,176.082l-1.414,1.861l142.007,168.378l0.664,0.792l132.685-178.324l1.423-1.853L171.647,2.874z","fillPatternImage":null,"fillPatternOffsetX":null,"fillPatternOffsetY":null,"isLocked":false,"rotation":82.07504271837227},{"id":3021,"type":"path","x":520.7322504750741,"y":-248.35465754110692,"width":50,"height":50,"scaleX":2.1303857247659774,"scaleY":2.130385724765978,"fill":null,"data":"M507.52,427.39,282.65,52.62a31.09,31.09,0,0,0-53.31,0L4.48,427.39C-7.95,448.11,7,474.47,31.13,474.47H480.87C505,474.47,520,448.11,507.52,427.39Z","fillPatternImage":"/static/media/image1.8d246ba4.jpg","fillPatternOffsetX":13,"fillPatternOffsetY":-248,"isLocked":true,"rotation":0,"fillPatternScaleY":0.4,"fillPatternScaleX":0.4},{"id":5085,"type":"text","x":33.33333333333334,"y":154.99999999999994,"width":275,"height":46.66666666666665,"text":"We Are","align":"left","fontFamily":"Poppins","fontSize":40,"fontStyle":400,"rotation":0},{"id":6054,"type":"text","x":35.00000000000003,"y":201.66666666666674,"width":275,"height":59.99999999999987,"text":"Digital","align":"left","fontFamily":"Poppins","fontSize":52,"fontStyle":600,"rotation":0},{"id":5421,"type":"text","x":33.33333333333334,"y":261.6666666666667,"width":348.3333333333334,"height":59.99999999999986,"text":"Marketing","align":"left","fontFamily":"Poppins","fontSize":52,"fontStyle":700,"rotation":0,"fill":"rgba(254,204,50,1)"},{"id":3328,"type":"text","x":35,"y":318.33333333333337,"width":275,"height":59.99999999999987,"text":"Experts","align":"left","fontFamily":"Poppins","fontSize":52,"fontStyle":600,"rotation":0,"fill":"rgba(0,0,0,1)"},{"id":2354,"type":"image","x":68.33333333333343,"y":39.46219929273235,"src":"/static/media/sound-waves.bc89fc35.svg","width":40.252857818252174,"height":40.252857818252174,"rotation":0},{"id":9462,"type":"text","x":123.33333333333323,"y":45,"width":135.0000000000002,"height":28.33333333333309,"text":"Agency","align":"left","fontFamily":"Poppins","fontSize":29,"fontStyle":600,"rotation":0},{"id":351,"type":"rectangle","x":41.39617789775846,"y":397.59745193183886,"width":154.90254806816114,"height":48.65254806816108,"fill":"rgba(254,204,50,1)","fillPatternImage":null,"fillPatternOffsetX":null,"fillPatternOffsetY":null,"isLocked":false,"opacity":1,"rotation":0},{"id":8682,"type":"text","x":45.00000000000007,"y":409.9999999999992,"width":148.75000000000003,"height":45.41666666666678,"text":"Join us","align":"center","fontFamily":"Poppins","fontSize":23,"fontStyle":600,"rotation":0},{"id":8649,"type":"text","x":37.9583333333332,"y":480.0000000000002,"width":290.0000000000001,"height":45.41666666666677,"text":"www.yourdomain.com","align":"left","fontFamily":"Poppins","fontSize":20,"fontStyle":500,"rotation":0}])
      switch (id) {
        case "Facebook_Post":
          setStageDimensions({ width: sizes.fbPost.width, height: sizes.fbPost.height })
          setxSnapPoints([...[0, sizes.fbPost.width / 2, sizes.fbPost.width]])
          break;
        case "Instagram_Post":
          setStageDimensions({ width: sizes.inPost.width, height: sizes.inPost.height })
          setxSnapPoints([...[0, sizes.inPost.width / 2, sizes.inPost.width]])
          break;
        case "Twitter_Post":
          setStageDimensions({ width: sizes.twPost.width, height: sizes.twPost.height })
          setxSnapPoints([...[0, sizes.twPost.width / 2, sizes.twPost.width]])
          break;
        case "Youtube_Thumbnail":
          setStageDimensions({ width: sizes.youtubeThumbnail.width, height: sizes.youtubeThumbnail.height })
          setxSnapPoints([...[0, sizes.youtubeThumbnail.width / 2, sizes.youtubeThumbnail.width]])
          break;
        default:
          break;
      }
    }
    , []);
  const handleMenuClick = () => {
    setisMobileShowed(state => !state)
  }
  const loadFromJson = (textJson) => {
    var fonts = []
    var parsedElements = textJson;
    setTimeout(() => {
      setElements([...parsedElements])
    }, 800);
    // After we set template from json we need  to loop throu its fonts and load hem 
    parsedElements.forEach(element => {
      if (element.type == "text") {
        fonts.push(element.fontFamily)
      }
    })
    if (fonts.length > 0)
      WebFont.load({
        google: {
          families: fonts
        }
      });
  }
  useKeypress('Delete', () => {
    removeElementById(selectedId)
  });
  const removeElementById = (id) => {
    var pos = null;
    for (let index = 0; index < elements.length; index++) {
      if (id === elements[index].id) {
        pos = index
      }
    }
    if (pos !== null) {
      var tempArray = elements;
      tempArray.splice(pos, 1)
      setElements([...tempArray])
    }
  }
  // Handle template click and show it 
  const handleTemplateClickEditor = (name) => {
    axios.post(conf.endPoint + "/api/templates/return/editor", { data: { name: name } }, { withCredentials: true }).then((resp) => {
      if (resp.data.status == false) {
        setselectedTemplatePlan('Premium')
        setIsExportShowed(true)
      }
      loadFromJson(JSON.parse(resp.data.json))
      setselectedTemplatePlan(resp.data.plan)
      switch (resp.data.platform) {
        case "Facebook Post":
          setStageDimensions({ width: sizes.fbPost.width, height: sizes.fbPost.height })
          setxSnapPoints([...[0, sizes.fbPost.width / 2, sizes.fbPost.width]])
          break;
        case "Instagram Post":
          setStageDimensions({ width: sizes.inPost.width, height: sizes.inPost.height })
          setxSnapPoints([...[0, sizes.inPost.width / 2, sizes.inPost.width]])
          break;
        case "Twitter Post":
          setStageDimensions({ width: sizes.twPost.width, height: sizes.twPost.height })
          setxSnapPoints([...[0, sizes.twPost.width / 2, sizes.twPost.width]])
          break;
        case "Youtube Thumbnail":
          setStageDimensions({ width: sizes.youtubeThumbnail.width, height: sizes.youtubeThumbnail.height })
          setxSnapPoints([...[0, sizes.youtubeThumbnail.width / 2, sizes.youtubeThumbnail.width]])
          break;
        default:
          break;
      }
    })
  }
  const checkDeselect = (e) => { 
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };
  // return guidelines
  var returnGuideLines = (color) => {
    let guideLinesToReturn = []
    for (let index = 0; index < XGuideLines.length; index++) {
      guideLinesToReturn.push(
        <Line stroke="#3498db" dash={[5, 5]} strokeWidth={1} points={XGuideLines[index]} />
      )
    }
    return guideLinesToReturn;
  }
  // adding element to the board, it seralized ofc
  const addElement = (element) => {
    if (element.type == "text") {
      let elementToAdd = {
        id: Math.floor(Math.random() * 10000),
        type: element.type,
        x: 20,
        y: 20,
        width: element.width,
        height: element.height,
        text: element.text,
        align: element.align,
        fontFamily: element.fontFamily,
        fontSize: element.fontSize,
        fontStyle: element.fontStyle
      }
      setElements(elements.concat(elementToAdd))
    }
    if (element.type == "image") {
      let elementToAdd = {
        id: Math.floor(Math.random() * 10000),
        type: element.type,
        x: 20,
        y: 20,
        src: element.src,
        width: element.width,
        height: element.height,
      }
      setElements(elements.concat(elementToAdd))
      setIsDragging(true)
    }
    if (element.type == "rectangle") {
      let elementToAdd = {
        id: Math.floor(Math.random() * 10000),
        type: element.type,
        x: 20,
        y: 20,
        width: element.width,
        height: element.height,
        fill: element.fill,
        fillPatternImage: element.fillPatternImage,
        fillPatternOffsetX: element.fillPatternOffsetX,
        fillPatternOffsetY: element.fillPatternOffsetY,
        isLocked: element.isLocked,
        opacity: element.opacity
      }
      setElements(elements.concat(elementToAdd))
      setIsDragging(true)
    }
    if (element.type == "circle") {
      let elementToAdd = {
        id: Math.floor(Math.random() * 10000),
        type: element.type,
        x: 20,
        y: 20,
        width: element.width,
        height: element.height,
        fill: element.fill,
        fillPatternImage: element.fillPatternImage,
        fillPatternOffsetX: element.fillPatternOffsetX,
        fillPatternOffsetY: element.fillPatternOffsetY,
        isLocked: element.isLocked
      }
      setElements(elements.concat(elementToAdd))
      setIsDragging(true)
    }
    if (element.type == "path") {
      let elementToAdd = {
        id: Math.floor(Math.random() * 10000),
        type: element.type,
        x: 20,
        y: 20,
        width: element.width,
        height: element.height,
        scaleX: element.scaleX,
        scaleY: element.scaleY,
        fill: element.fill,
        data: element.data,
        fillPatternImage: element.fillPatternImage,
        fillPatternOffsetX: element.fillPatternOffsetX,
        fillPatternOffsetY: element.fillPatternOffsetY,
        isLocked: element.isLocked
      }
      setElements(elements.concat(elementToAdd))
      setIsDragging(true)
    }
  }
  // adding element to the board, it seralized ofc
  const exportWork = () => {
    var Json = JSON.stringify(elements)
    return Json
  }
  // Edit an element using its id in the elements array
  const editPositionOfElement = (elementId, event) => {
    elements.forEach((el) => {
      if (el.id == elementId) {
        el.x = event.target.x();
        el.y = event.target.y();
        el.rotation = event.target.rotation();
      }
    })
    setIsDragging(!isDragging);
    setElements(elements)
  }
  // Edit the with and the height of a specefic element
  const editDimensionsOfElement = (elementId, width, height) => {
    // we will reset it back
    elements.forEach((el) => {
      if (el.id == elementId) {
        el.width = width
        el.height = height
        setElements([...elements])
      }
    })
  }
  const editDimensionsOfPath = (elementId, scaleX, scaleY) => {
    // we will reset it back
    elements.forEach((el) => {
      if (el.id == elementId) {
        el.scaleX = scaleX
        el.scaleY = scaleY
        setElements([...elements])
      }
    })
  }
  const editBackgroundOfRectangle = (elementid, src) => {
    var tempArray = elements;
    tempArray[elementid].fillPatternImage = src;
    tempArray[elementid].fill = null;
    setElements([...tempArray])
  }
  ////  
  const editImageElement = (fieldName, value) => {
    var pos = null;
    var tempArray = elements
    switch (fieldName) {
      case "font":
        tempArray.forEach((el) => {
          if (el.id == selectedId) {
            el.fontFamily = value
          }
        })
        break;
      case "fontWeight":
        tempArray.forEach((el) => {
          if (el.id == selectedId) {
            el.fontStyle = value
          }
        })
        break;
      case "radius":
        tempArray.forEach((el) => {
          if (el.id == selectedId) {
            el.cornerRadius = value
          }
        })
        break;
      case "strokeWidth":
        tempArray.forEach((el) => {
          if (el.id == selectedId) {
            el.strokeWidth = value
          }
        })
        break;
      case "bgRotation":
        tempArray.forEach((el) => {
          if (el.id == selectedId) {
            el.fillPatternRotation = value
          }
        })
        break;
      case "strokeColor":
        tempArray.forEach((el) => {
          if (el.id == selectedId) {
            el.strokeColor = value
          }
        })
        break;
      case "opacity":
        tempArray.forEach((el) => {
          if (el.id == selectedId) {
            el.opacity = value
          }
        })
        break;
      case "bgOffsetX":
        tempArray.forEach((el) => {
          if (el.id == selectedId) {
            el.fillPatternOffsetX = value
          }
        })
        break;
      case "bgOffsetY":
        tempArray.forEach((el) => {
          if (el.id == selectedId) {
            el.fillPatternOffsetY = value
          }
        })
        break;
      case "bgScale":
        // console.log("bgScale"+value);
        tempArray.forEach((el) => {
          if (el.id == selectedId) {
            el.fillPatternScaleY = value
            el.fillPatternScaleX = value
          }
        })
        break;
      case "text":
        tempArray.forEach((el) => {
          if (el.id == selectedId) {
            el.text = value
          }
        })
        break;
      case "align":
        tempArray.forEach((el) => {
          if (el.id == selectedId) {
            el.align = value
          }
        })
        break;
      case "fontColor":
        tempArray.forEach((el) => {
          if (el.id == selectedId) {
            el.fill = selectedColor
          }
        })
        break;
      case "fontsize":
        tempArray.forEach((el) => {
          if (el.id == selectedId) {
            el.fontSize = value
          }
        })
        break;
      case "posX":
        tempArray.forEach((el) => {
          if (el.id == selectedId) {
            el.x = value
          }
        })
        break;
      case "posY":
        tempArray.forEach((el) => {
          if (el.id == selectedId) {
            el.y = value
          }
        })
        break;
      case "rotate":
        tempArray.forEach((el) => {
          if (el.id == selectedId) {
            el.rotation = value
          }
        })
        break;
      case "width":
        tempArray.forEach((el) => {
          if (el.id == selectedId) {
            el.width = value
          }
        })
        break;
      case "height":
        tempArray.forEach((el) => {
          if (el.id == selectedId) {
            el.height = value
          }
        })
        break;
    }
    setElements([...tempArray])
  }
  /// Hadling the click of locking button and lock the selected shape shape
  const handleLockClick = () => {
    var tempArray = elements
    tempArray[selectedElementArrayIndex].isLocked = !tempArray[selectedElementArrayIndex].isLocked;
    setElements([...tempArray])
  }
  /// Hadling the click of locking button and lock the selected shape shape
  const handleDuplicateClick = async () => {
    var tempArray = elements;
    /// We get the position of the element we want
    var tempElement = elements[selectedElementArrayIndex];
    tempElement.id = Math.floor(Math.random() * 10000);
    addElement(tempElement)
  }
  /// Export stage 
  const exportStage = () => {
    var dataUrl;
    dataUrl = stageRef.current.toDataURL({ pixelRatio: 1 })
    downloadjs(dataUrl, "image.png")
    axios.post(conf.endPoint + '/api/template/download')
  }
  // set custom dimentions
  const setCustomDimentions = (width, height) => {
    // console.log(`Width is ${width} and height is ${height}`);
    setStageDimensions({ width: height, height: width })
    setxSnapPoints([...[0, height / 2, height]])
    setisModalShowed(false)
  }
  const MoveUp = (id) => {
    let pos = null;
    // find the index of the id that we want to move up
    for (let index = 0; index < elements.length; index++) {
      if (elements[index].id == id) {
        pos = index;
      }
    }
    // if the id not found 
    if (pos == null || pos >= elements.length - 1)
      return
    var tempElements = elements;
    let tempHolder = tempElements[pos]
    tempElements[pos] = tempElements[pos + 1]
    tempElements[pos + 1] = tempHolder
    setElements([...tempElements])
  }
  const MoveDown = (id) => {
    let pos = null;
    // find the index of the id that we want to move up
    for (let index = 0; index < elements.length; index++) {
      if (elements[index].id == id) {
        pos = index;
      }
    }
    // if the id not found 
    if (pos == null || pos == 0)
      return
    var tempElements = elements;
    let tempHolder = tempElements[pos]
    tempElements[pos] = tempElements[pos - 1]
    tempElements[pos - 1] = tempHolder
    setElements([...tempElements])
  }
  return (
    <div className="editor">
      {/* left sidebar */}
      <Sidebar setisModalShowed={setisModalShowed} MoveUp={MoveUp} MoveDown={MoveDown} setisAddImageShowed={setisAddImageShowed} handleTemplateClickEditor={handleTemplateClickEditor} selectedId={selectedId} editBackgroundOfRectangle={editBackgroundOfRectangle} exportWork={exportWork} elements={elements} selectedElementArrayIndex={selectedElementArrayIndex} addElement={addElement} />
      {/*  workspace */}
      <div className="editor__workarea">
        {isModalShowed && <Modal type="Size" setCustomDimentions={setCustomDimentions} setisModalShowed={setisModalShowed} />
        }
        {isAddImageShowed && <Modal editBackgroundOfRectangle={editBackgroundOfRectangle} selectedElementArrayIndex={selectedElementArrayIndex} elements={elements} selectedId={selectedId} addElement={addElement} type="Image" setisAddImageShowed={setisAddImageShowed} setCustomDimentions={setCustomDimentions} setisModalShowed={setisModalShowed} />
        }
        {isExportShowed && <Modal selectedTemplatePlan={selectedTemplatePlan} exportWork={exportWork} exportStage={exportStage} setIsExportShowed={setIsExportShowed} monthly={props.monthly} plan={props.user.plan} type="export" setIsExportShowed={setIsExportShowed} setisModalShowed={setisModalShowed} />
        }
        {isImportShowed && <Modal loadFromJson={loadFromJson} selectedTemplatePlan={selectedTemplatePlan} exportWork={exportWork} exportStage={exportStage} setIsExportShowed={setIsExportShowed} monthly={props.monthly} plan={props.user.plan} type="import" setIsExportShowed={setIsExportShowed} setisImportShowed={setisImportShowed} />
        }
        <div className="editor__tooltiphover">
          <div className="editor__loading" ref={LoadingRef} ></div>
          <div onClick={() => { setSelectedId(null); setIsExportShowed(true) }} className={"duplicate"}>
            {/* exportStage() ; exportWork() */}
            Export
          </div>
          <div onClick={() => { setisImportShowed(true) }} className={"duplicate"}>
            {/* exportStage() ; exportWork() */}
            Import
          </div>
          <div onClick={() => { handleMenuClick() }} className={"duplicate property"}>
            {/* exportStage() ; exportWork() */}
            Properties
          </div>
          <div onClick={() => { setisModalShowed(true); }} className={"duplicate"}>
            Dimensions
          </div>
        </div>
        <div style={{
          transform:
            zoom >= 100 ?
              "scale(" + zoom.toString().substring(0, 1) + "." + zoom.toString().substring(1, 2) + ")" :
              "scale(0." + zoom.toString().substring(0, 1) + ")"
        }} className="editor__presentation">
          <Stage
            ref={stageRef}
            width={stageDimensions.width} height={stageDimensions.height}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
            onClick={() => {
              var index = 0;
              elements.forEach((el) => {
                if (el.id == selectedId) {
                  setSelectedElementArrayIndex(index)
                  setselectedLockedStatus(el.isLocked)
                }
                index++;
              })
            }}
            onTap={() => {
              var index = 0;
              elements.forEach((el) => {
                if (el.id == selectedId) {
                  setSelectedElementArrayIndex(index)
                }
                index++;
              })
            }}
          >
            <Layer
              width={stageDimensions.width} height={stageDimensions.height}
              onDragEnd={(event) => {
                setXguideLines([])
              }}
              onDragMove={(event) => {
                // console.log(event.target.getClientRect().x + event.target.getClientRect().width);
                setXguideLines([])
                for (let index = 0; index < xSnapPoints.length; index++) {
                  /////////// We check the points of the workspace /////////////////
                  // We check with  of the start of X of the object
                  if (event.target.x() >= 0 && event.target.x() <= 3) {
                    event.target.x(0)
                    var newXGuidelines = XGuideLines
                    newXGuidelines.push([0, 0, 0, stageDimensions.height])
                    setXguideLines([...newXGuidelines])
                  }
                  // We check with  of the end of X of the object
                  if (event.target.x() + event.target.getClientRect().width >= xSnapPoints[index] - 3 && event.target.x() + event.target.getClientRect().width <= xSnapPoints[index] + 3) {
                    event.target.x(xSnapPoints[index] - event.target.getClientRect().width)
                    var newXGuidelines = XGuideLines
                    newXGuidelines.push([xSnapPoints[index], 0, xSnapPoints[index], stageDimensions.height])
                    setXguideLines([...newXGuidelines])
                  }
                  // We check with the center of the X of object
                  if (event.target.x() + (event.target.getClientRect().width / 2) >= xSnapPoints[index] - 3 && event.target.x() + (event.target.getClientRect().width / 2) <= xSnapPoints[index] + 3) {
                    event.target.x(xSnapPoints[index] - (event.target.getClientRect().width / 2))
                    var newXGuidelines = XGuideLines
                    newXGuidelines.push([xSnapPoints[index], 0, xSnapPoints[index], stageDimensions.height])
                    setXguideLines([...newXGuidelines])
                  }
                }
                //////////////////////// End of checking the points of workspace down below we check other shapes points to snap into them
                for (let index = 0; index < elements.length; index++) {
                  if (elements[index].name !== event.target.name()) {
                    // Center
                    if (event.target.x() + (event.target.getClientRect().width / 2) >= elements[index].x - 3 && event.target.x() + (event.target.getClientRect().width / 2) <= elements[index].x + 3) {
                      event.target.x(elements[index].x - (event.target.getClientRect().width / 2))
                      var newXGuidelines = XGuideLines
                      newXGuidelines.push([elements[index].x, 0, elements[index].x, stageDimensions.height])
                      setXguideLines([...newXGuidelines])
                    }
                    // End of target with the first of other objects
                    if (event.target.x() + event.target.getClientRect().width >= elements[index].x - 3 && event.target.x() + event.target.getClientRect().width <= elements[index].x + 3) {
                      event.target.x(elements[index].x - event.target.getClientRect().width)
                      var newXGuidelines = XGuideLines
                      newXGuidelines.push([elements[index].x, 0, elements[index].x, stageDimensions.height])
                      setXguideLines([...newXGuidelines])
                    }
                    // End of target with the end of other objects
                    if (event.target.x() + event.target.getClientRect().width >= elements[index].x - 3 && event.target.x() + event.target.getClientRect().width <= elements[index].x + 3) {
                      event.target.x(elements[index].x - event.target.getClientRect().width)
                      var newXGuidelines = XGuideLines
                      newXGuidelines.push([elements[index].x, 0, elements[index].x, stageDimensions.height])
                      setXguideLines([...newXGuidelines])
                    }
                  }
                }
              }}
            >
              {isDragging == true && returnGuideLines()}
              {returnElements(elements, setIsDragging, editPositionOfElement, selectedId, setSelectedId, editDimensionsOfElement, editDimensionsOfPath, stageDimensions, stageRef, layerRef)}
            </Layer>
          </Stage>
        </div>
        <ZoomController setzoom={setzoom} />
      </div>
      <ElementConfig handleMenuClick={handleMenuClick} isMobileShowed={isMobileShowed} setselectedColor={setselectedColor} setIsDragging={setIsDragging} elements={elements} selectedElementArrayIndex={selectedElementArrayIndex} editImageElement={editImageElement} />
      <div className="elementConfig__Placeholder"></div>
    </div>
  )
}
export default Editor
