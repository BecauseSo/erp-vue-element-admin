<template>
    <el-container v-loading="loading">
        <el-header>
            <el-row :gutter="1">
                <el-col :span="4">
                    <el-date-picker type="fromdate" placeholder="选择开始日期" v-model="date" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col :span="4">
                    <el-date-picker type="todate" placeholder="选择截止日期" v-model="date" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col :span="5">
                    <el-select v-model="apartValue" filterable placeholder="请选择部门" style="width:100%">
                        <el-option
                            v-for="item in apartOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                </el-col>
                <el-col :span="5">
                    <el-select v-model="platValue" placeholder="请选择平台" style="width:100%">
                        <el-option
                            v-for="item in platOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            <span style="float: left">{{ item.label }}</span>
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="2">
                    <el-button @click="searchBtnAction()" icon="el-icon-search" class="head-but" type="primary"  ></el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-row :gutter="5" class="el-row-1">
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
            <el-row  :gutter="5" class="el-row-1">
                <el-col :span="5">
                    <span class="span-head">付款订单数</span>
                    <span>1</span>
                    <em>(数据不完整)</em>
                </el-col>
                <el-col :span="5">
                    <span class="span-head">广告费用</span>
                    <span>1</span>
                    <em>(数据不完整)</em>
                </el-col>
                <el-col :span="4">
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
                        prop="name"
                        label="名称">
                    </el-table-column>
                    <el-table-column
                        prop="turnover"
                        label="营业额">
                    </el-table-column><el-table-column
                        prop="gross_profit"
                        label="毛利">
                    </el-table-column>
                    <el-table-column
                        prop="gross_profit_rate"
                        label="毛利率">
                    </el-table-column>
                    <el-table-column
                        prop="paid_orders"
                        label="付款订单数">
                    </el-table-column><el-table-column
                        prop="ad_cost"
                        label="广告费用">
                    </el-table-column>
                    <el-table-column
                        prop="ROI"
                        label="销售ROI">
                    </el-table-column>
                    <el-table-column
                        prop="unit_ad_cost"
                        label="每单广告成本">
                    </el-table-column><el-table-column
                        prop="unit_price"
                        label="客单价">
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
            todate:null,
            apartValue:'',
            platValue:'',
            apartOptions:[
                {
                    label:'部门1',
                    value:'apart1'
                },
                {
                    label:'部门2',
                    value:'apart2'
                },{
                    label:'部门3',
                    value:'apart3'
                },{
                    label:'部门4',
                    value:'apart4'
                }
            ],
            platOption:[
                {
                    label:'aa',
                    name:'oooo'
                }
            ],
            tableData:[]
        }
    },
    created(){
        this.loadApartYunyinDataWithPage();
    },
    methods:{
        loadApartYunyinDataWithPage(page){
            if (page == null){
                page = 0;
            }
            let tmpData = [
                {
                    name:'aaa',
                    turnover:888,
                    gross_profit:0,
                    gross_profit_rate:0,
                    paid_orders:1,
                    ad_cost:0,
                    ROI:0,
                    unit_ad_cost:0,
                    unit_price:0,
                }
            ]
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