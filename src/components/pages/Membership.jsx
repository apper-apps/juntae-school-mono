import React from "react";
import { motion } from "framer-motion";
import Container from "@/components/atoms/Container";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Membership = () => {
  const plans = [
    {
      name: "베이직",
      price: "무료",
      period: "",
      description: "기본적인 학습 기능을 제공합니다",
      features: [
        "무료 강의 수강",
        "기본 학습 진도 관리",
        "커뮤니티 참여",
        "모바일 앱 이용"
      ],
      popular: false,
      buttonText: "무료 시작하기",
      buttonVariant: "outline"
    },
    {
      name: "프리미엄",
      price: "29,000",
      period: "/월",
      description: "모든 강의와 프리미엄 기능을 이용하세요",
      features: [
        "모든 강의 무제한 수강",
        "강의 자료 다운로드",
        "1:1 멘토링 서비스",
        "수료증 발급",
        "오프라인 모임 참여",
        "우선 고객지원"
      ],
      popular: true,
      buttonText: "프리미엄 시작하기",
      buttonVariant: "default"
    },
    {
      name: "엔터프라이즈",
      price: "문의",
      period: "",
      description: "기업 교육에 최적화된 솔루션입니다",
      features: [
        "맞춤형 기업 교육",
        "학습 관리 시스템",
        "상세 학습 분석",
        "전담 매니저 배정",
        "API 연동 지원",
        "24/7 기술 지원"
      ],
      popular: false,
      buttonText: "문의하기",
      buttonVariant: "outline"
    }
  ];

  const benefits = [
    {
      icon: "BookOpen",
      title: "500+ 전문 강의",
      description: "다양한 분야의 고품질 강의를 무제한으로 수강하세요"
    },
    {
      icon: "Users",
      title: "전문가 멘토링",
      description: "현업 전문가들의 1:1 멘토링으로 실무 역량을 키워보세요"
    },
    {
      icon: "Award",
      title: "공식 수료증",
      description: "과정 완료 시 공식 수료증을 발급받아 경력에 도움이 되세요"
    },
    {
      icon: "Smartphone",
      title: "모바일 학습",
      description: "언제나 어디서나 모바일로 편리하게 학습하세요"
    }
  ];

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

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
                plan.popular
                  ? "border-primary-500 transform scale-105"
                  : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    가장 인기있는 플랜
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-primary-600">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-gray-600">{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <ApperIcon
                      name="Check"
                      size={20}
                      className="text-green-500 flex-shrink-0"
                    />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.buttonVariant}
                className="w-full"
                size="lg"
              >
                {plan.buttonText}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            멤버십 혜택
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            준태스쿨 멤버십으로 누릴 수 있는 특별한 혜택들을 확인해보세요
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ApperIcon name={benefit.icon} size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-50 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            자주 묻는 질문
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                언제든지 구독을 취소할 수 있나요?
              </h3>
              <p className="text-gray-600">
                네, 언제든지 구독을 취소하실 수 있습니다. 취소 후에도 현재 결제 기간 동안은 모든 기능을 계속 이용하실 수 있습니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                환불 정책은 어떻게 되나요?
              </h3>
              <p className="text-gray-600">
                구독 후 7일 이내에 환불을 요청하시면 전액 환불해드립니다. 그 이후에는 남은 기간에 대해 비례 환불해드립니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                여러 기기에서 사용할 수 있나요?
              </h3>
              <p className="text-gray-600">
                네, 하나의 계정으로 최대 3개의 기기에서 동시에 이용하실 수 있습니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                수료증은 언제 발급되나요?
              </h3>
              <p className="text-gray-600">
                강의를 80% 이상 수강하고 모든 과제를 완료하시면 즉시 수료증이 발급됩니다.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Membership;