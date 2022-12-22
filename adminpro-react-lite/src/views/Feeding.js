import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    Card, CardBody, CardTitle, CardSubtitle,
    ListGroup,
    ListGroupItem,
    Button,
    Table
} from "reactstrap";
import { selectCustomer } from "../store/userSlice";

import PaginationComponent from "./pagination/paginationComponent";

function Feed({ privatee }) {
    const { id, jwtToken } = useSelector(selectCustomer);


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
                    method: 'GET',
                    headers: {
                        'accept': ' text/plain',
                        'Authorization': 'Bearer ' + jwtToken
                    }
                };
                const response = await fetch('https://localhost:7071/api/Feedback/get?page=' + pagee + '&pageSize=5', requestOptions)
                const data = await response.json();
                setState({
                    data: data.results,
                    totalRecords: data.total
                })
            } catch (error) {
                res.send(error.stack);
            }
        }
        fetchData();
    }, [pagee])

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Thư góp ý</CardTitle>
                    {privatee ? <></> :
                        <Link to="/gopy" className="nav-link">
                            <CardSubtitle className="text-muted" tag="h6">
                                Xem tất cả
                            </CardSubtitle>
                        </Link>
                    }

                    <Table className="no-wrap mt-1 align-middle" responsive borderless>
                        <thead>
                            <tr>
                                <th>Tiêu đề</th>
                                <th>xem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.data.map((feed, index) => (
                                <tr className="border-top">
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <i className={"bi bi-bell p-1"}></i>
                                            <Link to={"/chitietgopy/" + feed.id} style={{ textDecoration: "none" }} key={index}>
                                                <h6 className="mb-0">{feed.title}</h6>
                                                {/* <span className="text-muted">{feed.email}</span> */}
                                            </Link>
                                        </div>
                                    </td>
                                    <td>{feed.status == 2 ? <p style={{color:"red"}}>Đã đọc</p> : 
                                    <p style={{color:"blue"}}>Chưa đọc</p>}</td>
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

export default Feed;