import { useEffect } from "react";
import { captureRedditClickId } from "@/lib/reddit-pixel";

const DeferredHooks = () => {
  useEffect(() => {
    captureRedditClickId();
  }, []);

  return null;
};

export default DeferredHooks;
