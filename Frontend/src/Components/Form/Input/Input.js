import './Input.scss'
const Input = (props)=>{
    const defaultStyles = {
        padding:"15px 20px",
        width:"100%",
        borderRadius: props.rounded ? props.rounded : "0px",
        outline:"unset",
        border:"1px solid rgb(202, 202, 202) ",
        boxSizing:"border-box"
    }

    return(
                <div className="simpleInput mg-top-20">
                    {/* Label  */}
                    {props.label &&   <span className="block input__label font-small mg-bot-10 weight-500">{props.label}</span>}
                    <input placeholder={props.placeholder ? props.placeholder : ""}  onChange={(event)=>{props.handleInputs(event,props.name)}} style={{...defaultStyles}} type={props.type? props.type : "text"} />
                </div>
    
    )
}

export default Input;