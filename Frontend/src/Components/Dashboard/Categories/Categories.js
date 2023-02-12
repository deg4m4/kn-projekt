import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { conf } from '../../../conf/conf'
import './Categories.scss'

import FacebookImage from '../../../assets/images/facebook.png'
import InstagramImage from '../../../assets/images/instagram.png'
import Heart from '../../../assets/images/heart.png'
import HeartActive from '../../../assets/images/heartActive.png'

import FacebookLike from '../../../assets/images/like.png';
import YoutubeImage from '../../../assets/images/youtube.png';
import TwitterImage from '../../../assets/images/twitter.png';

import FacebookLikeActive from '../../../assets/images/likeActive.png';
import CommentImage from '../../../assets/images/comment.png';
import AddImage from '../../../assets/images/addCat.png';
import Crown from '../../../assets/images/crown.png'

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'

const Categories = () => {
    const [mouseOverDiv, setMousOverDiv] = useState("");
    const [templates, setTemplates] = useState([]); // This one will hold templates in the first carousel (Limited Number)
    const [facebookPostTemplates, setfacebookPostTemplates] = useState([])
    const [InstagramPostTemplates, setInstagramPostTemplates] = useState([])
    const [twitterPostTemplates, settwitterPostTemplates] = useState([])
    const [YouubeThumbnailTemplates, setYouubeThumbnailTemplates] = useState([])

    const [categories, setCategories] = useState(["Facebook Post", "Instagram Post", "Youtube Thumbnail", "Twitter Post"])
    const [isMoreTemplatesShowed, setIsMoreTemplatesShowed] = useState(false)


    const categoryHoverEnter = (categoryName) => {
        setMousOverDiv(categoryName)
    }
    const categoryHoverLeave = () => {
        setMousOverDiv("")
    }

    // Handle More button Click 

    const handleMoreBtnClick = () => {
        axios.post(conf.endPoint + "/api/templates/get/published").then((resp) => {
            var tempFacebookPost = []
            var tempTwitterPost = []
            var tempInstagramPost = []
            var tempYoutubeThumbnail = []
            /// Here we need to send each template to its section (Fb Youtube Twitter)
            for (let index = 0; index < resp.data.length; index++) {
                if (resp.data[index].platform == "Facebook Post") {
                    tempFacebookPost.push(resp.data[index])
                } else if (resp.data[index].platform == "Instagram Post") {
                    tempInstagramPost.push(resp.data[index])

                } else if (resp.data[index].platform == "Twitter Post") {
                    tempTwitterPost.push(resp.data[index])

                } else if (resp.data[index].platform == "Youtube Thumbnail") {
                    tempYoutubeThumbnail.push(resp.data[index])
                }
            }
            setfacebookPostTemplates(tempFacebookPost)
            setInstagramPostTemplates(tempInstagramPost)
            settwitterPostTemplates(tempTwitterPost)
            setYouubeThumbnailTemplates(tempYoutubeThumbnail)
        })
        setIsMoreTemplatesShowed(true)
    }

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    useEffect(() => {
        axios.post(conf.endPoint + "/api/templates/get/dashboard", { data: { page: 1, limit: 10 } }).then((resp) => {
            setTemplates(resp.data)
        })
    }, [])



    return (
        <>
            <div className="dashboard__categories">

                {/* <div className="categories__topBanner">
                Create Designs On the fly
            </div> */}

                <div className="categories__title">
                    Projects
                </div>

                <Carousel

                    responsive={responsive}
                    responsive={responsive}
                    containerClass="categories__classes"
                    itemClass="categories__itemClass"

                >
                    <a href="/members/editor/custom">
      {/* Category Item : Facebook */}
      <div className="dashboard__categoryWrapper">
                        <div className=" dashboard__category category__facebook">

                            <div className="dashboard__category-body dashboard__category-bodyCustom ">
                                <img src={AddImage} alt="facebook image" />
                            </div>

                        </div>
                        Custom Size
                    </div>
                    </a>
              
                    {/* Category Item : Facebook */}
                    <a className="categories__link" href="/members/editor/Facebook_Post">
                        <div className="dashboard__categoryWrapper">
                            <div onMouseLeave={() => { categoryHoverLeave() }} onMouseEnter={() => { categoryHoverEnter("Facebook Post") }} className=" dashboard__category category__facebook">
                                <div className="dashboard__category-head">
                                </div>
                                <div className="dashboard__category-body">
                                    <img src={FacebookImage} alt="facebook image" />
                                </div>
                                <div className="dashboard__category-footer">
                                    <img src={mouseOverDiv == "Facebook Post" ? FacebookLikeActive : FacebookLike} />          <img src={CommentImage} />
                                </div>
                            </div>
                            Facebook Post
                        </div>
                    </a>


                    {/* Category Item : Instagram */}
                    <a className="categories__link" href="/members/editor/Instagram_Post">
                        <div className="dashboard__categoryWrapper">
                            <div onMouseLeave={() => { categoryHoverLeave() }} onMouseEnter={() => { categoryHoverEnter("Instagram Post") }} className=" dashboard__category category__facebook">

                                <div className="dashboard__category-head dashboard__category-headInstagram">

                                    <div className="instagram__profileMockup">
                                        <div className="instagram__profileCircle">
                                        </div>
                                        <div className="instagram__profileDetails">
                                            <div className="instagram__profileDetail">

                                            </div>
                                            <div className="instagram__profileDetailSmall">

                                            </div>
                                        </div>
                                    </div>

                                    {/* Follow btn */}
                                    <div>
                                    </div>
                                </div>
                                <div className="dashboard__category-body  dashboard__category-bodyInstagram   ">
                                    <img src={InstagramImage} alt="facebook image" />
                                </div>
                                <div className="dashboard__category-footer">
                                    <img src={mouseOverDiv == "Instagram Post" ? HeartActive : Heart} />          <img src={CommentImage} />
                                </div>
                            </div>
                            Instagram Post
                        </div>
                    </a>

                    {/* Category Item : Youtube */}
                    <a className="categories__link" href="/members/editor/Youtube_Thumbnail">
                        <div className="dashboard__categoryWrapper">
                            <div onMouseLeave={() => { categoryHoverLeave() }} onMouseEnter={() => { categoryHoverEnter("Youtube Thumbnail") }} className=" dashboard__category category__facebook">
                                <div className="dashboard__category-body  dashboard__category-bodyYoutube   ">
                                    <img src={YoutubeImage} alt="facebook image" />
                                </div>
                                <div className="dashboard__category-footer">
                                    <img src={CommentImage} />
                                </div>
                            </div>
                            Youtube Thumbnail
                        </div>
                    </a>


                    {/* Category Item : Twitter */}
                    <a className="categories__link" href="/members/editor/Twitter_Post">
                        <div className="dashboard__categoryWrapper">
                            <div onMouseLeave={() => { categoryHoverLeave() }} onMouseEnter={() => { categoryHoverEnter("Youtube Thumbnail") }} className=" dashboard__category category__facebook">
                                <div className="dashboard__category-body  dashboard__category-bodyTwitter   ">
                                    <img src={TwitterImage} alt="facebook image" />
                                </div>
                                <div className="dashboard__category-footer">
                                    <img src={CommentImage} />
                                </div>
                            </div>
                            Twitter Post
                        </div>
                    </a>



                </Carousel>
                <div className="categories__title">
                    Templates
                </div>

                <Carousel

                    responsive={responsive}
                    responsive={responsive}
                    containerClass="categories__classes"
                    itemClass="categories__itemClass"

                >

                    {templates.map((item, index) => {
                        return <div className="categories__templateItem">
                            <img src={conf.endPoint + "/api/templates/images/md/" + item.name.replace(/\s+/g, '')} />
                            <div className="categories__templateItem-overlay">
                                <Link to={"/members/editor/" + item.name} >
                                    <div className="categories__templateItem-btn">
                                        Select
                                    </div>
                                </Link>
                                
                            </div>
                            {item.plan == 'Premium' && <div className='categories__templateItem-crown'>
                                            <img src={Crown} />
                                        </div>}
                        </div>
                    })}



                </Carousel>

                {/* Button forr to show more categories */}
                <div className="categories__more">
                    <a onClick={() => { handleMoreBtnClick() }}> More Templates </a>
                </div>

                {/* If More templates true then we show all categories */}

                {
                    isMoreTemplatesShowed == true &&
                    <>

                        <div className="categories__title-wrapper">
                            <div className="categories__title">
                                Instagram Posts
                            </div>
                            <div className="categories__title-right">
                                <a href={"/members/templates/Instagram_Post"}>Show All</a>
                            </div>
                        </div>
                        <Carousel
                            responsive={responsive}
                            responsive={responsive}
                            containerClass="categories__classes"
                            itemClass="categories__itemClass">
                            {
                                InstagramPostTemplates.map((item, index) => {
                                    return <div className="categories__templateItem">
                                        <img src={conf.endPoint + "/api/templates/images/md/" + item.name.replace(/\s+/g, '')} />
                                        <div className="categories__templateItem-overlay">
                                            <Link to={"/members/editor/" + item.name} >
                                                <div className="categories__templateItem-btn">
                                                    Select
                                                </div>
                                            </Link>
                                        </div>
                                        {item.plan == 'Premium' && <div className='categories__templateItem-crown'>
                                            <img src={Crown} />
                                        </div>}
                                    </div>
                                })
                            }
                        </Carousel>

                        <div className="categories__title-wrapper">
                            <div className="categories__title">
                                Fcebook Posts
                            </div>
                            <div className="categories__title-right">
                                <a href={"/members/templates/Facebook_Post"}>Show All</a>
                            </div>
                        </div>
                        <Carousel
                            responsive={responsive}
                            responsive={responsive}
                            containerClass="categories__classes"
                            itemClass="categories__itemClass">
                            {
                                facebookPostTemplates.map((item, index) => {
                                    return <div className="categories__templateItem">
                                        <img src={conf.endPoint + "/api/templates/images/md/" + item.name.replace(/\s+/g, '')} />
                                        <div className="categories__templateItem-overlay">
                                            <Link to={"/members/editor/" + item.name} >
                                                <div className="categories__templateItem-btn">
                                                    Select
                                                </div>
                                            </Link>

                                        </div>
                                        {item.plan == 'Premium' && <div className='categories__templateItem-crown'>
                                            <img src={Crown} />
                                        </div>}


                                    </div>
                                })
                            }
                        </Carousel>

                        <div className="categories__title-wrapper">
                            <div className="categories__title">
                                Twitter Posts
                            </div>
                            <div className="categories__title-right">
                                <a href={"/members/templates/Twitter_Post"}>Show All</a>
                            </div>
                        </div>
                        <Carousel
                            responsive={responsive}
                            responsive={responsive}
                            containerClass="categories__classes"
                            itemClass="categories__itemClass">
                            {
                                twitterPostTemplates.map((item, index) => {
                                    return <div className="categories__templateItem">
                                        <img src={conf.endPoint + "/api/templates/images/md/" + item.name.replace(/\s+/g, '')} />
                                        <div className="categories__templateItem-overlay">
                                            <Link to={"/members/editor/" + item.name} >
                                                <div className="categories__templateItem-btn">
                                                    Select
                                                </div>
                                            </Link>
                                        </div>
                                        {item.plan == 'Premium' && <div className='categories__templateItem-crown'>
                                            <img src={Crown} />
                                        </div>}
                                    </div>
                                })
                            }
                        </Carousel>


                        <div className="categories__title-wrapper">
                            <div className="categories__title">
                                Youtube Thumbnails
                            </div>
                            <div className="categories__title-right">
                                <a href={"/members/templates/Youtube_Thumbnail"}>Show All</a>
                            </div>
                        </div>
                        <Carousel
                            responsive={responsive}
                            responsive={responsive}
                            containerClass="categories__classes"
                            itemClass="categories__itemClass">
                            {
                                YouubeThumbnailTemplates.map((item, index) => {
                                    return <div className="categories__templateItem">
                                        <img src={conf.endPoint + "/api/templates/images/md/" + item.name.replace(/\s+/g, '')} />
                                        <div className="categories__templateItem-overlay">
                                            <Link to={"/members/editor/" + item.name} >
                                                <div className="categories__templateItem-btn">
                                                    Select
                                                </div>
                                            </Link>
                                        </div>
                                        {item.plan == 'Premium' && <div className='categories__templateItem-crown'>
                                            <img src={Crown} />
                                        </div>}
                                    </div>
                                })
                            }
                        </Carousel>

                    </>
                }
            </div>
        </>
    )
}

export default Categories
