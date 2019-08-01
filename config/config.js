import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import webpackPlugin from './plugin.config';
const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins = [
	[
		'umi-plugin-react',
		{
			antd: true,
			dva: {
				hmr: true
			},
			locale: {
				// default false
				enable: true,
				// default zh-CN
				default: 'zh-CN',
				// default true, when it is true, will use `navigator.language` overwrite default
				baseNavigator: true
			},
			dynamicImport: {
				loadingComponent: './components/PageLoading/index',
				webpackChunkName: true,
				level: 3
			},
			pwa: pwa
				? {
						workboxPluginMode: 'InjectManifest',
						workboxOptions: {
							importWorkboxFrom: 'local'
						}
					}
				: false // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
			// dll features https://webpack.js.org/plugins/dll-plugin/
			// dll: {
			//   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
			//   exclude: ['@babel/runtime', 'netlify-lambda'],
			// },
		}
	],
	[
		'umi-plugin-pro-block',
		{
			moveMock: false,
			moveService: false,
			modifyRequest: true,
			autoAddMenu: true
		}
	]
]; // 针对 preview.pro.ant.design 的 GA 统计代码

if (isAntDesignProPreview) {
	plugins.push([
		'umi-plugin-ga',
		{
			code: 'UA-72788897-6'
		}
	]);
	plugins.push([
		'umi-plugin-pro',
		{
			serverUrl: 'https://ant-design-pro.netlify.com'
		}
	]);
}

export default {
	plugins,
	block: {
		defaultGitUrl: 'https://github.com/ant-design/pro-blocks'
	},
	hash: true,
	targets: {
		ie: 11
	},
	devtool: isAntDesignProPreview ? 'source-map' : false,
	// umi routes: https://umijs.org/zh/guide/router.html
	routes: [
		{
			path: '/',
			redirect: '/indexPage'
		},
		{
			path: '/indexPage',
			component: '../layouts/IndexLayout',
			routes: [
				{ path: '/indexPage', redirect: '/indexPage/index' },
				{
					path: '/indexPage/index',
					component: './IndexPage/Index'
				},
				{
					path: '/indexPage/messageService',
					component: './IndexPage/MessageService'
				},
				{
					path: '/indexPage/videoService',
					component: './IndexPage/VideoService'
				},
				{
					path: '/indexPage/activityService',
					component: './IndexPage/ActivityService'
				},
				{
					path: '/indexPage/dataDevService',
					component: './IndexPage/DataDevService'
				}
			]
		},
		// 控制台
		{
			path: '/manageConsole',
			component: '../layouts/BasicNomenuLayout',
			routes: [
				{ path: '/manageConsole', redirect: '/manageConsole/center' },
				{
					path: '/manageConsole/center',
					name: 'message',
					icon: 'bell',
					component: './ManageConsole/Index'
				},
				{
					component: '404'
				}
			]
		},
		// 消息中心
		{
			path: '/messageCenter',
			component: '../layouts/BasicLayout',
			Routes: [ 'src/pages/Authorized' ],
			authority: [ 'admin', 'user' ],
			routes: [
				{
					path: '/messageCenter',
					name: 'messageCenter',
					icon: 'bell',
					routes: [
						{ path: '/messageCenter', redirect: '/messageCenter/station' },
						{
							path: '/messageCenter/station',
							name: 'station',
							component: './MessageCenter/Station'
						},
						{
							path: '/messageCenter/all',
							name: 'all',
							component: './MessageCenter/All'
						},
						{
							path: '/messageCenter/unread',
							name: 'unread',
							component: './MessageCenter/Unread'
						},
						{
							path: '/messageCenter/readed',
							name: 'readed',
							component: './MessageCenter/Readed'
						},
						{
							path: '/messageCenter/info',
							name: 'info',
							component: './MessageCenter/Info',
							hideInMenu: true
						}
					]
				},

				{
					component: './404'
				}
			]
		},
		{
			component: './404'
		}
	],
	// Theme for antd: https://ant.design/docs/react/customize-theme-cn
	theme: {
		'primary-color': primaryColor
	},
	define: {
		ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '' // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
	},
	ignoreMomentLocale: true,
	lessLoaderOptions: {
		javascriptEnabled: true
	},
	disableRedirectHoist: true,
	cssLoaderOptions: {
		modules: true,
		getLocalIdent: (context, _, localName) => {
			if (
				context.resourcePath.includes('node_modules') ||
				context.resourcePath.includes('ant.design.pro.less') ||
				context.resourcePath.includes('global.less')
			) {
				return localName;
			}

			const match = context.resourcePath.match(/src(.*)/);

			if (match && match[1]) {
				const antdProPath = match[1].replace('.less', '');
				const arr = slash(antdProPath)
					.split('/')
					.map((a) => a.replace(/([A-Z])/g, '-$1'))
					.map((a) => a.toLowerCase());
				return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
			}

			return localName;
		}
	},
	manifest: {
		basePath: '/'
	},
	chainWebpack: webpackPlugin,

	proxy: {
		'/apis/': {
			// 匹配所有以/apis/为开头的接口
			target: 'http://192.168.3.220:8081', // 后端服务器地址
			// target: 'localhost:8081', // 后端服务器地址
			changeOrigin: true
			// pathRewrite: { '^/apis/': '' }, // 因为我们项目的接口前面并没有api 所以直接去掉
		},
		'/tvplus/': {
			target: 'http://192.168.1.142:9090', // 后端服务器地址
			changeOrigin: true
		}
	}
};
