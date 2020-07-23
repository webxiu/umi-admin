import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [ // 如果没有 routes 配置，Umi 会进入约定式路由模式  https://umijs.org/zh-CN/docs/convention-routing
  //   { path: '/', component: '@/pages/index' },
  // ],
});
