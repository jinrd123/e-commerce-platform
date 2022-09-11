<template>
    <div class="pagination">
        <!-- 当pageNo为1时不能点击上一页 -->
        <button :disabled="pageNo===1" @click="$emit('changePageNo',pageNo-1)">上一页</button>
        <button v-show="startNumAndEndNum.start>1" @click="$emit('changePageNo',1)" :class="{active:pageNo===1}">1</button>
        <button v-show="startNumAndEndNum.start>2">···</button>

        <!-- 分页器中间部分 -->
        <!-- 中间部分稳定呈现，上部分“1”和“...”和下部分的“...”和“totalPage”根据情况隐藏 -->
        <button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-if="page>=startNumAndEndNum.start" @click="$emit('changePageNo',page)" :class="{active:pageNo===page}">{{page}}</button>


        <button v-show="startNumAndEndNum.end<totalPage-1">···</button>
        <button v-show="startNumAndEndNum.end<totalPage" @click="$emit('changePageNo',totalPage)" :class="{active:pageNo===totalPage}">{{totalPage}}</button>
        <button :disabled="pageNo===totalPage" @click="$emit('changePageNo',pageNo+1)">下一页</button>

        <button style="margin-left: 30px">共 {{totalPage}} 条</button>
        <div>{{startNumAndEndNum}}</div>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props:['pageNo','pageSize','total','continues'],
        mounted() {
            console.log()
        },
        computed:{
            totalPage() {
                return Math.ceil(this.total/this.pageSize);
            },
            //计算分页器中间连续部分的起始与结束位置
            startNumAndEndNum() {
                const {continues,pageNo,totalPage} = this;
                //定义两个数字存储起始数字与结束数字
                let start = 0, end = 0;
                //分页器中间连续部分一般为奇数，我们计算除去中间一个数字，分页器一半的大小
                let half = (continues - 1) / 2;
                //总页数都凑不齐中间连续的数量
                if(totalPage <= continues) {
                    start = 1;
                    end = totalPage;
                }else {//总页数比中间连续的数量多
                    if((pageNo + half) >= totalPage) {//如果分页器最后一页超过总数，把end设置为totalPage
                        end = totalPage;
                        start = totalPage - continues + 1;
                    }else if(pageNo - half <= 1) {//分页器第一页小于1，把start设置为1
                        start = 1;
                        end = continues;
                    }else {//第一页和最后一页在正常范围（1-totalPage）内
                        start = pageNo - half;
                        end = pageNo + half;
                    }
                }
                return {start, end};
            }
        },
    }
</script>

<style lang="less" scoped>
    .pagination {
        text-align: center;
        button {
            margin: 0 5px;
            background-color: #f4f4f5;
            color: #606266;
            outline: none;
            border-radius: 2px;
            padding: 0 4px;
            vertical-align: top;
            display: inline-block;
            font-size: 13px;
            min-width: 35.5px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            box-sizing: border-box;
            text-align: center;
            border: 0;

            &[disabled] {
                color: #c0c4cc;
                cursor: not-allowed;
            }

            &.active {
                cursor: not-allowed;
                background-color: #409eff;
                color: #fff;
            }
        }
        .active {
            background: skyblue;
        }
    }
</style>