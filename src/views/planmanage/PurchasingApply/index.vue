<template>
    <div height="100%">
        <el-tabs v-model="activeName" >
            <el-tab-pane :label="menu[0].name" :name="menu[0].id">
                <reviewing v-if="activeName==menu[0].id" />
            </el-tab-pane>
            <el-tab-pane :label="menu[1].name" :name="menu[1].id">
                <reviewed v-if="activeName==menu[1].id" />
            </el-tab-pane>
            <el-tab-pane :label="menu[2].name" :name="menu[2].id">
                <rejected v-if="activeName==menu[2].id" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>

import Reviewing from './component/Reviewing'
import Reviewed from './component/Reviewed'
import Summary from './component/Summary'
import Rejected from './component/Rejected'

export default {
    components:{
        'reviewing':Reviewing,
        'reviewed':Reviewed,
        'yx-summary':Summary,
        'rejected':Rejected
    },
    data(){
        return{
            loading:false,
            activeName:'0',
            menu:[
                {
                    id:'0',
                    name:'待审核',
                    componentName: 'Reviewing'
                },
                {
                    id:'1',
                    name: '已审核',
                    componentName: 'Reviewed'
                },
                {
                    id:'3',
                    name: '已驳回',
                    componentName: 'Rejected'
                },
            ]
        }
    },
    created(){

    },
    methods:{
        handleSelect(){

        }
    }
}
</script>
