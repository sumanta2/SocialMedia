require('dotenv').config()
const mongoose = require('mongoose')
const LiveUsersModel = require('./Models/LiveUsersModel')

let activeUsers = [];
let typingStatus = [];

const fetchAllData = async () => {
    try {
        const data = await LiveUsersModel.find()
        // console.log("🚀 ~ file: index.js:11 ~ fetchAllData ~ data:", data)

        activeUsers = data;
    } catch (error) {
        console.log(error)
    }

}


mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("connected with MongoDb"); fetchAllData() }).catch((err) => console.log(err));



const io = require('socket.io')(8800, {
    pingTimeout: 120000,
    pinInterval: 70000,
    cors: {
        origin: process.env.ORIGN
    }
})


io.on('connection', (socket) => {
    //add new User 
    socket.on('new-user-add', async (newUserId, time) => {
        //if users is not added previously
        // console.log(time.toString());
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            const serverTime = new Date();
            const timeDiff = serverTime.getTime() - new Date(time).getTime();
            const Data = {
                online: "true",
                userId: newUserId,
                socketId: socket.id,
                lastSeen: "false",
                timeDiff: timeDiff,
            }
            activeUsers.push(Data)

            // console.log("activeUsers");


            try {
                let UserData = await LiveUsersModel.findOne({ userId: newUserId })

                // console.log(UserData)
                if (UserData === null) {
                    const myData = new LiveUsersModel(Data);
                    myData.save((err) => {
                        if (err) throw err;
                        console.log('Data saved to MongoDB!');
                    });
                }
            } catch (error) {
                console.log(error)
            }
        }
        else {
            activeUsers = await Promise.all(activeUsers.map(async (user) => {


                if (user.userId == newUserId) {

                    const filter = { userId: newUserId };
                    const update = { lastSeen: "false", online: "true", socketId: socket.id };
                    try {
                        const updatedUser = await LiveUsersModel.findOneAndUpdate(filter, update, {
                            new: true, // returns the updated document
                        });

                    } catch (error) {
                        console.log(error)
                    }

                    user.online = "true"      //here to edit property of user object we cann't use spread operator because if use mongoose add others data
                    user.lastSeen = "false"
                    user.socketId = socket.id
                    return user
                }
                else {
                    return user
                }
            }))
        }
        io.emit('get-users', activeUsers)
    })

    socket.on("new-user-delete", async (userId) => {
        let data;
        let other = [];
        for (let x of activeUsers) {
            if (x.userId === userId) {
                data = x;
            } else {
                other.push(x);
            }
        }
        activeUsers = other;
        try {
            if (data?.userId) await LiveUsersModel.deleteOne({ userId: data.userId })
            
            if (data?.online === "true")
            {
            io.emit('get-users', activeUsers)
            }
        } catch (error) {
            //activeUsers.push(data)
            console.log(error)
        }
    })

    socket.on("send-message", (data, recipient) => {
        
        const user = activeUsers.find((user) => user.userId === recipient)
        if (user.online==='true') {
            io.to(user.socketId).emit('receive-message', data)
        }
    })
    socket.on("delete-message", (id, recipient) => { 
        const user = activeUsers.find(( user) => user.userId === recipient)
        if (user.online === 'true')
        {
            io.to(user.socketId).emit("delete-message-id",id)
        }
    })

    socket.on("new-chat", (chat,receiverId) => {
        const user = activeUsers.find((user) => user.userId === receiverId)
        if (user?.online === 'true')
        {
            io.to(user.socketId).emit("add-new-chat", chat);
        }
    })

    socket.on("send-chat-id", (chatId, receiverId) => {
        const user = activeUsers.find((user) => user.userId === receiverId)
        if (user?.online === 'true')
        {
            io.to(user.socketId).emit("delete-chat-id",chatId)
        }
    })


    socket.on('offline', async (socket) => {
        activeUsers = await Promise.all(activeUsers.map(async (user) => {
            if (user.userId == socket) {
                let date = new Date();

                date.setMilliseconds(date.getMilliseconds() + user.timeDiff);

                // Format the date as a string in a specific format
                let formattedDate = date.toLocaleString({
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    timeZone: 'UTC'
                });
                let time = formattedDate.split(" ")[1]
                const filter = { userId: socket };
                const update = { lastSeen: time, online: "false" };
                try {
                    const updatedUser = await LiveUsersModel.findOneAndUpdate(filter, update, {
                        new: true, // returns the updated document
                    });

                } catch (error) {
                    console.log(error)
                }

                user.online = "false"
                user.lastSeen = time
                return user

            }
            else {
                return user
            }
        }))
        io.emit('get-users', activeUsers)
    })
    socket.on('disconnect', async () => {   //when connection lost unexpectedly and client does not response it automatically removed that user form online status

        const [data] = activeUsers.filter(data => data.socketId === socket.id)
        const userId = data?.userId;
        activeUsers = await Promise.all(activeUsers.map(async (user) => {
            if (user.socketId === socket.id)   //&& user.online===true used inside if condition but some-case it does not work
            {
                let date = new Date();
                date.setMilliseconds(date.getMilliseconds() + user.timeDiff);

                // Format the date as a string in a specific format
                let formattedDate = date.toLocaleString({
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    timeZone: 'UTC'
                });
                let time = formattedDate.split(" ")[1]
                const filter = { userId: userId };
                const update = { lastSeen: time, online: "false" };
                try {
                    const updatedUser = await LiveUsersModel.findOneAndUpdate(filter, update, {
                        new: true, // returns the updated document
                    });
                } catch (error) {
                    console.log(error)
                }


                user.online = "false"
                user.lastSeen = time
                return user

            }
            else {
                return user
            }
        }))
        typingStatus = typingStatus.filter((user) => user.socketId !== socket.id)
        io.emit('get-users', activeUsers)
        io.emit('get-typing-users', typingStatus)
    })

    //detect Typing start 
    socket.on('typing-start', (newUserPair) => {
        //if users is not added previously
        if (!typingStatus.some((user) => user.userPair.sender === newUserPair)) {
            typingStatus.push({
                userPair: newUserPair,
                socketId: socket.id
            })
            // console.log("typingStatus");
            // console.log(typingStatus);
        }
        io.emit('get-typing-users', typingStatus)
    })


    socket.on('typing-end', (socket) => {
        typingStatus = typingStatus.filter((user) => user.userPair.sender !== socket)
        io.emit('get-typing-users', typingStatus)
    })
})



// console.log("-----------------------------------------------------------------------------------------------")



