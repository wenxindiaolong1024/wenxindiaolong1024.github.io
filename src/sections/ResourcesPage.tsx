import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Download,
  FileText,
  Monitor,
  Apple,
  Smartphone,
  Laptop,
  BookOpen,
  MapPin,
  Network,
  X
} from 'lucide-react';
import { config } from '@/config/env';
import { ChinaMap, regionCenters } from '@/components/ChinaMap';

// ==================== 服务范围组件 ====================

const ServiceCoverageSection = () => {
  const [selectedRegion, setSelectedRegion] = useState<typeof regionCenters[0] | null>(null);

  return (
    <section className="py-24 bg-brand-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-dark mb-4">
            服务范围
          </h2>
          <p className="text-brand-gray max-w-2xl mx-auto">
            覆盖全国七大区域，28个重点城市，为您提供本地化的专业服务支持
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="lg:w-96 flex flex-col gap-6">
            <div 
              onClick={() => setSelectedRegion(regionCenters[0])}
              className={`group bg-white rounded-2xl border-2 p-6 cursor-pointer transition-all hover:shadow-lg ${selectedRegion ? 'border-brand-green shadow-md' : 'border-brand-green/30 hover:border-brand-green'}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-brand-green flex items-center justify-center text-white text-xl font-bold">01</div>
                <MapPin className="w-6 h-6 text-brand-green group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-2">7个大区</h3>
              <p className="text-brand-gray text-sm">华北、东北、华东、华中、华南、西南、西北</p>
            </div>

            <div className="group bg-white rounded-2xl border-2 border-brand-green/30 p-6 hover:border-brand-green hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-brand-green flex items-center justify-center text-white text-xl font-bold">02</div>
                <Network className="w-6 h-6 text-brand-green group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-2">办事处</h3>
              <p className="text-brand-gray text-sm">覆盖全国28个省、自治区、直辖市</p>
            </div>

            {selectedRegion && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 animate-in slide-in-from-left-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-brand-dark flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-brand-green" />
                    {selectedRegion.name}大区
                  </h3>
                  <button onClick={() => setSelectedRegion(null)} className="text-brand-gray hover:text-brand-dark">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedRegion.offices.map(city => (
                    <span key={city} className="px-3 py-1.5 bg-brand-green/10 text-brand-green text-sm rounded-full font-medium">{city}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 bg-brand-light-gray rounded-3xl p-0">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-4" style={{ minHeight: '520px' }}>
              <ChinaMap 
                height="500px"
                selectedRegion={selectedRegion}
                onRegionClick={setSelectedRegion}
                showOffices={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const clients = [
  {
    icon: Laptop,
    name: 'Windows 客户端',
    downloadUrl: 'https://download.gsase.com/app/unimobile/windows/UniMobile.exe',
  },
  {
    icon: Apple,
    name: 'macOS 客户端',
    downloadUrl: 'https://apps.apple.com/app/id6753884805',
  },
  {
    icon: Smartphone,
    name: 'iOS 客户端',
    downloadUrl: 'https://apps.apple.com/app/id6753885045',
  },
  {
    icon: Monitor,
    name: 'Android 客户端',
    downloadUrl: 'https://download.gsase.com/app/unimobile/android/UniMobile.apk',
  },
];

const documents = [
  {
    icon: FileText,
    title: 'UniSASE 产品规格书',
    description: '详细的产品技术规格、性能指标和部署指南',
    size: '2.5 MB',
    type: 'PDF',
    file: '/product-specs.pdf',
  },
  {
    icon: BookOpen,
    title: 'UniSASE 产品介绍',
    description: '产品功能、架构和解决方案的全面介绍',
    size: '5.8 MB',
    type: 'PDF',
    file: '/product-intro.pdf',
  },
  {
    icon: FileText,
    title: 'UniAuth 部署指南',
    description: '统一身份认证平台的部署和配置说明',
    size: '3.2 MB',
    type: 'PDF',
    file: '#',
  },
  {
    icon: FileText,
    title: 'UniCtrl 管理员手册',
    description: '统一控制平台的操作和管理指南',
    size: '4.1 MB',
    type: 'PDF',
    file: '#',
  },
];

export default function ResourcesPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <main className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-brand-dark via-brand-dark to-brand-green/20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-brand-green rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              资源中心
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              下载客户端，了解 UniSASE 的更多信息
            </p>
          </div>
        </div>
      </section>

      {/* Client Downloads */}
      <section ref={sectionRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl font-bold text-brand-dark mb-4">软件客户端下载</h2>
            <p className="text-brand-gray">支持 Windows、macOS、iOS 和 Android 平台</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clients.map((client, index) => (
              <div
                key={client.name}
                onClick={() => window.open(client.downloadUrl, '_blank')}
                className={`cursor-pointer group bg-brand-light-gray rounded-2xl p-6 border border-gray-100 hover:border-brand-green/30 hover:shadow-lg transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-brand-green/10 flex items-center justify-center mb-4 group-hover:bg-brand-green group-hover:scale-110 transition-all duration-300">
                  <client.icon className="w-7 h-7 text-brand-green group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-1">{client.name}</h3>
                <p className="text-sm text-brand-gray mb-4">
                  <span className="text-brand-green text-xs">点击下载或跳转至下载页面 →</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Coverage */}
      <ServiceCoverageSection />

      {/* Documents */}
      <section className="hidden py-24 bg-brand-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl font-bold text-brand-dark mb-4">文档下载</h2>
            <p className="text-brand-gray">产品规格书、部署指南和管理员手册</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {documents.map((doc, index) => (
              <div
                key={doc.title}
                className={`group bg-white rounded-2xl p-6 border border-gray-100 hover:border-brand-green/30 hover:shadow-lg transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${(index + 4) * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-brand-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-green group-hover:scale-110 transition-all duration-300">
                    <doc.icon className="w-7 h-7 text-brand-green group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-brand-dark">{doc.title}</h3>
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-xs text-brand-gray">{doc.type}</span>
                    </div>
                    <p className="text-sm text-brand-gray mb-3">{doc.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-brand-gray">{doc.size}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-brand-green hover:text-brand-green-dark hover:bg-brand-green/10"
                        asChild
                      >
                        <a href={doc.file} download>
                          <Download className="w-4 h-4 mr-1" />
                          下载
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`bg-gradient-to-br from-brand-green to-brand-green-light rounded-3xl p-12 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl font-bold text-white mb-4">需要更多帮助？</h2>
            <p className="text-white/80 mb-8">
              如果您需要更多技术支持或有任何问题，请随时联系我们的团队
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-brand-green hover:bg-white/90 font-semibold"
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
                联系我们
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}