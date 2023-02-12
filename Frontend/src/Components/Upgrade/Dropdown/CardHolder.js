import React from 'react'
import { CardElement} from '@stripe/react-stripe-js';
import axios from 'axios'
import {conf} from '../../../conf/conf'
const CardHolder = (props) => {


    
   const handleStripeSubmit = async () => {
    const { stripe, elements } = props;
    if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
    }
    const res = await axios.post( conf.endPoint + "/api/api/pay", {  price: props.step == "Monthly" ? props.monthly : props.anually});
    const clientSecret = res.data['client_secret'];
    const time = res.data["server_time"]
    const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
                name: props.name
            },
        },
        // receipt_email: "ja3tar@gmail.com"
    });
    if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        alert("Error")
        console.log(result.error.message);
    } else {
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {
        // console.log("adding subscription");       
        axios.post(conf.endPoint+"/api/auth/subscription",{data:{ duration:props.step,amount:props.selectedPrice,plan:"Monthly"}},{withCredentials:true}).then((resp)=>{
        })   

        setTimeout(() => {
            window.location.href = "/members/settings"
        }, 7000);

           // this.setState({ step: 0 })
            // Show a success message to your customer
        }
    }
};

    return (
        <div className="postalcode__right-body">
        <input onChange={(event) => { props.handleInput("Full Name", event.target.value) }} placeholder='Full Name' className="pstalcode__input" value={props.fullName} />
        <input onChange={(event) => { props.handleInput("Address", event.target.value) }} placeholder='Address'  className="pstalcode__input" value={props.address} />
        <CardElement
           className="pstalcode__input"

            options={{
            
                style: {
                    base: {
                        
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                            color: '#aab7c4',
                            
                        },
                    },
                    invalid: {
                        color: '#9e2146',
                    },
                },
            }}
        />

        <div className="postalecode__action">
            <a onClick={(event) => handleStripeSubmit(event)} className="postalcode__btn">Checkout</a>
            <a onClick={() => props.setstep(1)} className="postalcode__btn-outlined">Return</a>
        </div>

    </div>
    )
}

export default CardHolder
