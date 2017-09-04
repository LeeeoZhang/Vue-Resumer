import AV from './leancloud'

export default function (state) {
  if (!state.resume.id) {
    let resume = JSON.stringify(state.resume)
    let AVresume = AV.Object.extend('AVresume')
    let avResume = new AVresume()
    let acl = new AV.ACL()
    acl.setReadAccess(AV.User.current(), true)
    acl.setWriteAccess(AV.User.current(), true)
    avResume.setACL(acl).set('content', resume)
    avResume.save().then((value) => {
      state.resume.id = value.id
      console.log('保存成功')
    }, function (error) {
      console.log('保存失败', error)
    })
  } else {
    let resume = JSON.stringify(state.resume)
    console.log(state.resume.id)
    let avResume = AV.Object.createWithoutData('AVresume', state.resume.id)
    avResume.set('content', resume)
    avResume.save().then(() => {
      console.log('更新成功')
    }, function (error) {
      console.log('更新失败', error)
    })
  }
}
