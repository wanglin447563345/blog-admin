<template>
    <div>
        <HeadTitle title="评论列表"></HeadTitle>
        <div class="article_list">
            <div class="article_search">
                <div class="search_item">
                    <el-input v-model="artilce_name" placeholder="请输入文章名搜索"></el-input>
                    <el-button type="primary">搜索</el-button>
                </div>
            </div>
            <div class="table">
                <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            prop="date"
                            label="发表日期"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="articleName"
                            label="标题"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="discussContent"
                            label="评论内容">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="80">
                        <template slot-scope="scope">
                            <div style="display: flex; justify-content: center">
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">
                                    删除
                                </el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import HeadTitle from '../components/HeadTitle.vue'
    import {mapState} from 'vuex'
    export default {
        name:"discussList",
        data() {
            return {
                artilce_name: '',
                tableData: [{
                    date: '2016-05-02',
                    articleName: '文章一',
                    discussContent: '类型一'
                },{
                    date: '2016-05-02',
                    articleName: '文章一',
                    discussContent: '类型一'
                },{
                    date: '2016-05-02',
                    articleName: '文章一',
                    discussContent: '类型一'
                },{
                    date: '2016-05-02',
                    articleName: '文章一',
                    discussContent: '类型一'
                }],
                value: '',
                currentPage:4,
                dialogFormVisible:false
            }
        },
        components:{
            HeadTitle
        },
        methods: {

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
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
