import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Customer from "./Customer";

const Starter = () => {
  
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
      <Row>
        <Col lg="12">
          <Customer privatee={false} />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
