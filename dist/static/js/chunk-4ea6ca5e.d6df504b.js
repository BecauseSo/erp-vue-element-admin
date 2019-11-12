(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4ea6ca5e"],{"0a0b":function(e,t,o){},"3fd2":function(e,t,o){},"64c9":function(e,t,o){"use strict";var a=o("0a0b"),i=o.n(a);i.a},d73f:function(e,t,o){"use strict";o.r(t);var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-container",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[o("el-header",[e._v("\n    店铺管理\n    "),o("el-button",{attrs:{type:"text",size:"small"},on:{click:function(t){return e.addBtnClick()}}},[e._v("+添加")]),e._v(" "),o("el-row",{attrs:{gutter:20}},[o("el-col",{attrs:{span:3}},[o("el-input",{attrs:{placeholder:"请输入内容"},on:{change:e.searchKeyWordChange},model:{value:e.inputKeyWord,callback:function(t){e.inputKeyWord=t},expression:"inputKeyWord"}})],1),e._v(" "),o("el-col",{attrs:{span:3}},[o("el-button",{on:{click:function(t){return e.searchBtnAction()}}},[e._v("搜索")])],1)],1),e._v(" "),o("shopcreate",{ref:"createShopView",attrs:{isCreate:e.isCreate,height:"0"},on:{addBtnClick:e.createCompleteWithModel,modifyBtnClick:e.modifyComplete}})],1),e._v(" "),o("el-main",[[o("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""},on:{"sort-change":e.tableSortChange}},[o("el-table-column",{attrs:{prop:"id",label:"ID",width:"50px"}}),e._v(" "),o("el-table-column",{attrs:{prop:"domain",label:"网站域名",width:"150px"}}),e._v(" "),o("el-table-column",{attrs:{prop:"receipt_paypal",label:"收款paypal",sortable:"custom",width:"150px"}}),e._v(" "),o("el-table-column",{attrs:{prop:"receipt_credit_card",label:"收款信用卡通道",sortable:"custom",width:"150px"}}),e._v(" "),o("el-table-column",{attrs:{prop:"deduction",label:"扣款方式",sortable:"custom",width:"150px"}}),e._v(" "),o("el-table-column",{attrs:{prop:"shop_api",label:"店铺API",sortable:"custom",width:"250px"}}),e._v(" "),o("el-table-column",{attrs:{prop:"authorization_erp",sortable:"custom",label:"授权ERP"}}),e._v(" "),o("el-table-column",{attrs:{prop:"company_id",sortable:"custom",label:"所属企业主体"}}),e._v(" "),o("el-table-column",{attrs:{prop:"user_id",sortable:"custom",label:"运营员工"}}),e._v(" "),o("el-table-column",{attrs:{prop:"shop_remark",label:"备注"}}),e._v(" "),o("el-table-column",{attrs:{label:"操作",width:"90px"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{type:"text",size:"small"},on:{click:function(o){return e.handleTableClick(t.row)}}},[e._v("修改")]),e._v(" "),o("el-button",{attrs:{type:"text",size:"small"},on:{click:function(o){return e.handleTableDeleteClick(t.row)}}},[e._v("移除")])]}}])})],1),e._v(" "),o("el-pagination",{attrs:{background:"","page-size":10,"current-page":e.currentPage,layout:"prev, pager, next",total:e.totalCount},on:{"current-change":e.changeCurrentPage}})]],2)],1)},i=[],l=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-container",{attrs:{height:"0"}},[o("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:e.addShopLoading,expression:"addShopLoading"}],attrs:{"close-on-press-escape":!1,"element-loading-text":e.loadingText,"element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)",title:e.title,visible:e.viewVisible,center:"","append-to-body":!0,"lock-scroll":!1,width:"60%","close-on-click-modal":!1},on:{"update:visible":function(t){e.viewVisible=t}}},[o("section",[o("el-container",[o("el-form",{attrs:{"label-width":"120px",inline:!0},model:{value:e.modifyModel,callback:function(t){e.modifyModel=t},expression:"modifyModel"}},[o("el-form-item",{attrs:{label:"网站域名"}},[o("el-input",{model:{value:e.modifyModel.domain,callback:function(t){e.$set(e.modifyModel,"domain",t)},expression:"modifyModel.domain"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"网站后台"}},[o("el-input",{model:{value:e.modifyModel.backstage,callback:function(t){e.$set(e.modifyModel,"backstage",t)},expression:"modifyModel.backstage"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"后台用户名"}},[o("el-input",{model:{value:e.modifyModel.backstage_username,callback:function(t){e.$set(e.modifyModel,"backstage_username",t)},expression:"modifyModel.backstage_username"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"后台密码"}},[o("el-input",{model:{value:e.modifyModel.backstage_password,callback:function(t){e.$set(e.modifyModel,"backstage_password",t)},expression:"modifyModel.backstage_password"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"邮箱密码"}},[o("el-input",{model:{value:e.modifyModel.email_password,callback:function(t){e.$set(e.modifyModel,"email_password",t)},expression:"modifyModel.email_password"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"收款Paypal"}},[o("el-input",{model:{value:e.modifyModel.receipt_paypal,callback:function(t){e.$set(e.modifyModel,"receipt_paypal",t)},expression:"modifyModel.receipt_paypal"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"收款信用卡通道"}},[o("el-input",{model:{value:e.modifyModel.receipt_credit_card,callback:function(t){e.$set(e.modifyModel,"receipt_credit_card",t)},expression:"modifyModel.receipt_credit_card"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"扣款方式"}},[o("el-input",{model:{value:e.modifyModel.deduction,callback:function(t){e.$set(e.modifyModel,"deduction",t)},expression:"modifyModel.deduction"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"客服邮箱"}},[o("el-input",{model:{value:e.modifyModel.customer_service_email,callback:function(t){e.$set(e.modifyModel,"customer_service_email",t)},expression:"modifyModel.customer_service_email"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"店铺API"}},[o("el-input",{model:{value:e.modifyModel.shop_api,callback:function(t){e.$set(e.modifyModel,"shop_api",t)},expression:"modifyModel.shop_api"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"授权ERP"}},[o("el-input",{model:{value:e.modifyModel.authorization_erp,callback:function(t){e.$set(e.modifyModel,"authorization_erp",t)},expression:"modifyModel.authorization_erp"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"所属企业主体"}},[o("el-autocomplete",{attrs:{"fetch-suggestions":e.queryCompanySearchAsync,placeholder:"请企业名搜索"},on:{select:e.handleSelectCompany},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.item;return[o("div",{staticClass:"name"},[e._v(e._s(a.company_name))]),e._v(" "),o("span",{staticClass:"addr"},[e._v(e._s(a.id))])]}}]),model:{value:e.company_id,callback:function(t){e.company_id=t},expression:"company_id"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"备注"}},[o("el-input",{model:{value:e.modifyModel.shop_remark,callback:function(t){e.$set(e.modifyModel,"shop_remark",t)},expression:"modifyModel.shop_remark"}})],1)],1)],1),e._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.viewVisible=!1}}},[e._v("取 消")]),e._v(" "),e.isCreate?o("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.addShopConfirmBtnAction()}}},[e._v("添 加")]):o("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.modifyShopConfirmBtnAction()}}},[e._v("修 改")])],1)],1)])],1)},n=[],s=(o("6b54"),{data:function(){return{viewVisible:!1,addShopLoading:!1,loadingText:"",company_id:"",title:"",modifyModel:{}}},props:{isCreate:!0},created:function(){},methods:{close:function(){this.closeLoading(),this.viewVisible=!1},show:function(e,t){this.viewVisible=!0,this.modifyModel=t,this.title=e,null==this.modifyModel.company_id?this.company_id="":this.company_id=this.modifyModel.company_id.toString()},loading:function(e){this.loadingText=e,this.addShopLoading=!0},closeLoading:function(){this.loadingText="",this.addShopLoading=!1},addShopConfirmBtnAction:function(){this.$emit("addBtnClick",this.modifyModel)},modifyShopConfirmBtnAction:function(){this.$emit("modifyBtnClick",this.modifyModel)},queryCompanySearchAsync:function(e,t){if(null!=e&&0!=e.length){var o={search:e};this.http.post("/company/search",o).then((function(e){t(e.data)})).catch((function(e){t([])}))}else t([])},handleSelectCompany:function(e){this.company_id=e.id.toString(),this.modifyModel.company_id=e.id}}}),r=s,c=(o("64c9"),o("2877")),d=Object(c["a"])(r,l,n,!1,null,"7e90ba68",null),p=d.exports,m={data:function(){return{tableData:[],originShopModel:null,isCreate:!0,loading:!1,currentPage:1,totalCount:0,inputKeyWord:"",order:null}},components:{shopcreate:p},created:function(){this.loadAllShop()},methods:{loadAllShop:function(e,t,o){null==e&&(e=1);var a={page:e,order:t,search:o},i=this;this.http.post("/shop/all",a).then((function(o){i.order=t,i.currentPage=e,i.totalCount=10*o.data.total_page,i.tableData=o.data.res})).catch((function(e){}))},handleTableClick:function(e){this.originShopModel=e;var t={id:e.id,domain:e.domain,backstage:e.backstage,backstage_username:e.backstage_username,backstage_password:e.backstage_password,email_password:e.email_password,receipt_paypal:e.receipt_paypal,receipt_credit_card:e.receipt_credit_card,deduction:e.deduction,customer_service_email:e.customer_service_email,shop_api:e.shop_api,authorization_erp:e.authorization_erp,company_id:e.company_id,shop_remark:e.shop_remark};this.isCreate=!1,this.$refs["createShopView"].show("修改店铺",t)},handleTableDeleteClick:function(e){var t=this,o=this;this.$confirm("此操作将删除该店铺, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(t){var a={shop_id:e.id};o.loading=!0,o.http.post("/shop/delete",a).then((function(e){o.loading=!1,o.loadAllShop(),o.$message({type:"success",message:"移除店铺成功"})})).catch((function(e){o.loading=!1,o.$message({type:"error",message:"移除店铺失败"})}))})).catch((function(e){t.$message({type:"info",message:"已取消删除"})}))},addBtnClick:function(){var e={id:null,domain:"",backstage:"",backstage_username:"",backstage_password:"",email_password:"",receipt_paypal:"",receipt_credit_card:"",deduction:"",customer_service_email:"",shop_api:"",authorization_erp:"",company_id:null,shop_remark:""};this.isCreate=!0,this.$refs["createShopView"].show("添加店铺",e)},createCompleteWithModel:function(e){var t=this,o={domain:e.domain,backstage:e.backstage,backstage_username:e.backstage_username,backstage_password:e.backstage_password,email_password:e.email_password,receipt_paypal:e.receipt_paypal,receipt_credit_card:e.receipt_credit_card,deduction:e.deduction,customer_service_email:e.customer_service_email,shop_api:e.shop_api,authorization_erp:e.authorization_erp,company_id:e.company_id,shop_remark:e.shop_remark};this.$refs["createShopView"].loading("添加中..."),this.http.post("/shop/add",o).then((function(e){t.$refs["createShopView"].close(),t.loadAllShop(),t.$message({type:"success",message:"添加店铺成功"})})).catch((function(e){console.log(e),t.$refs["createShopView"].closeLoading(),t.$message({type:"error",message:"添加店铺失败"})}))},modifyComplete:function(e){if(this.originShopModel.domain!=e.domain||this.originShopModel.backstage!=e.backstage||this.originShopModel.backstage_username!=e.backstage_username||this.originShopModel.backstage_password!=e.backstage_password||this.originShopModel.email_password!=e.email_password||this.originShopModel.receipt_paypal!=e.receipt_paypal||this.originShopModel.receipt_credit_card!=e.receipt_credit_card||this.originShopModel.deduction!=e.deduction||this.originShopModel.customer_service_email!=e.customer_service_email||this.originShopModel.authorization_erp!=e.authorization_erp||this.originShopModel.shop_api!=e.shop_api||this.originShopModel.company_id!=e.company_id||this.originShopModel.shop_remark!=e.shop_remark){var t={id:e.id,domain:null==e.domain?"":e.domain,backstage:null==e.backstage?"":e.backstage,backstage_username:null==e.backstage_username?"":e.backstage_username,backstage_password:null==e.backstage_password?"":e.backstage_password,email_password:null==e.email_password?"":e.email_password,receipt_paypal:null==e.receipt_paypal?"":e.receipt_paypal,receipt_credit_card:null==e.receipt_credit_card?"":e.receipt_credit_card,deduction:null==e.deduction?"":e.deduction,customer_service_email:null==e.customer_service_email?"":e.customer_service_email,shop_api:null==e.shop_api?"":e.shop_api,authorization_erp:null==e.authorization_erp?"":e.authorization_erp,company_id:e.company_id,shop_remark:null==e.shop_remark?"":e.shop_remark};this.$refs["createShopView"].loading("修改中...");var o=this;this.http.post("/shop/modify",t).then((function(e){o.$refs["createShopView"].close(),o.loadAllShop(),o.$message({type:"success",message:"修改店铺成功"})})).catch((function(e){o.$refs["createShopView"].closeLoading(),o.$message({type:"error",message:"修改店铺失败"})}))}else console.log("no change")},tableSortChange:function(e){e.column;var t=e.prop,o=e.order,a=0;if("descending"==o);else{if("ascending"!=o)return void this.loadAllShop(this.currentPage,null);a=1}var i={prop:t,type:a};this.loadAllShop(this.currentPage,i)},searchKeyWordChange:function(){this.searchBtnAction()},searchBtnAction:function(){this.inputKeyWord.length>0?this.loadAllShop(1,this.order,this.inputKeyWord):this.loadAllShop(1)},changeCurrentPage:function(e){this.inputKeyWord.length>0?this.loadAllShop(e,this.currentOrder,this.inputKeyWord):this.loadAllShop(e,this.currentOrder)}}},u=m,h=(o("f232"),Object(c["a"])(u,a,i,!1,null,"52a13757",null));t["default"]=h.exports},f232:function(e,t,o){"use strict";var a=o("3fd2"),i=o.n(a);i.a}}]);