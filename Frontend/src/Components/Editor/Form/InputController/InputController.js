import React from 'react'

const InputController = (props) => {

      const handleInput = (event) =>{
          props.handleNumberInput(props.name,event)

      }
     return (
        <div className="editor__dropdown">
        <input onChange={handleInput}   />

    </div>
    )
}

export default InputController
