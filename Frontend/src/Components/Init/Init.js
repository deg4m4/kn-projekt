import React,{useState,useEffect} from 'react'
import axios from 'axios';
import './Init.scss';
import SuccessImage from '../../assets/images/success.png';
import Button from '../Admin/Form/Button/Button';
import Input from '../Admin/Form/Input/Input';
import {conf} from "../../conf/conf"
const Init = () => {


    const [step, setStep] = useState("intro")

    // Meta
    const [websiteTitle, setwebsiteTitle] = useState("")
    const [websiteDesc, setwebsiteDesc] = useState("")
    const [keywords, setkeywords] = useState("")
    // Login
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [repeat, setrepeat] = useState("")

    ///  on mount check if the app is already initialised
    useEffect(()=>{
        axios.post(conf.endPoint+"/api/init").then((resp)=>{
            if (resp.data.status == true){
                window.location.href = "/";
            }
        })
    },[]);

    const handleInputs = (name, event) => {
        switch (name) {
            case "Title":
                setwebsiteTitle(event.target.value)
                break;
            case "Description":
                setwebsiteDesc(event.target.value)
                break;
            case "Keywords":
                setkeywords(event.target.value)
                break;
            case "Email":
                setemail(event.target.value)
                break;
            case "Password":
                setpassword(event.target.value)
                break;
            case "Repeat":
                setrepeat(event.target.value)
                break;

            default:
                break;
        }
    }

    const handleSubmit = () =>{
        axios.post(conf.endPoint+"/api/init",
        {data:
        {
            websiteTitle:websiteTitle,
            websiteDescription:websiteDesc,
            websiteKeywords:keywords,
            email:email,
            password:password
        }}
        ).then((resp)=>{
            if(resp.data.status == "initialised"){
                window.location.href = "/";
            }
        })


    }
    return (

        step == "intro" ?

            <div className="init" >
                <img className="init__success" src={SuccessImage} alt="initialisation" />
                <h1>App Initialisations</h1>
                <p>You are almost done installing the app. we just need some information to start you project</p>
                <Button onClick={() => { setStep("metadata") }} type="default" value="Start" />
            </div>
            : step == "metadata" ?
                ////////// Meta data
                <div className="init__meta">
                    <h1>Website Meta data</h1>
                    <h2>Add your website details. </h2>

                    <div style={{ width: "400px" }}>
                        <Input handleInputs={handleInputs}  value={websiteTitle}  name={"Title"} title="Website Title" />
                        <Input  handleInputs={handleInputs} value={websiteDesc}    name={"Description"} title="Description " />
                        <Input   handleInputs={handleInputs} value={keywords}     name={"Keywords"} title="Keywords" />

                        <Button onClick={() => { setStep("intro") }} style={{ display: "inline" }} type="outlined" value="Return" />
                        <Button onClick={() => { setStep("admin") }} style={{ display: "inline", marginLeft: "10px" }} type="default" value="Continue" />

                    </div>

                </div>
                :

                //     ////// Admin user

                <div className="init__meta">
                    <h1>Admin </h1>
                    <h2>Register your admin account. </h2>

                    <div style={{ width: "400px" }}>
                        <Input   handleInputs={handleInputs}  value={email}    name={"Email"}  title="Email " />
                        <Input   handleInputs={handleInputs} value={password}    name={"Password"}  title="Password " />
                        <Input    handleInputs={handleInputs}  value={repeat}    name={"Repeat"}  title="Repeat Password" />
                        <Button onClick={() => { setStep("metadata") }} style={{ display: "inline" }} type="outlined" value="Return" />
                        <Button onClick={()=>{handleSubmit()}} style={{ display: "inline", marginLeft: "10px" }} type="default" value="Finish" />

                    </div>

                </div>



    )
}

export default Init
