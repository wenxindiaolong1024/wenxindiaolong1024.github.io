#!/bin/bash

# WebP 优化状态检查脚本

echo "🔍 检查 WebP 优化状态..."
echo ""

MISSING_WEBP=0
LARGE_FILES=0

for img in public/*.{png,jpg,jpeg}; do
    [ -f "$img" ] || continue
    
    filename=$(basename "$img")
    name="${filename%.*}"
    webp="public/${name}.webp"
    
    # 检查是否有对应的 WebP
    if [ ! -f "$webp" ]; then
        echo "❌ 缺少 WebP: $filename"
        ((MISSING_WEBP++))
    fi
    
    # 检查原文件大小
    size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img")
    if [ $size -gt 524288 ]; then  # > 500KB
        size_mb=$(echo "scale=2; $size / 1024 / 1024" | bc)
        echo "⚠️  文件过大: $filename (${size_mb}MB)"
        ((LARGE_FILES++))
    fi
done

echo ""
echo "📊 检查结果:"
echo "  - 缺少 WebP: $MISSING_WEBP 个"
echo "  - 文件过大 (>500KB): $LARGE_FILES 个"

if [ $MISSING_WEBP -eq 0 ] && [ $LARGE_FILES -eq 0 ]; then
    echo ""
    echo "✅ 所有图片已优化完成！"
    exit 0
else
    echo ""
    echo "💡 建议: 运行 ./scripts/optimize-images.sh 进行优化"
    exit 1
fi
