import { useEffect, useRef, useState } from 'react';
import {
  Mail,
  MapPin,
  Award,
  GraduationCap,
  Shield
} from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';
import { config } from '@/config/env';

const highlights = [
  {
    icon: GraduationCap,
    title: '清华背景',
    description: '创始团队均毕业于清华大学',
  },
  {
    icon: Shield,
    title: '17年经验',
    description: '网络与安全领域实践经验',
  },
  {
    icon: Award,
    title: '联盟成员',
    description: '中国网络信息安全科技创新发展联盟',
  },
];

// 解析坐标配置（格式：lat,lng）
const parseLocation = () => {
  const locationStr = config.map.location || '40.0428,116.3164';
  const [lat, lng] = locationStr.split(',').map(Number);
  return {
    lat: isNaN(lat) ? 40.0428 : lat,
    lng: isNaN(lng) ? 116.3164 : lng,
    address: config.map.companyAddress,
    companyName: config.map.companyName,
  };
};

export default function CompanyPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  const COMPANY_LOCATION = parseLocation();

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

 // 构建百度地图 URL
const getBaiduMapUrl = () => {
  const { lat, lng, address, companyName } = COMPANY_LOCATION;
  
  // 如果有 AK，使用完整 API，添加 zoom 参数
  if (config.baiduMap?.ak) {
    return `https://api.map.baidu.com/marker?location=${lat},${lng}&title=${encodeURIComponent(companyName)}&content=${encodeURIComponent(address)}&output=html&src=webapp.baidu.openAPIdemo&ak=${config.baiduMap.ak}&zoom=18`;
  }
  
  // 无 AK 时使用静态图 API，调整 zoom 和地图尺寸
  return `https://api.map.baidu.com/staticimage?center=${lng},${lat}&markers=${lng},${lat}&markerStyles=m,A&width=800&height=500&zoom=18`;
};

  // 点击跳转
  const handleMapClick = () => {
    const { lat, lng, address, companyName } = COMPANY_LOCATION;
    const url = `https://api.map.baidu.com/marker?location=${lat},${lng}&title=${encodeURIComponent(companyName)}&content=${encodeURIComponent(address)}&output=html&src=webapp.baidu.openAPIdemo`;
    window.open(url, '_blank');
  };

  return (
    <main className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 animate-gradient-flow overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-green rounded-full blur-3xl" />
        </div>
        
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-green/80 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-400/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-emerald-300/30 rounded-full blur-3xl animate-pulse delay-2000" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              安信道合
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              坚如磐石的网络与安全服务提供商
            </p>
          </div>
        </div>
      </section>

      {/* Company Intro */}
      <section ref={sectionRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div>
              <h2 className="text-3xl font-bold text-brand-dark mb-6">
                我们是谁
              </h2>
              <div className="space-y-4 text-brand-gray leading-relaxed">
                <p>
                  安信道合（北京）科技发展有限公司成立于 2025 年 1 月，创始团队均毕业于清华大学，在业界有 17 年网络与安全的实践经验。
                </p>
                <p>
                  公司产品为磐络（UniSASE），为企业提供深度融合网络与安全的产品和服务。从技术内核到落地服务，安信道合始终以"深度融合"为核心，为企业提供坚如磐石的网络与安全服务。
                </p>
                <p>
                  安信道合是"中国网络信息安全科技创新发展联盟"的首批成员；该联盟是在国务院国资委指导下成立，汇聚中国电科、三大运营商等核心力量，服务近 2 万家企业。
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <OptimizedImage
                  src="/office5.jpg"
                  alt="公司办公环境"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-24 bg-brand-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center max-w-4xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-brand-green/10 flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-brand-green" />
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">{item.title}</h3>
                <p className="text-sm text-brand-gray">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl font-bold text-brand-dark mb-4">联系我们</h2>
            <p className="text-brand-gray">期待与您的合作</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-brand-light-gray rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-brand-green" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark">商务邮箱</h3>
                  <p className="text-sm text-brand-gray">业务咨询与合作</p>
                </div>
              </div>
              <a 
                href={`mailto:${config.contact.email}`}
                className="text-lg text-brand-green hover:underline"
              >
                {config.contact.email}
              </a>
            </div>

            <div className="bg-brand-light-gray rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-brand-green" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark">公司地址</h3>
                  <p className="text-sm text-brand-gray">欢迎来访</p>
                </div>
              </div>
              <p className="text-brand-gray">
                {COMPANY_LOCATION.address}
              </p>
            </div>
          </div>

          {/* 地图区域 */}
          <div className="mt-12 max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-[400px] relative bg-gray-50">
            {!mapLoaded ? (
              <div 
                className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => setMapLoaded(true)}
              >
                <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-600 font-medium text-lg">点击查看地图</p>
                <p className="text-gray-400 text-sm mt-2">{COMPANY_LOCATION.address}</p>
              </div>
            ) : (
              <iframe
                src={getBaiduMapUrl()}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="公司位置地图"
              />
            )}
          </div>
          
          <div className="mt-4 text-center">
            <button 
              onClick={handleMapClick}
              className="text-brand-green hover:underline text-sm"
            >
              在新窗口打开地图 →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}