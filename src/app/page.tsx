import Image from 'next/image'
import {client} from '../../sanity/lib/client'

import imageUrlBuilder from '@sanity/image-url'
import { Image as IImage } from 'sanity';

const builder = imageUrlBuilder(client);

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

const urlFor = (source:any)=>{
  return builder.image(source);
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
       
        <Image src={urlFor(item.image).url()} width={200} height={190} alt={item.title}/>
        <h1 >{item.title}</h1>
        <h3>{item.price}</h3>
        <button className='bg-blue-600 text-white rounded border py-2  px-5'>Add to Cart</button>
        </div>
      ))
    }
    </div>
  )
} 
