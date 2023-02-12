import React from 'react'
import './AdminSidebar.scss';
import HomeImage from '../../../assets/Sidebar/home.png'
import DashboardImage from '../../../assets/Sidebar/dashboard.png'
import UserImage from '../../../assets/Sidebar/users.png'
import TemplatesImage from '../../../assets/Sidebar/layout.png'
import ImagesImage from '../../../assets/Sidebar/Images.png'
import SettingsImage from '../../../assets/Sidebar/Settings.png'
import MenuImage from '../../../assets/Sidebar/menu.png'
import MailImage from '../../../assets/Sidebar/mail.png'
import { Link } from 'react-router-dom';
const AdminSidebar = () => {
    return (
        <div className="admin__sidebar">
            {/* Sidebar Head */}
            <div className="admin__sidebar-head">
                <span>Admin Panel</span>
            </div>
            {/* Sidebar Body */}
            <div className="admin__sidebar-body">
                {/* List */}
                <ul>
                    {/* Sidebar Item */}
                    <li>
                        <Link to={"/members"}>
                            <div className="admin__sidebar-item">
                                <div className="admin__sidebar-item--icon" >
                                    <img src={HomeImage} alt={"icon"} />
                                </div>
                                Home
                            </div>
                        </Link>
                    </li>
                    {/* Sidebar Item */}
                    <li>
                        <Link to={"/admin/"}>
                            <div className="admin__sidebar-item">
                                <div className="admin__sidebar-item--icon" >
                                    <img src={UserImage} alt={"icon"} />
                                </div>
                                Users
                            </div>
                        </Link>
                    </li>
                    {/* Sidebar Item */}
                    <li>
                        <Link to={"/admin/templates"}>
                            <div className="admin__sidebar-item">
                                <div className="admin__sidebar-item--icon" >
                                    <img src={TemplatesImage} alt={"icon"} />
                                </div>
                                Templates
                            </div>
                        </Link>
                    </li>
                    {/* Sidebar Item */}
                    <li>
                        <Link to={"/admin/images"}>
                            <div className="admin__sidebar-item">
                                <div className="admin__sidebar-item--icon" >
                                    <img src={ImagesImage} alt={"icon"} />
                                </div>
                                Images
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
            {/* Footer */}
            <div className="admin__sidebar-footer">
                
            </div>
        </div>
    )
}
export default AdminSidebar
