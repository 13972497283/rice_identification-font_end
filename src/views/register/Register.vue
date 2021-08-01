<template>
<div class="wrapper">
  <div class="register">
   <img class="register__img" src="../../assets/logonew.png"/>

<div class="register__content">
  <div class="register__name">
    <div class="iconfont register__name__icon ">&#xe67e;</div>
        <input class="register__name__text"
         type="text"
          placeholder="请输入用户名"
          v-model="username"
          />

  </div>
<div class="register__password">
    <div class="iconfont register__password__icon">&#xe619; </div>
        <input
        v-model="password"
        class="register__password__text"
        placeholder="请输入密码"
        type="password"/>

  </div>
  <div class="register__password">
    <div class="iconfont register__password__icon">&#xe619; </div>
        <input
          v-model="ensurement"
        class="register__password__text"
        placeholder="请确认密码"
        type="password"/>

  </div>
</div>
<div class="btns">
  <div class="btn__register" @click="handleRegister">注册</div>
  <div class="btn__login" @click="goToLogin">已账号？去登录</div>
  </div>

  </div>
  </div>
</template>
<script>
import { reactive, toRefs } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import axios from 'axios'
export default {
  name: 'Register',

  setup () {
    const router = useRouter()

    const datas = reactive({
      username: '',
      password: '',
      ensurement: ''
    })

    const handleRegister = () => {
      const { username, password, ensurement } = datas
      if (password !== ensurement) {
        return alert('两次密码不同，请重新输入')
      }
      if (username === '' || password === '' || ensurement === '') {
        return alert(
          '用户名 密码不能为空'
        )
      }
      axios.post('http://localhost:8888/user/register', { nickname: datas.username, password: datas.password })
        .then((response) => {
          console.log(response)
          if (response.data.code === 200) {
            alert('注册成功，即将跳转到登录')
            router.push({ name: 'Login' })
          } else {
            alert(response.data.message)
          }
        })
        .catch(error => { console.log(error) })
    }

    const goToLogin = () => {
      router.push({ name: 'Login' })
    }

    const { username, password, ensurement } = toRefs(datas)
    return { goToLogin, handleRegister, username, password, ensurement }
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
.register{
   box-shadow: 0 4px 8px 0 rgba(213, 240, 205, 0.877);
  border-radius: 6px;
  background:rgba(252, 250, 250, 0.8);
  position: absolute;
  width:500px;
  height: 420px;
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
    outline: none;//选中状态下的边框展示
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
  &__register{
    color:#FFF;
    margin:10px 130px 20px 130px;
    height:40px;
    background:rgb(1, 104, 10);
    border-radius: 6px;
    line-height: 40px;
     box-shadow: 0 4px 8px 0 rgba(39, 156, 3, 0.877);
     cursor: pointer;
  }
  &__login{
    color:rgba(0,0,0,0.50);
     cursor: pointer;

  }
}
</style>
