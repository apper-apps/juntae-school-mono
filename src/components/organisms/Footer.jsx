import React from "react";
import Container from "@/components/atoms/Container";
import FooterSection from "@/components/molecules/FooterSection";
import ApperIcon from "@/components/ApperIcon";
import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { label: "홈", path: "/" },
    { label: "강의", path: "/courses" },
    { label: "멤버십", path: "/membership" },
    { label: "대시보드", path: "/dashboard" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", url: "#" },
    { name: "Twitter", icon: "Twitter", url: "#" },
    { name: "Instagram", icon: "Instagram", url: "#" },
    { name: "YouTube", icon: "Youtube", url: "#" },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                  <ApperIcon name="GraduationCap" size={28} className="text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">준태스쿨</span>
              </div>
              <p className="text-gray-600 mb-6 max-w-md">
                최고의 온라인 교육 플랫폼에서 새로운 기술과 지식을 배워보세요. 
                전문 강사진과 체계적인 커리큘럼으로 여러분의 성장을 도와드립니다.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <ApperIcon name="Mail" size={18} className="text-primary-600" />
                  <span className="text-gray-700">contact@juntaeschool.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <ApperIcon name="Phone" size={18} className="text-primary-600" />
                  <span className="text-gray-700">02-1234-5678</span>
                </div>
                <div className="flex items-center gap-3">
                  <ApperIcon name="MapPin" size={18} className="text-primary-600" />
                  <span className="text-gray-700">서울특별시 강남구 테헤란로 123</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <FooterSection title="빠른 링크">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-gray-600 hover:text-primary-600 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </FooterSection>

            {/* Contact & Social */}
            <FooterSection title="소셜 미디어">
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-200 group"
                    aria-label={social.name}
                  >
                    <ApperIcon 
                      name={social.icon} 
                      size={18} 
                      className="text-gray-600 group-hover:text-white" 
                    />
                  </a>
                ))}
              </div>
              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-2">뉴스레터 구독</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="이메일 주소"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  />
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition-colors duration-200">
                    구독
                  </button>
                </div>
              </div>
            </FooterSection>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              © 2024 준태스쿨. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="#" className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200">
                개인정보처리방침
              </Link>
              <Link to="#" className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200">
                이용약관
              </Link>
              <Link to="#" className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200">
                고객지원
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;