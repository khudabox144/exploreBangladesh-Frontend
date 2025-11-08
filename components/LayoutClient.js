"use client";

import { useEffect } from "react";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { Tooltip } from "react-tooltip";

// Optional: Remove Crisp chat entirely if you don’t want it
// import { Crisp } from "crisp-sdk-web";
// import config from "@/config";

const ClientLayout = ({ children }) => {
  // If you want Crisp chat later, you can add it back without Supabase
  useEffect(() => {
    // Example: Initialize Crisp only (no Supabase)
    /*
    if (config?.crisp?.id) {
      Crisp.configure(config.crisp.id);
    }
    */
  }, []);

  return (
    <>
      {/* Top progress bar */}
      <NextTopLoader color="#7c3aed" showSpinner={false} />

      {/* Page content */}
      {children}

      {/* Toast notifications */}
      <Toaster toastOptions={{ duration: 3000 }} />

      {/* Tooltips */}
      <Tooltip id="tooltip" className="z-[60] !opacity-100 max-w-sm shadow-lg" />
    </>
  );
};

export default ClientLayout;
