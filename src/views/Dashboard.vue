<template>
  <div class="dashboard">
      <div id="bar" :style="{width: '300px', height: '340px'}"></div>
      <div id="pie" :style="{width: '340px', height: '340px'}"></div>
  </div>
</template>

<script>
    import Vue from "vue";
    const echarts = require('echarts/lib/echarts');
    // 引入柱状图
    require('echarts/lib/chart/bar');
//    引入饼图
    require("echarts/lib/chart/pie");
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    Vue.prototype.$echarts = echarts;
    export default {
        name:"dashboard",
        mounted(){
            this.drawBar();
            this.drawPie();
        },
        methods:{
            drawBar(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('bar'));
                // 绘制图表
                myChart.setOption({
                    title: { text: '文章发布量统计' },
                    tooltip: {},
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                });
            },
            drawPie(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('pie'));
                // 绘制图表
                myChart.setOption({
                    title : {
                        text: '某站点用户访问来源',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'horizontal',
                        bottom: 'bottom',
                        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                    },
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:335, name:'直接访问'},
                                {value:310, name:'邮件营销'},
                                {value:234, name:'联盟广告'},
                                {value:135, name:'视频广告'},
                                {value:1548, name:'搜索引擎'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            }
        }
    }
</script>
<style scope lang="less">
    .dashboard{
        background: #fff;
        min-height: 100%;
        display: flex;
        padding-top: 40px;
        justify-content: space-around;
    }
</style>
