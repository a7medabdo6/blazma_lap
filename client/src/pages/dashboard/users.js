import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import Footer from "../../components/Footer";
import MainHeader from "../../components/MainHeader";
import TopHeader from "../../components/TopHeader";
import Sidebar from "../../components/sidebar";
function Users() {
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);
  const [deleteusers, setdeleteusers] = useState(false);
  const [TypeOfUser, setTypeOfUser] = useState("");
  const [numberofreports, setnumberofReports] = useState(0);
  var numberofReports = 0;
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
      setTypeOfUser(parsed.role);
    }
  }, []);
  useEffect(() => {
    var localStorageObj = localStorage.getItem("user");
    var parsed = JSON.parse(localStorageObj);
    if (
      parsed?.role !== "superAdmin" &&
      parsed?.role !== "leader" &&
      parsed?.role !== "employer"
    ) {
      return router.push("/login");
    }
  }, []);
  useEffect(() => {
    var localStorageObj = localStorage.getItem("user");
    var parsed = JSON.parse(localStorageObj);

    if (
      parsed?.role !== "superAdmin" &&
      parsed?.role !== "leader" &&
      parsed?.role !== "employer"
    ) {
      return router.push("/");
    }
  }, []);
  useEffect(async () => {
    try {
      const result = await axios.get("/allusers");
      console.log(result.data, "result");
      setSuccess(result.status == 200 ? true : false);
      setErrors([]);
      setData(result.data);
    } catch (error) {
      setErrors(error.response?.data?.errors);
      console.log(error.response?.data?.errors);
    }
  }, [deleteusers]);
  useEffect(() => {
    var localStorageObj = localStorage.getItem("user");
    var parsed = JSON.parse(localStorageObj);
    numberofReports = parsed?.customer;
    console.log(numberofReports, "numberofReports");
    for (var i = 0; i < data.length; i++) {
      numberofReports = numberofReports + data[i].customer;
    }
    console.log(numberofReports, "xxnumberofReports");
    setnumberofReports(parseInt(numberofReports));
  }, [data]);
  const deleteuser = async (e) => {
    try {
      const result = await axios.post(`users/delete?id=${e}`);
      console.log(result, "result");
      setSuccess(result.status == 200 ? true : false);
      setdeleteusers(!deleteusers);
    } catch (error) {
      console.log(error.response.data.errors);
    }
  };
  return (
    <div>
      <div className="">
        <TopHeader />
        <MainHeader active="dashboard" />
        <div _ngcontent-rgj-c41="" class="d-flex minhight">
          <Sidebar active="employes" />
          <div _ngcontent-vwu-c41="" class="dashboard-content bg-light">
            <section _ngcontent-vwu-c44="" class="px-4 py-5">
              <div _ngcontent-vwu-c44="" class="row justify-content-between">
                <div _ngcontent-vwu-c44="" class="heading">
                  <h2 _ngcontent-vwu-c44="" class="fw-bold color-dark py-4">
                    الموظفون
                  </h2>
                </div>
                <div
                  _ngcontent-rgj-c47=""
                  class="my-3"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {TypeOfUser == "superAdmin" ? (
                    <Link to="/register/admin">
                      <p
                        _ngcontent-rgj-c47=""
                        routerlink="create"
                        class="btn bg-main bg-main-hover color-light font-18"
                        tabindex="0"
                      >
                        <fa-icon _ngcontent-rgj-c47="" class="ng-fa-icon">
                          <svg
                            role="img"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="plus"
                            class="svg-inline--fa fa-plus fa-w-14"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path
                              fill="currentColor"
                              d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                            ></path>
                          </svg>
                        </fa-icon>
                        اضافة موظف
                      </p>
                    </Link>
                  ) : (
                    <Link to="/register/employer">
                      <p
                        _ngcontent-rgj-c47=""
                        routerlink="create"
                        class="btn bg-main bg-main-hover color-light font-18"
                        tabindex="0"
                      >
                        <fa-icon _ngcontent-rgj-c47="" class="ng-fa-icon">
                          <svg
                            role="img"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="plus"
                            class="svg-inline--fa fa-plus fa-w-14"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path
                              fill="currentColor"
                              d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                            ></path>
                          </svg>
                        </fa-icon>
                        اضافة موظف
                      </p>
                    </Link>
                  )}

                  <h2 _ngcontent-vwu-c44="" class="fw-bold color-dark py-4">
                    عدد التقارير : {numberofreports}
                  </h2>
                </div>
              </div>
              <table
                _ngcontent-vwu-c44=""
                datatable=""
                id="users-table"
                class="table table-hover"
              >
                <thead _ngcontent-vwu-c44="">
                  <tr _ngcontent-vwu-c44="">
                    <th _ngcontent-vwu-c44="">id</th>

                    <th _ngcontent-vwu-c44="">الاسم</th>
                    <th _ngcontent-vwu-c44="">الايميل</th>
                    <th _ngcontent-vwu-c44="">الدور</th>
                    <th _ngcontent-vwu-c44="">عدد التقارير</th>
                    <th _ngcontent-vwu-c44="">بواسطه</th>
                    <th _ngcontent-vwu-c44="">تعديل كلمه المرور</th>

                    <th _ngcontent-vwu-c44="">حذف</th>
                  </tr>
                </thead>
                <tbody _ngcontent-vwu-c44="">
                  {data.map((item) => {
                    return (
                      <tr _ngcontent-vwu-c43="">
                        <td _ngcontent-vwu-c43="">{item.id}</td>

                        <td _ngcontent-vwu-c43="">{item.name}</td>
                        <td _ngcontent-vwu-c43="">{item.email}</td>
                        <td _ngcontent-vwu-c43="">{item.role}</td>
                        <td _ngcontent-vwu-c43="">{item.customer.length}</td>

                        <td _ngcontent-vwu-c43="">{item.nameofParentUser}</td>
                        <td _ngcontent-rgj-c47="">
                          <Link to={`/dashboard/edit-password?id=${item.id}`}>
                            <div
                              _ngcontent-rgj-c47=""
                              class="table-btn rounded-circle d-flex justify-content-center align-items-center shadow-sm bg-white"
                            >
                              <fa-icon
                                _ngcontent-rgj-c47=""
                                class="ng-fa-icon edit-icon"
                                tabindex="0"
                              >
                                <svg
                                  role="img"
                                  aria-hidden="true"
                                  focusable="false"
                                  data-prefix="fas"
                                  data-icon="edit"
                                  class="svg-inline--fa fa-edit fa-w-18"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 576 512"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"
                                  ></path>
                                </svg>
                              </fa-icon>
                            </div>
                          </Link>
                        </td>

                        <td _ngcontent-vwu-c43="">
                          <div
                            onClick={() => deleteuser(item.id)}
                            style={{ cursor: "pointer" }}
                            _ngcontent-vwu-c43=""
                            class="table-btn rounded-circle d-flex justify-content-center align-items-center shadow-sm bg-white"
                          >
                            <fa-icon
                              _ngcontent-vwu-c43=""
                              class="ng-fa-icon delete-icon"
                            >
                              <svg
                                role="img"
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="trash-alt"
                                class="svg-inline--fa fa-trash-alt fa-w-14"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                              >
                                <path
                                  fill="currentColor"
                                  d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
                                ></path>
                              </svg>
                            </fa-icon>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>{" "}
              </table>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
