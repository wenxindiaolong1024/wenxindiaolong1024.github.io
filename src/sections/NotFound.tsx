import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-brand-dark via-brand-dark to-brand-green/10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 404 Illustration */}
        <div className="mb-8 relative">
          <div className="text-9xl font-bold text-brand-green/20 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-brand-green/10 rounded-full blur-3xl" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          页面未找到
        </h1>
        <p className="text-lg text-white/60 mb-8 max-w-md mx-auto">
          抱歉，您访问的页面不存在或已被移除。请检查 URL 是否正确，或返回首页继续浏览。
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
            返回上一页
          </Button>
          <Link to="/">
            <Button className="gap-2 bg-brand-green hover:bg-brand-green/90 text-white">
              <Home className="w-4 h-4" />
              返回首页
            </Button>
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-sm text-white/40 mb-4">需要帮助？</p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link
              to="/platform"
              className="text-white/60 hover:text-brand-green-light transition-colors"
            >
              产品中心
            </Link>
            <Link
              to="/solutions"
              className="text-white/60 hover:text-brand-green-light transition-colors"
            >
              解决方案
            </Link>
            <Link
              to="/resources"
              className="text-white/60 hover:text-brand-green-light transition-colors"
            >
              支持与服务
            </Link>
            <Link
              to="/company"
              className="text-white/60 hover:text-brand-green-light transition-colors"
            >
              联系我们
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
