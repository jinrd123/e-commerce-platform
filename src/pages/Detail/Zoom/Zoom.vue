<template>
  <div class="spec-preview">
    <!-- 左上大图 -->
    <img :src="imgObj.imgUrl" />
    <!-- 绑定事件的元素 -->
    <div class="event" @mousemove="handler"></div>
    <!-- 右侧放大图 -->
    <div class="big">
      <!-- 放大镜里的图片，和左上大图一样 -->
      <img :src="imgObj.imgUrl" ref="big"/>
    </div>
    <!-- 绿色放大镜遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['skuImageList'],
    data() {
      return {
        currentIndex: 0,
      }
    },
    computed:{
      imgObj() {
        return this.skuImageList[this.currentIndex]||{};
      }
    },
    mounted() {
      //全局事件总线，获取兄弟组件(下面的轮播图列表)传递过来的索引值
      this.$bus.$on("getIndex", (index) => {
        this.currentIndex = index;
      })
    },
    methods: {
      handler(event) {
        let mask = this.$refs.mask;
        let big = this.$refs.big;
        let left = event.offsetX - mask.offsetWidth/2;
        let top = event.offsetY - mask.offsetHeight/2;
        //限制遮罩层不出界
        //左界
        if(left < 0) {
          left = 0;
        }
        //右界
        if(left + mask.offsetWidth >= event.target.offsetWidth) {
          left = event.target.offsetWidth - mask.offsetWidth;
        }
        //上界
        if(top < 0) {
          top = 0;
        }
        //下界
        if(top + mask.offsetHeight > event.target.offsetHeight) {
          top = event.target.offsetHeight - mask.offsetHeight;
        }
        //修改遮罩层的left|top属性值;同时修改放大区域的left|top属性值(放大镜相关逻辑并不明白，只知道修改相关定位属性即可)
        mask.style.left = left+"px";
        mask.style.top = top+"px";
        big.style.top = -2*top+"px";
        big.style.left = -2*left+"px";
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>