const {connect} = require('mongoose');

let connectDB=url=> connect(url);

module.exports=connectDB;