<template>
  <!-- write template here -->

</template>

{{#if  component.hasTypescript}}
<script lang="ts">
  // write script here
  import Vue from "vue";
  export default Vue.extend({
    name:{{{component.name}}},
    data(){
      return {
        
      }
    }
  })
</script>
{{else}}
<script>
  export default {
    name:{{{component.name}}},
    data(){
      return {
         
      }
    }
  }
</script>
{{/if}}
{{#if  package.hasScss}}
<style lang="scss">
  // write style here

</style>
{{else}}
<style>
  /* write style here */

</style>
{{/if}}
