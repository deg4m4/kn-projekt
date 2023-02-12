import React from 'react';
import './Input.scss';
import PropTypes from 'prop-types';
const Input = (props) => {
  const handleInputs = (name, event) => {
    props.handleInputs(name, event)
  }
  return (
    <div className="admin__input">
      <div className="admin__inputName">
        {props.title}
      </div>
      {props.type == "text" || props.type == undefined && <input value={props.value} onChange={(event) => handleInputs(props.name, event)} className="admin__inputField" />}
      {props.type == "textarea" && <textarea onChange={(event) => handleInputs(props.name, event)} className="admin__inputField" />}
      {props.type == "file" && <input type="file" className="admin__inputField" />}
    </div>
  )
}
Input.propTypes = {
  title: PropTypes.string,
};
export default Input
