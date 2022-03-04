import React from 'react';
import { useState, useEffect } from "react"
import axios from "axios"
import Loader from '../components/Loader'
import Error from '../components/Error'
import Success from '../components/Success';

function Registerscreen() {
    const [name, setname] = useState(" ")
    const [email, setemail] = useState(" ")
    const [password, setpassword] = useState(" ")
    const [cpassword, setcpassword] = useState(" ")

    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()
    const [success, setsuccess] = useState()


    async function register() {

        if (password === cpassword) {
            const user = {
                name,
                email,
                password,
                cpassword
            }

            try {
                setloading(true)
                const result = await axios.post("https://happyrooms.herokuapp.com/api/users/register", user).data
                setloading(false)
                setsuccess(true)

                setemail('')
                setname('')
                setcpassword('')
                setpassword('')

            }
            catch (error) {
                console.log(error)
                setloading(false)
                seterror(true)
            }

        }
        else {
            alert("password not match")
        }


    }

    return (
        <div>

            {loading && (<Loader />)}
            {error && (<Error />)}

            <div className='row justify-content-center mt-5'>
                <div className='col-md-5 mt-5 '>

                    {success && <Success message="registertion success" />}

                    <div className='bs'>
                        <h2>Register</h2>
                        {/* <input  type="text"  placeholder="name"  className='form-control' 
                      value={name} onChange={ (e) => {setname(e.target.value)}} autofocus  />

                      <input type="text" placeholder='email' className='form-control' 
                      value={email} onChange={ (e) => {setemail(e.target.value)}}autofocus />

                      <input type="text"  placeholder='password' className='form-control' 
                      value={password} onChange={ (e) => {setpassword(e.target.value)}} autofocus/>

                      <input type="text" placeholder='confirm password' className='form-control' 
                      value={cpassword} onChange={ (e) => {setcpassword(e.target.value)}} autofocus/> */}


                        <input required type="text" placeholder="name" className="form-control mt-1" value={name} onChange={(e) => { setname(e.target.value) }} />
                        <input required type="text" placeholder="email" className="form-control mt-1" value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <input
                            type="text"
                            placeholder="password"
                            className="form-control mt-1"
                            value={password}
                            required
                            onChange={(e) => { setpassword(e.target.value) }}
                        />
                        <input
                            type="text"
                            placeholder="confirm password"
                            className="form-control mt-1"
                            value={cpassword}
                            required
                            onChange={(e) => { setcpassword(e.target.value) }}
                        />

                        <button className='btn btn-primary mt-3' onClick={register}>Register</button>
                    </div>

                </div>
            </div>
        </div>
    )

}

export default Registerscreen;
