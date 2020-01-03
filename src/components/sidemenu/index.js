import sidemenu from './sidemenu.vue'

sidemenu.install = (Vue) => {
    Vue.component(sidemenu.name, sidemenu)
}

export default sidemenu