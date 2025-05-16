import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { motion } from "framer-motion";

const Progress = React.forwardRef(({ className, value, color = "bg-primary", ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className="relative h-4 w-full overflow-hidden rounded-full bg-gray-100"
    {...props}>
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`h-full ${color} transition-all`}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
