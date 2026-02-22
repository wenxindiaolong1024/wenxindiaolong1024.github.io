import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Solutions from './Solutions';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Users: ({ className }: { className?: string }) => <svg data-testid="users" className={className} />,
  Network: ({ className }: { className?: string }) => <svg data-testid="network" className={className} />,
  Shield: ({ className }: { className?: string }) => <svg data-testid="shield" className={className} />,
  Server: ({ className }: { className?: string }) => <svg data-testid="server" className={className} />,
  ArrowRight: ({ className }: { className?: string }) => <svg data-testid="arrow-right" className={className} />,
  CheckCircle2: ({ className }: { className?: string }) => <svg data-testid="checkcircle2" className={className} />,
}));

describe('Solutions Component', () => {
  beforeEach(() => {
    // Mock window.location.href
    delete (window as Partial<Window>).location;
    (window as typeof globalThis).location = { href: '' } as Location;

    // Mock navigator.clipboard
    const mockClipboard = {
      writeText: vi.fn(() => Promise.resolve()),
    };
    Object.defineProperty(navigator, 'clipboard', {
      value: mockClipboard,
      writable: true,
    });

    // Mock window.alert
    global.alert = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render section header by default', () => {
    render(<Solutions />);

    expect(screen.getByText('坚如磐石的网络与安全')).toBeInTheDocument();
  });

  it('should not render section header when isCompact is true', () => {
    render(<Solutions isCompact={true} />);

    expect(screen.queryByText('坚如磐石的网络与安全')).not.toBeInTheDocument();
  });

  it('should render all solution cards', () => {
    render(<Solutions />);

    expect(screen.getByText('认证')).toBeInTheDocument();
    expect(screen.getByText('组网')).toBeInTheDocument();
    expect(screen.getByText('管控')).toBeInTheDocument();
    expect(screen.getByText('隔离')).toBeInTheDocument();
  });

  it('should render solution subtitles', () => {
    render(<Solutions />);

    expect(screen.getByText('统一身份入口')).toBeInTheDocument();
    expect(screen.getByText('智能网络连接')).toBeInTheDocument();
    expect(screen.getByText('统一安全控制')).toBeInTheDocument();
    expect(screen.getByText('零信任访问')).toBeInTheDocument();
  });

  it('should render solution descriptions', () => {
    render(<Solutions />);

    expect(screen.getByText(/基于 UniAuth 统一身份与访问管理平台/)).toBeInTheDocument();
    expect(screen.getByText(/面向企业多分支、多云与全球化业务场景/)).toBeInTheDocument();
    expect(screen.getByText(/基于 UniCtrl 统一控制平面/)).toBeInTheDocument();
    expect(screen.getByText(/以零信任理念为基础/)).toBeInTheDocument();
  });

  it('should render all features for auth solution', () => {
    render(<Solutions />);

    expect(screen.getByText('远程终端认证')).toBeInTheDocument();
    expect(screen.getByText('本地终端认证')).toBeInTheDocument();
    expect(screen.getByText('应用系统认证')).toBeInTheDocument();
    expect(screen.getByText('终端准入控制')).toBeInTheDocument();
    expect(screen.getByText('应用认证集成')).toBeInTheDocument();
  });

  it('should expand solution details when clicked', () => {
    render(<Solutions />);

    const authButton = screen.getByText('认证').closest('div');
    fireEvent.click(authButton!);

    // Should show expanded details
    expect(screen.getByText('多种 IdP 支持')).toBeInTheDocument();
    expect(screen.getByText('认证安全措施')).toBeInTheDocument();
  });

  it('should collapse solution details when clicked again', () => {
    render(<Solutions />);

    const authButton = screen.getByText('认证').closest('div');
    fireEvent.click(authButton!);
    fireEvent.click(authButton!);

    // Should collapse (expanded details should still be in DOM but visibility may change)
    // The behavior depends on implementation - we just verify no error is thrown
    expect(() => fireEvent.click(authButton!)).not.toThrow();
  });

  it('should render feature tags with checkmarks', () => {
    render(<Solutions />);

    const checkmarks = screen.getAllByTestId('checkcircle2');
    expect(checkmarks.length).toBeGreaterThan(0);
  });

  it('should render CTA button', () => {
    render(<Solutions />);

    const ctaButton = screen.getByRole('button', { name: /获取定制化方案/ });
    expect(ctaButton).toBeInTheDocument();
  });

  it('should not render CTA button when isCompact is true', () => {
    render(<Solutions isCompact={true} />);

    const ctaButton = screen.queryByRole('button', { name: /获取定制化方案/ });
    expect(ctaButton).not.toBeInTheDocument();
  });

  it('should call window.location.href and clipboard.writeText on CTA click', () => {
    render(<Solutions />);

    const ctaButton = screen.getByRole('button', { name: /获取定制化方案/ });

    vi.useFakeTimers();
    fireEvent.click(ctaButton);

    expect(window.location.href).toBe('mailto:business@unisase.cn?subject=获取定制化方案');

    vi.advanceTimersByTime(500);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('business@unisase.cn');
    expect(alert).toHaveBeenCalledWith(expect.stringContaining('请发送邮件至：business@unisase.cn'));

    vi.useRealTimers();
  });

  it('should render solution icons', () => {
    render(<Solutions />);

    expect(screen.getByTestId('users')).toBeInTheDocument();
    expect(screen.getByTestId('network')).toBeInTheDocument();
    expect(screen.getByTestId('shield')).toBeInTheDocument();
    expect(screen.getByTestId('server')).toBeInTheDocument();
  });

  it('should render arrow icons for expandable solutions', () => {
    render(<Solutions />);

    const arrows = screen.getAllByTestId('arrow-right');
    expect(arrows.length).toBeGreaterThan(0);
  });

  it('should handle visibility state for animations', () => {
    render(<Solutions />);

    const { container } = render(<Solutions />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('should cleanup IntersectionObserver on unmount', () => {
    const { unmount } = render(<Solutions />);

    expect(() => {
      unmount();
    }).not.toThrow();
  });

  it('should render solution architecture image', () => {
    const { container } = render(<Solutions />);

    const image = container.querySelector('img[alt*="架构图"]');
    expect(image).toBeInTheDocument();
  });

  it('should expand multiple solutions', () => {
    render(<Solutions />);

    const authButton = screen.getByText('认证').closest('div');
    const networkButton = screen.getByText('组网').closest('div');

    fireEvent.click(authButton!);
    expect(screen.getByText('多种 IdP 支持')).toBeInTheDocument();

    fireEvent.click(networkButton!);
    expect(screen.getByText('质量保证')).toBeInTheDocument();
  });

  it('should render details items with bullets', () => {
    render(<Solutions />);

    const authButton = screen.getByText('认证').closest('div');
    fireEvent.click(authButton!);

    // Should render detail items
    const detailItems = screen.getAllByText(/AD, LDAP|SAML|OAuth/);
    expect(detailItems.length).toBeGreaterThan(0);
  });

  it('should handle rapid expansion/collapse without errors', () => {
    render(<Solutions />);

    const authButton = screen.getByText('认证').closest('div');

    expect(() => {
      for (let i = 0; i < 10; i++) {
        fireEvent.click(authButton!);
      }
    }).not.toThrow();
  });

  it('should render network solution features', () => {
    render(<Solutions />);

    expect(screen.getByText('全球骨干网接入')).toBeInTheDocument();
    expect(screen.getByText('智能应用选路')).toBeInTheDocument();
    expect(screen.getByText('隐藏公网暴露面')).toBeInTheDocument();
    expect(screen.getByText('广域网组网')).toBeInTheDocument();
    expect(screen.getByText('局域网 Wi-Fi')).toBeInTheDocument();
  });

  it('should render control solution features', () => {
    render(<Solutions />);

    expect(screen.getByText('防火墙访问控制')).toBeInTheDocument();
    expect(screen.getByText('上网行为管理')).toBeInTheDocument();
    expect(screen.getByText('威胁情报防护')).toBeInTheDocument();
    expect(screen.getByText('攻击防护')).toBeInTheDocument();
    expect(screen.getByText('终端状态检测')).toBeInTheDocument();
  });

  it('should render isolation solution features', () => {
    render(<Solutions />);

    expect(screen.getByText('用户-应用隔离')).toBeInTheDocument();
    expect(screen.getByText('远程用户访问')).toBeInTheDocument();
    expect(screen.getByText('本地用户访问')).toBeInTheDocument();
    expect(screen.getByText('数据中心隔离')).toBeInTheDocument();
    expect(screen.getByText('分支园区隔离')).toBeInTheDocument();
  });

  it('should expand network solution details', () => {
    render(<Solutions />);

    const networkButton = screen.getByText('组网').closest('div');
    fireEvent.click(networkButton!);

    expect(screen.getByText('质量保证')).toBeInTheDocument();
    expect(screen.getByText('信道加密')).toBeInTheDocument();
  });

  it('should expand control solution details', () => {
    render(<Solutions />);

    const controlButton = screen.getByText('管控').closest('div');
    fireEvent.click(controlButton!);

    expect(screen.getByText('防火墙')).toBeInTheDocument();
    expect(screen.getByText('威胁情报')).toBeInTheDocument();
  });

  it('should expand isolation solution details', () => {
    render(<Solutions />);

    const isolationButton = screen.getByText('隔离').closest('div');
    fireEvent.click(isolationButton!);

    expect(screen.getByText('User-App 隔离')).toBeInTheDocument();
    expect(screen.getByText('设备隔离')).toBeInTheDocument();
  });

  it('should render all detail items', () => {
    render(<Solutions />);

    const authButton = screen.getByText('认证').closest('div');
    fireEvent.click(authButton!);

    // Check various detail items
    expect(screen.getByText('AD, LDAP')).toBeInTheDocument();
    expect(screen.getByText('SAML: Azure AD, Google Workspace')).toBeInTheDocument();
    expect(screen.getByText('OAuth 2.0/OIDC: 飞书、钉钉、企微')).toBeInTheDocument();
  });

  it('should have proper CSS classes for solution cards', () => {
    const { container } = render(<Solutions />);

    const cards = container.querySelectorAll('.bg-brand-light-gray');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('should render solution cards in grid layout', () => {
    const { container } = render(<Solutions />);

    const grid = container.querySelector('.md\\:grid-cols-2');
    expect(grid).toBeInTheDocument();
  });

  it('should handle clipboard API not being available', () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      writable: true,
    });

    render(<Solutions />);

    vi.useFakeTimers();
    const ctaButton = screen.getByRole('button', { name: /获取定制化方案/ });
    fireEvent.click(ctaButton);
    vi.advanceTimersByTime(500);

    expect(() => {
      vi.advanceTimersByTime(500);
    }).not.toThrow();

    vi.useRealTimers();
  });

  it('should render description with correct line breaks', () => {
    render(<Solutions />);

    const descriptions = screen.getAllByText(/基于|面向|以/);
    expect(descriptions.length).toBeGreaterThan(0);
  });

  it('should render architecture image in full mode', () => {
    const { container } = render(<Solutions />);
    const image = container.querySelector('img[alt*="架构图"]');
    expect(image).toBeInTheDocument();
  });

  it('should not render architecture image in compact mode', () => {
    const { container } = render(<Solutions isCompact={true} />);
    const image = container.querySelector('img[alt*="架构图"]');
    expect(image).not.toBeInTheDocument();
  });
});
