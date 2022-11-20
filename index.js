const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(express.json())
const db = "mongodb+srv://Sanjeev:Sanju266@cluster0.erlocnt.mongodb.net/FullStack?retryWrites=true&w=majority"
app.use(cors());
app.use(bodyParser.json());




mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("success");
}).catch((err) => {
    console.log(err)
});

const todoSchema = new mongoose.Schema({
    taskName: String,
    comment: String,
    date: String
})
const TodoList = mongoose.model('TodoList', todoSchema);

app.post('/addtodoCard', (req, res) => {
    const { taskName, comment, date } = req.body;
    const todo = new TodoList({
        taskName: taskName,
        comment: comment,
        date: date
    });
    todo.save().then(
        () => console.log("One entry added"),
        (err) => console.log(err),
        res.send("Record Added")
    )
})
app.get('/getAllTodoCards', (req, res) => {
    TodoList.find(
        (err, found) => {
            if (!err) {
                res.send(found);
            } else {
                console.log(err);
                res.send("Some error occured!")
            }
        }).sort({ $natural: -1 }).clone().catch(err => console.log("Error occured, " + err));
}
)
app.delete('/:id', (req, res) => {
    // var deleteId = ;

    TodoList.findByIdAndRemove(req.params.id, function (data) {
        // res.send("Item deleted")
        res.status(200).json({ message: 'ok' });
    });
})


app.put('/:id', async (req, res) => {


    const todo = await TodoList.findById(req.params.id);
    await todo.update(req.body, function (err, data) {
        console.log("success");
        res.status(200).json({ message: 'ok' });
    });
    // res.status(200).json({ message: 'ok' });
    // TodoList.findOneAndUpdate(req.params.id, req.body);

})

app.listen(8000, () => {
    console.log("Listening to port number 8000");
})

