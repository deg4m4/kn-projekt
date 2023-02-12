import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router'
import axios from 'axios';
import { conf } from '../../../conf/conf';
import './Page.scss'
const Page = () => {
    let {name} = useParams()
    const [pageBody, setpageBody] = useState("")

    useEffect(()=>{
        axios.post(conf.endPoint+"/api/pages/get/one",{data:{name:name}}).then((resp)=>{
            setpageBody(resp.data[0].markup)
        })
        
    },[])

    function createMarkup() { return {__html: pageBody}; };



    return (
        <div className="page"> 
<div dangerouslySetInnerHTML={createMarkup()} />
        </div>
    )
}

export default Page
