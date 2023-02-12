import React from 'react'
import './TemplatePreview.scss';
import MailChimp from '../../../assets/images/mailchimp.png'
import Gmail from '../../../assets/images/gmail.png'
import Outlook from '../../../assets/images/outlook.png'
import GetResponse from '../../../assets/images/gmail.png'

const TemplatePreview = () => {
    return (
        <div className="container-tight">
        <div className="body__title">
            <div className="body__titleHolder">
                <h2>Astra Template</h2>
                <a href="#" className="btn__addNew "> + Create new</a>
            </div>
            <div className=" hr mg-top-20" />
        </div>
        {/* Projects list */}
        <div className="preview mg-top-30 " >
            {/* Left */}
            <div className="preview__thumbnailWrapper flex-center">
                <div className="preview__thumbnail">

                </div>
            </div>
            {/* Right */}
            <div className="preview__details flex-col">
                <span className="preview__name">Astra Theme <br></br> v1</span>
                <a className="preview-btn-outlined mg-top-20">Start editing</a>
                <span className="preview__price mg-top-10 preview__title">Free</span>
                {/* Categories */}
                <div className="preview__categories flex mg-top-20">
                <div className="preview__price  preview__title">Categories</div>
                <ul className="preview__categories"> 
                <a className="preview-btn-cat ">Business</a>
                <a className="preview-btn-cat ">Sport</a>
                </ul>
                </div>

                        {/* Support */}
                <div className="preview__categories flex mg-top-20">
                <div className="preview__price  preview__title">Support</div>
                <ul className="preview__categories flex"> 
                <li><img src={Gmail} alt="Gmail"/></li>
                <li><img src={MailChimp} alt="Mailchimp"/></li>
                <li><img src={Outlook} alt="Outlook"/></li>
                <li><img src={GetResponse} alt="GetResponse"/></li>

                </ul>
                </div>

            </div>
        </div>
    </div>
    )
}

export default TemplatePreview
