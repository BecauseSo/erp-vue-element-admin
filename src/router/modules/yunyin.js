import Layout from '@/layout'

const yunyinRouter = {
    path: '/yunyin',
    component: Layout,
    redirect: '/yunyin/apartoperationlist',
    name: 'operationmanage',
    meta: {
        title: '运营管理',
        icon: 'table'
    },
    children:[
        {
            path:'apartoperationlist',
            name:'ApartOperationList',
            component:()=>import('@/views/yunyin/ApartOperationList'),
            meta:{title:'部门数据统计'}
        },{
            path: 'operationlist',
            name: 'OperationList',
            component: () => import('@/views/yunyin/OperationList'),
            meta: { title: '运营数据列表' }
        }, {
            path: 'personperformance',
            name: 'PersonPerformance',
            component: () => import('@/views/yunyin/PersonPerformance'),
            meta: { title: '个人业绩' }
        }
    ]

}

export default yunyinRouter;