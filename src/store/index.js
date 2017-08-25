import Vuex from 'vuex'
import Vue from 'vue'
import objectPath from 'object-path'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selected: 'profile',
    user: {
      id: '',
      username: ''
    },
    resume: {},
    resumeConfig: [
        {field: 'profile', icon: 'id', key: ['name', 'city', 'title', 'birthday']},
        {field: 'workHistory', icon: 'work', type: 'array', key: ['company', 'details']},
        {field: 'education', icon: 'book', type: 'array', key: ['school', 'degree']},
        {field: 'projects', icon: 'heart', type: 'array', key: ['name', 'details']},
        {field: 'awards', icon: 'cup', type: 'array', key: ['name', 'details']},
        {field: 'contacts', icon: 'phone', key: ['email', 'tel', 'github']}]
  },
  mutations: {
    switchTab (state, playload) {
      state.selected = playload
      localStorage.setItem('state', JSON.stringify(state))
    },
    updateResume (state, {path, value}) {
      objectPath.set(state.resume, path, value)
      localStorage.setItem('state', JSON.stringify(state))
    },
    initState (state, playload) {
      state.resumeConfig.map((item) => {
        if (item.type === 'array') {
          Vue.set(state.resume, item.field, [])
        } else {
          Vue.set(state.resume, item.field, {})
          item.key.map((key) => {
            Vue.set(state.resume[item.field], key, '')
          })
        }
      })
      if (playload) {
        Object.assign(state, playload)
      }
    },
    setUser (state, playload) {
      Object.assign(state.user, playload)
    },
    removeUser (state) {
      state.user.id = ''
    }
  }
})
