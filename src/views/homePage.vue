<template>
    <section class="wrapper">
    homePage
    <van-button @click="goTest1" type="primary">跳转test1</van-button>

     <p class="test">store-count: {{ store.state.count }}</p>
     <p class="norem-test">store-count: {{ store.state.count }}</p>

        <input type="text" :value="store.state.count" @input="countInput"/>
        <button @click="setupCount(100)">设置count为100</button>


        <p>{{ publishedBooksMessage }}</p>
        <p>{{ publishedBooksMessage2() }}</p>

        <p>{{ now }}</p>

        <p>{{ fullName }}</p>
        <p>{{ fullName2 }}</p>


        <div class="a1" :class="{'active': isActive}">demo</div>

        <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }">12</div>


        <van-skeleton banner :row="0" :loading="loading">
            <div >实际内容2</div>
        </van-skeleton>

        <div class="skeleton" :loading="loading">
            <van-skeleton :row="3" />
            <van-skeleton :row="3" row-width="160" />
            <van-skeleton :row="3" row-width="160" />
        </div>


        <p id="red" v-bind="{id: 'blue'}">测试id</p>
        
        <!--<img src="/images/bg.jpg" />-->
        <!--<img src="/images/more.svg" />-->
        <!--<img src="/images/logo.png" />-->
        <!--<img src="@/assets/logo.png" />-->



        <ul>
            <li v-for="(item, i) in new_List" :ref="el => { if (el) divs[i] = el }">{{ item.name }}</li>
        </ul>


        <el-button color="#626aef" style="color: white">Primary</el-button>

        <el-button color="#626aef" plain>Custom</el-button>

    </section>
</template>

<script setup>
    import { onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router'
    import { getToken } from '@/api/base'

    const divs = ref([])
    const list = ref([
        {
            name: 'test1',
            isActive: true
        },
        {
            name: 'test2',
            isActive: true
        },
        {
            name: 'test3',
            isActive: true
        },
        {
            name: 'test4',
            isActive: true
        },
        {
            name: 'test5',
            isActive: true
        },
        {
            name: 'test6',
            isActive: false
        },
        {
            name: 'test7',
            isActive: true
        },
        {
            name: 'test8',
            isActive: false
        },
        {
            name: 'test9',
            isActive: true
        },
        {
            name: 'test10',
            isActive: false
        },
    ])

    const new_List = computed(() =>{
        return list.value.filter(item => item.isActive)
    })

    const loading = ref(true)

    const isActive = ref(true)

    const books  = ref([
        'Vue 2 - Advanced Guide',
        'Vue 3 - Basic Guide',
        'Vue 4 - The Mystery'
    ])

    const user = reactive({
        firstName: 'Hello',
        lastName: 'Kitty'
    })

    //vue3的监听
    const fullName = ref('')

    /**
     *  watch有三个参数
     *  1、监听对象
     *  2、回调函数
     *  3、watch属性 immediate deep
     */

    watch(user, ({firstName, lastName}) => {
        fullName.value = firstName + '_' + lastName
    }, {immediate: true, deep: true})

    /**
     *  vue3新加入的监听
     *  不需要配置属性
     *  第一次默认监听，可以不写immediate属性
     */
    const fullName2 = ref('')
    watchEffect(() => {
        fullName2.value = user.firstName + '==' + user.lastName
    })


    const router = useRouter()
    const store = useStore()

    //计算属性
    const publishedBooksMessage = computed(() => {
        console.log(books.value)
        return books.value.length >2 ? 'YES' : 'NO'
    })

    const now = computed(() => {
        return Date.now()
    })

    const publishedBooksMessage2 = ()=>{
        return books.value.length >2 ? 'YES' : 'NO'
    }

    const goTest1 = ()=>{
        router.push('/test1')
    }

    onMounted(() =>{
        console.log(store, 'store')
        getToken().then(res =>{
            loading.value = false;
        })

    })

    const countInput= (e)=>{
        console.log(e.target.value, 'countInput')
        store.commit('setCount', e.target.value)
    }

    const setupCount = (val)=>{
        store.commit('setCount', val)
        user.firstName = 'HELLOa '
        user.firstName = 'LuckHK '
    }

   onBeforeRouteUpdate((to, from) =>{
       console.log(to, '======')
   })
//
//    onBeforeRouteLeave((to, from) => {
//        console.log(to, 'onBeforeRouteLeave======')
//    })
</script>
<style lang="less" scoped>
    .wrapper{
        width: 100%;
        min-height: 100vh;
        overflow: hidden;
    }
    .test{
      font-size: 30px;
    }
    .norem-test{
      font-size: 30px;
    }
    .skeleton {
        /deep/.van-skeleton__content {
            display: flex;
            /deep/.van-skeleton__row {
                width: 50px!important;
                height: 50px;
                margin: 17px 0px;
            }
        }
    }
</style>