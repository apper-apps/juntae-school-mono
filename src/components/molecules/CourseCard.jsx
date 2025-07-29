import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const CourseCard = ({ course, className }) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300",
        "border border-gray-200 overflow-hidden",
        className
      )}
    >
      <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <ApperIcon name="BookOpen" size={48} className="text-primary-600 opacity-50" />
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-primary-700">{course.duration}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {course.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ApperIcon name="User" size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600">{course.instructor}</span>
          </div>
          <div className="flex items-center gap-2">
            <ApperIcon name="Users" size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600">{course.enrollmentCount}명</span>
          </div>
        </div>
        
        <button className="w-full bg-primary-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200">
          강의 보기
        </button>
      </div>
    </motion.div>
  );
};

export default CourseCard;