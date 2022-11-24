import { Card, CardBody, CardSubtitle, CardTitle, Row, Col } from "reactstrap";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";

const SalesChart = () => {
  const [tota, setTota] = useState({
    user: 0,
    item: 0,
    online: 0
  })
  const [series, setSeroes] = useState(
    [
      {
        name: "2021",
        data: [],
      },
      {
        name: "2022",
        data: [],
      },
    ]
  )

  useEffect(() => {
    const fetchData = async (req, res) => {
      try {
        const requestOptions = {
          method: 'GET'
        };
        const response = await fetch('https://localhost:7071/api/Item/get?page=0&pageSize=40', requestOptions)
        const data = await response.json();

        const requestOptions2 = {
          method: 'GET'
        };
        const response2 = await fetch('https://localhost:7071/api/Account/get', requestOptions2)
        const data2 = await response2.json();

        const requestOptions3 = {
          method: 'GET'
        };
        const response3 = await fetch('https://localhost:7071/api/Statistical/get?page=0&pageSize=40', requestOptions3)
        const data3 = await response3.json();
        series.forEach((t) => {
          data3.results.forEach((e) => {
            if (e.year == t.name) t.data.push(e.amount)
          })
        });


        setTota({
          ...tota,
          item: data.total,
          user: data2.length
        })
      } catch (error) {
        res.send(error.stack);
      };
    }
    fetchData();

  }, [])

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      stacked: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    legend: {
      show: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        borderRadius: 2,
      },
    },
    colors: ["#6771dc", "#009efb", "#6771dc"],
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1],
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "60%",
              borderRadius: 7,
            },
          },
        },
      },
    ],
  };

  return (
    <>
      <div className="text-white">
        <Row>
          <Col md="3" className="bg-success border border-success m-4 p-3 rounded">
            <h6>Số khách hàng</h6>
            <h4 className="mb-0 fw-bold">{tota.user} Người</h4>
          </Col>
          <Col md="3" className="bg-info border border-info m-4 p-3 rounded">
            <h6>Sản phẩm đang bán</h6>
            <h4 className="mb-0 fw-bold">{tota.item} Sản phẩm</h4>
          </Col>
          <Col md="3" className="bg-danger border border-danger m-4 p-3 rounded">
            <h6>Số người online</h6>
            <h4 className="mb-0 fw-bold">2 Người</h4>
          </Col>
        </Row>
      </div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Thống kê sản phẩm</CardTitle>
          <CardSubtitle className="text-muted" tag="h6">
            theo năm
          </CardSubtitle>
          <Chart options={options} series={series} type="area" height="279" />
        </CardBody>
      </Card>
    </>
  );
};

export default SalesChart;
