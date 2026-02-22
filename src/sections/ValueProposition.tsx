// src/sections/ValueProposition.tsx
import { 
  Zap, 
  ShieldCheck, 
  Globe, 
  Users, 
  FileCheck,
  ArrowRight
} from 'lucide-react';

const values = [
  {
    title: '高性能网络与安全融合网关',
    icon: Zap,
  },
  {
    title: '云、分支与总部一致的能力',
    icon: ShieldCheck,
  },
  {
    title: '覆盖全球的骨干网与 PoP 点',
    icon: Globe,
  },
  {
    title: '基于统一身份与应用策略',
    icon: Users,
  },
  {
    title: '基于真实访问的全量日志',
    icon: FileCheck,
  },
];

export default function ValueProposition() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            统一解决
            <span className="text-emerald-600 mx-2">"让网络变快"</span>
            和
            <span className="text-emerald-600 mx-2">"让访问安全"</span>
          </h2>
        </div>

        {/* 5个卡片一行 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {values.map((item) => (
            <div 
              key={item.title}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              {/* 图标 - 深绿色背景 */}
              <div className="w-11 h-11 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <item.icon className="w-5 h-5 text-emerald-600" strokeWidth={1.5} />
              </div>

              {/* 标题 - 单行小字 */}
              <h3 className="text-sm font-medium text-gray-900 leading-tight">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        {/* CTA 按钮 */}
        <div className="text-center mt-12">
          <button 
  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 py-3 rounded-full transition-colors"
  onClick={() => {
    window.location.href = 'mailto:business@unisase.cn?subject=获取定制化方案';
    
    setTimeout(() => {
      const email = 'business@unisase.cn';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email);
      }
      alert(`📧 获取定制化方案\n\n请发送邮件至：${email}\n（已自动复制到剪贴板）`);
    }, 500);
  }}
>
  获取定制化方案
  <ArrowRight className="w-4 h-4" />
</button>
        </div>    
      </div>
    </section>
  );
}