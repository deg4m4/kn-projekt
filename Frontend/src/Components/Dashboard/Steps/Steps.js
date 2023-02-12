import React,{useState} from 'react'
import TemplatePreview from '../TemplatePreview/TemplatePreview';
import StepOne from './StepOne';
import './Steps.scss';
import StepTwo from './StepTwo';
const Steps = () => {
    const [step, setstep] = useState(1)

    const nextStep = ()=>{
        setstep(prevState=>prevState+1);
    }
    return (
        <div className="steps">

   {step == 1 &&   <StepOne nextStep={nextStep}  />}
   {step == 2 &&   <StepTwo  nextStep={nextStep} />}
   {step == 3 &&   <TemplatePreview  />}
   
            
        </div>
    )
}

export default Steps
