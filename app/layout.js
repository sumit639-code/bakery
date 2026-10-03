"use client";
import "./globals.css";
import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BottomNav from "@/components/BottomNav";
import FloatingCartBanner from "@/components/FloatingCartBanner";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Lilly's Bakery | Artisanal Eggless Cakes & Cupcakes</title>
        <meta
          name="description"
          content="Order freshly baked, 100% eggless artisanal cakes and gourmet cupcakes online from Lilly's Bakery. Same-day express delivery & custom cakes."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body>
        <RecoilRoot>
          <Header />
          <main style={{ flex: "1 0 auto", width: "100%", position: "relative" }}>
            {children}
          </main>
          <FloatingCartBanner />
          <div className="mobile-bottom-spacer" />
          <BottomNav />
          <Footer />
          <ToastContainer
            position="bottom-center"
            autoClose={1800}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            theme="dark"
          />
        </RecoilRoot>
      </body>
    </html>
  );
}
