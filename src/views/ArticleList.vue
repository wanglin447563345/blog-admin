<template>
    <div class="article_list">
        <div class="article_search">
            <div class="search_item">
                <el-input v-model="artilce_name" placeholder="请输入文章名搜索"></el-input>
                <el-button type="primary">搜索</el-button>
            </div>
            <div class="search_date">
                <el-select v-model="value" placeholder="文章类别">
                    <el-option
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
                    prop="date"
                    label="发表日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="标题"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="tag"
                    label="文章类别"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="content"
                    label="文章摘要">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
</template>

<script>
    export default {
        data() {
            return {
                artilce_name: '',
                tableData: [{
                    date: '2016-05-02',
                    name: '文章一',
                    content:"摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要",
                    tag: '类型一'
                }, {
                    date: '2016-05-02',
                    name: '文章一',
                    content:"摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要",
                    tag: '类型一'
                }, {
                    date: '2016-05-02',
                    name: '文章一',
                    content:"摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要",
                    tag: '类型一'
                }, {
                    date: '2016-05-02',
                    name: '文章一',
                    content:"摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要",
                    tag: '类型一'
                }, {
                    date: '2016-05-02',
                    name: '文章一',
                    content:"摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要",
                    tag: '类型一'
                }, {
                    date: '2016-05-02',
                    name: '文章一',
                    content:"摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要",
                    tag: '类型一'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    content:"摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要",
                    tag: '类型一'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    content:"摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要",
                    tag: '类型二'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    content:"摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要",
                    tag: '类型一'
                }],
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
                currentPage:4
            }
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
        background: #bfbfbf;
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
</style>
