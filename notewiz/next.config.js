module.exports = {
     webpack: (config) => {
       config.resolve.alias.canvas = false;
    
       return config;
  },
  output: "export",
  images: {
    unoptimized: true,
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