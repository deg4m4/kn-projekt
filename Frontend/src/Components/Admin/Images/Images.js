import React, { useState, useEffect } from 'react';
import './Images.scss';
import RightArrowgreen from '../../../assets/Sidebar/right-arrow.png'
import RightArrowGrey from '../../../assets/Sidebar/right-arrow-grey.png'
import SearchImage from '../../../assets/Sidebar/search.png'
import Dropdown from '../Form/Dropdown/Dropdown';
import Button from '../Form/Button/Button';
import Add from '../Add/Add';
import axios from 'axios';
import { conf } from '../../../conf/conf';
import Input from '../Form/Input/Input';
const Images = () => {
    const [section, setSection] = useState("All Templates")
    // Category Section
    const [categoryName, setcategoryName] = useState("")
    const [isAddShowed, setisAddShowed] = useState(false);
    // Add Image 
    const [templatesList, setTemplatesList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [Image, setImage] = useState(null)
    const [imageName, setImageName] = useState("")
    const [ImageType, setImageType] = useState("")
    // Handle submit of form 
    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("name", imageName)
        formData.append("type", ImageType)
        formData.append("image", Image)
        axios.post(conf.endPoint + "/api/images/add", formData, { withCredentials: true }).then(resp => {
            if (resp.data.status == true) {
                alert('Image added succefully!')
                fetchImages()
            }
        })
    }
    const handleInputs = (name, event) => {
        switch (name) {
            // for category section
            case "Image Name":
                setImageName(event.target.value)
                break;
            default:
                break;
        }
    }
    const handleItemClick = (value, name) => {
        switch (name) {
            case "Type":
                setImageType(value)
                break;
            default:
                break;
        }
    }
    // Fetching function
    const fetchImages = () => {
        axios.post(conf.endPoint + "/api/images/get", { data: { page: currentPage, limit: 4 } }).then((resp) => {
            var tempArray = [];
            for (let index = 0; index < resp.data.length; index++) {
                tempArray.push(resp.data[index])
            }
            setTemplatesList([...tempArray])
        })
    }
    /// Handle template remove 
    const HandleRemove = (name) => {
        axios.post(conf.endPoint + "/api/images/remove", { data: { name: name } }, { withCredentials: true }).then((resp) => {
            if (resp)
                fetchImages()
        })
    }
    // If  template add is loaded then we need to get the categories  
    useEffect(() => {
        fetchImages();
    }, [currentPage])
    return (
        <div className="admin__page">
            <div className="admin__users-head">
                <div className="admin__title">
                    <h2>Templates</h2>
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
                {/* Tabs */}
                <div className="admin__tabs">

                    {isAddShowed ?
                        <Button onClick={() => { setisAddShowed(false) }} type="outlined" value="Return" style={{ marginLeft: "auto" }} />
                        :
                        <Button onClick={() => { setisAddShowed(true) }} type="outlined" value="Add Image" style={{ marginLeft: "auto" }} />
                    }
                </div>
                {/* Table Stars */}
                {isAddShowed == false &&
                    <div className="admin__table">
                        {/* Table Head */}
                        <div className="admin__table-head">
                            <div className="admin__table-head--cell">
                                <span>Template</span>
                            </div>
                            <div className="admin__table-head--cell">
                                <span>Name</span>
                            </div>
                            <div className="admin__table-head--cell">
                                <span>Action</span>
                            </div>
                        </div>
                        {/* Table Body  */}
                        <div className="admin__table-body">
                            {templatesList.map((value, index) => (
                                <div className="admin__table-row">
                                    {/* Body Cell */}
                                    <div className="admin__table-body--cell  table__template-picture">
                                        <img src={conf.endPoint + "/api/images/sm/" + value.name.replace(/\s+/g, '')} />
                                    </div>
                                    <div className="admin__table-body--cell admin__table-body--cell---email ">
                                        <span>{value.name}</span>
                                    </div>
                                    <div className="admin__table-body--cell admin__table-body--cell---status">
                                        <div onClick={() => { HandleRemove(value.name) }} className="admin__table-status" style={{ backgroundColor: "#e74c3c" }}>
                                            Remove
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* If templates list empty show this */}
                        {templatesList.length == 0 && <div className="admin__table-footer">
                            No data found
                        </div>}
                        <div className="admin__table-footer">
                            <a onClick={() => { setCurrentPage((value) => value > 1 ? value - 1 : value) }}><img src={RightArrowGrey} className="mirror" alt="right" /></a>
                            <a> {currentPage} </a>
                            <a onClick={() => { setCurrentPage(value => value + 1) }}><img src={RightArrowgreen} alt="right" /></a>
                        </div>
                    </div>
                }
                {/* Table ends */}
                {/* Add templates */}
                {isAddShowed &&
                    <div className="images__add">
                        <div>
                            <h1>Add Image</h1>
                            <p>In here you can add image  that will be available for users to use in thier designs</p>
                        </div>
                        <Input handleInputs={handleInputs} name="Image Name" title="Image name" />
                        <Dropdown name="Type" value={ImageType} handleItemClick={handleItemClick} title="Type" items={["Picture", "Illustration"]} />
                        <div style={{ marginBottom: "30px", marginTop: "10px" }}>
                            <input title="image" onChange={(event) => { setImage(event.target.files[0]) }} type="file" name="image" />
                        </div>
                        <Button onClick={() => { setisAddShowed(false) }} style={{ marginRight: "10px", display: "inline" }} type="outlined" value="Return" />
                        <Button onClick={() => handleSubmit()} style={{ display: "inline" }} t type="default" value="Submit" />
                    </div>
                }
            </div>
        </div>
    )
}
export default Images
