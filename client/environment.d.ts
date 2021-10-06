declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_GOOGLE_MAPS_API_KEY: string
      NODE_ENV: 'development' | 'production';
    }
  }
}

export { }