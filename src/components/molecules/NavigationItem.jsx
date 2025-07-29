import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const NavigationItem = ({ item, className, onClick }) => {
  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
          "hover:bg-primary-50 hover:text-primary-700",
          isActive
            ? "bg-primary-100 text-primary-700 border border-primary-200"
            : "text-gray-700 hover:text-primary-700",
          className
        )
      }
    >
      {item.icon && (
        <ApperIcon name={item.icon} size={18} />
      )}
      <span>{item.label}</span>
    </NavLink>
  );
};

export default NavigationItem;