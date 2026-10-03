"use client";
import React from "react";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BottomNav from "@/components/BottomNav";
import FloatingCartBanner from "@/components/FloatingCartBanner";

export default function ClientProviders({ children }) {
  return (
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
  );
}
