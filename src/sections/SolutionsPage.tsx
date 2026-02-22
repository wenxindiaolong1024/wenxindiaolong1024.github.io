import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Users,
  Network,
  Shield,
  BarChart3,
  CheckCircle2,
  Fingerprint,
  Globe,
  Eye,
  Database,
  Server,
  ShieldCheck,
  ShieldEllipsis,
  Maximize2,
  LockKeyhole,
  BadgeCheck,
  EyeOff,
  Key
} from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';

const solutions = [
  {
    id: 'auth',
    icon: Users,
    title: '认证',
    subtitle: '统一身份入口',
    description: '统一身份入口，支撑终端准入与应用访问的可信认证体系。',
    fullDescription: '基于 UniAuth 统一身份与访问管理（IAM）平台，为企业提供面向 远程终端、本地终端及应用系统 的统一认证与准入能力。\n\n 方案支持多种身份认证方式与标准协议，可作为 终端准入认证、应用系统认证及统一身份入口，实现对用户、设备与应用访问行为的集中管理与安全控制。\n\n 通过统一身份认证、多因素校验与细粒度授权策略，确保只有经过验证与授权的终端和用户才能访问相应资源，为企业构建 可信、可控、可审计 的访问基础。',
    features: ['远程终端', '本地终端', '应用系统', '终端准入', '应用认证'],
    capabilities: [
      {
        icon: Database,
        title: '多种 IdP 支持',
        items: ['AD, LDAP', 'OAuth: 飞书/钉钉/企微; Azure AD/Google...', 'SAML, SMS, EMail'],
      },
      {
        icon: Key,
        title: '认证安全措施',
        items: ['安全策略：密码强度/周期; 账号锁定、IP 白名单', '多因素认证 (MFA) 及人机认证 (CAPTCHA)', '通行密钥：指纹、人脸识别等'],
      },
      {
        icon: Globe,
        title: '远程、本地终端及应用',
        items: ['远程、本地终端及应用', '本地：Web 认证','应用：用户认证及 SSO', ],
      },
      {
        icon: Fingerprint,
        title: '多端身份互通',
        items: ['客户端到设备', '设备到设备', ],
      },
    ],
  },
  {
    id: 'network',
    icon: Network,
    title: '组网',
    subtitle: '智能网络连接',
    description: '让企业网络快速、稳定、低成本地连接到云与全球。',
    fullDescription: 'UniSASE 面向企业多分支、多云与全球化业务场景，提供基于 UniSASE 平台的统一接入与智能组网能力，替代传统专线与复杂网络架构。\n\n方案支持总部、分支、数据中心、云资源及远程用户的统一接入，通过就近接入、智能选路与链路优化，保障关键业务访问的稳定性与一致体验。\n\nUniSASE 可按需快速部署，显著降低网络建设与运维成本，帮助企业实现 “即开即用、按需扩展、全球一致” 的现代化网络架构。',
    features: ['全球骨干网', '智能选路', '隐藏暴露面', '广域网组网', 'Wi-Fi 接入'],
    capabilities: [
      {
        icon: BadgeCheck,
        title: '质量保证',
        items: ['全球骨干网及 PoP 点', '基于应用的智能选路'],
      },
      {
        icon: EyeOff,
        title: '减少暴露面',
        items: ['隐藏公网 IP 和端口', '细粒度的身份-应用路由'],
      },
      {
        icon: Maximize2,
        title: '灵活扩展',
        items: ['广域网组网', '局域网 Wi-Fi'],
      },
      {
        icon: LockKeyhole,
        title: '信道加密',
        items: ['端到端加密', '国产商用密码支持'],
      },
    ],
  },
  {
    id: 'control',
    icon: ShieldEllipsis,
    title: '管控',
    subtitle: '统一安全控制',
    description: '基于 UniCtrl 统一控制平面，实现跨网络、跨位置的一致策略执行。',
    fullDescription: '基于 UniCtrl 统一控制平面，帮助企业将分散的网络与安全策略集中治理，实现跨网络、跨位置、跨用户的一致策略执行。以身份和应用为核心，将访问控制、安全策略与业务规则统一建模，支持基于用户、设备、应用、位置与风险状态的精细化策略控制。',
    features: ['防火墙', '行为管理', '威胁情报', '攻击防护', '终端检测'],
    capabilities: [
      {
        icon: Shield,
        title: '防火墙',
        items: ['基于身份和应用的策略', '阻断网络层攻击'],
      },
      {
        icon: Eye,
        title: '上网行为管理',
        items: ['精准应用识别', '流量管控'],
      },
      {
        icon: Database,
        title: '威胁情报',
        items: ['百万级威胁情报', '实时阻断恶意流量'],
      },
      {
        icon: ShieldCheck,
        title: '攻击防护',
        items: ['畸形报文', '泛洪报文'],
      },
    ],
  },
  {
    id: 'isolation',
    icon: Server,
    title: '隔离',
    subtitle: '零信任访问',
    description: '以零信任理念为基础，替代传统 VPN 和基于网络边界的访问模式。',
    fullDescription: '以零信任理念为基础，通过 UniAuth 统一身份认证与 UniCtrl 精细化策略控制，替代传统 VPN 和基于网络边界的访问模式。方案不再暴露内部网络，仅允许经过身份认证与策略授权的用户访问指定应用或资源，实现"最小权限、按需访问"。',
    features: ['User-App 隔离', '远程用户', '本地用户', '数据中心', '分支园区'],
    capabilities: [
      {
        icon: Users,
        title: '用户-应用隔离',
        items: ['远程/本地用户隔离', '应用级访问控制'],
      },
      {
        icon: Database,
        title: '资源隔离',
        items: ['数据中心服务器隔离', '每台服务器独立网络'],
      },
      {
        icon: Globe,
        title: '设备隔离',
        items: ['分支/园区终端隔离', '无需手动修改配置'],
      },
    ],
  },
  {
    id: 'analysis',
    icon: BarChart3,
    title: '分析',
    subtitle: '统一可视化',
    description: '基于 UniLog 统一日志与分析平台，整合网络、用户、应用与安全数据。',
    fullDescription: '基于 UniLog 统一日志与分析平台，整合网络、用户、应用与安全数据，为企业提供全局可视化与深度分析能力。通过集中采集与关联分析访问日志、策略日志与安全事件，帮助企业快速定位性能问题、识别异常行为并满足审计与合规要求。',
    features: ['会话分析', '行为分析', '安全分析', '体验分析', '合规审计'],
    capabilities: [
      {
        icon: Database,
        title: '全量会话日志',
        items: ['180 天日志保留', '基于身份和应用的会话记录'],
      },
      {
        icon: Eye,
        title: '可视化分析',
        items: ['网络质量可视化', '用户行为可视化'],
      },
      {
        icon: Shield,
        title: '安全分析',
        items: ['威胁检测', '异常行为识别'],
      },
    ],
  },
];

