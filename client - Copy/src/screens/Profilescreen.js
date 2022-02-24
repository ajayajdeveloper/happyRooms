import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios"
import { Tabs } from 'antd';
import Loader from '../components/Loader'
import Error from '../components/Error'
import swal from "sweetalert2"
import { Tag, Divider } from 'antd';


const { TabPane } = Tabs;

function Profilescreen() {

    const user = JSON.parse(localStorage.getItem("currentUser"))

    useEffect(() => {

        if (!user) {
            window.location.href = "/login"
        }

    }, [])


    return (
        <div className='ml-3 mt-3'>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="profile" key="1">
                    <h1>My Profile</h1>

                    <br />

                    <h1>Name : {user.name}</h1>
                    <h1>Emaik : {user.email}</h1>
                    <h1>isAdmin : {user.isAdmin ? "Yes" : "No"}</h1>


                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <MyBookings />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Profilescreen





export function MyBookings() {



    const user = JSON.parse(localStorage.getItem("currentUser"))
    const [bookings, setbookings] = useState([])
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()

    useEffect(async () => {

        try {
            setloading(true)
            const data = await (await axios.post("api/bookings/getbookingsbyuserid/", { userid: user._id })).data
            console.log(data)
            setbookings(data)
            setloading(false)

        }
        catch (error) {
            console.log(error)
            setloading(false)
            seterror(error)
        }
    }, [])

    async function cancelBooking(bookingid, roomid) {
        try {
            setloading(true)
            const result = await (await axios.post("/api/bookings/cancelbooking", { bookingid, roomid })).data
            console.log(result)
            setloading(false)

            swal.fire("congrats", "your booking has been cancelled", 'success').then(result => {

                window.location.reload()
            })

        }
        catch (error) {
            console.log(error)
            setloading(false)
            swal.fire("Oops", "something went wrong", "error")
        }
    }


    return (
        <div>
            <div className='row'>

                <div className='col-md-6'>

                    {loading && (<Loader />)}
                    {bookings && (bookings.map(booking => {

                        return <div className="bs">

                            <h1>{booking.room}</h1>
                            <p><b>BookingId </b>: {booking._id}</p>
                            <p><b>TransactionId</b> : {booking.transactionId}</p>
                            <p><b>Check In : </b>{booking.fromdate}</p>
                            <p><b>Check Out : </b>{booking.todate}</p>
                            <p><b>Amount : </b> {booking.totalAmount}</p>
                            <p><b>Status</b> : {booking.status =='booked' ? (<Tag color="green">Confirmed</Tag>) : (<Tag color="red">Cancelled</Tag>)}</p> 
                              
                            {booking.status !== "cancelled" && (<div className='text-right'>

                                <button className='btn btn-primary' onClick={() => { cancelBooking(booking._id, booking.roomid) }}> Cancel Booking</button>

                            </div>
                            )}
                        </div>


                    }))}

                </div>

            </div>
        </div>
    )   
}
