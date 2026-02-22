
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Users,
  Shield,
  BarChart3,
  CheckCircle2,
  Server,
  Lock,
  Eye,
  Database,
  Fingerprint,
  Globe,
  Zap,
  ShieldEllipsis,
  HardDrive,   // UniGate 网关
  Network,      
  Smartphone,   // UniMobile 移动
  Wifi,         // UniAP 接入点
} from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';

const products = [
  {
    id: 'uniauth',
    icon: Users,
    name: 'UniAuth',
    subtitle: '统一身份认证',
    description: '企业级统一身份与访问管理（IAM）平台，让身份成为安全与访问的唯一入口。',
    highlights: [  // 新增
    '丰富的 IdP 对接与多协议集成',
    '完整的认证安全策略（MFA / 会话控制）',
    '统一认证日志与审计追踪',
  ],
    fullDescription: 'UniAuth 是面向企业级场景打造的统一身份与访问管理（IAM）平台，提供集中化身份治理、单点登录（SSO）、多协议认证集成与细粒度授权控制能力。\n\nUniAuth 支持 OAuth 2.0 / OpenID Connect / SAML / LDAP 等主流标准协议，兼容 Web、移动端及各类业务系统的快速接入；同时内置多因素认证（MFA）、组织与多租户管理、角色与策略模型（RBAC / ABAC）、用户生命周期管理以及会话与审计日志等完整安全能力，实现"统一身份入口、统一权限管控、统一安全审计"。\n\nUniAuth 采用模块化、可扩展架构设计，支持私有化部署与深度定制，适用于企业准入认证、内网系统整合、SaaS 平台账号体系建设以及零信任接入等多种业务场景。',
    features: [
      { icon: Database, title: '多种 IdP 支持', desc: 'AD, LDAP, SAML, OAuth 2.0/OIDC' },
      { icon: Lock, title: '认证安全措施', desc: 'MFA, Passkey, 安全策略' },
      { icon: Globe, title: '多端接入', desc: '远程、本地终端及应用' },
      { icon: Fingerprint, title: '多端身份互通', desc: '客户端到设备，设备到设备' },
    ],
    details: [
      {
        title: '01多种 IdP 支持',
        items: [
          'AD, LDAP',
          'OAuth: 飞书/钉钉/企微; Azure AD/Google...',
          'SAML, SMS, EMail',
        ],
      },
      {
        title: '02 认证安全措施',
        items: [
          '安全策略：密码强度/周期; 账号锁定、IP 白名单',
          '多因素认证 (MFA) 及人机认证 (CAPTCHA)',
          '通行密钥：指纹、人脸识别等 ',
        ],
      },
      {
        title: '03 远程、本地终端及应用',
        items: [
          '远程: 客户端认证',
          '本地: Web 认证',
          '应用: 用户认证及 SSO',
        ],
      },
      {
        title: '04 多端身份互通',
        items: [
          '客户端->设备',
          '设备->设备',
          
        ],
      },
    ],
  },
  {
    id: 'unictrl',
    icon: ShieldEllipsis,
    name: 'UniCtrl',
    subtitle: '统一控制',
    description: '统一策略，一致执行，让网络与安全真正可控',
    fullDescription: 'UniCtrl 是 UniSASE 的统一策略控制与编排引擎，为企业多网络、多安全场景提供集中化策略管理、全局一致控制与自动化策略分发能力。​  \n\n  UniCtrl 以身份与应用为核心，将网络访问控制、安全策略与业务规则统一建模，实现跨总部、分支机构、云环境及远程接入场景的一致策略执行。平台支持基于用户、设备、应用、位置与风险状态的多维策略控制，确保访问行为始终符合企业安全与合规要求。',
     highlights: [  // 新增
    '用户与设备集中管理',
    '基于身份与应用的策略定义与分发',
    '软件 / 应用特征 / 威胁情报统一升级',
  ],
    features: [
      { icon: Server, title: '原生融合', desc: '网络与安全功能深度融合' },
      { icon: Zap, title: '高效引擎', desc: '全功能开启延迟<1ms' },
      { icon: CheckCircle2, title: '高可靠', desc: '双机高可用，秒级切换' },
      { icon: Globe, title: '多种接入', desc: '网关、客户端、无线' },
    ],
    details: [
      {
        title: '主要功能',
        items: [
          '移动端/设备管理',
          '基于身份与应用的策略定义与分发',
          '软件/应用特征/威胁情报升级',
        ],
      },
      // {
      //   title: '01身份认证、应用识别',
      //   items: [
      //     '身份管理覆盖员工等对象，支持局域网与远程办公场景',
      //     '身份认证用 AD/LDAP 等技术，网络层控 IP、协议等要素',
      //     '应用管理面向私有、公共应用，从三类维度识别',
      //     '架构通过身份与应用管控，实现访问与资源管理',
      //   ],
      // },
      // {
      //   title: '02基于身份与应用的流量调度',
      //   items: [
      //     '路由策略：基于身份与应用',
      //     '一致的策略：本地与远程用户',
      //     '支持 SD-WAN 骨干网',
      //     '基于 SLA 自动切换路径',
      //     '端到端信道加密及国产商用密码',
      //   ],
      // },
      // {
      //   title: '03基于身份与应用的安全管控',
      //   items: [
      //     '访问、行为策略: 基于终端状态、身份与应用',
      //     '一致的策略：本地与远程用户',
      //     '精准的威胁情报：针对病毒、勒索、挖矿等',
      //     '基于时间生效',
      //   ],
      // },
      // {
      //   title: '04终端检测',
      //   items: [
      //     '终端认证：是否是允许的终端设备',
      //     '终端状态检测：针对防火墙、杀毒软件、进程等',
      //     '终端状态持续检测',
      //   ],
      // },
    ],
  },
  {
    id: 'unilog',
    icon: BarChart3,
    name: 'UniLog',
    subtitle: '统一日志分析',
    description: '统一可视化与分析，让风险与问题一目了然。',
    fullDescription: 'UniLog 是 UniSASE 的 统一日志、可视化与分析系统，为企业提供跨网络与安全域的全量数据采集、集中分析与统一审计能力。\n\n​    UniLog 汇聚来自用户访问、网络连接、安全策略、应用行为与威胁检测的多维日志数据，构建统一的数据视图，帮助企业实现对 运行状态、访问行为与安全风险的全局可见性。\n\n​    平台支持实时监控、可视化分析、审计取证与告警联动，可与策略控制与威胁情报深度协同，形成 “可视化—分析—响应—优化” 的闭环机制，持续提升企业的安全运营能力与业务体验。',
    features: [
      { icon: Database, title: '全量日志', desc: '记录全量网络会话日志' },
      { icon: Eye, title: '网络分析', desc: '时延、丢包分析' },
      { icon: BarChart3, title: '行为分析', desc: '用户行为、安全、体验' },
      { icon: CheckCircle2, title: '合规审计', desc: '满足公安部 151 号令' },
    ],
    details: [
      {
        title: '基于身份和应用的全量会话分析',
        items: [
          '记录全量的真实访问会话（180 天）',
          '行为、安全及体验分析',
          '满足公安部第 151 号令',
        ],
      },
      {
        title: '网络质量分析',
        items: [
          '网络时延、丢包分析',
          '用户体验可视化',
        ],
      },
      {
        title: '安全事件分析',
        items: [
          '威胁检测与告警',
          '安全趋势分析',
        ],
      },
      
    ],
  },
{
  id: 'unigate',
  icon: HardDrive,
  name: 'UniGate',
  subtitle: '统一智能安全网关',
  description: '将分支、园区与本地出口无缝纳入 UniSASE 统一架构。',
  highlights: [
    '一体化承载 SD-WAN / NGFW / ZTNA 接入能力',
    '本地与云端策略一致执行，快速部署、集中运营',
    '支持链路冗余、SLA 选路与端到端加密传输',
  ],
  fullDescription: 'UniGate 是 UniSASE 平台的统一智能安全网关，面向企业分支机构、园区网络、工厂现场及本地互联网出口场景，提供原生融合的网络连接与安全防护能力。​    \n\n不同于传统“路由器 + 防火墙 + 行为管理”多设备堆叠模式，UniGate 将网络接入、SD-WAN 组网、访问控制与威胁防护整合为单一平台节点，并通过 UniCtrl 统一策略控制与 UniLog 统一日志分析，实现云端与本地能力的一致交付。',
  
  features: [
    { icon: Globe, title: '多协议发布', desc: 'HTTP, HTTPS, TCP, UDP' },
    { icon: Shield, title: '安全防护', desc: 'WAF, DDoS, Bot管理' },
    { icon: Zap, title: '智能调度', desc: '负载均衡, 流量分发' },
    { icon: Lock, title: '访问控制', desc: '零信任, 细粒度授权' },
  ],
  details: [
    {
      title: '01 原生融合的网络与安全能力',
      items: [
        ' 一台设备，即可完成网络连接、访问控制与安全防护的统一交付',
        // '网络能力: 网络准入控制（NAC）, DHCP / 动态路由 ,负载均衡,IPSec VPN , SD-WAN 智能组网, VoIP 优化。',
        // 'API网关与路由管理',
      ],
    },
    {
      title: '02 高吞吐 · 低时延 · 线性扩展',
      items: [
        '在保障安全能力全开启的情况下，仍然实现高性能转发与低处理时延。',
        // '全球流量就近调度',
        // '健康检查与故障转移',
      ],
    },
    {
      title: '03 高可靠架构设计',
      items: [
        '保障业务连续性，避免单点故障影响。',
        '满足总部与关键分支对高可用性的严苛要求。',
        // 'Bot管理与验证码',
      ],
    },
    {
      title: '04 多平台部署支持',
      items: [
        '灵活适配多种部署环境与信创场景。',
        '硬件架构支持：x86、ARM、信创生态（飞腾、海光等）',
        '虚拟化支持：公有云、私有云、虚拟化平台',
      ],
    },
  ],
},
{
  id: 'unimobile',
  icon: Smartphone,
  name: 'UniMobile',
  subtitle: '统一移动接入',
  description: '零信任安全接入客户端，让身份成为企业访问的唯一信任基础。',
  highlights: [
    '支持 LDAP / Radius / SAML / OAuth2.0 / OIDC 等认证体系',
    '支持 MFA、CAPTCHA、WebAuthn（指纹/人脸）等安全认证措施',
    '支持“身份漫游”，从客户端延伸至网关与业务应用系统',
    '支持 Windows、macOS、Android、iOS 多平台统一接入',
  ],
  fullDescription: 'UniMobile 是 UniSASE 架构中的零信任客户端，面向远程办公、移动办公与跨网络访问场景，为企业提供基于身份驱动的安全接入能力。​    \n\n不同于传统 VPN 依赖网络边界建立“隧道式信任”，UniMobile 以身份为核心，将用户、设备与访问行为纳入统一的认证与策略体系，实现“先验证、再访问、按需授权”的零信任访问模式。​    \n\n通过与 UniAuth 的统一身份体系及 UniCtrl 的策略控制平面深度联动，UniMobile 可将终端接入、身份校验、访问控制与日志审计整合为一体，使远程用户、本地用户与移动用户在同一套安全框架下运行，确保策略一致、权限可控、行为可追溯。',
  features: [
    // { icon: Smartphone, title: '设备管理', desc: 'MDM, 配置, 远程控制' },
    // { icon: Lock, title: '应用安全', desc: 'MAM, 安全容器, 防泄漏' },
    // { icon: Globe, title: '安全接入', desc: '移动VPN, 零信任' },
    // { icon: Shield, title: '数据保护', desc: '加密, 远程擦除' },
  ],
  details: [
    {
      title: '01 动态身份信任体系',
      items: [
        '多维身份绑定（用户/设备/行为）',
        '持续风险评估与动态授权',
      ],
    },
    {
      title: '02 去边界化架构革新',
      items: [
        '无隧道直连业务系统',
        '多端策略一致性（iOS/Android/PC）',
      ],
    },
    {
      title: '03 安全能力原生融合',
      items: [
        '统一身份中枢（UniAuth）',
        '策略智能联动（UniCtrl）',
        '行为审计闭环',
      ],
    },
  ],
},
{
  id: 'uniap',
  icon: Wifi,
  name: 'UniAP',
  subtitle: '统一接入点',
  description: '企业级无线接入与安全认证平台，实现有线无线网络的统一接入与访问控制。',
  highlights: [
    '有线无线网络统一接入认证',
    '基于身份的网络访问控制（NAC）',
    '终端安全合规检查与隔离',
  ],
  fullDescription: 'UniAP 是 UniSASE 面向园区与办公场景推出的安全无线接入设备，为企业提供高质量 Wi-Fi 覆盖与统一安全接入能力。\n\nUniAP 支持与 UniAuth 的统一身份体系联动，提供基于身份的无线准入认证与用户管理能力，并结合 UniCtrl 的策略控制，实现对不同用户、设备、访客与物联网终端的分组、隔离与访问权限控制，确保无线网络从“可用”升级为“可控”。\n\n通过 UniAP，企业可将无线接入纳入 UniSASE 的统一运营体系，实现从终端准入、访问控制到日志审计的完整闭环，降低园区网络管理复杂度，同时提升安全性与使用体验。',
  features: [
    { icon: Wifi, title: '无线接入', desc: 'WiFi6, 漫游, 定位' },
    { icon: Network, title: '有线接入', desc: '802.1X, MAC认证' },
    { icon: Shield, title: '安全合规', desc: '终端检查, 微分段' },
    { icon: Lock, title: '访问控制', desc: 'NAC, 动态授权' },
  ],
  details: [
    {
      title: '01 统一接入',
      items: [
        '有线无线网络统一认证',
        '多终端一致体验',
        // 'Portal访客认证',
      ],
    },
    {
      title: '02 身份管控',
      items: [
        '基于身份的NAC',
        '分组隔离与权限控制',
        // 'IoT设备识别与管控',
      ],
    },
    {
      title: '03 终端安全',
      items: [
        '合规检查与异常隔离',
        '防范不安全终端接入',
      ],
    },
    {
      title: '04 闭环管理',
      items: [
        '终端准入-访问控制-日志审计全链路覆盖',
      ],
    },
  ],
}
];

