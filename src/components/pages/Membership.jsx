import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import userService from "@/services/api/userService";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Container from "@/components/atoms/Container";
import Label from "@/components/atoms/Label";

const Membership = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    membershipTier: "Free",
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const membershipTiers = [
    {
      value: "Free",
      name: "Free",
      price: "무료",
      description: "기본적인 학습 기능을 제공합니다"
    },
    {
      value: "Basic",
      name: "Basic",
      price: "$9/month",
      description: "향상된 학습 도구와 콘텐츠에 접근하세요"
    },
    {
      value: "Premium",
      name: "Premium", 
      price: "$29/month",
      description: "모든 강의와 프리미엄 기능을 이용하세요"
    }
  ];

  const validateForm = () => {
    const newErrors = {};

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "성함을 입력해주세요.";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요.";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (formData.password.length < 8) {
      newErrors.password = "비밀번호는 최소 8자 이상이어야 합니다.";
    }

    // Terms validation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "이용약관에 동의해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("입력 정보를 확인해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      await userService.registerUser(formData);
      setIsRegistered(true);
      toast.success("회원가입이 완료되었습니다!");
    } catch (error) {
      toast.error(error.message || "회원가입 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isRegistered) {
    return (
      <Container className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <ApperIcon name="CheckCircle" size={48} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              환영합니다!
            </h2>
            <p className="text-gray-600 mb-6">
              {formData.fullName}님의 회원가입이 성공적으로 완료되었습니다.
            </p>
            <div className="bg-white rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">선택한 멤버십</p>
              <p className="font-medium text-gray-900">
                {membershipTiers.find(tier => tier.value === formData.membershipTier)?.name} - {membershipTiers.find(tier => tier.value === formData.membershipTier)?.price}
              </p>
            </div>
            <Button 
              onClick={() => {
                setIsRegistered(false);
                setFormData({
                  fullName: "",
                  email: "",
                  password: "",
                  membershipTier: "Free",
                  acceptTerms: false
                });
              }}
              variant="outline"
            >
              새로운 회원가입
            </Button>
          </div>
        </motion.div>
      </Container>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            멤버십 플랜
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            여러분의 학습 목표에 맞는 최적의 플랜을 선택하세요
          </p>
        </motion.div>

{/* Membership Registration Form */}
        <Container className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-lg mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                멤버십 가입
              </h1>
              <p className="text-lg text-gray-600">
                준태스쿨의 다양한 혜택을 누리세요
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-lg p-8">
              {/* Full Name Field */}
              <div>
                <Label htmlFor="fullName" className="mb-2 block">
                  성함 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="성함을 입력해주세요"
                  className={errors.fullName ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : ""}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <Label htmlFor="email" className="mb-2 block">
                  이메일 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="이메일을 입력해주세요"
                  className={errors.email ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : ""}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <Label htmlFor="password" className="mb-2 block">
                  비밀번호 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="최소 8자 이상 입력해주세요"
                  className={errors.password ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : ""}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Membership Tier Selection */}
              <div>
                <Label className="mb-3 block">
                  멤버십 선택 <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-3">
                  {membershipTiers.map((tier) => (
                    <label
                      key={tier.value}
                      className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary-500 transition-colors"
                    >
                      <input
                        type="radio"
                        name="membershipTier"
                        value={tier.value}
                        checked={formData.membershipTier === tier.value}
                        onChange={handleInputChange}
                        className="mt-1 text-primary-600 focus:ring-primary-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900">{tier.name}</span>
                          <span className="text-primary-600 font-semibold">{tier.price}</span>
                        </div>
                        <p className="text-sm text-gray-600">{tier.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="mt-1 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">
                    <span className="text-red-500">*</span> 이용약관 및 개인정보처리방침에 동의합니다.
                  </span>
                </label>
                {errors.acceptTerms && (
                  <p className="mt-1 text-sm text-red-500 ml-6">{errors.acceptTerms}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <ApperIcon name="Loader2" size={20} className="mr-2 animate-spin" />
                    가입 처리 중...
                  </>
                ) : (
                  "멤버십 가입하기"
                )}
              </Button>
            </form>
          </motion.div>
        </Container>
      </Container>
    </div>
  );
};

export default Membership;