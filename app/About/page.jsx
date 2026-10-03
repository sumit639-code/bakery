"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import "@/Styles/about.css";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <div className="about-page-wrapper">
      {/* Hero Header */}
      <motion.div
        className="about-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="about-badge">
          <span>✨</span>
          <span>Crafted with Passion Since 2020</span>
        </span>
        <h1 className="about-title">The Story of Lilly's Bakery</h1>
        <p className="about-lead">
          We believe every celebration deserves a cake that not only looks breathtaking
          on the outside, but delivers pure, melt-in-mouth euphoria in every single bite.
        </p>
      </motion.div>

      {/* Stats Counter Grid */}
      <div className="about-stats-grid">
        <div className="stat-card">
          <div className="stat-number">10k+</div>
          <div className="stat-label">Happy Celebrations</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">100%</div>
          <div className="stat-label">Eggless & Pure Veg</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">4.9★</div>
          <div className="stat-label">Average Customer Rating</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">2 Hrs</div>
          <div className="stat-label">Express Delivery</div>
        </div>
      </div>

      {/* Story 2-Col Section */}
      <section className="story-section">
        <div className="story-content">
          <h2 className="story-heading">A Dream Made of Butter & Chocolate</h2>
          <p className="story-paragraph">
            Lilly's Bakery started in a small home kitchen with a simple, uncompromising
            philosophy: make artisanal cakes that taste authentic, using only pure European butter,
            real Belgian cocoa, and farm-fresh fruits without any artificial stabilizers or premixes.
          </p>
          <p className="story-paragraph">
            Today, our bakery has blossomed into a beloved neighbourhood bakery.
            Every morning at 6:00 AM, our ovens are fired up to bake fresh sponge batches so that
            every customer gets a cake made just hours before their event.
          </p>
        </div>

        <div className="story-media">
          <Image
            src="/images/cakes/special cake.jpeg"
            alt="Artisanal Bakery Kitchen"
            width={600}
            height={400}
            className="story-img"
          />
        </div>
      </section>

      {/* Philosophy Pillars */}
      <section className="pillars-section">
        <h2 className="section-center-heading">Our Three Sacred Baking Rules</h2>

        <div className="pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon">🌿</div>
            <h3 className="pillar-title">100% Eggless Kitchen</h3>
            <p className="pillar-desc">
              We operate an exclusively vegetarian kitchen. Our fluffy sponges are crafted
              using natural curd and condensed milk techniques that rival traditional recipes.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">🧈</div>
            <h3 className="pillar-title">Pure Dairy & Belgian Cocoa</h3>
            <p className="pillar-desc">
              No vegetable shortening or artificial chocolate syrup. We use pure dairy butter,
              heavy whipping cream, and genuine Belgian couverture chocolate.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">⏰</div>
            <h3 className="pillar-title">Baked Fresh Daily</h3>
            <p className="pillar-desc">
              We never freeze our cakes. Your cake is baked, layered, and decorated with
              precision for maximum freshness and aroma.
            </p>
          </div>
        </div>
      </section>

      {/* Visit Banner */}
      <section className="visit-banner">
        <h2 className="visit-title">Come Visit Us or Order Online</h2>
        <p className="visit-desc">
          Need a custom multi-tiered wedding cake, birthday theme cake, or bulk celebration boxes?
          Chat directly with our master decorator on WhatsApp or visit our boutique store.
        </p>
        <div className="visit-contact-row">
          <Link href="/Menu" className="hero-primary-btn" style={{ display: "inline-flex" }}>
            <span>🎂 Browse Cakes</span>
          </Link>
          <a
            href="https://api.whatsapp.com/send?phone=917008198415&text=Hello%20Lilly's%20Bakery!%20I'd%20like%20to%20discuss%20a%20custom%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="visit-btn-whatsapp"
          >
            <span>💬 Chat on WhatsApp (+91 70081 98415)</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
