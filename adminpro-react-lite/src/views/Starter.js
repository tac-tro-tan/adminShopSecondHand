import { useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import { selectCustomer } from "../store/userSlice";
import Customer from "./Customer";

const Starter = () => {
  
  const {  roles } = useSelector(selectCustomer);


  return (
    <div>
      {/***Top Cards***/}

      {/***Sales & Feed***/}
      <Row>
        <Col lg="12">
          <SalesChart />
        </Col>
      </Row>
      {/***Table ***/}
      {roles[0].name === "ADMIN"?<Row>
        <Col lg="12">
         <Customer privatee={false} />
        </Col>
      </Row>:<></>}
    </div>
  );
};

export default Starter;
