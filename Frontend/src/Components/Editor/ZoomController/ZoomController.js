import React,{useState} from 'react';
import './ZoomController.scss';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
const ZoomController = (props) => {
    const [zoomValue,setZoomValue] = useState(100)
    
    const handleControllerClick = (name)=>{
        let temp = zoomValue;

        switch (name) {
            case "add":
                   setZoomValue(temp+10)
                   props.setzoom(temp+10)
                break;
                case "deduct":
                    setZoomValue(temp-10)
                    props.setzoom(temp-10)

                    break;
        
            default:
                break;
        }
    }
    return (
        <div className="zoom__wrapper">
          <div onClick={()=>{handleControllerClick('add')}} className="zoom_controller">
              <ZoomInIcon className="zoom_controller-icon" />
          </div>
          <div className="zoom_value">
              <span>{zoomValue}%</span>
          </div>
          <div v onClick={()=>{handleControllerClick('deduct')}} className="zoom_controller">
          <ZoomOutIcon className="zoom_controller-icon" />
          </div>
        </div>
    )
}

export default ZoomController
