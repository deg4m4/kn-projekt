import {useState} from 'react'
import axios from 'axios'
import Logo from '../../../assets/images/logo.png'
import GoogleIcon from '../../../assets/images/google.png'
import Input from '../../Form/Input/Input'
import { conf } from '../../../conf/conf'
const Register =(props)=>{
        /// State that hold auth data
        const [email,setEmail] = useState("")
        const [password,setPassword] = useState("")
        const [repeat,setRepeat] = useState("")
        const [passwordErrorShowed,setpasswordErrorShowed] = useState(false)
        const [emailExistsShowed,setemailExistsShowed] = useState(false)
    
        // Input changes handler
        const handleInputs = (event,name) =>{
            switch (name) {
                case "Email":
                       setEmail(event.target.value)
                    break;
                case "Password":
                    setPassword(event.target.value)
               case "Repeat":
                setRepeat(event.target.value)
                default:
                    break;
            }
        }
        const handleSubmit = (event)=>{
            event.preventDefault();
            if(password !== repeat){
                setpasswordErrorShowed(true)
            }else{
                setpasswordErrorShowed(false)
                axios.post(conf.endPoint+"/api/auth/register",{data:{email:email,password:password}}).then((resp)=>{
                    if(resp.data.status == "exists"){
                        setemailExistsShowed(true)
                    }else if(resp.data.status == true){
                        window.location.href='/members'
                    }
                    
                })
            }
            
        }
       
    return(
        <>
                     {/* Logo */}
                     <div className="login__logo">
                    <img src={Logo} alt="Logo" />
                </div>
                {/* Heading */}
                <div className="login__heading mg-top-20">
                    <span>Register</span>
                    <p className=" text-grey mg-top-10 font-small">Login to access our advanced photo editor and to start creating professional designs for your social media campaigns.</p>
                </div>
                {/* Login Divider */}
                <div className=" mg-top-20 login__divider  flex-col-center">
                    {/* Error div */}
                  {passwordErrorShowed == true && 
                      <div className="auth__error">
                      <span className="auth__error-title">Password not match</span>
                      <p className="auth__error-body">Please check your entered password.</p>
                  </div>
                  }
                 {emailExistsShowed == true && 
                      <div className="auth__error">
                      <span className="auth__error-title">Email already in use</span>
                      <p className="auth__error-body">Please enter  another email.</p>
                  </div>
                  }
                
                </div>
                {/* Form  */}
                <form className="login__form mg-top-20 flex-col" >
                    <Input placeholder="example@yourwebsite.com" handleInputs={handleInputs} label="Email*" name="Email" rounded />
                    <Input placeholder="...." handleInputs={handleInputs} name="Password" label="Password*" name="Password"  type="password" rounded />
                    <Input placeholder="...." handleInputs={handleInputs} name="Repeat" label="Repeat Password*" name="Repeat" type="password" rounded />
                {/* Submit */}
                <input onClick={(event)=>{handleSubmit(event)}} type="submit" value="Register"  className="btn-primary rounded mg-top-20" />
                </form>
                {/* Not registered ? */}
                <div className="flex login__notRegistered mg-top-20">
                     <span className="font-small">Already have an account? <a href="#" onClick={()=>props.setStep("Login")} className="weight-500 color-primary">Login</a>.</span>
                </div>
                    {/*Copy right ? */}
                    <div className="flex login__rights mg-top-20">
                     <span className="font-small">©2023 All Rights reserved.</span>
                </div>
        </>
    )
}
export default Register