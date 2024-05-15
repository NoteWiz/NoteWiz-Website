module.exports = {
     webpack: (config) => {
       config.resolve.alias.canvas = false;
    
       return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
    }