import React, { useEffect, useState } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";


function DetailFeed() {
    //thông báo
    const createNotification = (type) => {
        switch (type) {
            case 'success':
                NotificationManager.success('đã Xóa', 'Thành công');
                break;
            case 'error':
                NotificationManager.error('đã có lỗi gì đó xảy ra', 'Thất bại', 3000);
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
                    method: 'GET'
                };
                const response = await fetch('https://localhost:7071/api/Feedback/' + idSP, requestOptions)
                const data = await response.json();
                setDetail(data);

                const requestOptions2 = {
                    method: 'GET'
                };
                const response2 = await fetch('https://localhost:7071/api/Account/get', requestOptions2)
                const data2 = await response2.json();
                setTableData(data2.find(e => e.id = data.accountId));

            } catch (error) {
                res.send(error.stack);
            }
        }
        fetchData();
    }, [])

    const submitt = () => { 
        fetch('https://localhost:7071/api/Feedback/'+idSP, { method: 'DELETE' })
        .then(() => createNotification('success'));

        setTimeout(() => {
            navigate("/gopy");
        }, 1000);
    }

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
                                defaultValue={detail.title}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Người gửi</Form.Label>
                            <Form.Control type="input" placeholder="title"
                                defaultValue={tableData.title}
                            />
                        </Form.Group>
                        <Form.Label>Nội dung cụ thể:</Form.Label>
                        <FloatingLabel controlId="floatingTextarea2">
                            <Form.Control as="textarea" placeholder="content"
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
                                onClick={() => {submitt()}}>Xóa</button>
                            </div>
                        </div>
                    </Form>
                </div>
                <NotificationContainer />
            </Container>
        </div>
    )
}
export default DetailFeed;