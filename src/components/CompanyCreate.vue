<template>
<el-container height="0">
        <el-dialog  :close-on-press-escape=false
                        v-loading="addCompanyLoading"
                        :element-loading-text="loadingText"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        :title="title"
                        :visible.sync="viewVisible" center :append-to-body='true' :lock-scroll="false" width="60%" :close-on-click-modal='false'>
            <section>
                    <el-container>
                        <el-form label-width="130px"  :rules="rules" :model="modifyModel" :inline="true" ref="modifyModel">
                           <el-form-item label="代理商"  prop="agent">
                                <el-input v-model="modifyModel.agent"></el-input>
                            </el-form-item>
                            <el-form-item label="公司名称"  prop="company_name">
                                <el-input v-model="modifyModel.company_name"></el-input>
                            </el-form-item>
                            <el-form-item label="营业执照图片"  prop="business_license_image">
                                    <el-image :src="modifyModel.business_license_image" style="width: 185px; height: 185px" fit="contain"></el-image>
                                    <input type="file" @change="displayImage" ref="fileInput">
                            </el-form-item>
                            <el-form-item label="广告主联系人姓名" prop="ad_connect_name">
                                <el-input v-model="modifyModel.ad_connect_name"></el-input>
                            </el-form-item>
                            <el-form-item label="广告主联系人邮箱"  prop="ad_connect_email">
                                <el-input v-model="modifyModel.ad_connect_email"></el-input>
                            </el-form-item>
                            <el-form-item label="FB粉丝页链接">
                                <el-tag
                                    :key="tag"
                                    v-for="tag in modifyModel.fans"
                                    closable
                                    :disable-transitions="false"
                                    @close="fanHandleClose(tag)">
                                    {{tag}}
                                    </el-tag>
                                    <el-input
                                        class="input-new-tag"
                                        v-if="fanInputVisible"
                                        v-model="fanInputValue"
                                        ref="saveTagInput"
                                        size="small"
                                        @keyup.enter.native="handleFanInputConfirm"
                                        @blur="handleFanInputConfirm"
                                        >
                                    </el-input>
                                    <el-button v-else class="button-new-tag" style="width:185px;" size="small" @click="showFanInput">+ New Tag</el-button>
                            </el-form-item>
                            <el-form-item label="时区">
                                <el-input v-model="modifyModel.time_zone"></el-input>
                            </el-form-item>
                            <el-form-item label="BM">
                                <el-input v-model="modifyModel.BM"></el-input>
                            </el-form-item>
                            <el-form-item label="开户状态">
                                <el-select v-model="modifyModel.account_status" placeholder="请选择" style="width:185px;">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="下户时间">
                                <el-input v-model="modifyModel.logout_time"></el-input>
                            </el-form-item>
                            <el-form-item label="BM API">
                                <el-input v-model="modifyModel.BMAPI"></el-input>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input v-model="modifyModel.company_remark"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-container>
                    <div slot="footer" class="dialog-footer" >
                        <el-button @click="dialogTableVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addCompanyConfirmBtnAction(modifyModel) " v-if="isCreate">添 加</el-button>
                        <el-button type="primary" @click="modifyCompanyConfirmBtnAction(modifyModel) " v-else>修 改</el-button>
                    </div>
            </section>
        </el-dialog>
    </el-container>


</template>

<script>
export default {
    data(){
        return{
            title:'',
            addCompanyLoading:false,
            viewVisible:false,
            loadingText:'',
            previewImageSrc:'',
            statusOptions:[
                {
                    value:0,
                    label:"审核成功"
                },{
                    value:1,
                    label:"审核中"
                },{
                    value:2,
                    label:"审核失败"
                }
            ],
            fanInputVisible: false,
            fanInputValue: '',
            imageFile:null,
            rules: {
                agent: [
                { required: true, message: "请输入代理商", trigger: "blur" },
                ],
                company_name: [
                { required: true, message: "请输入公司名称", trigger: "change" }
                ],
                business_license_image: [
                { required: true, message: "请上传营业执照", trigger: "change" }
                ],
                ad_connect_name: [
                { required: true, message: "请填写广告主联系人姓名", trigger: "change" }
                ],
                ad_connect_email: [
                { required: true, message: "请填写广告主联系人邮箱", trigger: "change" }
                ]
            }
        };
    },
    props:{
        originModel:null,
        modifyModel:null,
        isCreate:true,
    },
    methods:{
        close(){
            this.imageFile = null;
            this.closeLoading();
            this.viewVisible = false;
        },
        show(title){
            this.title = title;
            this.viewVisible = true;
        },
        loading(text){
            this.loadingText = text;
            this.addCompanyLoading = true;
        },
        closeLoading(){
            this.loadingText = '';
            this.addCompanyLoading = false;
        },
        addCompanyConfirmBtnAction(modifyModel){
            
        //验证信息是否填写完整
        this.$refs.modifyModel.validate((valid) => {
          if (!valid) {
            this.$message.error('信息未填写完整，请仔细检查表单!');
            return false;
          }else{

            if (this.imageFile == null){
                this.$emit("addBtnClick");
                return;
            }
            let _this = this;
            this.addCompanyLoading = true;
            this.http.uploadFile('/company/license/upload',this.imageFile)
                    .then(result=>{
                        _this.imageFile = null;
                        _this.addCompanyLoading = false;
                        let url = result.data.url;
                        _this.modifyModel.business_license_image = url;
                        _this.$emit("addBtnClick");
                    }).catch(error=>{
                        console.log(error);
                        _this.addCompanyLoading = false;
                        _this.$message({type:'error',message:"上传图片失败"});
                    });

          }
        });

        },
        modifyCompanyConfirmBtnAction(){


        //验证信息是否填写完整
        this.$refs.modifyModel.validate((valid) => {
          if (!valid) {
            this.$message.error('信息未填写完整，请仔细检查表单!');
            return false;
          }else{
            //上传图片
            if (this.imageFile == null){
                this.$emit("modifyBtnClick");
                return;
            }
            let _this = this;
            this.addCompanyLoading = true;
            this.http.uploadFile('/company/license/upload',this.imageFile)
                    .then(result=>{
                        _this.imageFile = null;
                        _this.addCompanyLoading = false;
                        let url = result.data.url;
                        _this.modifyModel.business_license_image = url;
                        _this.$emit("modifyBtnClick");
                    }).catch(error=>{
                        console.log(error);
                        _this.addCompanyLoading = false;
                        _this.$message({type:'error',message:"上传图片失败"});
                    });

          }
        });

        },
        displayImage(){
            const file = this.$refs.fileInput.files[0]
            this.imageFile= file;
            const fr = new FileReader()
            let _this = this
            fr.onload = (e) => {
                _this.modifyModel.business_license_image = e.target.result
            }
            fr.readAsDataURL(file)
        },
        handleFanInputConfirm(){
            let fanInputValue = this.fanInputValue;
            if (fanInputValue) {
                if (this.modifyModel.fans == null){
                    this.modifyModel.fans = [];
                }
                this.modifyModel.fans.push(fanInputValue);
            }
            this.fanInputVisible = false;
            this.fanInputValue = '';
        },
        fanHandleClose(tag) {
            this.modifyModel.fans.splice(this.modifyModel.fans.indexOf(tag), 1);
        },

        showFanInput() {
            this.fanInputVisible = true;
            let _this = this;
            this.$nextTick(_ => {
                _this.$refs.saveTagInput.$refs.input.focus();
            });
        },
    }
}
</script>

<style scoped>
.dialog-footer{
    text-align: center
}
</style>