import Cake from "@/components/cake";
import React from "react";
import "@/Styles/menu.css";
import Data from "@/Data/data2.json";
import Link from "next/link";

const Menu = () => {
  // Data.map((t,i)=>{
  //   console.log(t.title);
  // })
  return (
    <>
      <div className="links-menu">
        <span className="links-pages">
          <Link href="/Menu" className="cake-link st1">
            Cake
          </Link>
          <Link href="/Cupcake" className="cake-link st2" style={{"color":"#FF5C5C"}}>
            CupCake
          </Link>
        </span>
      </div>
      <div className="menu-main">
        {Data.map((t, i) => {
          return <Cake data={t} key={t.key} pc="/pc" />;
        })}
      </div>
      
    </>
  );
};

export default Menu;
