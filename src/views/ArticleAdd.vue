<template>
    <div class="article_add">
        <div class="title">
            <h4>标题：</h4>
            <el-input v-model="title" placeholder="请输入标题"></el-input>
        </div>
        <div class="description">
            <p>摘要：</p>
            <el-input
                    type="textarea"
                    :autosize="{ minRows: 3, maxRows: 4}"
                    placeholder="请输入摘要"
                    v-model="textarea">
            </el-input>
        </div>
        <div class="select">
            <div>
                <p>类别：</p>
                <el-select v-model="value" placeholder="文章类别">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div>
                <p>发表日期：</p>
                <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </div>
        </div>
        <div class="editer">
            <div ref="editor" style="text-align:left"></div>
            <el-button type="primary" v-on:click="getContent">发布</el-button>
        </div>
    </div>
</template>

<script>
    import E from 'wangeditor'
    export default {
        data() {
            return {
                title: '',
                textarea: '',
                editorContent:'',
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',
            }
        },
        methods: {
            getContent: function () {
                alert(this.editorContent)
            }
        },
        mounted() {
            const editor = new E(this.$refs.editor)
            editor.customConfig.onchange = (html) => {
                this.editorContent = html
            };
            editor.customConfig.zIndex = 100
            editor.create()
        }
    }
</script>

<style scope lang="less">
    .article_add{
        background: #fff;
        min-height: 100%;
        padding:10px 20px;
    }
    .editer{
        margin-top: 15px;
        text-align: right;
    }
    .el-button{
        margin:20px
    }
    .select{
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        div{
            display: flex;
            align-items: center;
        }
    }
</style>
