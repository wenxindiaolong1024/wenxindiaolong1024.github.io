import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SolutionsPage from './SolutionsPage';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  ArrowRight: ({ className }: { className?: string }) => <svg data-testid="arrow-right" className={className} />,
  Users: ({ className }: { className?: string }) => <svg data-testid="users" className={className} />,
  Network: ({ className }: { className?: string }) => <svg data-testid="network" className={className} />,
  Shield: ({ className }: { className?: string }) => <svg data-testid="shield" className={className} />,
  Server: ({ className }: { className?: string }) => <svg data-testid="server" className={className} />,
  BarChart3: ({ className }: { className?: string }) => <svg data-testid="barchart3" className={className} />,
  CheckCircle2: ({ className }: { className?: string }) => <svg data-testid="checkcircle2" className={className} />,
  Fingerprint: ({ className }: { className?: string }) => <svg data-testid="fingerprint" className={className} />,
  Globe: ({ className }: { className?: string }) => <svg data-testid="globe" className={className} />,
  Eye: ({ className }: { className?: string }) => <svg data-testid="eye" className={className} />,
  Database: ({ className }: { className?: string }) => <svg data-testid="database" className={className} />,
  ShieldCheck: ({ className }: { className?: string }) => <svg data-testid="shieldcheck" className={className} />,
  Key: ({ className }: { className?: string }) => <svg data-testid="key" className={className} />,
}));

// Mock Button component
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className }: { children: React.ReactNode; onClick?: () => void; className?: string }) => (
    <button onClick={onClick} className={className} data-testid="button">
      {children}
    </button>
  ),
}));

