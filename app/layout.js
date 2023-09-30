"use client";
import Footer from "@/components/footer";
import "./globals.css";
import Header from "@/components/header";
import { useState } from "react";


export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
