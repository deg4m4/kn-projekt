import React,{useState} from 'react'
import StepOneImage from '../../../assets/images/step1.png';
import Input from '../../Form/Input/Input';

const StepOne = (props) => {
    const [projectName,setProjectName] =useState("Untitled");
const handleInputs =(event,name) =>{
    switch (name) {
        case "Project Name":
            setProjectName(event.target.value);
        break;
    
        default:
            break;
    }
}
    return (
        <div className="steps__step1 flex-col-center">
           <img src={StepOneImage} alt="enter project ame" />
           <span className="steps_step1-title weight-600">Template name</span>
           <p className="steps_step1-description">Give you project a name so you can access it easily later on.</p>
             <Input rounded={"10px"} handleInputs={handleInputs} />
             <a onClick={()=>props.nextStep()} className="btn-primary steps__step1-continue mg-top-10"> Continue </a>
        </div>
    )
}

export default StepOne
