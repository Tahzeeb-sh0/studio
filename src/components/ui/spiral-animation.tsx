
'use client';
import { cn } from "@/lib/utils";

export const SpiralAnimation = () => {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-black">
      <div className="absolute h-full w-full animate-spiral-rotate [mask-image:radial-gradient(transparent,black_75%)]">
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent",
            "animate-spiral-transform origin-[50%_70%] [transform-style:preserve-3d]"
          )}
        >
          <div
            className={cn(
              "absolute inset-0 bg-[radial-gradient(transparent,black),repeating-radial-gradient(black,black_1px,transparent_1px,transparent_4px)] bg-[length:100%_100%,1rem_1rem] bg-fixed",
              "animate-spiral-bg-scroll"
            )}
          ></div>
        </div>
      </div>
    </div>
  );
};
