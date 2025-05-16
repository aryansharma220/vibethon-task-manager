import React from "react";
import { cn } from "../../lib/utils";

export const BackgroundGrid = ({ children, className }) => {
  return (
    <div className={cn("h-full w-full bg-white dark:bg-black dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative", className)}>
      {/* Radial gradient for the background */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {children}
    </div>
  );
};
