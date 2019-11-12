<template>
    <el-container v-loading="loading">
        <el-header>
            <el-row :gutter="20">
                <el-col :span="3">
                    <el-input v-model="inputKeyWord" @change="searchKeyWordChange" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="3">
                    <el-button @click="searchBtnAction()">搜索</el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-container>
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
                        prop="company_account_id"
                        sortable="custom"
                        label="企业主体名称">
                    </el-table-column>
                    <el-table-column
                        prop="company_account_id"
                        sortable="custom"
                        label="企业账户ID">
                    </el-table-column>
                    <!-- <el-table-column
                        prop="shop_id"
                        label="店铺ID">
                    </el-table-column> -->
                    <el-table-column
                        prop="shop_id"
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
                    <!-- <el-table-column
                        prop="user_id"
                        label="用户">
                    </el-table-column> -->
                    <!-- <el-table-column
                        prop="companyaccount_remark"
                        label="备注">
                    </el-table-column> -->
                </el-table>
            </el-container>
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
export default {
    name:'MyCompanyAccountList',
    data(){
        return {
            loading:false,
            tableData:[],
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
    created(){
        this.loadUserCompanyAccount();
    },
    methods:{
        loadUserCompanyAccount(page,order,search){
            console.log(this.$store);
            let userInfo = this.$store.getters.userinfo;
            if (userInfo == null){
                this.http.toLogin();
            }
            let username = userInfo.name
            let userid = userInfo.id
            if (userid == null) {
                console.log('user id is null')
                this.http.toLogin();
                return
            }
            if (page == null){
                page = 1;
            }
            let params = {
                user_id:userid,
                page:page,
                order:order,
                search:search
            };
            let _this = this;
            this.http.post('/user/account/company/all',params)
                    .then(result=>{
                         _this.order = order;
                        _this.currentPage = page;
                        _this.totalCount = result.data.total_page * 10;
                        _this.tableData = result.data.res;
                    }).catch(error=>{
                        _this.$message({type:'error',message:"加载企业账号失败"});
                    })
        },
        searchKeyWordChange(){
            this.searchBtnAction();
        },
        searchBtnAction(){
            if (this.inputKeyWord.length > 0){
                this.loadUserCompanyAccount(1,this.order,this.inputKeyWord);
            }else{
                this.loadUserCompanyAccount(1);
            }
        },
        tableSortChange(obj){
            let {column,prop,order} = obj;
            let type = 0;
                
            if (order == 'descending'){
                
            }else if (order == 'ascending'){
                type = 1;
            }else{
                this.loadUserCompanyAccount(this.currentPage,null);
                return;
            }
            let tmp = {
                prop:prop,
                type:type
            }
            this.loadUserCompanyAccount(this.currentPage,tmp);
        },
        changeCurrentPage(page){
            if (this.inputKeyWord.length > 0){
                this.loadUserCompanyAccount(page,this.currentOrder,this.inputKeyWord);
            }else{
                this.loadUserCompanyAccount(page,this.currentOrder);
            }
        }
    }
}
</script>