export default function SolutionsPage() {
  const [activeSolution, setActiveSolution] = useState('auth');
  // const sectionRef = useRef<HTMLDivElement>(null);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // 切换解决方案时触发动画
    const timer = setTimeout(() => {
      setAnimationKey(prev => prev + 1);
    }, 50);

    return () => clearTimeout(timer);
  }, [activeSolution]);

  const isVisible = animationKey > 0;

  const currentSolution = solutions.find(s => s.id === activeSolution) || solutions[0];

  return (
    <main className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-brand-dark via-brand-dark to-brand-green/20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-green rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-brand-green-light rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* <span className="inline-block px-4 py-1.5 rounded-full bg-brand-green/20 text-brand-green-light text-sm font-medium mb-6">
              Solutions 解决方案
            </span> */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              坚如磐石的网络与安全
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              UniSASE 以统一身份、统一控制与统一可视化为核心能力，面向企业网络与安全的关键场景，沉淀出四大标准化解决方案
            </p>
            <div className="flex flex-wrap justify-center gap-4">          
   <Button
    size="lg"
    className="bg-brand-green hover:bg-brand-green-light text-white font-semibold px-8"
    onClick={() => {
      window.location.href = 'mailto:business@unisase.cn?subject=预约演示';
      
      setTimeout(() => {
        const email = 'business@unisase.cn';
        if (navigator.clipboard) {
          navigator.clipboard.writeText(email);
        }
        alert(`📧 预约演示\n\n请发送邮件至：${email}\n（已自动复制到剪贴板）\n\n主题：预约演示`);
      }, 500);
    }}
  >
    预约演示
  </Button>
            </div>
          </div>
        </div>
      </section>

    {/* Solutions Navigation */}
<section className="py-10 bg-white border-b sticky top-16 z-40">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-wrap justify-center gap-4">
      {solutions.map((solution) => (
        <button
          key={solution.id}
          onClick={() => setActiveSolution(solution.id)}
          className={`flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 ${
            activeSolution 
=== solution.id
              ? 'bg-brand-green text-white shadow-xl shadow-brand-green/30 scale-105 ring-4 ring-brand-green/20'
              : 'bg-gray-100 text-brand-gray hover:bg-brand-green/10 hover:text-brand-green border-2 border-transparent hover:border-brand-green/30'
          }`}
        >
        {solution.id === 'isolation' ? (
  <div className="w-7 h-7 rounded-full border-2 border-dashed border-current flex items-center justify-center">
    <solution.icon className="w-4 h-4" />
  </div>
) : (
  <solution.icon className="w-6 h-6" />
)}
          <span>{solution.title}</span>
        </button>
      ))}
    </div>
  </div>
</section>

      {/* Solution Detail */}
      <section className="py-24 bg-brand-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`space-y-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-4 mb-6">
               {currentSolution.id === 'isolation' ? (
 /* 隔离：绿色背景 + 内部虚线圆圈 */
<div className="w-16 h-16 rounded-full bg-brand-green flex items-center justify-center">
  <div className="w-10 h-10 rounded-full border-2 border-dashed border-white/70 flex items-center justify-center">
    <currentSolution.icon className="w-6 h-6 text-white" />
  </div>
</div>
) : (
  /* 其他：实线背景 */
  <div className="w-16 h-16 rounded-full bg-brand-green flex items-center justify-center">
    <currentSolution.icon className="w-8 h-8 text-white" />
  </div>
)}
                <div>
                  <h2 className="text-3xl font-bold text-brand-dark">{currentSolution.title}</h2>
                  <p className="text-brand-green font-medium">{currentSolution.subtitle}</p>
                </div>
              </div>
              
              <p className="text-lg text-brand-gray mb-6 leading-relaxed">
                {currentSolution.description}
              </p>
              
              <p className="text-brand-gray mb-8 leading-relaxed whitespace-pre-line">
                {currentSolution.fullDescription}
              </p>
              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-8">
                {currentSolution.features.map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-white text-brand-gray border border-gray-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand-green" />
                    {feature}
                  </span>
                ))}
              </div>

