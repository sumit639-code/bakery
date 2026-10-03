"use client";
import React from "react";
import Link from "next/link";
import "@/Styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand-block">
            <h3 className="footer-brand-title">Lilly's Bakery</h3>
            <p className="footer-brand-desc">
              Crafting unforgettable sweet celebrations with premium artisanal
              ingredients, 100% pure eggless recipes, and unmatched passion.
            </p>
            <div className="footer-promise-tag">
              <span>🌿</span>
              <span>100% Pure Eggless & Freshly Baked</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <div className="footer-nav-list">
              <Link href="/" className="footer-link">
                Home
              </Link>
              <Link href="/Menu" className="footer-link">
                Signature Cakes
              </Link>
              <Link href="/Cupcake" className="footer-link">
                Gourmet Cupcakes
              </Link>
              <Link href="/About" className="footer-link">
                Our Story & Philosophy
              </Link>
            </div>
          </div>

          {/* Operating Hours */}
          <div>
            <h4 className="footer-heading">Baking Hours</h4>
            <div className="footer-timing-badge">
              <p>
                <strong>Mon – Sun:</strong>
              </p>
              <p>9:00 AM – 10:00 PM</p>
              <p style={{ marginTop: "8px", fontSize: "12px", color: "var(--brand-gold)" }}>
                ⚡ Same Day Delivery Available
              </p>
            </div>
          </div>

          {/* Direct WhatsApp Ordering */}
          <div>
            <h4 className="footer-heading">Order & Connect</h4>
            <p style={{ fontSize: "13px", color: "#B5A194", marginBottom: "12px" }}>
              Have custom cake requirements or wedding inquiries? Chat with our master baker:
            </p>
            <a
              href="https://api.whatsapp.com/send?phone=917008198415&text=Hello%20Lilly's%20Bakery!%20I%20have%20a%20custom%20order%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "var(--brand-whatsapp)",
                color: "white",
                padding: "8px 16px",
                borderRadius: "var(--radius-full)",
                fontSize: "13px",
                fontWeight: "700",
                textDecoration: "none",
              }}
            >
              <span>💬</span>
              <span>+91 70081 98415</span>
            </a>

            <div className="footer-social-row">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="Instagram"
              >
                📷
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="Facebook"
              >
                👥
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="Twitter"
              >
                🐦
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} Lilly's Bakery. All rights reserved. Handcrafted with ❤️.
          </div>
          <div>
            <span>FSSAI Certified • Hygienic Kitchen • Zero Preservatives</span>
          </div>
        </div>
      </div>
    </footer>
  );
}