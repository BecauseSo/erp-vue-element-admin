import Layout from '@/layout'

const systemRouter = {
    path: '/system',
    component: Layout,
    redirect: '/system/apartmentmanage',
    name: 'System',
    meta: {
        title: '人事管理',
        icon: 'table'
    },
    children: [
        {
            path: 'apartmentmanage',
            component: () => import('@/views/system/SystemManager'),
            name: 'Apartment',
            meta: { title: '组织架构管理' }
        },
        {
            path: 'usermanage',
            component: () => import('@/views/system/UserManager'),
            name: 'UserManager',
            meta: { title: '人员管理' }
        },
        {
            path: 'rolesmanage',
            component: () => import('@/views/system/RolesManager'),
            name: 'RolesManage',
            meta: { title: '角色管理' }
        }
    ]
}
export default systemRouter