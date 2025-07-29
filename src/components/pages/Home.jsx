import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Container from "@/components/atoms/Container";
import Button from "@/components/atoms/Button";
import HeroSection from "@/components/organisms/HeroSection";
import CourseGrid from "@/components/organisms/CourseGrid";
import Loading, { SkeletonGrid } from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import courseService from "@/services/api/courseService";

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadFeaturedCourses = async () => {
    try {
      setLoading(true);
      setError("");
      const courses = await courseService.getFeatured(6);
      setFeaturedCourses(courses);
    } catch (err) {
      setError(err.message || "강의를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeaturedCourses();
  }, []);

  const features = [
    {
      icon: "BookOpen",
      title: "다양한 강의",
      description: "프로그래밍부터 디자인까지 500+ 강의"
    },
    {
      icon: "Users",
      title: "전문 강사진",
      description: "현업 전문가들의 실무 경험 공유"
    },
    {
      icon: "Clock",
      title: "언제든지 학습",
      description: "24시간 언제든지 원하는 시간에"
    },
    {
      icon: "Award",
      title: "수료증 발급",
      description: "과정 완료 시 공식 수료증 제공"
    }
  ];

  return (
    <div className="pt-16">
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              왜 준태스쿨인가?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              최고의 교육 경험을 위한 모든 것이 준비되어 있습니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={feature.icon} size={32} className="text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          {loading ? (
            <div>
              <div className="text-center mb-12">
                <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
              </div>
              <SkeletonGrid count={6} />
            </div>
          ) : error ? (
            <Error message={error} onRetry={loadFeaturedCourses} />
          ) : featuredCourses.length === 0 ? (
            <Empty
              title="강의가 없습니다"
              description="아직 등록된 강의가 없습니다."
              icon="BookOpen"
            />
          ) : (
            <CourseGrid
              courses={featuredCourses}
              title="인기 강의"
              description="가장 많은 수강생들이 선택한 인기 강의들을 만나보세요"
            />
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              지금 시작하세요
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              새로운 기술을 배우고 더 나은 미래를 만들어보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary-700 hover:bg-gray-100 shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
              >
                <ApperIcon name="BookOpen" size={20} className="mr-2" />
                강의 둘러보기
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary-700 shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
              >
                <ApperIcon name="Play" size={20} className="mr-2" />
                무료 체험하기
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default Home;