import {useEffect} from 'react'
import './Footer.scss';
import axios from 'axios'
import FacebookImage from '../../../assets/images/socialWhite/facebook.png'
import TwitterImage from '../../../assets/images/socialWhite/twitter.png'
import LinkedInImage from '../../../assets/images/socialWhite/linkedin.png'
import { useState } from 'react';
import { conf } from '../../../conf/conf';
import { Link } from 'react-router-dom';



const Footer = (props) => {

    const [pages, setpages] = useState([])
    const [facebook, setfacebook] = useState("")
    const [twitter, settwitter] = useState("")
    const [linkedin, setlinkedin] = useState("")

    useEffect(()=>{
        axios.post(conf.endPoint+"/api/pages/get",{}).then((resp)=>{
            setpages(resp.data)
        })
        axios.post(conf.endPoint+"/api/social/get",{}).then((resp)=>{
            console.log(resp.data[0]);
            if(resp.data.length > 0){
                setfacebook(resp.data[0].facebook)
                settwitter(resp.data[0].twitter)
                setlinkedin(resp.data[0].linkedin)
    
            }
  
        })
    },[])

    return (
        <div className="footer">
            {/* Left grid site info and social media */}
            <div className="footer__left">
                <h3>Connect with us in our social media</h3>
                {/* Social Links */}
                <div className="footer__socialLinks">
                    <div className="footer__socialLink " data-type="facebook">
                     <a href={facebook}> <img src={FacebookImage} alt="social" /> </a>   

                    </div>
                    <div className="footer__socialLink" data-type="twitter">
                    <a href={twitter}>   <img src={TwitterImage} alt="social" /></a>   


                    </div>
                    <div className="footer__socialLink" data-type="linkedin">
                    <a href={linkedin} >    <img src={LinkedInImage} alt="social" /></a>   


                    </div>

                </div>
            </div>

            <div className="footer__rightGrid" >
                <div className="footer__col">
                    <div className="footer__col-head">
                    <span>Links</span>
                    </div>
                    <div className="footer__col-links">
                     
                        {pages.map((item,index)=>{
                            return <a href={'/p/'+item.name}> {item.name}</a>

                        })}
                    </div>
                </div>
                <div className="footer__col">
                    <div className="footer__col-head">
                    <span>PAGES</span>
                    </div>
                    <div className="footer__col-links">
                        <Link to="/contact"> Contact Us</Link>
                        <Link to="/members"> Dashboard</Link>
                        <Link to="/upgrade"> Upgrade</Link>
                        <Link to="/members/templates/all"> Templates</Link>


                    </div>
                </div>
                <div className="footer__col">
                    <div className="footer__col-head">
                    <span>ABOUT US</span>
                    </div>
                    <div className="footer__col-links">
                        <p>{props.desc}</p>
                    </div>
                </div>
            
            </div>
        </div>
    )
}

export default Footer