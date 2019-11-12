<template>
    <el-container>
        <el-dialog  :close-on-press-escape=false
                        v-loading="addRoleLoading" 
                        element-loading-text="添加中..."
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        title="添加角色"
                        :visible.sync="dialogTableVisible" center :append-to-body='true' :lock-scroll="false" width="30%" :close-on-click-modal='false'>
                <section>
                    <el-container>
                        <el-form label-width="120px" v-model="newRole">
                        <el-row>
                            <el-col>
                                <el-form-item label="名字" prop="name">
                                    <el-input v-model="newRole.name" clearable></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <el-form-item label="Display Name" prop="display_name">
                                    <el-input v-model="newRole.display_name" clearable></el-input>
                                </el-form-item>   
                            </el-col>
                        </el-row>
                        </el-form>
                    </el-container>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogTableVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addRoleConfirmBtnAction() ">添 加</el-button>
                    </div>
                </section>
        </el-dialog>
        <el-dialog  :close-on-press-escape=false
                        v-loading="addRoleToGroupLoading" 
                        element-loading-text="添加权限中..."
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        title="添加权限"
                        :visible.sync="addRolesTableVisible" center :append-to-body='true' :lock-scroll="false" width="30%" :close-on-click-modal='false'>
                <section>
                    <el-container>
                        <template>
                            <el-select v-model="addRoleItemID" placeholder="请选择">
                                <el-option
                                    v-for="item in allRolesDisplay"
                                    :key="item.id"
                                    :label="item.function_name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </template>
                    </el-container>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="addRolesTableVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addRoleToGroupConfirmBtnAction() ">添 加</el-button>
                    </div>
                </section>
            </el-dialog>
        <el-header >
            <el-container class="rolemanageheader">
                角色管理
            </el-container>
        </el-header>
        <el-container>
            <el-aside class="role-side-nav" width="150px">
                <el-button type="primary" round v-on:click="addBtnAction">添加</el-button>
                <el-menu class="el-menu-vertical-demo" 
                        :default-active = "activeIndex"
                        active-text-color="#409EFF"
                        :collapse-transition=false
                        @select="selectItem">
                        <el-submenu index='submenu'>
                            <template slot="title">
                                <span >角色</span>
                            </template>
                            <el-menu-item-group v-for="menuitem in menu" :key="menuitem.index" :index="menuitem.index">
                                <el-menu-item v-text="menuitem.display_name" :key="menuitem.index" :index="menuitem.index" >
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <div>
                    权限
                    </div>
                    <el-button type="primary" round v-on:click="addRolesBtnAction">添加权限</el-button>
                </el-header>
                <el-main>
                    <el-table 
                    :data="tableData"
                    style="width: 100%">
                        <el-table-column
                            prop="function_name"
                            label="名称">
                        </el-table-column>
                        <el-table-column
                            prop="function_description"
                            label="描述">
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="60px">
                            <template slot-scope="scope">
                                <el-button
                                    @click.native.prevent="deleteRoleWithRow(scope.$index, tableData)"
                                    type="text"
                                    size="small">
                                        移除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-main>
            </el-container>
        </el-container>
    </el-container>

</template>

<script>
import RoleHeaderNav from '@/components/RoleHeaderNav.vue'
import { log } from 'util';

