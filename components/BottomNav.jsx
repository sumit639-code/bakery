"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { CategoryState } from "@/app/state/atoms/CategoryState";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useRecoilState(CategoryState);

  const handleNavClick = (category, targetRoute = "/") => {
    setSelectedCategory(category);
    if (pathname !== targetRoute && targetRoute !== "/") {
      router.push(targetRoute);
    } else if (pathname !== "/") {
      router.push("/");
    } else {
      // If already on homepage, smoothly scroll to catalog
      const el = document.getElementById("cakes-catalog-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="mobile-bottom-nav">
      <button
        onClick={() => handleNavClick("All")}
        className={`bottom-nav-item ${pathname === "/" && selectedCategory === "All" ? "active" : ""
          }`}
      >
        <span className="nav-icon">🏠</span>
        <span className="nav-label">Home</span>
      </button>

      <button
        onClick={() => handleNavClick("All")}
        className={`bottom-nav-item ${pathname === "/" && selectedCategory !== "Cupcakes" ? "active" : ""
          }`}
      >
        <span className="nav-icon">🎂</span>
        <span className="nav-label">Cakes</span>
      </button>

      <button
        onClick={() => handleNavClick("Cupcakes")}
        className={`bottom-nav-item ${selectedCategory === "Cupcakes" ? "active" : ""
          }`}
      >
        <span className="nav-icon">🧁</span>
        <span className="nav-label">Cupcakes</span>
      </button>

      <a
        href="https://api.whatsapp.com/send?phone=917008198415&text=Hello%20Lilly's%20Bakery!%20I%20would%20like%20to%20order%20a%20cake."
        target="_blank"
        rel="noopener noreferrer"
        className="bottom-nav-item whatsapp-item"
      >
        <span className="nav-icon">💬</span>
        <span className="nav-label">WhatsApp</span>
      </a>

      <style jsx>{`
        .mobile-bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-top: 1px solid rgba(38, 21, 13, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 0 8px;
          z-index: 999;
          box-shadow: 0 -4px 16px rgba(28, 18, 12, 0.06);
        }

        @media (min-width: 769px) {
          .mobile-bottom-nav {
            display: none;
          }
        }

        .bottom-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          color: var(--text-muted);
          text-decoration: none;
          flex: 1;
          height: 100%;
          cursor: pointer;
          transition: all 0.2s ease;
          background: none;
          border: none;
          padding: 4px 0;
        }

        .nav-icon {
          font-size: 19px;
          line-height: 1;
          transition: transform 0.2s ease;
        }

        .nav-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2px;
        }

        .bottom-nav-item.active {
          color: var(--brand-primary);
        }

        .bottom-nav-item.active .nav-icon {
          transform: scale(1.12);
        }

        .whatsapp-item {
          color: var(--brand-whatsapp-dark);
        }
      `}</style>
    </nav>
  );
}
