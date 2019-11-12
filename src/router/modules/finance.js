import Layout from '@/layout'

const financeRouter = {
    path: '/financemanage',
    component: Layout,
    redirect: '/financemanage/mysalary',
    name: 'FinanceManage',
    meta: {
        title: '财务管理',
        icon: 'table'
    },
    children: [
        {
            path:'mysalary',
            name:'MySalary',
            component: () => import('@/views/finance/MySalary'),
            meta:{
                title:'我的薪资单'
            }
        },{
            path: 'salarymanage',
            name: 'SalaryManage',
            component: () => import('@/views/finance/SalaryManage'),
            meta: {
                title: '薪资管理设置'
            }
        }, {
            path: 'staffsalary',
            name: 'StaffSalary',
            component: () => import('@/views/finance/StaffSalary'),
            meta: {
                title: '薪资管理设置'
            }
        }
    ]
}

export default financeRouter;