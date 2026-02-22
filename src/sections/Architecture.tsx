import { useEffect, useRef, useState } from 'react';
import { Shield, Users, Globe, BarChart3,ShieldEllipsis } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';

const architectureLayers = [
  {
    title: 'UniAuth',
    subtitle: '统一身份认证',
    icon: Users,
    color: 'bg-blue-500',
    description: '企业级统一身份与访问管理平台',
  },
  {
    title: 'UniCtrl',
    subtitle: '统一控制',
    icon: ShieldEllipsis,
    color: 'bg-green-500',
    description: '统一策略控制与编排引擎',
  },
  {
    title: 'UniLog',
    subtitle: '统一日志分析',
    icon: BarChart3,
    color: 'bg-purple-500',
    description: '统一可视化与分析系统',
  },
];

// Pre-generate random positions for pulsing nodes
const nodePositions = Array.from({ length: 8 }, () => ({
  top: 20 + Math.random() * 60,
  left: 15 + Math.random() * 70,
}));

// const capabilities = [
//   { icon: Globe, label: '全球骨干网', desc: '150+ PoPs' },
//   { icon: Lock, label: '安全防护', desc: '威胁情报' },
//   { icon: Database, label: '数据可视化', desc: '全量日志' },
//   { icon: Server, label: '弹性架构', desc: '云原生' },
// ];

export default function Architecture() {
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
            UniSASE 架构
          </span> */}
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4">
            UniSASE 统一的网络与安全深度融合服务平台
          </h2>
          <p className="text-lg text-brand-gray max-w-3xl mx-auto mb-12">
            以统一身份、统一控制与统一可视化为核心能力，构建完整的网络与安全闭环
          </p>
          
          {/* Architecture Image */}
          <OptimizedImage src="/architecture.png" alt="UniSASE 平台架构图" className="w-full max-w-4xl mx-auto p-6 rounded-2xl bg-white" loading="lazy" />
        </div>

        {/* Architecture Diagram */}
        <div className={`relative mb-16 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-br from-brand-light-gray to-white rounded-3xl p-8 lg:p-12 border border-gray-100">
            {/* Three Layers */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {architectureLayers.map((layer, index) => (
                <div
                  key={layer.title}
                  className="group relative bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-brand-green/30 transition-all duration-300 hover:shadow-lg"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`w-12 h-12 rounded-xl ${layer.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <layer.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-1">{layer.title}</h3>
                  <p className="text-sm text-brand-green font-medium mb-3">{layer.subtitle}</p>
                  <p className="text-sm text-brand-gray">{layer.description}</p>
                </div>
              ))}
            </div>

            {/* Connecting Line */}
           

            {/* Bottom Capabilities */}
            {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-0"> */}
              {/* {capabilities.map((cap, index) => (
                <div
                  key={cap.label}
                  className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 hover:border-brand-green/30 hover:shadow-md transition-all"
                  style={{ animationDelay: `${(index + 3) * 150}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center">
                    <cap.icon className="w-5 h-5 text-brand-green" />
                  </div>
                  <div>
                    <div className="font-semibold text-brand-dark text-sm">{cap.label}</div>
                    <div className="text-xs text-brand-gray">{cap.desc}</div>
                  </div>
                </div>
              ))} */}
            {/* </div> */}
            
           
          </div>
        </div>
 {/* Regional POP Points Image */}
            <div className="bg-white rounded-2xl p-6">
              <div className="flex items-center justify-center">
                <div className="text-center">
                 {/* <span className="inline-block px-4 py-1.5 rounded-full bg-brand-green/10 text-brand-green text-sm font-medium mb-4">
             UniPOP
          </span> */}
<h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4">
            全球骨干网 Global Backbone & PoPs
          </h2>
          
                  <OptimizedImage src="/pop-map.png" alt="区域 PoPs图" className="w-full max-w-4xl mx-auto mb-4 rounded-xl" loading="lazy" />
                </div>
              </div>
            </div>
        {/* Global Backbone Stats */}
        <div className={`bg-gradient-to-br from-brand-dark to-brand-dark/90 rounded-3xl p-8 lg:p-12 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-green/20 text-brand-green-light text-sm font-medium mb-4">
                全球骨干网 Global Backbone & PoPs
              </span>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                体验可保障：就近接入 + 全网调度
              </h3>
              <p className="text-white/70 mb-8 leading-relaxed">
                磐络 UniSASE 在全球部署了 150+ 个接入点（PoPs），企业用户可以就近接入，享受低延迟、高可用的网络体验。新节点可在 1 周内快速上线。
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-4xl font-bold text-brand-green-light mb-1">150+</div>
                  <div className="text-white/60 text-sm">全球 PoPs</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-4xl font-bold text-brand-green-light mb-1">≤1周</div>
                  <div className="text-white/60 text-sm">新节点上线</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <div className="relative w-full h-full max-w-md">
                  {/* World Map Representation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Globe className="w-48 h-48 text-brand-green/30" />
                  </div>
                  {/* Pulsing Nodes */}
                  {nodePositions.map((pos, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3"
                      style={{
                        top: `${pos.top}%`,
                        left: `${pos.left}%`,
                      }}
                    >
                      <div className="w-full h-full rounded-full bg-brand-green-light animate-ping opacity-75" />
                      <div className="absolute inset-0 w-full h-full rounded-full bg-brand-green-light" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
