import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AdminSidebar from '../Sidebar/AdminSidebar';
import { Route } from 'react-router-dom'
import './Main.scss';
import Users from '../Users/Users';
import Templates from '../Templates/Templates';
import Images from '../Images/Images';
import { conf } from '../../../conf/conf';

const Main = () => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        axios.post(conf.endPoint + "/api/auth/check",
            {},
            { withCredentials: true }
        ).then((resp) => {
            if (resp.data.user == undefined || resp.data.user.role !== "admin") {
                window.location.href = "/auth"
            } else {
                setUser(resp.data.user)
            }
        })
    }, []);
    return (
        user !== null && user.role === "admin" ?
            <div className="admin">
                {/* Sidebar */}
                <AdminSidebar />
                {/* Content */}
                <div className="admin__content">
                    {/* <Dashboard /> */}
                    <Route exact path={"/admin"} component={Users} />
                    <Route path={"/admin/templates"} component={Templates} />
                    <Route path={"/admin/Images"} component={Images} />
                </div>
            </div>
            : "Unauthorazied"
    )
}
export default Main
