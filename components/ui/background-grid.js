import React from "react";
import { cn } from "../../lib/utils";

export const BackgroundGrid = ({ children, className }) => {
  return (    <div className={cn("h-full w-full bg-white dark:bg-zinc-950 dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative transition-colors duration-300", className)}>
      {/* Radial gradient for the background */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-zinc-950 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] transition-colors duration-300"></div>
      {children}
    </div>
  );
};
