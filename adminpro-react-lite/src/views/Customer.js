import React, { useCallback, useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import user4 from "../assets/images/users/user4.jpg";
import { selectCustomer } from "../store/userSlice";
import PaginationComponent from "./pagination/paginationComponent";
import Popup from "../components/deleteModal/Popup";
import { NotificationManager } from 'react-notifications';

function Customer({ privatee }) {
    const { id, jwtToken } = useSelector(selectCustomer);
    const [deleteRender, setDeleteRender] = useState(true);
    //thông báo
    const createNotification = (type) => {
        switch (type) {
            case 'success':
                NotificationManager.success('Đã xóa account khách hàng', 'Thành công');
                break;
            case 'error':
                NotificationManager.error('Đã có lỗi gì đó xảy ra', 'Thất bại', 3000);
                break;
            default:
                alert("kill me, i'm here");
        }
    }

    const [tableData, setTableData] = useState([]);

    // phân trang
    const [state, setState] = useState({
        data: [],
        totalRecords: 0
    })

    const loadData = (page) => {
        setState({
            data: tableData.filter((a, index) => (index >= (page - 1) * 5) && (index < page * 5)),
            totalRecords: tableData.length
        })
    }

    const getPaginatedData = page => {
        loadData(page);
    }
    //dữ kiệu khách hàng
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
                const response = await fetch('https://localhost:7071/api/Account/get', requestOptions)
                const data = await response.json();
                setTableData(data);
            } catch (error) {
                res.send(error.stack);
            }
        }
        fetchData();
    }, [deleteRender])
    //load trang 1 khi phân trang
    useEffect(() => {
        loadData(1)
    }, [tableData])
    // thay đổi trạng thái, chặn hoặc hoạt dộng
    const changeStatus = (e) => {
        const fetchDataLock = async (req, res) => {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'accept': ' text/plain',
                        'Authorization': 'Bearer ' + jwtToken
                    },
                    body: JSON.stringify({})
                };
                const response = await fetch('https://localhost:7071/api/Account/lock?id=' + e.id, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        setTableData([...tableData].map(obj => {
                            if (obj.title == data.title)
                                return data;
                            else return obj
                        }))
                    });
            } catch (error) {
                res.send(error.stack);
            }
        }
        const fetchDataOpen = async (req, res) => {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'accept': ' text/plain',
                        'Authorization': 'Bearer ' + jwtToken
                    },
                    body: JSON.stringify({})
                };
                const response = await fetch('https://localhost:7071/api/Account/open?id=' + e.id, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        setTableData([...tableData].map(obj => {
                            if (obj.title == data.title)
                                return data;
                            else return obj
                        }))
                    });
            } catch (error) {
                res.send(error.stack);
            }
        }
        if (e.status === 2) {
            fetchDataLock();
        }
        else fetchDataOpen();

        console.log(tableData);
    }
    //xóa khách hàng
    const deleteCustomer = (idCtm) => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'accept': ' text/plain',
                    'Authorization': 'Bearer ' + jwtToken
                },
                // body: JSON.stringify()
            };
            const response = await fetch('https://localhost:7071/api/Account/' + idCtm, requestOptions)
            const data = await response.json();
            console.log(data);
            createNotification('success');
            setDeleteRender(!deleteRender);
        }
        fetchData();
        //xóa sản phẩm của khách hàng bị xóa
        const fetchData3 = async (req, res) => {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'accept': ' text/plain',
                        'Authorization': 'Bearer ' + jwtToken,
                        'Content-Type': ' application/json-patch+json'
                    },
                    body: JSON.stringify(
                        {
                            "id": `${idCtm}`,
                            "page": 0,
                            "pageSize": 900
                        })
                };
                const response = await fetch('https://localhost:7071/api/Item/searchaccount', requestOptions)
                const data = await response.json();
                data.results.forEach(element => {
                    fetchData2(element.id);
                });
            } catch (error) {
                res.send(error.stack);
            }
        }
        fetchData3();
        const fetchData2 = async (idProduct) => {
            const requestOptions2 = {
                method: 'DELETE',
                headers: {
                    'accept': ' text/plain',
                    'Authorization': 'Bearer ' + jwtToken
                }
            };
            const response2 = await fetch('https://localhost:7071/api/Item/' + idProduct, requestOptions2)
            const data2 = await response2.json();
        }
    }

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(!show);

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Danh sách khách hàng </CardTitle>
                    {privatee ? <></> :
                        <Link to="/khachhang" className="nav-link">
                            <CardSubtitle className="mb-2 text-muted" tag="h6">
                                Xem tất cả
                            </CardSubtitle>
                        </Link>
                    }

                    <Table className="no-wrap mt-1 align-middle" responsive borderless>
                        <thead>
                            <tr>
                                <th>Tên</th>
                                <th>Địa chỉ</th>
                                <th>Phone</th>
                                <th>Trạng thái</th>
                                <th>Chọn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.data.map((tdata, index) => (
                                <tr key={index} className="border-top">
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={tdata.url_Image == "string" ? user4 : tdata.url_Image}
                                                className="rounded-circle"
                                                alt="avatar"
                                                width="45"
                                                height="45"
                                            />
                                            <div className="">
                                                <h6 className="mb-0">{tdata.title}</h6>
                                                <span className="text-muted">{tdata.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{tdata.address}</td>
                                    <td>{tdata.phone}</td>
                                    <td>
                                        <button className=
                                            {tdata.status ? "btn btn-outline-primary" : "btn btn-outline-danger"}
                                            onClick={() => { changeStatus(tdata) }}>
                                            {tdata.status ? "chưa khóa" : "đã bị khóa"}</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-outline-primary"
                                            onClick={() => { handleShow(); }}>Xóa</button>
                                    </td>
                                    <Popup handleDeleteTrue={() => deleteCustomer(tdata.id)} handleShow={handleShow}
                                        show={show}></Popup>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {state.totalRecords > 5 && privatee &&
                        <PaginationComponent
                            getAllData={getPaginatedData}
                            totalRecords={state.totalRecords}
                            itemsCountPerPage={5} />
                    }

                </CardBody>
            </Card>
        </div>
    );
};

export default Customer;