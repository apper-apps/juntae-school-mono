import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Container from "@/components/atoms/Container";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import userService from "@/services/api/userService";
import courseService from "@/services/api/courseService";
import { toast } from "react-toastify";

const MyAccount = () => {
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const tabs = [
    { id: "profile", label: "프로필", icon: "User" },
    { id: "courses", label: "수강 내역", icon: "BookOpen" },
    { id: "certificates", label: "수료증", icon: "Award" },
    { id: "settings", label: "설정", icon: "Settings" },
  ];

  const loadAccountData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const userData = await userService.getCurrentUser();
      setUser(userData);
      setFormData({
        name: userData.name,
        email: userData.email,
      });
      
      const allCourses = await courseService.getAll();
      const userEnrolledCourses = allCourses.filter(course =>
        userData.enrolledCourses.includes(course.Id)
      );
      setEnrolledCourses(userEnrolledCourses);
      
    } catch (err) {
      setError(err.message || "계정 정보를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccountData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await userService.updateProfile(user.Id, formData);
      setUser(prev => ({ ...prev, ...formData }));
      toast.success("프로필이 성공적으로 업데이트되었습니다.");
    } catch (err) {
      toast.error("프로필 업데이트에 실패했습니다.");
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <Container>
          <Loading message="계정 정보를 로딩 중입니다..." />
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-16">
        <Container>
          <Error message={error} onRetry={loadAccountData} />
        </Container>
      </div>
    );
  }

  const renderProfileTab = () => (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">프로필 정보</h2>
      
      <div className="flex items-center gap-6 mb-8">
        <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
          <ApperIcon name="User" size={48} className="text-primary-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
          <Button variant="outline" size="sm" className="mt-2">
            <ApperIcon name="Upload" size={16} className="mr-2" />
            사진 변경
          </Button>
        </div>
      </div>

      <form onSubmit={handleProfileUpdate} className="space-y-6">
        <div>
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-2"
          />
        </div>
        
        <div>
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-2"
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit">
            변경사항 저장
          </Button>
          <Button variant="outline" type="button">
            취소
          </Button>
        </div>
      </form>
    </div>
  );

  const renderCoursesTab = () => (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">수강 내역</h2>
      
      {enrolledCourses.length === 0 ? (
        <div className="text-center py-8">
          <ApperIcon name="BookOpen" size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            수강 중인 강의가 없습니다
          </h3>
          <p className="text-gray-600 mb-4">
            새로운 강의를 시작해보세요!
          </p>
          <Button>
            강의 둘러보기
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {enrolledCourses.map((course) => (
            <div key={course.Id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <ApperIcon name="BookOpen" size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{course.title}</h3>
                    <p className="text-sm text-gray-600">{course.instructor}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-primary-600">75% 완료</span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                    <div className="w-3/4 h-full bg-primary-600 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderCertificatesTab = () => (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">수료증</h2>
      
      <div className="text-center py-8">
        <ApperIcon name="Award" size={48} className="text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          아직 수료한 강의가 없습니다
        </h3>
        <p className="text-gray-600 mb-4">
          강의를 완료하고 수료증을 받아보세요!
        </p>
        <Button>
          수강 중인 강의 보기
        </Button>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">설정</h2>
      
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">알림 설정</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-gray-700">새로운 강의 알림</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-gray-700">과제 마감일 알림</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="rounded" />
              <span className="text-gray-700">마케팅 이메일 수신</span>
            </label>
          </div>
        </div>

        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">개인정보</h3>
          <div className="space-y-3">
            <Button variant="outline">
              비밀번호 변경
            </Button>
            <Button variant="outline">
              개인정보 다운로드
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">계정 관리</h3>
          <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
            계정 삭제
          </Button>
        </div>
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileTab();
      case "courses":
        return renderCoursesTab();
      case "certificates":
        return renderCertificatesTab();
      case "settings":
        return renderSettingsTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">내 계정</h1>
          <p className="text-gray-600">계정 정보와 학습 현황을 관리하세요</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                      activeTab === tab.id
                        ? "bg-primary-100 text-primary-700 border border-primary-200"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <ApperIcon name={tab.icon} size={18} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {renderActiveTab()}
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default MyAccount;