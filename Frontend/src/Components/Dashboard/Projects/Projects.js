import React from 'react'
import {Link} from 'react-router-dom'
import './Projects.scss'
import ProjectCard from './ProjectCard'
const Projects = () => {
    return (
        <div className="container-tight">
              <div className="body__title">
                  <div className="body__titleHolder">
                  <h2>Dashboard</h2>
                  <Link to="/members/create" className="btn__addNew "> + Create new</Link>
                  </div>
                  <div className=" hr mg-top-20" />
              </div>
              {/* Projects list */}
              <div className="projects__list grid-2 mg-top-40" >
                  <ProjectCard />
                  <ProjectCard />
                  <ProjectCard />
                  <ProjectCard />
                  <ProjectCard />

 

              </div>
        </div>
    )
}

export default Projects
