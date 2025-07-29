import React from "react";
import { cn } from "@/utils/cn";

const FooterSection = ({ title, children, className }) => {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
};

export default FooterSection;