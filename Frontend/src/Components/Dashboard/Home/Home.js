import React, { useEffect, useRef } from 'react'
import axios from 'axios'
import './Home.scss';
import Logo from '../../../assets/images/logo.png'
import ProfileImage from '../../../assets/images/cogwheel.png'
import Templates from '../Templates/Templates';
import TemplatePreview from '../TemplatePreview/TemplatePreview';
import Steps from '../Steps/Steps';
import { Link, Route, Switch } from 'react-router-dom'
import Editor from '../../Editor/Editor';
import Categories from '../Categories/Categories';
import { conf } from '../../../conf/conf';
import { useState } from 'react';
import Settings from '../Settings/Settings';

import Menu from '../../../assets/images/menu.png';
import { Analytics } from '../../../conf/analytics';
const Home = (props) => {


    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [user, setUser] = useState(null)
    const menuRef = useRef();
    const menuRightRef = useRef();

    useEffect(() => {
        Analytics()
        axios.post(conf.endPoint+"/api/auth/check",
            {},
            { withCredentials: true }
        ).then((resp) => {
            if (resp.data.status !== "logged in") {
                setIsLoggedIn(false)
                window.location.href = '/auth'
            } else if (resp.data.status == "logged in") {
                setUser(resp.data.user)
                setIsLoggedIn(true)
            }
        })
    }, []);
    useEffect(() => {
        console.log(user);
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
    // Handle Menu Click 
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
        isLoggedIn == true ?
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

                            <li><Link to="/members">Dashboard</Link></li>
                            <li><Link to="/members/templates/all">Templates</Link></li>
                            <li><Link onClick={()=>logout()} >Logout</Link></li>

                        </ul>
                    </div>
                    {/* Navigation Right */}
                    <div ref={menuRightRef} className="dashboard__navigation hidden">
                        <ul>
                            <li><Link to="/members/settings">My Account<img src={ProfileImage} alt="open" /> </Link></li>
                        </ul>
                    </div>
                    {/* Menu toggle (Mobile) */}


                </div>
                {/* Body */}
                <div className="dashboard__body">
                    <Switch>
                        <Route path={"/members/editor/:id"} render={(props) => <Editor monthly={"monthly"} user={user} />} />
                        <Route path={"/members/templates/:platform"} component={Templates} />
                        <Route path={"/members/settings"} render={(props) => <Settings user={user} {...props} />} />
                        <Route path={"/members/preview"} component={TemplatePreview} />
                        <Route path={"/members/create"} component={Steps} />
                        <Route path={"/members"} component={Categories} />
                    </Switch>

                </div>


            </div> : <div> </div>


    )
}

export default Home