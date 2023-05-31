'use client'
import React, { FC, useState } from 'react'
import Image from 'next/image'


import {client} from '../../sanity/lib/client'

import imageUrlBuilder from '@sanity/image-url'
import { Image as IImage } from 'sanity';

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

export const Product:FC<{product: IProduct}> = ({product}) => {
const [quantity, setQty] = useState(1)

const handleQty = (opr:string)=>{
    if(opr=='+') {
        setQty(quantity+1)
    } else if(opr=='-') {
        if(quantity == 1)
        return;
        setQty(quantity-1)
    }
}

const handleSubmit = async ()=>{
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



  return (
    <div>
      <Image src={urlFor(product.image).url()} width={200} height={190} alt={product.title}/>
        <h1 >{product.title}</h1>
        <h3>{product.price}</h3>
        <button onClick={handleSubmit} className='bg-blue-600 text-white rounded border py-2  px-5'>Add to Cart</button>
        <button className='py-2 px-2 bg-blue-300 text-white' onClick={()=>handleQty('-')}>➖</button>
       
        <span className='text-lg'>{quantity}</span>
        <button className='py-2 px-2 bg-blue-200 text-white' onClick={()=>handleQty('+')}>➕</button>
    </div>
  )
}

export default Product