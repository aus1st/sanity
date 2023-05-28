import Image from 'next/image'
import {client} from '../../sanity/lib/client'

import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client);

 interface IProduct  {
  title: string,
  description: string,
  image: any
}

const urlFor = (source:any)=>{
  return builder.image(source);
}

const getData = async ()=>{
  const res = await client.fetch(`*[_type=='product']{
    title,description,image
  }`)

  return res;
}

export default async function Home() {

const data: IProduct[] = await getData()
//console.log(data);
  return (
    <>
    {
      data.map((item)=>(
        <>
        <h1 key={item.title}>{item.title}</h1>
        <Image src={urlFor(item.image).width(380).height(400).url()} width={380} height={400} alt={item.title}/>
        </>
      ))
    }
    </>
  )
} 
