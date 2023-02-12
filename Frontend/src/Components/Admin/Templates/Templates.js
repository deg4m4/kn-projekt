import React, { useState, useEffect } from 'react';
import './Templates.scss';
import RightArrowgreen from '../../../assets/Sidebar/right-arrow.png'
import RightArrowGrey from '../../../assets/Sidebar/right-arrow-grey.png'
import SearchImage from '../../../assets/Sidebar/search.png'
import Dropdown from '../Form/Dropdown/Dropdown';
import Button from '../Form/Button/Button';
import Add from '../Add/Add';
import axios from 'axios';
import { conf } from '../../../conf/conf';
const Templates = () => {
    const [section, setSection] = useState("All Templates")
    // Category Section
    const [categoryName, setcategoryName] = useState("")
    const [isAddShowed, setisAddShowed] = useState(false);
    // Add Section
    const [TemplateImage, setTemplateImage] = useState(null);
    const [categoriesList, setCategoriesList] = useState([]);
    const [selectedCat, setSelectedCat] = useState("")
    const [selectedStatus, setSelectedStatus] = useState("Published")
    const [selectedPlatform, setSelectedPlatform] = useState("")
    const [selectedPlan, setSelectedPlan] = useState("Free")
    const [templateName, setTemplateName] = useState("")
    const [templateJson, setTemplateJson] = useState("")
    const [selectedWidth, setselectedWidth] = useState("")
    const [selectedHeight, setselectedHeight] = useState("")
    // Templates Section 
    const [templatesList, setTemplatesList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    // Handle submit of form 
    const handleSubmit = () => {
        if (templateName !== '' || selectedPlan !== '' || selectedPlatform !== '' || selectedStatus !== '' || templateJson !== '') {
            const formData = new FormData();
            formData.append("name", templateName)
            formData.append("platform", selectedPlatform)
            formData.append("json", templateJson)
            formData.append("status", selectedStatus)
            formData.append("plan", selectedPlan)
            formData.append("category", selectedCat)
            formData.append("dimentions", selectedWidth + 'x' + selectedHeight)
            formData.append("image", TemplateImage)
            axios.post(conf.endPoint + "/api/templates/add", formData, { withCredentials: true }).then(resp => {
                if (resp.data.status == true) {
                    alert('Template added succefully')
                    fetchTemplates()
                }
            })
        } else {
            alert('Make sure you fill all necessary fields!')
        }
    }
    const handleInputs = (name, event) => {
        switch (name) {
            // for category section
            case "CategoryName":
                setcategoryName(event.target.value)
                break;
            // For templates section
            case "TemplateName":
                setTemplateName(event.target.value)
                break;
            case "Json":
                console.log(123);   
                setTemplateJson(event.target.value)
                break;
            case "Width":
                setselectedWidth(event.target.value)
                break;
            case "Height":
                setselectedHeight(event.target.value)
                break;
            default:
                break;
        }
    }
    const handleItemClick = (value, name) => {
        switch (name) {
            case "Category":
                setSelectedCat(value)
                break;
            case "Status":
                setSelectedStatus(value)
                break;
            case "Plan":
                setSelectedPlan(value)
                break;
            case "Platform":
                setSelectedPlatform(value)
                break;
            default:
                break;
        }
    }
    const fetchTemplates = () => {
        axios.post(conf.endPoint + "/api/templates/" + section, { data: { page: currentPage, limit: 4 } }).then((resp) => {
            var tempArray = [];
            for (let index = 0; index < resp.data.length; index++) {
                tempArray.push(resp.data[index])
            }
            setTemplatesList([...tempArray])
        })
    }
    /// Handle template remove 
    const HandleRemove = (name) => {
        axios.post(conf.endPoint + "/api/template/remove", { data: { name: name } }, { withCredentials: true }).then((resp) => {
            // refetch after delete
            if (resp)
                fetchTemplates()
        })
    }
    // If  template add is loaded then we need to get the categories  
    useEffect(() => {
        fetchTemplates()
        // Get list of templates 
        // Get categories for add form
        axios.post(conf.endPoint + "/api/categories/all").then((resp) => {
            var tempArray = [];
            for (let index = 0; index < resp.data.length; index++) {
                tempArray.push(resp.data[index].name)
            }
            setCategoriesList(tempArray)
        })
    }, [section, currentPage])
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
                        <Button onClick={() => { setisAddShowed(true) }} type="outlined" value="Add Template" style={{ marginLeft: "auto" }} />
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
                                <span>Subscription</span>
                            </div>
                            <div className="admin__table-head--cell">
                                <span>Platform</span>
                            </div>
                            <div className="admin__table-head--cell">
                                <span>Expiration Date</span>
                            </div>
                            <div className="admin__table-head--cell">
                                <span>Status</span>
                            </div>
                        </div>
                        {/* Table Body  */}
                        <div className="admin__table-body">
                            {templatesList.map((value, index) => (
                                <div className="admin__table-row">
                                    {/* Body Cell */}
                                    <div className="admin__table-body--cell  table__template-picture">
                                        <img src={conf.endPoint + "/api/templates/images/sm/" + value.name.replace(/\s+/g, '')} />
                                    </div>
                                    <div className="admin__table-body--cell admin__table-body--cell---email ">
                                        <span>{value.name}</span>
                                    </div>
                                    <div className="admin__table-body--cell admin__table-body--cell---status">
                                        <div className="admin__table-status" style={value.plan == "Premium" ? { backgroundColor: "black" } : { backgroundColor: "unset", border: "2px solid black", color: "black" }}>
                                            {value.plan}
                                        </div>
                                    </div>
                                    <div className="admin__table-body--cell">
                                        <span>{value.platform}</span>
                                    </div>
                                    <div className="admin__table-body--cell">
                                        <span>{value.status}</span>
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
                    <Add
                        categoriesList={categoriesList}
                        selectedCat={selectedCat}
                        selectedPlatform={selectedPlatform}
                        selectedPlan={selectedPlan}
                        selectedStatus={selectedStatus}
                        selectedWidth={selectedWidth}
                        selectedHeight={selectedHeight}
                        categoryName={categoryName}
                        handleTemplateSubmit={handleSubmit}
                        setFileChanged={setTemplateImage}
                        handleInputs={handleInputs}
                        handleItemClick={handleItemClick}
                        type={"template"}
                    />
                }
            </div>
        </div>
    )
}
export default Templates
