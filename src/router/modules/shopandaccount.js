import Layout from '@/layout'

const shopandaccountRouter = {
    path: '/shopandaccount',
        component: Layout,
            redirect: '/shopandaccount',
                name: 'ShopAndAccount',
                    meta: {
        title: '店铺与账号', icon: 'dashboard',
    },
    children: [
        {
            path: '/companymanager',
            component: () => import('@/views/shop/CompanyManager'),
            name: 'CompanyManager',
            meta: {
                title: '企业主体管理', icon: 'dashboard',
            }
        }, {
            path: '/myaccountlist',
            name: 'MyAccountList',
            component: () => import('@/views/shop/myaccount/index'),
            meta: {
                title: '我的账号', icon: 'dashboard',
            },
            children: [
                {
                    path: '/companyaccount',
                    component: () => import('@/views/shop/myaccount/company/MyCompanyAccountList'),
                    name: 'MyCompanyAccountList',
                    meta: {
                        title: '企业账号', icon: 'dashboard',
                    }
                },
                {
                    path: '/personaccount',
                    component: () => import('@/views/shop/myaccount/person/MyPersonAccountList'),
                    name: 'MyPersonAccountList',
                    meta: {
                        title: '个人账号', icon: 'dashboard',
                    }
                }
            ]
        }, {
            path: '/accountmanage',
            name: 'AccountManage',
            component: () => import('@/views/shop/account/index'),
            meta: {
                title: '账号管理', icon: 'dashboard',
            },
            children: [
                {
                    path: '/companyaccountmanage',
                    component: () => import('@/views/shop/account/company/CompanyAccountManager'),
                    name: 'CompanyAccountManage',
                    meta: {
                        title: '企业账号管理', icon: 'dashboard',
                    }
                },
                {
                    path: '/personaccountmanage',
                    component: () => import('@/views/shop/account/person/PersonAccountManager'),
                    name: 'PersonAccountManage',
                    meta: {
                        title: '个人账号管理', icon: 'dashboard',
                    }
                }
            ]
        }, {
            path: '/myshop',
            name: 'MyShop',
            component: () => import('@/views/shop/MyShopList'),
            meta: {
                title: '我的店铺', icon: 'dashboard',
            }
        }, {
            path: '/shopmanage',
            name: 'ShopManage',
            component: () => import('@/views/shop/ShopManager'),
            meta: {
                title: '店铺管理',
                icon: 'dashboard',
            }
        }
    ]
}

export default shopandaccountRouter;