import {Server} from 'socket.io'

const io = new Server(9000,{
    cors:{
        origin:"https://chatappss.netlify.app"
    }
})
  

const users=[{}];
let mess=[]

let x=0

io.on('connection',(socket)=>{
    x++
   // console.log('A user Connected'+" "+x)
    
    socket.on('clear',()=>{
        mess=[]
        mess.push({mess: "claer !!!!"})
         io.emit('ress',mess)
    })

    socket.on('join',(data)=>{
           users[socket.id]=data
           socket.broadcast.emit('Joinn',`${users[socket.id]} join !!!`)
          // socket.emit('own',{id:socket.id ,mess:`Admin : Welcome to Caht ${users[socket.id]}`} )
       })

   socket.on('mess',(data)=>{
    let d={
        id:socket.id,
        mess:data
    }
    mess.push(d)

    io.emit('rec',mess)
    socket.emit('ownMessage',mess)
   
   })




    socket.on('disconnect',()=>{
        x--
      //  console.log('A user DisConnected'+" "+x)
        socket.broadcast.emit('Joinn',`${users[socket.id]} disConnect !!!`)
       // socket.broadcast.emit('new','Existance user disconnected !!!!')
       
        
    })
})



