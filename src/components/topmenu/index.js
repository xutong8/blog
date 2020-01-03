import topmenu from './topmenu.vue'

topmenu.install = (Vue) => {
    Vue.component(topmenu.name, topmenu)
}

export default topmenu