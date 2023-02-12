
import './Auth.scss'
import Login from'../../Auth/Login/Login'
import Register from '../Register/Register';
import TopLeft from '../../../assets/images/top.png'
import BottomRight from '../../../assets/images/bottomRight.png'
import { useState } from 'react';

import GmailImage from '../../../assets/images/twitter.png'
import OutlookImage from '../../../assets/images/instagram.png'
import Mailchimp from '../../../assets/images/facebook.png'
import Circles from '../../../assets/images/circles.png';
import DesktopImage from '../../../assets/images/design.png'
const Auth = () => {

    const [currentStep,setCurrentStep] = useState("Login")

    const setStep = (stepName) =>{
        setCurrentStep(stepName);
    }
    return (
        <div className=" grid-2 login  ">
            {/* Left side */}
            <div className=" container-tight login__left flex-col pd-50 mg-top-40  " >
                {currentStep == "Login" ? <Login  setStep={setStep} /> : <Register setStep={setStep} />}
            </div>
            {/* Right Side */}
            <div className="login__right flex-col-center">
                {/* Top and bottom squares */}
                <img  className="login__topLeft"src={TopLeft}  alt="top" />
                <img  className="login__botRight" src={BottomRight} alt="bottom" />
                {/* Circles */}
                <div className="login__circle1">
                    <img src={GmailImage} alt="gmail"/>
                </div>
                <div className="login__circle2">
                <img src={Mailchimp} alt="gmail"/>
                </div>
                <div  className="login__circle3">
                <img src={OutlookImage} alt="gmail"/>
                </div>
                {/* Right Content */}
                <div className="login__right-content flex-col-center">
                    <div className="login__right-contentTop">
                        {/* <img src={Circles} alt="circles" /> */}
                        <img src={DesktopImage} />
                    </div>
                    <div className="login__right-contentBottom mg-top-100">
                        <span className="font-large weight-700 text-white center block">Turn your ideas <br></br> into designs.</span>
                        <span className="font-small weight-400 text-white center">Free graphic design software with professional <br/> templates.</span>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Auth;