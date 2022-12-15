import { Card, CardBody, CardSubtitle, CardTitle, Row, Col } from "reactstrap";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCustomer } from "../../store/userSlice";
import { CSVLink, CSVDownload } from 'react-csv';


const SalesChart = () => {
  const { id, jwtToken } = useSelector(selectCustomer);

  const [tota, setTota] = useState({
    user: 0,
    item: 0,
    feed: 0
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
  const [csvData, setCsvData] = useState({
    dataa:[],
    it:3
  });

  useEffect(() => {
    const fetchData = async (req, res) => {
      try {
        const requestOptions = {
          method: 'POST',
          headers: {
            'accept': ' text/plain',
            'Content-Type': 'application/json-patch+json'
          },
          body: JSON.stringify(
            {
              "page": 0,
              "pageSize": 400
            })
        };
        const response = await fetch('https://localhost:7071/api/Item/get', requestOptions)
        const data = await response.json();

        const requestOptions2 = {
          method: 'GET',
          headers: {
            'accept': ' text/plain',
            'Authorization': 'Bearer ' + jwtToken
          }
        };
        const response2 = await fetch('https://localhost:7071/api/Account/get', requestOptions2)
        const data2 = await response2.json();

        const requestOptions3 = {
          method: 'GET',
          headers: {
            'accept': ' text/plain',
            'Authorization': 'Bearer ' + jwtToken
          }
        };
        const response3 = await fetch('https://localhost:7071/api/Statistical/get?page=0&pageSize=400', requestOptions3)
        const data3 = await response3.json();
        let series1 = [
          {
            name: "2021",
            data: [],
          },
          {
            name: "2022",
            data: [],
          },
        ]
        series1.forEach((t) => {
          data3.results.forEach((e) => {
            if (e.year == t.name) {t.data.push(e.amount)}       
          })
          if(t.name == 2022) {t.data.push(data.total)}
        });
        setSeroes(series1)
        console.log(series1)
        
        const requestOptions4 = {
          method: 'GET',
          headers: {
            'accept': ' text/plain',
            'Authorization': 'Bearer ' + jwtToken
          }
        };
        const response4 = await fetch('https://localhost:7071/api/Feedback/get?page=0&pageSize=400', requestOptions4)
        const data4 = await response4.json();

        setTota({
          ...tota,
          item: data.total,
          user: data2.length,
          feed: data4.total
        })
        const d4 = data4.results.map(x => (
          [x.id, x.accountId, x.title, x.content]
        ));
        const d2 = data2.map(x => (
          [x.id, x.title, x.firstname, x.lastname, x.address, x.phone, x.email, x.status]
        ));
        
        const d = data.results.map(x => (
          [x.id, x.accountId, x.name, x.topic, x.area, x.price, x.address, x.phone, x.describe, x.status]
        ));
        
        const csvv = {
          dataa:[
            ['số khách hàng:', d2.length],
            ['id', 'title', 'firstname', 'lastname', 'address', 'phone', 'email', 'status'],
            ...d2,
            ['số sản phẩm:', d.length],
            ['id', 'accountId', 'name', 'topic', 'area', 'price', 'address', 'phone', 'describe', 'status'],
            ...d,
            ['số góp ý:', d4.length],
            ['id', 'accountId', 'title', 'content'],
            ...d4  
          ],
          it:4
        }
        setCsvData(csvv)
      } catch (error) {
        //res.send(error.stack);
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
          <Col md="3" className="bg-danger border border-danger m-4 p-3 rounded" >
            <h6>Số góp ý</h6>
            <h4 className="mb-0 fw-bold" >{tota.feed} góp ý</h4>
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
      <label>Export file gồm thông tin người dùng, thông tin sản phẩm, thông tin góp ý</label>
      <br></br>
      <button className="btn btn-outline-primary"><CSVLink data={csvData.dataa}  >Export File</CSVLink></button>
    </>
  );
};

export default SalesChart;
