<template>
  <Header :currentIndex="3"/>
 <div class="wrapper">
<div class="header">
  <div class="header__content">
    <img class="header__content__img" src="../../assets/logonew1.png"/>
    <div class="header__content__text">历史记录查询</div>
  </div>
</div>

<div class="content">
  <div class="search">
    <div class="search__input">
      <input class="search__input__box" placeholder="按病虫害种类查询"/>
      <div class="search__btn  iconfont">&#xe692;</div>
    </div>
  </div>

  <div class="content__box">
    <div class="content__box__headers">
      <div class="content__box__header">查询ID</div>
      <div class="content__box__header">使用时间</div>
      <div class="content__box__header">病虫害种类</div>
      <div class="content__box__header">操作</div>
    </div>

  <div class="content__box__item" v-for="(item,index) in dataList" :key="index">
     <div class="item content__box__item__id">{{index+1}}</div>
      <div class="item content__box__item__time">{{item.usingTime}}</div>
      <div class="item content__box__item__kind">{{item.diseasename}}</div>
      <div class="item content__box__item__delete" @click="deleteItem(index,item.searchID)">删除</div>
  </div>

    </div>
</div>

 </div>
</template>

<script>
import axios from 'axios'
import Header from '../../components/header.vue'

export default {
  components: { Header },
  name: History,
  data () {
    return {
      dataList: []
    }
  },
  async mounted () {
    let result = []
    await axios.get('http://localhost:8888/historyRecord/findAll')
      .then((response) => {
        result = response.data.data
      })
    this.dataList = result
    console.log(this.dataList)
  },

  methods: {
    deleteItem: function (index, ID) {
      axios.get('http://localhost:8888/historyRecord/deleteById', { params: { id: ID } })
      this.dataList.splice(index, 1)
    }
  }

}
</script>

<style scoped  lang="scss">
.wrapper{
  /* position: relative; */
  margin-top:40px;
  // background: blue;
}
.header{
  /* height:30px; */
  &__content{
    height:70px;
    display: flex;
  // margin:0px,auto;
  justify-content: center;//水平居中
  align-items: center;//垂直居中
&__img{
width:70px;
height:60px;
line-height: 70px;
}
&__text{
  font-size:36px;
  // font-weight: bold;
  line-height: 70px;
  margin-left:30px ;
  // letter-spacing:4px;
}

  }
}

.content{

.search{
  // background: chocolate;

  &__input{
    width: 400px;
height: 34px;
border:2px solid #ccc;
display: flex;
margin:0 auto;
border-radius: 7px;
&__box{
width: 320px;
height: 30px;
outline: none;
border: none;
background: none;
margin-left:20px ;
}
  }
  &__btn{
margin-left:20px;
line-height:34px;
width:40px;
  }
}

&__box{
  position: absolute;
  top:170px;
  left: 0;
  right:0;
  bottom: 0;
  position: absolute;
  overflow-y:scroll ;
  // border:1px solid black;
  margin: 0px 20px 0px 20px;
  &__headers{
    display: flex;
     justify-content: center;
margin:0px 10px 0 10px;
background: #ccc;
height: 25px;
  }
  &__header{
    flex: 1;
     line-height:25px;
  // border:1px solid black;
  }
  &__item{
display: flex;
justify-content: center;
margin:0px 10px 0 10px;
.item{
flex: 1;
line-height:25px;
border:1px solid #CCC;
}
&__delete{
  background:rgb(166, 181, 221);
  color: black;
  cursor: pointer;
}
  }
}
}
</style>
