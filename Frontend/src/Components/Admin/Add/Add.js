import React, { useState, useEffect } from 'react'
import './Add.scss';
import Input from '../Form/Input/Input';
import Dropdown from '../Form/Dropdown/Dropdown';
import Button from '../Form/Button/Button';
import axios from 'axios';
import { conf } from '../../../conf/conf';
const Add = (props) => {
    /// State
    // Category Section
    const [categoryName, setcategoryName] = useState("")
    // Template  Section
    const handleInputs = (name, event) => {
        props.handleInputs(name, event)
    }
    // Handle dropdown Click
    const handleItemClick = (value, name) => {
        props.handleItemClick(value, name)
    }
    // Handle cat submit
    const handleCatSubmit = () => {
        axios.post(conf.endPoint + "/api/categories/add", { data: { categoryName: props.categoryName } }, { withCredentials: true }).then((resp) => {
            if (resp.data.status == true) {
                alert("Category added!")
            }
        })
    }
    return (
        <div className="admin__add">
            {props.type == "template" &&
                <div className="admin__addTemplates">
                    <Input handleInputs={handleInputs} name="TemplateName" title={"Template Name*:"} />
                    <Input handleInputs={handleInputs} name="Json" type="textarea" title={"Json*:"} />
                    <Dropdown handleItemClick={handleItemClick} value={props.selectedPlatform} name="Platform" title="Platform*:" items={["Facebook Post", "Instagram Post", "Twitter Post", "Youtube Thumbnail", 'Custom']} />
                    {props.selectedPlatform == 'Custom' &&
                        <>
                            <Input handleInputs={handleInputs} value={props.selectedWidth} name="Width" title={"Width:"} />
                            <Input handleInputs={handleInputs} value={props.selectedHeight} name="Height" title={"Height:"} />
                        </>
                    }
                    <p style={{ marginTop: "10px" }} >Image:</p>
                    <input title="image" onChange={(event) => { props.setFileChanged(event.target.files[0]) }} type="file" name="image" />
                    <Button style={{ marginTop: "20px" }} onClick={() => { props.handleTemplateSubmit() }} type="default" value="Add" />
                </div>
            }
            {props.type == "category" &&
                <div className="admin__addTemplates">
                    <Input handleInputs={handleInputs} value={props.categoryName} name="CategoryName" title={"Category Name:"} />
                    <Button onClick={() => { handleCatSubmit() }} type="default" value="Add" />
                </div>
            }
        </div>
    )
}
export default Add
