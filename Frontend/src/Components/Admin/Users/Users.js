import React, { useState, useEffect } from 'react';
import './Users.scss';
import RightArrowgreen from '../../../assets/Sidebar/right-arrow.png'
import RightArrowGrey from '../../../assets/Sidebar/right-arrow-grey.png'
import axios from "axios";
import SearchImage from '../../../assets/Sidebar/search.png';
import { conf } from '../../../conf/conf';
import Input from '../Form/Input/Input';
import Dropdown from '../Form/Dropdown/Dropdown';
import Button from '../Form/Button/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Users = () => {
    const [users, setUsers] = useState([]);
    const [currentStep, setCurrentStep] = useState("All Users");
    const [currentPage, setCurrentPage] = useState(1);
    const [editUserShowed, setEditUserShowed] = useState(false)
    // edit form holders
    const [userEmail, setuserEmail] = useState("")
    const [userPlan, setuserPlan] = useState("")
    const [userSubscriptionEnds, setuserSubscriptionEnds] = useState("")
    const [userRole, setuserRole] = useState("")
    const handleInputs = (name, event) => {
        switch (name) {
            case "Email":
                setuserEmail(event.target.value)
                break;
            case "Subscription Ends":
                setuserSubscriptionEnds(event.target.value)
                break;
            default:
                break;
        }
    }
    // Dropdown
    const handleItemClick = (value, name) => {
        switch (name) {
            case "Plan":
                setuserPlan(value)
                break;
            case "Role":
                setuserRole(value)
                break;
            default:
                break;
        }
    }
    // Handle Table Item click 
    const handleTableItemClick = (value) => {
        setEditUserShowed(true)
        setuserEmail(value.email)
        setuserRole(value.role)
        setuserSubscriptionEnds(value.subcrtiptionEnds)
        setuserPlan(value.plan)
    }
    useEffect(() => {
        axios.post(conf.endPoint + "/api/auth/users/get/all", {
            data: {
                page: currentPage,
                limit: 10
            }
        }, { withCredentials: true }).then((resp) => {
            setUsers(resp.data)
        })
    }, [currentPage])
    // Handle submit of edit form 
    const handleSubmitForm = () => {
        axios.post(conf.endPoint + "/api/auth/edit/user/admin", {
            data: {
                plan: userPlan,
                subcrtiptionEnds: userSubscriptionEnds,
                role: userRole
            }
        }, { withCredentials: true }).then((resp) => {
            window.location.reload()
        })
    }
    // Handle top bar filter click
    const handleFilterClick = (filter) => {
        axios.post(conf.endPoint + "/api/auth/users/get/" + filter, {
            data: {
                page: currentPage,
                limit: 10,
            }
        }, { withCredentials: true }).then((resp) => {
            setUsers(resp.data)
        })
    }
    return (
        <div className="admin__page">
            <div className="admin__users-head">
                <div className="admin__title">
                    <h2>Users</h2>
                </div>
                {/* Search Button  */}
                <div className="admin__users-searchWrapper">
                    {/* Search Input */}
                    <div className="admin__users-search">
                        <img src={SearchImage} />
                        <input />
                    </div>
                    {/* Search Button */}
                    <a className="search-btn">Search</a>
                </div>
            </div>
            {/* Table of users */}
            <div className="admin__users-body">

                {editUserShowed == false &&
                    <div className="admin__table">
                        {/* Table Head */}
                        <div className="admin__table-head">
                            <div className="admin__table-head--cell">
                                <span>_id</span>
                            </div>
                            <div className="admin__table-head--cell">
                                <span>Email</span>
                            </div>
                            <div className="admin__table-head--cell">
                                <span>Status</span>
                            </div>
                            <div className="admin__table-head--cell">
                                <span>Date of registration</span>
                            </div>
                            <div className="admin__table-head--cell">
                                <span>Role</span>
                            </div>
                        </div>
                        {/* Table Body  */}
                        <div className="admin__table-body">
                            {users.map((value, index) => (
                                <div onClick={() => handleTableItemClick(value)} className="admin__table-row">
                                    {/* Body Cell */}
                                    <div className="admin__table-body--cell">
                                        <span>{value._id}</span>
                                    </div>
                                    <div className="admin__table-body--cell admin__table-body--cell---email ">
                                        <div className="email__avatar" style={{ backgroundColor: "black" }}>
                                            {value.email.substr(0, 2)}
                                        </div>
                                        <span>{value.email}</span>
                                    </div>
                                    <div className="admin__table-body--cell admin__table-body--cell---status">
                                        <div className="admin__table-status" style={{ backgroundColor: "black" }}>
                                            {value.plan}
                                        </div>
                                    </div>
                                    <div className="admin__table-body--cell">
                                        <span>{value.creadtedAt}</span>
                                    </div>
                                    <div className="admin__table-body--cell">
                                        <span>{value.role}</span>
                                    </div>
                                </div>
                            ))}
                            {users.length == 0 && <div className="admin__table-footer">
                                No data found
                            </div>}
                        </div>
                        <div className="admin__table-footer">
                            <a onClick={() => setCurrentPage(value => value > 1 ? value - 1 : value)}> <img src={RightArrowGrey} className="mirror" alt="right" /></a>
                            <a> {currentPage}</a>
                            <a onClick={() => setCurrentPage(value => value + 1)}><img src={RightArrowgreen} alt="right" /></a>
                        </div>
                    </div>
                }
                {/* Edit user form  */}
                {editUserShowed == true &&
                    <div className="edit__user">
                        <h2>Edit User</h2>
                        <p>In here you can change the details of a selected user</p>
                        <Input handleInputs={handleInputs} value={userEmail} name="Email" title="Email" />
                        <Dropdown handleItemClick={handleItemClick} value={userPlan} title="Plan" name="Plan" items={["Free", "Premium"]} />
                        <div>  <span>Subscription ends</span> </div>
                        <DatePicker className=" admin__input  admin__datePicker" selected={Date.parse(userSubscriptionEnds)} onChange={(date) => setuserSubscriptionEnds(date)} />
                        <Dropdown handleItemClick={handleItemClick} value={userRole} name="Role" title="Role" items={["admin", "user"]} />
                        <Button onClick={() => { setEditUserShowed(false) }} style={{ display: "inline-block", marginTop: "10px", marginRight: "10px" }} type="outlined" value="Return" />
                        <Button onClick={() => { handleSubmitForm() }} style={{ display: "inline-block", marginTop: "10px" }} type="default" value="Save" />
                    </div>
                }
            </div>
        </div>
    )
}
export default Users
