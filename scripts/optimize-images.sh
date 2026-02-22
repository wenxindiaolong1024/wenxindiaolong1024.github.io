#!/bin/bash

# 图片优化脚本 - 转换为 WebP 并压缩原格式
# 使用方法: ./scripts/optimize-images.sh

set -e  # 遇到错误立即退出

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  UniSASE 图片优化工具${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 检查依赖工具
check_dependency() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${RED}错误: $1 未安装${NC}"
        echo -e "${YELLOW}请先安装: $2${NC}"
        exit 1
    else
        echo -e "${GREEN}✓${NC} $1 已安装"
    fi
}

# 检测 ImageMagick 版本并设置正确的命令
detect_imagemagick() {
    if command -v magick &> /dev/null; then
        # ImageMagick v7
        MAGICK_CMD="magick"
        local version=$(magick -version | head -n1 | grep -oE '[0-9]+\.[0-9]+\.[0-9]+')
        echo -e "${GREEN}✓${NC} ImageMagick v7 已安装 (版本: $version)"
        return 0
    elif command -v convert &> /dev/null; then
        # ImageMagick v6
        MAGICK_CMD="convert"
        local version=$(convert -version | head -n1 | grep -oE '[0-9]+\.[0-9]+\.[0-9]+')
        echo -e "${GREEN}✓${NC} ImageMagick v6 已安装 (版本: $version)"
        echo -e "${YELLOW}  💡 提示: ImageMagick v7 使用 'magick' 命令${NC}"
        return 0
    else
        echo -e "${RED}错误: ImageMagick 未安装${NC}"
        echo -e "${YELLOW}请先安装: brew install imagemagick (macOS) 或 apt-get install imagemagick (Ubuntu)${NC}"
        exit 1
    fi
}

echo -e "${BLUE}[1/6] 检查依赖工具...${NC}"
check_dependency "cwebp" "brew install webp (macOS) 或 apt-get install webp (Ubuntu)"
detect_imagemagick
check_dependency "gifsicle" "brew install gifsicle (macOS) 或 apt-get install gifsicle (Ubuntu)"
echo ""

# 创建备份目录
BACKUP_DIR="public/backup-$(date +%Y%m%d-%H%M%S)"
echo -e "${BLUE}[2/6] 创建备份目录...${NC}"
mkdir -p "$BACKUP_DIR"
echo -e "${GREEN}✓${NC} 备份目录: $BACKUP_DIR"
echo ""

# 备份原始文件
echo -e "${BLUE}[3/6] 备份原始文件...${NC}"
cp public/*.{png,jpg,jpeg,gif} "$BACKUP_DIR/" 2>/dev/null || true
echo -e "${GREEN}✓${NC} 原始文件已备份"
echo ""

# 统计原始大小
ORIGINAL_SIZE=$(du -sh public | awk '{print $1}')
echo -e "${BLUE}原始 public 目录大小: ${YELLOW}$ORIGINAL_SIZE${NC}"
echo ""

# 优化函数
optimize_image() {
    local file=$1
    local filename=$(basename "$file")
    local name="${filename%.*}"
    local ext="${filename##*.}"

    echo -e "${BLUE}处理: ${NC}$filename"

    # 1. 转换为 WebP (高质量)
    if [[ "$ext" != "gif" ]]; then
        cwebp -q 85 "$file" -o "public/${name}.webp" 2>/dev/null
        local webp_size=$(ls -lh "public/${name}.webp" | awk '{print $5}')
        echo -e "  ${GREEN}→${NC} WebP: $webp_size"
    fi

    # 2. 压缩原格式文件
    case "$ext" in
        png)
            # PNG 优化：使用 ImageMagick 压缩
            $MAGICK_CMD "$file" -strip -quality 85 -define png:compression-level=9 "${file}.tmp"
            mv "${file}.tmp" "$file"
            local opt_size=$(ls -lh "$file" | awk '{print $5}')
            echo -e "  ${GREEN}→${NC} PNG 优化: $opt_size"
            ;;
        jpg|jpeg)
            # JPEG 优化：去除元数据，优化质量
            $MAGICK_CMD "$file" -strip -quality 80 -sampling-factor 4:2:0 "${file}.tmp"
            mv "${file}.tmp" "$file"
            local opt_size=$(ls -lh "$file" | awk '{print $5}')
            echo -e "  ${GREEN}→${NC} JPEG 优化: $opt_size"
            ;;
        gif)
            # GIF 优化：使用 gifsicle
            gifsicle -O3 --lossy=80 "$file" -o "${file}.tmp"
            mv "${file}.tmp" "$file"
            local opt_size=$(ls -lh "$file" | awk '{print $5}')
            echo -e "  ${GREEN}→${NC} GIF 优化: $opt_size"
            echo -e "  ${YELLOW}💡 建议: 考虑转换为 MP4 视频以获得更小体积${NC}"
            ;;
    esac
}

# 处理 PNG 文件
echo -e "${BLUE}[4/6] 优化 PNG 文件...${NC}"
PNG_COUNT=0
for file in public/*.png; do
    if [ -f "$file" ]; then
        optimize_image "$file"
        ((PNG_COUNT++))
    fi
done
echo -e "${GREEN}✓${NC} 处理了 $PNG_COUNT 个 PNG 文件"
echo ""

# 处理 JPEG 文件
echo -e "${BLUE}[5/6] 优化 JPEG 文件...${NC}"
JPG_COUNT=0
for file in public/*.jpg public/*.jpeg; do
    if [ -f "$file" ]; then
        optimize_image "$file"
        ((JPG_COUNT++))
    fi
done
echo -e "${GREEN}✓${NC} 处理了 $JPG_COUNT 个 JPEG 文件"
echo ""

# 处理 GIF 文件
echo -e "${BLUE}[6/6] 优化 GIF 文件...${NC}"
GIF_COUNT=0
for file in public/*.gif; do
    if [ -f "$file" ]; then
        optimize_image "$file"
        ((GIF_COUNT++))
    fi
done
echo -e "${GREEN}✓${NC} 处理了 $GIF_COUNT 个 GIF 文件"
echo ""

# 统计优化后大小
NEW_SIZE=$(du -sh public | awk '{print $1}')
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}✓ 优化完成！${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "原始大小: ${YELLOW}$ORIGINAL_SIZE${NC}"
echo -e "优化后:   ${GREEN}$NEW_SIZE${NC}"
echo -e ""
echo -e "处理统计:"
echo -e "  - PNG 文件: $PNG_COUNT 个"
echo -e "  - JPEG 文件: $JPG_COUNT 个"
echo -e "  - GIF 文件: $GIF_COUNT 个"
echo -e ""
echo -e "${YELLOW}备份位置: $BACKUP_DIR${NC}"
echo -e ""
echo -e "${BLUE}下一步:${NC}"
echo -e "1. 检查优化后的图片质量"
echo -e "2. 更新代码使用 <picture> 标签支持 WebP"
echo -e "3. 测试浏览器兼容性"
echo -e ""
echo -e "${GREEN}优化脚本执行完成！${NC}"
