import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OptimizedImage from '@/components/OptimizedImage';

const navItems = [
  { path: '/', label: 'Home', labelZh: '首页' },
  { path: '/platform', label: 'Platform', labelZh: '产品中心' },
  { path: '/solutions', label: 'Solutions', labelZh: '解决方案' },
  { path: '/resources', label: 'Resources', labelZh: '支持与服务' },
  { path: '/company', label: 'Company', labelZh: '关于我们' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-lg'
          : 'bg-white-800/60 backdrop-blur-xl shadow-lg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-3"
            onClick={handleNavClick}
          >
            <OptimizedImage
              src="/logo.png"
              alt="UniSASE Logo"
              className="h-16 w-auto"
              loading="eager"
            />
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? isScrolled
                        ? 'bg-brand-green/10 text-brand-green'
                        : 'bg-white/20 text-green-800'
                      : isScrolled
                        ? 'text-brand-gray hover:text-brand-green hover:bg-brand-green/5'
                        : 'text-green-800/80 hover:text-green-800 hover:bg-white/10'
                  }`
                }
              >
                {item.labelZh}
              </NavLink>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              className={`text-sm font-medium ${
                isScrolled
                  ? 'text-brand-gray hover:text-brand-green'
                  : 'text-green-800/80 hover:text-green-800 hover:bg-white/10'
              }`}
              onClick={() => {
                navigate('/company');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              联系我们
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="切换导航菜单"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-brand-gray" />
            ) : (
              <Menu className="w-6 h-6 text-brand-gray" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl shadow-xl border-t border-gray-100"
          role="navigation"
          aria-label="移动端导航"
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-brand-green/10 text-brand-green'
                      : 'text-brand-gray hover:text-brand-green hover:bg-brand-green/5'
                  }`
                }
              >
                {item.labelZh}
              </NavLink>
            ))}
            <div className="pt-4 border-t border-gray-100">
              <Button
                variant="ghost"
                className="w-full justify-start text-base font-medium text-brand-gray hover:text-brand-green"
                onClick={() => {
                  navigate('/company');
                  handleNavClick();
                }}
              >
                联系我们
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
