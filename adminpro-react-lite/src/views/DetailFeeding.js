import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectCustomer } from "../store/userSlice";
import Popup from "../components/deleteModal/Popup";
import { NotificationManager } from 'react-notifications';

function DetailFeed() {
    const { id, jwtToken } = useSelector(selectCustomer);

    //thông báo
    const createNotification = (type) => {
        switch (type) {
            case 'success':
                NotificationManager.success('Đã xóa góp ý', 'Thành công');
                break;
            case 'error':
                NotificationManager.error('Đã có lỗi gì đó xảy ra', 'Thất bại', 3000);
                break;
            default:
                alert("kill me, i'm here");
        }
    }

    const navigate = useNavigate()

    const location = useLocation()
    const idSP = location.pathname.replace("/chitietgopy/", "");
    const [detail, setDetail] = useState(
        {
            "id": 0,
            "accountId": "",
            "title": "",
            "content": ""
        }
    );

    const [tableData, setTableData] = useState({
        "title": ""
    });

    useEffect(() => {
        const fetchData = async (req, res) => {
            try {
                const requestOptions = {
                    method: 'GET',
                    headers: {
                      'accept': ' text/plain',
                      'Authorization': 'Bearer ' + jwtToken
                    }
                };
                const response = await fetch('https://localhost:7071/api/Feedback/' + idSP, requestOptions)
                const data = await response.json();
                setDetail(data);

                const requestOptions2 = {
                    method: 'GET',
                    headers: {
                      'accept': ' text/plain',
                      'Authorization': 'Bearer ' + jwtToken
                    }
                };
                const response2 = await fetch('https://localhost:7071/api/Account/'+data.accountId, requestOptions2)
                const data2 = await response2.json();
                setTableData(data2);
                //đã đọc
                const requestOptions3 = {
                    method: 'POST',
                    headers: {
                      'accept': ' text/plain',
                      'Authorization': 'Bearer ' + jwtToken
                    },
                    body: JSON.stringify({})
                };
                const response3 = await fetch('https://localhost:7071/api/Feedback/'+idSP, requestOptions3)
                const data3 = await response3.json();

            } catch (error) {
                res.send(error.stack);
            }
        }
        fetchData();
    }, [])

    const submitt = () => { 
        const fetchData = async () => {
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'accept': ' text/plain',
                    'Authorization': 'Bearer ' + jwtToken
                },
                // body: JSON.stringify()
            };
            const response = await fetch('https://localhost:7071/api/Feedback/'+idSP, requestOptions)
            const data = await response.json();
            console.log(data);
            createNotification('success');
        }
        fetchData();
        navigate(-1);
    }

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(!show);

    return (
        <div>
            <div className="divv">
                <div style={{ textAlign: "center" }}><h1>Góp ý</h1></div>
            </div>
            <Container>
                <div className="box2 box-width-1 mx-auto">
                    <Form id="create-course-form"  >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Tiêu đề</Form.Label>
                            <Form.Control type="input" placeholder="title"
                                defaultValue={detail.title} disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Người gửi</Form.Label>
                            <Form.Control type="input" placeholder="title"
                                defaultValue={tableData.title} disabled
                            />
                        </Form.Group>
                        <Form.Label>Nội dung cụ thể:</Form.Label>
                        <FloatingLabel controlId="floatingTextarea2">
                            <Form.Control as="textarea" placeholder="content" disabled
                                style={{ height: '13rem' }} defaultValue={detail.content}
                            />
                        </FloatingLabel>
                        <div className="d-flex justify-content-around">
                            <div>
                                <button className="btn outline btn-outline-primary me-4"
                                    onClick={() => navigate(-1)}>
                                    Back
                                </button>
                            </div>
                            <div>
                                <button className="btn outline btn-outline-danger"
                                onClick={() => { handleShow(); }}>Xóa</button>
                            </div>
                        </div>
                    </Form>
                </div>
                <Popup handleDeleteTrue={submitt} handleShow={handleShow} show={show}></Popup>
            </Container>
        </div>
    )
}
export default DetailFeed;