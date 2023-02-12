import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import './Main.scss';
import Logo from '../../../assets/images/logo.png'
import AppScreen from '../../../assets/images/design2.png'
import MobileScreen from '../../../assets/images/mobile.png'
import Menu from '../../../assets/images/menu.png';
import { ReactComponent as ArrowImg } from '../../../assets/images/arrow.svg'

const Main = (props) => {
    const menuRef = useRef();
    const menuRightRef = useRef();
    // Handle Menu Click 
    const MenuClick = () => {
        if (menuRef.current.classList.contains('hidden')) {
            menuRef.current.classList.remove('hidden')
        } else {
            menuRef.current.classList.add('hidden')
        }
        if (menuRightRef.current.classList.contains('hidden')) {
            menuRightRef.current.classList.remove('hidden')
        } else {
            menuRightRef.current.classList.add('hidden')
        }
    }

    return (
        <div className='homepage'>
            <div className='homepage__navbar'>
                <div className='homepage__navbar-left'>
                    <img className='homepage__navbar-left--logo' src={Logo} />
                    <div className='mobile__toggle'>
                        <img onClick={() => { MenuClick() }} src={Menu} alt='menu' />
                    </div>
                </div>
                <div ref={menuRef} className='homepage__navbar-middle hidden'>
                    <ul >
                        <li className='homepage__navbar-middle--item'><Link>Home</Link></li>
                        <li className='homepage__navbar-middle--item'><Link to='/contact'>Contact us</Link></li>
                        <li className='homepage__navbar-middle--item'><Link to='/members/templates'>Templates</Link></li>
                    </ul>
                </div>
                <div ref={menuRightRef} className='homepage__navbar-right hidden'>
                    <Link to='/members' className='homepage__btnoutlined'>Go to app</Link>
                </div>
            </div>
            
            <div className='homepage__header'>
                <h1>Create unlimited  <span>designs </span>  from your browser, a tool to make your own designs effortlessly. Select a template from our templates list. add your touch, and export.</h1>
                <p>Advanced photo editor ready for your daily designing tasks</p>
                <Link  to='/members' className='homepage__btn'>Get started</Link>
                <ArrowImg className='arrow' />
            </div>
            
            <div className='homepage__grid'>
                <div className='homepage__grid-left'>
                    <div className='homepage__grid-left--content'>
                        <div className='homepage__grid-light'>Availablity</div>
                        <h2>PHOTO EDITOR</h2>
                        <p>Our editor is accessable by phone and desktop</p>
                        <img src={MobileScreen} />
                    </div>
                </div>
                <div className='homepage__grid-right'>
                    <div className='homepage__grid-right--content'>
                        <div className='homepage__grid-light'>Availablity</div>
                        <h2>PHOTO EDITOR</h2>
                        <p>You can create design from scratch. but if you want to speed up the process we have a list of templates that you can use to achieve the required results</p>
                        <img src={AppScreen} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Main
