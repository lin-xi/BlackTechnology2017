<template>
  <div class="app">
    <section class="app-body">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  ul,li{list-style: none}
  a{text-decoration: none}

  h1{ font-size: 50px; font-weight: bold;}
  h2{ font-size: 40px; font-weight: bold;}
  h3{ font-size: 30px; font-weight: bold;}
  h4{ font-size: 20px; font-weight: bold;}
  h5{ font-size: 12px; font-weight: bold;}

  ul.list{
    padding: 20px;
    border: 1px #f0f0f0 solid;
    border-radius: 4px;

    li{
      font-size: 20px;
      padding: 10px 20px;
      border-bottom: 1px #f0f0f0 solid;
    }
    li:hover{
      background-color: #f5f5f5;
    }
    li::last-child{
      border-bottom: none;
    }
  }
</style>