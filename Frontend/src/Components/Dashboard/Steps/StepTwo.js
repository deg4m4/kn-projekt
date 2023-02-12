import React, { useState } from 'react'
import Dropdown from '../../Form/Dropdown/Dropdown'

const StepTwo = (props) => {

    const [type, setType] = useState("");
    const [category, setCategory] = useState("");

    const Types = [
        { id: "1", name: "Thank you" },
        { id: "2", name: "Opt In" },
        { id: "3", name: "Registration" },
        { id: "4", name: "News" },
    ];

    const Categories = [
        { id: "1", name: "Thank you" },
        { id: "2", name: "Opt In" },
        { id: "3", name: "Registration" },
        { id: "4", name: "News" },
    ];

    const handleInputs = (value, name) => {
        switch (name) {
            case "Type":
                  setType(value)

            break;
            case "Category":
                setCategory(value)
                console.log(name + " " + category)
            break;
            default:
            break;
        }
    }

    return (
        <div className="steps__step2">
            {/* header */}
            <div className="steps__categoriesHeader ">
                {/* header left side Btn */}
                <div className="steps__categoriesBtn flex-center weight-600">
                    Empty Project
               </div>
                {/* Header RIght side selectboxes */}
                <div className="steps__categories-right">
                    <div className="steps_categories-type">
                        <div className="steps_typeName">Type</div>
                        <Dropdown
                            id="drop1"
                            name="Type"
                            handleInputs={handleInputs}
                            elements={Types}
                        />
                    </div>
                    <div className="steps_categories-type">
                        <div className="steps_typeName">Category</div>
                        <Dropdown
                            id="drop2"
                            name="Category"
                            handleInputs={handleInputs}
                            elements={Categories }
                        />
                    </div>
                </div>
            </div>
            {/* Body */}
            <div className="steps__step2-templates grid-4 mg-top-50">
                <div  onClick={()=>props.nextStep()} className="steps__templateItem">
                    <div className="steps__template">
                    </div>
                </div>
                <div className="steps__templateItem">
                    <div className="steps__template">
                    </div>
                </div>
                <div className="steps__templateItem">
                    <div className="steps__template">
                    </div>
                </div>
                <div className="steps__templateItem">
                    <div className="steps__template">
                    </div>
                </div>
                <div className="steps__templateItem">
                    <div className="steps__template">
                    </div>
                </div>
                <div className="steps__templateItem">
                    <div className="steps__template">
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default StepTwo
