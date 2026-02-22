import { useEffect, useRef, useState } from 'react';
import { Shield, UserCheck, Network, Search } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';

const categories = [
  {
    icon: UserCheck,
    title: '认证？',
    color: 'from-blue-500 to-cyan-500',
    items: ['远程接入', '本地接入', '应用认证'],
  },
  {
    icon: Network,
    title: '连接？',
    color: 'from-green-500 to-emerald-500',
    items: ['连接质量', '暴露面', '信道加密'],
  },
  {
    icon: Shield,
    title: '管控？',
    color: 'from-orange-500 to-amber-500',
    items: ['访问控制', '行为管理', '安全防护'],
  },
  {
    icon: Search,
    title: '分析？',
    color: 'from-purple-500 to-violet-500',
    items: ['行为分析', '安全分析', '体验分析'],
  },
];

export default function EnterpriseNeeds() {
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
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* <span className="inline-block px-4 py-1.5 rounded-full bg-brand-green/10 text-brand-green text-sm font-medium mb-4">
            企业网络现状
          </span> */}
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4">
            企业网络与安全需求
          </h2>
          <p className="text-lg text-brand-gray max-w-2xl mx-auto">
            碎片化堆叠不再适配企业边界扩张
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.title}
              className={`group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <category.icon className="w-7 h-7 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-brand-dark mb-4">
                {category.title}
              </h3>

              {/* Items */}
              <ul className="space-y-3">
                {category.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-brand-gray">
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${category.color}`} />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Hover Gradient */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            </div>
          ))}
        </div>

        {/* Problems Section */}
        <div className={`mt-20 bg-gray-100 rounded-3xl p-8 lg:p-12 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-brand-dark mb-6">
                传统架构面临的问题
              </h3>
              <ul className="space-y-4">
                {[
                  '单点功能产品堆叠，采购成本高',
                  '策略碎片化且缺乏一致性，运营成本高',
                  '日志碎片化，难以分析及决策',
                  '网络与安全各自为政',
                  '云、分支与总部能力差异大',
                  '建设易规划，运营难验证',
                ].map((problem, index) => (
                  <li key={index} className="flex items-start gap-3 text-brand-gray">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                    </div>
                    {problem}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
  <OptimizedImage
    src="/xuqiu.png"
    alt="传统架构问题"
    className="w-full rounded-lg"
    loading="lazy" 
  />
</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
