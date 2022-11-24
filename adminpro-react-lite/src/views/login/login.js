// @ts-nocheck
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateCustomer } from "../../store/userSlice";
import './login.css'
function Login() {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("")
    //lưu bằng redux
    const dispatch = useDispatch();

    function handleClick() {
        const fetchData = async (req, res) => {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(
                        {
                            "email": username,
                            "password": pass
                        })
                };
                const response = await fetch('https://localhost:7071/api/Account/authenticate', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        dispatch(updateCustomer(data))
                    });
            } catch (error) {
                res.send(error.stack);
            }
        }
        fetchData();
        setTimeout(() => {
            navigate("/starter");
        }, 800);
        
    }

    const [magin, setMargin] = useState(null)
    const loginForm = (a) => {
        setMargin({ marginLeft: a })
    }
    return (
        <div className="body1">
            <div className="wrapper">
                <div className="title-text">
                    <div className="title login" style={magin}>Login Form</div>
                    <div className="title signup">Signup Form</div>
                </div>

                <div className="form-container">
                    <div className="slide-controls">
                        <input type="radio" name="slider" id="login" hidden />
                        <input type="radio" name="slider" id="signup" hidden />
                        <label htmlFor="login" className="slide login" onClick={() => loginForm('0%')}>Login</label>
                        <label htmlFor="signup" className="slide signup" onClick={() => loginForm('-50%')}> Signup</label>
                        <div className="slide-tab"></div>
                    </div>

                    <div className="form-inner">
                        <form action="#" className="login" style={magin}>
                            <div className="field">
                                <input type="text" placeholder="Email Address" value={username}
                                    onChange={e => setUsername(e.target.value)} required />
                            </div>
                            <div className="field">
                                <input type="password" placeholder="Password" value={pass}
                                    onChange={e => setPass(e.target.value)} required />
                            </div>
                            <div className="pass-link">
                                <a href="#">
                                    Forgot password?
                                </a>
                            </div>
                            <div className="field">
                                <input type="submit" value="Login" onClick={handleClick} />
                            </div>
                            <div className="signup-link">
                                Not a member? <a href="#">Signup now</a>
                            </div>
                        </form>

                        <form action="#" className="signup">
                            <div className="field">
                                <input type="text" placeholder="First Name" required />
                            </div>
                            <div className="field">
                                <input type="text" placeholder="Last Name" required />
                            </div>
                            <div className="field">
                                <input type="text" placeholder="Username" required />
                            </div>
                            <div className="field">
                                <input type="text" placeholder="Email Address" required />
                            </div>
                            <div className="field">
                                <input type="password" placeholder="Password" required />
                            </div>
                            <div className="field">
                                <input type="password" placeholder="Confirm password" required />
                            </div>
                            <div className="field">
                                <input type="submit" value="Signup" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;