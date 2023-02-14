require('dotenv').config()


const io= require('socket.io')(8800,{
    pingTimeout:60000,
    pinInterval:35000,
    cors:{
        origin: process.env.ORIGN || 'http://localhost:3000'
    }
})

let activeUsers=[];
let typingStatus=[]

io.on('connection',(socket)=>{
    //add new User 
    socket.on('new-user-add',(newUserId)=>{   
        //if users is not added previously
        if(!activeUsers.some((user)=>user.userId=== newUserId))
        {
            activeUsers.push({
                userId: newUserId,
                socketId:socket.id
            })
            // console.log("activeUsers");
            // console.log(activeUsers);
        }
        io.emit('get-users',activeUsers)
    })


    socket.on("send-message",(data)=>{
        const {receiverId}=data
        const user= activeUsers.find((user)=>user.userId=== receiverId)
        if(user)
        {
            io.to(user.socketId).emit('receive-message',data)
        }
    })
    socket.on('offline',(socket)=>{
        activeUsers= activeUsers.filter((user)=> user.userId !== socket)
        io.emit('get-users',activeUsers)
    })
    socket.on('disconnect',()=>{   //when connection lost unexpectedly and client does not response it automatically removed that user form online status
        activeUsers= activeUsers.filter((user)=> user.socketId !== socket.id)
        typingStatus= typingStatus.filter((user)=> user.socketId !== socket.id)
        io.emit('get-users',activeUsers)
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



