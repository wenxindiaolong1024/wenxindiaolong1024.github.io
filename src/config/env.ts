/**
 * Environment variable validation and configuration
 * Ensures all required environment variables are available with fallbacks
 */

const getEnvVar = (key: string, fallback?: string): string => {
  const value = import.meta.env[key];
  if (!value && !fallback) {
    console.warn(`Missing environment variable: ${key}, using fallback: #`);
    return '#';
  }
  return value || fallback || '';
};

export const config = {
  downloads: {
    windows: getEnvVar('VITE_DOWNLOAD_WINDOWS_URL', '#'),
    mac: getEnvVar('VITE_DOWNLOAD_MAC_URL', '#'),
    ios: getEnvVar('VITE_DOWNLOAD_IOS_URL', '#'),
    android: getEnvVar('VITE_DOWNLOAD_ANDROID_URL', '#'),
  },
  links: {
    beian: getEnvVar('VITE_BEIAN_URL', '#'),
    privacy: getEnvVar('VITE_PRIVACY_POLICY_URL', '#'),
  },
  map: {
    location: getEnvVar('VITE_BAIDU_MAP_LOCATION', '40.0578,116.3709'), // 纬度,经度
    companyName: getEnvVar('VITE_COMPANY_NAME', '安信道合（北京）科技发展有限公司'),
    companyAddress: getEnvVar('VITE_COMPANY_ADDRESS', '北京市海淀区东升科技园北街2号院5号楼10层101'),
  },
  contact: {
    email: 'business@unisase.cn',
    phone: '',
  },
   baiduMap: {
    ak: getEnvVar('VITE_BAIDU_MAP_AK', ''), // 百度地图 AK，可选
  },
} as const;
