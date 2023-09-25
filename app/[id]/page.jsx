import React from 'react'
import Data from "@/Data/data.json";
import '@/Styles/dyn-route.css'
const page = ({params}) => {
    const id = params.id;
    const dyndata = Data[id]
  return (
    <>
    <div className="main-dyn">
      <h1 className="title-dyn">
        {dyndata.title}
      </h1>
      <span className="desc-dyn">
        {dyndata.desc}
      </span>
      <span className="price-dyn">
        {dyndata.price}
      </span>
    </div>
    </>
  )
}

export default page