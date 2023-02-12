import React, { useState,useEffect } from 'react'
import axios from 'axios';
import './Templates.scss';
import FacebookImage from '../../../assets/images/facebook.png'
import TwitterImage from '../../../assets/images/twitter.png'
import InstagramImage from '../../../assets/images/instagram.png'
import YoutubeImage from '../../../assets/images/youtube.png'
import BackImage from '../../../assets/images/back.png'
import { conf } from '../../../conf/conf';


const Templates = (props) => {

    const [selectedCategory, setselectedCategory] = useState("")
    const [templatesList,setTemplatesList] = useState([])
    const [isCategoriesShowed, setisCategoriesShowed] = useState(true)
   const [currentPage,setCurrentPage] = useState(1);
    const handleItemClick=(name)=>{
   
        if(name=="Custom"){
            props.setisModalShowed(true)
        }else{
            setselectedCategory(name)
         
            TemplatesByPlatform(name)
            setisCategoriesShowed(false)
        }
    }

    //// Get template by category
    const TemplatesByPlatform = (platform) =>{

        axios.post(conf.endPoint+"/api/templates/get/platform/"+platform.replace(" ","_"),{data:{page:currentPage,limit:10}}).then((resp)=>{
           setTemplatesList([... resp.data])
           if(resp.data){
           
           }
        })
    }

  const handleBackBtn = () => {
      setisCategoriesShowed(true)
  }


     //// Get More templates
     const MoreTemplates = (platform) =>{

        axios.post(conf.endPoint+"/api/templates/get/platform/"+platform.replace(" ","_"),{data:{page:currentPage+1,limit:10}}).then((resp)=>{
           setTemplatesList(list=>list.concat(resp.data))

        })
        setCurrentPage(currentpage=>currentpage+1)
    }


    return (
        <div id="templatesList" className="sidebar__templatesList">

            {isCategoriesShowed == true ?
                <div  className="sidebar__templatesList-cats">
                     {/* Category item */}
                     <div onClick={()=>handleItemClick("Custom")} className="sidebar__templatesList-cat">
                         <span className="sidebar__plusSign">+</span>
                         <span>Empty Project</span>
                     </div>
                        {/* Category item */}
                        <div onClick={()=>{handleItemClick("Facebook Post")}}  className="sidebar__templatesList-cat">
                            <div className="sidebar__templatesList-catWrap">
                                <div className="sidebar__templatesList-cat-image">
                                    <img src={FacebookImage} />
                                </div>
                                <div className="sidebar__templatesList-cat-name">Facebook Post</div>
                            </div>
                     </div>

                         {/* Category item */}
                         <div onClick={()=>{handleItemClick("Facebook Story")}}  className="sidebar__templatesList-cat">
                            <div className="sidebar__templatesList-catWrap">
                                <div className="sidebar__templatesList-cat-image">
                                    <img src={FacebookImage} />
                                </div>
                                <div className="sidebar__templatesList-cat-name">Facebook Story</div>
                            </div>
                     </div>

                         {/* Category item */}
                         <div onClick={()=>{handleItemClick("Instagram Post")}}  className="sidebar__templatesList-cat">
                            <div className="sidebar__templatesList-catWrap">
                                <div className="sidebar__templatesList-cat-image">
                                    <img src={InstagramImage} />
                                </div>
                                <div className="sidebar__templatesList-cat-name">Instagram Post</div>
                            </div>
                     </div>

                     
                         {/* Category item */}
                         <div onClick={()=>{handleItemClick("Twitter Post")}}  className="sidebar__templatesList-cat">
                            <div className="sidebar__templatesList-catWrap">
                                <div className="sidebar__templatesList-cat-image">
                                    <img src={TwitterImage} />
                                </div>
                                <div className="sidebar__templatesList-cat-name">Twitter Post</div>
                            </div>
                     </div>

                        {/* Category item */}
                        <div onClick={()=>{handleItemClick("Youtube Thumbnail")}}  className="sidebar__templatesList-cat">
                            <div className="sidebar__templatesList-catWrap">
                                <div className="sidebar__templatesList-cat-image">
                                    <img src={YoutubeImage} />
                                </div>
                                <div className="sidebar__templatesList-cat-name">Youtube Thumbnail</div>
                            </div>
                     </div>

                </div>
                :
                <div className="sidebar__templatesList-items">
                    {/* Head */}
                    <div className="sidebar__templatesList-items-head">
                        <span>Templates</span>
                        <img onClick={()=>handleBackBtn()} src={BackImage} alt="back" />
                    </div>
                    {/* List of Templates */}
                    <div className="sidebar__templatesList-items-body">
                    {templatesList.map((value,index)=>{
                         return   <div onClick={()=>props.handleTemplateClickEditor(value.name)} className="sidebar__templatesList-item">
                            <img src={conf.endPoint+"/api/templates/images/md/"+value.name.replace(/\s/g, '')}/>
                     </div>
                    })}
                    
                    </div>
                    <div onClick={()=>{MoreTemplates(selectedCategory)}} className="sidebar__templatesList-more">
                        <a>More Templates</a>
                    </div>
                </div>
            }

        </div>
    )
}

export default Templates
