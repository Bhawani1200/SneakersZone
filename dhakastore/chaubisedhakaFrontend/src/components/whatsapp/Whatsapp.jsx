import React, { useState } from "react";
import whatsappIcon from "../../assets/logo/whatsapp.jpg";

const PHONE_NUMBER = "9779810357550";
const ACCOUNT_NAME = "SneakersZone";
const CHAT_MESSAGE = "Hello! How can I help you with your shoe needs today? 👟";
const PLACEHOLDER = "Type your message...";

const styles = {
  wrapper: {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "10px",
    fontFamily: "sans-serif",
  },
  chatBox: {
    width: "300px",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
    background: "#fff",
    display: "flex",
    flexDirection: "column",
  },
  chatHeader: {
    background: "#075e54",
    padding: "14px 16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#fff",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #25D366",
  },
  headerInfo: {
    display: "flex",
    flexDirection: "column",
  },
  headerName: {
    fontWeight: "700",
    fontSize: "15px",
  },
  headerStatus: {
    fontSize: "12px",
    opacity: 0.85,
  },
  chatBody: {
    background: "#e5ddd5",
    padding: "14px",
    minHeight: "80px",
    display: "flex",
    alignItems: "flex-start",
  },
  bubble: {
    background: "#fff",
    borderRadius: "0 8px 8px 8px",
    padding: "10px 14px",
    fontSize: "14px",
    color: "#333",
    maxWidth: "240px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
    lineHeight: 1.5,
  },
  chatFooter: {
    display: "flex",
    padding: "8px",
    borderTop: "1px solid #e0e0e0",
    gap: "8px",
    alignItems: "center",
    background: "#f0f0f0",
  },
  input: {
    flex: 1,
    border: "none",
    borderRadius: "20px",
    padding: "8px 14px",
    fontSize: "14px",
    outline: "none",
    background: "#fff",
  },
  sendBtn: {
    background: "#25D366",
    border: "none",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },
  fab: {
    width: "58px",
    height: "58px",
    borderRadius: "14px",
    background: "transparent",
    border: "none",
    boxShadow: "0 4px 16px rgba(37,211,102,0.45)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.2s, box-shadow 0.2s",
    padding: 0,
  },
  fabImg: {
    width: "58px",
    height: "58px",
    borderRadius: "14px",
    objectFit: "cover",
  },
};

export default function Whatsapp() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const text = message.trim() || CHAT_MESSAGE;
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div style={styles.wrapper}>
      {open && (
        <div style={styles.chatBox}>
          <div style={styles.chatHeader}>
            <img src={whatsappIcon} alt="WhatsApp" style={styles.avatar} />
            <div style={styles.headerInfo}>
              <span style={styles.headerName}>{ACCOUNT_NAME}</span>
              <span style={styles.headerStatus}>
                Typically replies instantly
              </span>
            </div>
          </div>

          <div style={styles.chatBody}>
            <div style={styles.bubble}>{CHAT_MESSAGE}</div>
          </div>

          <div style={styles.chatFooter}>
            <input
              style={styles.input}
              type="text"
              placeholder={PLACEHOLDER}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              style={styles.sendBtn}
              onClick={handleSend}
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        style={styles.fab}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open WhatsApp chat"
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 6px 24px rgba(37,211,102,0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(37,211,102,0.45)";
        }}
      >
        {open ? (
          // Close X icon
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        ) : (
          <img src={whatsappIcon} alt="WhatsApp" style={styles.fabImg} />
        )}
      </button>
    </div>
  );
}