export default function PlatformPage() {
  const [activeProduct, setActiveProduct] = useState(() => {
    const hash = window.location.hash;
    return hash ? hash.replace('#', '') : 'uniauth';
  });
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, []);

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

  const currentProduct = products.find(p => p.id === activeProduct) || products[0] || {};

  return (
    <main className="min-h-screen pt-20">
      {/* Hero */}
     <section className="relative pt-20 pb-16 bg-gradient-to-br from-green-50 to-green-100">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-green rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-green-light rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* <span className="inline-block px-4 py-1.5 rounded-full bg-brand-green/20 text-white text-sm font-medium mb-6">
              Platform 产品中心
            </span> */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark mb-6">
              重新定义企业网络安全边界
            </h1>
            <p className="text-xl text-brand-gray max-w-3xl mx-auto mb-8">
              基于零信任架构的 SASE 解决方案，随时随地安全访问
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
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
             
            </div>
          </div>
        </div>
      </section>

      {/* Products Navigation */}
     <section ref={sectionRef} className="py-16 bg-white border-b relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => setActiveProduct(product.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl border-2 transition-all duration-300 ${
                  activeProduct === product.id
                    ? 'border-brand-green bg-brand-green/5'
                    : 'border-gray-100 hover:border-brand-green/30 hover:bg-gray-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  activeProduct === product.id ? 'bg-brand-green' : 'bg-brand-green/10'
                }`}>
                  <product.icon className={`w-5 h-5 ${activeProduct === product.id ? 'text-white' : 'text-brand-green'}`} />
                </div>
                <div className="text-left">
                  <div className={`font-semibold ${activeProduct === product.id ? 'text-brand-green' : 'text-brand-dark'}`}>
                    {product.name}
                  </div>
                  <div className="text-xs text-brand-gray">{product.subtitle}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail */}
    <section id={currentProduct.id} className="py-24 bg-brand-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid lg:grid-cols-2 gap-12 items-start transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-brand-green flex items-center justify-center">
                  <currentProduct.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-brand-dark">{currentProduct.name}</h2>
                  <p className="text-brand-green font-medium">{currentProduct.subtitle}</p>
                </div>
              </div>
              
              <p className="text-lg text-brand-gray mb-6 leading-relaxed">
                {currentProduct.description}
              </p>
              
             {/* 核心亮点列表 */}
{currentProduct.highlights && (
  <ul className="space-y-2 mb-6">
    {currentProduct.highlights.map((item, idx) => (
      <li key={idx} className="flex items-start gap-2 text-brand-gray">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 flex-shrink-0" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
)}

{/* fullDescription 段落 */}
<div className="space-y-4 mb-8">
  {currentProduct.fullDescription.split('\n\n').map((paragraph, idx) => (
    <p key={idx} className="text-brand-gray leading-relaxed">
      {paragraph}
    </p>
  ))}
</div>

              {/* Features Grid */}
{/*               
              <div className="grid grid-cols-2 gap-4 mb-8">
                {currentProduct.features.map((feature) => (
                  <div key={feature.title} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100">
                    <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-brand-green" />
                    </div>
                    <div>
                      <div className="font-semibold text-brand-dark text-sm">{feature.title}</div>
                      <div className="text-xs text-brand-gray">{feature.desc}</div>
                    </div>
                  </div>
                        ))}
      </div>
       */}

      {/* 图片展示区域 */}
      {/* {currentProduct.id === 'unictrl' && (
        <div className="mb-8 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <OptimizedImage
            src="/product-detail.png"
            alt="UniCtrl 详情图"
            className="w-full h-auto object-cover rounded-lg"
            loading="lazy"
          />
        </div>
      )} */}

      {currentProduct.id === 'unigate' && (
        <div className="mb-8 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <OptimizedImage
            src="/unigate.jpeg"
            alt="Unigate 详情图"
            className="w-full h-auto object-cover rounded-lg"
            loading="lazy"
          />
        </div>
      )}

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
                了解详情
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

        {/* Right Content - Details */}
<div className="space-y-6">
  {currentProduct.id === 'unimobile' || currentProduct.id === 'uniap' ? (
    // UniMobile：右侧显示图片
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full flex items-center justify-center">
      <OptimizedImage
        src={`/${currentProduct.id}.jpeg`}
        alt={`${currentProduct.name} 详情图`}
        className="w-full h-auto object-cover rounded-lg"
        loading="lazy"
      />
    </div>
  ) : (
    // 其他产品：右侧显示 details
    currentProduct.details?.map((detail, index) => (
      <div
        key={detail.title}
        className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <h3 className="text-lg font-bold text-brand-dark mb-4">{detail.title}</h3>
        <ul className="space-y-2">
          {detail.items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-brand-gray">
              <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    ))
  )}
</div>
          </div>
        </div>
      </section>
    </main>
  );
}
