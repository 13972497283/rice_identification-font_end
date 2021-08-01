<template>
  <div class="header">
  <img class="header__logo" src="../assets/logonew2.png">
  <div class="header__text">水稻病虫害识别与防治系统</div>
    <userDetailToast v-show="showModal" @closeme="closeme"></userDetailToast>
  <div class="header__btns">

    <div :class="{'header__btn':true , 'header__btn--active':item.index===currentIndex}"
    v-for="item in headerList"
    :key=item.index
   @click=item.click
    >
     <router-link :to="{name:`${item.click}`}">
    {{item.text}}
    </router-link>
    </div>

    <div class="header__btn"  @mouseenter="mouseEnter" @mouseleave="mouseLeave">
      我的账户
 <div class="selector" v-if="showSelector" @mouseover="Over" >
    <div class="selector__option" @click="userDetail" >
      用户信息
    </div>
       <div class="selector__option" @click="logout">
      退出登录
    </div>
  </div>
      </div>

  </div>

</div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import userDetailToast from './userDetailToast.vue'

export default {
  name: 'Header',
  components: {
    userDetailToast
  },
  props: ['currentIndex'],
  setup () {
    const headerList = [{ text: '首页', click: 'Home', index: 1 },
      { text: '病虫害百科', click: 'Search', index: 2 },
      { text: '历史记录', click: 'History', index: 3 }

    ]

    const showModal = ref(false)
    const userDetail = () => {
      showModal.value = true
    }

    const closeme = () => {
      showModal.value = false
    }
    const router = useRouter()
    const showSelector = ref(false)
    const mouseEnter = (e) => {
      showSelector.value = true
    }
    const mouseLeave = (e) => {
      showSelector.value = false
    }

    const logout = () => {
      router.push({ name: 'Login' })
      sessionStorage.removeItem('username')
      // sessionStorage.clear()
    }

    const goToSearch = () => {
      router.push({ name: 'Search' })
    }

    const goToHome = () => {
      router.push({ name: 'Home' })
    }

    const gotoHistory = () => {
      router.push({ name: 'History' })
    }

    return { showSelector, mouseEnter, mouseLeave, logout, goToSearch, goToHome, gotoHistory, userDetail, showModal, closeme, headerList }
  }

}
</script>

<style lang="scss" scoped>
.header{
  z-index: 2;
  color:#FFF;
  width: 100%;
  height:40px;
  position: fixed;
  left:0px;
  top:0;
  background:rgb(77, 76, 87);
  display: flex;
  &__logo{
  width:65px;
  height:40px;
    margin :0px 30px 0px 40px;

  }
  &__text{
    line-height:40px;
    font-size:23px;
    margin-right:20px;
  }
  &__btns{
display: flex;
position: absolute;
right: 20px;

a{
      text-decoration: none;
      color:#FFF;
 }
  }
   &__btn{
      margin: 0 0 0 20px;
      width:80px;
      height:38px;
      line-height:38px;
      cursor: pointer;//改变鼠标样式
      border-radius: 10px;
    //  color:#FFF;

    &--active{
      background: rgb(166, 181, 221);
      color:black;
    }
    }
}
.selector{
  position:absolute;
  right:0px;
  top:35px;
  background:rgb(77, 76, 87);
  width:80px;
  height:100px;
  &__option{
    margin:10px 0 10px 0;
  }
}

</style>
