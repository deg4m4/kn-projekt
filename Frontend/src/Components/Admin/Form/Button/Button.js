import React from 'react'
import './Button.scss'
import PropTypes from 'prop-types';
const Button = (props) => {
    return (
        <div onClick={props.onClick} className={
            props.type == "outlined" ? "admin__btn-outlined" :
                props.type == "default" ? "admin__btn-default" : "btn"
        }
            style={props.style}
        >
            {props.value}
        </div>
    )
}
Button.propTypes = {
    style: PropTypes.object,
    type: PropTypes.string
};
export default Button
