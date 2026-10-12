import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

export const HowItWorksVideoModal = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="xl"
        variant="outline"
        className={`group rounded-xl border-2 border-primary/40 font-bold text-base text-primary bg-primary/5 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 ${className ?? ""}`}
        onClick={() => {
          setOpen(true);
          trackEvent("click_see_how_it_works_video");
        }}
      >
        <Play className="w-4 h-4 mr-1.5 fill-primary" />
        See How It Works
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-black border-none rounded-2xl overflow-hidden [&>button]:text-white [&>button]:hover:text-white/80">
          <div className="aspect-video w-full">
            {open && (
              <iframe
                src="https://player.vimeo.com/video/1146300437?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1"
                title="See How EnviroBiotics Works"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                className="w-full h-full"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
