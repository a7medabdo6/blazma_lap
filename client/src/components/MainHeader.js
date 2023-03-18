import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
function MainHeader({ active }) {
  const [dashboard, setdashboard] = useState(false);
  //var parsed = null;
  const [employer, setemployer] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["expireafter"]);
  const router = useHistory();

  useEffect(() => {
    var localStorageObj = localStorage.getItem("user");
    var parsed = JSON.parse(localStorageObj);
    console.log(parsed, "parsed");
    if (
      parsed?.role == "superAdmin" ||
      parsed?.role == "leader" ||
      parsed?.role == "employer"
    ) {
      setdashboard(true);
      if (parsed?.role == "employer") {
        setemployer(true);
      }
    }
  }, []);
  const logout = () => {
    console.log(cookies.expireafter, "cookies");
    localStorage.removeItem("user");
    localStorage.removeItem("time");

    removeCookie("expireafter");
    router.push("/login");
  };
  return (
    <nav
      _ngcontent-heq-c38=""
      className="navbar navbar-expand-lg navbar-light bg-main"
    >
      <div _ngcontent-heq-c38="" className="container">
        <div _ngcontent-heq-c38="" id="navbarSupportedContent">
          <Navbar expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <ul
                _ngcontent-heq-c38=""
                className="navbar-nav fw-bold mx-auto mb-2 mb-lg-0"
              >
                <li _ngcontent-heq-c38="" className="nav-item px-4 py-1">
                  <Link to="/">
                    <a
                      _ngcontent-heq-c38=""
                      routerlink="home"
                      routerlinkactive="activeLink"
                      className={`nav-link color-light bg-main-hover corner-5 p-3  ${
                        active === "home" ? "activeLink" : ""
                      }`}
                    >
                      الرئيسية
                    </a>
                  </Link>
                </li>
                <li _ngcontent-heq-c38="" className="nav-item px-4 py-1">
                  <Link to="/house-visit">
                    <a
                      _ngcontent-heq-c38=""
                      routerlink="house-visit"
                      routerlinkactive="activeLink"
                      className={`nav-link color-light bg-main-hover corner-5 p-3  ${
                        active == "house" ? "activeLink" : ""
                      }`}
                    >
                      زيارة منزلية
                    </a>
                  </Link>
                </li>
                <li _ngcontent-heq-c38="" className="nav-item px-4 py-1">
                  <Link to="/test-result">
                    <a
                      _ngcontent-heq-c38=""
                      routerlink="test-result"
                      routerlinkactive="activeLink"
                      className={`nav-link color-light bg-main-hover corner-5 p-3  ${
                        active == "result" ? "activeLink" : ""
                      }`}
                    >
                      نتيجة تحليل
                    </a>
                  </Link>
                </li>

                <li _ngcontent-heq-c38="" className="nav-item px-4 py-1">
                  <Link to="/guides">
                    <a
                      _ngcontent-heq-c38=""
                      routerlink="guides"
                      routerlinkactive="activeLink"
                      className={`nav-link color-light bg-main-hover corner-5 p-3  ${
                        active == "guides" ? "activeLink" : ""
                      }`}
                    >
                      شروط التحاليل
                    </a>
                  </Link>
                </li>
                <li _ngcontent-heq-c38="" className="nav-item px-4 py-1">
                  {dashboard ? (
                    <Link to="/dashboard">
                      <a
                        _ngcontent-heq-c38=""
                        routerlinkactive="activeLink"
                        className="nav-link color-light bg-main-hover corner-5 p-3"
                        className={`nav-link color-light bg-main-hover corner-5 p-3  ${
                          active == "dashboard" ? "activeLink" : ""
                        }`}
                      >
                        لوحة التحكم{" "}
                      </a>
                    </Link>
                  ) : (
                    ""
                  )}
                </li>
                <li _ngcontent-heq-c38="" className="nav-item px-4 py-1">
                  <Link to="/about">
                    <a
                      _ngcontent-heq-c38=""
                      routerlink="about"
                      routerlinkactive="activeLink"
                      className="nav-link color-light bg-main-hover corner-5 p-3"
                      className={`nav-link color-light bg-main-hover corner-5 p-3  ${
                        active == "about" ? "activeLink" : ""
                      }`}
                    >
                      عن المعمل
                    </a>
                  </Link>
                </li>
                <li _ngcontent-heq-c38="" className="nav-item px-4 py-1">
                  <Link to="/contact">
                    <a
                      _ngcontent-heq-c38=""
                      routerlink="contact"
                      routerlinkactive="activeLink"
                      className={`nav-link color-light bg-main-hover corner-5 p-3  ${
                        active == "contact" ? "activeLink" : ""
                      }`}
                    >
                      تواصل معنا
                    </a>
                  </Link>
                </li>
                <li _ngcontent-heq-c38="" className="nav-item px-4 logout py-1">
                  {dashboard ? (
                    <a
                      _ngcontent-heq-c38=""
                      routerlinkactive="activeLink"
                      className="nav-link logout color-light bg-main-hover corner-5 p-3"
                      className={`nav-link color-light bg-main-hover corner-5 p-3  ${
                        active == "dashboard" ? "" : ""
                      }`}
                    >
                      <button
                        type="button"
                        onClick={logout}
                        class="btn logout btn-default btn-sm"
                      >
                        <span class="glyphicon glyphicon-log-out"></span> تسجيل
                        الخروج
                      </button>
                    </a>
                  ) : (
                    ""
                  )}
                </li>
                <li _ngcontent-heq-c38="" className="nav-item px-4 py-1"></li>
              </ul>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    </nav>
  );
}

export default MainHeader;
