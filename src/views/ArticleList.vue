<template>
   <div>
       <HeadTitle title="文章列表"></HeadTitle>
       <div class="article_list">
           <div class="article_search">
               <div class="search_item">
                   <el-input v-model="article_name" placeholder="请输入文章名搜索"></el-input>
                   <el-button type="primary" @click="searchArticle()">搜索</el-button>
               </div>
               <div class="search_date">
                   <el-select v-model="type_id" placeholder="文章类别" @change="typeSearch">
                       <el-option
                               v-for="item in select_data"
                               :key="item.id"
                               :label="item.type"
                               :value="item.id">
                       </el-option>
                   </el-select>
               </div>
           </div>
           <div class="table">
               <el-table
                       :data="tableData"
                       stripe
                       style="width: 100%">
                   <el-table-column
                           label="发表日期"
                           width="180"
                   >
                       <template slot-scope="scope">
                           <span style="margin-left: 10px">{{ scope.row.c_time | dateFormat }}</span>
                       </template>
                   </el-table-column>
                   <el-table-column
                           prop="title"
                           label="标题"
                           width="180">
                   </el-table-column>
                   <el-table-column
                           prop="type"
                           label="文章类别"
                           width="100">
                   </el-table-column>
                   <el-table-column
                           prop="count_read"
                           label="阅读量"
                           width="100">
                   </el-table-column>
                   <el-table-column
                           prop="user_name"
                           label="作者"
                           width="100">
                   </el-table-column>
                   <el-table-column
                           prop="description"
                           label="文章摘要">
                   </el-table-column>
                   <el-table-column
                           label="操作"
                           width="200">
                       <template slot-scope="scope">
                           <div style="display: flex; justify-content: center">
                               <el-button
                                       :disabled="!(scope.row.user_name===userInfo.user_name||userInfo.user_id===1)"
                                       size="mini"
                                       @click="skipArticleAdd(scope.row.article_id)">
                                   编辑
                               </el-button>
                               <DeleteBtn ref="DeleteBtn" @Delete="Delete(scope.$index, scope.row)"
                                          :title="scope.row.title"
                                          :disabled="!(scope.row.user_name===userInfo.user_name||userInfo.user_id===1)">
                               </DeleteBtn>
                           </div>
                       </template>
                   </el-table-column>
               </el-table>
               <el-pagination
                       background
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="current_page"
                       :page-sizes="[10, 20, 30, 50]"
                       :page-size="page_size"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
               </el-pagination>
           </div>
       </div>
   </div>
</template>

<script>
    import HeadTitle from '../components/HeadTitle.vue'
    import DeleteBtn from '../components/DeleteBtn.vue'
    import cookie from 'js-cookie'
    import moment from "moment"
    import { mapState } from 'vuex'
    import {list_article,delete_article} from '../service/Api'
    export default {
        name:"articleList",
        data() {
            return {
                article_name: '',
                tableData: [],
                type_id: 0,
                page_size:10,
                current_page:1,
                total:0,
                userInfo:JSON.parse(cookie.get("userInfo"))
            }
        },
        components:{
            HeadTitle,
            DeleteBtn
        },
        computed: {
            ...mapState(["list_data"]),
            select_data(){
                return [
                    {id:0, type:"全部"}, ...this.list_data  //给下拉刷选加一个全部的选项
                ]
            }
        },
        mounted(){
            this.getArticleList({page:this.current_page,rows:this.page_size});
        },
        methods: {
//            获取文章列表
            getArticleList(page,rows,title,type_id){
                list_article(page,rows,title,type_id)
                    .then(data=>{
                    this.tableData=data.data.data;
                    this.current_page=data.data.currentPage;
                    this.total=data.data.count
                })
            },
//            改变每页显示条数
            handleSizeChange(val) {
                this.page_size=val;
                this.getArticleList({page:this.current_page,rows:val,title:this.article_name,type_id:this.type_id})

            },
//            跳转页面
            handleCurrentChange(val) {
                this.current_page=val;
                this.getArticleList({page:val,rows:this.page_size,title:this.article_name,type_id:this.type_id})
            },
//            按标题查询
            searchArticle(){
                this.getArticleList({page:this.current_page,rows:this.page_size,title:this.article_name,type_id:this.type_id})
            },
//            按文章类型筛选
            typeSearch(v){
                this.type_id=v;
                this.getArticleList({page:this.current_page,rows:this.page_size,title:this.article_name,type_id:v})
            },
//              删除文章
            Delete(index,row){
               delete_article({article_id:row.article_id})
                   .then(data=>{
                       if(data.errno===0){
                           this.$message({
                               message:data.errmsg,
                               type:"success"
                           });
                           this.getArticleList({page:this.current_page,rows:this.page_size,title:this.article_name})
                       }else {
                           this.$message.error(data.errmsg)
                       }
                   })
            },
//            跳转编辑文章页面
            skipArticleAdd(id){
                this.$router.push(`/article-add?id=${id}`)
            }
        },
        filters:{
//            时间过滤器
            dateFormat:function (date) {
                return moment(date*1000).format("YYYY-MM-DD HH:mm:ss")
            }
        },
    }
</script>

<style scope lang="less">
    .article_list{
        background: #fff;
        min-height: 100%;
    }
    .article_search{
        display: flex;
        justify-content: space-between;
        padding: 20px;
        border-bottom: 1px solid #ddd;
    }
    .search_item{
        display: flex;
    }
    .el-input{
        margin-right: 16px;
    }
    .has-gutter>tr>th{
        background: #002329;
        color: #fff;
        text-align: center;
    }
    .table{
        text-align: center;
        padding: 20px;
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
