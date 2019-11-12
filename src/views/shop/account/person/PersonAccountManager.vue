<template>
    <el-container v-loading="loading">
        <el-header>
            个人账号管理
            <el-button @click="addBtnClick()" type="text" size="small">+添加</el-button>
            <el-row :gutter="20">
                <el-col :span="3">
                    <el-input v-model="inputKeyWord" @change="searchKeyWordChange" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="3">
                    <el-button @click="searchBtnAction()">搜索</el-button>
                </el-col>
            </el-row>
            <personaccountcreate
                ref="createPersonAccountView"
                v-bind:isCreate="isCreate"
                v-on:addBtnClick="createCompleteWithModel"
                v-on:modifyBtnClick="modifyComplete">
            </personaccountcreate>
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
                        label="ID"
                        width="50px">
                    </el-table-column>
                    <el-table-column
                        prop="person_username"
                        label="用户名"
                        sortable="custom"
                        width="150px">
                    </el-table-column>
                    <el-table-column
                        prop="person_password"
                        label="密码"
                        width="100px">
                    </el-table-column>
                    <el-table-column
                        prop="Rdolp"
                        label="RdoIp"
                        sortable="custom"
                        width="150px">
                    </el-table-column>
                    <el-table-column
                        prop="Rdo_username"
                        label="Rdo用户名"
                        sortable="custom"
                        width="150px">
                    </el-table-column>
                    <el-table-column
                        prop="Rdo_password"
                        label="Rdo密码"
                        width="100px">
                    </el-table-column>
                    <el-table-column
                        prop="Rdo_port"
                        label="Rdo端口"
                        sortable="custom"
                        width="150px">
                    </el-table-column>
                    <el-table-column
                        prop="first_login_time"
                        label="第一次登陆时间"
                        sortable="custom"
                        width="150px">
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="类型"
                        width="60px">
                        <template slot-scope="scope">
                            <span>{{typeOption[scope.row.type]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="company_id"
                        label="所属企业主体"
                        width="110px">
                    </el-table-column>
                    <el-table-column
                        prop="belongto"
                        label="所属人"
                        width="100px">
                    </el-table-column>
                    <el-table-column
                        prop="person_status"
                        label="状态"
                        width="70px">
                        <template slot-scope="scope">
                            <span>{{statusOption[scope.row.person_status]}}</span>
                        </template>
                    </el-table-column>
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
                    </el-table-column>
                    <el-table-column
                        prop="person_remark"
                        label="备注"
                        width="150px">
                    </el-table-column>

                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="90px">
                        <template slot-scope="scope">
                            <el-button @click="handleTableClick(scope.row)" type="text" size="small">修改</el-button>
                            <el-button @click="handleTableDeleteClick(scope.row)" type="text" size="small">移除</el-button>
                        </template>
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

import PersonAccountCreate from '@/components/PersonAccountCreate.vue'

export default {
    name:'PersonAccountManage',
    data(){
        return{
            loading:false,
            originModel:null,
            isCreate:true,
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
    components:{
        'personaccountcreate':PersonAccountCreate
    },
    created(){
        this.loadPersonAccount();
    },
    methods:{
        loadPersonAccount(page,order,search){

            let _this = this;
            if (page == null){
                page = 1;
            }
            let params = {
                page:page,
                order:order,
                search:search
            }
            this.http.post('/account/person/all',params)
                .then(result=>{
                    _this.order = order;
                    _this.currentPage = page;
                    _this.totalCount = result.data.total_page * 10;
                    _this.tableData = result.data.res;
                    
                }).catch(error=>{
                    _this.$message({type:'errir',message:"加载个人账号失败"});
                });
        },
        addBtnClick(){
            this.isCreate = true;
            let m = {};
            this.$refs.createPersonAccountView.show("添加个人账号",m);
        },
        handleTableClick(item){
            this.originModel = item;
            this.isCreate = false;
            let m = {
                id:item.id,
                person_username: item.person_username,
                person_password: item.person_password,
                cookies:item.cookies,
                Rdolp: item.Rdolp,
                Rdo_username: item.Rdo_username,
                Rdo_password: item.Rdo_password,
                Rdo_port: item.Rdo_port,
                first_login_time: item.first_login_time,
                type: item.type,
                company_id: item.company_id,
                belongto: item.belongto,
                person_status: item.person_status,
                person_remark: item.person_remark
            }
            this.$refs.createPersonAccountView.show("修改个人账号",m);
        },
        handleTableDeleteClick(item){

            this.$confirm('此操作将删除该账号, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            
                let _this = this;
                let params = {
                    id:item.id
                }
                this.http.post('/account/person/delete',params)
                        .then(result=>{
                            _this.loading = false;
                            _this.loadPersonAccount();
                            _this.$message({type:'success',message:"删除个人账号成功"});
                        }).catch(error=>{
                            _this.loading = false;
                            _this.$message({type:'error',message:"删除个人账号失败"});
                        })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });

        },
        createCompleteWithModel(modifyModel){
            console.log('createCompleteWithModel');
            console.log(modifyModel);
            let params = {
                person_username: modifyModel.person_username,
                person_password: modifyModel.person_password,
                cookies:modifyModel.cookies,
                Rdolp: modifyModel.Rdolp,
                Rdo_username: modifyModel.Rdo_username,
                Rdo_password: modifyModel.Rdo_password,
                Rdo_port: modifyModel.Rdo_port,
                first_login_time: modifyModel.first_login_time,
                type: modifyModel.type,
                company_id: modifyModel.company_id,
                belongto: modifyModel.belongto,
                person_status: modifyModel.person_status,
                person_remark: modifyModel.person_remark
            };
            let _this = this;
            this.$refs.createPersonAccountView.loading('添加个人账号');
            this.http.post('/account/person/add',params)
                    .then(result=>{
                        _this.$refs.createPersonAccountView.close();
                        _this.$message({type:'success',message:"添加个人账号成功"});
                        _this.loadPersonAccount();
                    }).catch(error=>{
                        _this.$refs.createPersonAccountView.closeLoading()
                        _this.$message({type:'error',message:"添加个人账号失败"});
                    });
        },
        modifyComplete(modifyModel){
            if (modifyModel.person_username == this.originModel.person_username &&
                modifyModel.person_password == this.originModel.person_password &&
                modifyModel.cookies == this.originModel.cookies &&
                modifyModel.Rdolp == this.originModel.Rdolp &&
                modifyModel.Rdo_username == this.originModel.Rdo_username && 
                modifyModel.Rdo_password == this.originModel.Rdo_password &&
                modifyModel.Rdo_port == this.originModel.Rdo_port &&
                modifyModel.first_login_time == this.originModel.first_login_time &&
                modifyModel.type == this.originModel.type &&
                modifyModel.company_id == this.originModel.company_id && 
                modifyModel.belongto == this.originModel.belongto &&
                modifyModel.person_status == this.originModel.person_status &&
                modifyModel.person_remark == this.originModel.person_remark){
                    return;
                }
                let params = {
                    id:modifyModel.id,
                    person_username: modifyModel.person_username == null ? '':modifyModel.person_username,
                    person_password: modifyModel.person_password == null ? '':modifyModel.person_password,
                    cookies:modifyModel.cookies == null ? '':modifyModel.cookies,
                    Rdolp: modifyModel.Rdolp == null ? '':modifyModel.Rdolp,
                    Rdo_username: modifyModel.Rdo_username == null ? '': modifyModel.Rdo_username,
                    Rdo_password: modifyModel.Rdo_password == null ? '' : modifyModel.Rdo_password,
                    Rdo_port: modifyModel.Rdo_port.length == 0 ? null :modifyModel.Rdo_port,
                    first_login_time: modifyModel.first_login_time == null ? '' : modifyModel.first_login_time,
                    type: modifyModel.type,
                    company_id: modifyModel.company_id,
                    belongto: modifyModel.belongto,
                    person_status: modifyModel.person_status,
                    person_remark: modifyModel.person_remark == null ? '':modifyModel.person_remark
                };
                let _this = this;
                this.$refs.createPersonAccountView.loading('修改个人账号');
                this.http.post('/account/person/modify',params)
                    .then(result=>{
                        _this.$refs.createPersonAccountView.close();
                        _this.$message({type:'success',message:"修改个人账号成功"});
                        _this.loadPersonAccount();
                    }).catch(error=>{
                        _this.$refs.createPersonAccountView.closeLoading()
                        _this.$message({type:'error',message:"修改个人账号失败"});
                    });
        

        },
        open(cookies) {
            this.$alert(cookies, 'cookies', {
                dangerouslyUseHTMLString: true
            })
        },
        clipboardSuccessHandler ({ value, event }){
         console.log('success', value);
         this.$message.success("已复制");
        },
      // Error event handler
        clipboardErrorHandler ({ value, event }) {
             console.log('error', value)
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
 .head-but{
    margin-top: 20px;
 }
.el-message-box{
    max-width: 50%;
}
.el-message-box__content{
    max-height: 300px;
    overflow:scroll; 
}
</style>