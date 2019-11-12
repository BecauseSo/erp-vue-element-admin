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
                        prop="person_username"
                        sortable="custom"
                        label="用户名">
                    </el-table-column>
                    <el-table-column
                        prop="person_password"
                        label="密码">
                    </el-table-column>
                    <el-table-column
                        prop="Rdolp"
                        sortable="custom"
                        label="RdoIp">
                    </el-table-column>
                    <el-table-column
                        prop="Rdo_username"
                        sortable="custom"
                        label="Rdo用户名">
                    </el-table-column>
                    <el-table-column
                        prop="Rdo_password"
                        label="Rdo密码">
                    </el-table-column>
                    <el-table-column
                        prop="Rdo_port"
                        sortable="custom"
                        label="Rdo端口">
                    </el-table-column>
                    <!-- <el-table-column
                        prop="first_login_time"
                        width="170"
                        label="第一次登陆时间">
                    </el-table-column> -->
                    <!-- <el-table-column
                        prop="type"
                        label="类型">
                        <template slot-scope="scope">
                            <span>{{typeOption[scope.row.type]}}</span>
                        </template>
                    </el-table-column> -->
                    <!-- <el-table-column
                        prop="company_id"
                        width="110"
                        label="所属企业主体">
                    </el-table-column> -->
                    <!-- <el-table-column
                        prop="belongto"
                        label="所属人">
                    </el-table-column> -->
                    <!-- <el-table-column
                        prop="person_status"
                        width="70"
                        label="状态">
                        <template slot-scope="scope">
                            <span>{{statusOption[scope.row.person_status]}}</span>
                        </template>
                    </el-table-column> -->
                    <el-table-column
                        prop="cookies"
                        label="Cookies"
                        width="100px">

                        <template slot-scope="scope" >
                            
                            <el-button type="text" @click="open(scope.row.cookies)" >查看</el-button>

                            <el-button type="text" v-clipboard="scope.row.cookies"
                                    v-clipboard:success="clipboardSuccessHandler" 
                                    v-clipboard:error="clipboardErrorHandler">    
                                    复制
                            </el-button>
                        </template>
                        
                        <!-- <template slot-scope="scope" >
                            <el-input :readonly="true" type="textarea" v-model="scope.row.cookies"></el-input>
                        </template> -->

                    </el-table-column>
                    <!-- <el-table-column
                        prop="person_remark"
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
    name:'MyPersonAccountList',
    data(){
        return {
            loading:false,
            tableData:[],
            statusOption:[
                "正常",
                "锁号"
            ],
            typeOption:[
                "大号",
                "冷号",
                "白号"
            ],
            inputKeyWord:"",
            currentPage:1,
            totalCount:0,
            order:null
        };
    },
    created(){
        this.loadPersonAccount();
    },
    methods:{
        loadPersonAccount(page,order,search){
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
            this.http.post('/user/account/person/all',params)
                    .then(result=>{
                        console.log(result.data);
                        _this.order = order;
                        _this.currentPage = page;
                        _this.totalCount = result.data.total_page * 10;
                        _this.tableData = result.data.res;
                    }).catch(error=>{
                        _this.$message({type:'error',message:"加载个人账号失败"});
                    })
        },
        searchKeyWordChange(){
            this.searchBtnAction();
        },
        searchBtnAction(){
            if (this.inputKeyWord.length > 0){
                this.loadPersonAccount(1,this.order,this.inputKeyWord);
            }else{
                this.loadPersonAccount(1);
            }
        },
        tableSortChange(obj){
            let {column,prop,order} = obj;
            let type = 0;
                
            if (order == 'descending'){
                
            }else if (order == 'ascending'){
                type = 1;
            }else{
                this.loadPersonAccount(this.currentPage,null);
                return;
            }
            let tmp = {
                prop:prop,
                type:type
            }
            this.loadPersonAccount(this.currentPage,tmp);
        },
        changeCurrentPage(page){
            if (this.inputKeyWord.length > 0){
                this.loadPersonAccount(page,this.currentOrder,this.inputKeyWord);
            }else{
                this.loadPersonAccount(page,this.currentOrder);
            }
        }
    }

}
</script>

<style>
.el-message-box{
    max-width: 50%;
}
.el-message-box__content{
    max-height: 300px;
    overflow:scroll; 
}
</style>
