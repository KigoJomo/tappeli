// next-sitemap.config.js
module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/dashboard/*'],
  transform: async (config, path) => {
    if (path === '/') {
      return { priority: 1.0, changefreq: 'daily' }
    }
    if (path.startsWith('/products')) {
      return { priority: 0.9, lastmod: new Date().toISOString() }
    }
    return config;
  }
}