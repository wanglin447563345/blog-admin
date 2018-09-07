<template>
    <div class="article_list">
        <div class="article_search">
            <div class="search_item">
                <el-input v-model="artilce_name" placeholder="请输入文章名搜索"></el-input>
                <el-button type="primary">搜索</el-button>
            </div>
            <div class="search_date">
                <el-button @click="handleShow" type="primary" icon="el-icon-plus">用户</el-button>
            </div>
        </div>
        <div class="table">
            <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="date"
                        label="创建日期">
                </el-table-column>
                <el-table-column
                        prop="userName"
                        label="用户名">
                </el-table-column>
                <el-table-column
                        prop="userController"
                        label="可操作用户">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <div style="display: flex; justify-content: center">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">重置密码</el-button>
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
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
            </el-pagination>
        </div>
        <el-dialog title="新增用户" :visible.sync="dialogFormVisible" width="480px">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2"  label-width="90px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="user_name">
                    <el-input v-model.number="ruleForm2.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="可操作用户" prop="userController">
                    <el-radio v-model="ruleForm2.userController" label="0">否</el-radio>
                    <el-radio v-model="ruleForm2.userController" label="1">是</el-radio>
                </el-form-item>
                <!--<el-form-item>-->
                    <!--<el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>-->
                <!--</el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleHidden">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm2')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name:"userList",
        data() {
            const checkUserName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空'));
                }

            };
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm2.password !== '') {
                        this.$refs.ruleForm2.validateField('password');
                    }
                    callback();
                }
            };
            return {
                artilce_name: '',
                tableData: [{
                    date: '2016-05-02',
                    userName: '文章一',
                    userController:"是",
                },{
                    date: '2016-05-02',
                    userName: '文章一',
                    userController:"否",
                },{
                    date: '2016-05-02',
                    userName: '文章一',
                    userController:"是",
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
                currentPage:4,
                dialogFormVisible:false,
                ruleForm2: {
                    userName: '',
                    password: '',
                    userController: "0"
                },
                rules2: {
                    userName: [
                        { validator: checkUserName, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                },
            }
        },
        computed: mapState([
            "a",
            "b"
        ]),
        methods: {
            //            添加用户
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogFormVisible=false
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //            显示弹窗
            handleShow(){
                this.dialogFormVisible=true
            },
            //            取消
            handleHidden(){
                this.dialogFormVisible=false
            },
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

</style>
