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


mongoose.connect(process.env.MONGO_DB,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => { console.log("connected with MongoDb");fetchAllData()}).catch((err)=>console.log(err));



const io= require('socket.io')(8800,{
    pingTimeout:60000,
    pinInterval:35000,
    cors:{
        origin: process.env.ORIGN || 'http://localhost:3000'
    }
})


io.on('connection', (socket)=>{
    //add new User 
    socket.on('new-user-add',async(newUserId,time)=>{   
        //if users is not added previously
        // console.log(time.toString());
        if(!activeUsers.some((user)=>user.userId=== newUserId))
        {   const serverTime = new Date();
            const timeDiff = serverTime.getTime() - new Date(time).getTime();
            const Data={
                online:"false",
                userId: newUserId,
                socketId: socket.id,
                lastSeen: "No Data here",
                timeDiff:timeDiff,
            }
            activeUsers.push(Data)
            
            // console.log("activeUsers");


            try {
                let UserData = await LiveUsersModel.findOne({ userId: newUserId })
            
                // console.log(UserData)
                if (UserData===null)
                {
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
            activeUsers = activeUsers.map((user) => {
                
                if (user.userId == newUserId)
                {
                    user.online = "true"      //here to edit property of user object we cann't use spread operator because if use mongoose add others data
                    user.lastSeen = "false"
                    user.socketId=socket.id
                    return user 
                }
                else
                {
                    return user
                }
            })
        }
        io.emit('get-users',activeUsers)
    })


    socket.on("send-message",(data)=>{
        const { receiverId } = data
        const user= activeUsers.find((user)=>user.userId=== receiverId)
        if(user)
        {
            io.to(user.socketId).emit('receive-message',data)
        }
    })
    socket.on('offline', (socket) => {
        activeUsers = activeUsers.map((user) => {
            if (user.userId == socket)
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
                // console.log({ ...user, online: false, lastSeen: time })
                user.online = "false"
                user.lastSeen=time
                return user
                
            }
            else
            {
                return user
            }
        })
        io.emit('get-users',activeUsers)
    })
    socket.on('disconnect', () => {   //when connection lost unexpectedly and client does not response it automatically removed that user form online status
        activeUsers=activeUsers.map((user) => {
            if (user.socketId === socket.id )   //&& user.online===true used inside if condition but some-case it does not work
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
                user.online = "false"
                user.lastSeen = time
                return user
                
            }
            else
            {
                return user
            }
        })
        typingStatus= typingStatus.filter((user)=> user.socketId !== socket.id)
        io.emit('get-users', activeUsers)
        io.emit('get-typing-users',typingStatus)
    })

    //detect Typing start 
    socket.on('typing-start',(newUserPair)=>{   
        //if users is not added previously
        if(!typingStatus.some((user)=>user.userPair.sender=== newUserPair))
        {
            typingStatus.push({
                userPair: newUserPair,
                socketId:socket.id
            })
            // console.log("typingStatus");
            // console.log(typingStatus);
        }
        io.emit('get-typing-users',typingStatus)
    })


    socket.on('typing-end',(socket)=>{
        typingStatus= typingStatus.filter((user)=> user.userPair.sender !== socket)
        io.emit('get-typing-users',typingStatus)
    })
})



// console.log("-----------------------------------------------------------------------------------------------")



