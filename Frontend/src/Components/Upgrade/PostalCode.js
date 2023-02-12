import React, { useState } from 'react'
import CheckImage from '../../assets/images/check.png'
import axios from 'axios'
import VisaImage from '../../assets/images/social/visa.png'
import MasterCard from '../../assets/images/social/master.png'
import Paypal from '../../assets/images/social/paypal.png'
import JCB from '../../assets/images/social/jcb.png'
import Amex from '../../assets/images/social/amex.png'
import Dropdowm from './Dropdown/Dropdowm'

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useElements, ElementsConsumer } from '@stripe/react-stripe-js';
import { conf } from '../../conf/conf'
import CardHolder from './Dropdown/CardHolder'
import { PayPalButton } from "react-paypal-button-v2";


const PostalCode = (props) => {


    const [selectedCountry, setselectedCountry] = useState("")
    const [fullName, setfullName] = useState("")
    const [address, setaddress] = useState("")
    const stripePromise = loadStripe(props.meta.stripeKey);

    var country_list = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
    const [step, setstep] = useState(0)


    const handleDropdown = (name, value) => {
        switch (name) {
            case "Country":
                setselectedCountry(value)
                break;

            default:
                break;
        }
    }

    const handleInput = (name, value) => {
        switch (name) {
            case "Full Name":
                setfullName(value)
                break;
            case "Address":
                setaddress(value)
                break;

            default:
                break;
        }
    }

    const nextStep = () => {
        setstep(prevState => prevState + 1)
    }
    const returnStep = (step) => {
        setstep(step)
    }
    return (
        <div className="postalcode">
            {/* Left side */}
            <div className="postalcode__left">
                <h2> Get your premium access. </h2>
                <ul>
                    <li> <img src={CheckImage} alt="check img" /> Payment through a trusted payment service </li>
                    <li> <img src={CheckImage} alt="check img" /> SSL Secure / 256-bit SSL secure checkout </li>
                    <li> <img src={CheckImage} alt="check img" /> 7-day money back guarantee </li>
                    <li> <img src={CheckImage} alt="check img" /> wide variety of payments methods </li>



                </ul>
                <h2> How can I cancel? </h2>
                <p>You can easily cancel your subscription by simply contacting our support team via email or telephone, or by using our contact page.</p>
                <h2>Accepted Payments Methods</h2>
                <ul className="payments">
                    <li><img src={VisaImage} alt="payment" /></li>
                    <li><img src={MasterCard} alt="payment" /></li>
                    <li><img src={Paypal} alt="payment" /></li>
                    <li><img src={JCB} alt="payment" /></li>
                    <li><img src={Amex} alt="payment" /></li>
                </ul>
            </div>
            {/* Right side */}
            <div className="postalcode__right">
                <div className="postalcode__right-top">
                    <span>Total due today:</span>
                    <span>${props.step == "Monthly" ? props.monthly : props.anually}</span>
                </div>

                {step == 0 &&
                    <div className="postalcode__right-body">
                        <h2>Where are you located?</h2>
                        <p>Please enter your country and postal code below. We collect this information in order to fight against fraud and guarantee the security of your payment.</p>
                        {/* Country */}
                        <Dropdowm value={selectedCountry} name="Country" handleDropdown={handleDropdown} items={country_list} />
                        <div className="postalecode__action">
                            <a onClick={() => nextStep()} className="postalcode__btn">Next</a>
                        </div>
                    </div>
                }

                {step == 1 &&
                    <div className="postalcode__right-body">
                        <a onClick={() => nextStep()} className="postalcode__btn">Pay with card</a>
                        <PayPalButton
                            amount={props.step == "Monthly" ? props.monthly : props.anually}
                            style={{color:'black'}}
                            options={{
                                disableFunding:"card",
                                clientId:"AQ6HBHBxXvDYYxcGWa34DMvI9ywriPyRdQvEtO2Nx24i-Flo4RiKbG0kit9HFGe9sfTnN6DtrKgatUgj",
                            }}
                            // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                            onSuccess={(details, data) => {
                                //alert("Transaction completed by " + details.payer.name.given_name);

                                // OPTIONAL: Call your server to save the transaction
                                    axios.post(conf.endPoint+"/api/auth/subscription",{data:{ duration:props.step,amount:props.selectedPrice,plan:"Monthly"}},{withCredentials:true}).then((resp)=>{
                                }) 

                                setTimeout(() => {
                                    window.location.href = "/members/settings"
                                }, 7000);

                            }}
                        />
                        <a onClick={() => setstep(0)} className="postalcode__btn-outlined">Return</a>

                    </div>
                }
                {step == 2 &&
                    <Elements stripe={stripePromise}>
                        <ElementsConsumer>
                            {({ stripe, elements }) => (
                                <CardHolder anually={props.anually} monthly={props.monthly} step={props.step} name={fullName} selectedPrice={props.selectedPrice} stripe={stripe} elements={elements} fullName={fullName} address={address} setstep={setstep} handleInput={handleInput} />

                            )}

                        </ElementsConsumer>

                    </Elements>
                }


            </div>
        </div>
    )
}

export default PostalCode
