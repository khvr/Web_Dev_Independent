const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://tm_db:tm_db@taskmanager-axjzg.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true
    }).then(() => {
        console.log("Connected to MongoDb successfully :)");
    }).catch((e) => {
        console.log("Error while attempting to connect to MongoDB");
        console.log(e);
    });

// To prevent deprectation warnings (from MongoDB native driver)
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.export = {
    mongoose
};
