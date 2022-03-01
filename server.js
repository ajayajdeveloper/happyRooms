const express = require("express");
const app = express();
const dbConfig = require("./db")
const roomsRoute = require("./routes/roomsRoute")
const usersRoute = require("./routes/usersRoute")
const bookingsRoute = require("./routes/bookingsRoute")
const path = require("path")
const cors = require("cors")
  

app.use(express.json())
app.use(cors())
app.use("/api/rooms",roomsRoute)
app.use("/api/users",usersRoute)
app.use("/api/bookings",bookingsRoute)
 


if(process.env.NODE_ENV == 'production')
{
    app.use('/' , express.static('client/build'))

    app.get("*", (req, res) => {

        res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
      
    });
}
 
app.listen(5000, () => console.log("Node server Started using nodemon")) 