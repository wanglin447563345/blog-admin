<template>
    <div>
        <HeadTitle title="文章列表"></HeadTitle>
        <div class="article_type">
            <div class="type_add">
                <el-row>
                    <el-button type="primary" @click="showCreate">新建类别</el-button>
                </el-row>
            </div>
            <el-row>
                <div class="table">
                    <el-table
                            :data="list_data"
                            stripe
                            style="width: 100%">
                        <el-table-column
                                prop="type"
                                label="文章类型">
                        </el-table-column>
                        <el-table-column
                                prop="count.c"
                                label="文章数量">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="200">
                            <template slot-scope="scope">
                                <div style="display: flex; justify-content: center">
                                    <el-button
                                            :disabled="!(scope.row.user_name===userInfo.user_name||userInfo.user_id===1)"
                                            size="mini"
                                            @click="editType(scope.row.id,scope.row.type)"
                                    >
                                        编辑
                                    </el-button>
                                    <DeleteBtn ref="DeleteBtn" @Delete="Delete(scope.row.id)"
                                               :title="scope.row.type"
                                               :disabled="!(scope.row.user_name===userInfo.user_name||userInfo.user_id===1)">
                                    </DeleteBtn>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-row>
            <el-dialog title="文章类型" :visible.sync="dialogFormVisible">
                <el-input v-model="type" placeholder="请输入类型名称"></el-input>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="createType">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>

</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import cookie from 'js-cookie'
    import DeleteBtn from '../components/DeleteBtn.vue'
    import HeadTitle from '../components/HeadTitle.vue'
    import {create_article_type,delete_article_type,edit_article_type} from "../service/Api"
    export default {
        name:"articleType",
        data(){
            return {
                userInfo:JSON.parse(cookie.get("userInfo")),
                dialogFormVisible: false,
                type:"",
                id:''
            }
        },
        components:{
            HeadTitle,
            DeleteBtn
        },
        computed:{
            ...mapState(["list_data"])
        },
        methods:{
            ...mapActions(["getTypeSum"]),
            createType:function () {
                if(this.id){
                    edit_article_type({id:this.id,type:this.type})
                        .then(data=>{
                            if(data.errno===0){
                                this.$message({
                                    message:data.errmsg,
                                    type:"success"
                                });
                                this.getTypeSum();
                                this.dialogFormVisible=false
                            }else {
                                this.$message.error(data.errmsg)
                            }
                        })
                }else {
                    create_article_type({type:this.type})
                        .then(data=>{
                            if(data.errno===0){
                                this.$message({
                                    message:data.errmsg,
                                    type:"success"
                                });
                                this.getTypeSum();
                                this.dialogFormVisible=false
                            }else {
                                this.$message.error(data.errmsg)
                            }
                        })
                }
            },

            Delete:function (id) {
                delete_article_type({id:id})
                    .then(data=>{
                        if(data.errno===0){
                            this.$message({
                                message:data.errmsg,
                                type:"success"
                            });
                            this.getTypeSum();
                            this.dialogFormVisible=false
                        }else {
                            this.$message.error(data.errmsg)
                        }
                    })
            },
            showCreate:function () {
                this.dialogFormVisible=true;
                this.type='';
                this.id=''
            },
            editType:function (id,type) {
                this.dialogFormVisible=true;
                this.type=type;
                this.id=id
            }


        }
    }
</script>

<style scope lang="less">
    .article_type{
        min-height: 100%;
        background: #fff;
        .el-dialog{
            width: 400px;
        }
    }
    .type_add{
        padding:20px 20px 0;
    }
    .table{
        text-align: center;
        padding: 20px;
    }
    .has-gutter>tr>th{
        background: #002329;
        color: #fff;
        text-align: center;
    }
    .el-pagination{
        padding:30px 0 20px;
    }
    .el-table .cell{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
</style>