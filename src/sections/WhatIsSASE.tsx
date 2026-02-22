import { useEffect, useRef, useState } from 'react';
import { Layers, Fingerprint, Cloud, Cable } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';

const features = [
  {
    icon: Layers,
    title: '深度融合',
    description: '网络与安全能力深度融合，统一平台交付',
  },
  {
    icon: Fingerprint,
    title: '身份驱动',
    description: '以身份为核心，应用感知的安全策略',
  },
  {
    icon: Cloud,
    title: '云原生',
    description: '云原生架构，全球覆盖，弹性扩展',
  },
  {
    icon: Cable,
    title: '多种接入',
    description: '支持多种企业接入方式，灵活部署',
  },
];

export default function WhatIsSASE() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-brand-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* <span className="inline-block px-4 py-1.5 rounded-full bg-brand-green/10 text-brand-green text-sm font-medium mb-4">
            什么是 SASE
          </span> */}
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4">
            What is SASE?
          </h2>
          <p className="text-lg text-brand-gray max-w-3xl mx-auto">
            以身份为核心、以应用为边界，在云上交付一致的网络与安全能力。
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center mb-4 group-hover:bg-brand-green group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-brand-green group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-brand-gray">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* SASE Architecture Visual */}
        <div className={`bg-white rounded-3xl p-8 lg:p-12 shadow-lg border border-gray-100 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-brand-dark mb-6">
                SASE 核心架构
              </h3>
              <p className="text-brand-gray mb-6 leading-relaxed">
                SASE 将软件定义广域网（SD-WAN）与网络安全功能（如防火墙即服务、零信任网络访问等）融合为统一的服务模型，通过全球分布的 PoP 点向企业边缘交付。
              </p>
              <ul className="space-y-3">
                {[
                  '统一的安全策略管理',
                  '全球分布的接入点',
                  '云原生弹性架构',
                  '身份驱动的访问控制',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-brand-gray">
                    <div className="w-5 h-5 rounded-full bg-brand-green/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-brand-green" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="relative">
  <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white">
    <OptimizedImage
      src="/problem-architecture.png"
      alt="SASE 核心架构图"
      className="w-full h-auto"
      loading="lazy"
    />
  </div>
</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
