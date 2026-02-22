/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_DOWNLOAD_WINDOWS_URL: string
  readonly VITE_DOWNLOAD_MAC_URL: string
  readonly VITE_DOWNLOAD_IOS_URL: string
  readonly VITE_DOWNLOAD_ANDROID_URL: string
  readonly VITE_BEIAN_URL: string
  readonly VITE_PRIVACY_POLICY_URL: string
  readonly VITE_BAIDU_MAP_LOCATION: string
  readonly VITE_COMPANY_NAME: string
  readonly VITE_COMPANY_ADDRESS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
