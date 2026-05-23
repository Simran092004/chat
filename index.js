const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Chat = require('./models/chat');
const path = require('path');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.set("views", path.join(__dirname, 'views'));
app.set("views engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
main()
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
// Index route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find({});
    //console.log(chats);
    res.render("index.ejs", { chats });
  }
);
//New route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

//create route
app.post("/chats", async (req, res) => {
  let {from,to,msg} = req.body;
  const newChat = new Chat({
    from:from,
    to:to,
    msg:msg
  });
  console.log(newChat);
  await newChat.save();
  res.redirect("/chats");
});

//Edit route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

//Update route
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { from, to, msg } = req.body;
  await Chat.findByIdAndUpdate(id, { from, to, msg });
  res.redirect("/chats");
});

//Delete route
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
});

// Home route
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(8080, () => 
  {console.log('Server started on port 3000')});
