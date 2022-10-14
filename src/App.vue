<template>
  <div id="app">
    <Header />
    <!-- 路由配置配置的就是这里具体呈现什么 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  beforeMount() {
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>
