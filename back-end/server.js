const express = require('express');
const bodyParser = require('body-parser');
const {mongoose}= require('./mongoose');
// Load in the Mongoose models
const{ List, Task } = require('./models');
const PORT = process.env.PORT || 3000;

const app = express();

app.listen(PORT,()=>{
    console.log(`Server running on localhost: ${PORT}` )
});
// Load middleware
app.use(bodyParser.json());

// CORS HEADERS MIDDLEWARE
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
/* ROUTE HANDLERS*/

/*LIST ROUTES*/
/**
 * GET /lists
 * Purpose: Get all lists
 */
app.get('/lists',(req, res)=>{
    // We want return an array of all the lists in the database
    List.find({}).then((lists)=>{
        res.send(lists);
    });
});

app.get('/lists/:listId/tasks/:taskId',(req,res)=>{
    Task.findOne({
        _id : req.params.taskId,
        _listId: req.params.listId
    }).then((task)=>{
        res.send(task)
    });
});

/**
 * POST /lists
 * Purpose: Create a list
 */
app.post('/lists',(req, res)=>{
    // We want to create a new list and return the new list document back to the 
    //user (Which includes the id)
    // The list information (fields) will be passed via the JSON request body
    let title = req.body.title; 

    let newList = new List({
        title
    });

    newList.save().then((listDoc)=>{
        //the full list documnets is returned ( incl .id)
        res.send(listDoc);
    })
});



/**
 * PATCH /lists/:id
 * Purpose: Update a specific list
 */
 app.patch('/lists/:id',(req, res)=>{
    // We want to update the specified list (list document with id in the URL) with the
    // new values specified in the JSON body of the request
    List.findOneAndUpdate(
        {
            _id : req.params.id
        },{
        $set: req.body
    }).then(()=>{
        res.sendStatus(200);
    });
});

/**
 * DELETE /lists/:id
 * Purpose: Delete a specific list
 */
 app.delete('/lists/:id',(req, res)=>{
    // We want to delete  the specified list (list document with id in the URL)
    List.findOneAndRemove({_id: req.params.id}).then((removedListDoc)=>{
        res.send(removedListDoc);
    });
});


/**
 * GET /lists/:listId/tasks
 * Purpose: Get all tasks in a specific list
 */
app.get('/lists/:listId/tasks',(req,res)=>{
    // We want to return all tasks that belong to specific list (Specified by listId)
    Task.find({
        _listId : req.params.listId
    }).then((tasks)=>{
        res.send(tasks);
    });
});

/**
 * POST /lists/:listId/tasks
 * Purpose: Create a new task in a specific list
 */
 app.post('/lists/:listId/tasks',(req,res)=>{
    // We want to create a new task in a list specified by listId
   let newTask = new Task({
       title : req.body.title,
       _listId : req.params.listId
   });
   newTask.save().then((newTaskDoc)=>{
        res.send(newTaskDoc);
   });
});

/**
 * PATCH /lists/:listId/tasks/:taskId
 * Purpose: Update a existing task in a specific list (specified by taskId)
 */

app.patch('/lists/:listId/tasks/:taskId',(req,res)=>{
    // We want to update an existing task (specified by taskId)
    Task.findOneAndUpdate({
        _id : req.params.taskId,
        _listId : req.params.listId
    },{
        $set : req.body
    }).then(()=>{
        res.sendStatus(200);
    });
});

/**
 * DELETE /lists/:listId/tasks/:taskId
 * Purpose: Delete a task
 */
app.delete('/lists/:listId/tasks/:taskId',(req,res)=>{ 
    // We want to delete an existing task in the list
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
        }).then((removedTaskDoc)=>{
            res.send(removedTaskDoc);
        });
});