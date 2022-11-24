import { Row, Col, Card, CardBody, CardTitle, Button } from "reactstrap";

const About = () => {
  return (
    <Row>
      <Col>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            About Admin Chợ Cũ
          </CardTitle>
          <CardBody className="p-4">
            <Row justify-content>
              <Col lg="8">
                <h2 className="mt-4">Admin Chợ cũ</h2>
                <h5 className=" mb-4">
                  2 năm phát triển với vô vàn khó khăn nhưng chúng ta vẫn trụ lại được chỉ với vài trăm đơn hàng
                </h5>
                <img
                  src="https://demos.wrappixel.com/free-admin-templates/angular/landingpage-styles/assets/images/screenshots/adminpro-react-pro-lp-img.jpg"
                  alt="my"
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default About;
