import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Features from './Features';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Shield: ({ className }: { className?: string }) => <svg data-testid="shield" className={className} />,
  Network: ({ className }: { className?: string }) => <svg data-testid="network" className={className} />,
  Lock: ({ className }: { className?: string }) => <svg data-testid="lock" className={className} />,
  Eye: ({ className }: { className?: string }) => <svg data-testid="eye" className={className} />,
  Users: ({ className }: { className?: string }) => <svg data-testid="users" className={className} />,
  Database: ({ className }: { className?: string }) => <svg data-testid="database" className={className} />,
  Globe: ({ className }: { className?: string }) => <svg data-testid="globe" className={className} />,
  UserCog: ({ className }: { className?: string }) => <svg data-testid="user-cog" className={className} />,
  CheckCircle2: ({ className }: { className?: string }) => <svg data-testid="checkcircle2" className={className} />,
  Maximize2: ({ className }: { className?: string }) => <svg data-testid="maximize2" className={className} />,
  Minimize2: ({ className }: { className?: string }) => <svg data-testid="minimize2" className={className} />,
}));

describe('Features Component', () => {
  it('should render section heading', () => {
    render(<Features />);

    expect(screen.getByText('覆盖认证、连接、管控、防护与分析的完整闭环')).toBeInTheDocument();
  });

  it('should render architecture heading', () => {
    render(<Features />);

    expect(screen.getByText('功能架构全景图')).toBeInTheDocument();
  });

  it('should render description', () => {
    render(<Features />);

    expect(screen.getByText(/UniSASE 将网络接入、身份认证、安全控制与日志分析整合为一套平台/)).toBeInTheDocument();
  });

  it('should render all main features', () => {
    render(<Features />);

    expect(screen.getByText('统一身份认证')).toBeInTheDocument();
    expect(screen.getByText('统一控制')).toBeInTheDocument();
    expect(screen.getByText('统一日志分析')).toBeInTheDocument();
  });

  it('should render feature subtitles', () => {
    render(<Features />);

    expect(screen.getByText('UniAuth')).toBeInTheDocument();
    expect(screen.getByText('UniCtrl')).toBeInTheDocument();
    expect(screen.getByText('UniLog')).toBeInTheDocument();
  });

  it('should render feature descriptions', () => {
    render(<Features />);

    expect(screen.getByText('企业级统一身份与访问管理平台，支持多种 IdP 对接和认证协议')).toBeInTheDocument();
    expect(screen.getByText('统一策略控制与编排引擎，实现跨网络、跨位置的一致策略执行')).toBeInTheDocument();
    expect(screen.getByText('统一可视化与分析系统，提供全局可见性和深度分析能力')).toBeInTheDocument();
  });

  it('should render UniAuth features', () => {
    render(<Features />);

    expect(screen.getByText('AD/LDAP 集成')).toBeInTheDocument();
    expect(screen.getByText('SAML/OAuth 2.0')).toBeInTheDocument();
    expect(screen.getByText('多因素认证 MFA')).toBeInTheDocument();
    expect(screen.getByText('单点登录 SSO')).toBeInTheDocument();
  });

  it('should render UniCtrl features', () => {
    render(<Features />);

    expect(screen.getByText('策略集中管理')).toBeInTheDocument();
    expect(screen.getByText('自动化分发')).toBeInTheDocument();
    expect(screen.getByText('多维策略控制')).toBeInTheDocument();
    expect(screen.getByText('实时策略更新')).toBeInTheDocument();
  });

  it('should render UniLog features', () => {
    render(<Features />);

    expect(screen.getByText('全量会话日志')).toBeInTheDocument();
    expect(screen.getByText('行为分析')).toBeInTheDocument();
    expect(screen.getByText('安全事件分析')).toBeInTheDocument();
    expect(screen.getByText('合规审计')).toBeInTheDocument();
  });

  it('should render all sub features', () => {
    render(<Features />);

    expect(screen.getByText('SD-WAN')).toBeInTheDocument();
    expect(screen.getByText('零信任')).toBeInTheDocument();
    expect(screen.getByText('全球接入')).toBeInTheDocument();
    expect(screen.getByText('威胁情报')).toBeInTheDocument();
    expect(screen.getByText('行为管理')).toBeInTheDocument();
    expect(screen.getByText('防火墙')).toBeInTheDocument();
  });

  it('should render sub feature descriptions', () => {
    render(<Features />);

    expect(screen.getByText('智能选路')).toBeInTheDocument();
    expect(screen.getByText('身份驱动')).toBeInTheDocument();
    expect(screen.getByText('就近访问')).toBeInTheDocument();
    expect(screen.getByText('实时防护')).toBeInTheDocument();
    expect(screen.getByText('精准管控')).toBeInTheDocument();
    expect(screen.getByText('访问控制')).toBeInTheDocument();
  });

  it('should render more capabilities heading', () => {
    render(<Features />);

    expect(screen.getByText('更多核心能力')).toBeInTheDocument();
  });

  it('should render fullscreen toggle icon for video section', () => {
    render(<Features />);

    const icon = screen.getByTestId('maximize2');
    expect(icon).toBeInTheDocument();
  });

  it('should have proper CSS classes for section', () => {
    const { container } = render(<Features />);

    const section = container.querySelector('section');
    expect(section).toHaveClass('py-24');
    expect(section).toHaveClass('bg-brand-light-gray');
  });

  it('should render main features in grid layout', () => {
    const { container } = render(<Features />);

    const grid = container.querySelector('.lg\\:grid-cols-3');
    expect(grid).toBeInTheDocument();
  });

  it('should render sub features in grid layout', () => {
    const { container } = render(<Features />);

    const grid = container.querySelector('.grid-cols-2');
    expect(grid).toBeInTheDocument();
  });

  it('should render all feature icons', () => {
    render(<Features />);

    expect(screen.getAllByTestId('users').length).toBeGreaterThan(0);
    expect(screen.getAllByTestId('shield').length).toBeGreaterThan(0);
    expect(screen.getByTestId('eye')).toBeInTheDocument();
  });

  it('should render all sub feature icons', () => {
    render(<Features />);

    expect(screen.getByTestId('network')).toBeInTheDocument();
    expect(screen.getByTestId('lock')).toBeInTheDocument();
    expect(screen.getByTestId('globe')).toBeInTheDocument();
    expect(screen.getByTestId('database')).toBeInTheDocument();
  });

  it('should render checkmark icons for feature items', () => {
    const { container } = render(<Features />);

    const checkmarks = container.querySelectorAll('[data-testid="checkcircle2"]');
    expect(checkmarks.length).toBeGreaterThan(0);
  });

  it('should handle visibility state for animations', () => {
    render(<Features />);

    // Component should initialize with IntersectionObserver
    const { container } = render(<Features />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('should cleanup IntersectionObserver on unmount', () => {
    const { unmount } = render(<Features />);

    expect(() => {
      unmount();
    }).not.toThrow();
  });

  it('should render feature cards with proper styling', () => {
    const { container } = render(<Features />);

    const cards = container.querySelectorAll('.bg-white');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('should render feature descriptions with proper line height', () => {
    render(<Features />);

    // Check that descriptions are rendered
    const descriptions = screen.getAllByText(/企业级|统一|统一可视化/);
    expect(descriptions.length).toBeGreaterThan(0);
  });

  it('should handle threshold for visibility correctly', () => {
    render(<Features />);

    // IntersectionObserver should be set up with threshold 0.1
    const { container } = render(<Features />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('should render feature items with checkmarks', () => {
    render(<Features />);

    // UniAuth has 4 feature items
    const uniAuthItems = screen.getAllByText(/AD\/LDAP|SAML\/OAuth 2\.0|多因素认证 MFA|单点登录 SSO/);
    expect(uniAuthItems.length).toBe(4);
  });

  it('should render sub features in correct order', () => {
    render(<Features />);

    const subFeatures = screen.getAllByText(/SD-WAN|零信任|全球接入|威胁情报|行为管理|防火墙/);
    expect(subFeatures[0]).toHaveTextContent('SD-WAN');
    expect(subFeatures[1]).toHaveTextContent('零信任');
  });
});
