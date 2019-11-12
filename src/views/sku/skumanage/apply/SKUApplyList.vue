<template>
    <el-container v-loading="loading">
         <el-header>
        </el-header>
        <el-main>
            <el-container>
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                        label="产品图片"
                        width="150px">
                        <template slot-scope="scope">
                            <el-image :src="scope.row.product_image" style="width: 120px; height: 120px" fit="contain"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="product_name"
                        label="产品名称">
                    </el-table-column>
                    <el-table-column
                        label="SKU">
                        <template slot-scope="scope">
                            <p v-for="sku_item in scope.row.sku_list">
                                {{sku_item.SKU_code}}
                            </p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="规格"
                        width="220px">
                        <template slot-scope="scope">
                            <p v-for="sku_item in scope.row.sku_list">
                                {{sku_item.specification}}-{{sku_item.product_size}}cm
                            </p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="采购价(元)">
                        <template slot-scope="scope">
                            <p v-for="sku_item in scope.row.sku_list">
                                {{sku_item.buy_price}}
                            </p>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column
                        label="产品包装尺寸">
                        <template slot-scope="scope">
                            <p v-for="sku_item in scope.row.sku_list">
                                {{sku_item.product_size}}
                            </p>
                        </template>
                    </el-table-column> -->
                    <el-table-column
                        label="含包装的重量(克)">
                        <template slot-scope="scope">
                            <p v-for="sku_item in scope.row.sku_list">
                                {{sku_item.weight}}
                            </p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="采购周期">
                        <template slot-scope="scope">
                            <p v-for="sku_item in scope.row.sku_list">
                                {{sku_item.purchasing_cycle}}
                            </p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="敏感信息">
                        <template slot-scope="scope">
                            <p v-for="sku_item in scope.row.sku_list">
                                {{sku_item.sensitive_information}}
                            </p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="start_values"
                        label="起批量">
                    </el-table-column>
                    <el-table-column
                        label="货源地址">
                        <template slot-scope="scope">
                            <a :href="scope.row.product_link">{{scope.row.product_link}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="create_time"
                        label="创建时间">
                    </el-table-column>
                    <el-table-column
                        label="申请状态">
                        <template slot-scope="scope">
                            <span>{{apply_status[scope.row.apply_status]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="SPU_remark"
                        label="备注">
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleTableClick(scope.row)" type="text" size="small">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-container>
        </el-main>
    </el-container>
</template>

<script>

import ManagerSKUModify from '@/components/ManagerSKUModify.vue'
import ManagerSPUModify from '@/components/ManagerSPUModify.vue'
export default {
    data(){
        return {
            loading:false,
            tableData:[],
            boolOption:[
                "否",
                "是"
            ],
            apply_status:[
                "申请成功",
                "申请中",
                "驳回"
            ]
        };
    },
    components:{
    },
    created(){
        this.loadAllSKU();
    },
    methods:{
        loadAllSKU(){
            let _this = this;
            this.http.post('/sku/manager/allapply')
                    .then(result=>{
                        console.log(result.data);
                        _this.tableData = result.data;
                    }).catch(error=>{
                        _this.$message({type:'error',message:"获取数据失败"});
                    });
        },
        handleTableClick(item){
            this.isCreateSKU = false;
            this.$router.push(
                {
                    name:'SKUManagerModify',
                    params:{
                        model:item
                    }
                });

        },
        handleTableDeleteSKUClick(item){
            let id = item.id;
            let _this = this;
            this.http.post('/sku/total/delete',{id:id})
                    .then(result=>{
                        _this.loadAllSKU();
                    }).catch(error=>{

                    });
        },
    }

}
</script>