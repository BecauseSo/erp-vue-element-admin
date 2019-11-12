(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2097e9"],{a8fb:function(e,l,t){"use strict";t.r(l);var o=function(){var e=this,l=e.$createElement,t=e._self._c||l;return t("el-container",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[t("el-header"),e._v(" "),t("el-main",[t("el-container",[t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[t("el-table-column",{attrs:{label:"产品图片",width:"150px"},scopedSlots:e._u([{key:"default",fn:function(e){return[t("el-image",{staticStyle:{width:"120px",height:"120px"},attrs:{src:e.row.product_image,fit:"contain"}})]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"product_name",label:"产品名称"}}),e._v(" "),t("el-table-column",{attrs:{label:"SKU"},scopedSlots:e._u([{key:"default",fn:function(l){return e._l(l.row.sku_list,(function(l){return t("p",[e._v("\n                            "+e._s(l.SKU_code)+"\n                        ")])}))}}])}),e._v(" "),t("el-table-column",{attrs:{label:"规格",width:"220px"},scopedSlots:e._u([{key:"default",fn:function(l){return e._l(l.row.sku_list,(function(l){return t("p",[e._v("\n                            "+e._s(l.specification)+"-"+e._s(l.product_size)+"cm\n                        ")])}))}}])}),e._v(" "),t("el-table-column",{attrs:{label:"采购价(元)"},scopedSlots:e._u([{key:"default",fn:function(l){return e._l(l.row.sku_list,(function(l){return t("p",[e._v("\n                            "+e._s(l.buy_price)+"\n                        ")])}))}}])}),e._v(" "),t("el-table-column",{attrs:{label:"含包装的重量(克)"},scopedSlots:e._u([{key:"default",fn:function(l){return e._l(l.row.sku_list,(function(l){return t("p",[e._v("\n                            "+e._s(l.weight)+"\n                        ")])}))}}])}),e._v(" "),t("el-table-column",{attrs:{label:"采购周期"},scopedSlots:e._u([{key:"default",fn:function(l){return e._l(l.row.sku_list,(function(l){return t("p",[e._v("\n                            "+e._s(l.purchasing_cycle)+"\n                        ")])}))}}])}),e._v(" "),t("el-table-column",{attrs:{label:"敏感信息"},scopedSlots:e._u([{key:"default",fn:function(l){return e._l(l.row.sku_list,(function(l){return t("p",[e._v("\n                            "+e._s(l.sensitive_information)+"\n                        ")])}))}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"start_values",label:"起批量"}}),e._v(" "),t("el-table-column",{attrs:{label:"货源地址"},scopedSlots:e._u([{key:"default",fn:function(l){return[t("a",{attrs:{href:l.row.product_link}},[e._v(e._s(l.row.product_link))])]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"create_time",label:"创建时间"}}),e._v(" "),t("el-table-column",{attrs:{label:"申请状态"},scopedSlots:e._u([{key:"default",fn:function(l){return[t("span",[e._v(e._s(e.apply_status[l.row.apply_status]))])]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"SPU_remark",label:"备注"}}),e._v(" "),t("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(l){return[t("el-button",{attrs:{type:"text",size:"small"},on:{click:function(t){return e.handleTableClick(l.row)}}},[e._v("查看")])]}}])})],1)],1)],1)],1)},i=[],a=function(){var e=this,l=e.$createElement,t=e._self._c||l;return t("el-container",{attrs:{height:"0"}},[t("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:e.addSKULoading,expression:"addSKULoading"}],attrs:{"close-on-press-escape":!1,"element-loading-text":e.loadingText,"element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)",title:e.title,visible:e.viewVisible,center:"","append-to-body":!0,"lock-scroll":!1,width:"60%","close-on-click-modal":!1},on:{"update:visible":function(l){e.viewVisible=l}}},[t("section",[t("el-container",[t("el-form",{attrs:{"label-width":"130px",inline:!0},model:{value:e.modifyModel,callback:function(l){e.modifyModel=l},expression:"modifyModel"}},[t("el-form-item",{attrs:{label:"SPU ID"}},[t("el-autocomplete",{attrs:{"fetch-suggestions":e.querySPUSearchAsync,placeholder:"输入SKU码或产品名搜索"},on:{select:e.handleSelectSPU},scopedSlots:e._u([{key:"default",fn:function(l){var o=l.item;return[t("div",{staticClass:"name"},[e._v(e._s(o.product_name))]),e._v(" "),t("span",{staticClass:"addr"},[e._v(e._s(o.idSPUApply))])]}}]),model:{value:e.spu_id,callback:function(l){e.spu_id=l},expression:"spu_id"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"SKU编码"}},[t("el-input",{model:{value:e.modifyModel.SKU_code,callback:function(l){e.$set(e.modifyModel,"SKU_code",l)},expression:"modifyModel.SKU_code"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"颜色/规格"}},[t("el-input",{model:{value:e.modifyModel.specification,callback:function(l){e.$set(e.modifyModel,"specification",l)},expression:"modifyModel.specification"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"图片"}},[t("el-col",[t("el-image",{staticStyle:{width:"120px",height:"120px"},attrs:{src:e.product_image,fit:"contain"}})],1),e._v(" "),t("el-col",[t("input",{ref:"fileInput",attrs:{type:"file"},on:{change:e.displayImage}})])],1),e._v(" "),t("el-form-item",{attrs:{label:"采购价格"}},[t("el-input",{model:{value:e.modifyModel.buy_price,callback:function(l){e.$set(e.modifyModel,"buy_price",l)},expression:"modifyModel.buy_price"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"产品包装尺寸"}},[t("el-input",{model:{value:e.modifyModel.product_size,callback:function(l){e.$set(e.modifyModel,"product_size",l)},expression:"modifyModel.product_size"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"含包装的重量(克)"}},[t("el-input",{model:{value:e.modifyModel.weight,callback:function(l){e.$set(e.modifyModel,"weight",l)},expression:"modifyModel.weight"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"采购周期"}},[t("el-input",{model:{value:e.modifyModel.purchasing_cycle,callback:function(l){e.$set(e.modifyModel,"purchasing_cycle",l)},expression:"modifyModel.purchasing_cycle"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"敏感信息"}},[t("el-input",{model:{value:e.modifyModel.sensitive_information,callback:function(l){e.$set(e.modifyModel,"sensitive_information",l)},expression:"modifyModel.sensitive_information"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"状态"}},[t("el-select",{attrs:{placeholder:"请选择"},model:{value:e.modifyModel.SKU_apply_status,callback:function(l){e.$set(e.modifyModel,"SKU_apply_status",l)},expression:"modifyModel.SKU_apply_status"}},e._l(e.apply_status,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),e._v(" "),t("el-form-item",{attrs:{label:"备注"}},[t("el-input",{model:{value:e.modifyModel.SKU_remark,callback:function(l){e.$set(e.modifyModel,"SKU_remark",l)},expression:"modifyModel.SKU_remark"}})],1)],1)],1),e._v(" "),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(l){e.viewVisible=!1}}},[e._v("取 消")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:function(l){return e.modifyCompanyConfirmBtnAction()}}},[e._v("修 改")])],1)],1)])],1)},n=[],s=(t("6b54"),{data:function(){return{addSKULoading:!1,loadingText:"",viewVisible:!1,title:"",spu_id:"",imageFile:null,product_image:null,apply_status:[{value:0,label:"通过"},{value:1,label:"申请中"},{value:2,label:"驳回"}],modifyModel:{}}},props:{},methods:{close:function(){this.imageFile=null,this.closeLoading(),this.viewVisible=!1},show:function(e,l){console.log(l),this.title=e,this.viewVisible=!0,this.modifyModel=l,null==this.modifyModel.spu_apply_id?this.spu_id="":this.spu_id=this.modifyModel.spu_apply_id.toString(),this.product_image=this.modifyModel.image},loading:function(e){this.loadingText=e,this.addSKULoading=!0},closeLoading:function(){this.loadingText="",this.addSKULoading=!1},addSPUConfirmBtnAction:function(){if(null!=this.imageFile){var e=this;this.http.uploadFile("/sku/product/image/upload",this.imageFile).then((function(l){e.imageFile=null,e.addSKULoading=!1;var t=l.data.url;e.modifyModel.image=t,e.$emit("addBtnClick",e.modifyModel)})).catch((function(l){console.log(l),e.addSKULoading=!1,e.$message({type:"error",message:"上传图片失败"})}))}else this.$emit("addBtnClick",this.modifyModel)},modifyCompanyConfirmBtnAction:function(){if(null!=this.imageFile){var e=this;this.http.uploadFile("/sku/product/image/upload",this.imageFile).then((function(l){e.imageFile=null,e.addSKULoading=!1;var t=l.data.url;e.modifyModel.image=t,e.$emit("modifyBtnClick",e.modifyModel)})).catch((function(l){console.log(l),e.addSKULoading=!1,e.$message({type:"error",message:"上传图片失败"})}))}else this.$emit("modifyBtnClick",this.modifyModel)},querySPUSearchAsync:function(e,l){if(null!=e&&0!=e.length){var t=this.$store.getters.getUserInfo();null==t&&this.http.toLogin();var o=t.id,i={search:e,user_id:o};this.http.post("/spu/user/apply/search",i).then((function(e){console.log(e.data),l(e.data)})).catch((function(e){l([])}))}else l([])},handleSelectSPU:function(e){this.spu_id=e.idSPUApply.toString(),this.modifyModel.spu_apply_id=e.idSPUApply,this.modifyModel.spu_id=e.SPU_total_id},displayImage:function(){var e=this.$refs.fileInput.files[0];this.imageFile=e;var l=new FileReader,t=this;l.onload=function(e){t.product_image=e.target.result},l.readAsDataURL(e)}}}),d=s,r=t("2877"),u=Object(r["a"])(d,a,n,!1,null,null,null),c=(u.exports,function(){var e=this,l=e.$createElement,t=e._self._c||l;return t("el-container",{attrs:{height:"0"}},[t("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:e.addSPULoading,expression:"addSPULoading"}],attrs:{"close-on-press-escape":!1,"element-loading-text":e.loadingText,"element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)",title:e.title,visible:e.viewVisible,center:"","append-to-body":!0,"lock-scroll":!1,width:"60%","close-on-click-modal":!1},on:{"update:visible":function(l){e.viewVisible=l}}},[t("section",[t("el-container",[t("el-form",{attrs:{"label-width":"130px",inline:!0},model:{value:e.modifyModel,callback:function(l){e.modifyModel=l},expression:"modifyModel"}},[t("el-form-item",{attrs:{label:"SPU编码"}},[t("el-input",{model:{value:e.modifyModel.SPU_code,callback:function(l){e.$set(e.modifyModel,"SPU_code",l)},expression:"modifyModel.SPU_code"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"产品名"}},[t("el-input",{model:{value:e.modifyModel.product_name,callback:function(l){e.$set(e.modifyModel,"product_name",l)},expression:"modifyModel.product_name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"产品图片"}},[t("el-col",[t("el-image",{staticStyle:{width:"120px",height:"120px"},attrs:{src:e.product_image,fit:"contain"}})],1),e._v(" "),t("el-col",[t("input",{ref:"imageInput",attrs:{type:"file"},on:{change:e.displayImage}})])],1),e._v(" "),t("el-form-item",{attrs:{label:"对标/视频链接"}},[t("el-input",{model:{value:e.modifyModel.video_link,callback:function(l){e.$set(e.modifyModel,"video_link",l)},expression:"modifyModel.video_link"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"销售量"}},[t("el-input",{model:{value:e.modifyModel.sales,callback:function(l){e.$set(e.modifyModel,"sales",l)},expression:"modifyModel.sales"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"货源地址"}},[t("el-input",{model:{value:e.modifyModel.product_link,callback:function(l){e.$set(e.modifyModel,"product_link",l)},expression:"modifyModel.product_link"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"是否仿品山寨"}},[t("el-select",{attrs:{placeholder:"请选择"},model:{value:e.modifyModel.is_fake,callback:function(l){e.$set(e.modifyModel,"is_fake",l)},expression:"modifyModel.is_fake"}},e._l(e.boolOption,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),e._v(" "),t("el-form-item",{attrs:{label:"是否带电池"}},[t("el-select",{attrs:{placeholder:"请选择"},model:{value:e.modifyModel.has_battery,callback:function(l){e.$set(e.modifyModel,"has_battery",l)},expression:"modifyModel.has_battery"}},e._l(e.boolOption,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),e._v(" "),t("el-form-item",{attrs:{label:"是否侵权"}},[t("el-select",{attrs:{placeholder:"请选择"},model:{value:e.modifyModel.is_infringement,callback:function(l){e.$set(e.modifyModel,"is_infringement",l)},expression:"modifyModel.is_infringement"}},e._l(e.boolOption,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),e._v(" "),t("el-form-item",{attrs:{label:"是否带磁"}},[t("el-select",{attrs:{placeholder:"请选择"},model:{value:e.modifyModel.has_magnetism,callback:function(l){e.$set(e.modifyModel,"has_magnetism",l)},expression:"modifyModel.has_magnetism"}},e._l(e.boolOption,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),e._v(" "),t("el-form-item",{attrs:{label:"是否液体"}},[t("el-select",{attrs:{placeholder:"请选择"},model:{value:e.modifyModel.is_liquid,callback:function(l){e.$set(e.modifyModel,"is_liquid",l)},expression:"modifyModel.is_liquid"}},e._l(e.boolOption,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),e._v(" "),t("el-form-item",{attrs:{label:"是否粉末"}},[t("el-select",{attrs:{placeholder:"请选择"},model:{value:e.modifyModel.is_powder,callback:function(l){e.$set(e.modifyModel,"is_powder",l)},expression:"modifyModel.is_powder"}},e._l(e.boolOption,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),e._v(" "),t("el-form-item",{attrs:{label:"是否需要定制"}},[t("el-select",{attrs:{placeholder:"请选择"},model:{value:e.modifyModel.need_custom_made,callback:function(l){e.$set(e.modifyModel,"need_custom_made",l)},expression:"modifyModel.need_custom_made"}},e._l(e.boolOption,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),e._v(" "),t("el-form-item",{attrs:{label:"有无独立包装"}},[t("el-select",{attrs:{placeholder:"请选择"},model:{value:e.modifyModel.individual_package,callback:function(l){e.$set(e.modifyModel,"individual_package",l)},expression:"modifyModel.individual_package"}},e._l(e.boolOption,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),e._v(" "),t("el-form-item",{attrs:{label:"是否有货"}},[t("el-select",{attrs:{placeholder:"请选择"},model:{value:e.modifyModel.is_in_stock,callback:function(l){e.$set(e.modifyModel,"is_in_stock",l)},expression:"modifyModel.is_in_stock"}},e._l(e.boolOption,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),e._v(" "),t("el-form-item",{attrs:{label:"投放区域"}},[t("el-input",{model:{value:e.modifyModel.area,callback:function(l){e.$set(e.modifyModel,"area",l)},expression:"modifyModel.area"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"起批量"}},[t("el-input",{model:{value:e.modifyModel.start_values,callback:function(l){e.$set(e.modifyModel,"start_values",l)},expression:"modifyModel.start_values"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"支持语言"}},[t("el-input",{model:{value:e.modifyModel.language,callback:function(l){e.$set(e.modifyModel,"language",l)},expression:"modifyModel.language"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"运费"}},[t("el-input",{model:{value:e.modifyModel.freight,callback:function(l){e.$set(e.modifyModel,"freight",l)},expression:"modifyModel.freight"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"插头类型"}},[t("el-input",{model:{value:e.modifyModel.plug_type,callback:function(l){e.$set(e.modifyModel,"plug_type",l)},expression:"modifyModel.plug_type"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"电压"}},[t("el-input",{model:{value:e.modifyModel.voltage,callback:function(l){e.$set(e.modifyModel,"voltage",l)},expression:"modifyModel.voltage"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"创建时间"}},[t("el-input",{model:{value:e.modifyModel.create_time,callback:function(l){e.$set(e.modifyModel,"create_time",l)},expression:"modifyModel.create_time"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"备注"}},[t("el-input",{model:{value:e.modifyModel.SPU_remark,callback:function(l){e.$set(e.modifyModel,"SPU_remark",l)},expression:"modifyModel.SPU_remark"}})],1)],1)],1),e._v(" "),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(l){e.viewVisible=!1}}},[e._v("取 消")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:function(l){return e.modifyCompanyConfirmBtnAction()}}},[e._v("修 改")])],1)],1)])],1)}),m=[],f={data:function(){return{addSPULoading:!1,loadingText:"",title:"",viewVisible:!1,modifyModel:{},boolOption:[{value:0,label:"否"},{value:1,label:"是"}],imageFile:null,product_image:null}},props:{},methods:{close:function(){this.imageFile=null,this.closeLoading(),this.viewVisible=!1},show:function(e,l){this.title=e,this.viewVisible=!0,this.modifyModel=l,this.product_image=this.modifyModel.product_image},loading:function(e){this.loadingText=e,this.addCompanyLoading=!0},closeLoading:function(){this.loadingText="",this.addCompanyLoading=!1},displayImage:function(){var e=this.$refs.imageInput.files[0];this.imageFile=e;var l=new FileReader,t=this;l.onload=function(e){t.product_image=e.target.result},l.readAsDataURL(e)},modifyCompanyConfirmBtnAction:function(){if(null!=this.imageFile){var e=this;this.http.uploadFile("/sku/product/image/upload",this.imageFile).then((function(l){e.imageFile=null,e.addCompanyLoading=!1;var t=l.data.url;e.modifyModel.product_image=t,e.$emit("modifyBtnClick",e.modifyModel)})).catch((function(l){console.log(l),e.addCompanyLoading=!1,e.$message({type:"error",message:"上传图片失败"})}))}else this.$emit("modifyBtnClick",this.modifyModel)}}},p=f,_=Object(r["a"])(p,c,m,!1,null,null,null),y=(_.exports,{data:function(){return{loading:!1,tableData:[],boolOption:["否","是"],apply_status:["申请成功","申请中","驳回"]}},components:{},created:function(){this.loadAllSKU()},methods:{loadAllSKU:function(){var e=this;this.http.post("/sku/manager/allapply").then((function(l){console.log(l.data),e.tableData=l.data})).catch((function(l){e.$message({type:"error",message:"获取数据失败"})}))},handleTableClick:function(e){this.isCreateSKU=!1,this.$router.push({name:"SKUManagerModify",params:{model:e}})},handleTableDeleteSKUClick:function(e){var l=e.id,t=this;this.http.post("/sku/total/delete",{id:l}).then((function(e){t.loadAllSKU()})).catch((function(e){}))}}}),v=y,b=Object(r["a"])(v,o,i,!1,null,null,null);l["default"]=b.exports}}]);