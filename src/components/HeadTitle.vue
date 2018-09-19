<template>
    <div class="h1">
        {{title}}
    </div>
</template>

<script>
    export default {
        props:{
            title:String
        }
    }
</script>

<style scope lang="less">
    .h1{
        padding:10px 20px;
        border-bottom: 1px solid #ccc;
        background: #fff;
        font-weight: bold;
        color: #002329;
    }
</style>