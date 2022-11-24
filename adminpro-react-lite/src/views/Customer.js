import React, { useCallback, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import user4 from "../assets/images/users/user4.jpg";
import PaginationComponent from "./pagination/paginationComponent";

function Customer({ privatee }) {

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
                    method: 'GET'
                };
                const response = await fetch('https://localhost:7071/api/Account/get', requestOptions)
                const data = await response.json();
                setTableData(data);
            } catch (error) {
                res.send(error.stack);
            }
        }
        fetchData();
    }, [])
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
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({})
                };
                const response = await fetch('https://localhost:7071/api/Account/lock?id=' + e.id, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        setTableData([...tableData].map(obj=>{
                            if(obj.title == data.title)
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
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({})
                };
                const response = await fetch('https://localhost:7071/api/Account/open?id=' + e.id, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        setTableData([...tableData].map(obj=>{
                            if(obj.title == data.title)
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
    const deleteCustomer = (tdata) => {
        console.log(tdata);
    }
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
                                            {tdata.status ? "hoạt động" : "bị chặn"}</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-outline-primary"
                                            onClick={() => { deleteCustomer(tdata) }}>Xóa</button>
                                    </td>
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