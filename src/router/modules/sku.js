import Layout from '@/layout'

const skuRouter = {
    path: '/sku',
    component: Layout,
    redirect: '/sku/mysku',
    name: 'SKU',
    meta: {
        title: 'SKU',
        icon: 'table'
    },
    children: [
        {
            path: 'mysku',
            component: () => import('@/views/sku/MySKUManager'),
            name: 'MySKUManager',
            meta: { title: '我的SKU' },
        },
        {
            path: '/skucreate',
            name:'SKUCreate',
            component: () => import('@/views/sku/SKUCreate'),
        },{
            path: '/skumanagermodify',
            name: 'SKUManagerModify',
            component: () => import('@/views/sku/SKUManagerModify'),
        },
        {
            path: 'skumanage',
            component: () => import('@/views/sku/skumanage/index'),
            name: 'SKUManage',
            meta: { title: 'SKU管理' },
            children:[
                {
                    path:'total',
                    component:()=>import('@/views/sku/skumanage/total/SKUTotal'),
                    name:'SKUTotal',
                    meta:{
                        title:'SKU总表'
                    }
                },{
                    path: 'apply',
                    component: () => import('@/views/sku/skumanage/apply/SKUApplyList'),
                    name: 'SKUApplyList',
                    meta: {
                        title: '运营申请表'
                    } 
                }
            ]
        }
    ]
}

export default skuRouter;