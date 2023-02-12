import React ,{useState,useEffect}from 'react'
import DuplicateImage from '../../../assets/images/layers.png';
const Duplicate = (props) => {

    const [isLocked,setisLocked] = useState(false)

    const handleLockClick = ()=>{
    setTimeout(() => {
        setisLocked(prevState =>!prevState)
        props.handleLockClick()
    }, 800);
    setisLocked(prevState =>!prevState)


    }
     return (
        <div onClick={()=>{handleLockClick()}}  className={isLocked ? "duplicate active" : "duplicate"}>
            <img src={DuplicateImage}  alt="Lock"  />
        </div>
    )
}

export default Duplicate
