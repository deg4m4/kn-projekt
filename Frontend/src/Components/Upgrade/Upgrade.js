import React, { useState,useEffect } from 'react'
import Plans from './Plans'
import PostalCode from './PostalCode'
import './Upgrade.scss'
const Upgrade = (props) => {
    const [step, setStep] = useState("Monthly")
    const [page,setPage] =  useState("Plans")
    const [selectedPrice,setselectedprice] = useState(0)
    const [anually, setanually] = useState(0)
    const [monthly, setmonthly] = useState(0)
    const [paypalKey, setpaypalKey] = useState("")
    const [stripeKey, setStripeKey] = useState("")

    const HandlePeriodClick = (name) => {
        setStep(name)
        //setPage("s")
    }

    const hanldlePlanClick = (amount)=>{
        setPage("s")
        setselectedprice(amount)
    }

    useEffect(()=>{
        // console.log('meta'+props.meta);
        if(props.meta !== undefined){
            setanually(props.meta.yearly)
            setmonthly(props.meta.monthly)
            setStripeKey(props.meta.stripeKey)
            setpaypalKey(props.meta.paypalKey)

        }


    },[])    
    
    
    return (
        <div className="upgrade">
            {/* Head */}
            <div className="upgrade__head">
                <div className="circle circle-topleft">

                </div>
                <div className="circle circle-bottomRight">

                </div>
                <div className="upgrade__head-wrapper">
                    <span className="upgrade__fadedSubtitle">
                        PRICING
                    </span>
                    <h1>Get Started Now</h1>
                    <p>No contracts, No surprise fees. </p>

                    <div className="upgrade__btnsHolder">
                        <div onClick={() => { HandlePeriodClick("Anually") }} className={step == "Anually" ? "upgrade__btn upgrade__btn-active " : "upgrade__btn "}>
                            Anually
                        </div>
                        <div onClick={() => { HandlePeriodClick("Monthly") }} className={step == "Monthly" ? "upgrade__btn upgrade__btn-active " : "upgrade__btn "}>
                            Monthly
                        </div>
                    </div>

                </div>

            </div>
            {/* Body */}
            <div className="upgrade__body">
            
                {/* <Plans /> */}
                {page == "Plans" ? <Plans meta={props.meta} anually={anually} monthly={monthly} step={step}  handlePlanClick ={hanldlePlanClick} /> : <PostalCode meta={props.meta}  anually={anually} monthly={monthly} step={step} selectedPrice={selectedPrice} />}
                {/* Postal code */}

            </div>

        </div>
    )
}

export default Upgrade
