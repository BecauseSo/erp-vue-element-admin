<template>
        <el-container>
            <el-dialog  :close-on-press-escape=false
                        v-loading="addUserLoading"
                        element-loading-text="添加中..."
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        title="添加员工"
                        :visible.sync="dialogTableVisible" center :append-to-body='true' :lock-scroll="false" width="30%" :close-on-click-modal='false'>
                <section>
                    <el-container>
                        <el-form label-width="120px" v-model="newUser">
                            <el-row>
                                <el-col>
                                    <el-form-item label="名字" prop="name">
                                        <el-input v-model="newUser.name" clearable></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="密码" prop="password">
                                        <el-input v-model="newUser.password" type="password" clearable></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="电话" prop="phone">
                                        <el-input v-model="newUser.phone_number" type="tel" clearable></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="邮箱" prop="email">
                                        <el-input v-model="newUser.email" type="email" clearable></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </el-container>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogTableVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addUserConfirmBtnAction() ">添 加</el-button>
                    </div>
                </section>
            </el-dialog>

            <el-dialog  :close-on-press-escape=false
                        v-loading="modifyUserApartLoading"
                        @close="modifyUserGroupsClose()"
                        element-loading-text="修改中..."
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        title="修改部门"
                        :visible.sync="modifyUserApartsVisible" center :append-to-body='true' :lock-scroll="false" width="30%" :close-on-click-modal='false'>
                        <section>
                            
                            <el-table 
                                    :data="selectUserAparts"
                                    border
                                    style="width: 100%">
                                     <el-table-column
                                    prop="group_display_name"
                                    label="角色">
                                    </el-table-column>
                                    <el-table-column
                                    fixed="right"
                                    label="操作">
                                    <template slot-scope="scope">
                                        <el-button
                                            @click.native.prevent="deleteUserFromApart(scope.$index, selectUserAparts)"
                                            type="text"
                                            size="small">
                                                移除
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </section>
            </el-dialog>
            <el-dialog  :close-on-press-escape=false
                        v-loading="modifyUserLoading"
                        element-loading-text="添加中..."
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        title="修改员工信息"
                        :visible.sync="modifyUserVisible" center :append-to-body='true' :lock-scroll="false" width="30%" :close-on-click-modal='false'>
                <section>
                    <el-container>
                        <el-form label-width="120px" v-model="modifyUser">
                            <el-row>
                                <el-col>
                                    <el-form-item label="名字" prop="name">
                                        <el-input v-model="modifyUser.name" clearable></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="电话" prop="phone">
                                        <el-input v-model="modifyUser.phone_number" type="tel" clearable></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="邮箱" prop="email">
                                        <el-input v-model="modifyUser.email" type="email" clearable></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="角色">
                                       <el-tag
                                            :key="group_item.display_name"
                                            v-for="group_item in modifyUser.groups.items"
                                            closable
                                            :disable-transitions="false"
                                            @close="handleGroupDelete(group_item)">
                                            {{group_item.display_name}}
                                        </el-tag>

                                        <el-popover
                                            trigger="manual"
                                            v-model="addGroupCascaderVisible">
                                            <el-cascader-panel
                                                ref="addGroupCascader"
                                                :show-all-levels="false"
                                                :props="groupProps"
                                                :options="allRolesDisplay"
                                                @change="handleGroupChange"
                                                ></el-cascader-panel>
                                            <el-button slot="reference" @click="showGroupInput()">+ New Tag</el-button>
                                        </el-popover>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            
                            <el-row>
                                <el-col>
                                    <el-form-item label="部门">
                                       <el-tag
                                            :key="apart_item.name"
                                            v-for="apart_item in modifyUser.aparts.items"
                                            closable
                                            :disable-transitions="false"
                                            @close="handleApartDelete(apart_item)">
                                            {{apart_item.name}}
                                        </el-tag>

                                        <el-popover
                                            trigger="manual"
                                            v-model="addApartCascaderVisible">
                                            <el-cascader-panel
                                                ref="addApartCascader"
                                                :show-all-levels="false"
                                                :props="apartProps"
                                                :options="apartDisplayData"
                                                @change="handleApartChange"

                                                ></el-cascader-panel>
                                            <el-button slot="reference" @click="showApartInput()">+ New Tag</el-button>
                                        </el-popover>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </el-container>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogTableVisible = false">取 消</el-button>
                        <el-button type="primary" @click="modifyUserConfirmBtnAction() ">确 认</el-button>
                    </div>
                </section>
            </el-dialog>
            <el-header>
                <el-button type="primary" round v-on:click="addBtnAction">添加员工</el-button>
            </el-header>
            <el-main>
                <el-container>
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="id_str"
                        label="id">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名">
                    </el-table-column>
                    <el-table-column
                        prop="phone_number"
                        label="电话">
                    </el-table-column>
                    <el-table-column
                        prop="email"
                        label="邮箱">
                    </el-table-column>
                    <el-table-column
                        prop="aparts.display"
                        label="部门">
                        <template slot-scope="scope">
                            <span >{{scope.row.aparts.display}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="状态">
                    </el-table-column>
                    <el-table-column
                        prop="groups.display"
                        label="角色">
                        <template slot-scope="scope">
                            <span >{{scope.row.groups.display}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="120">
                            <template slot-scope="scope">
                                <el-button
                                    @click.native.prevent="deleteUserWithRow(scope.$index, tableData)"
                                    type="text"
                                    size="small">
                                        移除
                                </el-button>
                                <el-button
                                    @click.native.prevent="modifyUserWithRow(scope.$index, tableData)"
                                    type="text"
                                    size="small">
                                        修改
                                </el-button>
                            </template>
                    </el-table-column>
                </el-table>
            </el-container>
            </el-main>
        </el-container>
</template>

<script>
export default {
  data () {
    return {
        tableData: [],
      // current_group_id:null
        dialogTableVisible: false,
        addUserLoading: false,
        newUser: {
            name: '',
            password: '',
            phone_number: '',
            email: ''
        },
        allRoles:{},
        allRolesDisplay:[],
        allApart:[],
        addUserRoleItemID:null,
        modifyUserGroupsVisible:false,
        selectUserGroups:[],
        selectUser:null,
        modifyUserGroupsLoading:false,
        apartDisplayData:null,
        modifyUserApartLoading:false,
        modifyUserApartsVisible:false,
        selectUserAparts:[],
        apartProps:{
            children: 'sub',
            label: 'apart_name',
            value: 'id',
            checkStrictly: true
        },
        groupProps:{
            children: 'sub',
            label: 'group_display_name',
            value: 'id',
            checkStrictly: true
        },
        currentApart:[],
        modifyUserLoading:false,
        modifyUserVisible:false,
        modifyUser:{
            name:'',
            email:'',
            phone_number:'',
            email:'',
            groups:{
                items:[]
            },
            aparts:{
                items:[]
            }
        },
        modifyUserOrigin:null,
        addGroupCascaderVisible:false,
        addApartCascaderVisible:false,

    }
  },
  components: {

  },
  props: {
    currentGroupId: {
      type: Number,
      default: null
    }
  },
  created () {
    this.reloadUsers()
  },
  methods: {
    reloadUsers () {
      let _this = this
      this.http.post('/user/all')
        .then(result => {
          _this.tableData = []
          result.data.forEach(element => {
            let id = element['id']
            let name = element['name']
            let phone = element['phone_number']
            let email = element['email']
            let groups = element['role_list']
            let aparts = element['apart_list']
            let status = element['status']
            let groupDisplayStr = ''
            let gl = groups.length
            for (let i = 0; i < gl; i++) {
              let group_item = groups[i]
              if (groupDisplayStr.length == 0) {
                groupDisplayStr = group_item.display_name
                continue
              }
              groupDisplayStr = groupDisplayStr + ',' + group_item.display_name
            }
            let al = aparts.length;
            let apartDisplayStr = ''
            for (let i = 0;i<al;i++){
                let apart_item = aparts[i]
                console.log(apart_item);
                if (apartDisplayStr.length == 0) {
                    apartDisplayStr = apart_item.name
                    continue
                }
                apartDisplayStr = apartDisplayStr + ',' + apart_item.name
            }
            let item = { id_str: id.toString(),
              id: id,
              name: name,
              email: email,
              phone_number: phone,
              status:status,
              groups: {
                display: groupDisplayStr,
                items: groups
              },
              aparts:{
                  display:apartDisplayStr,
                  items:aparts
              }
            }
            _this.tableData.push(item)
          })
        }).catch(err => {
          _this.$message({ type: 'info', message: err })
        })
    
    },
    addBtnAction (sender) {
        let _this = this;
        if (this.allRolesDisplay == null || this.allRolesDisplay.length == 0){
            this.loadAllRoles(()=>{
                _this.dialogTableVisible = true
            });
            return;
        }
        this.dialogTableVisible = true
    },
    loadAllRoles(complete){
        let _this = this;
        this.http.post('/group/all')
                .then(result=>{
                    _this.allRolesDisplay = result.data;
                    // console.log(_this.allRolesDisplay);
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
    addUserConfirmBtnAction (sender) {
        console.log(this.newUser)
        if (this.newUser.name == null || this.newUser.name.length == 0) {
            this.$message({ type: 'info', message: '名字不能为空' })
            return
        }
        if (this.newUser.password == null || this.newUser.password.length == 0) {
            this.$message({ type: 'info', message: '密码不能为空' })
            return
        }
        let params = {name: this.newUser.name,
                    password:this.newUser.password,
                    phone_number:this.newUser.phone_number,
                    email:this.newUser.email};
        this.addUserLoading = true;
        let _this = this;
        this.http.post('/user/add',params)
                .then(result=>{
                    _this.addUserLoading = false;
                    _this.dialogTableVisible = false;
                    _this.reloadUsers();
                }).catch(error=>{
                    _this.addUserLoading = false;
                    _this.dialogTableVisible = false;
                    console.error(error);
                })
    },
    deleteUserWithRow(index,data){
        let userItem = data[index];
        let params = {user_id:userItem.id}
        let _this = this;
        if (userItem.status == 1){
            return;
        }
        this.http.post('/user/delete',params)
                .then(result=>{
                    _this.reloadUsers();
                }).catch(error=>{
                    console.error(error);
                })

    },
    loadAllAparts(complete){
        let _this = this;
        this.http.post('/apart/all')
                .then(result=>{
                    let res = result.data;
                    console.log(res);
                    // _this.apartList = res;
                    let l = res.length;
                    if (l == 0){
                        return []
                    }
                    let dic = {}
                    for (let i = 0;i < l;i++){
                        let item = res[i];
                        let apartList = dic[item.parent_id];
                        if (apartList == null){
                            dic[item.parent_id] = [item];
                        }else{  
                            apartList.push(item);
                        }   
                    }
                    let rootItems = dic[0];
                    let tmpL = rootItems.length;
                    for (let i = 0;i<tmpL;i++){
                        let rootItem = rootItems[i];
                        rootItem['sub'] = _this.subApartsFor(rootItem,dic);
                    }
                    _this.apartDisplayData = rootItems;
                    if(complete){
                        complete();
                    }
                }).catch(error=>{
                    if(complete){
                        complete();
                    }
                });
    },
    subApartsFor(apart_item,tmpdic){
            let sub = tmpdic[apart_item.id];
            if (sub == null || sub.length == 0){
                return [];
            }
            let l = sub.length;
            for (let i = 0;i<l;i++){
                let item = sub[i];
                let tmplist = this.subApartsFor(item,tmpdic);
                if (tmplist.length > 0){
                    item['sub'] = tmplist
                }
            }
            return sub;
    },
    modifyUserWithRow(index,data){
        let _this = this;
        let userItem = data[index];
        // this.modifyUser = userItem;
        this.modifyUserOrigin = userItem;
        this.modifyUser.name = userItem.name;
        this.modifyUser.phone_number = userItem.phone_number;
        this.modifyUser.email = userItem.email;
        this.modifyUser.groups.items = userItem.groups.items.slice(0);
        this.modifyUser.aparts.items = userItem.aparts.items.slice(0);
        this.modifyUserVisible = true;
    },
    modifyUserConfirmBtnAction(){
        let group_will_add = [];
        let _this = this;
        this.modifyUser.groups.items.forEach(item=>{
            let needAdd = true;
            for (let i = 0; i < _this.modifyUserOrigin.groups.items.length;i++){
                let tmpItem = _this.modifyUserOrigin.groups.items[i];
                if(item.id == tmpItem.id){
                    needAdd = false;
                    break;
                }
            }
            if (needAdd == true){
                group_will_add.push(item);
            }
        });
        let group_will_delete = [];
        this.modifyUserOrigin.groups.items.forEach(item=>{
            let needDelete = true;
            for (let i = 0; i < _this.modifyUser.groups.items.length;i++){
                let tmpItem = _this.modifyUser.groups.items[i];
                if(item.id == tmpItem.id){
                    needDelete = false;
                    break;
                }
            }
            if (needDelete == true){
                group_will_delete.push(item);
            }
        });
        let tmpList = [];
        for (let i = 0;i<group_will_add.length;i++){
            let item = group_will_add[i];
            let p = {
                group_id:item.id,
                user_id:this.modifyUserOrigin.id
            }
            tmpList.push(p);
        }
        let tmpDeleteList = [];
        for(let i = 0;i<group_will_delete.length;i++){
            let item = group_will_delete[i];
            let p = {
                group_id:item.id,
                user_id:this.modifyUserOrigin.id
            }
            tmpDeleteList.push(p);
        }

        let apart_will_add = []
        this.modifyUser.aparts.items.forEach(item=>{
            let needAdd = true;
            for (let i = 0;i<_this.modifyUserOrigin.aparts.items.length;i++){
                let tmpItem = _this.modifyUserOrigin.aparts.items[i];
                if(item.id == tmpItem.id){
                    needAdd = false;
                    break;
                }
            }
            if (needAdd == true){
                apart_will_add.push(item);
            }
        });

        let apart_will_delete = [];
        this.modifyUserOrigin.aparts.items.forEach(item=>{
            let needDelete = true;
            for (let i = 0;i<_this.modifyUser.aparts.items.length;i++){
                let tmpItem = _this.modifyUser.aparts.items[i];
                if(item.id == tmpItem.id){
                    needDelete = false;
                    break;
                }
            }
            if (needDelete == true){
                apart_will_delete.push(item);
            }
        });
        let tmpapartList = [];
        for (let i = 0;i<apart_will_add.length;i++){
            let item = apart_will_add[i];
            let p = {
                apart_id:item.id,
                user_id:this.modifyUserOrigin.id
            }
            tmpapartList.push(p);
        }
        let tmpapartdeleteList = [];
        for (let i = 0;i<apart_will_delete.length;i++){
            let item = apart_will_delete[i];
            let p = {
                apart_id:item.id,
                user_id:this.modifyUserOrigin.id
            }
            tmpapartdeleteList.push(p);
        }
        let newUserName = this.modifyUser.name;
        let newEmail = (this.modifyUser.email == null || this.modifyUser.email.length == 0) ? "":this.modifyUser.email;
        let newPhoneNumber = (this.modifyUser.phone_number == null || this.modifyUser.phone_number.length == 0) ? "" :  this.modifyUser.phone_number;

        if (newUserName == null || newUserName.length == 0){
            this.$message({type: 'error', message: '员工姓名不能为空'});
            return;
        }

        let params = {
            id:this.modifyUserOrigin.id,
            name:newUserName,
            email:newEmail,
            phone_number:newPhoneNumber,
            groupaddlist:tmpList,
            groupdeletelist:tmpDeleteList,
            apartaddlist:tmpapartList,
            apartdeletelist:tmpapartdeleteList
        }

        this.modifyUserGroupsLoading = true;


        this.http.post('/user/modify',params)
                .then(result=>{
                    _this.reloadUsers();
                    _this.$message({type: 'success', message: '修改员工权限成功'});
                    _this.modifyUserGroupsLoading = false; 
                    _this.modifyUserVisible = false;
                }).catch(error=>{
                    _this.$message({type: 'info', message: '修改员工权限失败'});
                    _this.modifyUserGroupsLoading = false;
                    _this.modifyUserVisible = false;
                })


    },
    showGroupInput(){
        if (this.allRolesDisplay.length > 0){
            this.addGroupCascaderVisible = !this.addGroupCascaderVisible;
            return;
        }
        let _this = this;
        this.loadAllRoles(()=>{
            _this.addGroupCascaderVisible = !_this.addGroupCascaderVisible;
        });
    },
    showApartInput(){
        if (this.allApart.length > 0){
            this.addApartCascaderVisible = !this.addApartCascaderVisible;
            return;
        }
        let _this = this;
        this.loadAllAparts(()=>{
            _this.addApartCascaderVisible = !_this.addApartCascaderVisible;
        });
    },
    handleGroupDelete(group){
        this.modifyUser.groups.items.splice(this.modifyUser.groups.items.indexOf(group),1);
    },
    handleApartDelete(apart){
        this.modifyUser.aparts.items.splice(this.modifyUser.aparts.items.indexOf(apart),1);
    },
    handleApartChange(apart){
        this.addApartCascaderVisible = false;
        if (apart.length == 0){
            return;
        }
        let apart_item = this.$refs.addApartCascader.getCheckedNodes()[0].data;

        let needShow = true;
        for (let i = 0;i<this.modifyUser.aparts.items.length;i++){
            let item = this.modifyUser.aparts.items[i];
            if (item.id == apart_item.id){
                needShow = false;
                break;
            }
        }
        if(needShow == true){
            let newItem = {
                id:apart_item.id,
                name:apart_item.apart_name
            }
            this.modifyUser.aparts.items.push(newItem);
        }else{
            this.$message({type:'info',message:'请勿重复添加'});
        }
        this.$refs.addApartCascader.clearCheckedNodes();
    },
    handleGroupChange(group){
        this.addGroupCascaderVisible = false;
        if (group.length == 0){
            return;
        }
        let group_item = this.$refs.addGroupCascader.getCheckedNodes()[0].data;
        let needShow = true;
        for (let i = 0;i<this.modifyUser.groups.items.length;i++){
            let item = this.modifyUser.groups.items[i];
            if (item.id == group_item.id){
                needShow = false;
                break;
            } 
        }
        if (needShow == true){
            console.log(group_item);
            let newItem = {
                display_name:group_item.group_display_name,
                name:group_item.group_name,
                id:group_item.id
            }
            this.modifyUser.groups.items.push(newItem);
        }else{
            this.$message({type:'info',message:'请勿重复添加'});
        }

        this.$refs.addGroupCascader.clearCheckedNodes();
        
    }
  },
  
}
</script>
