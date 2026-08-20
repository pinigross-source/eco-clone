import { useEffect } from "react";

const TIDIO_SRC = "//code.tidio.co/cmcu3h7cgcxwkhwe6bqxenc5cyipvzmu.js";
const SCRIPT_ID = "tidio-chat-loader";

type TidioApi = {
  close?: () => void;
  display?: (visible: boolean) => void;
};

/**
 * Loads the Tidio chat widget exactly once per browser session.
 * Rendering it imperatively (instead of as JSX in <head>/<body>) prevents the
 * script from being re-inserted on hydration/navigation, which is what caused
 * multiple expanded chat boxes to appear down the page.
 */
export const TidioChat = ({ collapsed = false }: { collapsed?: boolean }) => {
  useEffect(() => {
    // Remove any duplicate loaders that slipped in before this component ran.
    document
      .querySelectorAll<HTMLScriptElement>('script[src*="code.tidio.co"]')
      .forEach((el, index) => {
        if (el.id !== SCRIPT_ID || index > 0) el.remove();
      });

    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = TIDIO_SRC;
      script.async = true;
      document.body.appendChild(script);
    }

    if (!collapsed) return;

    const collapse = () => {
      const api = (window as unknown as { tidioChatApi?: TidioApi }).tidioChatApi;
      api?.close?.();
    };
    document.addEventListener("tidioChat-ready", collapse);
    collapse();
    return () => document.removeEventListener("tidioChat-ready", collapse);
  }, [collapsed]);

  return null;
};

export default TidioChat;
