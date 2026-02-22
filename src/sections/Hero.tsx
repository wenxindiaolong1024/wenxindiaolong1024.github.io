import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import OptimizedImage from '@/components/OptimizedImage';

interface HeroProps {
  title?: string;
  subtitle?: string;
  showCTA?: boolean;
}

export default function Hero({
  title = "UniSASE 磐络™",
  subtitle = "统一网络、安全、身份与可视化能力——更快交付、更易运营、更可控风险。",
  showCTA = true
}: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisible = true;

  useEffect(() => {
    // Particle animation with performance optimizations
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Reduce particle count on mobile devices for better performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 25 : 50;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    let animationId: number;
    let isAnimating = true;

    const animate = () => {
      if (!isAnimating) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(5, 150, 105, ${0.1 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      // Draw particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(5, 150, 105, ${p.opacity})`;
        ctx.fill();

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      animationId = requestAnimationFrame(animate);
    };

    // Pause animation when page is hidden to save CPU/GPU resources
    const handleVisibilityChange = () => {
      isAnimating = !document.hidden;
      if (isAnimating) {
        animate();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    animate();

    return () => {
      isAnimating = false;
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.4 }}
        aria-hidden="true"
        role="presentation"
      />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-green-light/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 border border-brand-green/20">
              <Shield className="w-4 h-4 text-brand-green" />
              <span className="text-sm text-brand-dark font-medium">企业级 SASE 解决方案</span>
            </div> */}
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark leading-tight">
              {title.split('——')[0]}
              <span className="block mt-2 text-brand-green text-3xl sm:text-4xl lg:text-5xl">
  {title.split('——')[1] || '坚如磐石的网络与安全'}
</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-brand-gray max-w-xl leading-relaxed">
              {subtitle}
            </p>
            
            {showCTA && (
              <div className="flex flex-wrap gap-4">
               <a
  href="#"
  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const email = 'business@unisase.cn';

    // 复制邮箱
    navigator.clipboard.writeText(email).then(() => {
      // 显示成功提示
      toast.success('已复制邮箱地址', {
        description: `请发送邮件至 ${email}`,
        duration: 4000,
      });
    }).catch(() => {
      toast.error('复制失败', {
        description: '请手动复制邮箱地址',
      });
    });

    // 尝试打开邮件客户端
    window.location.href = `mailto:${email}?subject=UniSASE试用申请`;
  }}
  className="inline-flex items-center justify-center bg-brand-green hover:bg-brand-green-light text-white font-semibold px-8 py-3 text-base rounded-xl transition-all"
>
  申请试用
  <ArrowRight className="ml-2 w-5 h-5" />
</a>
              </div>
            )}
            
            {/* Stats */}
            {/* <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-200">
              <div>
                <div className="text-3xl font-bold text-brand-green">150+</div>
                <div className="text-sm text-brand-gray">全球 PoPs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-green">≤1周</div>
                <div className="text-sm text-brand-gray">新节点上线</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-green">99.99%</div>
                <div className="text-sm text-brand-gray">服务可用性</div>
              </div>
            </div> */}
          </div>
          
          {/* Right Content - Image */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              {/* Main Visual - Placeholder for image */}
              <OptimizedImage
  src="/hero-dashboard.png"
  alt="UniSASE 平台界面"
  className="w-full rounded-2xl shadow-lg"
  loading="eager"
/>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-brand-green rounded-2xl p-4 shadow-glow-lg animate-float">
                <div className="text-white font-bold text-lg">磐络™</div>
                <div className="text-white/80 text-sm">坚如磐石</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
