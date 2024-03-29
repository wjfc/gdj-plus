import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import Authorized from '@/utils/Authorized';

const { check } = Authorized;

// Conversion router to menu.
function formatter(data, parentAuthority, parentName) {
	if (!data) {
		return undefined;
	}
	return data
		.map((item) => {
			if (!item.name || !item.path) {
				return null;
			}
			let locale = '首页';
			if (parentName && parentName !== '/') {
				locale = `${parentName}.${item.name}`;
			} else {
				locale = `首页.${item.name}`;
			}

			// console.log(locale);
			// if enableMenuLocale use item.name,
			// close menu international
			const name = item.name;

			const result = {
				...item,
				name,
				locale,
				authority: item.authority || parentAuthority
			};
			if (item.children) {
				const children = formatter(item.children, item.authority, locale);
				// Reduce memory usage
				result.children = children;
			}

			return result;
		})
		.filter((item) => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 * get SubMenu or Item
 */
const getSubMenu = (item) => {
	// doc: add hideChildrenInMenu
	if (item.children && !item.hideChildrenInMenu && item.children.some((child) => child.name)) {
		return {
			...item,
			children: filterMenuData(item.children) // eslint-disable-line
		};
	}
	return item;
};

/**
 * filter menuData
 */
const filterMenuData = (menuData) => {
	if (!menuData) {
		return [];
	}
	return menuData
		.filter((item) => item.name && !item.hideInMenu)
		.map((item) => check(item.authority, getSubMenu(item)))
		.filter((item) => item);
};
/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = (menuData) => {
	if (!menuData) {
		return {};
	}
	const routerMap = {};

	const flattenMenuData = (data) => {
		data.forEach((menuItem) => {
			if (menuItem.children) {
				flattenMenuData(menuItem.children);
			}
			// Reduce memory usage
			routerMap[menuItem.path] = menuItem;
		});
	};
	flattenMenuData(menuData);
	return routerMap;
};

const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);

export default {
	namespace: 'menu',

	state: {
		menuData: [],
		routerData: [],
		breadcrumbNameMap: {}
	},

	effects: {
		*getMenuData({ payload }, { put }) {
      const { routes, authority, path, menuData } = payload;
			// http 请求
			// const originalMenuData = memoizeOneFormatter(routes, authority, path);
			const menuData2 = filterMenuData(memoizeOneFormatter(menuData));
			const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(menuData);
			yield put({
				type: 'save',
				payload: { menuData2, breadcrumbNameMap, routerData: routes }
			});
		}
	},

	reducers: {
		save(state, action) {
			return {
				...state,
				...action.payload
			};
		}
	}
};
