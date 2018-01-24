var Parcel = require('parcel-bundler')
var path = require('path')

var parcel = new Parcel(path.join(__dirname, '../page/Index.html'))
parcel.bundle()
