import React, { useEffect, useRef } from 'react'
import axios from 'axios'
import Logo from '../../../assets/images/logo.png'
import ProfileImage from '../../../assets/images/cogwheel.png'
import Templates from '../Templates/Templates';
import TemplatePreview from '../TemplatePreview/TemplatePreview';
import Steps from '../Steps/Steps';
import { Link, Route } from 'react-router-dom'
import Editor from '../../Editor/Editor';
import Categories from '../Categories/Categories';
import { conf } from '../../../conf/conf';
import { useState } from 'react';
import Settings from '../Settings/Settings';
import Upgrade from '../../Upgrade/Upgrade';
import Footer from '../Footer/Footer';
import Page from '../Page/Page';
import Contact from '../../Contact/Contact';
import Menu from '../../../assets/images/menu.png';

const Public = (props) => {


    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const menuRef = useRef();
    const menuRightRef = useRef();
    const [user, setUser] = useState(null)
    const { meta } = props


    useEffect(() => {

        axios.post(conf.endPoint+"/api/auth/check",
            {},
            { withCredentials: true }
        ).then((resp) => {
            if (resp.data.status !== "logged in") {
                setIsLoggedIn(false)

            } else if (resp.data.status == "logged in") {
                setUser(resp.data.user)
                setIsLoggedIn(true)
            }
        })

        // console.log(meta);


    }, []);

    useEffect(() => {
        // console.log(user);
    }, [user])

    // handlng logout

    const logout = () => {
        axios.post(conf.endPoint + "/api/auth/logout", {}, { withCredentials: true }
        ).then((resp) => {
            console.log(resp);
            if (resp.data.status == "logged out") {
                window.location.href = "/auth";
            }
        })
    }


    const MenuClick = () => {
        if (menuRef.current.classList.contains('hidden')) {
            menuRef.current.classList.remove('hidden')
        } else {
            menuRef.current.classList.add('hidden')
        }

        if (menuRightRef.current.classList.contains('hidden')) {
            menuRightRef.current.classList.remove('hidden')
        } else {
            menuRightRef.current.classList.add('hidden')
        }

    }



    return (
        <div className="dashboard flex-col" >
            {/* Head */}
            <div className="dashboard__head flex  flex">
                {/* Brand */}
                <div className="brand">
                    <img src={Logo} alt="logo" />
                    <div className='mobile__toggle'>
                        <img onClick={() => { MenuClick() }} src={Menu} alt='menu' />
                    </div>
                </div>
                {/* Navigation Middle */}
                <div ref={menuRef} className="dashboard__navigation hidden">
                    <ul>
                        <li>
                            {user !== null && user.role == "admin" && <Link to={"/admin"} href="#" > Admin</Link>}
                        </li>
                        {meta.subscription == true && <li>
                            <Link to={"/members/upgrade"} href="#" > <div className="small-highlight">pro</div> Upgrade</Link>
                        </li>}
                        <li><Link to="/members">Dashboard</Link></li>
                        <li><Link to="/members/templates/all">Templates</Link></li>
                        <li><Link to="/contact">Contact us</Link></li>

                    </ul>
                </div>
                {/* Navigation Right */}
                <div ref={menuRightRef} className="dashboard__navigation hidden">
                    <ul>
                        <li><Link to="/members/settings">My Account<img src={ProfileImage} alt="open" /> </Link></li>
                    </ul>
                </div>
            </div>
            {/* Body */}
            <div className="dashboard__body">
                {/* Body head */}
                <Route path={"/p/:name"} component={Page} />
                <Route exact path={"/upgrade"} render={(props) => <Upgrade {...props} meta={meta} />} />
                <Route exact path={"/contact"} component={Contact} />

            </div>
            <Footer desc={props.desc} />

        </div>


    )
}

export default Public