<template>
  <div id="resumePreview">
    <section data-name="profile" v-if="resume.profile && resume.profile.name">
      <h1>{{resume.profile.name}}</h1>
      <h2>{{resume.profile.title}}</h2>
      <p>
        <small v-if="resume.profile.city">
          <Icon type="ios-location"></Icon>{{resume.profile.city}}
        </small>
        <small v-if="resume.profile.birthday">
          <Icon type="egg"></Icon>{{resume.profile.birthday}}
        </small>
      </p>
    </section>
    <section data-name="workHistory" v-if="resume.workHistory && resume.workHistory.length > 0">
      <h1>Work Experience</h1>
      <ol>
        <li v-for="item in resume.workHistory">
          <h3>{{item.company}}</h3>
          <p v-show="item.details">{{item.details}}</p>
        </li>
      </ol>
      <hr>
    </section>
    <section data-name="education" v-if="resume.education && resume.education.length > 0">
      <h1>Education</h1>
      <ol>
        <li v-for="item in resume.education">
          <h3>{{item.school}}</h3>
          <p v-show="item.degree">{{item.degree}}</p>
        </li>
      </ol>
      <hr>
    </section>
    <section data-name="projects" v-if="resume.projects && resume.projects.length > 0">
      <h1>Project Experience</h1>
      <ol>
        <li v-for="item in resume.projects">
          <h3>{{item.name}}</h3>
          <p v-show="item.details">{{item.details}}</p>
        </li>
      </ol>
      <hr>
    </section>
    <section data-name="awards" v-if="resume.awards && resume.awards.length > 0">
      <h1>Awards</h1>
      <ol>
        <li v-for="item in resume.awards">
          <h3>{{item.name}}</h3>
          <p v-show="item.details">{{item.details}}</p>
        </li>
      </ol>
      <hr>
    </section>
    <section data-name="skills" v-if="resume.skills && resume.skills.length > 0">
      <h1>Skills</h1>
      <ol>
        <li v-for="item in resume.skills">
          <i-circle :percent="parseFloat(item.percent) || 0" stroke-color="#000">
            <div class="demo-i-circle-inner">
              <h6>{{item.skill}}</h6>
              <p>{{parseFloat(item.percent) || 0}}%</p>
            </div>
          </i-circle>
        </li>
      </ol>
      <hr>
    </section>
    <section data-name="contacts" v-if="resume.contacts && resume.contacts.tel">
      <h1>Contacts</h1>
      <p>
        <Icon type="ios-email-outline" size="30"></Icon>
        <span>{{resume.contacts.email}}</span>
      </p>
      <p>
        <Icon type="ios-telephone-outline" size="30"></Icon>
        <span>{{resume.contacts.tel}}</span>
      </p>
      <p>
        <Icon type="social-github-outline" size="30"></Icon>
        <a href="https://github.com/LeeeoZhang">{{resume.contacts.github}}</a></p>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'ResumePreview',
    computed: {
      resume () {
        return this.$store.state.resume
      }
    }
  }
</script>

<style lang="scss">
  #resumePreview {
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25);
    color: #333;
    line-height: 1.2;
    overflow: auto;
    flex-grow: 1;
    margin-left: 16px;
    max-width: 1000px;
    transition: all .5s;
    * {
      box-sizing: border-box;
      font-variant: normal;
      font-weight: normal;
    }
    ol {
      list-style: none;
    }
    section {
      padding: 2em;
      > h1 {
        font-weight: bold;
      }
      > ol {
        > li {
          margin: 2em 0;
          > h3 {
            font-weight: bold;
            margin-bottom: .5em;
            font-size: 16px;
          }
          > p {
            font-size: 16px;
          }
        }
      }
    }
    p {
      white-space: pre-line;
    }
    section[data-name='profile'] {
      background: #000;
      color: #fff;
      margin-bottom: 1.5em;
      margin-top: 0;
      > h1 {
        margin: .1em 0;
        font-size: 4em;
      }
      > p {
        margin: 1em 0;
        display: flex;
        > small:nth-child(2) {
          margin-left: .8em;
          > i {
            margin-right: .2em;
          }
        }
      }
    }
    section[data-name='education'] {
      li {
        line-height: 1.5;
      }
    }
    section[data-name='contacts'] {
      > h1 {
        margin-bottom: .5em;
      }
      > p {
        font-size: 16px;
        margin: 5px 0;
        display: flex;
        align-items: center;
        > span {
          font-weight: bold;
        }
        > i {
          margin-right: .5em;
        }
      }
    }
    section[data-name='skills'] {
      >ol {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        .demo-i-circle-inner {
          h6 {
            margin-bottom: 8px;
            font-weight: bold;
          }
        }
      }
    }
  }

  #resumePreview.preview {
    margin: 0 auto;
  }
</style>
