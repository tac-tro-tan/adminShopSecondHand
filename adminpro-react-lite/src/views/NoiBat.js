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

function NoiBat() {
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
                const response = await fetch('https://localhost:7071/api/Item/getpay', requestOptions)
                const data = await response.json();
                data.results.forEach(y => {
                    const word = new Date(y.payTime);
                    word.setDate(word.getDate() + 14);
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

    const cancelNoiBat = (e) => {
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
                const response = await fetch('https://localhost:7071/api/Item/cancel?id=' + e, requestOptions)
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
                    <CardTitle tag="h5">Sản phẩm hot</CardTitle>
                    <Table className="no-wrap mt-1 align-middle" responsive borderless>
                        <thead>
                            <tr>
                                
                                <th>Tên sản phẩm</th>
                                <th>Thời gian hết hạn</th>
                                <th>Xóa</th>

                            </tr>
                        </thead>
                        <tbody>
                            {state.data.map((NoiBat, index) => (
                                <tr key={index} className="border-top">
                                    <td><div className="mx-2">{NoiBat.name}</div></td>
                                    <td> {NoiBat.time}</td>
                                    <td>
                                        <button className="btn btn-outline-primary"
                                            onClick={() => { cancelNoiBat(NoiBat.id) }}>Xóa</button>
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

export default NoiBat;