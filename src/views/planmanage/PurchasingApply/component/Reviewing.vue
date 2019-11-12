<template>
<div>
     <el-container v-loading="loading">
        <el-header height="120px">
            <span>关键字</span>
            <el-input v-model="inputKeyWord" placeholder="请输入内容"></el-input>
            <el-button @click="searchBtnAction()">搜索</el-button>
            <span>创建日期</span>
            <el-date-picker type="date" placeholder="选择日期" v-model="date" style="width: 100%;"></el-date-picker>

            <el-dialog  :close-on-press-escape=false
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        :title="title"
                        :visible.sync="addProductApplyVisible" center :append-to-body='true' :lock-scroll="false" width="20%" :close-on-click-modal='false'>
            <section>
                    <el-container>
                        <el-form label-width="130px" v-model="modifyModel" >
                            <el-form-item label="申请的运营">
                                <el-autocomplete
                                    v-model="apply_yunyin_name"
                                    :fetch-suggestions="queryUserSearchAsync"
                                    placeholder="请输入用户名搜索"
                                    @select="handleSelectUser">
                                    <template slot-scope="{ item }">
                                        <div class="name">{{ item.user_name }}</div>
                                        <span class="addr">{{ item.id }}</span>
                                    </template>    
                                </el-autocomplete>
                            </el-form-item>
                            <el-form-item label="SKU">
                                <el-autocomplete
                                    v-model="apply_sku"
                                    :fetch-suggestions="querySKUSearchAsync"
                                    placeholder="请输入SKU编码搜索"
                                    @select="handleSelectSKU">
                                    <template slot-scope="{ item }">
                                        <div class="name">{{ item.SKU_code }}</div>
                                        <span class="addr">{{ item.id }}</span>
                                    </template>    
                                </el-autocomplete>
                            </el-form-item>
                            <!-- <el-form-item label="SKU">
                                <el-input v-model="modifyModel.specification"></el-input>
                            </el-form-item> -->
                            <el-form-item label="SKU名称">
                                <span v-text="skuModel.product_name + skuModel.specification"></span>
                            </el-form-item>
                            <el-form-item label="图片">
                                <el-col>
                                    <el-image :src="product_image" style="width: 120px; height: 120px" fit="contain">
                                        <div slot="error" class="image-slot" >
                                            <i class="el-icon-picture-outline"></i>
                                        </div>
                                    </el-image>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="近七天销售量">
                                <el-input v-model="modifyModel.product_size"></el-input>
                            </el-form-item>
                            <el-form-item label="前一天销量">
                                <el-input v-model="modifyModel.weight"></el-input>
                            </el-form-item>
                            <el-form-item label="申请补货数">
                                <el-input v-model="modifyModel.weight"></el-input>
                            </el-form-item>
                            <el-form-item label="备货天数">
                                <el-input v-model="modifyModel.purchasing_cycle"></el-input>
                            </el-form-item>
                            <el-form-item label="运营备注">
                                <el-input v-model="modifyModel.sensitive_information"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-container>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="addProductApplyVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addSPUConfirmBtnAction() " v-if="isCreate">添 加</el-button>
                        <el-button type="primary" @click="modifyCompanyConfirmBtnAction() " v-else>修 改</el-button>
                    </div>
            </section>
        </el-dialog>
        </el-header>
        <el-main>
            <el-container>
                <el-button @click="addPerchaseBtnAction()">新增备货</el-button>
                <el-button @click="addProductBtnAction()">补货</el-button>
            </el-container>
            <el-table
                    :data="tableData"
                    height="100%"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="id"
                        label="创建时间">
                    </el-table-column>
                    <el-table-column
                        prop="id"
                        label="创建人">
                    </el-table-column>
                    <el-table-column
                        prop="id"
                        label="申请的运营">
                    </el-table-column>
                    <el-table-column
                        prop="id"
                        label="图片">
                    </el-table-column>
                    <el-table-column
                        prop="id"
                        label="SKU">
                    </el-table-column>
                    <el-table-column
                        prop="id"
                        label="补货数">
                    </el-table-column>
                    <el-table-column
                        prop="id"
                        label="备货天数">
                    </el-table-column>
            </el-table>
        </el-main>
     </el-container>
     </div>
</template>


<script>

import AddProductApply from './AddProductApply'

export default {
    components:{
        'addproductapply':AddProductApply
    },
    data(){
        return{
            loading:false,
            inputKeyWord:'',
            currentPage:0,
            date:null,
            addProductApplyVisible:false,
            title:'补货申请',
            modifyModel:{},
            product_image:'',
            isCreate:true,
            apply_yunyin_name:'',
            apply_yunyin_id:null,
            skuModel:{
                product_name:'',
                specification:''
            },
            apply_sku_id:null,
            apply_sku:'',
            tableData:[]
        }
    },
    created(){
        this.loadReviewingWithPage(this.currentPage);
    },
    methods:{
        loadReviewingWithPage(page){
            if (page == null){
                page = 0;
            }
            let params = {
                page:page
            }
            // this.http.post('',page)
            //     .then(result=>{

            //     }).catch(error=>{

            //     })
        },
        searchBtnAction(){

        },
        addPerchaseBtnAction(){

        },
        addProductBtnAction(){
            this.addProductApplyVisible = true;
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
            this.apply_yunyin_name = item.user_name;
            this.apply_yunyin_id = item.id;
        },
        querySKUSearchAsync(queryString,cb){
            if (queryString == null || queryString.length == 0){
                cb([]);
                return;
            }
            let params = {
                search:queryString
            }
            this.http.post('/sku/search',params)
                    .then(result=>{
                        cb(result.data);
                    }).catch(error=>{
                        cb([]);
                    })
        },
        handleSelectSKU(item){
            console.log(item);
            this.apply_sku = item.SKU_code;
            this.apply_sku_id = item.id;
            this.skuModel = item;
            this.product_image = item.image;
        },
    }
}
</script>