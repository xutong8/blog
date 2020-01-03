import layout from './layout.vue'

layout.install = (Vue) => {
    Vue.component(layout.name, layout)
}

export default layout