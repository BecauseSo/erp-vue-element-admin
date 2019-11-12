<template>
<el-container height="0">
        <el-dialog  :close-on-press-escape=false
                        v-loading="addSPULoading"
                        :element-loading-text="loadingText"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        :title="title"
                        :visible.sync="viewVisible" center :append-to-body='true' :lock-scroll="false" width="60%" :close-on-click-modal='false'>
            <section>
                    <el-container>
                        <el-form label-width="130px" v-model="modifyModel" :inline="true">
                           <el-form-item label="SPU编码">
                                <el-input v-model="modifyModel.SPU_code"></el-input>
                            </el-form-item>
                            <el-form-item label="产品名">
                                <el-input v-model="modifyModel.product_name"></el-input>
                            </el-form-item>
                            <el-form-item label="产品图片">
                                <el-col>
                                    <el-image :src="product_image" style="width: 120px; height: 120px" fit="contain"></el-image>
                                </el-col>
                                <el-col>
                                    <input type="file" @change="displayImage" ref="imageInput">
                                </el-col>
                            </el-form-item>
                            <el-form-item label="对标/视频链接">
                                <el-input v-model="modifyModel.video_link"></el-input>
                            </el-form-item>
                            <el-form-item label="销售量">
                                <el-input v-model="modifyModel.sales"></el-input>
                            </el-form-item>
                            <el-form-item label="货源地址">
                                <el-input v-model="modifyModel.product_link"></el-input>
                            </el-form-item>
                            <el-form-item label="是否仿品山寨">
                                <el-select v-model="modifyModel.is_fake" placeholder="请选择">
                                    <el-option
                                        v-for="item in boolOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
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
                            <el-form-item label="是否侵权">
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
                            <el-form-item label="投放区域">
                                <el-input v-model="modifyModel.area"></el-input>
                            </el-form-item>
                            <el-form-item label="起批量">
                                <el-input v-model="modifyModel.start_values"></el-input>
                            </el-form-item>
                            <el-form-item label="支持语言">
                                <el-input v-model="modifyModel.language"></el-input>
                            </el-form-item>
                            <el-form-item label="运费">
                                <el-input v-model="modifyModel.freight"></el-input>
                            </el-form-item>
                            <el-form-item label="插头类型">
                                <el-input v-model="modifyModel.plug_type"></el-input>
                            </el-form-item>
                            <el-form-item label="电压">
                                <el-input v-model="modifyModel.voltage"></el-input>
                            </el-form-item>
                            <el-form-item label="创建时间">
                                <el-input v-model="modifyModel.create_time"></el-input>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input v-model="modifyModel.SPU_remark"></el-input>
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
    data (){
        return {
            addSPULoading:false,
            loadingText:'',
            title:'',
            viewVisible:false,
            modifyModel:{

            },
            boolOption:[
                {
                    value:0,
                    label:"否"
                },{
                    value:1,
                    label:"是"
                }
            ],
            imageFile:null,
            product_image:null
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
            this.title = title;
            this.viewVisible = true;
            this.modifyModel = model;
            this.product_image = this.modifyModel.product_image;
        },
        loading(text){
            this.loadingText = text;
            this.addCompanyLoading = true;
        },
        closeLoading(){
            this.loadingText = '';
            this.addCompanyLoading = false;
        },
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
        modifyCompanyConfirmBtnAction(){
            if (this.imageFile == null){
                this.$emit("modifyBtnClick",this.modifyModel);
                return;
            }
            let _this = this;
            this.http.uploadFile('/sku/product/image/upload',this.imageFile)
                    .then(result=>{
                        _this.imageFile = null;
                        _this.addCompanyLoading = false;
                        let url = result.data.url;
                        _this.modifyModel.product_image = url;
                        _this.$emit("modifyBtnClick",_this.modifyModel);
                    }).catch(error=>{
                        console.log(error);
                        _this.addCompanyLoading = false;
                        _this.$message({type:'error',message:"上传图片失败"});
                    });
        }
    }
}
</script>