{/* 架构图 */}
{/* <div className="mt-8 mb-8 bg-white rounded-2xl px-12 py-12 shadow-lg">
  <img 
    src={`/${currentSolution.id}.png`} 
    alt={`${currentSolution.title} 架构图`}
    className="w-full max-w-4xl mx-auto rounded-2xl"
  />
</div> */}


              <Button
                className="bg-brand-green hover:bg-brand-green/90 text-white"
                onClick={() => {
  window.location.href = 'mailto:business@unisase.cn?subject=预约演示';
  
  setTimeout(() => {
    const email = 'business@unisase.cn';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
    }
    alert(`📧 预约演示\n\n请发送邮件至：${email}\n（已自动复制到剪贴板）\n\n主题：预约演示`);
  }, 500);
}}
              >
                获取方案详情
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

           {/* Capabilities - 四栏布局 */}
<div className="grid grid-cols-2 gap-4">
  {currentSolution.capabilities.map((cap, index) => (
    <div
      key={cap.title}
      className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-brand-green/10 flex items-center justify-center">
          <cap.icon className="w-5 h-5 text-brand-green" />
        </div>
        <h3 className="text-base font-bold text-brand-dark">{cap.title}</h3>
      </div>
      <ul className="space-y-1.5">
        {cap.items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-brand-gray">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0" />
            <span className="line-clamp-2">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  ))}
</div>
{/* 架构图 - 只隐藏认证的图 */}
{currentSolution.id !== 'auth' && (
  <div className="mt-8 mb-8 bg-white rounded-2xl px-12 py-12 shadow-lg overflow-hidden">
    <OptimizedImage
      src={`/${currentSolution.id}.png`}
      alt={`${currentSolution.title} 架构图`}
      className="w-full max-w-4xl mx-auto"
      loading="lazy"
    />
  </div>
)}

          </div>
        </div>
      </section>
    </main>
  );
}
