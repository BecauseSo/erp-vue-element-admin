<template>
    <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        router
        active-text-color="#ffd04b">
        <el-menu-item index="modifyroles">员工角色分配</el-menu-item>
        <el-menu-item index="setroles">角色权限设置</el-menu-item>
    </el-menu>

</template>

<script>

export default {

  data () {
    return {
      activeIndex2: 'modifyroles'
    }
  },
  methods: {
    handleSelect () {

    }
  },
  created () {
    console.log('header create')
    this.activeIndex2 = 'modifyroles'
  }

}

</script>