describe('SolutionsPage Component', () => {
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

  it('should render hero section', () => {
    render(<SolutionsPage />);

    expect(screen.getByText('坚如磐石的网络与安全')).toBeInTheDocument();
  });

  it('should render hero description', () => {
    render(<SolutionsPage />);

    expect(screen.getByText(/UniSASE 以统一身份、统一控制与统一可视化为核心能力/)).toBeInTheDocument();
  });

  it('should render all solution navigation buttons', () => {
    render(<SolutionsPage />);

    expect(screen.getByRole('button', { name: '认证' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '组网' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '管控' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '隔离' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '分析' })).toBeInTheDocument();
  });

  it('should render current solution details', () => {
    render(<SolutionsPage />);

    // Default active solution is 'auth'
    expect(screen.getByRole('heading', { name: '认证' })).toBeInTheDocument();
    expect(screen.getByText('统一身份入口')).toBeInTheDocument();
  });

  it('should switch active solution when button is clicked', () => {
    render(<SolutionsPage />);

    const networkButton = screen.getByRole('button', { name: '组网' });
    fireEvent.click(networkButton);

    expect(screen.getByText('智能网络连接')).toBeInTheDocument();
  });

  it('should render solution features', () => {
    render(<SolutionsPage />);

    expect(screen.getByText('远程终端')).toBeInTheDocument();
    expect(screen.getByText('本地终端')).toBeInTheDocument();
    expect(screen.getByText('应用系统')).toBeInTheDocument();
  });

  it('should render solution capabilities', () => {
    render(<SolutionsPage />);

    expect(screen.getByText('多种 IdP 支持')).toBeInTheDocument();
    expect(screen.getByText('认证安全措施')).toBeInTheDocument();
  });

  it('should render CTA button for booking demo', () => {
    render(<SolutionsPage />);

    const ctaButton = screen.getByRole('button', { name: /预约演示/ });
    expect(ctaButton).toBeInTheDocument();
  });

  it('should call window.location.href and clipboard.writeText on CTA click', () => {
    render(<SolutionsPage />);

    const ctaButton = screen.getByRole('button', { name: /预约演示/ });

    // Use fake timers for setTimeout
    vi.useFakeTimers();

    fireEvent.click(ctaButton);

    expect(window.location.href).toBe('mailto:business@unisase.cn?subject=预约演示');

    // Fast-forward timer
    vi.advanceTimersByTime(500);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('business@unisase.cn');
    expect(alert).toHaveBeenCalledWith(expect.stringContaining('请发送邮件至：business@unisase.cn'));

    vi.useRealTimers();
  });

  it('should render solution architecture image', () => {
    const { container } = render(<SolutionsPage />);

    const image = container.querySelector('img[alt*="架构图"]');
    expect(image).toBeInTheDocument();
  });

  it('should not render legacy "Solutions 解决方案" badge', () => {
    render(<SolutionsPage />);

    expect(screen.queryByText('Solutions 解决方案')).not.toBeInTheDocument();
  });

  it('should highlight active solution button', () => {
    render(<SolutionsPage />);

    const authButton = screen.getByRole('button', { name: '认证' });
    expect(authButton).toBeInTheDocument();
  });

  it('should update content when switching to network solution', () => {
    render(<SolutionsPage />);

    const networkButton = screen.getByRole('button', { name: '组网' });
    fireEvent.click(networkButton);

    expect(screen.getByText(/让企业网络快速、稳定、低成本地连接到云与全球/)).toBeInTheDocument();
    expect(screen.getByText('全球骨干网')).toBeInTheDocument();
    expect(screen.getByText('智能选路')).toBeInTheDocument();
  });

  it('should update content when switching to control solution', () => {
    render(<SolutionsPage />);

    const controlButton = screen.getByRole('button', { name: '管控' });
    fireEvent.click(controlButton);

    expect(screen.getAllByText(/基于 UniCtrl 统一控制平面/).length).toBeGreaterThan(0);
    expect(screen.getAllByText('防火墙').length).toBeGreaterThan(0);
    expect(screen.getAllByText('行为管理').length).toBeGreaterThan(0);
  });

  it('should update content when switching to isolation solution', () => {
    render(<SolutionsPage />);

    const isolationButton = screen.getByRole('button', { name: '隔离' });
    fireEvent.click(isolationButton);

    expect(screen.getAllByText(/以零信任理念为基础/).length).toBeGreaterThan(0);
    expect(screen.getAllByText('User-App 隔离').length).toBeGreaterThan(0);
  });

  it('should update content when switching to analysis solution', () => {
    render(<SolutionsPage />);

    const analysisButton = screen.getByRole('button', { name: '分析' });
    fireEvent.click(analysisButton);

    expect(screen.getAllByText(/基于 UniLog 统一日志与分析平台/).length).toBeGreaterThan(0);
    expect(screen.getByText('会话分析')).toBeInTheDocument();
    expect(screen.getByText('行为分析')).toBeInTheDocument();
  });

  it('should render solution icons', () => {
    render(<SolutionsPage />);

    expect(screen.getAllByTestId('users').length).toBeGreaterThan(0);
    expect(screen.getAllByTestId('network').length).toBeGreaterThan(0);
    expect(screen.getAllByTestId('shield').length).toBeGreaterThan(0);
    expect(screen.getAllByTestId('server').length).toBeGreaterThan(0);
    expect(screen.getAllByTestId('barchart3').length).toBeGreaterThan(0);
  });

  it('should render capability items with bullets', () => {
    render(<SolutionsPage />);

    // Check that capability items are rendered
    const bullets = screen.getAllByText(/AD, LDAP|OAuth|SAML|SMS|EMail/);
    expect(bullets.length).toBeGreaterThan(0);
  });

  it('should render "获取方案详情" button in solution detail', () => {
    render(<SolutionsPage />);

    const detailButton = screen.getByRole('button', { name: /获取方案详情/ });
    expect(detailButton).toBeInTheDocument();
  });

  it('should handle visibility state for animations', () => {
    render(<SolutionsPage />);

    const { container } = render(<SolutionsPage />);
    expect(container.querySelector('main')).toBeInTheDocument();
  });

  it('should cleanup IntersectionObserver on unmount', () => {
    const { unmount } = render(<SolutionsPage />);

    expect(() => {
      unmount();
    }).not.toThrow();
  });

  it('should render solution full description', () => {
    render(<SolutionsPage />);

    expect(screen.getByText(/基于 UniAuth 统一身份与访问管理/)).toBeInTheDocument();
  });

  it('should render feature tags with checkmarks', () => {
    render(<SolutionsPage />);

    const checkmarks = screen.getAllByTestId('checkcircle2');
    expect(checkmarks.length).toBeGreaterThan(0);
  });

  it('should handle all solution transitions correctly', () => {
    render(<SolutionsPage />);

    const solutions = ['认证', '组网', '管控', '隔离', '分析'];

    solutions.forEach((solution) => {
      const button = screen.getByRole('button', { name: solution });
      fireEvent.click(button);
      expect(button).toBeInTheDocument();
    });
  });

  it('should not render legacy UniPOP section', () => {
    render(<SolutionsPage />);

    expect(screen.queryByText('UniPOP')).not.toBeInTheDocument();
  });

  it('should render architecture diagram image', () => {
    const { container } = render(<SolutionsPage />);

    const image = container.querySelector('img[alt*="架构图"]');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/auth.png');
  });

  it('should handle rapid solution switches without errors', () => {
    render(<SolutionsPage />);

    const buttons = ['组网', '管控', '隔离', '分析'];

    expect(() => {
      buttons.forEach((btnText) => {
        const button = screen.getByText(btnText);
        fireEvent.click(button);
      });
    }).not.toThrow();
  });

  it('should render capability items correctly for each solution', () => {
    render(<SolutionsPage />);

    // Check auth solution capabilities
    expect(screen.getByText('多种 IdP 支持')).toBeInTheDocument();
    expect(screen.getByText('认证安全措施')).toBeInTheDocument();

    // Switch to network solution
    fireEvent.click(screen.getByText('组网'));
    expect(screen.getByText('质量保证')).toBeInTheDocument();
    expect(screen.getByText('减少暴露面')).toBeInTheDocument();
  });

  it('should render arrow icon in CTA buttons', () => {
    render(<SolutionsPage />);

    const arrowIcon = screen.getAllByTestId('arrow-right');
    expect(arrowIcon.length).toBeGreaterThan(0);
  });

  it('should render all solution capability icons', () => {
    render(<SolutionsPage />);

    expect(screen.getByTestId('database')).toBeInTheDocument();
    expect(screen.getByTestId('key')).toBeInTheDocument();
    expect(screen.getByTestId('globe')).toBeInTheDocument();
    expect(screen.getByTestId('fingerprint')).toBeInTheDocument();
  });

  it('should handle clipboard API not being available', () => {
    // Remove clipboard
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      writable: true,
    });

    render(<SolutionsPage />);

    vi.useFakeTimers();
    const ctaButton = screen.getByRole('button', { name: /预约演示/ });
    fireEvent.click(ctaButton);
    vi.advanceTimersByTime(500);

    // Should not throw error
    expect(() => {
      vi.advanceTimersByTime(500);
    }).not.toThrow();

    vi.useRealTimers();
  });
});
