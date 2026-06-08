import { useEffect } from "react";

/**
 * GoogleCallback — loaded inside the Google OAuth popup window.
 * The id_token is in window.location.hash; the parent window reads it
 * via the interval in Login.jsx and closes this popup automatically.
 * This component just shows a brief "closing…" message as a fallback.
 */
const GoogleCallback = () => {
  useEffect(() => {
    // Attempt to close the popup ourselves after a short delay.
    // The parent's interval will typically close it first.
    const timer = setTimeout(() => {
      window.close();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "sans-serif",
        color: "#555",
      }}
    >
      Signing you in…
    </div>
  );
};

export default GoogleCallback;
