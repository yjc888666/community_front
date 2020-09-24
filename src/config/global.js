const routeTo = (path) => {
  window.open(path, '_blank')
}

const share = (type, title, pic) => {
  let url = location.href.substring(0, location.href.lastIndexOf('/')) + process.env.IMG
  let link = location.href
  pic = pic ? '&pic=' + url + pic : ''
  if (type === 1) {
    routeTo('http://connect.qq.com/widget/shareqq/index.html?url=' + link + '&title=' + title)
  } else if (type === 2) {
    routeTo('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + link + '&title=' + title)
  } else {
    routeTo('http://service.weibo.com/share/share.php?url=' + link + '&title=' + title + pic)
  }
}

export default {
  routeTo,
  share,
}
