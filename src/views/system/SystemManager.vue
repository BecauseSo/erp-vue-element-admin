<template>
    <el-container>
        <el-dialog  :close-on-press-escape=false
                        v-loading="addApartLoading"
                        element-loading-text="添加中..."
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        title="添加部门"
                        :visible.sync="dialogTableVisible" center :append-to-body='true' :lock-scroll="false" width="30%" :close-on-click-modal='false'>
                <section>
                    <el-container>
                        <el-form label-width="120px" v-model="newApart">
                            <el-row>
                                <el-col>
                                    <el-form-item label="名字" prop="name">
                                        <el-input v-model="newApart.name" clearable></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="描述" prop="des">
                                        <el-input v-model="newApart.des" clearable></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </el-container>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogTableVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addApartConfirmBtnAction() ">添 加</el-button>
                    </div>
                </section>
            </el-dialog>
        <el-main>
            <el-tree
                :data="apartDisplayData"
                node-key="id"
                default-expand-all
                :expand-on-click-node="false"
                :props="defaultProps">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                    <el-button
                        type="text"
                        size="mini"
                        title="添加"
                        @click="() => addSubApart(node,data)">
                            <i class="el-icon-plus ann"></i>
                    </el-button>
                    <el-button
                        type="text"
                        size="mini"
                        title="删除"
                        @click="() => removeApart(node, data)">
                            <i class="el-icon-minus ann"></i>
                    </el-button>
                </span>
                </span>
            </el-tree>
        </el-main>
    </el-container>



</template>

<script>


export default {
    
    data(){
        return {
            apartDisplayData:[],
            apartList:[],
            defaultProps:{
                children: 'sub',
                label: 'apart_name'
                },
            addApartLoading:false,
            dialogTableVisible:false,
            newApart:{
                name:null,
                des:null
            },
            parentApartItem:null
        }
    },

    created(){
        this.loadApartments();
    },
    methods:{
        loadApartments(){
            let _this = this;
            this.http.post('/apart/all')
                .then(result=>{
                    let res = result.data;
                    _this.apartList = res;
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
                }).catch(error=>{

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
                item['sub'] = this.subApartsFor(item,tmpdic);
            }
            return sub;
        },
        addSubApart(node,data){
            if(data == null){
                return;
            }
            this.parentApartItem = data;
            this.dialogTableVisible = true;
        },
        addApartConfirmBtnAction(){

            let params = {name:this.newApart.name,
                        des:this.newApart.des,
                        parent_id:this.parentApartItem.id};
            this.addApartLoading = true;
            let _this = this;
            this.http.post('/apart/add',params)
                    .then(result=>{
                        _this.dialogTableVisible = false;
                        _this.addApartLoading = false;
                        _this.loadApartments();
                        _this.$message({type: 'success',message: '添加部门成功'});
                    }).catch(error=>{
                        _this.addApartLoading = false;
                        _this.dialogTableVisible = false;
                        _this.$message({type: 'error',message: '添加部门失败'});
                    })

        },
        removeApart(node,data){
            let _this = this;
            this.$confirm('此操作将删除该组部门及其子部门, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {

                        console.log(data);
                        let arr = [];
                        _this.subApartListForItem(data,arr);
                        console.log(arr);
                        let params = {list:arr};
                        _this.http.post('/apart/delete',params)
                                .then(result=>{
                                    _this.$message({type: 'success',message: '删除成功!'});
                                    _this.loadApartments();
                                }).catch(error=>{
                                    _this.$message({type: 'info',message: '删除失败!'});
                                    console.log(error);
                                })
                    }).catch(() => {
                        _this.$message({type: 'info',message: '已取消删除'});          
                    });
        },
        subApartListForItem(item,arr){
            let l = item.sub.length

            arr.push({id:item.id});
            if (l == 0){
                return;
            }
            for (let i = 0;i<l;i++){
                let tmp = item.sub[i];
                this.subApartListForItem(tmp,arr);
            }
        }
    }


}


</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 2%;
  }
  .ann{
    background: #42b983;
    color: #ffffff;
    padding: 2px;
  }
  .el-tree-node__content{
    border: 1px solid #cbc7d0;
    margin: 2px 0;
    background: #ebf3f5;
  }

  .el-tree-node__content:hover {
      background-color: #42b983;
    }
</style>