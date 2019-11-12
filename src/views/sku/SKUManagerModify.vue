<template>
    <el-container>
    <el-header>
            <skucreatedig
                ref="createSKUView"
                v-bind:isCreate="isCreateSKU"
                v-on:addBtnClick="skucreateCompleteWithModel"
                v-on:modifyBtnClick="skumodifyComplete">
            </skucreatedig>
    </el-header>
    <el-main>
    <el-container>
        <el-row>
            <el-col>
                <el-row>
                    <el-col>
                        基本信息
                    </el-col>
                        <el-form label-width="130px" v-model="modifyModel" :inline="true">
                           <el-form-item label="SPU编码">
                                <el-input v-model="modifyModel.SPU_code"></el-input>
                            </el-form-item>
                            <el-form-item label="产品名">
                                <el-input v-model="modifyModel.product_name"></el-input>
                            </el-form-item>
                            <el-form-item label="是否原创">
                                <el-select v-model="modifyModel.is_fake" placeholder="请选择">
                                    <el-option
                                        v-for="item in boolOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                             <el-form-item label="投放区域">
                                <el-input v-model="modifyModel.area"></el-input>
                            </el-form-item>
                            <el-form-item label="产品图片">
                                <el-col>
                                    <el-image :src="product_image" style="width: 80px; height: 80px" fit="contain"></el-image>
                                </el-col>
                                <el-col>
                                    <input type="file" @change="displayImage" ref="imageInput">
                                </el-col>
                            </el-form-item>
                            <el-form-item label="货源地址">
                                <el-input v-model="modifyModel.product_link"></el-input>
                            </el-form-item>
                            <el-form-item label="对标/视频链接">
                                <el-input v-model="modifyModel.video_link"></el-input>
                            </el-form-item>
                            <el-form-item label="创建时间">
                                <el-input v-model="modifyModel.create_time"></el-input>
                            </el-form-item>
                            <el-form-item label="状态">
                                <el-select v-model="modifyModel.apply_status" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                </el-row>
            </el-col>
            <el-col>
                <span>规格信息</span>
                <el-button type="primary" @click="addSKUAction() ">添加规格</el-button>
                <el-table 
                    :data="tableData"
                    border
                    style="width: 100%">
                        <el-table-column
                            prop="specification"
                            label="产品颜色规格">
                        </el-table-column>
                        <el-table-column
                            label="图片">
                            <template slot-scope="scope">
                                <el-image :src="scope.row.image" style="width: 60px; height: 60px" fit="contain">
                                    <div slot="error" class="image-slot">
                                        <i class="el-icon-picture-outline"></i>
                                    </div>
                                </el-image>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="buy_price"
                            label="采购价格(元)">
                        </el-table-column>
                        <el-table-column
                            prop="product_size"
                            label="包装尺寸(cm)">
                        </el-table-column>
                        <el-table-column
                            prop="weight"
                            label="包装重量(克)">
                        </el-table-column>
                        <el-table-column
                            prop="purchasing_cycle"
                            label="采购周期">
                        </el-table-column>
                        <el-table-column
                            prop="sensitive_information"
                            label="敏感信息">
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="100px">
                            <template slot-scope="scope">
                                <el-button
                                    @click.native.prevent="modifySKURoleWithRow(scope.$index, tableData)"
                                    type="text"
                                    size="small">
                                        修改
                                </el-button>
                                <el-button
                                    @click.native.prevent="deleteSKURoleWithRow(scope.$index, tableData)"
                                    type="text"
                                    size="small">
                                        移除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
            </el-col>
            <el-col>
                <span>采购信息</span>
                <el-form label-width="130px" v-model="modifyModel" :inline="true">
                            <el-form-item label="是否带电池">
                                <el-select v-model="modifyModel.has_battery" placeholder="请选择">
                                    <el-option
                                        v-for="item in boolOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="是否有侵权风险">
                                <el-select v-model="modifyModel.is_infringement" placeholder="请选择">
                                    <el-option
                                        v-for="item in boolOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="是否带磁">
                                <el-select v-model="modifyModel.has_magnetism" placeholder="请选择">
                                    <el-option
                                        v-for="item in boolOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="是否液体">
                                <el-select v-model="modifyModel.is_liquid" placeholder="请选择">
                                    <el-option
                                        v-for="item in boolOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="是否粉末">
                                <el-select v-model="modifyModel.is_powder" placeholder="请选择">
                                    <el-option
                                        v-for="item in boolOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="是否需要定制">
                                <el-select v-model="modifyModel.need_custom_made" placeholder="请选择">
                                    <el-option
                                        v-for="item in boolOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="有无独立包装">
                                <el-select v-model="modifyModel.individual_package" placeholder="请选择">
                                    <el-option
                                        v-for="item in boolOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="是否有货">
                                <el-select v-model="modifyModel.is_in_stock" placeholder="请选择">
                                    <el-option
                                        v-for="item in boolOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="插头类型">
                                <el-input v-model="modifyModel.plug_type"></el-input>
                            </el-form-item>
                            <el-form-item label="电压">
                                <el-input v-model="modifyModel.voltage"></el-input>
                            </el-form-item>
                            <el-form-item label="支持语言">
                                <el-input v-model="modifyModel.language"></el-input>
                            </el-form-item>
                            <el-form-item label="运费">
                                <el-input v-model="modifyModel.freight"></el-input>
                            </el-form-item>
                            <el-form-item label="起批量">
                                <el-input v-model="modifyModel.start_values"></el-input>
                            </el-form-item>
                </el-form>
            </el-col>
            <el-col>
                <span>备注</span>
                <el-form label-width="130px" v-model="modifyModel" :inline="true">
                    <el-form-item label="">
                        <el-input type="textarea" v-model="modifyModel.SPU_remark"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col>
                <el-button @click="cancelBtnAction()">取 消</el-button>
                <el-button type="primary" @click="modifySPUConfirmBtnAction() " >修 改</el-button>
            </el-col>
        </el-row>
    </el-container>
    </el-main>
    </el-container>
