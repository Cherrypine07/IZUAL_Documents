import { defineConfig } from 'dumi';

export default defineConfig({
  hash: true,
  title: 'IZUAL - Document',
  mode: 'site',
  favicon: 'https://i.loli.net/2021/10/05/sa4fJO3Y67SCXpD.png',
  logo: 'https://i.loli.net/2021/10/05/sa4fJO3Y67SCXpD.png',
  exportStatic: {},
  fastRefresh: {},
  outputPath: 'docs-dist',

  metas: [
    {
      name: 'keywords',
      content: 'IZUAL - Document',
    },
    {
      name: 'description',
      content: 'Your smart AI assistant',
    },
    {
      bar: 'foo',
    },
  ],

  history: {
    type: 'hash',
  },
  // 路由前缀
  base: '/IZUAL_Documents/',
  // 公共资源前缀
  publicPath: process.env.NODE_ENV === 'production' ? '/IZUAL_Documents/' : '/',
  // more config: https://d.umijs.org/config
});
