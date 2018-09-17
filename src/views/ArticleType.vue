<template>
    <div class="article_type">
        <div class="type_add">
            <el-row>
                <el-button type="primary" @click="dialogFormVisible = true">新建类别</el-button>
            </el-row>
        </div>
        <el-row>
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
                            prop="views"
                            label="阅读量"
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
                            <div style="display: flex; justify-content: center">
                                <el-button
                                        size="mini"
                                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="1000">
                </el-pagination>
            </div>
        </el-row>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                dialogFormVisible: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px'
            }
        }
    }
</script>

<style scope lang="less">
    .article_type{
        min-height: 100%;
        background: #fff;
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