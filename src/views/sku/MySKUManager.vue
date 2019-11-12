<template>
    <el-container v-loading="loading">
         <el-header>
            <!-- <el-button @click="addBtnClick()" type="text" size="small">申请新SPU</el-button> -->
            <el-button @click="addSKUBtnClick()" type="primary" round  style="margin-top: 20px;">申请新SKU</el-button>
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
                        <template slot-scope="scope" >

                            <el-image :src="scope.row.product_image"  @click="img_show(scope.row.product_image)" style="width: 120px; height: 120px" fit="contain"  ></el-image>
                            
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
                        width="220px">
                        <template slot-scope="scope">
                            <p v-for="sku_item in scope.row.sku_list">
                                {{sku_item.specification}}-{{sku_item.product_size}}cm
                            </p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        width="100px"
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


export default {
    data(){
        return {
            dialogVisible: false,
            img_src:null,
            isCreateSPU:true,
            isCreateSKU:true,
            loading:false,
            tableData:[],
            user_id:null,
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
        let userInfo = this.$store.getters.userinfo;
        if (userInfo == null){
            this.http.toLogin();
        }
        this.user_id = userInfo.id;
        this.loadAllSKU();
    },
    methods:{
        loadAllSKU(){
            let params = {
                user_id:this.user_id
            };
            let _this = this;
            this.http.post('/sku/user/all',params)
                    .then(result=>{
                        console.log(result.data);
                        _this.tableData = result.data;
                    }).catch(error=>{

                    });
        },
        addSKUBtnClick(){
            this.$router.push('/skucreate');
        },
        createCompleteWithModel(item){
            let params = {
                SPU_code: item.SPU_code,
                product_name: item.product_name,
                product_image: item.product_image,
                video_link: item.video_link,
                sales: item.sales,
                product_link: item.product_link,
                is_fake: item.is_fake,
                has_battery: item.has_battery,
                is_infringement: item.is_infringement,
                has_magnetism: item.has_magnetism,
                is_liquid: item.is_liquid,
                is_powder: item.is_powder,
                area: item.area,
                need_custom_made: item.need_custom_made,
                individual_package: item.individual_package,
                is_in_stock: item.is_in_stock,
                start_values: item.start_values,
                language: item.language,
                freight: item.freight,
                plug_type: item.plug_type,
                voltage: item.voltage,
                create_user_id: this.user_id,
                create_time: item.create_time,
                SPU_remark: item.SPU_remark,
            };
            let _this = this;
            this.$refs.createSPUView.loading('提交申请');
            this.http.post('/spu/apply/add',params)
                    .then(result=>{
                        _this.loadAllSKU();
                        _this.$message({type:'success',message:"提交申请成功"});
                        _this.$refs.createSPUView.close();
                    }).catch(error=>{
                        _this.$refs.createSPUView.closeLoading();
                        _this.$message({type:'error',message:"提交申请失败"});
                    }) 
        },
        handleTableClick(item){
            this.isCreateSKU = false;
            this.$router.push(
                {
                    name:'SKUCreate',
                    params:{
                        model:item
                    }
                });
        },
        img_show(imgsrc){ //弹窗中打开图片

            console.log(imgsrc);

            this.dialogVisible = true;
            
            this.img_src = imgsrc;
        },
        open_imgs(){ //新窗口打开图片
            window.open(this.img_src, '_blank', 'toolbar=yes, width=900, height=700')
        }
    }

}
</script>