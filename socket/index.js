require('dotenv').config()


const io= require('socket.io')(8800,{
    cors:{
        origin: process.env.ORIGN || 'http://localhost:3000'
    }
})

let activeUsers=[];
// console.log("First Comment")

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
        // console.log("receiverId");
        // console.log(receiverId)
        // console.log("activeUsers---------")
        // console.log(activeUsers)
        const user= activeUsers.find((user)=>user.userId=== receiverId)
        // console.log("user");
        // console.log(user)
        if(user)
        {
            io.to(user.socketId).emit('receive-message',data)
        }
    })
    socket.on('offline',(socket)=>{
        activeUsers= activeUsers.filter((user)=> user.userId !== socket)
        io.emit('get-users',activeUsers)
    })
})




// console.log("-----------------------------------------------------------------------------------------------")



