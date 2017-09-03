<template>
  <div id="resumeEditor">
    <nav>
      <ol>
        <li v-for="(item, index) in resumeConfig" :class="{active: item.field === selected}"
            @click="selected = item.field">
          <svg class="icon">
            <use :xlink:href="`#icon-${item.icon}`"></use>
          </svg>
          <p>{{iconDict[item.field]}}</p>
        </li>
      </ol>
    </nav>
    <ol class="panels">
      <li v-for="(item, index) in resumeConfig" v-show="item.field === selected" class="animated fadeIn">
        <h3>{{dict[item.field]}}
          <Button type="ghost" shape="circle" icon="plus-round"
                  v-if="item.field !== 'profile' && item.field !== 'contacts'" @click="addNewData(item)"></Button>
        </h3>
        <div v-if="item.type === 'array'">
          <div v-for="(subitem, i) in resume[item.field]">
            <div class="deleteAction">
              <hr>
              <Icon type="ios-arrow-right"></Icon>
              <Button type="ghost" shape="circle" icon="ios-trash-outline" size="small"
                      @click="deleteData(i, item)"></Button>
            </div>
            <div class="resumeInfo" v-for="(value, key) in subitem">
              <label>{{key}}</label>
              <Input v-if="key === 'details'" :value="value" type="textarea" :autosize="true"
                     placeholder="Please enter..."
                     @on-change="changeResumeInfo(`${item.field}.${i}.${key}`, $event.target.value)"></Input>
              <Input v-else placeholder='Please enter...' :value="value"
                     @on-change="changeResumeInfo(`${item.field}.${i}.${key}`, $event.target.value)"></Input>
            </div>
          </div>
        </div>

        <div v-else class="resumeInfo" v-for="(value, key) in resume[item.field]">
          <label>{{key}}</label>
          <Input placeholder="Please enter..." :value="value" style="width: 300px"
                 @on-change="changeResumeInfo(`${item.field}.${key}`,$event.target.value)"></Input>
        </div>
      </li>
    </ol>
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
          skills: 'Skills',
          contacts: 'Contacts'
        },
        iconDict: {
          profile: 'Personal',
          workHistory: 'Works',
          education: 'Education',
          projects: 'Projects',
          awards: 'Awards',
          skills: 'Skills',
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
      changeResumeInfo (path, value) {
        this.$store.commit('updateResume', {
          path,
          value
        })
      },
      addNewData (dataConfig) {
        this.$store.commit('addNewData', dataConfig)
      },
      deleteData (dataIndex, dataConfig) {
        this.$store.commit('deleteData', {dataIndex, dataConfig})
      }
    }
  }
</script>

<style scoped lang="scss">

  #resumeEditor {
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: row;
    min-width: 35%;
    transition: left 1s;
    > .panels {
      flex-grow: 1;
      overflow: auto;
      > li {
        padding: 24px;
        > h3 {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .deleteAction {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          > hr {
            flex-grow: 1;
          }
        }
        .resumeInfo {
          margin-bottom: 10px;
          margin-top: 10px;
          label {
            display: block;
            font-weight: bold;
          }
          input[type=text] {
            margin: 16px 0;
            border: 1px solid #ddd;
            box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.25);
            width: 100%;
            height: 40px;
            padding: 0 8px;
          }
        }
      }
    }
    > nav {
      width: 72px;
      background: #000;
      color: #fff;
      &:hover {
        > ol {
          > li {
            p {
              transform: translateX(0px)
            }
          }
        }
      }
      > ol {
        > li {
          height: 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 16px;
          margin-bottom: 16px;
          cursor: pointer;
          font-size: 12px;
          &.active {
            background: #fff;
            color: #000;
          }
          p {
            transform: translateX(-100px);
            transition: transform 0.5s;
          }
          &.active {
            p {
              transform: translateX(0px);
            }
          }
          svg.icon {
            width: 24px;
            height: 24px;
          }
        }
        li:nth-child(6) {
          svg.icon {
            width: 32px;
            height: 32px;
          }
        }
      }
    }
  }

  #resumeEditor.preview {
    display: none;
  }
</style>
