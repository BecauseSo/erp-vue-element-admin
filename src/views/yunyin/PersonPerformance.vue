<template>
    <el-container v-loading="loading">
        <el-header height="60px">
            <el-row :gutter="2">
                <el-col :span="4">
                    <el-date-picker type="fromdate" placeholder="选择开始日期" v-model="date" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col :span="4">
                    <el-date-picker type="todate" placeholder="选择截止日期" v-model="date" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col :span="2">
                    <el-button @click="searchBtnAction()" icon="el-icon-search" class="head-but" type="primary" ></el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-row :gutter="2" class="el-row-1">
                <el-col :span="8">
                    <span class="span-head">营业额</span>
                    <span>$536.31</span>
                    <span>$536.31</span>
                </el-col>
                <el-col :span="8">
                    <span class="span-head">毛利</span>
                    <span>$536.31</span>
                    <span>$536.31</span>
                    <em>(数据不完整)</em>
                </el-col>
                <el-col :span="8">
                    <span class="span-head">毛利率</span>
                    <span>$536.31</span>
                    <span>$536.31</span>
                    <em>(数据不完整)</em>
                </el-col>
            </el-row>
            
            <hr style=" 
                    border: none;
                    border-top: 1px solid #bdbdbd; " />

            <el-row :gutter="2" class="el-row-1">
                <el-col :span="4">
                    <span class="span-head">付款订单数</span>
                    <span>1</span>
                    <em>(数据不完整)</em>
                </el-col>
                <el-col :span="4">
                    <span class="span-head">广告费用</span>
                    <span>1</span>
                    <em>(数据不完整)</em>

                </el-col>
                <el-col :span="5">
                    <span class="span-head">销售ROI</span>
                    <span>1</span>
                    <em>(数据不完整)</em>
                </el-col>
                <el-col :span="5">
                    <span class="span-head">每单广告成本</span>
                    <span>1</span>
                    <em>(数据不完整)</em>
                </el-col>
                <el-col :span="5">
                    <span class="span-head">客单价</span>
                    <span>1</span>
                    <em>(数据不完整)</em>
                </el-col>
            </el-row>
            <el-table 
                    :data="tableData"
                    height="100%"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="日期">
                    </el-table-column>
                    <!-- <el-table-column
                        prop="apart"
                        label="部门">
                    </el-table-column>
                    <el-table-column
                        prop="team"
                        label="小组">
                    </el-table-column> -->

                    <!-- <el-table-column
                        prop="shop_user"
                        label="店铺负责人">
                    </el-table-column>
                    <el-table-column
                        prop="shop_name"
                        label="店铺名称"> -->
                    </el-table-column>
                    <el-table-column
                        prop="paied_orders"
                        sortable
                        label="付款订单数">
                    </el-table-column>
                    <el-table-column
                        prop="ad_cost"
                        sortable
                        label="广告费用">
                    </el-table-column>
                    <el-table-column
                        prop="turnover"
                        sortable
                        label="营业额">
                    </el-table-column>
                    <el-table-column
                        prop="ROI"
                        sortable
                        label="销售ROI">
                    </el-table-column>
                    <el-table-column
                        prop="unit_ad_cost"
                        sortable
                        label="每单广告成本">
                    </el-table-column>
                    <!-- <el-table-column
                        prop="unit_price"
                        sortable
                        label="客单价">
                    </el-table-column> -->
                    <el-table-column
                        prop="gross_profit"
                        sortable
                        label="毛利">
                    </el-table-column>
                    <el-table-column
                        prop="gross_profit_rate"
                        sortable
                        label="毛利率">
                    </el-table-column>
                    <!-- <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                                <el-button
                                    @click.native.prevent="uploadAdCost(scope.$index, tableData)"
                                    type="text"
                                    size="small">
                                        上传广告费用
                                </el-button>
                            </template>
                    </el-table-column> -->
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
            todate:null,
            tableData:[]
        }
    },
    created(){
        this.loadPersonPerformancePage();
    },
    methods:{
        loadPersonPerformancePage(page){
            if (page == null){
                page = 0;
            }
            let tmpData = [{
                date:'2019-11-8',
                    apart:'aa',
                    team:'aa',
                    shop_user:'yuxiao',
                    shop_name:'shop',
                    paied_orders:1,
                    ad_cost:0,
                    turnover:77.98,
                    ROI:0,
                    unit_ad_cost:0,
                    unit_price:77.89,
                    gross_profit:0,
                    gross_profit_rate:0
            }]
            this.tableData = tmpData;
        }
    }

}
</script>

<style scoped>

/* 分页样式 */
.el-pagination{
    text-align: center;
    margin-top: 10px;
}
/* 分页样式end */
.el-row-1{
    padding-bottom: 10px;
}
.el-row-1>.el-col{
    border-left:1px solid #bdbdbd;
}

.el-row-1>.el-col:first-child
{ 
    border-left:0px;
}

.el-col>span,.el-col>em{
    display: block;
    line-height: 22px;
    text-align: center;
}
.span-head{
    color: #bdbdbd;
}
.el-col>em{
    color: #ecb25c;
}
.el-row{
    padding-top: 20px;
}
</style>