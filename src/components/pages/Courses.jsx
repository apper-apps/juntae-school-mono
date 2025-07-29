import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Container from "@/components/atoms/Container";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import CourseGrid from "@/components/organisms/CourseGrid";
import Loading, { SkeletonGrid } from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import courseService from "@/services/api/courseService";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "전체", icon: "Grid3x3" },
    { id: "programming", label: "프로그래밍", icon: "Code" },
    { id: "design", label: "디자인", icon: "Palette" },
    { id: "data", label: "데이터", icon: "Database" },
    { id: "mobile", label: "모바일", icon: "Smartphone" },
  ];

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError("");
      const coursesData = await courseService.getAll();
      setCourses(coursesData);
      setFilteredCourses(coursesData);
    } catch (err) {
      setError(err.message || "강의를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    let filtered = [...courses];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      // Simple category matching based on course title keywords
      const categoryKeywords = {
        programming: ["react", "python", "node", "javascript", "개발"],
        design: ["ui", "ux", "디자인"],
        data: ["데이터", "분석", "머신러닝"],
        mobile: ["모바일", "앱", "react native"],
      };

      const keywords = categoryKeywords[selectedCategory] || [];
      filtered = filtered.filter(course =>
        keywords.some(keyword =>
          course.title.toLowerCase().includes(keyword) ||
          course.description.toLowerCase().includes(keyword)
        )
      );
    }

    setFilteredCourses(filtered);
  }, [courses, searchQuery, selectedCategory]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="pt-24 pb-16">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            모든 강의
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            다양한 분야의 전문 강의를 통해 새로운 기술을 배워보세요
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          {/* Search Bar */}
          <div className="relative mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <ApperIcon
                name="Search"
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <Input
                type="text"
                placeholder="강의명, 강사명으로 검색..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-12"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => handleCategoryChange(category.id)}
                className="flex items-center gap-2"
              >
                <ApperIcon name={category.icon} size={16} />
                {category.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {loading ? (
            <SkeletonGrid count={6} />
          ) : error ? (
            <Error message={error} onRetry={loadCourses} />
          ) : filteredCourses.length === 0 ? (
            <Empty
              title={searchQuery || selectedCategory !== "all" ? "검색 결과가 없습니다" : "강의가 없습니다"}
              description={
                searchQuery || selectedCategory !== "all"
                  ? "다른 검색어나 카테고리를 시도해보세요."
                  : "아직 등록된 강의가 없습니다."
              }
              icon="BookOpen"
              actionLabel="모든 강의 보기"
              onAction={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            />
          ) : (
            <>
              <div className="mb-8">
                <p className="text-gray-600">
                  총 <span className="font-semibold text-primary-600">{filteredCourses.length}</span>개의 강의
                </p>
              </div>
              <CourseGrid courses={filteredCourses} />
            </>
          )}
        </motion.div>
      </Container>
    </div>
  );
};

export default Courses;