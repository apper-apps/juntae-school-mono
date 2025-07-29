import React from "react";
import { cn } from "@/utils/cn";

const Container = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    />
  );
});

Container.displayName = "Container";

export default Container;