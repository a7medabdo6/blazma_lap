import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import logo from "../assets/img/logo.png";

function Sidebar({ active, setnumbersOfNewReservations }) {
  const [employer, setemployer] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);
  const [dataofContact, setdataofContact] = useState([]);
  const [redadOfContact, setredadOfContact] = useState(true);
  const [numbersOfUnreadContact, setnumbersOfUnreadContact] = useState(0);

  const [read, setread] = useState(true);
  const [numbersOfUnread, setnumbersOfUnread] = useState(0);

  useEffect(() => {
    var localStorageObj = localStorage.getItem("user");
    var parsed = JSON.parse(localStorageObj);
    console.log(parsed, "parsed");

    if (parsed?.role == "employer") {
      setemployer(true);
    }
  }, []);
  const updateReservations = async () => {
    try {
      const result = await axios.get("visit/allvisits");
      console.log(result.data, "result");
      setSuccess(result.status == 200 ? true : false);
      setData(result.data);
      let unRead = 0;
      for (var i = 0; i < result.data.length; i++) {
        if (result.data[i].read == 0) {
          setread(false);
          unRead++;
        }
      }
      setnumbersOfUnread(unRead);
      console.log(unRead, "unRead");

      if (active == "reservations") {
        setread(true);
        const result = await axios.get("visit/findallandUpdate");
        setnumbersOfNewReservations(unRead);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const updatecontact = async () => {
    try {
      const result = await axios.get("contact/allcontacts");
      console.log(result.data, "result");
      setdataofContact(result.data);
      let unRead = 0;
      for (var i = 0; i < result.data.length; i++) {
        if (result.data[i].read == 0) {
          setredadOfContact(false);
          unRead++;
        }
      }
      setnumbersOfUnreadContact(unRead);

      if (active == "messages") {
        setredadOfContact(true);
        const result = await axios.get("contact/findallandUpdate");
        setnumbersOfNewReservations(unRead);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    updateReservations();
    updatecontact();
  }, []);
  return (
    <div _ngcontent-rgj-c41="" class="dashboard-sidebar">
      <div
        _ngcontent-rgj-c41=""
        class="sidebar-header p-5 d-md-flex d-none align-items-center"
      >
        <img _ngcontent-heq-c38="" src={logo} alt="The Lab Logo" class="logo" />
      </div>
      <div _ngcontent-rgj-c41="" class="sidebar-links p-4">
        <div _ngcontent-rgj-c41="" class="row flex-column">
          <div
            _ngcontent-rgj-c41=""
            routerlinkactive="active-sidebar-link"
            class=""
            tabindex="0"
            className={`sidebar-link color-dark-grey corner-15 my-3 py-1   ${
              active == "customers" ? "active-sidebar-link" : ""
            }`}
          >
            <div _ngcontent-rgj-c41="" class="d-flex">
              <div
                _ngcontent-rgj-c41=""
                class="sidebar-link-icon d-flex align-items-center justify-content-center"
              >
                <Link to="/dashboard">
                  <fa-icon _ngcontent-rgj-c41="" class="ng-fa-icon font-24">
                    <svg
                      role="img"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="users"
                      class="svg-inline--fa fa-users fa-w-20"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path
                        fill="currentColor"
                        d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"
                      ></path>
                    </svg>
                  </fa-icon>
                </Link>
              </div>
              <div
                _ngcontent-rgj-c41=""
                class="sidebar-link-text me-4 d-md-flex d-none align-items-center"
              >
                <Link to="/dashboard">
                  <a _ngcontent-rgj-c41="" class="fw-bold font-18 m-0">
                    العملاء
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div
            _ngcontent-rgj-c41=""
            routerlinkactive="active-sidebar-link"
            className={`sidebar-link color-dark-grey corner-15 my-3 py-1   ${
              active == "messages" ? "active-sidebar-link" : ""
            }`}
            tabindex="0"
          >
            <div _ngcontent-rgj-c41="" class="d-flex">
              <div
                _ngcontent-rgj-c41=""
                class="sidebar-link-icon d-flex align-items-center justify-content-center"
              >
                <Link to="/dashboard/messages">
                  <fa-icon _ngcontent-rgj-c41="" class="ng-fa-icon font-24">
                    <svg
                      role="img"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="envelope-open-text"
                      class="svg-inline--fa fa-envelope-open-text fa-w-16"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M176 216h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16H176c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16zm-16 80c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16H176c-8.84 0-16 7.16-16 16v16zm96 121.13c-16.42 0-32.84-5.06-46.86-15.19L0 250.86V464c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V250.86L302.86 401.94c-14.02 10.12-30.44 15.19-46.86 15.19zm237.61-254.18c-8.85-6.94-17.24-13.47-29.61-22.81V96c0-26.51-21.49-48-48-48h-77.55c-3.04-2.2-5.87-4.26-9.04-6.56C312.6 29.17 279.2-.35 256 0c-23.2-.35-56.59 29.17-73.41 41.44-3.17 2.3-6 4.36-9.04 6.56H96c-26.51 0-48 21.49-48 48v44.14c-12.37 9.33-20.76 15.87-29.61 22.81A47.995 47.995 0 0 0 0 200.72v10.65l96 69.35V96h320v184.72l96-69.35v-10.65c0-14.74-6.78-28.67-18.39-37.77z"
                      ></path>
                    </svg>
                  </fa-icon>
                </Link>
                {redadOfContact ? (
                  ""
                ) : (
                  <span className="notification">
                    {" "}
                    {numbersOfUnreadContact}
                  </span>
                )}
              </div>
              <div
                _ngcontent-rgj-c41=""
                class="sidebar-link-text me-4 d-md-flex d-none align-items-center"
              >
                <Link to="/dashboard/messages">
                  <a _ngcontent-rgj-c41="" class="fw-bold font-18 m-0">
                    الرسائل
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div
            _ngcontent-rgj-c41=""
            routerlinkactive="active-sidebar-link"
            className={`sidebar-link color-dark-grey corner-15 my-3 py-1   ${
              active == "reservations" ? "active-sidebar-link" : ""
            }`}
            tabindex="0"
          >
            <div _ngcontent-rgj-c41="" class="d-flex">
              <div
                _ngcontent-rgj-c41=""
                class="sidebar-link-icon d-flex align-items-center justify-content-center"
              >
                <Link to="/dashboard/reservations">
                  <fa-icon _ngcontent-rgj-c41="" class="ng-fa-icon font-24">
                    <svg
                      role="img"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="clipboard-list"
                      class="svg-inline--fa fa-clipboard-list fa-w-12"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path
                        fill="currentColor"
                        d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM96 424c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm96-192c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm128 368c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z"
                      ></path>
                    </svg>
                  </fa-icon>
                </Link>
                {read ? (
                  ""
                ) : (
                  <span className="notification"> {numbersOfUnread}</span>
                )}
              </div>
              <div
                _ngcontent-rgj-c41=""
                class="sidebar-link-text me-4 d-md-flex d-none align-items-center"
              >
                <Link to="/dashboard/reservations">
                  <a _ngcontent-rgj-c41="" class="fw-bold font-18 m-0">
                    الحجوزات
                  </a>
                </Link>
              </div>
            </div>
          </div>

          {employer ? (
            ""
          ) : (
            <div
              _ngcontent-rgj-c41=""
              routerlinkactive="active-sidebar-link"
              className={`sidebar-link color-dark-grey corner-15 my-3 py-1   ${
                active == "employes" ? "active-sidebar-link" : ""
              }`}
              tabindex="0"
            >
              <div _ngcontent-rgj-c41="" class="d-flex">
                <div
                  _ngcontent-rgj-c41=""
                  class="sidebar-link-icon d-flex align-items-center justify-content-center"
                >
                  <Link to="/dashboard/users">
                    <fa-icon _ngcontent-rgj-c41="" class="ng-fa-icon font-24">
                      <svg
                        role="img"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="users-cog"
                        class="svg-inline--fa fa-users-cog fa-w-20"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                      >
                        <path
                          fill="currentColor"
                          d="M610.5 341.3c2.6-14.1 2.6-28.5 0-42.6l25.8-14.9c3-1.7 4.3-5.2 3.3-8.5-6.7-21.6-18.2-41.2-33.2-57.4-2.3-2.5-6-3.1-9-1.4l-25.8 14.9c-10.9-9.3-23.4-16.5-36.9-21.3v-29.8c0-3.4-2.4-6.4-5.7-7.1-22.3-5-45-4.8-66.2 0-3.3.7-5.7 3.7-5.7 7.1v29.8c-13.5 4.8-26 12-36.9 21.3l-25.8-14.9c-2.9-1.7-6.7-1.1-9 1.4-15 16.2-26.5 35.8-33.2 57.4-1 3.3.4 6.8 3.3 8.5l25.8 14.9c-2.6 14.1-2.6 28.5 0 42.6l-25.8 14.9c-3 1.7-4.3 5.2-3.3 8.5 6.7 21.6 18.2 41.1 33.2 57.4 2.3 2.5 6 3.1 9 1.4l25.8-14.9c10.9 9.3 23.4 16.5 36.9 21.3v29.8c0 3.4 2.4 6.4 5.7 7.1 22.3 5 45 4.8 66.2 0 3.3-.7 5.7-3.7 5.7-7.1v-29.8c13.5-4.8 26-12 36.9-21.3l25.8 14.9c2.9 1.7 6.7 1.1 9-1.4 15-16.2 26.5-35.8 33.2-57.4 1-3.3-.4-6.8-3.3-8.5l-25.8-14.9zM496 368.5c-26.8 0-48.5-21.8-48.5-48.5s21.8-48.5 48.5-48.5 48.5 21.8 48.5 48.5-21.7 48.5-48.5 48.5zM96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm224 32c1.9 0 3.7-.5 5.6-.6 8.3-21.7 20.5-42.1 36.3-59.2 7.4-8 17.9-12.6 28.9-12.6 6.9 0 13.7 1.8 19.6 5.3l7.9 4.6c.8-.5 1.6-.9 2.4-1.4 7-14.6 11.2-30.8 11.2-48 0-61.9-50.1-112-112-112S208 82.1 208 144c0 61.9 50.1 112 112 112zm105.2 194.5c-2.3-1.2-4.6-2.6-6.8-3.9-8.2 4.8-15.3 9.8-27.5 9.8-10.9 0-21.4-4.6-28.9-12.6-18.3-19.8-32.3-43.9-40.2-69.6-10.7-34.5 24.9-49.7 25.8-50.3-.1-2.6-.1-5.2 0-7.8l-7.9-4.6c-3.8-2.2-7-5-9.8-8.1-3.3.2-6.5.6-9.8.6-24.6 0-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h255.4c-3.7-6-6.2-12.8-6.2-20.3v-9.2zM173.1 274.6C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"
                        ></path>
                      </svg>
                    </fa-icon>
                  </Link>
                </div>
                <div
                  _ngcontent-rgj-c41=""
                  class="sidebar-link-text me-4 d-md-flex d-none align-items-center"
                >
                  <Link to="/dashboard/users">
                    <a _ngcontent-rgj-c41="" class="fw-bold font-18 m-0">
                      الموظفين
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
