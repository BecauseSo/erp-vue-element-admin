import Layout from '@/layout'
 const planRouter = {
    path:'/planmanage',
    component: Layout,
     redirect: '/planmanage/skusales',
     name: 'PlanManage',
     meta: {
         title: '计划管理',
         icon: 'table'
     },
     children:[
         {
             path: 'spusales',
             component: () => import('@/views/planmanage/SPUSalesList'),
             name: 'SPUSales',
             meta: { title: 'SPU销量明细' },
         },{
             path:'skusales',
             component: () => import('@/views/planmanage/SKUSalesList'),
             name:'SKUSales',
             meta:{ title:'SKU销量明细'},
         },{
             path:'applypurchasing',
            //  redirect: '/skusales/applypurchase',
             component: () => import('@/views/planmanage/PurchasingApply/index'),
             name:'ApplyPurchasing',
             meta:{ title:'申请备货'},
            //  children:[
            //     //  {  
            //     //      hidden:true,
            //     //      path:'applypurchase',
            //     //      component: () => import('@/views/planmanage/PurchasingApply/index'),
            //     //      name: 'ApplyPurchase',
            //     //  },
            //      {
            //          hidden: true,
            //          path: 'reviewing',
            //          component: () => import('@/views/planmanage/PurchasingApply/Reviewing'),
            //          name: 'Reviewing',
            //      },
            //      {
            //          hidden: true,
            //          path: 'reviewed',
            //          component: () => import('@/views/planmanage/PurchasingApply/Reviewed'),
            //          name: 'Reviewed',
            //      },
            //      {
            //          hidden: true,
            //          path: 'summary',
            //          component: () => import('@/views/planmanage/PurchasingApply/Summary'),
            //          name: 'Summary',
            //      },
            //      {
            //          hidden: true,
            //          path: 'rejected',
            //          component: () => import('@/views/planmanage/PurchasingApply/Rejected'),
            //          name: 'Rejected',
            //      }
            //  ]
         }
         ,{
             path:'skupurchaseapplychange',
             component: () => import('@/views/planmanage/SKUPurchaseApplyChange'),
             name:'SKUPurchaseApplyChange',
             meta:{title:'SKU备货变更申请'}
         },{
             path:'skustorelist',
             component: ()=>import('@/views/planmanage/SKUStoreList'),
             name:'SKUStoreList',
             meta:{title:'SKU库存责任明细'}
         },{
            path:'storesku',
            component:()=>import('@/views/planmanage/StoreSKU'),
            name:'StoreSKU',
            meta:{title:'库存SKU'}
         }
     ]
 }

 export default planRouter;