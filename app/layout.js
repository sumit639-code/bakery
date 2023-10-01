"use client";
import Footer from "@/components/footer";
import "./globals.css";
import Header from "@/components/header";
import { useState } from "react";
import { RecoilRoot } from "recoil";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <RecoilRoot>
          <Header />
          {children}
          <Footer />
        </RecoilRoot>
      </body>
    </html>
  );
}