export default {

    data(){
        return {
            menu:[],
            submenu:'',
            activeIndex:null,
            rolesData:{},
            currentGroupId:0,
            tableData:[],
            allRoles:{},
            allRolesDisplay:[],
            addRoleLoading:false,
            dialogTableVisible:false,
            newRole:{
                name:'',
                display_name:''
            },
            addRoleToGroupLoading:false,
            addRolesTableVisible:false,
            addRoleItemID:null
        }
    },
    components:{
        'headernav':RoleHeaderNav
    },
    created(){
        //加载roles
        this.reloadItems();
    },
    methods:{
        reloadItems(){
        let _this = this;
        this.menu = [];
        this.http.post('/group/all')
                .then((result)=>{
                    for (let i = 0;i < result.data.length;i++){
                        let element = result.data[i];
                        let item = {
                            index: i.toString(),
                            name:element['group_name'],
                            display_name:element['group_display_name']
                        }
                        _this.rolesData[item.index] = element;
                        _this.menu.push(item);
                    }
                    _this.activeIndex = '0';
                    let group = _this.rolesData[_this.activeIndex];
                    _this.currentGroupId = group.id;
                    _this.reloadRolesWith(group.id)
                    // _this.reloadUsers(group.id);
                })
        },
        addRoleConfirmBtnAction(){
            if (this.newRole.name == null || this.newRole.name.length == 0){
                this.$message({type: 'info',message: '名字为空'});
                return;
            }
            if (this.newRole.display_name == null || this.newRole.display_name.length == 0){
                this.$message({type: 'info',message: 'Display Name 为空'});
                return;
            }
            this.addRoleLoading = true;
            let params = {group_name:this.newRole.name,display_name:this.newRole.display_name};
            let _this = this;
            _this.http.post('/group/add',params)
                    .then(result=>{
                            _this.addRoleLoading = false;
                            _this.$message({type: 'success',message: '添加成功'});
                            _this.reloadItems();
                            _this.dialogTableVisible = false;
                        }).catch(err=>{
                            _this.addRoleLoading = false;
                            _this.dialogTableVisible = false;
                            // _this.$message({type:'info',message:err});
                        });
        },
        addBtnAction(item){
            this.dialogTableVisible = true;
        },
        selectItem(index){
            let group_item = this.rolesData[index];
            if (this.currentGroupId == group_item.id){
                return;
            }
            this.currentGroupId = group_item.id;
            this.reloadRolesWith(group_item.id);
        },
        reloadRolesWith(group_id){
            if (group_id == null || group_id == 0){
                console.log('group id is nil');
                return;
            }
            let params = {group_id:group_id}
            let _this = this;
            this.http.post('/group/function/all',params)
                    .then(result=>{
                        console.log(result.data);
                        _this.tableData = result.data;
                    }).catch(error=>{
                        this.$message({type: 'info',message: '获取权限数据失败'});
                    })
        },
        addRolesBtnAction(sender){
            let _this = this;
            if (this.allRolesDisplay == null || this.allRolesDisplay.length == 0){
                this.loadAllRoles(()=>{
                    _this.addRolesTableVisible = true; 
                });
                return;
            }
            this.addRolesTableVisible = true;
        },
        addRoleToGroupConfirmBtnAction(sender){
            
            let key = this.addRoleItemID;
            let functionItem = this.allRoles[key];
            if (key == null || functionItem == null){
                return;
            }
            console.log(functionItem);
            this.addRoleToGroupLoading = true;
            let params = {group_id:this.currentGroupId,
                        function_id:functionItem.id};
            let _this = this;
            this.http.post('/group/function/add',params)
                    .then(result=>{
                        _this.addRoleToGroupLoading = false;
                        _this.addRolesTableVisible = false;
                        _this.$message({type: 'success',message: '添加权限成功'});
                        _this.reloadRolesWith(_this.currentGroupId);
                    }).catch(error=>{
                        console.log(error);
                        _this.addRoleToGroupLoading = false;
                    })
        },
        loadAllRoles(complete){
            let _this = this;
            this.http.post('/function/all')
                    .then(result=>{
                        _this.allRolesDisplay = result.data;
                        console.log(result.data);
                        result.data.forEach(element => {
                            let key = element['id'];
                            _this.allRoles[key] = element;
                        });
                        if (complete!=null){
                            complete();
                        }
                    }).catch(error=>{
                        if (complete!=null){
                            complete();
                        }
                    });
        },
        deleteRoleWithRow(index,data){
            let roleItem = data[index];
            let _this = this;
            console.log(roleItem);
            this.$confirm('此操作将删除该组权限, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        let params = {group_id:_this.currentGroupId,
                                    function_id:roleItem.function_id};
                        _this.http.post('/group/function/delete',params)
                                .then(result=>{
                                    _this.$message({type: 'success',message: '删除成功!'});
                                    _this.reloadRolesWith(_this.currentGroupId);
                                }).catch(error=>{
                                    console.log(error);
                                })
                    }).catch(() => {
                        _this.$message({type: 'info',message: '已取消删除'});          
                    });
            
        }
    }
}


</script>

<style scoped>
.rolemanageheader{
    background-color: #545c64;
    color: #fff;
}
</style>