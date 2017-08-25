<template>
  <div id="resumeEditor">
    <nav>
      <ol>
        <li v-for="(item, index) in resumeConfig" :class="{active: item.field === selected}" @click="selected = item.field">
          <svg class="icon">
             <use :xlink:href="`#icon-${item.icon}`"></use>
          </svg>
        </li>
      </ol>
    </nav>
    <ol class="panels">
      <li v-for="(item, index) in resumeConfig" v-show="item.field === selected">
        <h3>{{dict[item.field]}}</h3>
        <div v-if="item.type === 'array'">
          <div v-for="(subitem, i) in resume[item.field]">
            <div class="resumeInfo" v-for="(value, key) in subitem">
              <label>{{key}}</label>
              <input type="text" @input="changeResumeField(`${item.field}.${i}.${key}`, $event.target.value)">
            </div>
          </div>
        </div>

        <div v-else class="resumeInfo" v-for="(value, key) in resume[item.field]">
          <label >{{key}}</label>
          <input type="text" @input="changeResumeField(`${item.field}.${key}`,$event.target.value)">
        </div>
      </li>
    </ol>







    <!--<ol class="panels">-->
      <!--<li v-for="(item, index) in resumeConfig" v-show="item.field === selected">-->
        <!--<div v-if="item.type === 'array'">-->
          <!--<div class="subitem" v-for="(subitem, i) in resume[item.field]">-->
            <!--<div class="resumeField" v-for="(value, key) in subitem">-->
              <!--<label>{{key}}</label>-->
              <!--<input type="text" :value="value" @input="changeResumeField(`${item.field}.${i}.${key}`, $event.target.value)">-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div v-else class="resumeField" v-for="(value, key) in resume[item.field]">-->
          <!--<label >{{key}}</label>-->
          <!--<input type="text" :value="value" @input="changeResumeField(`${item.field}.${key}`,$event.target.value)">-->
        <!--</div>-->
      <!--</li>-->
    <!--</ol>-->
  </div>
</template>

<script>
  export default {
    name: 'ResumeEditor',
    data () {
      return {
        dict: {
          profile: 'Personal Information',
          workHistory: 'Work Experience',
          education: 'Education',
          projects: 'Project Experience',
          awards: 'Awards',
          contacts: 'Contacts'
        }
      }
    },
    computed: {
      selected: {
        get () {
          return this.$store.state.selected
        },
        set (value) {
          return this.$store.commit('switchTab', value)
        }
      },
      resume () {
        return this.$store.state.resume
      },
      resumeConfig () {
        return this.$store.state.resumeConfig
      }
    },
    methods: {
      changeResumeField (path, value) {
        this.$store.commit('updateResume', {
          path,
          value
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  #resumeEditor {
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
    display: flex;
    flex-direction: row;
    overflow: auto;
    >.panels{
      flex-grow: 1;
      >li {
        padding: 24px;
        .resumeField {
          label {
            display: block;
          }
          input[type=text] {
            margin: 16px 0;
            border: 1px solid #ddd;
            box-shadow: inset 0 1px 3px 0 rgba(0,0,0,0.25);
            width: 100%;
            height: 40px;
            padding: 0 8px;
          }
        }
      }
    }
    >nav {
      width: 80px;
      background: #000;
      color: #fff;
      >ol {
        >li {
          height: 48px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 16px;
          margin-bottom: 16px;
          cursor: pointer;
          &.active {
            background: #fff;
            color: #000;
          }
          svg.icon {
            width: 24px;
            height: 24px;
          }
        }
      }
    }
  }
</style>
