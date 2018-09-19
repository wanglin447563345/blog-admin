<template>
    <div class="article_list">
        <div class="article_search">
            <div class="search_item">
                <el-input v-model="article_name" placeholder="请输入文章名搜索"></el-input>
                <el-button type="primary" @click="searchArticle()">搜索</el-button>
            </div>
            <div class="search_date">
                <el-select v-model="value" placeholder="文章类别">
                    <el-option
                            change="typeSearch()"
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
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
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <!--<el-button-->
                                <!--size="mini"-->
                                <!--type="danger"-->
                                <!--@click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
                        <DeleteBtn ref="DeleteBtn" @Delete="Delete(scope.$index, scope.row)" :title="scope.row.title"></DeleteBtn>
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
</template>

<script>
    import moment from "moment"
    import {list_article} from '../service/Api'
    import DeleteBtn from '../components/DeleteBtn.vue'
    export default {
        data() {
            return {
                article_name: '',

                tableData: [],
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
                page_size:10,
                current_page:1,
                total:0
            }
        },
        mounted(){
            this.getArticleList({page:this.current_page,rows:this.page_size})
        },
        components: {
            DeleteBtn
        },
        methods: {
            getArticleList(page,rows,title,type_id){
                list_article(page,rows,title,type_id)
                    .then(data=>{
                    this.tableData=data.data.data;
                    this.current_page=data.data.currentPage;
                    this.total=data.data.count
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
//            按标题查询
            searchArticle(){
                console.log(111)
                this.getArticleList({page:this.current_page,rows:this.page_size,title:this.article_name})
            },
//            按文章类型筛选
            typeSearch(v){
                console.log(11)
                console.log(v)
            },

            Delete(index,row){
                console.log(index)
                console.log(row)
            }
        },
        filters:{
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
