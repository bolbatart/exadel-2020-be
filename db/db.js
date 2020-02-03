// Connecting to mongoDB test db
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost:27017/test',
err => { if(!err) { console.log('Successful connection') }
	else { console.log('error ' + err) }});

require('../models/user.model.js');
require('../models/project.model');
require('../models/token.model');