<template>
    <el-container >
        <el-header>
            我的店铺
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
                style="width: 100%">
                <el-table-column
                    prop="id"
                    label="ID"
                    width="50px">
                </el-table-column>
                <el-table-column
                    prop="domain"
                    label="网站域名"
                    sortable="custom"
                    width="150px">
                </el-table-column>
                <el-table-column
                    prop="backstage"
                    label="网站后台"
                    width="150px">
                </el-table-column>
                <!-- <el-table-column
                    prop="backstage_username"
                    label="后台用户名"
                    width="150px">
                </el-table-column>
                <el-table-column
                    prop="backstage_password"
                    label="后台密码"
                    width="100px">
                </el-table-column> -->
                <!-- <el-table-column
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
                    width="150px">
                </el-table-column>
                <el-table-column
                    prop="deduction"
                    label="扣款方式"
                    width="150px">
                </el-table-column>
                <el-table-column
                    prop="customer_service_email"
                    label="客服邮箱"
                    sortable="custom"
                    width="150px">
                </el-table-column>
                <el-table-column
                    prop="shop_api"
                    label="店铺API"
                    width="250px">
                </el-table-column>
                <el-table-column
                    prop="authorization_erp"
                    label="授权ERP">
                </el-table-column>
                <el-table-column
                    prop="company_id"
                    sortable="custom"
                    label="所属企业主体">
                </el-table-column>
                <el-table-column
                    prop="shop_remark"
                    label="备注">
                </el-table-column>
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
    data(){
        return {
            tableData:[],
            inputKeyWord:'',
            currentPage:1,
            totalCount:0,
            order:null
        };
    },
    created(){
        this.loadUserShops();
    },
    methods:{
        loadUserShops(page,order,search){
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
            this.http.post('/user/shop/all',params)
                    .then(result=>{
                        _this.order = order;
                        _this.currentPage = page;
                        _this.totalCount = result.data.total_page * 10;
                        _this.tableData = result.data.res;
                    }).catch(error=>{
                        _this.$message({type:'error',message:"加载店铺失败"});
                    })
        },
        searchKeyWordChange(){
            this.searchBtnAction();
        },
        searchBtnAction(){
            if (this.inputKeyWord.length > 0){
                this.loadUserShops(1,this.order,this.inputKeyWord);
            }else{
                this.loadUserShops(1);
            }
        },
        changeCurrentPage(page){
            if (this.inputKeyWord.length > 0){
                this.loadUserShops(page,this.currentOrder,this.inputKeyWord);
            }else{
                this.loadUserShops(page,this.currentOrder);
            }
        },
        tableSortChange(obj){
            let {column,prop,order} = obj;
            let type = 0;
                
            if (order == 'descending'){
                
            }else if (order == 'ascending'){
                type = 1;
            }else{
                this.loadUserShops(this.currentPage,null);
                return;
            }
            let tmp = {
                prop:prop,
                type:type
            }
            this.loadUserShops(this.currentPage,tmp);
        }
    }
}
</script>