<template>
    <el-container v-loading="loading">
        <el-header>
        </el-header>
        <el-main>
            <el-container>
                <el-table
                    :data="tableData"
                    height="100%"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="id"
                        label="SKU">
                    </el-table-column>
                    <el-table-column
                        prop="company_account_id"
                        label="图片">
                    </el-table-column>
                    <el-table-column
                        prop="shop_id"
                        label="SKU名称">
                    </el-table-column>
                    <el-table-column
                        prop="company_id"
                        label="采购周期">
                    </el-table-column>
                    <el-table-column
                        prop="isunlock"
                        label="前一天销量">
                    </el-table-column>
                    <el-table-column
                        prop="user_id"
                        label="七天销量">
                    </el-table-column>
                    <el-table-column
                        prop="companyaccount_remark"
                        label="当前周期备货量">
                    </el-table-column>
                </el-table>
            </el-container>
        </el-main>
    </el-container>


</template>

<script>
export default {
    data(){
        return {
            tableData:[],
            currentPage:0,
        };
    },
    created:{

    },
    methods:{
        loadSKUSalesWithPage(page){
            if (page == null){
                page = 0;
            }
            this.http.post('')
        }
    }
}
</script>