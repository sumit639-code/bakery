import "./globals.css";
import "@/Styles/header.css";
import "@/Styles/footer.css";
import "@/Styles/landing.css";
import "@/Styles/menu.css";
import "@/Styles/modal.css";
import "@/Styles/dyn-route.css";
import "@/Styles/cart.css";
import "@/Styles/about.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import ClientProviders from "@/components/ClientProviders";

export const metadata = {
  title: "Lilly's Bakery | Artisanal Eggless Cakes & Cupcakes",
  description:
    "Order freshly baked, 100% eggless artisanal cakes and gourmet cupcakes online from Lilly's Bakery. Same-day express delivery & custom cakes.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
