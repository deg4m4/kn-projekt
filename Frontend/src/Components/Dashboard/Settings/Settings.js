import React,{useState} from 'react';
import "./Settings.scss";
import BasicImage from '../../../assets/images/old-computer.png'
import PremiumImage from '../../../assets/images/premium.png'
import axios from 'axios'
import { conf } from '../../../conf/conf';
const Settings = (props) => {

    const [firstname, setfirstname] = useState("")
    const [lastname, setlastname] = useState("")


    const handleInputs = (name,event)=>{
        switch (name) {
            case "First Name":
                setfirstname(event.target.value)
            break;
            case "Last Name":
                setlastname(event.target.value)
            break;
            default:
                break;
        }
    }
    const handleAccountDetailsSubmit=()=>{
        axios.post(conf.endPoint+"/api/auth/edit/user",{
            data:{
                firstname:firstname,
                lastname:lastname
            }
        },{withCredentials:true}).then((resp)=>{
           window.location.reload()
        })
    }
    const handleRemoveUser=()=>{
        axios.post(conf.endPoint+"/api/auth/remove/user",{
            data:{
               
            }
        },{withCredentials:true}).then((resp)=>{
           window.location.reload()
        })
    }
    return (
        <div className="dashboard__settings-wrapper">
            <div className="dashboard__settings">
                {/* Head */}
                <div className="dashboard__settings-head">
                    <div className="dashboard__settings-head-content">
                        <h1>Settings</h1>
                    </div>
                    <div className="hr" />
                </div>
                {/* Body */}
                <div className="dashboard__settings-body">
                    {/* Account Settings */}
                    <div className="dashboard__settings-subtitle">
                        ACCOUNT DETAILS
                    </div>

                    <div className="dashboard__settings-card">
                        {/* Form */}
                      <div className="dashboard__details-form">
                          {/* Grid */}
                          <div className="dashboard__details-form-grid">
                              {/* First Name */}
                              <div className="dashboard__details-form-grid--input">
                                  <span>First Name</span>
                                  <input onChange={(event)=>handleInputs("First Name",event)}  placeholder={props.user.firstname} />
                              </div>
                              {/* Last name */}
                              <div className="dashboard__details-form-grid--input">
                                  <span>First Name</span>
                                  <input onChange={(event)=>handleInputs("Last Name",event)}  placeholder={props.user.lastname} />
                              </div>
                              <div className="dashboard__details-form-grid--input">
                                  <span>Email </span>
                                  <input disabled value={props.user.email} />
                              </div>
                              <div className="dashboard__details-form-grid--input">
                                  <p>Use this email to log in to your account and receive notifications.</p>
                              </div>
                         
                          </div>

                          <div className="dashboard__settings-plan--upgrade">
                                <a onClick={()=>handleAccountDetailsSubmit()} href="#">Save</a>
                                </div>
                   
                      </div>
                    </div>


                             {/* Account Removal */}
                                  
                    <div className="dashboard__settings-subtitle">
                        ACCOUNT
                    </div>
                             <div className="dashboard__settings-card">
                        <div className="dashboard__settings-plan">
                     
                            {/* Middle Text */}
                            <div className="dashboard__settings-plan--middleText">
                                  <p>Once you click this link you wil remove your account permanently</p>
                            </div>
                            {/* Upgrde Button */}
                            <div className="dashboard__settings-plan--upgrade">
                                <a onClick={()=>{handleRemoveUser()}} style={{color:"red"}} href="#">Remove Account</a>
                                </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Settings
