import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Container from "@/components/atoms/Container";
import Button from "@/components/atoms/Button";
import CourseCard from "@/components/molecules/CourseCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import courseService from "@/services/api/courseService";
import userService from "@/services/api/userService";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recentCourses, setRecentCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Load user data
      const userData = await userService.getCurrentUser();
      setUser(userData);
      
      // Load all courses
      const allCourses = await courseService.getAll();
      
      // Filter enrolled courses
      const userEnrolledCourses = allCourses.filter(course =>
        userData.enrolledCourses.includes(course.Id)
      );
      setEnrolledCourses(userEnrolledCourses);
      
      // Get recent courses (first 3 for demo)
      setRecentCourses(allCourses.slice(0, 3));
      
    } catch (err) {
      setError(err.message || "대시보드 데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const stats = [
    {
      label: "수강 중인 강의",
      value: enrolledCourses.length,
      icon: "BookOpen",
      color: "text-blue-600"
    },
    {
      label: "완료한 강의",
      value: "12",
      icon: "CheckCircle",
      color: "text-green-600"
    },
    {
      label: "학습 시간",
      value: "48h",
      icon: "Clock",
      color: "text-purple-600"
    },
    {
      label: "획득 점수",
      value: "850",
      icon: "Trophy",
      color: "text-yellow-600"
    }
  ];

  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <Container>
          <Loading message="대시보드를 로딩 중입니다..." />
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-16">
        <Container>
          <Error message={error} onRetry={loadDashboardData} />
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-gray-50">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  안녕하세요, {user?.name}님! 👋
                </h1>
                <p className="text-gray-600">
                  오늘도 새로운 것을 배워보세요. 여러분의 성장을 응원합니다!
                </p>
              </div>
              <div className="hidden md:block">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                  <ApperIcon name="User" size={40} className="text-primary-600" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center`}>
                  <ApperIcon name={stat.icon} size={24} className={stat.color} />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                </div>
              </div>
              <h3 className="text-sm text-gray-600">
                {stat.label}
              </h3>
            </div>
          ))}
        </motion.div>

        {/* Enrolled Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              수강 중인 강의
            </h2>
            <Button variant="outline" size="sm">
              <ApperIcon name="Plus" size={16} className="mr-2" />
              강의 추가
            </Button>
          </div>

          {enrolledCourses.length === 0 ? (
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <Empty
                title="수강 중인 강의가 없습니다"
                description="새로운 강의를 시작해보세요!"
                icon="BookOpen"
                actionLabel="강의 둘러보기"
                onAction={() => window.location.href = "/courses"}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <CourseCard key={course.Id} course={course} />
              ))}
            </div>
          )}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Learning Progress */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              학습 진도
            </h3>
            <div className="space-y-4">
              {enrolledCourses.slice(0, 3).map((course, index) => (
                <div key={course.Id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <ApperIcon name="BookOpen" size={16} className="text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{course.title}</p>
                      <p className="text-sm text-gray-600">{course.instructor}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary-600">
                      {65 + index * 15}%
                    </p>
                    <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-full bg-primary-600 rounded-full"
                        style={{ width: `${65 + index * 15}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Courses */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              추천 강의
            </h3>
            <div className="space-y-4">
              {recentCourses.map((course) => (
                <div key={course.Id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <ApperIcon name="Star" size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{course.title}</p>
                      <p className="text-sm text-gray-600">{course.instructor}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    보기
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Dashboard;