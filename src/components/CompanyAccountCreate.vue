<template>
    <el-container height="0">
        <el-dialog  :close-on-press-escape=false
                        v-loading="addCompanyAccountLoading"
                        :element-loading-text="loadingText"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        :title="title"
                        :visible.sync="viewVisible" 
                        center 
                        :append-to-body='true' 
                        :lock-scroll="false" 
                        width="60%" 
                        :close-on-click-modal='false'
                        :closed="viewDidClosed">
            <section>
                <el-container>
                        <el-form label-width="130px" v-model="modifyModel" :inline="true">
                            <el-form-item label="企业账户ID">
                                <el-input v-model="modifyModel.company_account_id"></el-input>
                            </el-form-item>
                            <el-form-item label="店铺ID">
                                <el-autocomplete
                                    v-model="shop_id"
                                    :fetch-suggestions="queryShopSearchAsync"
                                    placeholder="请输入域名搜索"
                                    @select="handleSelectShop">
                                    <template slot-scope="{ item }">
                                        <div class="name">{{ item.domain }}</div>
                                        <span class="addr">{{ item.id }}</span>
                                    </template>    
                                </el-autocomplete>
                            </el-form-item>
                            <el-form-item label="企业主体ID">
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
                            <el-form-item label="是否解限">
                                <el-input v-model="modifyModel.isunlock"></el-input>
                            </el-form-item>
                            <el-form-item label="账户状态">
                                 <el-select v-model="modifyModel.status" placeholder="请选择" style="width:185px;">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="用户">
                                <el-autocomplete
                                    v-model="user_id"
                                    :fetch-suggestions="queryUserSearchAsync"
                                    placeholder="请输入用户名搜索"
                                    @select="handleSelectUser">
                                    <template slot-scope="{ item }">
                                        <div class="name">{{ item.user_name }}</div>
                                        <span class="addr">{{ item.id }}</span>
                                    </template>    
                                </el-autocomplete>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input v-model="modifyModel.companyaccount_remark"></el-input>
                            </el-form-item>
                        </el-form>
                </el-container>
                <div slot="footer" class="dialog-footer">
                        <el-button @click="viewVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addCompanyConfirmBtnAction() " v-if="isCreate">添 加</el-button>
                        <el-button type="primary" @click="modifyCompanyConfirmBtnAction() " v-else>修 改</el-button>
                    </div>
            </section>
        </el-dialog>
    </el-container>
</template>
<script>
export default {
    data(){
        return {
            addCompanyAccountLoading:false,
            title:'',
            loadingText:'',
            viewVisible:false,
            statusOptions:[
                {
                    value:0,
                    label:"正常"
                },{
                    value:1,
                    label:"封户"
                },{
                    value:2,
                    label:"申诉中"
                }
            ],
            shop_id:'',
            company_id:'',
            user_id:'',
            modifyModel:{},
        };
    },
    props:{
        originModel:null,
        isCreate:true,
    },
    created(){

    },
    methods:{
        viewDidClosed(){
            this.$emit("viewDidClosed");
        },

        close(){
            this.closeLoading();
            this.viewVisible = false;
        },
        show(title,modifyModel){
            this.modifyModel = modifyModel;
            console.log(modifyModel);
            if (this.modifyModel.user_id != null){
                this.user_id = this.modifyModel.user_id.toString();
            }else{
                this.user_id = '';
            }
            if (this.modifyModel.company_id != null){
                this.company_id = this.modifyModel.company_id.toString();
            }else{
                this.company_id = '';
            }
            if (this.modifyModel.shop_id != null){
                this.shop_id = this.modifyModel.shop_id.toString();
            }else{
                this.shop_id = '';
            }
            
            this.title = title;
            this.viewVisible = true;
        },
        loading(text){
            this.loadingText = text;
            this.addCompanyAccountLoading = true;
        },
        closeLoading(){
            this.loadingText = '';
            this.addCompanyAccountLoading = false;
        },
        queryShopSearchAsync(queryString,cb){
            if (queryString == null || queryString.length == 0){
                cb([]);
                return;
            }
            let params = {
                search:queryString
            }
            this.http.post('/shop/search',params)
                    .then(result=>{
                        cb(result.data);
                    }).catch(error=>{
                        cb([]);
                    });
        },
        handleSelectShop(item){
            this.shop_id = item.id.toString();
            this.modifyModel.shop_id = item.id;
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
        queryUserSearchAsync(queryString,cb){
            if (queryString == null || queryString.length == 0){
                cb([]);
                return;
            }
            let params = {
                search:queryString
            }
            this.http.post('/user/search',params)
                    .then(result=>{
                        cb(result.data);
                    }).catch(error=>{
                        cb([]);
                    })
        },
        handleSelectUser(item){
            this.user_id = item.id.toString();
            this.modifyModel.user_id = item.id;
        },
        addCompanyConfirmBtnAction(){
            if(this.modifyModel.company_account_id == null || this.modifyModel.company_account_id.length == 0){
                this.$message({type:'error',message:"企业账户ID不能为空"});
                return;
            }
            this.$emit("addBtnClick",this.modifyModel);
        },
        modifyCompanyConfirmBtnAction(){
            this.$emit("modifyBtnClick",this.modifyModel);
        }

    }
}
</script>

<style scoped>
.dialog-footer{
    text-align: center;
}
</style>