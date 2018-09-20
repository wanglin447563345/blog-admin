<template>
    <div>
        <HeadTitle title="发布文章"></HeadTitle>
        <div class="article_add">
            <div class="title">
                <h4>标题：</h4>
                <el-input v-model="title" placeholder="请输入标题"></el-input>
            </div>
            <div class="thumbnail">
                <span>缩略图：</span>
                <el-upload
                        class="avatar-uploader"
                        action="http://localhost:3001/api/upload"
                        :headers="headers"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl||img_url" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <div class="description">
                <p>摘要：</p>
                <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 4}"
                        placeholder="请输入摘要"
                        v-model="description">
                </el-input>
            </div>
            <div class="editer">
                <div ref="editor" style="text-align:left"></div>
                <div class="type">
                    <span>类别：</span>
                    <el-select v-model="type_id" placeholder="文章类别">
                        <el-option
                                v-for="item in list_data"
                                :key="item.id"
                                :label="item.type"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="my-button">
                    <el-button type="primary" @click="createArticle">发布</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeadTitle from '../components/HeadTitle.vue'
    import E from 'wangeditor'
    import cookie from 'js-cookie'
    import { mapState } from 'vuex'
    import {create_article, edit_article,detail_article} from '../service/Api'
    export default {
        name:"articleAdd",
        data() {
            const userInfo = JSON.parse(cookie.get("userInfo") || "{}");
            return {
                title: '',
                description: '',
                editorContent: "",
                type_id:1,
                imageUrl: '',
                img_url:'',
                headers:{
                    Accept: "image/jpeg",
                    "X-Beancomm-UserId": userInfo.user_id,
                    "X-Beancomm-Token": userInfo.token,
                }
            }
        },
        components:{
            HeadTitle
        },
        computed:{
            ...mapState(["list_data"])
        },
        async mounted() {
            const editor = new E(this.$refs.editor);
            const article_id =this.$router.history.current.query.id;
//            初始化编辑器
            await this.initEdit(editor);
//            获取文章详情
            this.detailArticle(editor,article_id)
        },
        methods: {
            initEdit:function (editor) {
                editor.customConfig.onchange = (html) => {
                    this.editorContent = html
                };
                 editor.customConfig.uploadImgShowBase64 = true;   // 使用 base64 保存图片
                editor.customConfig.zIndex = 100;
                editor.create()
            },
//            修改和发布文章
            createArticle: function () {
                const article_id =this.$router.history.current.query.id;
                if(!this.title){
                    this.$message.error("请填写标题");
                    return
                }
                if(!this.description){
                    this.$message.error("请填写摘要");
                    return
                }
                if(!this.editorContent){
                    this.$message.error("请填写正文");
                    return
                }
                const userInfo = JSON.parse(cookie.get('userInfo'));
                if(article_id){
                    edit_article({title:this.title,type_id:this.type_id,description:this.description,content:this.editorContent,article_id:article_id,img_url:this.img_url})
                        .then(data=>{
                            if(data.errno===0){
                                this.$router.push('/article-list');
                                this.$message({
                                    message:data.errmsg,
                                    type:"success"
                                })
                            }else {
                                this.$message.error(data.errmsg)
                            }
                        })
                }else {
                    create_article({title:this.title,type_id:this.type_id,description:this.description,content:this.editorContent,creator_id:userInfo.user_id,img_url:this.img_url})
                        .then(data=>{
                            if(data.errno===0){
                                this.$router.push('/article-list');
                                this.$message({
                                    message:data.errmsg,
                                    type:"success"
                                })
                            }else {
                                this.$message.error(data.errmsg)
                            }
                        })
                }

            },

//            获取文章详情
            detailArticle:function (editor,article_id) {
                detail_article({article_id:article_id})
                    .then(data=>{
                        this.title=data.data.title;
                        this.description=data.data.description;
                        this.editorContent=data.data.content;
                        this.type_id=data.data.type_id;
                        this.img_url=data.data.img_url;
                        editor.txt.html(data.data.content)
                    })
            },

//            上传缩略图
            handleAvatarSuccess(res, file) {
                this.img_url=window.baseUrl+res.data.url;
                this.imageUrl = URL.createObjectURL(file.raw);

            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt1M = file.size / 1024 / 1024 < 1;

                if (!isJPG) {
                    this.$message.error('上传图片只能是 JPG 格式!');
                }
                if (!isLt1M) {
                    this.$message.error('上传图片大小不能超过 1MB!');
                }
                return isJPG && isLt1M;
            }
        },

    }
</script>

<style scope lang="less">
    .article_add{
        background: #fff;
        min-height: 100%;
        padding:10px 20px;
    }
    .title{
        margin-top: 30px;
        display: flex;
        align-items: center;
        h4{
            width: 70px;
        }
    }
    .description{
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        >p{
            width: 70px;
            text-align: center;
        }
    }
    .type{
        margin:15px 0
    }
    .my-button{
        margin:20px
    }
.thumbnail{
    display: flex;
    align-items: center;
    margin:20px 0
}
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
