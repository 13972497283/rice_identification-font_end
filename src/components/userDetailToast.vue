<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="modal-header">
        <div class="title">
          <div class="title__text">设置我的个人信息</div>
        </div>
        <div class="iconfont close " @click="closeSelf" >&#xe600;
        </div>
      </div>
      <div class="modal-body">

        <div class="password">
          <div class="input__box">
            <input type="password" class="old" v-model="nowPassword" placeholder="旧密码">
          </div>
          <div class="input__box">
            <input type="password" class="new" v-model="newPassword" placeholder="请输入新密码">
          </div>
          <div class="input__box">
            <input type="password" class="renew" v-model="reSuerPassword" placeholder="请确认新密码">
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="submit" class="btn-confirm" @click="handleClick">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import axios from 'axios'
import { useRouter } from 'vue-router'
export default {
  name: 'userDetailToast',
  setup (props, content) {
    const router = useRouter()
    const datas = reactive({
      nowPassword: '',
      newPassword: '',
      reSuerPassword: ''
    })

    const { nowPassword, newPassword, reSuerPassword } = toRefs(datas)

    function closeSelf () {
      content.emit('closeme')// this.$emit集成到了setup函数中的context上下文中了
    }

    const handleClick = () => {
      if (datas.newPassword === datas.reSuerPassword) {
        axios.get('http://localhost:8888/user/updateUser', { params: { username: sessionStorage.getItem('username'), oldPassword: datas.nowPassword, newPassword: datas.reSuerPassword } }).then(response => {
          console.log(response)
          if (response.data.code === 200) {
            sessionStorage.removeItem('username')
            router.push({ name: 'Login' })
          } else {
            alert(response.data.message)
          }
        })
      } else {
        alert('两次密码不同，请重新输入')
      }
    }
    return { closeSelf, nowPassword, newPassword, reSuerPassword, handleClick }
  }
}
</script>

<style lang="scss" scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .3);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal {
    background-color: #fff;
    box-shadow: 2px 2px 20px 1px;
    overflow-x:auto;
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    width: 350px;
  }
  .modal-header {
    border-bottom: 1px solid #eee;
    color: #313131;
    justify-content: space-between;
    padding: 15px 15px 5px 15px;
    display: flex;
  }
  .modal-footer {
    border-top: 1px solid #eee;
    justify-content: flex-end;
    padding: 15px;
    display: flex;
  }
  .modal-body {
    position: relative;
    padding: 10px 20px 20px 20px
  }
  .btn-confirm {
    border-radius: 8px;
    margin-left:16px;
    width:56px;
    height: 36px;
    border:none;
    cursor: pointer;
  }

  .btn-confirm {
    color: #fff;
    background-color: #2d8cf0;
  }

  .new,.old,.renew{
    // display: block;
    // margin-bottom: 10px;
    line-height: 25px;
    width:200px;
    border: none;
    outline: none;
  }
  .close{
font-size:30px;
cursor: pointer;
  }
  .icon{
    height: 50px;
    width: 50px;
  }

  .input__box{
    height:30px;
    border:1px solid black;
    position: relative;
    margin: 20px 30px 20px 30px;
    border-radius: 4px;
  }
  .title__text{
    font-weight: bold;
  }
</style>
