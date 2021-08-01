<template>
<Header :currentIndex="1"/>
<div class="wrapper">
  <div class="content">
    <div class="content__left">
      <div class="content__left__btns">
      <div class="content__left__btn">选择图片</div>
      <div class="content__left__btn" @click="commit">确认上传</div>
      <!-- 选择本地图片 -->
      <input type="file" id="file" class="filepath "  @change="changepic" accept="image/jpg,image/jpeg,image/png,image/PNG">
      <!-- 选择本地图片 -->
    </div>
    <div class="content__left__imgPreview">
      <div class="content__left__imgPreview__text">图片预览，确认后点击确认上传</div>
      <div class="content__left__imgPreview__box">
        <img id="img3" class="content__left__img" src="../assets/default.jpg" >
        </div>

    </div>
    </div>

    <div class="content__right">

      <div class="content__right__img__box">
        <img id="img4" class="content__right__img" src="../assets/default.jpg">
      </div>

  <div class="content__result">
   <div class="content__result__name">识别结果：{{diseases}}</div>
   <div class="content__result__rate">准确率：{{rate*100}}%</div>

  </div>
      </div>
    </div>

  </div>

</template>

<script>
import axios from 'axios'
import Header from '../components/header.vue'
import { reactive, ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'

export default {
  name: 'Home',
  components: { Header },
  setup () {
    onMounted(() => {
      if (sessionStorage.img) {
        document.getElementById('img3').src = JSON.parse(sessionStorage.img)
        document.getElementById('img4').src = JSON.parse(sessionStorage.img)

        diseases.value = JSON.parse(sessionStorage.diseases) || ''
        rate.value = JSON.parse(sessionStorage.rate) || ''
      }
    })
    var f
    var img
    // 选择本地图片
    function changepic () {
      var reads = new FileReader()
      f = document.getElementById('file').files[0]
      reads.readAsDataURL(f)
      reads.onload = function () {
        document.getElementById('img3').src = this.result
        img = this.result
        sessionStorage.img = JSON.stringify(img)
      }
    }
    const diseases = ref('')
    const rate = ref('')
    const data = reactive({ list: [] })
    const commit = async () => {
      alert('已上传')
      const formData = new FormData()
      formData.append('file', f)
      const instance = axios.create({
        withCredentials: true
      })
      const result = await instance.post('/api/upload/image', formData)
      data.list = result.data.data
      console.log(data)
      document.getElementById('img4').src = JSON.parse(sessionStorage.img)
      sessionStorage.rate = JSON.stringify(data.list.rate)
      sessionStorage.diseases = JSON.stringify(data.list.diseases)
      diseases.value = JSON.parse(sessionStorage.diseases) || ''
      rate.value = JSON.parse(sessionStorage.rate) || ''
    }

    return { changepic, commit, rate, diseases, sessionStorage }
  }
}
</script>

<style lang="scss" scoped>
*{
  margin-left:0px;
  padding: 0px;

.wrapper{
left:0;
right:0;
top:40px;
bottom: 0px;
position:absolute;
  background: rgb(228, 226, 226);
}
  .content{
display: flex;
position:absolute;
left:0px;
right: 0px;
top:0x;
bottom: 20px;
&__left{
  padding-top: 20px;
  width:600px;
  bottom: 20px;
  top:0px;
  left:20px;
  position:relative;
  margin-right:50px;
  padding-left:40px;
  background: #FFF;
  position: relative;
  &__btns{
    display: flex;
    margin:0 30px;

  }  &__btn{
      cursor: pointer;
      flex:1;
      height:40px;
      background: rgb(77, 76, 87);
      color: #FFF;
      line-height: 40px;
      margin:10px 40px;
    }
    &__imgPreview{
      width:100%;
      height:400px;
      left:0px;
      position: relative;

      &__text{
         font-size:16px;
         color:rgb(129, 129, 129);
         text-align: left;
         margin: 10px 10px 10px 20px;
      }
      &__box{
        margin:20px;
        width: 450px;
        height:320px;

      }
    }
    &__img{

        width: 450px;
        height:320px;

    }
}

&__right{
background: #FFF;
width:700px;
position:relative;
top:0px;
bottom: 5px;
right:20px;
margin-left:20px;
 padding-top: 20px;
padding-left:30px;
    &__img__box{
       margin:30px 30px 0 30px;
        width: 520px;
        height:320px;

    }
    &__img{

        width: 520px;
        height:320px;

    }
}

&__result{
   width: 500px;
   height:40px;
   line-height: 40px;
    margin:20px 30px 0 30px;
      border: 1px solid black;
      padding: 10px;
      display: flex;
      color:#FFF;
      background:rgb(77, 76, 87);
      &__name ,&__rate{

      flex:1;
      text-align: left;

      }

}
  }
}

// 选择本地图片
#file{
  position:absolute;
  left:70px;
  top:10px;
  width:135px;
  height:40px;
  border:1px solid white;
  opacity: 0;
  cursor: pointer;
}
</style>
