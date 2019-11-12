<template>
    <el-container height="0">
        <el-dialog  :close-on-press-escape=false
                        v-loading="addPersonAccountLoading"
                        :element-loading-text="loadingText"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        :title="title"
                        :visible.sync="viewVisible" center :append-to-body='true' :lock-scroll="false" width="70%" :close-on-click-modal='false'>

            <section>
                <el-container>
                        <el-form label-width="130px" v-model="modifyModel" :inline="true">
                            <el-form-item label="用户名">
                                <el-input v-model="modifyModel.person_username"></el-input>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input v-model="modifyModel.person_password"></el-input>
                            </el-form-item>
                            <el-form-item label="RdoIp">
                                <el-input v-model="modifyModel.Rdolp"></el-input>
                            </el-form-item>
                            <el-form-item label="Rdo用户名">
                                <el-input v-model="modifyModel.Rdo_username"></el-input>
                            </el-form-item>
                            <el-form-item label="Rdo密码">
                                <el-input v-model="modifyModel.Rdo_password"></el-input>
                            </el-form-item>
                            <el-form-item label="Rdo端口">
                                <el-input v-model="modifyModel.Rdo_port"></el-input>
                            </el-form-item>
                            <el-form-item label="第一次登陆时间">
                                <el-input v-model="modifyModel.first_login_time"></el-input>
                            </el-form-item>
                            <el-form-item label="类型">
                                <el-select v-model="modifyModel.type" placeholder="请选择" style="width:185px">
                                    <el-option
                                        v-for="item in typeOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="所属企业主体">
                                <el-autocomplete
                                    v-model="company_id"
                                    :fetch-suggestions="queryCompanySearchAsync"
                                    placeholder="请输入企业名搜索"
                                    @select="handleSelectCompany">
                                    <template slot-scope="{ item }">
                                        <div class="name">{{ item.company_name }}</div>
                                        <span class="addr">{{ item.id }}</span>
                                    </template>    
                                </el-autocomplete>
                            </el-form-item>
                            <el-form-item label="所属人">
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
                            <el-form-item label="状态">
                                <el-select v-model="modifyModel.person_status" placeholder="请选择" style="width:185px">
                                    <el-option
                                        v-for="item in statusOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input v-model="modifyModel.person_remark"></el-input>
                            </el-form-item>
                            <el-form-item label="Cookies" >
                                <el-input  type="textarea" v-model="modifyModel.cookies"></el-input>
                            </el-form-item>
                        </el-form>
                </el-container>
                <div slot="footer" class="dialog-footer">
                        <el-button @click="viewVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addPersonConfirmBtnAction() " v-if="isCreate">添 加</el-button>
                        <el-button type="primary" @click="modifyPersonConfirmBtnAction() " v-else>修 改</el-button>
                    </div>
            </section>
        </el-dialog>
    </el-container>
</template>
<script>
export default {
    data(){
        return{
            statusOption:[
                {
                    value:0,
                    label:"正常"
                },
                 {
                    value:1,
                    label:"锁号"
                }
            ],
            typeOption:[{
                    value:0,
                    label:"大号"
                },{
                    value:1,
                    label:"冷号"
                },{
                    value:2,
                    label:"白号"
                }
            ],
            addPersonAccountLoading:false,
            loadingText:'',
            title:'',
            viewVisible:false,
            modifyModel:{

            },
            company_id:'',
            user_id:''
        };
    },
    props:{
        originModel:null,
        isCreate:true,
    },
    methods:{
        close(){
            this.closeLoading();
            this.viewVisible = false;
        },
        show(title,modifyModel){
            this.title = title;
            this.modifyModel = modifyModel;
            if(this.modifyModel.belongto != null){
                this.user_id = this.modifyModel.belongto.toString();
            }else{
                this.user_id = '';
            }
            if(this.modifyModel.company_id != null){
                this.company_id = this.modifyModel.company_id.toString();
            }else{
                this.company_id = ''
            }

            this.viewVisible = true;
        },
        loading(text){
            this.loadingText = text;
            this.addPersonAccountLoading = true;
        },
        closeLoading(){
            this.loadingText = '';
            this.addPersonAccountLoading = false;
        },
        addPersonConfirmBtnAction(){
            this.$emit("addBtnClick",this.modifyModel);
        },
        modifyPersonConfirmBtnAction(){
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
            this.modifyModel.belongto = item.id;
        },
    }
}
</script>

<style scoped>
.dialog-footer{
    text-align: center;
}
</style>