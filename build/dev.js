var Parcel = require('parcel-bundler')
var path = require('path')
var fs = require('fs')

var option = {
  watch: true
}

// var subpages = fs.readFileSync(path.join(__dirname, '../src/doc.config.json'), 'utf-8')
// if (subpages) {
//   subpages = JSON.parse(subpages)

//   // var task = []
//   // for(var i=0; i<subpages.length; i++) {
//   //   var group = subpages[i].group
//   //   for(var j=0; j<group.length; j++) {
//   //     var page = group[j]
//   //     var fileContent = 'export function render() { return require("../../src/docs/' + page.name + '.vue") }'
//   //     var file = path.join(__dirname, 'temp', page.name + '.js')
//   //     fs.writeFileSync(file, fileContent)
//   //     console.log("build:", '[', page.name + '.vue', ']')

//   //     task.push(new Parcel(file).bundle(), option)
//   //   }
//   // }

//   // for(var i=0; i<subpages.length; i++) {
//   //   var group = subpages[i].group
//   //   for(var j=0; j<group.length; j++) {
//   //     var page = group[j]
//   //     var file = path.join(__dirname, '../src/docs', page.name + '.vue')
//   //     console.log("build:", '[', page.name + '.vue', ']')
//   //     task.push(new Parcel(file).bundle(), option)
//   //   }
//   // }
  
// }

var entry = new Parcel(path.join(__dirname, '../src/index.html'), option)
entry.bundle()
entry.serve(1234)

setTimeout(function(){
  require('opn')('http://localhost:1234')
}, 500)




