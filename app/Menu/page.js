import Cake from "@/components/cake";
import React from "react";
import '@/Styles/menu.css';
import Data from '@/Data/data.json'
const Menu = () => {
  // Data.map((t,i)=>{
  //   console.log(t.title);
  // })
  return (
    <>
    <div className="menu-main">
      {Data.map((t,i)=>{
        return(<Cake data={t} key={t.key}/>)
      })}
      
    </div>
      
    </>
  )
};

export default Menu;
