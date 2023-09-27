"use client"
import Footer from '@/components/footer';
import './globals.css'
import Header from '@/components/header';
import { useState } from 'react';


export default function myApp({ children }) {
  const [cart, setcart] = useState("second")
  return (
    <html lang="en">
      <body >
      <Header cart={cart}/>
      {children}
      <Footer/>
      </body>
    </html>
  )
}
