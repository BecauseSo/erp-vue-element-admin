<template>
    <el-container v-loading="loading">
        <el-header height="100px;">
            <el-row :gutter="2">
                <el-col :span="3">
                    <el-select v-model="apartValue" filterable placeholder="请选择部门">
                        <el-option
                            v-for="item in apartOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="userValue" placeholder="请选择店铺负责人">
                        <el-option
                            v-for="item in users"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            <span style="float: left">{{ item.label }}</span>
                            </el-option>
                        </el-select>
                </el-col>
                <el-col :span="3">
                    <el-select v-model="platValue" placeholder="请选择平台">
                        <el-option
                            v-for="item in platOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            <span style="float: left">{{ item.label }}</span>
                            </el-option>
                        </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="isNeedUploadAdCostValue" placeholder="是否上传广告费">
                    <el-option
                        v-for="item in isNeedUploadAdCostOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        <span style="float: left">{{ item.label }}</span>
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row :gutter="2">
                <el-col :span="3">
                    <el-input v-model="inputKeyWord" placeholder="请输入店铺名称"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-date-picker type="date" placeholder="选择创建日期" v-model="date" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col :span="2">
                    <el-button @click="searchBtnAction()" icon="el-icon-search"  type="primary" >搜索</el-button>
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
                        width="100px"
                        label="日期">
                    </el-table-column>
                    <el-table-column
                        prop="apart"
                        label="部门">
                    </el-table-column>
                    <el-table-column
                        prop="team"
                        label="小组">
                    </el-table-column>

                    <el-table-column
                        prop="shop_user"
                        width="120px"
                        label="店铺负责人">
                    </el-table-column>
                    <el-table-column
                        prop="shop_name"
                        label="店铺名称">
                    </el-table-column>
                    <el-table-column
                        prop="paied_orders"
                        width="120px"
                        sortable
                        label="付款订单数">
                    </el-table-column>
                    <el-table-column
                        prop="ad_cost"
                        width="120px"
                        sortable
                        label="广告费用">
                    </el-table-column>
                    <el-table-column
                        prop="turnover"
                        width="120px"
                        sortable
                        label="营业额">
                    </el-table-column>
                    <el-table-column
                        prop="ROI"
                        width="120px"
                        sortable
                        label="销售ROI">
                    </el-table-column>
                    <el-table-column
                        prop="unit_ad_cost"
                        width="150px"
                        sortable
                        label="每单广告成本">
                    </el-table-column>
                    <el-table-column
                        prop="unit_price"
                        width="120px"
                        sortable
                        label="客单价">
                    </el-table-column>
                    <el-table-column
                        prop="gross_profit"
                        sortable
                        label="毛利">
                    </el-table-column>
                    <el-table-column
                        prop="gross_profit_rate"
                        width="120px"
                        sortable
                        label="毛利率">
                    </el-table-column>
                    <el-table-column
                        width="150px"
                        label="操作">
                        <template slot-scope="scope">
                                <el-button
                                    @click.native.prevent="uploadAdCost(scope.$index, tableData)"
                                    type="text"
                                    size="small">
                                        上传广告费用
                                </el-button>
                            </template>
                    </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script>
export default {
    data(){
        return {
            inputKeyWord:'',
            loading:false,
            date:null,
            tableData:[],
            apartValue:'',
            userValue:'',
            platValue:'',
            isNeedUploadAdCostValue:'',
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
            users:[
                {
                   label:'aaaa',
                   value:'aaaa', 
                },
                 {
                   label:'aaaa',
                   value:'aaaaa', 
                }, {
                   label:'aaaa',
                   value:'aaaaaa', 
                }, {
                   label:'aaaa',
                   value:'aaaaaaa', 
                }
            ],

            platOption:[
                {
                    label:'aa',
                    name:'oooo'
                }
            ],
            
            isNeedUploadAdCostOption:[
                {
                    label:'是',
                    value:true
                },{
                    label:'否',
                    value:false
                }
            ]
        }
    },
    created(){
        this.loadDateWithPage(0);
    },
    methods:{
        loadDateWithPage(page){
            if (page == null){
                page = 0;
            }
            let tmpData = [
                {
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
                }
            ]
            this.tableData = tmpData;
        },
        searchBtnAction(){

        },
        uploadAdCost(){

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
.el-row{
    padding: 10px 0;
}
</style>