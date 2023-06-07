'use client'
import React, { FC, useState } from 'react'
import Image from 'next/image'


import {client} from '../../sanity/lib/client'

import imageUrlBuilder from '@sanity/image-url'
import { Image as IImage } from 'sanity';
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'next/navigation'
import { stat } from 'fs'
//import cookieCutter from 'cookie-cutter'

const builder = imageUrlBuilder(client);

const urlFor = (source:any)=>{
    return builder.image(source);
  }

  interface IProduct  {
    title: string,
    _id: string
    description: string,
    image: IImage,
    price: number,
    category: {
      name: string
    }
  }

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(publishableKey!);


export const Product:FC<{product: IProduct}> = ({product}) => {
const [quantity, setQty] = useState(1)
const [item, setItem] = useState({});
//const {loading, setLoading} = useState<boolean>(false)
const router = useRouter();
//const {status} = router;


const handleQty = (opr:string)=>{
    if(opr=='+') {
        setQty(quantity+1)
    } else if(opr=='-') {
        if(quantity == 1)
        return;
        setQty(quantity-1)
    }
    handleBuy();
}

const handleBuy = ()=>{
  setItem({
    title: product.title,
    product_id: product._id,
        amount: product.price * quantity,
        image: urlFor(product.image).url()
  })
  console.log(item)
}

const handleSubmit = async ()=>{

  //handleBuy();
  const res = await fetch('/api/cart',{
    method: 'POST',    
    body: JSON.stringify({
        product_id: product._id,
        price: product.price,
        quantity: quantity
    })
})

return res;

}



const createCheckOutSession = async ()=>{
  //setLoading(true);
  const stripe = await stripePromise;
  const checkoutSession = await fetch('/api/create-stripe-session',{
    method: 'POST',
    body: JSON.stringify(item)
  });

  //setLoading(false);
  const data = await checkoutSession.json();
  console.log(data);
  const result = await stripe?.redirectToCheckout({
    sessionId: data.id
  });

  if(result?.error) {
    alert(result.error.message)
  }
}



  return (
    

    // <div>
    // {
    //   status && status === 'success' && (
    //     <div className='bg-green-100 text-green-700 p-2 rounded mb-2 border-green-700'>
    //         Payment Successfull
    //     </div>
    //   )
    // } {
    //   status && status === 'cancel' && (
    //     <div className='bg-red-100 text-red-700 p-2 rounded mb-2 border-red-700'>
    //         Payment Unsuccessfull
    //     </div>
    //   )
    // }
    
    <div>
      <Image src={urlFor(product.image).url()} width={200} height={190} alt={product.title}/>
        <h1>{product.title}</h1>
        <h3>{product.price}</h3>
        <button onClick={handleSubmit} className='bg-blue-600 text-white rounded border py-2  px-5'>Add to Cart</button>
        <button className='py-2 px-2 bg-blue-300 text-white' onClick={()=>handleQty('-')}>➖</button>
       
        <span className='text-lg'>{quantity}</span>
        <button className='py-2 px-2 bg-blue-200 text-white' onClick={()=>handleQty('+')}>➕</button>
         <div>
        <button disabled={quantity===0} onClick={createCheckOutSession} className='bg-green-600 text-white rounded border py-2  px-10'>
         Buy
          </button>
          </div> 
    </div>
  )
}

export default Product