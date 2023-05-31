import Image from 'next/image'

import {client} from '../../sanity/lib/client'
import { Image as IImage } from 'sanity';
import Product from './Product';

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



const getData = async ()=>{
  const res = await client.fetch(`*[_type=='product']{
    _id,title,price,description,image, category -> {
      name
    }
  }`)

  return res;
}

export default async function Home() {

const data: IProduct[] = await getData()
//console.log(data);
  return (
    <div className='grid grid-cols-[repeat(3,auto)] gap-x-3 mt-5 justify-center gap-y-3'>
    {
      data.map((item)=>(
        <div key={item._id} className='max-w-md'>
       
        <Product product={item}/>
        </div>
      ))
    }
    </div>
  )
} 
