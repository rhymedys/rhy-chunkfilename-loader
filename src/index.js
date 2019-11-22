/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2019-11-21 19:30:25 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-11-22 22:19:11
 */


const utils = require('loader-utils')

module.exports = function (source, map, meta) {
  this.cacheable()
  const option = utils.getOptions(this) || {}

  const context = this.context




  if (!context.includes('node_modules')) {
    
    console.log('rhy-chunkfilename-loader context is', context)
    console.log('rhy-chunkfilename-loader config is', option)

    const appPageRoot = option.appPageRoot

    if (!appPageRoot) {
      appPageRoot = 'src'
    }

    const hadMatchPos = context.indexOf(appPageRoot)

    if (hadMatchPos < 0) {
      this.callback(null, source, map, meta)
      return
    }


    

    const belongPageStartIndex = hadMatchPos + appPageRoot.length + 1
    let belongPage = context.substr(belongPageStartIndex, context.length)

    if (belongPage && belongPage.length) {
      let end = belongPage.length

      if (belongPage.indexOf('\\') > -1) {
        end = belongPage.indexOf('\\')
      }


      belongPage = belongPage.substr(0, end)
      if (typeof belongPage === 'string' && belongPage.length) {
        console.log('belongpage is', belongPage)

        const newSource = source.replace(new RegExp(/\/\*.*?webpackChunkName.*?\*\//gi), (match) => {

          console.log('rhy-chunkfilename-loader match webpackChunkName',match)
          
          let startPos = match.indexOf("\"") 
          let endPos = match.lastIndexOf("\"") 
          if(startPos<0){
            startPos = match.indexOf("\'")
          }

          if(endPos<0){
            endPos = match.lastIndexOf("\'")
          }

        

          if(startPos>-1 && endPos>-1 && endPos>startPos){
            const res = match.substr(0, startPos) + '"./' + belongPage + '/static/components/' + match.substr(startPos + 1, match.length)
            
            console.log('new value is ', res)
  
  
            return res
          }

          return match
        })

        this.callback(null, newSource, map, meta)
        return
      }

    }

  }

  this.callback(null, source, map, meta)
  return

}