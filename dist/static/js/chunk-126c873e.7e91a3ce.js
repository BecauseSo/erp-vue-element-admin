(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-126c873e"],{"90e3":function(e,t,n){},b0c9:function(e,t,n){"use strict";var o=n("e2cd"),a=n.n(o);a.a},c0df:function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[n("el-header",[n("el-row",{staticStyle:{"padding-top":"20px"}},[n("el-col",{attrs:{span:5}},[n("el-input",{attrs:{placeholder:"请输入店铺名"},on:{change:e.searchKeyWordChange},model:{value:e.inputKeyWord,callback:function(t){e.inputKeyWord=t},expression:"inputKeyWord"}})],1),e._v(" "),n("el-col",{attrs:{span:2}},[n("el-button",{staticClass:"head-but",attrs:{icon:"el-icon-search",type:"primary"},on:{click:function(t){return e.searchBtnAction()}}})],1),e._v(" "),n("el-col",{attrs:{span:2}},[n("el-button",{staticClass:"head-but",attrs:{icon:"el-icon-circle-plus-outline",type:"primary"},on:{click:function(t){return e.addBtnClick()}}},[e._v("\n                添加\n                ")])],1)],1),e._v(" "),n("companycreate",{ref:"createCompanyView",attrs:{modifyModel:e.modifyModel,isCreate:e.isCreate},on:{addBtnClick:e.createCompleteWithModel,modifyBtnClick:e.modifyComplete}})],1),e._v(" "),n("el-main",[n("el-container",[n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,fit:"",border:""},on:{"sort-change":e.tableSortChange}},[n("el-table-column",{attrs:{prop:"id",label:"ID"}}),e._v(" "),n("el-table-column",{attrs:{prop:"agent",sortable:"custom",label:"代理商"}}),e._v(" "),n("el-table-column",{attrs:{sortable:"",prop:"company_name",label:"公司名称"}}),e._v(" "),n("el-table-column",{attrs:{sortable:"",prop:"account_status",label:"开户状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e.companyStatus[t.row.account_status]))])]}}])}),e._v(" "),n("el-table-column",{attrs:{sortable:"",prop:"logout_time",label:"下户时间"}}),e._v(" "),n("el-table-column",{attrs:{sortable:"",label:"账户数量",prop:"account_count",width:"150px"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.account_count))])]}}])}),e._v(" "),n("el-table-column",{attrs:{sortable:"",prop:"unlimit_count",label:"不限额数量"}}),e._v(" "),n("el-table-column",{attrs:{sortable:"",prop:"logout_time",label:"所属人"},scopedSlots:e._u([{key:"default",fn:function(t){return[null!=t.row.belong_to?n("span",[e._v(e._s(t.row.belong_to.user_name))]):e._e()]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"company_remark",label:"备注"}}),e._v(" "),n("el-table-column",{attrs:{label:"操作",width:"90px"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return e.handleTableClick(t.row)}}},[e._v("修改")]),e._v(" "),n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return e.handleTableDeleteClick(t.row)}}},[e._v("移除")])]}}])})],1)],1),e._v(" "),n("el-pagination",{attrs:{background:"","page-size":10,"current-page":e.currentPage,layout:"prev, pager, next",total:e.totalCount},on:{"current-change":e.changeCurrentPage}})],1)],1)},a=[],i=(n("ac6a"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",{attrs:{height:"0"}},[n("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:e.addCompanyLoading,expression:"addCompanyLoading"}],attrs:{"close-on-press-escape":!1,"element-loading-text":e.loadingText,"element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)",title:e.title,visible:e.viewVisible,center:"","append-to-body":!0,"lock-scroll":!1,width:"60%","close-on-click-modal":!1},on:{"update:visible":function(t){e.viewVisible=t}}},[n("section",[n("el-container",[n("el-form",{ref:"modifyModel",attrs:{"label-width":"130px",rules:e.rules,model:e.modifyModel,inline:!0}},[n("el-form-item",{attrs:{label:"代理商",prop:"agent"}},[n("el-input",{model:{value:e.modifyModel.agent,callback:function(t){e.$set(e.modifyModel,"agent",t)},expression:"modifyModel.agent"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"公司名称",prop:"company_name"}},[n("el-input",{model:{value:e.modifyModel.company_name,callback:function(t){e.$set(e.modifyModel,"company_name",t)},expression:"modifyModel.company_name"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"营业执照图片",prop:"business_license_image"}},[n("el-image",{staticStyle:{width:"185px",height:"185px"},attrs:{src:e.modifyModel.business_license_image,fit:"contain"}}),e._v(" "),n("input",{ref:"fileInput",attrs:{type:"file"},on:{change:e.displayImage}})],1),e._v(" "),n("el-form-item",{attrs:{label:"广告主联系人姓名",prop:"ad_connect_name"}},[n("el-input",{model:{value:e.modifyModel.ad_connect_name,callback:function(t){e.$set(e.modifyModel,"ad_connect_name",t)},expression:"modifyModel.ad_connect_name"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"广告主联系人邮箱",prop:"ad_connect_email"}},[n("el-input",{model:{value:e.modifyModel.ad_connect_email,callback:function(t){e.$set(e.modifyModel,"ad_connect_email",t)},expression:"modifyModel.ad_connect_email"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"FB粉丝页链接"}},[e._l(e.modifyModel.fans,(function(t){return n("el-tag",{key:t,attrs:{closable:"","disable-transitions":!1},on:{close:function(n){return e.fanHandleClose(t)}}},[e._v("\n                                    "+e._s(t)+"\n                                    ")])})),e._v(" "),e.fanInputVisible?n("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",attrs:{size:"small"},on:{blur:e.handleFanInputConfirm},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFanInputConfirm(t)}},model:{value:e.fanInputValue,callback:function(t){e.fanInputValue=t},expression:"fanInputValue"}}):n("el-button",{staticClass:"button-new-tag",staticStyle:{width:"185px"},attrs:{size:"small"},on:{click:e.showFanInput}},[e._v("+ New Tag")])],2),e._v(" "),n("el-form-item",{attrs:{label:"时区"}},[n("el-input",{model:{value:e.modifyModel.time_zone,callback:function(t){e.$set(e.modifyModel,"time_zone",t)},expression:"modifyModel.time_zone"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"BM"}},[n("el-input",{model:{value:e.modifyModel.BM,callback:function(t){e.$set(e.modifyModel,"BM",t)},expression:"modifyModel.BM"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"开户状态"}},[n("el-select",{staticStyle:{width:"185px"},attrs:{placeholder:"请选择"},model:{value:e.modifyModel.account_status,callback:function(t){e.$set(e.modifyModel,"account_status",t)},expression:"modifyModel.account_status"}},e._l(e.statusOptions,(function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),e._v(" "),n("el-form-item",{attrs:{label:"下户时间"}},[n("el-input",{model:{value:e.modifyModel.logout_time,callback:function(t){e.$set(e.modifyModel,"logout_time",t)},expression:"modifyModel.logout_time"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"BM API"}},[n("el-input",{model:{value:e.modifyModel.BMAPI,callback:function(t){e.$set(e.modifyModel,"BMAPI",t)},expression:"modifyModel.BMAPI"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"备注"}},[n("el-input",{model:{value:e.modifyModel.company_remark,callback:function(t){e.$set(e.modifyModel,"company_remark",t)},expression:"modifyModel.company_remark"}})],1)],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.dialogTableVisible=!1}}},[e._v("取 消")]),e._v(" "),e.isCreate?n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.addCompanyConfirmBtnAction(e.modifyModel)}}},[e._v("添 加")]):n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.modifyCompanyConfirmBtnAction(e.modifyModel)}}},[e._v("修 改")])],1)],1)])],1)}),l=[],s={data:function(){return{title:"",addCompanyLoading:!1,viewVisible:!1,loadingText:"",previewImageSrc:"",statusOptions:[{value:0,label:"审核成功"},{value:1,label:"审核中"},{value:2,label:"审核失败"}],fanInputVisible:!1,fanInputValue:"",imageFile:null,rules:{agent:[{required:!0,message:"请输入代理商",trigger:"blur"}],company_name:[{required:!0,message:"请输入公司名称",trigger:"change"}],business_license_image:[{required:!0,message:"请上传营业执照",trigger:"change"}],ad_connect_name:[{required:!0,message:"请填写广告主联系人姓名",trigger:"change"}],ad_connect_email:[{required:!0,message:"请填写广告主联系人邮箱",trigger:"change"}]}}},props:{originModel:null,modifyModel:null,isCreate:!0},methods:{close:function(){this.imageFile=null,this.closeLoading(),this.viewVisible=!1},show:function(e){this.title=e,this.viewVisible=!0},loading:function(e){this.loadingText=e,this.addCompanyLoading=!0},closeLoading:function(){this.loadingText="",this.addCompanyLoading=!1},addCompanyConfirmBtnAction:function(e){var t=this;this.$refs.modifyModel.validate((function(e){if(!e)return t.$message.error("信息未填写完整，请仔细检查表单!"),!1;if(null!=t.imageFile){var n=t;t.addCompanyLoading=!0,t.http.uploadFile("/company/license/upload",t.imageFile).then((function(e){n.imageFile=null,n.addCompanyLoading=!1;var t=e.data.url;n.modifyModel.business_license_image=t,n.$emit("addBtnClick")})).catch((function(e){console.log(e),n.addCompanyLoading=!1,n.$message({type:"error",message:"上传图片失败"})}))}else t.$emit("addBtnClick")}))},modifyCompanyConfirmBtnAction:function(){var e=this;this.$refs.modifyModel.validate((function(t){if(!t)return e.$message.error("信息未填写完整，请仔细检查表单!"),!1;if(null!=e.imageFile){var n=e;e.addCompanyLoading=!0,e.http.uploadFile("/company/license/upload",e.imageFile).then((function(e){n.imageFile=null,n.addCompanyLoading=!1;var t=e.data.url;n.modifyModel.business_license_image=t,n.$emit("modifyBtnClick")})).catch((function(e){console.log(e),n.addCompanyLoading=!1,n.$message({type:"error",message:"上传图片失败"})}))}else e.$emit("modifyBtnClick")}))},displayImage:function(){var e=this.$refs.fileInput.files[0];this.imageFile=e;var t=new FileReader,n=this;t.onload=function(e){n.modifyModel.business_license_image=e.target.result},t.readAsDataURL(e)},handleFanInputConfirm:function(){var e=this.fanInputValue;e&&(null==this.modifyModel.fans&&(this.modifyModel.fans=[]),this.modifyModel.fans.push(e)),this.fanInputVisible=!1,this.fanInputValue=""},fanHandleClose:function(e){this.modifyModel.fans.splice(this.modifyModel.fans.indexOf(e),1)},showFanInput:function(){this.fanInputVisible=!0;var e=this;this.$nextTick((function(t){e.$refs.saveTagInput.$refs.input.focus()}))}}},c=s,d=(n("b0c9"),n("2877")),m=Object(d["a"])(c,i,l,!1,null,"5beabe2f",null),r=m.exports,u={data:function(){return{inputKeyWord:"",loading:!1,tableData:[],fileList:[],previewImageSrc:"",file:null,isCreate:!0,currentPage:1,currentOrder:null,totalCount:0,companyStatus:["审核成功","审核中","审核失败"],modifyModel:{BM:"",BMAPI:"",account_status:0,ad_connect_email:"",ad_connect_name:"",agent:"",company_name:"",company_remark:"",logout_time:"",time_zone:"",fans:[],business_license_image:null,account_count:0,unlimit_count:0},originModel:null}},components:{companycreate:r},created:function(){this.loadCompany()},methods:{loadCompany:function(e,t,n){this.currentPage=e,this.currentOrder=t,null==e&&(e=1);var o=this,a={page:e,order:t,search:n};this.http.post("/company/all",a).then((function(e){o.tableData=[];var t=e.data.total_page;o.currentPage=e.data.current_page,o.totalCount=10*t,e.data.res.forEach((function(e){var t=e.fanslink,n=[];t.length>0&&(n=JSON.parse(t));var a={id:e.id,BM:e.BM,BMAPI:e.BMAPI,account_status:e.account_status,ad_connect_email:e.ad_connect_email,ad_connect_name:e.ad_connect_name,agent:e.agent,company_name:e.company_name,company_remark:e.company_remark,logout_time:e.logout_time,time_zone:e.time_zone,fans:n,business_license_image:e.business_license_image,account_count:e.account_count,unlimit_count:e.unlimit_count};o.tableData.push(a)}))})).catch((function(e){}))},addBtnClick:function(){this.isCreate=!0,this.modifyModel={BM:"",BMAPI:"",account_status:0,ad_connect_email:"",ad_connect_name:"",agent:"",company_name:"",company_remark:"",logout_time:"",time_zone:"",fans:[],business_license_image:null},this.$refs.createCompanyView.show("添加企业主体")},createCompleteWithModel:function(){var e="";this.modifyModel.fans.length>0&&(e=JSON.stringify(this.modifyModel.fans));var t={agent:this.modifyModel.agent,company_name:this.modifyModel.company_name,business_license_image:null==this.modifyModel.business_license_image?"":this.modifyModel.business_license_image,ad_connect_name:this.modifyModel.ad_connect_name,ad_connect_email:this.modifyModel.ad_connect_email,time_zone:this.modifyModel.time_zone,BM:this.modifyModel.BM,account_status:this.modifyModel.account_status,logout_time:this.modifyModel.logout_time,BMAPI:this.modifyModel.BMAPI,company_remark:this.modifyModel.company_remark,fans:e},n=this;n.$refs.createCompanyView.loading("正在添加..."),this.http.post("/company/add",t).then((function(e){n.modifyModel={BM:"",BMAPI:"",account_status:0,ad_connect_email:"",ad_connect_name:"",agent:"",company_name:"",company_remark:"",logout_time:"",time_zone:"",fans:[],business_license_image:null},n.$refs.createCompanyView.close(),n.$message({type:"success",message:"添加企业主体成功"}),n.loadCompany()})).catch((function(e){n.$refs.createCompanyView.closeLoading(),n.$message({type:"error",message:"添加企业主体失败"})}))},modifyComplete:function(){var e=this,t=JSON.stringify(this.modifyModel.fans),n=JSON.stringify(this.originModel.fans);if(t==n&&this.modifyModel.BM==this.originModel.BM&&this.modifyModel.BMAPI==this.originModel.BMAPI&&this.modifyModel.account_status==this.originModel.account_status&&this.modifyModel.ad_connect_email==this.originModel.ad_connect_email&&this.modifyModel.ad_connect_name==this.originModel.ad_connect_name&&this.modifyModel.agent==this.originModel.agent&&this.modifyModel.company_name==this.originModel.company_name&&this.modifyModel.company_remark==this.originModel.company_remark&&this.modifyModel.logout_time==this.originModel.logout_time&&this.modifyModel.time_zone==this.originModel.time_zone&&this.modifyModel.business_license_image==this.originModel.business_license_image)return this.modifyModel={BM:"",BMAPI:"",account_status:0,ad_connect_email:"",ad_connect_name:"",agent:"",company_name:"",company_remark:"",logout_time:"",time_zone:"",fans:[],business_license_image:null},this.originModel=null,void this.$refs.createCompanyView.close();var o={id:this.originModel.id,agent:this.modifyModel.agent,company_name:this.modifyModel.company_name,business_license_image:null==this.modifyModel.business_license_image?"":this.modifyModel.business_license_image,ad_connect_name:this.modifyModel.ad_connect_name,ad_connect_email:this.modifyModel.ad_connect_email,time_zone:this.modifyModel.time_zone,BM:this.modifyModel.BM,account_status:this.modifyModel.account_status,logout_time:this.modifyModel.logout_time,BMAPI:this.modifyModel.BMAPI,company_remark:this.modifyModel.company_remark,fans:t};this.http.post("/company/modify",o).then((function(t){e.modifyModel={BM:"",BMAPI:"",account_status:0,ad_connect_email:"",ad_connect_name:"",agent:"",company_name:"",company_remark:"",logout_time:"",time_zone:"",fans:[],business_license_image:null},e.originModel=null,e.$refs.createCompanyView.close(),e.$message({type:"success",message:"修改企业主体成功"}),e.loadCompany()})).catch((function(t){e.$refs.createCompanyView.closeLoading(),e.$message({type:"error",message:"修改企业主体失败"})}))},handleTableClick:function(e){this.originModel=e;for(var t=[],n=0;n<e.fans.length;n++){var o=e.fans[n];t.push(o)}this.modifyModel={BM:e.BM,BMAPI:e.BMAPI,account_status:e.account_status,ad_connect_email:e.ad_connect_email,ad_connect_name:e.ad_connect_name,agent:e.agent,company_name:e.company_name,company_remark:e.company_remark,logout_time:e.logout_time,time_zone:e.time_zone,fans:t,business_license_image:e.business_license_image},this.isCreate=!1,this.$refs.createCompanyView.show("修改企业主体")},handleTableDeleteClick:function(e){var t=this;this.$confirm("此操作将删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var n={id:e.id};t.loading=!0;var o=t;t.http.post("/company/delete",n).then((function(e){o.loading=!1,o.$message({type:"success",message:"移除企业主体成功"}),o.loadCompany()})).catch((function(e){t.loading=!1,o.$message({type:"error",message:"移除企业主体失败"})}))})).catch((function(){t.$message({type:"info",message:"已取消删除"})}))},tableSortChange:function(e){e.column;var t=e.prop,n=e.order,o=0;if("descending"==n);else{if("ascending"!=n)return void this.loadCompany(this.currentPage,null);o=1}var a={prop:t,type:o};this.loadCompany(this.currentPage,a)},searchKeyWordChange:function(e){this.searchBtnAction()},searchBtnAction:function(){this.inputKeyWord.length>0?this.loadCompany(1,this.order,this.inputKeyWord):this.loadCompany(1)},changeCurrentPage:function(e){this.inputKeyWord.length>0?this.loadCompany(e,this.currentOrder,this.inputKeyWord):this.loadCompany(e,this.currentOrder)}}},_=u,f=(n("e0db"),Object(d["a"])(_,o,a,!1,null,"3941c438",null));t["default"]=f.exports},e0db:function(e,t,n){"use strict";var o=n("90e3"),a=n.n(o);a.a},e2cd:function(e,t,n){}}]);