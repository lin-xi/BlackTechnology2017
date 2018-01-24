<template>
	<div>
    <h1>Grid</h1>
    <p>
      <code>display: grid;</code>
    </p>
    <p>
      <code>display: inline-grid;</code>
    </p>

    <h2>属性</h2>
    <p>
      <code>grid-template-columns</code> 设置列宽度
    </p>
    <p>
      <code>grid-template-rows</code> 设置行高度
    </p>
    <p>
      <code>grid-column-gap</code> 列间距
    </p>
    <p>
      <code>grid-row-gap</code> 行间距
    </p>
    <p>
      <code>grid-gap</code> 行列间距
    </p>

    <h3>Demo1</h3>
    <table>
      <tr>
        <td>
<pre>
  <code>
  #grid-demo1{
    display: grid;
    grid-template-columns: 100px 30px 100px 20px 100px;
    grid-template-rows: 100px 30px;
    div{
      background-color: gold;
      border: 1px dodgerblue solid;
    }
  }
  </code>
</pre>
        </td>
        <td>
          <div id="grid-demo1">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>10</div>
          </div>
        </td>
      </tr>
    </table>


    <h2>属性</h2>
    <p>
      <code>grid-column-start</code> 列起始
    </p>
    <p>
      <code>grid-column-end</code> 列终止
    </p>
    <p>
      <code>grid-row-start</code> 行起始
    </p>
    <p>
      <code>grid-row-end</code> 行终止
    </p>

    <p><img src="https://www.w3cplus.com/sites/default/files/blogs/2014/1410/css-grid-layout-example-2.jpg"/></p>


    <h3>Demo2</h3>
    <table>
      <tr>
        <td>
<pre>
  <code>
  #grid-demo2{
    display: grid;
    grid-template-columns: 100px 30px 100px 20px 100px;
    grid-template-rows: 100px 30px;
    div{
      background-color: gold;
      border: 1px dodgerblue solid;
    }
    .cell1{
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 2;
    }
  }
  </code>
</pre>
        </td>
        <td>
          <div id="grid-demo2">
            <div class="cell1">1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>10</div>
          </div>
        </td>
      </tr>
    </table>

    <h2>缩写</h2>
    <p>
      <code>grid-column: 1 / 2;</code> 
    </p>
     <p>
      <code>grid-row: 1 / 2;</code> 
    </p>

    <p>
      <code>grid-area: 1 / 1 / 2 / 2;</code>  <br>
      row-start / column-start / row-end / column-end

    </p>

    <h2>应用</h2>

    <h3>Demo3</h3>
    <table>
      <tr>
        <td>
<pre>
  <code>
  #grid-demo3{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: repeat(Infinity, 100px) repeat(Infinity, 50px);
    grid-gap: 5px;
    div{
      background-color: gold;
      border: 1px dodgerblue solid;
    }
    .cell1{
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 2;
    }
    .cell2{
      grid-column-start: 3;
      grid-column-end: 5;
      grid-row-start: 1;
      grid-row-end: 2;
    }
    .cell4{
      grid-column-start: 2;
      grid-column-end: 4;
      grid-row-start: 2;
      grid-row-end: 3;
    }
    .cell5{
      grid-column-start: 1;
      grid-column-end: 4;
      grid-row-start: 3;
      grid-row-end: 4;
    }
    .cell10{
      grid-column-start: 3;
      grid-column-end: 5;
      grid-row-start: 4;
      grid-row-end: 5;
    }
  }
  </code>
</pre>
        </td>
        <td>
          <div id="grid-demo3">
            <div class="cell1" ref="cell1">1</div>
            <div class="cell2">2</div>
            <div class="cell3">3</div>
            <div class="cell4">4</div>
            <div class="cell5">5</div>
            <div class="cell6">6</div>
            <div class="cell7">7</div>
            <div class="cell8">8</div>
            <div class="cell9">9</div>
            <div class="cell10" ref="cell10">10</div>
          </div>
        </td>
      </tr>
    </table>


    <p>
      <button @click="swap">1和10互换</button> 
    </p>
    
  </div>
</template>

<script>
export default {
  name: 'doc-grid',
  methods: {
    swap () {
      this.$refs.cell1.className = 'cell7'
      this.$refs.cell7.className = 'cell1'
    }
  }
}
</script>

<style lang="less">
  #grid-demo1{
    display: grid;
    grid-template-columns: 100px 30px 100px 20px 100px;
    grid-template-rows: 100px 30px;
    div{
      background-color: gold;
      border: 1px dodgerblue solid;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
  }

  #grid-demo2{
    display: grid;
    grid-template-columns: 100px 30px 100px 20px 100px;
    grid-template-rows: 100px 30px;
    div{
      background-color: gold;
      border: 1px dodgerblue solid;
    }
    .cell1{
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 2;
    }
  }

  #grid-demo3{
    width: 200px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: repeat(Infinity, 100px);
    grid-gap: 5px;
    div{
      background-color: gold;
      border: 1px dodgerblue solid;
    }
    .cell1{
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 2;
    }
    .cell2{
      grid-column-start: 3;
      grid-column-end: 5;
      grid-row-start: 1;
      grid-row-end: 2;
    }
    .cell4{
      grid-column-start: 2;
      grid-column-end: 4;
      grid-row-start: 2;
      grid-row-end: 3;
    }
    .cell5{
      grid-column-start: 1;
      grid-column-end: 4;
      grid-row-start: 3;
      grid-row-end: 4;
    }
    .cell10{
      grid-column-start: 3;
      grid-column-end: 5;
      grid-row-start: 4;
      grid-row-end: 5;
    }
  }
</style>
