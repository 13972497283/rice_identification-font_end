<template>
<Header/>
<!-- <div class="id">{{data.id}}</div>
<img :src="data.image"/> -->

<div class="wrapper">
  <div class="head">
  <div class="title">{{data.diseaseName}}</div>
  <img class="image" :src="data.image"/>
  </div>
<div class="content">
  <div class="symbol" >特征</div>
   <div class="symbol__text">{{data.other||"暂无此记录"}}</div>
   <div class="harm">危害</div>
  <div class="harm__text">{{data.symptom||"暂无此记录"}}</div>
  <div class="method">防治方法</div>
  <div class="method__text">{{data.preventionMethod||"暂无此记录"}}</div>
  </div>

</div>
</template>

<script>
import axios from 'axios'
import { useRoute } from 'vue-router'
import Header from '../../components/header.vue'
import { ref } from '@vue/reactivity'

export default {
  components: { Header },
  name: 'Detail',
  setup () {
    const route = useRoute()
    const id = route.params.id
    var data = ref([])
    const doit = async () => {
      const result = await axios.get('http://localhost:8888/encyclopedia/findByName', { params: { name: id } })
      console.log(result)
      data.value = result.data.data
      // return data
    }
    doit()

    console.log(data, 'data')
    // console.log(data.value)
    return { data }
  }
}
</script>
<style lang="scss" scoped>
.wrapper{
  width: 100%;
  position: absolute;
  top:40px;
  bottom:0;
  // background: rgb(214, 204, 204);
  left:0;
  padding: 20px 50px 20px 50px;
 box-sizing:border-box;
}
.head{
display: flex;
.title{
font-size:50px;
line-height: 150px;
margin-left:40px;
}
.image{
  width: 150px;
  height: 150px;
 margin-left:auto;//居右对齐
 margin-right:40px;
}
}
.symbol ,.method,.harm{
height: 30px;
font-size: 25px;
line-height: 30px;
border-bottom: 2px solid #ccc;
position: relative;
text-align: left;
margin-left: 20px;
padding-left:10px ;
}
.symbol__text, .method__text,.harm__text{
  margin:20px;
  text-align: left;
}
</style>
