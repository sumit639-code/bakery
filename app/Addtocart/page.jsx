"use client";
import React, { useState } from "react";
import "@/Styles/cart.css";
import Cart from "@/components/Cart";
import { useRecoilValue } from "recoil";
import { CartState } from "../state/atoms/CartState";
import Link from "next/link";

const CartPage = () => {
  const cart = useRecoilValue(CartState);
  const [deliveryNote, setDeliveryNote] = useState("");

  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  // Free Cupcake Reward at ₹799
  const rewardThreshold = 799;
  const progressPercent = Math.min(100, Math.round((total / rewardThreshold) * 100));
  const remainingForReward = Math.max(0, rewardThreshold - total);

  // Build Indian WhatsApp order receipt message
  const buildWhatsAppLink = () => {
    let message = `*🍰 NEW CAKE ORDER - Lilly's Bakery*\n\n`;
    message += `*Items Ordered:*\n`;

    cart.forEach((item, index) => {
      const weightInfo = item.selectedWeight ? ` (${item.selectedWeight})` : "";
      const msgInfo = item.cakeMessage ? `\n   ↳ _Name on Cake: "${item.cakeMessage}"_` : "";
      message += `${index + 1}. *${item.title}*${weightInfo} x ${item.quantity} = ₹${item.price * item.quantity}${msgInfo}\n`;
    });

    message += `\n*Bill Summary:*\n`;
    message += `• *Total Amount:* ₹${total}\n`;
    message += `• *2-Hr Delivery:* FREE ⚡\n`;
    message += `• *Candle & Knife Kit:* FREE 🕯️\n`;

    if (total >= rewardThreshold) {
      message += `• *Special Offer:* 🎉 FREE Cupcake Unlocked!\n`;
    }

    if (deliveryNote.trim()) {
      message += `\n*Special Instructions:* ${deliveryNote.trim()}\n`;
    }

    message += `\n*Delivery & Payment Details:*\n`;
    message += `• Name:\n`;
    message += `• Delivery Address / Area / Landmark:\n`;
    message += `• Delivery Time Slot (e.g. 5:00 PM today):\n`;
    message += `• Payment Mode: UPI (GPay / PhonePe / Paytm / QR) or Cash on Delivery\n\n`;
    message += `Please confirm my order and share your UPI number / QR code. Thank you! 🙏`;

    return `https://api.whatsapp.com/send?phone=917008198415&text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="cart-page-wrapper">
      <h1 className="cart-header-title">Your Sweet Bag</h1>
      <p className="cart-header-sub">
        Review your freshly baked cakes & cupcakes before placing order.
      </p>

      {cart.length === 0 ? (
        <div className="empty-cart-card">
          <div className="empty-cart-icon">🛍️</div>
          <h2 className="empty-cart-title">Your Bag is Empty</h2>
          <p className="empty-cart-desc">
            You haven't selected any cakes yet. Check out our fresh Black Forest,
            Pineapple, Chocolate Truffle, and Rasmalai cakes!
          </p>
          <Link href="/" className="explore-menu-btn">
            <span>🎂</span>
            <span>View All Fresh Cakes</span>
          </Link>
        </div>
      ) : (
        <>
          {/* Gamified Reward Progress */}
          <div className="cart-gamification-card">
            <div className="gamification-text-row">
              {remainingForReward === 0 ? (
                <span>🎉 Congratulations! You unlocked a <strong>FREE Cupcake</strong>!</span>
              ) : (
                <span>
                  🎁 Add <strong>₹{remainingForReward}</strong> more to get a <strong>FREE Cupcake</strong>!
                </span>
              )}
              <span>{progressPercent}%</span>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="cart-layout-grid">
            {/* Left: Cart Items List */}
            <div className="cart-items-container">
              {cart.map((item) => (
                <Cart dta={item} key={item.key} />
              ))}

              {/* Delivery Note Box */}
              <div style={{
                background: "var(--bg-surface)",
                padding: "16px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-light)",
                marginTop: "10px"
              }}>
                <label style={{ fontSize: "13px", fontWeight: "700", color: "var(--brand-chocolate)", display: "block", marginBottom: "8px" }}>
                  Delivery Notes / Celebration Timing
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please deliver by 6 PM, less sugar, ring the bell..."
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-light)",
                    background: "var(--bg-subtle)"
                  }}
                />
              </div>
            </div>

            {/* Right: Summary Panel */}
            <div className="order-summary-panel">
              <h3 className="summary-title">Bill Details</h3>

              <div className="summary-row">
                <span>Item Total</span>
                <span>₹{total}</span>
              </div>

              <div className="summary-row">
                <span>Free Birthday Kit (Candles & Knife)</span>
                <span className="badge-free">FREE 🕯️</span>
              </div>

              <div className="summary-row">
                <span>2-Hour Express Delivery</span>
                <span className="badge-free">FREE ⚡</span>
              </div>

              {total >= rewardThreshold && (
                <div className="summary-row" style={{ color: "var(--brand-caramel)", fontWeight: "700" }}>
                  <span>Free Surprise Cupcake</span>
                  <span className="badge-free">UNLOCKED 🎉</span>
                </div>
              )}

              <div className="summary-row bold">
                <span>To Pay</span>
                <span>₹{total}</span>
              </div>

              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-checkout-btn"
              >
                <span>💬</span>
                <span>Order on WhatsApp (UPI / COD)</span>
              </a>

              <div className="checkout-reassurance">
                <span>🔒</span>
                <span>Instant Confirmation • GPay, PhonePe, Paytm, Cash</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
