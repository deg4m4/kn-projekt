import React from 'react'
import Pen from '../../../assets/images/pen.png'
import Duplicate from '../../../assets/images/duplicate.png'
import Download from '../../../assets/images/download.png'
const ProjectCard = () => {
    return (
        <div className="projects__item grid-2 mg-top-20">
        <div className="projects__item-thumbnailHolder flex-center">
            <div className="projects__item-thumbnail">

            </div>
        </div>
        <div className="projects__item-details flex-col">
            <span className="projects__item-name">Untitled</span>
            <span className="projects__item-date">Updated 22 Jun 2022</span>
            <ul className=" project__actionsList mg-top-20">
                <li className="project_item-action"><a href="#"> <img src={Pen} alt="action" />  Edit</a></li>
                <li className="project_item-action"><a  href="#">  <img src={Duplicate} alt="action" />  Duplicate</a></li>
                <li className="project_item-action"><a  href="#">  <img src={Download} alt="action" />  Download</a></li>

            </ul>
        </div>
        
    </div>
    )
}

export default ProjectCard
