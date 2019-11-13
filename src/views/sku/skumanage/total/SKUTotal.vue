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
                            <el-image :src="scope.row.product_image" @click="img_show(scope.row.product_image)" style="width: 120px; height: 120px" fit="contain"></el-image>
                        <!-- <el-image src="http://39.99.140.176:8112/spu/product/image/1573032745312.png"  @click="img_show('http://39.99.140.176:8112/spu/product/image/1573032745312.png')" style="width: 120px; height: 120px" fit="contain" ></el-image> -->

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
                        width="165px">
                        <template slot-scope="scope">
                            <p v-for="sku_item in scope.row.sku_list">
                                {{sku_item.specification}}-{{sku_item.product_size}}cm
                            </p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        width="90px"
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
                        width="130px"
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
                        width="200px"
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

            <!-- 弹框 -->
            <el-dialog
            title="查看产品图片"
            :visible.sync="dialogVisible"
            width="60%">
            <el-image :src="img_src" fit="contain" ></el-image>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="open_imgs" >新窗口查看图片</el-button>
            </span>
            </el-dialog>
            <!-- 弹框end -->

        </el-main>
    </el-container>
</template>

<script>

// import ManagerSKUModify from '@/components/ManagerSKUModify.vue'
// import ManagerSPUModify from '@/components/ManagerSPUModify.vue'

export default {
    data(){
        return {
            dialogVisible: false,
            img_src:null,
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
        // "managerskumodofy":ManagerSKUModify,
        // "managerspumodify":ManagerSPUModify
    },
    created(){
        this.loadAllSKU();
    },
    methods:{
        loadAllSKU(){
            let _this = this;
            this.http.post('/sku/manager/all')
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
        // modifyComplete(item){
        //     console.log(item);
        //     let params = {
        //         SPU_apply_id: item.SPU_apply_id,
        //         SPU_id: item.SPU_id,
        //         SPU_code: item.SPU_code,
        //         product_name: item.product_name,
        //         product_image: item.product_image,
        //         video_link: item.video_link,
        //         sales: item.sales,
        //         product_link: item.product_link,
        //         is_fake: item.is_fake,
        //         has_battery: item.has_battery,
        //         is_infringement: item.is_infringement,
        //         has_magnetism: item.has_magnetism,
        //         is_liquid: item.is_liquid,
        //         is_powder: item.is_powder,
        //         area: item.area,
        //         need_custom_made: item.need_custom_made,
        //         individual_package: item.individual_package,
        //         is_in_stock: item.is_in_stock,
        //         start_values: item.start_values,
        //         language: item.language,
        //         freight: item.freight,
        //         plug_type: item.plug_type,
        //         voltage: item.voltage,
        //         create_user_id: this.user_id,
        //         create_time: item.create_time,
        //         SPU_remark: item.SPU_remark
        //     };
        //     let _this = this;
        //     this.$refs.createSPUView.loading('修改申请');
        //     this.http.post('/spu/apply/manager/modify',params)
        //             .then(result=>{
        //                 _this.loadAllSKU();
        //                 _this.$message({type:'success',message:"修改申请成功"});
        //                 _this.$refs.createSPUView.close();
        //             }).catch(error=>{
        //                 _this.$refs.createSPUView.closeLoading();
        //                 _this.$message({type:'error',message:"修改申请失败"});
        //             }) 
        // },
        // skumodifyComplete(item){
        //     let params = {
        //         SKU_id:item.SKU_id,
        //         SKU_apply_status:item.SKU_apply_status,
        //         SKU_apply_id:item.SKU_apply_id,
        //         SPU_id:item.spu_id,
        //         SPU_apply_id:item.spu_apply_id,
        //         SKU_code: item.SKU_code,
        //         specification: item.specification,
        //         image: item.image,
        //         buy_price: item.buy_price,
        //         product_size:item.product_size,
        //         weight: item.weight,
        //         purchasing_cycle: item.purchasing_cycle,
        //         sensitive_information: item.sensitive_information,
        //         SKU_remark: item.SKU_remark,
        //     }
        //     this.$refs.createSKUView.loading('修改申请');
        //     let _this = this;
        //     this.http.post('/sku/apply/manager/modify',params)
        //             .then(result=>{
        //                 _this.$refs.createSKUView.close();
        //                 _this.$message({type:'success',message:"修改申请成功"});
        //                 _this.loadAllSKU();
        //             }).catch(error=>{
        //                 _this.$refs.createSKUView.closeLoading();
        //                 _this.$message({type:'error',message:"修改申请失败"});
        //             });
        // }
        img_show(imgsrc){ //弹窗中打开图片

            this.dialogVisible = true;
            
            this.img_src = imgsrc;
        },
        open_imgs(){ //新窗口打开图片
            window.open(this.img_src, '_blank', 'toolbar=yes, width=900, height=700')
        }
    }

}
</script>