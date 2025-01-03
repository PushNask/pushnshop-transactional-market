type Environment = 'development' | 'staging' | 'production';

const config = {
  development: {
    allowedOrigins: ['http://localhost:3000', 'http://localhost:8080']
  },
  staging: {
    allowedOrigins: ['https://preview--pushnshop-transactional-market.lovable.app']
  },
  production: {
    allowedOrigins: [
      'https://gptengineer.app',
      'https://lovable.dev'
    ]
  }
};

export const getAllowedOrigins = () => {
  const env = (import.meta.env.MODE || 'development') as Environment;
  return config[env]?.allowedOrigins || config.development.allowedOrigins;
};