<template>

    <el-container v-loading="loading">
    <el-header>
        店铺管理
        <el-button @click="addBtnClick()" type="text" size="small">+添加</el-button>
        <el-row :gutter="20">
                <el-col :span="3">
                    <el-input v-model="inputKeyWord" @change="searchKeyWordChange" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="3">
                    <el-button @click="searchBtnAction()">搜索</el-button>
                </el-col>
            </el-row>

        <shopcreate ref="createShopView"
                v-bind:isCreate="isCreate"
                height="0"
                v-on:addBtnClick="createCompleteWithModel"
                v-on:modifyBtnClick="modifyComplete">
            </shopcreate>
    </el-header>
    <el-main>
        <template>
            <el-table
                :data="tableData"
                border
                @sort-change="tableSortChange"
                style="width: 100%">
                <el-table-column
                    prop="id"
                    label="ID"
                    width="50px">
                </el-table-column>
                <el-table-column
                    prop="domain"
                    label="网站域名"
                    width="150px">
                </el-table-column>
                <!-- <el-table-column
                    prop="backstage"
                    label="网站后台"
                    width="150px">
                </el-table-column> -->
                <!-- <el-table-column
                    prop="backstage_username"
                    label="后台用户名"
                    width="150px">
                </el-table-column> -->
                <!-- <el-table-column
                    prop="backstage_password"
                    label="后台密码"
                    width="100px">
                </el-table-column>
                <el-table-column
                    prop="email_password"
                    label="邮箱密码"
                    width="100px">
                </el-table-column> -->
                <el-table-column
                    prop="receipt_paypal"
                    label="收款paypal"
                    sortable="custom"
                    width="150px">
                </el-table-column>
                <el-table-column
                    prop="receipt_credit_card"
                    label="收款信用卡通道"
                    sortable="custom"
                    width="150px">
                </el-table-column>
                <el-table-column
                    prop="deduction"
                    label="扣款方式"
                    sortable="custom"
                    width="150px">
                </el-table-column>
                <!-- <el-table-column
                    prop="customer_service_email"
                    label="客服邮箱"
                    width="150px">
                </el-table-column> -->
                <el-table-column
                    prop="shop_api"
                    label="店铺API"
                    sortable="custom"
                    width="250px">
                </el-table-column>
                <el-table-column
                    prop="authorization_erp"
                    sortable="custom"
                    label="授权ERP">
                </el-table-column>
                <el-table-column
                    prop="company_id"
                    sortable="custom"
                    label="所属企业主体">
                </el-table-column>
                 <el-table-column
                    prop="user_id"
                    sortable="custom"
                    label="运营员工">
                </el-table-column>
                <el-table-column
                    prop="shop_remark"
                    label="备注">
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="90px">
                    <template slot-scope="scope">
                        <el-button @click="handleTableClick(scope.row)" type="text" size="small">修改</el-button>
                        <el-button @click="handleTableDeleteClick(scope.row)" type="text" size="small">移除</el-button>
                    </template>
            </el-table-column>
            </el-table>
             <el-pagination
                background
                :page-size="10"
                @current-change="changeCurrentPage"
                :current-page="currentPage"
                layout="prev, pager, next"
                :total="totalCount">
                </el-pagination>
        </template>

    </el-main>
    </el-container>
</template>

<script>

import ShopCreate from '@/components/ShopCreate.vue'

