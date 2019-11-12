<template>
    <el-container v-loading="loading">
        <el-header>
            <el-row  style="padding-top: 20px;">
                <el-col :span="5">
                    <el-input v-model="inputKeyWord" @change="searchKeyWordChange" placeholder="请输入店铺名"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-button @click="searchBtnAction()" icon="el-icon-search" class="head-but" type="primary"  ></el-button>
                    
                </el-col>
                <el-col :span="2">
                    <el-button @click="addBtnClick()" icon="el-icon-circle-plus-outline" class="head-but"  type="primary" >
                    添加
                    </el-button>
                </el-col>
            </el-row>
            <companycreate
                ref="createCompanyView"
                v-bind:modifyModel="modifyModel"
                v-bind:isCreate="isCreate"
                v-on:addBtnClick="createCompleteWithModel"
                v-on:modifyBtnClick="modifyComplete">
            </companycreate>
        </el-header>
        <el-main>
            <el-container>
                <el-table
                    :data="tableData"
                    fit
                    border
                    @sort-change="tableSortChange"
                    style="width: 100%">
                    <el-table-column
                        prop="id"
                        label="ID">
                    </el-table-column>
                    <el-table-column
                        prop="agent"
                        sortable="custom"
                        label="代理商">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="company_name"
                        label="公司名称">
                    </el-table-column>
                    <!-- <el-table-column
                        label="营业执照图片"
                        width="150px">
                        <template slot-scope="scope">
                            <image :src="scope.row.business_license_image" style="width: 120px; height: 120px" fit="contain"></image>
                        </template>
                    </el-table-column> -->
                    <el-table-column
                        sortable
                        prop="account_status"
                        label="开户状态">
                        <template slot-scope="scope">
                            <span>{{companyStatus[scope.row.account_status]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="logout_time"
                        label="下户时间">
                    </el-table-column>
                    <el-table-column
                        sortable
                        label="账户数量"
                        prop="account_count"
                        width="150px">
                        <template slot-scope="scope">
                            <span>{{scope.row.account_count}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="unlimit_count"
                        label="不限额数量">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="logout_time"
                        label="所属人">
                         <template slot-scope="scope">
                            <span v-if="scope.row.belong_to != null">{{scope.row.belong_to.user_name}}</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column
                        prop="ad_connect_name"
                        label="广告主联系人姓名"
                        width="150px">
                        </el-table-column>
                    <el-table-column
                        prop="ad_connect_email"
                        label="广告主联系人邮箱"
                        width="150px">
                    </el-table-column>
                    <el-table-column
                        label="FB粉丝页链接"
                        width="300px">
                        <template slot-scope="scope">
                            <el-tag
                                :key="tag"
                                v-for="tag in scope.row.fans"
                                :disable-transitions="false">
                                {{tag}}
                            </el-tag>
                        </template>
                    </el-table-column> -->
                    <!-- <el-table-column
                        prop="time_zone"
                        label="时区"
                        width="150px">
                    </el-table-column>
                    <el-table-column
                        prop="BM"
                        label="BM"
                        width="150px">
                    </el-table-column>
                    <el-table-column
                        prop="BMAPI"
                        label="BM API"
                        width="150px">
                    </el-table-column> -->
                    <el-table-column
                        prop="company_remark"
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

import CompanyCreate from '@/components/CompanyCreate.vue'

export default {
    data(){
        return{
            inputKeyWord:'',
            loading:false,
            tableData:[],
            fileList:[],
            previewImageSrc:'',
            file:null,
            isCreate:true,
            currentPage:1,
            currentOrder:null,
            totalCount:0,
            companyStatus:[
                "审核成功",
                "审核中",
                "审核失败"
            ],
            modifyModel:{
                BM: "",
                BMAPI: "",
                account_status: 0,
                ad_connect_email: "",
                ad_connect_name: "",
                agent: "",
                company_name: "",
                company_remark: "",
                logout_time: "",
                time_zone: "",
                fans:[],
                business_license_image:null,
                account_count:0,
                unlimit_count:0,

            },
            originModel:null
        };
    },
    components:{
        'companycreate':CompanyCreate
    },
    created(){
        this.loadCompany();
    },
    methods:{
        loadCompany(page,order,search){
            this.currentPage = page;
            this.currentOrder = order;
            if (page == null){
                page = 1;
            }
            let _this = this;
            let params = {
                page:page,
                order:order,
                search:search
            }
            this.http.post('/company/all',params)
                    .then(result=>{
                        _this.tableData = [];
                        let total_page = result.data.total_page;
                        _this.currentPage = result.data.current_page;
                        _this.totalCount = total_page * 10;
                        result.data.res.forEach(element => {
                            let fansStr = element.fanslink;
                            let fans = [];
                            if (fansStr.length > 0){
                                fans = JSON.parse(fansStr)
                            }
                            let item = {
                                id:element.id,
                                BM: element.BM,
                                BMAPI: element.BMAPI,
                                account_status: element.account_status,
                                ad_connect_email: element.ad_connect_email,
                                ad_connect_name: element.ad_connect_name,
                                agent: element.agent,
                                company_name: element.company_name,
                                company_remark: element.company_remark,
                                logout_time: element.logout_time,
                                time_zone: element.time_zone,
                                fans:fans,
                                business_license_image:element.business_license_image,
                                account_count:element.account_count,
                                unlimit_count:element.unlimit_count,
                            }
                            _this.tableData.push(item);
                        });
                    }).catch(error=>{

                    });
        },
        addBtnClick(){
            this.isCreate = true;
            this.modifyModel = {
                BM: "",
                BMAPI: "",
                account_status: 0,
                ad_connect_email: "",
                ad_connect_name: "",
                agent: "",
                company_name: "",
                company_remark: "",
                logout_time: "",
                time_zone: "",
                fans:[],
                business_license_image:null
            }
            this.$refs.createCompanyView.show("添加企业主体");
        },
        createCompleteWithModel(){
            let fanslink = "";
            if (this.modifyModel.fans.length > 0){
                fanslink = JSON.stringify(this.modifyModel.fans);
            }
            let params = {
                            agent: this.modifyModel.agent,
                            company_name: this.modifyModel.company_name,
                            business_license_image: this.modifyModel.business_license_image == null ? "":this.modifyModel.business_license_image,
                            ad_connect_name: this.modifyModel.ad_connect_name,
                            ad_connect_email: this.modifyModel.ad_connect_email,
                            time_zone: this.modifyModel.time_zone,
                            BM: this.modifyModel.BM,
                            account_status: this.modifyModel.account_status,
                            logout_time: this.modifyModel.logout_time,
                            BMAPI: this.modifyModel.BMAPI,
                            company_remark: this.modifyModel.company_remark,
                            fans: fanslink
                        }
            let _this = this;
            _this.$refs.createCompanyView.loading('正在添加...');
            this.http.post('/company/add',params)
                    .then(result=>{
                        _this.modifyModel = {
                            BM: "",
                            BMAPI: "",
                            account_status: 0,
                            ad_connect_email: "",
                            ad_connect_name: "",
                            agent: "",
                            company_name: "",
                            company_remark: "",
                            logout_time: "",
                            time_zone: "",
                            fans:[],
                            business_license_image:null
                        }
                        _this.$refs.createCompanyView.close();
                        _this.$message({type:'success',message:"添加企业主体成功"});
                        _this.loadCompany();
                    }).catch(error=>{
                        _this.$refs.createCompanyView.closeLoading();
                        _this.$message({type:'error',message:"添加企业主体失败"});
                    })
        },
        modifyComplete(){
            let _this = this;
            let modifyFns = JSON.stringify(this.modifyModel.fans);
            let originFns = JSON.stringify(this.originModel.fans);
            if (modifyFns == originFns && this.modifyModel.BM == this.originModel.BM &&
                this.modifyModel.BMAPI == this.originModel.BMAPI &&
                this.modifyModel.account_status == this.originModel.account_status &&
                this.modifyModel.ad_connect_email == this.originModel.ad_connect_email &&
                this.modifyModel.ad_connect_name == this.originModel.ad_connect_name &&
                this.modifyModel.agent == this.originModel.agent && 
                this.modifyModel.company_name == this.originModel.company_name &&
                this.modifyModel.company_remark == this.originModel.company_remark &&
                this.modifyModel.logout_time ==this.originModel.logout_time &&
                this.modifyModel.time_zone == this.originModel.time_zone &&
                this.modifyModel.business_license_image == this.originModel.business_license_image){
                    this.modifyModel = {
                            BM: "",
                            BMAPI: "",
                            account_status: 0,
                            ad_connect_email: "",
                            ad_connect_name: "",
                            agent: "",
                            company_name: "",
                            company_remark: "",
                            logout_time: "",
                            time_zone: "",
                            fans:[],
                            business_license_image:null
                        }
                    this.originModel = null;
                    this.$refs.createCompanyView.close();
                    return;
                }
            let params = {
                id:this.originModel.id,
                agent: this.modifyModel.agent,
                company_name: this.modifyModel.company_name,
                business_license_image: this.modifyModel.business_license_image == null ? "":this.modifyModel.business_license_image,
                ad_connect_name: this.modifyModel.ad_connect_name,
                ad_connect_email: this.modifyModel.ad_connect_email,
                time_zone: this.modifyModel.time_zone,
                BM: this.modifyModel.BM,
                account_status: this.modifyModel.account_status,
                logout_time: this.modifyModel.logout_time,
                BMAPI: this.modifyModel.BMAPI,
                company_remark: this.modifyModel.company_remark,
                fans: modifyFns
            }
            this.http.post('/company/modify',params)
                    .then(result=>{
                        _this.modifyModel = {
                            BM: "",
                            BMAPI: "",
                            account_status: 0,
                            ad_connect_email: "",
                            ad_connect_name: "",
                            agent: "",
                            company_name: "",
                            company_remark: "",
                            logout_time: "",
                            time_zone: "",
                            fans:[],
                            business_license_image:null
                        }
                        _this.originModel = null;
                        _this.$refs.createCompanyView.close();
                        _this.$message({type:'success',message:"修改企业主体成功"});
                        _this.loadCompany();
                    }).catch(error=>{
                        _this.$refs.createCompanyView.closeLoading();
                        _this.$message({type:'error',message:"修改企业主体失败"});
                    })
        },
        handleTableClick(data){
            this.originModel = data;
            let fans = [];
            for (let i = 0;i<data.fans.length;i++){
                let link = data.fans[i];
                fans.push(link);
            }
            this.modifyModel = {
                BM: data.BM,
                BMAPI: data.BMAPI,
                account_status: data.account_status,
                ad_connect_email: data.ad_connect_email,
                ad_connect_name: data.ad_connect_name,
                agent: data.agent,
                company_name: data.company_name,
                company_remark: data.company_remark,
                logout_time: data.logout_time,
                time_zone: data.time_zone,
                fans:fans,
                business_license_image:data.business_license_image
            }
            this.isCreate = false;
            this.$refs.createCompanyView.show("修改企业主体");
        },
        handleTableDeleteClick(data){  

            this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {

                let params = {
                    id:data.id
                }
                this.loading = true;
                let _this = this;
                this.http.post('/company/delete',params)
                        .then(result=>{
                            _this.loading = false;
                            _this.$message({type:'success',message:"移除企业主体成功"});
                            _this.loadCompany();
                        }).catch(error=>{
                            this.loading = false;
                            _this.$message({type:'error',message:"移除企业主体失败"});
                        })

            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });

        },
        tableSortChange(obj){
            let {column,prop,order} = obj;
            let type = 0;
                
            if (order == 'descending'){
                
            }else if (order == 'ascending'){
                type = 1;
            }else{
                this.loadCompany(this.currentPage,null);
                return;
            }
            let tmp = {
                prop:prop,
                type:type
            }
            this.loadCompany(this.currentPage,tmp);
        },
        searchKeyWordChange(value){
            this.searchBtnAction();
        },
        searchBtnAction(){
            
            if (this.inputKeyWord.length > 0){
                this.loadCompany(1,this.order,this.inputKeyWord);
            }else{
                this.loadCompany(1);
            }
        },
        changeCurrentPage(page){
            if (this.inputKeyWord.length > 0){
                this.loadCompany(page,this.currentOrder,this.inputKeyWord);
            }else{
                this.loadCompany(page,this.currentOrder);
            }
            
        }
    },
}
</script> 

<style scoped>
.el-col {
    margin: 0 2px;
  }
.head-but{
    width: 100%;
}
.el-pagination{
    text-align: center;
    margin-top: 10px;
}
</style>