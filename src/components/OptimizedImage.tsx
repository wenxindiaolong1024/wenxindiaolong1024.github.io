import { ImgHTMLAttributes } from 'react';

/**
 * 工具函数 - 提取文件名和扩展名
 */
function getFileInfo(path: string) {
  const lastDot = path.lastIndexOf('.');
  const name = path.substring(0, lastDot);
  const ext = path.substring(lastDot);
  return { name, ext };
}

/**
 * 优化的图片组件 - 支持 WebP 格式和自动回退
 *
 * 特性：
 * - 优先使用 WebP 格式（更小的文件大小）
 * - 自动回退到原始格式（兼容不支持 WebP 的浏览器）
 * - 支持所有标准 img 属性
 * - 内置懒加载
 *
 * @example
 * // 基础使用
 * <OptimizedImage src="/hero-dashboard.png" alt="Dashboard" />
 *
 * @example
 * // 自定义样式
 * <OptimizedImage
 *   src="/office.png"
 *   alt="Office"
 *   className="w-full h-auto rounded-lg"
 *   loading="lazy"
 * />
 */

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  /** 图片路径（不含扩展名的 WebP，组件会自动处理） */
  src: string;
  /** 图片描述（必需，用于无障碍） */
  alt: string;
  /** 是否禁用 WebP（默认 false） */
  disableWebP?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  disableWebP = false,
  loading = 'lazy',
  className,
  ...props
}: OptimizedImageProps) {
  const { name, ext } = getFileInfo(src);
  const webpSrc = `${name}.webp`;

  // 如果禁用 WebP、原文件已是 WebP，或是 GIF 格式，直接使用 img
  // GIF 不转换为 WebP，保持动画效果
  if (disableWebP || ext === '.webp' || ext === '.gif') {
    return (
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={className}
        {...props}
      />
    );
  }

  // 使用 picture 元素支持 WebP 和回退
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={className}
        {...props}
      />
    </picture>
  );
}

/**
 * 优化的背景图片组件 - 支持 WebP 格式和自动回退
 *
 * 使用 CSS background-image 而非 <img> 标签
 *
 * @example
 * <OptimizedBackgroundImage
 *   src="/hero-background.jpg"
 *   className="h-screen bg-cover bg-center"
 * >
 *   <h1>Hero Content</h1>
 * </OptimizedBackgroundImage>
 */

interface OptimizedBackgroundImageProps {
  /** 图片路径 */
  src: string;
  /** 子元素 */
  children?: React.ReactNode;
  /** CSS 类名 */
  className?: string;
  /** 是否禁用 WebP */
  disableWebP?: boolean;
}

export function OptimizedBackgroundImage({
  src,
  children,
  className = '',
  disableWebP = false,
}: OptimizedBackgroundImageProps) {
  const { name, ext } = getFileInfo(src);
  const webpSrc = `${name}.webp`;

  // 使用 CSS 实现 WebP 回退
  // GIF 不转换为 WebP，保持动画效果
  const backgroundStyle = disableWebP || ext === '.webp' || ext === '.gif'
    ? { backgroundImage: `url(${src})` }
    : {
        backgroundImage: `image-set(url(${webpSrc}) type("image/webp"), url(${src}))`,
        // 回退方案
        WebkitBackgroundImage: `image-set(url(${webpSrc}) type("image/webp"), url(${src}))`,
      };

  return (
    <div
      className={className}
      style={backgroundStyle}
    >
      {children}
    </div>
  );
}

export default OptimizedImage;
