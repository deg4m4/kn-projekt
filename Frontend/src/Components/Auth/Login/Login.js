import {useState} from 'react'
import Logo from '../../../assets/images/logo.png'
import GoogleIcon from '../../../assets/images/google.png'
import Input from '../../Form/Input/Input'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { conf } from '../../../conf/conf'
const Login =(props)=>{
        /// State that hold auth data
        const [email,setEmail] = useState("")
        const [password,setPassword] = useState("")
        const [errorLoginShowed,seterrorLoginShowed] = useState(false)
        let history = useHistory();
        // Input changes handler
        const handleInputs = (event,name) =>{
            switch (name) {
                case "Email":
                       setEmail(event.target.value)
                    break;
                case "Password":
                    setPassword(event.target.value)
                default:
                    break;
            }
        }
       
    const handleGoogleLogin = async () => {
        
        window.location.href =  conf.endPoint+'/api/auth/google'; 
      };
      const handleLocalLogin =  (event) => {
        event.preventDefault();
        axios.post( conf.endPoint+"/api/auth/login",{
            username:email,
            password:password
        },
        {withCredentials:true}
        ).then(( resp)=>{
           if( resp.data.status == "true" ) {
            window.location.href =  '/members';
           }
        }).catch((err)=>{
            seterrorLoginShowed(true)
        })
      };
    return(
        <>
                     {/* Logo */}
                     <div className="login__logo">
                    <img src={Logo} alt="Logo" />
                </div>
                {/* Heading */}
                <div className="login__heading mg-top-20">
                    <span>Login</span>
                    <p className=" text-grey mg-top-10 font-small">Login to access our advanced photo editor and to start creating professional designs for your social media campaigns.</p>
                </div>
                {/* Login Divider */}
                <div className=" mg-top-20 login__divider  flex-col-center">
                    {errorLoginShowed == true && 
                      <div className="auth__error">
                      <span className="auth__error-title">Couldnt Login</span>
                      <p className="auth__error-body">Please verify your email and password..</p>
                  </div>
                  }
                </div>
                {/* Form  */}
                <form className="login__form mg-top-20 flex-col" >
                    <Input placeholder="example@yourwebsite.com" handleInputs={handleInputs} label="Email*" name="Email" rounded />
                    <Input placeholder="...." handleInputs={handleInputs} name="Password" label="Password*" type="password" rounded />
                {/* Forgot Passwod */}
                <div className="flex login__forgotPasswod mg-top-20">
                    {/* <a href="#" className="font-small weight-500 ">Forgot Password?</a> */}
                </div>
                {/* Submit */}
                <input onClick={(event)=>{handleLocalLogin(event)}} type="submit" value="Login"  className="btn-primary rounded mg-top-20" />
                </form>
                {/* Not registered ? */}
                <div className="flex login__notRegistered mg-top-20">
                     <span className="font-small">Not registered? <a href="#" onClick={()=>props.setStep("Register")} className="weight-500 color-primary">Create an Account</a>.</span>
                </div>
                    {/*Copy right ? */}
                    <div className="flex login__rights mg-top-20">
                     <span className="font-small">©2023 All Rights reserved.</span>
                </div>
        </>
    )
}
export default Login