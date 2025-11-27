import React from "react";

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      {/* ambient blobs */}
      <div className="bg-ambient">
        <div className="blob b1"></div>
        <div className="blob b2"></div>
      </div>

      {/* floating header outside the card (Option B) */}
      <div className="header-float">
        <div className="logo-wrap">
          {/* put logo.png in your public root (e.g. public/logo.png) */}
          <img src="/logo.png" alt="Notely logo" />
        </div>
        <div className="company text-xl">Chronicle HQ</div>
        <div className="product text-sm">Notely — Make your notes quickly!!</div>
      </div>

      {/* app shell + glass card */}
      <div className="app-shell">
        <div className="app-card">
          {children}
        </div>
      </div>
    </>
  );
};
