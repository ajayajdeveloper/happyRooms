import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios"
import Loader from '../components/Loader'
import Error from '../components/Error'
import Swal from 'sweetalert2'
import { Tabs } from 'antd';

const { TabPane } = Tabs;

function Adminscreen() {

    useEffect(() => {

        if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
            window.location.href = "/home"
        }

    }, [])


    return (
        <div className='mt-3 ml-3 mr-3 bs'>
            <h2 className='text-center' style={{ fontSize: "30px" }}><b>Admin Panel </b></h2>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="Bookings" key="1">
                    <Bookings />
                </TabPane>
                <TabPane tab="Rooms" key="2">
                    <Rooms />
                </TabPane>
                <TabPane tab="Add Room" key="3">
                    <Addroom />
                </TabPane>
                <TabPane tab="Users" key="4">
                    <Users />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Adminscreen





export function Bookings() {

    const [bookings, setbookings] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()

    useEffect(async () => {

        try {

            const data = await (await axios.get("https://happyrooms.herokuapp.com/api/bookings/getallbookings")).data
            setbookings(data)
            setloading(false)

        } catch (error) {
            console.log(error)
            setloading(false)
            seterror(error)

        }

    }, [])

    return (
        <div className='row'>

            <div className='col-md-12'>
                <h1>bookings</h1>

                {loading && <Loader />}


                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>Booking Id</th>
                            <th>Userid</th>
                            <th>Room</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length && (bookings.map(booking => {
                            return <tr>
                                <td>{booking._id}</td>
                                <td>{booking.userid}</td>
                                <td>{booking.room}</td>
                                <td>{booking.fromdate}</td>
                                <td>{booking.todate}</td>
                                <td>{booking.status}</td>
                            </tr>
                        }))}
                    </tbody>
                </table>




            </div>

        </div>
    )
}








export function Rooms() {

    const [rooms, setrooms] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()

    useEffect(async () => {

        try {

            const data = await (await axios.get("https://happyrooms.herokuapp.com/api/rooms/getallrooms")).data
            setrooms(data)
            setloading(false)

        } catch (error) {
            console.log(error)
            setloading(false)
            seterror(error)

        }

    }, [])

    return (
        <div className='row'>

            <div className='col-md-12'>
                <h1>Rooms</h1>

                {loading && <Loader />}


                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>Room Id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Rent Per day</th>
                            <th>Max Count</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.length && (rooms.map(room => {
                            return <tr>
                                <td>{room._id}</td>
                                <td>{room.name}</td>
                                <td>{room.type}</td>
                                <td>{room.rentperday}</td>
                                <td>{room.maxcount}</td>
                                <td>{room.phonenumber}</td>
                            </tr>
                        }))}
                    </tbody>
                </table>




            </div>

        </div>
    )
}





export function Users() {

    const [users, setusers] = useState()
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()
    useEffect(async () => {

        try {
            const data = await (await axios.get('https://happyrooms.herokuapp.com/api/users/getallusers')).data
            setusers(data)
            setloading(false)
        } catch (error) {
            console.log(error)
            setloading(false)
            seterror(error)
        }

    }, [])

    return (
        <div className='row'>
            <div className="col-md-12">
                <h1>Users</h1>
                {loading && <Loader />}
                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>isAdmin</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users && (users.map(user => {
                            return <tr>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                            </tr>
                        }))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}




export function Addroom() {
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()
    const [name, setname] = useState("");
    const [rentperday, setrentperday] = useState();
    const [maxcount, setmaxcount] = useState();
    const [description, setdescription] = useState("");
    const [phonenumber, setphonenumber] = useState("");
    const [type, settype] = useState("");
    const [image1, setimage1] = useState("");
    const [image2, setimage2] = useState("");
    const [image3, setimage3] = useState("");

    async function addRoom()
    {
        const newroom = {
            name, 
            rentperday, maxcount ,description ,phonenumber ,type ,imageurls:[image1 ,image2 ,image3]
        }
        console.log(newroom)
        try {
            setloading(true)
            const result =await ( await axios.post('https://happyrooms.herokuapp.com/api/rooms/addroom' , newroom)).data
            setloading(false)
            Swal.fire("congratulations","your New Room Added successfully " , " success ").then(result => {
                window.location.href="/home"
            })
        } catch (error) {

            console.log(error)
            setloading(false)
            Swal.fire('Oops' , 'Something went wrong , please try later' , 'error')  
            
        }
    }
    return (
      <div className="row">
     
          <div className="col-md-5">
          {loading && <Loader/>} 
            <input
              type="text"
              className="form-control mt-1"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
  
            <input
              type="text"
              className="form-control mt-1"
              placeholder="rentperday"
              value={rentperday}
              onChange={(e) => {
                setrentperday(e.target.value);
              }}
            />
  
            <input
              type="text"
              className="form-control mt-1"
              placeholder="maxcount"
              value={maxcount}
              onChange={(e) => {
                setmaxcount(e.target.value);
              }}
            />
  
            <input
              type="text"
              className="form-control mt-1"
              placeholder="description"
              value={description}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            />
  
            <input
              type="text"
              className="form-control mt-1"
              placeholder="phonenumber"
              value={phonenumber}
              onChange={(e) => {
                setphonenumber(e.target.value);
              }}
            />
            
          </div>
  
          <div className="col-md-6">
          <input
              type="text"
              className="form-control mt-1"
              placeholder="type"
              value={type}
              onChange={(e) => {
                settype(e.target.value);
              }}
            />
          <input
              type="text"
              className="form-control mt-1"
              placeholder="Image url 1"
              value={image1}
              onChange={(e) => {
                setimage1(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Image url 2"
              value={image2}
              onChange={(e) => {
                setimage2(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Image url 3"
              value={image3}
              onChange={(e) => {
                setimage3(e.target.value);
              }}
            />
            <div className='mt-1 text-right'>
            <button className="btn btn-primary" onClick={addRoom}>ADD ROOM</button>
            </div>
          </div>
       
      </div>
    );
  }