export default {
    data(){
        return{
            tableData:[],
            originShopModel:null,
            isCreate:true,
            loading:false,
            currentPage:1,
            totalCount:0,
            inputKeyWord:'',
            order:null,
        };
    },
    components:{
        "shopcreate":ShopCreate
    },
    created(){
        this.loadAllShop();

    },
    methods:{
        loadAllShop(page,order,search){
            if (page == null){
                page = 1;
            }
            let params = {
                page:page,
                order:order,
                search:search
            }
            let _this = this;
            this.http.post('/shop/all',params)
                .then(result=>{
                    _this.order = order;
                    _this.currentPage = page;
                    _this.totalCount = result.data.total_page * 10;
                    // console.log(result.data);
                    _this.tableData = result.data.res;
                }).catch(error=>{

                });
        },
        handleTableClick(data){
            this.originShopModel = data;
            let modifyModel = {
                id:data.id,
                domain:data.domain,
                backstage:data.backstage,
                backstage_username:data.backstage_username,
                backstage_password:data.backstage_password,
                email_password:data.email_password,
                receipt_paypal:data.receipt_paypal,
                receipt_credit_card:data.receipt_credit_card,
                deduction:data.deduction,
                customer_service_email:data.customer_service_email,
                shop_api:data.shop_api,
                authorization_erp:data.authorization_erp,
                company_id:data.company_id,
                shop_remark:data.shop_remark
            }
            this.isCreate = false;
            this.$refs["createShopView"].show('修改店铺',modifyModel);
        },
        handleTableDeleteClick(data){

            let _this = this;
            this.$confirm('此操作将删除该店铺, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    })
                .then(_ => {
                    let params = {shop_id:data.id}
                    _this.loading = true;
                    _this.http.post("/shop/delete",params)
                            .then(result=>{
                                _this.loading = false;
                                _this.loadAllShop();
                                _this.$message({type:'success',message:"移除店铺成功"});
                            }).catch(error=>{
                                _this.loading = false;
                                _this.$message({type:'error',message:"移除店铺失败"});
                            });
                    })
                .catch(_ => {
                    
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });  
                });

        },
        addBtnClick(){
            let modifyModel = {
                id:null,
                domain:'',
                backstage:'',
                backstage_username:'',
                backstage_password:'',
                email_password:'',
                receipt_paypal:'',
                receipt_credit_card:'',
                deduction:'',
                customer_service_email:'',
                shop_api:'',
                authorization_erp:'',
                company_id:null,
                shop_remark:""
            };
            this.isCreate = true;
            this.$refs["createShopView"].show('添加店铺',modifyModel);
        },
        createCompleteWithModel(shop){
            let _this = this;
            let params = {
                domain: shop.domain,
                backstage: shop.backstage,
                backstage_username: shop.backstage_username,
                backstage_password: shop.backstage_password,
                email_password: shop.email_password,
                receipt_paypal: shop.receipt_paypal,
                receipt_credit_card: shop.receipt_credit_card,
                deduction: shop.deduction,
                customer_service_email: shop.customer_service_email,
                shop_api: shop.shop_api,
                authorization_erp:shop.authorization_erp,
                company_id: shop.company_id,
                shop_remark: shop.shop_remark
            }
            this.$refs["createShopView"].loading('添加中...');
            this.http.post('/shop/add',params)
                    .then(result=>{
                        _this.$refs["createShopView"].close();
                        _this.loadAllShop();
                        _this.$message({type:'success',message:"添加店铺成功"})
                    }).catch(error=>{
                        console.log(error);
                        _this.$refs["createShopView"].closeLoading();
                        _this.$message({type:'error',message:"添加店铺失败"});
                    });
        },
        modifyComplete(modifyModel){
            if(this.originShopModel.domain == modifyModel.domain &&
                this.originShopModel.backstage == modifyModel.backstage &&
                this.originShopModel.backstage_username == modifyModel.backstage_username &&
                this.originShopModel.backstage_password == modifyModel.backstage_password &&
                this.originShopModel.email_password == modifyModel.email_password && 
                this.originShopModel.receipt_paypal == modifyModel.receipt_paypal &&
                this.originShopModel.receipt_credit_card == modifyModel.receipt_credit_card &&
                this.originShopModel.deduction == modifyModel.deduction &&
                this.originShopModel.customer_service_email == modifyModel.customer_service_email &&
                this.originShopModel.authorization_erp == modifyModel.authorization_erp &&
                this.originShopModel.shop_api == modifyModel.shop_api &&
                this.originShopModel.company_id == modifyModel.company_id &&
                this.originShopModel.shop_remark == modifyModel.shop_remark){
                    console.log('no change');
                    return;
            }

            let params = {
                id:modifyModel.id,
                domain: modifyModel.domain == null ? '':modifyModel.domain,
                backstage: modifyModel.backstage == null ? '':modifyModel.backstage,
                backstage_username: modifyModel.backstage_username == null ? '':modifyModel.backstage_username,
                backstage_password: modifyModel.backstage_password == null ? '':modifyModel.backstage_password,
                email_password: modifyModel.email_password == null ? '':modifyModel.email_password ,
                receipt_paypal: modifyModel.receipt_paypal == null ? '' :modifyModel.receipt_paypal,
                receipt_credit_card: modifyModel.receipt_credit_card == null ? '':modifyModel.receipt_credit_card,
                deduction: modifyModel.deduction == null ? '':modifyModel.deduction,
                customer_service_email: modifyModel.customer_service_email == null ? '':modifyModel.customer_service_email,
                shop_api: modifyModel.shop_api == null ? "":modifyModel.shop_api,
                authorization_erp:modifyModel.authorization_erp == null ? "":modifyModel.authorization_erp,
                company_id: modifyModel.company_id,
                shop_remark: modifyModel.shop_remark == null ? '':modifyModel.shop_remark,
            }
            this.$refs["createShopView"].loading('修改中...');
            let _this = this;
            this.http.post('/shop/modify',params)
                    .then(result=>{
                        _this.$refs["createShopView"].close();
                        _this.loadAllShop();
                        _this.$message({type:'success',message:"修改店铺成功"})
                    }).catch(error=>{
                        _this.$refs["createShopView"].closeLoading();
                        _this.$message({type:'error',message:"修改店铺失败"});
                    })

        },

        tableSortChange(obj){
            let {column,prop,order} = obj;
            let type = 0;
                
            if (order == 'descending'){
                
            }else if (order == 'ascending'){
                type = 1;
            }else{
                this.loadAllShop(this.currentPage,null);
                return;
            }
            let tmp = {
                prop:prop,
                type:type
            }
            this.loadAllShop(this.currentPage,tmp);
            
        },
        searchKeyWordChange(){
            this.searchBtnAction();
        },
        searchBtnAction(){
            if (this.inputKeyWord.length > 0){
                this.loadAllShop(1,this.order,this.inputKeyWord);
            }else{
                this.loadAllShop(1);
            }
        },
        changeCurrentPage(page){
            if (this.inputKeyWord.length > 0){
                this.loadAllShop(page,this.currentOrder,this.inputKeyWord);
            }else{
                this.loadAllShop(page,this.currentOrder);
            }
        }
    }
}
</script>

<style scoped>
.head-but{
    margin-top: 20px;
}
</style>