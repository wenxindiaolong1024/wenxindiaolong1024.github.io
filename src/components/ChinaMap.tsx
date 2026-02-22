import { useEffect, useRef, useCallback, useState } from 'react';

// 大区中心数据
export const regionCenters = [
  { name: '华北', value: [116.4074, 39.9042], city: '北京', offices: ['北京', '天津', '石家庄', '太原', '呼和浩特'] },
  { name: '东北', value: [123.4315, 41.8057], city: '沈阳', offices: ['沈阳', '大连', '长春', '哈尔滨'] },
  { name: '华东', value: [121.4737, 31.2304], city: '上海', offices: ['上海', '南京', '杭州', '合肥', '济南', '青岛', '福州', '厦门'] },
  { name: '华中', value: [114.3054, 30.5928], city: '武汉', offices: ['武汉', '长沙', '郑州', '南昌'] },
  { name: '华南', value: [113.2644, 23.1291], city: '广州', offices: ['广州', '深圳', '南宁'] },
  { name: '西南', value: [104.0668, 30.5728], city: '成都', offices: ['成都', '重庆', '贵阳', '昆明'] },
  { name: '西北', value: [108.9398, 34.3416], city: '西安', offices: ['西安', '兰州', '银川', '乌鲁木齐'] },
];

// 办事处数据
export const offices = [
  { name: '哈尔滨', value: [126.5340, 45.8038], region: '东北' },
  { name: '长春', value: [125.3235, 43.8171], region: '东北' },
  { name: '大连', value: [121.6147, 38.9140], region: '东北' },
  { name: '天津', value: [117.2009, 39.0842], region: '华北' },
  { name: '石家庄', value: [114.5149, 38.0423], region: '华北' },
  { name: '太原', value: [112.5489, 37.8706], region: '华北' },
  { name: '呼和浩特', value: [111.7492, 40.8426], region: '华北' },
  { name: '济南', value: [117.1205, 36.6510], region: '华东' },
  { name: '青岛', value: [120.3826, 36.0671], region: '华东' },
  { name: '南京', value: [118.7969, 32.0603], region: '华东' },
  { name: '杭州', value: [120.1551, 30.2741], region: '华东' },
  { name: '合肥', value: [117.2272, 31.8206], region: '华东' },
  { name: '福州', value: [119.2965, 26.0745], region: '华东' },
  { name: '厦门', value: [118.0894, 24.4798], region: '华东' },
  { name: '郑州', value: [113.6253, 34.7466], region: '华中' },
  { name: '武汉', value: [114.3054, 30.5928], region: '华中' },
  { name: '长沙', value: [112.9388, 28.2282], region: '华中' },
  { name: '南昌', value: [115.8579, 28.6820], region: '华中' },
  { name: '广州', value: [113.2644, 23.1291], region: '华南' },
  { name: '深圳', value: [114.0579, 22.5431], region: '华南' },
  { name: '南宁', value: [108.3661, 22.8172], region: '华南' },
  { name: '成都', value: [104.0668, 30.5728], region: '西南' },
  { name: '重庆', value: [106.5516, 29.5630], region: '西南' },
  { name: '贵阳', value: [106.6302, 26.6477], region: '西南' },
  { name: '昆明', value: [102.8329, 24.8801], region: '西南' },
  { name: '西安', value: [108.9398, 34.3416], region: '西北' },
  { name: '兰州', value: [103.8343, 36.0611], region: '西北' },
  { name: '银川', value: [106.2309, 38.4872], region: '西北' },
  { name: '乌鲁木齐', value: [87.6168, 43.8256], region: '西北' },
];

interface ChinaMapProps {
  height?: string;
  onRegionClick?: (region: typeof regionCenters[0]) => void;
  selectedRegion?: typeof regionCenters[0] | null;
  showOffices?: boolean;
  className?: string;
}

export const ChinaMap = ({
  height = '500px',
  onRegionClick,
  selectedRegion,
  showOffices = true,
  className = ''
}: ChinaMapProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<any>(null);
  const echartsRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);

  // 动态加载 ECharts
  useEffect(() => {
    let isMounted = true;
    
    const init = async () => {
      try {
        // 动态导入 echarts
        const echarts = await import('echarts');
        if (!isMounted) return;
        
        echartsRef.current = echarts;
        
        // 加载地图数据
        const res = await fetch('/china.json');
        if (!res.ok) throw new Error('Failed to load map data');
        const geoJson = await res.json();
        
        if (!isMounted) return;
        
        // 注册地图
        if (!echarts.getMap('china')) {
          echarts.registerMap('china', geoJson);
        }
        
        // 初始化图表
        if (chartRef.current) {
          chartInstance.current = echarts.init(chartRef.current);
          setIsReady(true);
        }
      } catch (err) {
        console.error('Map init error:', err);
      }
    };
    
    init();
    
    return () => {
      isMounted = false;
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, []);

  // 更新图表
  useEffect(() => {
    if (!isReady || !chartInstance.current || !echartsRef.current) return;
    
    const echarts = echartsRef.current;
    
    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        textStyle: { color: '#1f2937' },
        formatter: (params: any) => {
          if (params.seriesType === 'scatter') {
            const isRegion = params.data?.type === 'region';
            return `<div style="padding: 8px;">
              <div style="font-weight: bold; font-size: 14px; color: ${isRegion ? '#059669' : '#10b981'}">${params.name}</div>
              <div style="font-size: 12px; color: #6b7280;">${isRegion ? '大区中心' : params.data?.region + '大区'}</div>
            </div>`;
          }
          return params.name;
        }
      },
      geo: {
        map: 'china',
        roam: true,
        zoom: 1.8,
        center: [102, 35],
        label: { show: false },
        itemStyle: { 
          areaColor: 'rgba(5, 150, 105, 0.15)', 
          borderColor: '#ffffff', 
          borderWidth: 1 
        },
        emphasis: { 
          itemStyle: { 
            areaColor: 'rgba(5, 150, 105, 0.35)'
          } 
        }
      },
      series: [
        {
          name: '大区中心',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: regionCenters.map(item => ({
            name: item.name,
            value: [...item.value, item.city],
            type: 'region',
            itemStyle: { 
              color: selectedRegion?.name === item.name ? '#047857' : '#059669'
            }
          })),
          symbolSize: (val: any, params: any) => {
            if (params.data.name === '华北') return 40;
            return selectedRegion?.name === params.data.name ? 32 : 26;
          },
          label: { 
            show: true, 
            formatter: '{b}', 
            position: 'bottom', 
            fontSize: 11, 
            color: '#059669', 
            fontWeight: 'bold' 
          },
          zlevel: 2
        },
        ...(showOffices ? [{
          name: '办事处',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: offices.map(item => ({
            name: item.name,
            value: item.value,
            region: item.region,
            itemStyle: { 
              color: '#10b981',
              opacity: selectedRegion && selectedRegion.name !== item.region ? 0.3 : 0.9
            }
          })),
          symbol: 'circle',
          symbolSize: 8,
          zlevel: 1
        }] : [])
      ]
    };

    chartInstance.current.setOption(option, true);

    // 事件
    chartInstance.current.off('click');
    chartInstance.current.on('click', (params: any) => {
      if (params.seriesType === 'scatter' && onRegionClick) {
        const region = regionCenters.find(r => r.name === params.name);
        if (region) onRegionClick(region);
      }
    });
    
    // resize
    const handleResize = () => chartInstance.current?.resize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isReady, selectedRegion, showOffices, onRegionClick]);

  return (
    <div 
      ref={chartRef} 
      style={{ width: '100%', height }} 
      className={className}
    />
  );
};

export default ChinaMap;