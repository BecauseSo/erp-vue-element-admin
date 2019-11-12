<template>
    
    <el-container v-loading="loading">
        <el-header height="60px">
            <el-row :gutter="20">
                <el-col :span="1">
                    <span>日期</span>
                </el-col>
                <el-col :span="3">
                    <el-date-picker type="fromdate" placeholder="选择日期" v-model="date" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col :span="3">
                    <el-date-picker type="todate" placeholder="选择日期" v-model="date" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-table 
                    :data="tableData"
                    height="100%"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="日期">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="底薪">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="提成">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="发放状态">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="备注">
                    </el-table-column>
            </el-table>
        </el-main>
    </el-container>

</template>

<script>

export default {
    
    data(){
        return {
            loading:false,
            fromdate:null,
            todate:null
        }
    },
    created(){
        
    },
    methods:{
        loadUserSalaryWith(params){

        }
    }


}

</script>