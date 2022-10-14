<template>
    <div>
        <TypeNav/>
        <ListContainer/>
        <TodayRecommend/>
        <Rank/>
        <Like/>
        <Floor v-for="floor in floorList" :key="floor.id" :list="floor"/>
        <Brand/>
    </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer';
import TodayRecommend from '@/pages/Home/TodayRecommend';
import Rank from '@/pages/Home/Rank';
import Like from '@/pages/Home/Like';
import Floor from '@/pages/Home/Floor';
import Brand from '@/pages/Home/Brand';
import {mapState} from 'vuex';
export default {
    name:'Home',
    components: {
        ListContainer,
        TodayRecommend,
        Rank,
        Like,
        Floor,
        Brand,
    },
    mounted() {
        this.$store.dispatch('getFloorList');
        // //登陆后获取用户信息
        // this.$store.dispatch("getUserInfo");
    },
    computed: {
        ...mapState({floorList:(state)=>{
            return state.home.floorList;
        }})
    }
}
</script>

<style>

</style>