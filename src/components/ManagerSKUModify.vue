<template>
<el-container height="0">
        <el-dialog  :close-on-press-escape=false
                        v-loading="addSKULoading"
                        :element-loading-text="loadingText"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        :title="title"
                        :visible.sync="viewVisible" center :append-to-body='true' :lock-scroll="false" width="60%" :close-on-click-modal='false'>
            <section>
                    <el-container>
                        <el-form label-width="130px" v-model="modifyModel" :inline="true">
                           <el-form-item label="SPU ID">
                               <el-autocomplete
                                    v-model="spu_id"
                                    :fetch-suggestions="querySPUSearchAsync"
                                    placeholder="输入SKU码或产品名搜索"
                                    @select="handleSelectSPU">
                                    <template slot-scope="{ item }">
                                        <div class="name">{{ item.product_name }}</div>
                                        <span class="addr">{{ item.idSPUApply }}</span>
                                    </template>    
                                </el-autocomplete>
                            </el-form-item>
                            <el-form-item label="SKU编码">
                                <el-input v-model="modifyModel.SKU_code"></el-input>
                            </el-form-item>
                            <el-form-item label="颜色/规格">
                                <el-input v-model="modifyModel.specification"></el-input>
                            </el-form-item>
                            <el-form-item label="图片">
                                <el-col>
                                    <el-image :src="product_image" style="width: 120px; height: 120px" fit="contain"></el-image>
                                </el-col>
                                <el-col>
                                    <input type="file" @change="displayImage" ref="fileInput">
                                </el-col>
                            </el-form-item>
                            <el-form-item label="采购价格">
                                <el-input v-model="modifyModel.buy_price"></el-input>
                            </el-form-item>
                            <el-form-item label="产品包装尺寸">
                                <el-input v-model="modifyModel.product_size"></el-input>
                            </el-form-item>
                            <el-form-item label="含包装的重量(克)">
                                <el-input v-model="modifyModel.weight"></el-input>
                            </el-form-item>
                            <el-form-item label="采购周期">
                                <el-input v-model="modifyModel.purchasing_cycle"></el-input>
                            </el-form-item>
                            <el-form-item label="敏感信息">
                                <el-input v-model="modifyModel.sensitive_information"></el-input>
                            </el-form-item>
                             <el-form-item label="状态">
                                <el-select v-model="modifyModel.SKU_apply_status" placeholder="请选择">
                                    <el-option
                                        v-for="item in apply_status"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input v-model="modifyModel.SKU_remark"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-container>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="viewVisible = false">取 消</el-button>
                        <el-button type="primary" @click="modifyCompanyConfirmBtnAction()">修 改</el-button>
                    </div>
            </section>
        </el-dialog>
    </el-container>


</template>

<script>
export default {
    data(){
        return {
            addSKULoading:false,
            loadingText:'',
            viewVisible:false,
            title:'',
            spu_id:'',
            imageFile:null,
            product_image:null,
            apply_status:[
                {
                    value:0,
                    label:"通过",
                },{
                    value:1,
                    label:"申请中",
                },{
                    value:2,
                    label:"驳回",
                }
            ],
            modifyModel:{

            },
        };
    },
    props:{
    },
    methods:{
        close(){
            this.imageFile = null;
            this.closeLoading();
            this.viewVisible = false;
        },
        show(title,model){
            console.log(model);
            this.title = title;
            this.viewVisible = true;
            this.modifyModel = model;
            if (this.modifyModel.spu_apply_id == null){
                this.spu_id = '';
            }else{
                this.spu_id = this.modifyModel.spu_apply_id.toString();
            }
            this.product_image = this.modifyModel.image;
        },
        loading(text){
            this.loadingText = text;
            this.addSKULoading = true;
        },
        closeLoading(){
            this.loadingText = '';
            this.addSKULoading = false;
        },
        addSPUConfirmBtnAction(){
            if (this.imageFile == null){
                this.$emit("addBtnClick",this.modifyModel);
                return;
            }
            let _this = this;
            this.http.uploadFile('/sku/product/image/upload',this.imageFile)
                    .then(result=>{
                        _this.imageFile = null;
                        _this.addSKULoading = false;
                        let url = result.data.url;
                        _this.modifyModel.image = url;
                        _this.$emit("addBtnClick",_this.modifyModel);
                    }).catch(error=>{
                        console.log(error);
                        _this.addSKULoading = false;
                        _this.$message({type:'error',message:"上传图片失败"});
                    });
        },
        modifyCompanyConfirmBtnAction(){
            if (this.imageFile == null){
                this.$emit("modifyBtnClick",this.modifyModel);
                return;
            }
            let _this = this;
            this.http.uploadFile('/sku/product/image/upload',this.imageFile)
                    .then(result=>{
                        _this.imageFile = null;
                        _this.addSKULoading = false;
                        let url = result.data.url;
                        _this.modifyModel.image = url;
                        _this.$emit("modifyBtnClick",_this.modifyModel);
                    }).catch(error=>{
                        console.log(error);
                        _this.addSKULoading = false;
                        _this.$message({type:'error',message:"上传图片失败"});
                    });
        },
        querySPUSearchAsync(queryString,cb){
            if (queryString == null || queryString.length == 0){
                cb([]);
                return;
            }
            let userInfo = this.$store.getters.getUserInfo()
            if (userInfo == null){
                this.http.toLogin();
            }
            let user_id = userInfo.id;
            let params = {
                search:queryString,
                user_id:user_id
            }
            this.http.post('/spu/user/apply/search',params)
                    .then(result=>{
                        console.log(result.data);
                        cb(result.data);
                    }).catch(error=>{
                        cb([]);
                    });
        },
        handleSelectSPU(item){
            this.spu_id = item.idSPUApply.toString();
            this.modifyModel.spu_apply_id = item.idSPUApply;
            this.modifyModel.spu_id = item.SPU_total_id;
        },
        displayImage(){
            const file = this.$refs.fileInput.files[0]
            this.imageFile= file;
            const fr = new FileReader()
            let _this = this
            fr.onload = (e) => {
                _this.product_image = e.target.result
            }
            fr.readAsDataURL(file)
        },

    }


}
</script>