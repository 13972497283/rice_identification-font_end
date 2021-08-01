<template>
<Header  :currentIndex="2"/>
  <div class="search">
    <div class="search_header">
      <div class="search_header_nav">
        <img src="../../assets/logonew.png" class="search_img">
        <i class="search_header_font">病虫害百科查询</i>
        <i class="search_header_font1">你想找的,我都知道</i>
        <div class="search_header_input">
          <input type="text" placeholder="请输入要查询的病虫害名称">
          <img src="../../assets/search.png">
        </div>
      </div>
    </div>
  </div>
  <div class="search_body" >
    <div
    class="item"
    v-for="(item,index) in dataList.value" :key="index"
    >
    <router-link :to="`/detail/${item.id}`">
      <img :src="item.image"/>
      <div class="item__text">{{item.diseaseName}}</div>
      </router-link>
    </div>

  </div>
</template>

<script>

import Header from '../../components/header.vue'
import axios from 'axios'
import { reactive } from '@vue/reactivity'

export default {
  name: 'Search',
  components: { Header },
  setup (props) {
    const dataList = reactive([])
    const doit = async () => {
      const result = await axios.get('/api/encyclopedia/findAll')
      console.log(dataList, 'data')
      console.log(result, 'result')
      dataList.value = result.data.data
    }
    doit()
    console.log(dataList, 'dataList')
    return { dataList }
  }

}
</script>

<style lang="scss" scoped>
  *{
    padding: 0;
    margin: 0;
}
  input{
    border: 0;
    outline: none;
  }
  i{
    font-style: normal;
  }
  .search_header{
    height: 140px;
    width: 380px;
    margin: auto;
    margin-top: 40px;
  }
  .search_img{
    float: left;
    width: 90px;
    height: 90px;
  }
  .search_header_font{
    float: left;
    font-size: 36px;
    margin-top: 10px;
    margin-left: 15px;
  }
  .search_header_font1{
    display: inline-block;
    font-size: 10px;
    color: #ccc;
  }
  .search_header_input{
    background-color: white;
    border: 2px #ccc solid;
    border-radius: 5px;
    height: 28px;
    margin-top: 18px;
  }
  .search_header_input input{
    float: left;
    margin-left: 15px;
    height: 26px;
    width: 320px;
  }
  .search_header_input img{
    width: 28px;
    height: 28px;
  }
  .search_body{

    display: flex;
    flex-wrap: wrap;
  // justify-content: center;
padding:20px 60px;
  }
  .item{

    border: 1px #ccc solid;
    background-color: white;

    margin: 20px 20px 20px 20px;
    height: 320px;
    // width: 220px;
    &__text{
       line-height: 40px;
    }
    a{
      text-decoration: none;
      color:black;
    }
  }
  .item img{
    width: 230px;
    height: 275px;
    transition:all .2s;
    -moz-transition:all .2s;
    -webkit-transition:all .2s;
    -o-transition:all .2s;
  }
</style>
