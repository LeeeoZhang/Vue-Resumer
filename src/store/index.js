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
      Object.assign(state, playload)
      localStorage.setItem('state', JSON.stringify(state))
    },
    setUser (state, playload) {
      Object.assign(state.user, playload)
      localStorage.setItem('state', JSON.stringify(state))
    },
    removeUser (state) {
      state.user.id = ''
      state.user.username = ''
      localStorage.setItem('state', JSON.stringify(state))
    },
    addNewData (state, dataConfig) {
      let name = dataConfig.key[0]
      let content = dataConfig.key[1]
      state.resume[dataConfig.field].push({
        [name]: '',
        [content]: ''
      })
      localStorage.setItem('state', JSON.stringify(state))
    },
    deleteData (state, {dataIndex, dataConfig}) {
      state.resume[dataConfig.field].splice(dataIndex, 1)
      localStorage.setItem('state', JSON.stringify(state))
    }
  }
})