</template>

<script>

import SKUCreateDig from '@/components/SKUCreate.vue'

export default {
    
    components:{
        "skucreatedig":SKUCreateDig
    },
    data(){
        return{
            isCreate:true,
            tableData:[],
            modifyModel:{
                SPU_code:'',
            },
            originModel:null,
            boolOption:[
                {
                    value:0,
                    label:"否"
                },{
                    value:1,
                    label:"是"
                }
            ],
            statusOption:[
                {
                    value:0,
                    label:"申请成功"
                },{
                    value:1,
                    label:"审核中"
                },{
                    value:2,
                    label:"驳回"
                }
            ],
            isCreateSKU:true,
            product_image:''
        }
    },
    props:{
        
    },
    created(){
        this.originModel = this.$route.params.model;
        if (this.originModel == null){
            this.isCreate = true
            return;
        }else{
            this.isCreate = false;
        }
        let sku_list = []
        this.originModel.sku_list.forEach(element => {
            sku_list.push(element);
        });
        this.tableData = sku_list;
        this.product_image = this.originModel.product_image;
        this.modifyModel = {
            SPU_code:this.originModel.SPU_code,
            SPU_remark: this.originModel.SPU_remark,
            SPU_total_id: this.originModel.SPU_total_id,
            apply_status: this.originModel.apply_status,
            apply_time: this.originModel.apply_time,
            apply_user_id: this.originModel.apply_user_id,
            area: this.originModel.area,
            create_time: this.originModel.create_time,
            create_user_id: this.originModel.create_user_id,
            freight: this.originModel.freight,
            has_battery: this.originModel.has_battery,
            has_magnetism: this.originModel.has_magnetism,
            id: this.originModel.id,
            idSPUApply: this.originModel.idSPUApply,
            individual_package: this.originModel.individual_package,
            is_fake: this.originModel.is_fake,
            is_in_stock: this.originModel.is_in_stock,
            is_infringement: this.originModel.is_infringement,
            is_liquid: this.originModel.is_liquid,
            is_powder: this.originModel.is_powder,
            language: this.originModel.language,
            need_custom_made: this.originModel.need_custom_made,
            plug_type: this.originModel.plug_type,
            product_image: this.originModel.product_image,
            product_link: this.originModel.product_link,
            product_name: this.originModel.product_name,
            sales: this.originModel.sales,
            start_values: this.originModel.start_values,
            video_link: this.originModel.video_link,
            voltage: this.originModel.voltage,
        }
    },
    mounted:function(){
    },
    methods:{
        displayImage(){
            const file = this.$refs.imageInput.files[0]
            this.imageFile= file;
            const fr = new FileReader()
            let _this = this
            fr.onload = (e) => {
                _this.product_image = e.target.result
            }
            fr.readAsDataURL(file)
        },
        addSKUAction(){
            this.isCreateSKU = true;
            let m = {};
            this.$refs.createSKUView.show("添加SKU申请",m);
        },
        loadAllSKU(){
            if (this.originModel == null){
                return;
            }
            let params = {
                spu_id:this.originModel.id
            };
            let _this = this;
            this.http.post('/spu/sku/all',params)
                    .then(result=>{
                        console.log(result.data);
                        _this.tableData = result.data;
                    }).catch(error=>{

                    });
        },
        skucreateCompleteWithModel(item){
            if (this.originModel == null){
                this.tableData.push(item);
                this.$refs.createSKUView.close();
                return;
            }
            //upload to server
            let params = {
                    SPU_id:this.originModel.id,
                    SPU_apply_id:this.originModel.idSPUApply,
                    SKU_code: item.SKU_code,
                    specification: item.specification,
                    image: item.image,
                    buy_price: item.buy_price,
                    product_size:item.product_size,
                    weight: item.weight,
                    purchasing_cycle: item.purchasing_cycle,
                    sensitive_information: item.sensitive_information,
                    SKU_remark: item.SKU_remark,
            }
            let _this = this;
            this.http.post('/sku/apply/add',params)
                    .then(result=>{
                        _this.$refs.createSKUView.close();
                        _this.$message({type:'success',message:"提交申请成功"});
                        _this.loadAllSKU();
                    }).catch(error=>{
                        _this.$refs.createSKUView.closeLoading();
                        _this.$message({type:'error',message:"提交申请失败"});
                    });
        },
        skumodifyComplete(item){
            //if originmodel not null upload
            if (this.originModel == null){
                this.$refs.createSKUView.close();
                return;
            }
            //upload to server
            let params = {
                SKU_id:item.id,
                SKU_apply_id:item.idSKUApply,
                SPU_id:this.originModel.id,
                SPU_apply_id:this.originModel.idSPUApply,
                SKU_code: item.SKU_code,
                specification: item.specification,
                image: item.image,
                buy_price: item.buy_price,
                product_size:item.product_size,
                weight: item.weight,
                purchasing_cycle: item.purchasing_cycle,
                sensitive_information: item.sensitive_information,
                SKU_remark: item.SKU_remark,
            }
            let _this = this;
            this.http.post('/sku/apply/manager/modify',params)
                    .then(result=>{
                        _this.$refs.createSKUView.close();
                        _this.$message({type:'success',message:"修改申请成功"});
                        _this.loadAllSKU();
                    }).catch(error=>{
                        _this.$refs.createSKUView.closeLoading();
                        _this.$message({type:'error',message:"修改申请失败"});
                    });
        },
        modifySKURoleWithRow(index,data){
            this.isCreateSKU = false;
            let item = data[index];
            this.$refs.createSKUView.show("修改SKU申请",item);
        },
        deleteSKURoleWithRow(index,data){
            let _this = this;
            this.$confirm('确认删除？')
                .then(_ => {
                    let item = data[index];
                    let params = {id:item.id};
                    _this.http.post('/sku/total/delete',params)
                            .then(result=>{
                                _this.$message({type:'success',message:"删除成功"});
                                _this.loadAllSKU();
                            }).catch(error=>{
                                _this.$message({type:'error',message:"删除失败"});
                            });
                }).catch(_ => {});
        },
        modifySPUConfirmBtnAction(){
            if (this.modifyModel.SPU_code == this.originModel.SPU_code &&
                this.modifyModel.SPU_remark == this.originModel.SPU_remark &&
                this.modifyModel.area == this.originModel.area &&
                this.modifyModel.freight == this.originModel.freight &&
                this.modifyModel.has_battery == this.originModel.has_battery &&
                this.modifyModel.has_magnetism == this.originModel.has_magnetism &&
                this.modifyModel.individual_package == this.originModel.individual_package &&
                this.modifyModel.is_fake == this.originModel.is_fake &&
                this.modifyModel.is_in_stock == this.originModel.is_in_stock &&
                this.modifyModel.is_infringement == this.originModel.is_infringement &&
                this.modifyModel.is_liquid == this.originModel.is_liquid &&
                this.modifyModel.is_powder == this.originModel.is_powder &&
                this.modifyModel.language == this.originModel.language &&
                this.modifyModel.need_custom_made == this.originModel.need_custom_made &&
                this.modifyModel.plug_type == this.originModel.plug_type &&
                this.modifyModel.product_image == this.originModel.product_image &&
                this.modifyModel.product_link == this.originModel.product_link &&
                this.modifyModel.product_name == this.originModel.product_name &&
                this.modifyModel.sales == this.originModel.sales &&
                this.modifyModel.start_values == this.originModel.start_values &&
                this.modifyModel.video_link == this.originModel.video_link &&
                this.modifyModel.voltage == this.originModel.voltage && 
                this.modifyModel.apply_status == this.originModel.apply_status && this.imageFile == null){
                this.$router.push('/sku/skumanage/total');
                return;
            }

            if (this.imageFile == null){
                this.updateSPU();
                return;
            }
            this.http.uploadFile('/sku/product/image/upload',this.imageFile)
                .then(result=>{
                    this.imageFile = null;
                    let url = result.data.url;
                    this.modifyModel.product_image = url;
                    this.updateSPU();
                }).catch(error=>{
                    console.log(error);
                    this.$message({type:'error',message:"上传图片失败"});
                });
            
        },
        updateSPU(){
            let item = this.modifyModel;
            let params = {
                SPU_apply_id:item.idSPUApply,
                apply_status:item.apply_status,
                SPU_id:item.id,
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
                SPU_remark: item.SPU_remark,
            };
            let _this = this;
            this.http.post('/spu/apply/manager/modify',params)
                    .then(result=>{
                        _this.$message({type:'success',message:"提交申请成功"});
                        this.$router.push('/sku/skumanage/total');
                    }).catch(error=>{
                        _this.$message({type:'error',message:"提交申请失败"});
                    }) 
        },
        cancelBtnAction(){
            this.$router.push('/sku/skumanage/total');
        }
    }

}
</script>