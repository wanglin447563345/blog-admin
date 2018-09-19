<template>
    <div>
        <el-button
                size="mini"
                type="danger"
                :disabled="disabled"
                @click="sureDelete()">
            删除
        </el-button>
    </div>


</template>

<script>
    export default {
        data() {
            return {
//                dialogVisible: false
            };
        },
        props:{
            title:String,
            disabled:Boolean
        },
        methods: {

            sureDelete(done) {
                this.$confirm(`确认删除 【${this.title}】？`)
                    .then(_ => {
                        this.$emit("Delete");
                        done();
                    })
                    .catch(_ => {});
            }
        }
    };
</script>

<style scope lang="less">
</style>