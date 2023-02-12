import React,{useState,useRef} from 'react'
import './Dropdown.scss'
const Dropdown = (props) => {

    const inputRef = useRef();
    const [isOpened, setisOpened] = useState(false)
    const [searchItems,setsearchItems]=useState(props.items)
    const handleOpening = ()=>{
        setisOpened(!isOpened)
    }


      
    const handleInput = (event)=>{
      var length = event.target.value.length


      let newArray=[]
      if(length >0){
      for (let index = 0; index < props.items.length; index++) {
        if(props.items[index].substring(0,event.target.value.length).toLowerCase() == event.target.value.toLowerCase()){
            newArray.push(props.items[index])
        }
          
      }}

      if(length >0){
      setsearchItems([... newArray])
      }else{
        setsearchItems(props.items)
      }
    }
    const handleItemClick = (item,event,font)=>{
        inputRef.current.value = font
      props.handleNumberInput(props.name,event,font)
        //setisOpened(false)    
    }
    return (
        <div className="editor__dropdown">
            <input ref={inputRef} onChange={(event)=>handleInput(event)} onClick={()=>handleOpening()} />
            {/* Select div */}
            { isOpened &&  
                     <div className="editor__dropdown-select">

                     {  searchItems.map((item, index) => {
                         return <div  onClick={(event)=>{handleItemClick(props.name,event,item)}}   className="editor__dropdown-selectItem">
                             <span>{item}</span>
                         </div>
                     })}
                 </div>
            }
   
        </div>
    )
}

export default Dropdown
