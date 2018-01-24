<template>

  <div class="index-page">
    <div class="top-header">
      <h2>前端黑科技</h2>
      <h1>2017</h1>
    </div>

    <div class="page-body">

      <ul class="list">
        <div class="group" v-for="g in docData" :key="g.groupName">
          <div class="group-title">
            {{g.groupName}}
          </div>
          <div class="group-items">
            <a v-for="(item, index) in g.group" :key="item.name + '_' +index" :href="'#' + item.path">
              <div class="bar-item">{{item.title}}</div>
            </a>
          </div>
        </div>
      </ul>

    </div>

  </div>
</template>

<script> 
import docData from '../doc.config.json'


export default {
  name: 'page-index',
  data() {
    return {
      docData
    }
  }
}
</script>

<style lang="less">
  .index-page{

    .top-header{
      background-color: #444;
      width: 100%;
      height: 300px;
      line-height: 150px;
      color: gold;
      font-size: 30px;
      text-align: center;
    }

    .group-items {
      padding: 20px;

      .bar-item{
        padding: 5px 10px;
        border-left: 1px #ccc solid;
        margin: 20px;
      }
    }
    
  }
</style>

