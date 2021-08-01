<template>
<div class="wrapper">
  <div class="login">
   <img class="login__img" src="../../assets/logonew.png"/>

<div class="login__content">
  <div class="login__name">
    <div class="iconfont login__name__icon ">&#xe67e;</div>
        <input class="login__name__text"
         type="text"
         placeholder="请输入用户名"
        v-model="username"
         />

  </div>
<div class="login__password">
    <div class="iconfont login__password__icon">&#xe619; </div>
        <input class="login__password__text"
         placeholder="请输入密码"
         type="password"
        v-model="password"
         />

  </div>
</div>
<div class="btns">
  <div class="btn__login" @click="handleLogin">登录</div>
  <div class="btn__register" @click="goToRegister">没有账号？立即注册</div>
  </div>

  </div>
  </div>
</template>
<script>
import { reactive, toRefs } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import axios from 'axios'
export default {
  name: 'Login',
  setup () {
    const router = useRouter()

    const datas = reactive({
      username: '',
      password: ''
    })

    const handleLogin = () => {
      const { username, password } = datas
      if (username === '' || password === '') {
        return alert('用户名密码不能为空')
      }
      axios.get('http://localhost:8888/user/login',
        { params: { username: datas.username, password: datas.password } })
        .then(response => {
          if (response.data.code !== 200) {
            alert(response.data.message)
          } else {
            router.push({ name: 'Home' })
            sessionStorage.username = username
          }
          console.log(response)
        })
    }
    const goToRegister = () => {
      router.push({ name: 'Register' })
    }
    const { username, password } = toRefs(datas)
    return { goToRegister, handleLogin, username, password }
  }
}
</script>
<style lang="scss" scoped>
.wrapper{

  background-image: url(../../assets/水稻_background.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  position:absolute;
  left: 0px;
  right:0px;
  top:0px;
  bottom: 0px;
}
.login{
   box-shadow: 0 4px 8px 0 rgba(213, 240, 205, 0.877);
  border-radius: 6px;
  background:rgba(252, 250, 250, 0.8);
  position: absolute;
  width:500px;
  height: 400px;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  &__content{
    margin: 0 50px 0px 50px;
    position: relative;
  }
  &__img{
width:150px;
height: 150px;
  }
  &__name, &__password{
    margin:0 80px 10px 80px;
    height:40px;
    border:1px solid rgba(0,0,0,0.50);
    border-radius: 6px;
    position: relative;
    display: flex;
  }
  &__name__text,&__password__text{
    line-height: 30px;
    border:none;
    outline: none;
    position: relative;
    top:0.5px;
    background:none;
    width:180px;
}
&__name__icon,&__password__icon{
font-size:20px;
line-height:40px;
color:rgba(0,0,0,0.50);
margin:0 10px 0 10px;
}
}
.btn{
  &__login{
    color:#FFF;
  margin:10px 130px 20px 130px;
    height:40px;
    background:rgb(1, 104, 10);
    border-radius: 6px;
    line-height: 40px;
     box-shadow: 0 4px 8px 0 rgba(39, 156, 3, 0.877);
     cursor: pointer;
  }
  &__register{
    color:rgba(0,0,0,0.50);
     cursor: pointer;

  }
}
</style>
