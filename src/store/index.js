import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selected: 'profile',
    resume: {
      config: [
        {field: 'profile', icon: 'id'},
        {field: 'work history', icon: 'work'},
        {field: 'education', icon: 'book'},
        {field: 'projects', icon: 'heart'},
        {field: 'awards', icon: 'cup'},
        {field: 'contacts', icon: 'phone'}
      ],
      profile: {
        name: '',
        city: '',
        title: ''
      },
      'work history': [
        {company: 'AL', content: '我的第二封工作是'}
      ],
      education: [],
      projects: [],
      award: [],
      contacts: []
    }
  },
  mutations: {
    switchTab (state, playload) {
      state.selected = playload
    }
  }
})
