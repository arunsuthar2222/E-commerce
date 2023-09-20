import './Payment.css'
import React, {useContext, useState} from 'react'
import StateContext from '../context/StateProvider'
import CurrencyFormat from "react-currency-format";
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
function Payment() {
   const {basket, totalPrice} = useContext(StateContext);
   const stripe = useStripe();
   const elements = useElements()
   
   const [succeeded, setSucceded] = useState(false);
   const [processing, setProcessing] = useState('');

   const [error, setError] = useState(null);
   const [disabled, setDisabled] = useState(true);


   const handleSubmit = async(e) =>{
    e.preventDefalut();
    setProcessing(true);

    
   }

   const handleChange = (event) =>{
      setDisabled(event.empty)
      setError(event.error ? event.error.message : '')
   }
   

  return (
    <div className='border-b-2 border-gray-300'>
        <h3 className='text-3xl py-3 text-center border-b-2 border-gray-200'>Checkout (<span className='text-purple-800'>{basket.length > 0 ? basket.length : 0} items</span>)</h3>
        <div className='bg-gray-100 px-4'>
        <div className=' py-5  flex border-b-2 border-gray-300'>
            <h5 className='text-xl font-bold font-sans pl-12'>Delivery Address</h5>
            <div className='pl-14 font-sans'>
                <p>Rajasthan</p>
                <p>India</p>
            </div>
        </div>
        <div className=' py-6  flex border-b-2 border-gray-300'>
            <h5 className='text-xl font-bold font-sans pl-12'>Review items and delivery
</h5>
            <div className='pl-14 font-sans'>
                <p>Item is dilivered on time .</p>
                
            </div>
        </div>
        <div className=' py-5  flex h-full'>
            <h5 className='text-xl font-bold font-sans pl-12'>Payment Method</h5>
            <div className='pl-14 font-sans'>
            <div className="payment__details flex-1">
            <form className='form'>
                <CardElement onChange={handleChange}/>

                <div className='payment_priceContainer'>
                <CurrencyFormat
                                        renderText={(value) => (
                                            <h3 className='font-bold text-lg'>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={totalPrice}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={'Rs'}
                                    />
                                    <button className='py-1.5 px-2 mt-2 bg-yellow-600 font-semibold rounded' disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                    </button>
                </div>
                {error && <div className='text-red-700 text-sm pt-2'>{error}</div>}
            </form>
           
          </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Payment