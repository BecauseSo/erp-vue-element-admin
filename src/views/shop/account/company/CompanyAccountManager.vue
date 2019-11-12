<template>
    <el-container v-loading="loading">
        <el-header>
            企业账号管理
            <el-button @click="addBtnClick()" type="text" size="small">+添加</el-button>
            <el-row :gutter="20">
                <el-col :span="3">
                    <el-input v-model="inputKeyWord" @change="searchKeyWordChange" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="3">
                    <el-button @click="searchBtnAction()">搜索</el-button>
                </el-col>
            </el-row>
            <companyaccountcreate
                ref="createCompanyAccountView"
                v-bind:isCreate="isCreate"
                v-on:addBtnClick="createCompleteWithModel"
                v-on:modifyBtnClick="modifyComplete"
                v-on:viewDidClosed="addViewDidClosed">
            </companyaccountcreate>
        </el-header>
        <el-main>
            <el-table
                :data="tableData"
                border
                @sort-change="tableSortChange"
                style="width: 100%">
                <el-table-column
                    prop="id"
                    label="ID">
                </el-table-column>
                <el-table-column
                    prop="company_name"
                    sortable="custom"
                    label="企业主体名称">
                </el-table-column>
                <el-table-column
                    prop="company_account_id"
                    sortable="custom"
                    label="企业账户ID">
                </el-table-column>
                <el-table-column
                    prop="domain"
                    sortable="custom"
                    label="域名">
                </el-table-column>
                <!-- <el-table-column
                    prop="company_id"
                    label="企业主体ID">
                </el-table-column> -->
                <el-table-column
                    prop="isunlock"
                    label="是否解限">
                </el-table-column>
                <el-table-column
                    label="账户状态">
                    <template slot-scope="scope">
                        <span >{{accountStatus[scope.row.status].label}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="user_id"
                    label="用户">
                </el-table-column>
                <el-table-column
                    prop="companyaccount_remark"
                    label="备注">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作">
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
        </el-main>
    </el-container>
</template>

<script>

import CompanyAccountCreate from '@/components/CompanyAccountCreate.vue'

export default {
    name:'CompanyAccountManage',
    data(){
        return{
            loading:false,
            isCreate:true,
            tableData:[],
            originModel:null,
            accountStatus:[
                {
                    value:0,
                    label:"正常"
                },
                {
                    value:1,
                    label:"封户"
                },
                {
                    value:2,
                    label:"申诉中"
                }
            ],
            inputKeyWord:"",
            currentPage:1,
            totalCount:0,
            order:null
        };
    },
    components:{
        'companyaccountcreate':CompanyAccountCreate
    },
    created(){
        this.loadCompanyAccount();
    },
    methods:{
        loadCompanyAccount(page,order,search){
            if (page == null){
                page = 1;
            }
            let _this = this;
            let params = {
                page:page,
                order:order,
                search:search
            }
            this.http.post('/account/company/all',params)
                    .then(result=>{
                        _this.order = order;
                        _this.currentPage = page;
                        _this.totalCount = result.data.total_page * 10;
                        _this.tableData = result.data.res;
                    }).catch(error=>{
                        _this.$message({type:'errir',message:"加载企业账号失败"});
                    });
        },
        addViewDidClosed(){
            this.originModel = null;
        },
        addBtnClick(){
            this.isCreate = true;
            let modifyModel = {};
            this.$refs.createCompanyAccountView.show("添加企业账号",modifyModel);
        },
        handleTableClick(item){
            this.originModel = item;
            let modifyModel = {
                id:item.id,
                company_account_id:item.company_account_id,
                shop_id:item.shop_id,
                company_id:item.company_id,
                isunlock:item.isunlock,
                status:item.status,
                companyaccount_remark:item.companyaccount_remark,
                user_id:item.user_id
            };
            this.isCreate = false;
            this.$refs.createCompanyAccountView.show("修改企业账号",modifyModel);
        },
        handleTableDeleteClick(item){

            this.$confirm('此操作将删除该企业账号, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                
                let params = {
                    id:item.id
                }
                this.loading = true;
                let _this = this;
                this.http.post('/account/company/delete',params)
                        .then(result=>{
                            _this.loading = false;
                            _this.loadCompanyAccount();
                            _this.$message({type:'success',message:"删除企业账号成功"});
                        }).catch(error=>{
                            _this.loading = false;
                            _this.$message({type:'error',message:"删除企业账号失败"});
                        })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });

        },
        createCompleteWithModel(modifyModel){
            console.log('createCompleteWithModel')
            console.log(modifyModel);
            let params = {
                company_account_id: modifyModel.company_account_id,
                shop_id: modifyModel.shop_id,
                company_id:modifyModel.company_id,
                isunlock:modifyModel.isunlock,
                status:modifyModel.status,
                companyaccount_remark:modifyModel.companyaccount_remark,
                user_id:modifyModel.user_id
            };
            let _this = this;
            this.$refs.createCompanyAccountView.loading('添加企业账号');
            this.http.post('/account/company/add',params)
                    .then(result=>{
                        _this.$refs.createCompanyAccountView.close();
                        _this.$message({type:'success',message:"添加企业账号成功"});
                        _this.loadCompanyAccount();
                    }).catch(error=>{
                        _this.$refs.createCompanyAccountView.closeLoading()
                        _this.$message({type:'error',message:"添加企业账号失败"});
                    });
        },
        modifyComplete(modifyModel){
            if (this.originModel.company_account_id == modifyModel.company_account_id &&
            this.originModel.shop_id == modifyModel.shop_id &&
            this.originModel.company_id == modifyModel.company_id &&
            this.originModel.isunlock == modifyModel.isunlock &&
            this.originModel.status == modifyModel.status &&
            this.originModel.user_id == modifyModel.user_id &&
            this.originModel.companyaccount_remark == modifyModel.companyaccount_remark){
                return;
            }
            let params = {
                id:modifyModel.id,
                company_account_id: modifyModel.company_account_id,
                shop_id: modifyModel.shop_id,
                company_id:modifyModel.company_id,
                isunlock:modifyModel.isunlock,
                status:modifyModel.status,
                companyaccount_remark:modifyModel.companyaccount_remark,
                user_id:modifyModel.user_id
            };
            let _this = this;
            this.$refs.createCompanyAccountView.loading('修改企业账号');
            this.http.post('/account/company/modify',params)
                   .then(result=>{
                        _this.$refs.createCompanyAccountView.close();
                        _this.$message({type:'success',message:"修改企业账号成功"});
                        _this.loadCompanyAccount();
                    }).catch(error=>{
                        _this.$refs.createCompanyAccountView.closeLoading()
                        _this.$message({type:'error',message:"修改企业账号失败"});
                    }); 
        },
        searchKeyWordChange(){
            this.searchBtnAction();
        },
        searchBtnAction(){
            if (this.inputKeyWord.length > 0){
                this.loadCompanyAccount(1,this.order,this.inputKeyWord);
            }else{
                this.loadCompanyAccount(1);
            }
        },
        tableSortChange(obj){
            let {column,prop,order} = obj;
            let type = 0;
                
            if (order == 'descending'){
                
            }else if (order == 'ascending'){
                type = 1;
            }else{
                this.loadCompanyAccount(this.currentPage,null);
                return;
            }
            let tmp = {
                prop:prop,
                type:type
            }
            this.loadCompanyAccount(this.currentPage,tmp);
        },
        changeCurrentPage(page){
            if (this.inputKeyWord.length > 0){
                this.loadCompanyAccount(page,this.currentOrder,this.inputKeyWord);
            }else{
                this.loadCompanyAccount(page,this.currentOrder);
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