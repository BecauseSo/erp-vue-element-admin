<template>
    <el-container height="0">
        <el-dialog  :close-on-press-escape=false
                        v-loading="addShopLoading"
                        :element-loading-text="loadingText"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        :title="title"
                        :visible.sync="viewVisible" center :append-to-body='true' :lock-scroll="false" width="60%" :close-on-click-modal='false'>
            <section>
                    <el-container>
                        <el-form label-width="120px" v-model="modifyModel" :inline="true">
                            <el-form-item label="网站域名">
                                <el-input v-model="modifyModel.domain"></el-input>
                            </el-form-item>
                            <el-form-item label="网站后台">
                                <el-input v-model="modifyModel.backstage"></el-input>
                            </el-form-item>
                            <el-form-item label="后台用户名">
                                <el-input v-model="modifyModel.backstage_username"></el-input>
                            </el-form-item>
                            <el-form-item label="后台密码">
                                <el-input v-model="modifyModel.backstage_password"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱密码">
                                <el-input v-model="modifyModel.email_password"></el-input>
                            </el-form-item>
                            <el-form-item label="收款Paypal">
                                <el-input v-model="modifyModel.receipt_paypal"></el-input>
                            </el-form-item>
                            <el-form-item label="收款信用卡通道">
                                <el-input v-model="modifyModel.receipt_credit_card"></el-input>
                            </el-form-item>
                            <el-form-item label="扣款方式">
                                <el-input v-model="modifyModel.deduction"></el-input>
                            </el-form-item>
                            <el-form-item label="客服邮箱">
                                <el-input v-model="modifyModel.customer_service_email"></el-input>
                            </el-form-item>
                            <el-form-item label="店铺API">
                                <el-input v-model="modifyModel.shop_api"></el-input>
                            </el-form-item>
                            <el-form-item label="授权ERP">
                                <el-input v-model="modifyModel.authorization_erp"></el-input>
                            </el-form-item>
                            <el-form-item label="所属企业主体">
                                <!-- <el-input v-model="modifyModel.company_id"></el-input> -->
                                <el-autocomplete
                                    v-model="company_id"
                                    :fetch-suggestions="queryCompanySearchAsync"
                                    placeholder="请企业名搜索"
                                    @select="handleSelectCompany">
                                    <template slot-scope="{ item }">
                                        <div class="name">{{ item.company_name }}</div>
                                        <span class="addr">{{ item.id }}</span>
                                    </template>    
                                </el-autocomplete>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input v-model="modifyModel.shop_remark"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-container>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="viewVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addShopConfirmBtnAction() " v-if="isCreate">添 加</el-button>
                        <el-button type="primary" @click="modifyShopConfirmBtnAction() " v-else>修 改</el-button>
                    </div>
            </section>
        </el-dialog>
    </el-container>
</template>
<script>
export default {
    data(){
        return{
            viewVisible:false,
            addShopLoading:false,
            loadingText:'',
            company_id:'',
            title:'',
            modifyModel:{},
        }
    },
    props:{
        isCreate:true,
    },
    created(){
    },
    methods:{
        close(){
            this.closeLoading();
            this.viewVisible = false;
        },
        show(text,modifyModel){
            this.viewVisible = true;
            this.modifyModel = modifyModel;
            this.title = text
            if (this.modifyModel.company_id == null){
                this.company_id = ''
            }else{
                this.company_id = this.modifyModel.company_id.toString();
            }
        },
        loading(text){
            this.loadingText = text;
            this.addShopLoading = true;
        },
        closeLoading(){
            this.loadingText = '';
            this.addShopLoading = false;
        },
        addShopConfirmBtnAction(){
            this.$emit("addBtnClick",this.modifyModel);
        },
        modifyShopConfirmBtnAction(){
            this.$emit("modifyBtnClick",this.modifyModel);
        },
        queryCompanySearchAsync(queryString,cb){
            if (queryString == null || queryString.length == 0){
                cb([]);
                return;
            }
            let params = {
                search:queryString
            }
            this.http.post('/company/search',params)
                    .then(result=>{
                        cb(result.data);
                    }).catch(error=>{
                        cb([]);
                    });
        },
        handleSelectCompany(item){
            this.company_id = item.id.toString();
            this.modifyModel.company_id = item.id;
        },
    }

}

</script>

<style scoped>
.dialog-footer{
    text-align: center
}
</style>
