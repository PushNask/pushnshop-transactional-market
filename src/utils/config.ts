type Environment = 'development' | 'staging' | 'production';

const config = {
  development: {
    allowedOrigins: ['http://localhost:3000', 'http://localhost:8080'],
    baseUrl: 'http://localhost:8080'
  },
  staging: {
    allowedOrigins: ['https://preview--pushnshop-transactional-market.lovable.app'],
    baseUrl: 'https://preview--pushnshop-transactional-market.lovable.app'
  },
  production: {
    allowedOrigins: [
      'https://gptengineer.app',
      'https://lovable.dev',
      'https://8d360240-531c-438d-b359-b1c65e377469.lovableproject.com'
    ],
    baseUrl: 'https://8d360240-531c-438d-b359-b1c65e377469.lovableproject.com'
  }
};

export const getAllowedOrigins = () => {
  const env = (import.meta.env.MODE || 'development') as Environment;
  return config[env]?.allowedOrigins || config.development.allowedOrigins;
};

export const getBaseUrl = () => {
  const env = (import.meta.env.MODE || 'development') as Environment;
  return config[env]?.baseUrl || config.development.baseUrl;
};