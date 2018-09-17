<template>
  <div id="app">
      <transition name="fade">
          <router-view></router-view>
      </transition>
  </div>
</template>

<script>
export default {
    name: "app"
}

</script>

<style>
    *{
        box-sizing: border-box;
    }
    html,body{
        height: 100%;
        margin:0;
        padding:0
    }
    #app {
        height: 100%
    }
    .fade-enter-active{
        transform: scale(0);
        transition: all 1s;
    }
    .fade-enter-to {
        transform: scale(1);
    }
    .fade-leave-to{
        transform: scale(1);
        /*opacity: 1;*/
    }
    .fade-leave-active{
        transform: scale(0);
        /*opacity: 0;*/
        transition: all 0.5s;

    }
</style>
