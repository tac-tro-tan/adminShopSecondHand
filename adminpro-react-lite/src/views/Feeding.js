import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    Card, CardBody, CardTitle, CardSubtitle,
    ListGroup,
    ListGroupItem,
    Button
} from "reactstrap";
import { selectCustomer } from "../store/userSlice";

import PaginationComponent from "./pagination/paginationComponent";

function Feed({privatee}) {
    const { id, jwtToken } = useSelector(selectCustomer);


    const[pagee,setPagee]= useState(0);

    // phân trang
    const [state, setState] = useState({
        data: [],
        totalRecords: 0
    })

    const getPaginatedData = page => {
        setPagee(page-1)
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
                const response = await fetch('https://localhost:7071/api/Feedback/get?page='+pagee+'&pageSize=5', requestOptions)
                const data = await response.json();
                setState({
                    data:data.results,
                    totalRecords:data.total
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

                    <ListGroup flush className="mt-2">
                        {state.data.map((feed, index) => (
                            <Link to={"/chitietgopy/"+feed.id} style={{textDecoration:"none"}} key={index}>
                                <ListGroupItem
                                    key={index}
                                    action
                                    className="d-flex align-items-center p-3 border-0"
                                >
                                    <Button
                                        className="rounded-circle me-3"
                                        size="sm"
                                        color={feed.color}
                                    >
                                        <i className={"bi bi-bell"}></i>
                                    </Button>
                                    <div className="mx-4">{feed.title}</div>
                                    
                                    <small className="mx-2 ms-auto text-muted text-small">
                                        {feed.date}
                                    </small>
                                </ListGroupItem>
                            </Link>
                        ))}
                    </ListGroup>
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