import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Dashboard",
    href: "/starter",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Customer",
    href: "/khachhang",
    icon: "bi bi-people",
  },
  {
    title: "Feeds",
    href: "/gopy",
    icon: "bi bi-card-text",
  },
  {
    title: "Featured",
    href: "/noibat",
    icon: "bi bi-list",
  },
  {
    title: "Export",
    href: "/",
    icon: "bi bi-file-earmark-excel",
  },
  {
    title: "About",
    href: "/about",
    icon: "bi bi-people",
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="bg-dark">
      <div className="d-flex">
        <Button
          color="white"
          className="ms-auto text-white d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-x"></i>
        </Button>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="m-2 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
          
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
