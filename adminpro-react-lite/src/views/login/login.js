// @ts-nocheck
import React, { useState } from "react";
import { NotificationManager } from "react-notifications";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateCustomer } from "../../store/userSlice";
import './login.css'
function Login() {
    //thông báo
    const createNotification = (type) => {
        switch (type) {
            case 'success':
                NotificationManager.success('Đăng nhập thành công', 'Thành công');
                break;
            case 'error':
                NotificationManager.error('Đã có lỗi gì đó xảy ra', 'Thất bại', 3000);
                break;
            default:
                alert("kill me, i'm here");
        }
    }
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
                createNotification('success')
            } catch (error) {
                createNotification('error')
                res.send(error.stack);
            }
        }
        fetchData();
        setTimeout(() => {
            navigate("/starter");
        }, 800);
        
    }

    return (
        <div className="body1">
            <div className="wrapper">
                <div className="title-text">
                    <div className="title login" style={{ marginLeft: "0%" }}>Login Form</div>
                    
                </div>

                <div className="form-container">
                    <div className="slide-controls">
                        <label htmlFor="login" className="slide login">Login</label>
                        <div className="slide-tab"></div>
                    </div>

                    <div className="form-inner">
                        <form className="login" style={{ marginLeft: "0%" }}>
                            <div className="field">
                                <input type="email" placeholder="Email Address" value={username}
                                    onChange={e => setUsername(e.target.value)} required />
                            </div>
                            <div className="field">
                                <input type="password" placeholder="Password" value={pass}
                                    onChange={e => setPass(e.target.value)} required />
                            </div>
                           
                            <div className="field">
                                <input type="submit" value="Login" onClick={handleClick} />
                            </div>
                            
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;