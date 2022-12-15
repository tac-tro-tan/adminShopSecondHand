import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    Card, CardBody, CardTitle, CardSubtitle,
    ListGroup,
    ListGroupItem,
    Button,
    Table
} from "reactstrap";
import { selectCustomer } from "../store/userSlice";

import PaginationComponent from "./pagination/paginationComponent";

function XacNhanNoiBat() {
    const { id, jwtToken } = useSelector(selectCustomer);

    const[dataXoa,setDataXoa] = useState({});

    const [pagee, setPagee] = useState(0);

    // phân trang
    const [state, setState] = useState({
        data: [],
        totalRecords: 0
    })

    const getPaginatedData = page => {
        setPagee(page - 1)
    }

    useEffect(() => {
        const fetchData = async (req, res) => {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'accept': ' text/plain',
                        'Authorization': 'Bearer ' + jwtToken,
                        'Content-Type': 'application/json-patch+json'
                    },
                    body: JSON.stringify({
                        "page": pagee,
                        "pageSize": 5
                    })
                };
                const response = await fetch('https://localhost:7071/api/Item/getQc', requestOptions)
                const data = await response.json();
                data.results.forEach(y => {
                    const word = new Date(y.payTime);
                    const word2 = word.toString();
                    const word3 = word2.split(" ");
                    y.time = word3[4] + " " + word3[1] + "/" + word3[2] + "/" + word3[3];
                })
                setState({
                    data: data.results,
                    totalRecords: data.total
                })
            } catch (error) {
                res.send(error.stack);
            }
        }
        fetchData();
    }, [pagee,dataXoa])

    const cancelXacNhanNoiBat = (e) => {
        const fetchData = async (req, res) => {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'accept': ' text/plain',
                        'Authorization': 'Bearer ' + jwtToken
                    },
                    body: JSON.stringify({})
                };
                const response = await fetch('https://localhost:7071/api/Item/pay?id=' + e, requestOptions)
                const data = await response.json();
                setDataXoa(data);
            } catch (error) {
                res.send(error.stack);
            }
        }
        fetchData();
    }

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Xác nhận quảng cáo sản phẩm</CardTitle>
                    <Table className="no-wrap mt-1 align-middle" responsive borderless>
                        <thead>
                            <tr>
                                <th>Tên sản phẩm</th>
                                <th>Thời gian quảng cáo</th>
                                <th>Xác nhận</th>

                            </tr>
                        </thead>
                        <tbody>
                            {state.data.map((XacNhanNoiBat, index) => (
                                <tr key={index} className="border-top">
                                    <td><div className="mx-2">{XacNhanNoiBat.name}</div></td>
                                    <td> 14 ngày</td>
                                    <td>
                                        <button className="btn btn-outline-primary"
                                            onClick={() => { cancelXacNhanNoiBat(XacNhanNoiBat.id) }}>Xác Nhận</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    
                    {state.totalRecords > 5 &&
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

export default XacNhanNoiBat;