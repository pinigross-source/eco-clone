import { useEffect } from "react";
import { useCartAbandonment } from "@/hooks/useCartAbandonment";
import { captureRedditClickId } from "@/lib/reddit-pixel";

const DeferredHooks = () => {
  useCartAbandonment();

  useEffect(() => {
    captureRedditClickId();
  }, []);

  return null;
};

export default DeferredHooks;
