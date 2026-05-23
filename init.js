const mongoose = require('mongoose');
main()
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
const Chat = require('./models/chat');
let allChats=[
    { 
        from: "Charlie", 
        to: "Dave", 
        msg: "Hey Dave!",
        created_at: new Date('2024-01-01T10:00:00Z')
    },
    { 
        from: "Eve", 
        to: "Frank", 
        msg: "Hi Frank!",
        created_at: new Date(),
    },
    { 
        from: "Grace", 
       to: "Heidi",
       msg: "Hello Heidi!",
       created_at: new Date(),
    },
    {
        from: "Ivan",
        to: "Judy",
        msg: "Good morning Judy!",
        created_at: new Date(),
    },
    {
        from: "Mallory",
        to: "Niaj",
        msg: "How are you Niaj?",
        created_at: new Date(),
    }
]
 Chat.insertMany(allChats)
.then((res) => {
    console.log("Multiple chats inserted:", res);})
.catch((err) => {
    console.log("Error inserting multiple chats:", err);
});
