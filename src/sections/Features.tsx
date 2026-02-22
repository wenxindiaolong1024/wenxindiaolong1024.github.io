import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import {
  Shield,
  Network,
  Lock,
  Eye,
  Users,
  Database,
  Globe,
  UserCog,
  CheckCircle2,
  Maximize2,
  ShieldEllipsis,
  BarChart3,
  Minimize2
} from 'lucide-react';

const mainFeatures = [
  {
    icon: Users,
    title: '统一身份认证',
    subtitle: 'UniAuth',
    description: '企业级统一身份与访问管理平台，支持多种 IdP 对接和认证协议',
    items: ['AD/LDAP 集成', 'SAML/OAuth 2.0', '多因素认证 MFA', '单点登录 SSO'],
  },
  {
    icon: ShieldEllipsis,
    title: '统一控制',
    subtitle: 'UniCtrl',
    description: '统一策略控制与编排引擎，实现跨网络、跨位置的一致策略执行',
    items: ['策略集中管理', '自动化分发', '多维策略控制', '实时策略更新'],
  },
  {
    icon: BarChart3,
    title: '统一日志分析',
    subtitle: 'UniLog',
    description: '统一可视化与分析系统，提供全局可见性和深度分析能力',
    items: ['全量会话日志', '行为分析', '安全事件分析', '合规审计'],
  },
];

const subFeatures = [
  { icon: Network, label: 'SD-WAN', desc: '智能选路' },
  { icon: Lock, label: '零信任', desc: '身份驱动' },
  { icon: Globe, label: '全球接入', desc: '就近访问' },
  { icon: Database, label: '威胁情报', desc: '实时防护' },
  { icon:  UserCog, label: '行为管理', desc: '精准管控' },
  { icon: Shield, label: '防火墙', desc: '访问控制' },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 监听全屏变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // 切换全屏
  const toggleFullscreen = async () => {
    if (!videoContainerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await videoContainerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('全屏切换失败:', err);
      toast.error('全屏模式不可用', {
        description: '您的浏览器可能不支持此功能',
      });
    }
  };

  return (
    <section ref={sectionRef} className="py-24 bg-brand-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* <span className="inline-block px-4 py-1.5 rounded-full bg-brand-green/10 text-brand-green text-sm font-medium mb-4">
            UniSASE 主要功能
          </span> */}
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4">
            覆盖认证、连接、管控、防护与分析的完整闭环
          </h2>
          <p className="text-lg text-brand-gray max-w-3xl mx-auto">
            UniSASE 将网络接入、身份认证、安全控制与日志分析整合为一套平台，统一交付与运营。
          </p>
        </div>

        {/* Main Features */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className={`group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-brand-green/10 flex items-center justify-center group-hover:bg-brand-green group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-brand-green group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-dark">{feature.title}</h3>
                  <p className="text-sm text-brand-green font-medium">{feature.subtitle}</p>
                </div>
              </div>
              
              <p className="text-brand-gray mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              <ul className="space-y-3">
                {feature.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-brand-gray">
                    <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Sub Features Grid */}
        <div className={`bg-white rounded-2xl p-8 border border-gray-100 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-xl font-bold text-brand-dark mb-6 text-center">
            更多核心能力
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {subFeatures.map((feature, index) => (
              <div
                key={feature.label}
                className="text-center group cursor-pointer"
                style={{ animationDelay: `${(index + 6) * 100}ms` }}
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-brand-green/10 flex items-center justify-center mb-3 group-hover:bg-brand-green group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-brand-green group-hover:text-white transition-colors" />
                </div>
                <div className="font-semibold text-brand-dark text-sm">{feature.label}</div>
                <div className="text-xs text-brand-gray">{feature.desc}</div>
              </div>
            ))}
          </div>
        </div>
        {/* ★★★ 在这里插入第二张图片 ★★★ */}
  {/* 功能架构图 - 左右结构 */}
<div className="w-full max-w-7xl mx-auto mt-16">
  <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 p-8 lg:p-12 items-center">
      
      {/* 左侧文字区域 */}
      <div className="lg:col-span-2 text-center lg:text-left">
        <h3 className="text-2xl sm:text-4xl font-bold text-brand-dark mb-4">
          功能架构全景图
        </h3>
        <p className="text-base text-brand-gray mb-6 leading-relaxed">
          覆盖全场景的统一安全访问服务体系，为企业提供全方位的网络与安全保障
        </p>
        <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
          <span className="px-4 py-1.5 bg-brand-green/10 text-brand-green text-sm rounded-full">统一身份</span>
          <span className="px-4 py-1.5 bg-brand-green/10 text-brand-green text-sm rounded-full">智能组网</span>
          <span className="px-4 py-1.5 bg-brand-green/10 text-brand-green text-sm rounded-full">安全防护</span>
        </div>
      </div>
      
      {/* 右侧图片区域 */}
      <div
        ref={videoContainerRef}
        className="lg:col-span-3 relative overflow-hidden group"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-[500px] object-contain rounded-2xl"
          aria-label="UniSASE 功能架构演示"
        >
          <source src="/gongneng.mp4" type="video/mp4" />
          {/* 回退到 GIF（旧浏览器或视频加载失败） */}
          <img src="/gongneng.gif" alt="UniSASE 功能架构图" loading="lazy" className="w-full h-[500px] object-contain" />
        </video>

        {/* 全屏按钮 */}
        <button
          onClick={toggleFullscreen}
          className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-lg transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
          title={isFullscreen ? '退出全屏' : '全屏显示'}
          aria-label={isFullscreen ? '退出全屏' : '全屏显示'}
        >
          {isFullscreen ? (
            <Minimize2 className="w-5 h-5" />
          ) : (
            <Maximize2 className="w-5 h-5" />
          )}
        </button>
      </div>
      
    </div>
  </div>
</div>
 
        {/* CTA */}
        <div className={`mt-12 text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
        </div>
      </div>
    </section>
  );
}
