<template>
  <!-- write template here -->

</template>

{{#if  component.hasTS}}
<script lang="ts">
  // write script here
  import Vue from "vue";
  export default Vue.extend({
    name:{{{comonent.name}}},
    data(){
      return {
        
      }
    }
  })
</script>
{{else}}
<script>
  export default {
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
