import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router'
import './Templates.scss'
import { conf } from '../../../conf/conf';
import { Link } from 'react-router-dom';
const Templates = (props) => {
    const [templates, setTemplates] = useState([]);
    const [currentPage, setcurrentPage] = useState(1)
    let { platform } = useParams();

    useEffect(() => {
        axios.post(conf.endPoint + "/api/templates/get/platform/" + platform, { data: { page: currentPage, limit: 10 } }).then((resp) => {
            setTemplates(resp.data)
        })
    }, [currentPage])
    return (
        <div className="container-tight">
            <div className="body__title">
                <div className="body__titleHolder">
                    <h2>Templates</h2>
                    <div>
                        <Link to={"/members"} className="btn__addNew-outlined "> Return</Link>

                        <Link  to={"/members"}  className="btn__addNew "> + Create new</Link>

                    </div>
                </div>
                <div className=" hr mg-top-20" />
            </div>
            {/* Projects list */}
            <div className="projects__list grid-4 mg-top-40" >
                {/* template Item */}
                {/* Col */}
                {templates.map((item, index) => {
                    return <div className="template_platformItem">
                        <img src={conf.endPoint + "/api/templates/images/md/" + item.name.replace(/\s+/g, '')} />
                        <div className="categories__templateItem-overlay">
                            <Link to={"/members/editor/" + item.name} >
                                <div className="categories__templateItem-btn">
                                    Select
                                  </div>
                            </Link>
                        </div>
                    </div>
                })}
            </div>
            <div className="templates__pagination-wrapper">
                <div className="templates__pagination">
                    <div onClick={()=>{setcurrentPage((value)=> value>1 ? (value-1) : value) }} className="templates__pagination-step">
                        Previous
                    </div>
                    <div className="templates__pagination-pagenumber">
                        {currentPage}
                    </div>
                    <div onClick={()=>{setcurrentPage((value)=>(value+1))}} className="templates__pagination-step">
                        Next
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Templates
