import { defineConfig } from 'dumi';

export default defineConfig({
  hash: true,
  title: 'IZUAL - Document',
  mode: 'site',
  favicon: 'https://i.loli.net/2021/10/05/sa4fJO3Y67SCXpD.png',
  logo: 'https://i.loli.net/2021/10/05/sa4fJO3Y67SCXpD.png',
  exportStatic: {},
  fastRefresh: {},

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
});
