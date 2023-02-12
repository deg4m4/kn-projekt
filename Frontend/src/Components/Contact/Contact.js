import React, { useState } from 'react'
import './Contact.scss'
import axios from 'axios';
import { conf } from '../../conf/conf';

const Contact = () => {


    const [isSuccessShowed, setisSuccessShowed] = useState(false)

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [message, setmessage] = useState('')

    const handleInputs = (name, event) => {
        switch (name) {
            case 'Name':
                setname(event.target.value)
                break;
            case 'Email':
                setemail(event.target.value)
                break;
            case 'Message':
                setmessage(event.target.value)
                break;
            default:
                break;
        }
    }

    const handleSubmit=()=>{
        axios.post(conf.endPoint+'/api/contact/send',{data:{
            name:name,
            email:email,
            message:message
        }})

        setTimeout(() => {
            setisSuccessShowed(true)
        }, 1000);
    }

    return (
        <div className="contact">
            <div className="contact__head">
                <h1>Contact Us</h1>
                {/* Success Message */}
                {isSuccessShowed === true &&     <div className="contact_success">
                    <p>Thank you for contacting us we will get back to you soon.</p>
                </div>}
             

                <p>Have comments, questions, or feedback to share? Our team would love to hear from you. Give us a call or submit a message below.</p>
            </div>
            <div className="contact__Body">
                <div className="inputHolder">
                    <span className="inputHolder__label">Full Name</span>
                    <input onChange={(event)=>{handleInputs('Name',event)}} />
                </div>

                <div className="inputHolder">
                    <span className="inputHolder__label">Email</span>
                    <input onChange={(event)=>{handleInputs('Email',event)}} />
                </div>
                <div className="inputHolder">
                    <span className="inputHolder__label">Message</span>
                    <textarea onChange={(event)=>{handleInputs('Message',event)}} />
                </div>

                <div className="inputHolder">
                    <a onClick={()=>{
                        handleSubmit()
                    }} className="inputSubmit">Submit</a>
                </div>
            </div>



        </div>
    )
}

export default Contact
