import { defineConfig } from 'dumi';

// src/app.ts
import Prism from 'prism-react-renderer/prism';

(typeof global !== 'undefined' ? global : window).Prism = Prism;

require('prismjs/components/prism-kotlin');
require('prismjs/components/prism-csharp');

export default defineConfig({
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
