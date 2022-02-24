import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios"
import Loader from '../components/Loader'
import Error from '../components/Error'
import moment from 'moment'
import StripeCheckout from 'react-stripe-checkout'
import Swal from 'sweetalert2'
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init({
    duration: '2000'
});




export default function Homescreen({ match }) {

    const [room, setroom] = useState()
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()

    const roomid = match.params.roomid
    const fromdate = moment(match.params.fromdate, "DD-MM-YYYY")
    const todate = moment(match.params.todate, "DD-MM-YYYY")
    const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1
    const [totalamount, settotalamount] = useState()


    useEffect(async() => {
        
        if(!localStorage.getItem("currentUser")){
            window.location.reload="/login"
        }

        try {
            setloading(true);
            const data = await (await axios.post("/api/rooms/getroombyid" , { roomid: match.params.roomid })).data
            settotalamount(data.rentperday * totaldays)
            setroom(data);
            setloading(false);
            
          } catch (error) {
            seterror(true)
            setloading(false);
          }
          
    }, [])





    async function onToken(token) {

        console.log(token)

        const bookingDetails = {

            room,
            token,
            userid: JSON.parse(localStorage.getItem("currentUser"))._id,
            fromdate,
            todate,
            totalamount,
            totaldays,

        }

        try {

            setloading(true)
            const result = await axios.post('/api/bookings/bookroom', bookingDetails)
            setloading(false)
            Swal.fire("congratulations","your Room booked successfully " , " success ").then(result=>{
                window.location.href='/home'
            })
        }
        catch (error) {
          setloading(false)
          Swal.fire('Oops' , 'Something went wrong , please try later' , 'error')  
        }

    }

    return (
        <div className='m-5' data-aos="flip-left">


            {loading ? (<h1><Loader /> </h1>) : room ? (<div>

                <div className='row justify-content-center mt-5 bs'>

                    <div className='col-md-6'>
                        <h1>{room.name}</h1>
                        <img src={room.imageurls[0]} className='bigimg' />

                    </div>

                    <div className='col-md-6'>

                        <div style={{ textAlign: "right" }}>

                            <h1><b>Booking Details</b></h1>
                            <hr />

                            <p><b>Name</b> : {JSON.parse(localStorage.getItem("currentUser")).name}</p>
                            <p><b>From Date</b> :{match.params.fromdate} </p>
                            <p><b>To Date</b> :{match.params.todate}</p>
                            <p><b>Max Count </b>: {room.maxcount}</p>
                        </div>



                        <div style={{ textAlign: "right" }}>

                            <h1><b>Amount</b></h1>
                            <hr />
                            <p><b>Total Days :{totaldays} </b></p>
                            <p><b>Rent Per Day : {room.rentperday}</b></p>
                            <h1><b>Total Amount : {totalamount}</b></h1>

                        </div> 

                        <div style={{ float: "right" }} >


                            <StripeCheckout 
                                amount={totalamount * 100}
                                token={onToken}
                                stripeKey="pk_test_51KRahfEdxoI0anPBeB0CEkFxeogo2Mkrkka0mFgnsBpq9u9YL0QgaQLJoNSjW50iduDbHcKWQldkDRmi81TvVQgO00pO27u9ki"
                                currency='USD'
                            >


                                <button className='btn btn-primary'>Pay Now</button>

                            </StripeCheckout>

                        </div>

                    </div>

                </div>
  

            </div>) : (<Error />)}
        </div>
    )
}





