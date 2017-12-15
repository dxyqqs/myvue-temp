<template>
  <!-- write template here -->
  <div id="app">
    <div>
      <h1>\{{title}}</h1>
      <pre>
{{package.logo}}
      </pre>
      
    </div>

  </div>
</template>

{{#if  package.hasTypescript}}
<script lang="ts">
  // write script here
  import Vue from "vue";
  export default Vue.extend({
    data(){
      return {
        title:{{{package.name}}}
      }
    }
  })
</script>
{{else}}
<script>
  export default {
    data(){
      return {
         title:{{{package.name}}}
      }
    }
  }
</script>
{{/if}}
{{#if  package.hasScss}}
<style lang="scss">
  // write style here
  html,
  body,
  #app {
    width: 100%;
    height: 100%;
    margin: 0;
  }
  #app {
    display: flex;
    align-items: center;
    justify-content: center;
    & > div {
      pre {
        color: #2073d9;
        font-size:2em;
        text-shadow: 1px 14px 12px #2073d9;
      }
      h1{
        text-align:center
      }
    }
  }
</style>
{{else}}
<style>
  /* write style here */
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
}
#app {
  display: flex;
  align-items: center;
  justify-content: center;
}
#app>div pre{
  color: #2073d9;
  text-shadow: 1px 14px 12px #2073d9;
  font-size:2em;
}
#app>div h1{
  text-align:center
}
</style>
{{/if}}
