import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import Footer from "../../components/Footer";
import MainHeader from "../../components/MainHeader";
import TopHeader from "../../components/TopHeader";
import axios from "../../axios";
import Sidebar from "../../components/sidebar";
import PaginatedItems from "../../components/Paginate";
import Modal from "../../components/Modal";
import { useCookies } from "react-cookie";

function Dashboard() {
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [modalShow, setModalShow] = useState(false);

  const [data, setData] = useState([]);
  const [deleteStatus, setdeleteStatus] = useState(false);
  const [deleteMulti, setdeleteMulti] = useState("");
  const router = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies(["expireafter"]);

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
    console.log(cookies.expireafter, "cookies");
    setTimeout(() => {
      localStorage.removeItem("user");
      removeCookie("expireafter");
    }, cookies.expireafter);
  }, []);
  const getallcusomers = async (e) => {
    try {
      const result = await axios.get(`customer/allcustomers?page=${e}`, {
        withCredentials: true,
      });
      console.log(result.data, "result");
      setSuccess(result.status == 200 ? true : false);
      setErrors([]);
      setData(result.data.items);
      setPageCount(result.data.totalPages);
    } catch (error) {
      setErrors(error.response?.data.errors);
      console.log(error.response?.data.errors);
    }
  };
  useEffect(async () => {
    getallcusomers(0);
  }, [deleteStatus]);
  const paginationClicked = (e) => {
    console.log(e, "eeeeeeeeeeee");
    getallcusomers(e);
  };
  const deletecustomer = async (e) => {
    try {
      const result = await axios.post(`customer/delete?id=${e}`);
      console.log(result, "result");
      setSuccess(result.status == 200 ? true : false);
      setdeleteStatus(!deleteStatus);
      setModalShow(true);
    } catch (error) {
      console.log(error.response.data.errors);
    }
  };
  const deletemulti = async (e) => {
    if (!deleteMulti.includes(e)) {
      setdeleteMulti([...deleteMulti, e]);
    } else {
      const index = deleteMulti.indexOf(e);

      if (index > -1) {
        const newarray = deleteMulti;
        newarray.splice(index, 1); // 2nd parameter means remove one item only
        console.log(newarray, "newarray");

        setdeleteMulti(newarray);
      }
    }
  };
  const deleteMultiBtn = async () => {
    console.log(deleteMulti);

    try {
      const result = await axios.post(`customer/deletemany?id=${deleteMulti}`);
      console.log(result, "result");
      setSuccess(result.status == 200 ? true : false);
      setdeleteStatus(!deleteStatus);
    } catch (error) {
      console.log(error.response.data.errors);
    }
  };
  const PushHandler = (e) => {
    router.push({
      pathname: "/dashboard/edit-customer",
      search: `?customer_id=${e}`,
    });
  };
  return (
    <div>
      <TopHeader />
      <MainHeader active="dashboard" />
      <div _ngcontent-rgj-c41="" class="d-flex minhight">
        <Sidebar active="customers" />
        <div _ngcontent-rgj-c41="" class="dashboard-content bg-light">
          <section _ngcontent-rgj-c47="" class="px-4 py-5">
            <div _ngcontent-rgj-c47="" class="row justify-content-between">
              <div _ngcontent-rgj-c47="" class="heading">
                <h2 _ngcontent-rgj-c47="" class="fw-bold color-dark py-4">
                  العملاء
                </h2>
              </div>
            </div>
            <div _ngcontent-rgj-c47="" class="my-3">
              <Link to="/dashboard/add-customer">
                <p
                  _ngcontent-rgj-c47=""
                  routerlink="create"
                  class="btn bg-main bg-main-hover color-light font-18"
                  tabindex="0"
                >
                  اضافة عميل{" "}
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
                </p>
              </Link>
            </div>
            <div _ngcontent-rgj-c47="" class="my-3">
              <button
                _ngcontent-rgj-c47=""
                onClick={deleteMultiBtn}
                class="btn bg-main bg-main-hover color-light font-18"
              >
                حذف التحديد{" "}
                <fa-icon _ngcontent-rgj-c47="" class="ng-fa-icon">
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
              </button>
            </div>

            <div
              id="users-table_wrapper"
              class="dataTables_wrapper dt-bootstrap5 no-footer"
            >
              <div class="row">
                <div class="table-responsive bg-white p-4 corner-15">
                  <table
                    _ngcontent-rgj-c47=""
                    datatable=""
                    id="users-table"
                    class="table table-hover dataTable no-footer"
                  >
                    <thead _ngcontent-rgj-c47="">
                      <tr _ngcontent-rgj-c47="">
                        <th
                          _ngcontent-rgj-c47=""
                          class="sorting width5px"
                          tabindex="0"
                          aria-controls="users-table"
                          rowspan="1"
                          colspan="1"
                          style={{ width: "5px" }}
                        >
                          id
                        </th>
                        <th
                          _ngcontent-rgj-c47=""
                          class="sorting width5px"
                          tabindex="0"
                          aria-controls="users-table"
                          rowspan="1"
                          colspan="1"
                          aria-label="الاسم: activate to sort column ascending"
                          style={{ width: "5px" }}
                        ></th>
                        <th
                          _ngcontent-rgj-c47=""
                          class="sorting"
                          tabindex="0"
                          aria-controls="users-table"
                          rowspan="1"
                          colspan="1"
                          aria-label="الاسم: activate to sort column ascending"
                          style={{ width: "100px" }}
                        >
                          الاسم
                        </th>
                        <th
                          _ngcontent-rgj-c47=""
                          class="sorting"
                          tabindex="0"
                          aria-controls="users-table"
                          rowspan="1"
                          colspan="1"
                          aria-label="النوع: activate to sort column ascending"
                          style={{ width: "35px" }}
                        >
                          النوع
                        </th>
                        {/* <th
                          _ngcontent-rgj-c47=""
                          class="sorting"
                          tabindex="0"
                          aria-controls="users-table"
                          rowspan="1"
                          colspan="1"
                          aria-label="تاريخ الميلاد: activate to sort column ascending"
                          style={{ width: "48px" }}
                        >
                          تاريخ الميلاد
                        </th>
                        <th
                          _ngcontent-rgj-c47=""
                          class="sorting"
                          tabindex="0"
                          aria-controls="users-table"
                          rowspan="1"
                          colspan="1"
                          aria-label="رقم الجواز: activate to sort column ascending"
                          style={{ width: "75px" }}
                        >
                          رقم الجواز
                        </th>*/}
                        <th
                          _ngcontent-rgj-c47=""
                          class="sorting"
                          tabindex="0"
                          aria-controls="users-table"
                          rowspan="1"
                          colspan="1"
                          aria-label="Patient ID: activate to sort column ascending"
                          style={{ width: "51px" }}
                        >
                          Patient ID
                        </th>
                        <th
                          _ngcontent-rgj-c47=""
                          class="sorting"
                          tabindex="0"
                          aria-controls="users-table"
                          rowspan="1"
                          colspan="1"
                          aria-label="التحليل: activate to sort column ascending"
                          style={{ width: "51px" }}
                        >
                          التحليل
                        </th>
                        <th
                          _ngcontent-rgj-c47=""
                          class="sorting"
                          tabindex="0"
                          aria-controls="users-table"
                          rowspan="1"
                          colspan="1"
                          aria-label="النتيجة: activate to sort column ascending"
                          style={{ width: "49px" }}
                        >
                          النتيجة
                        </th>
                        {/*     <th
                          _ngcontent-rgj-c47=""
                          class="sorting"
                          tabindex="0"
                          aria-controls="users-table"
                          rowspan="1"
                          colspan="1"
                          aria-label="Collection Date: activate to sort column ascending"
                          style={{ width: "68px" }}
                        >
                          Collection Date
                        </th>
                        <th
                          _ngcontent-rgj-c47=""
                          class="sorting"
                          tabindex="0"
                          aria-controls="users-table"
                          rowspan="1"
                          colspan="1"
                          aria-label="Reporting Date: activate to sort column ascending"
                          style={{ width: "69px" }}
                        >
                          Reporting Date
                        </th>
                        <th
                          _ngcontent-rgj-c47=""
                          class="sorting"
                          tabindex="0"
                          aria-controls="users-table"
                          rowspan="1"
                          colspan="1"
                          aria-label="الفرع: activate to sort column ascending"
                          style={{ width: "36px" }}
                        >
                          الفرع
                        </th>
                        <th
                          _ngcontent-rgj-c47=""
                          class="sorting"
                          tabindex="0"
                          aria-controls="users-table"
                          rowspan="1"
                          colspan="1"
                          aria-label="النطاق المرجعي: activate to sort column ascending"
                          style={{ width: "62px" }}
                        >
                          النطاق المرجعي
                        </th>
                        <th
                          _ngcontent-rgj-c47=""
                          class="sorting"
                          tabindex="0"
                          aria-controls="users-table"
                          rowspan="1"
                          colspan="1"
                          aria-label="Ref. Doctor: activate to sort column ascending"
                          style={{ width: "47px" }}
                        >
                          Ref. Doctor
                        </th>
                   */}
                        <th
                          _ngcontent-rgj-c47=""
                          class="sorting"
                          tabindex="0"
                          aria-controls="users-table"
                          rowspan="1"
                          colspan="1"
                          aria-label="التقرير: activate to sort column ascending"
                          style={{ width: "46px" }}
                        >
                          التقرير
                        </th>
                        <th
                          _ngcontent-rgj-c47=""
                          class="sorting"
                          tabindex="0"
                          aria-controls="users-table"
                          rowspan="1"
                          colspan="1"
                          aria-label="التقارير الخارجية: activate to sort column ascending"
                          style={{ width: "57px" }}
                        >
                          التقارير الخارجية
                        </th>

                        <th
                          _ngcontent-rgj-c47=""
                          class="sorting"
                          tabindex="0"
                          aria-controls="users-table"
                          rowspan="1"
                          colspan="1"
                          aria-label="اضافة تقرير: activate to sort column ascending"
                          style={{ width: "44px" }}
                        >
                          اضافة تقرير
                        </th>
                        <th
                          _ngcontent-rgj-c47=""
                          class="sorting"
                          tabindex="0"
                          aria-controls="users-table"
                          rowspan="1"
                          colspan="1"
                          aria-label="استعلام: activate to sort column ascending"
                          style={{ width: "60px" }}
                        >
                          استعلام
                        </th>
                        <th
                          _ngcontent-rgj-c47=""
                          class="sorting"
                          tabindex="0"
                          aria-controls="users-table"
                          rowspan="1"
                          colspan="1"
                          aria-label="تعديل: activate to sort column ascending"
                          style={{ width: "43px" }}
                        >
                          تعديل
                        </th>
                        <th
                          _ngcontent-rgj-c47=""
                          class="sorting"
                          tabindex="0"
                          aria-controls="users-table"
                          rowspan="1"
                          colspan="1"
                          aria-label="حذف: activate to sort column ascending"
                          style={{ width: "35px" }}
                        >
                          حذف
                        </th>
                      </tr>
                    </thead>
                    <tbody _ngcontent-rgj-c47="">
                      {data.map((item, index) => {
                        return (
                          <tr _ngcontent-rgj-c47="" class="odd" key={item.id}>
                            <td>{index + 1}</td>

                            <td _ngcontent-rgj-c47="" class="sorting_1">
                              <input
                                _ngcontent-rgj-c47=""
                                type="checkbox"
                                id="delete-id"
                                value={item.id}
                                onChange={(e) => deletemulti(e.target.value)}
                                class="form-check-input"
                                name="69"
                              />
                            </td>
                            <td _ngcontent-rgj-c47="">{item.username_en}</td>
                            <td _ngcontent-rgj-c47="">{item.gender}</td>

                            <td _ngcontent-rgj-c47="">{item.customer_id}</td>
                            <td _ngcontent-rgj-c47="">{item.test}</td>
                            <td _ngcontent-rgj-c47="">{item.result}</td>
                            {/*<td _ngcontent-rgj-c47="">{item.collectDate}</td>
                            <td _ngcontent-rgj-c47="">{item.reportDate}</td>
                            <td _ngcontent-rgj-c47="">{item.branch}</td>
                            <td _ngcontent-rgj-c47="">{item.border}</td>
                            <td _ngcontent-rgj-c47="">{item.refDoctor}</td>
                        */}
                            <td _ngcontent-rgj-c47="">
                              <div
                                _ngcontent-rgj-c47=""
                                class="table-btn rounded-circle d-flex justify-content-center align-items-center shadow-sm bg-white"
                              >
                                <a href={`${item.customer_report}`} target="">
                                  <fa-icon
                                    _ngcontent-rgj-c47=""
                                    class="ng-fa-icon pdf-icon"
                                  >
                                    <svg
                                      role="img"
                                      aria-hidden="true"
                                      focusable="false"
                                      data-prefix="fas"
                                      data-icon="file-pdf"
                                      class="svg-inline--fa fa-file-pdf fa-w-12"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 384 512"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M181.9 256.1c-5-16-4.9-46.9-2-46.9 8.4 0 7.6 36.9 2 46.9zm-1.7 47.2c-7.7 20.2-17.3 43.3-28.4 62.7 18.3-7 39-17.2 62.9-21.9-12.7-9.6-24.9-23.4-34.5-40.8zM86.1 428.1c0 .8 13.2-5.4 34.9-40.2-6.7 6.3-29.1 24.5-34.9 40.2zM248 160h136v328c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V24C0 10.7 10.7 0 24 0h200v136c0 13.2 10.8 24 24 24zm-8 171.8c-20-12.2-33.3-29-42.7-53.8 4.5-18.5 11.6-46.6 6.2-64.2-4.7-29.4-42.4-26.5-47.8-6.8-5 18.3-.4 44.1 8.1 77-11.6 27.6-28.7 64.6-40.8 85.8-.1 0-.1.1-.2.1-27.1 13.9-73.6 44.5-54.5 68 5.6 6.9 16 10 21.5 10 17.9 0 35.7-18 61.1-61.8 25.8-8.5 54.1-19.1 79-23.2 21.7 11.8 47.1 19.5 64 19.5 29.2 0 31.2-32 19.7-43.4-13.9-13.6-54.3-9.7-73.6-7.2zM377 105L279 7c-4.5-4.5-10.6-7-17-7h-6v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-74.1 255.3c4.1-2.7-2.5-11.9-42.8-9 37.1 15.8 42.8 9 42.8 9z"
                                      ></path>
                                    </svg>
                                  </fa-icon>
                                </a>
                              </div>
                            </td>
                            <td _ngcontent-rgj-c47="">
                              <div
                                _ngcontent-rgj-c47=""
                                class="table-btn rounded-circle d-flex justify-content-center align-items-center shadow-sm bg-white"
                                tabindex="0"
                              >
                                <a
                                  href={`${
                                    item.externalReports[0]
                                      ?.customer_external_report
                                      ? item.externalReports[0]
                                          .customer_external_report
                                      : "#"
                                  }`}
                                  target="_blank"
                                >
                                  <fa-icon
                                    _ngcontent-rgj-c47=""
                                    class="ng-fa-icon pdf-icon"
                                  >
                                    <svg
                                      role="img"
                                      aria-hidden="true"
                                      focusable="false"
                                      data-prefix="fas"
                                      data-icon="file-alt"
                                      class="svg-inline--fa fa-file-alt fa-w-12"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 384 512"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"
                                      ></path>
                                    </svg>
                                  </fa-icon>
                                </a>
                              </div>
                            </td>

                            <td _ngcontent-rgj-c47="">
                              <div
                                _ngcontent-rgj-c47=""
                                class="table-btn rounded-circle d-flex justify-content-center align-items-center shadow-sm bg-white"
                                tabindex="0"
                              >
                                <Link
                                  to={`/dashboard/addexternal-report?customer_id=${item.id}`}
                                >
                                  <fa-icon
                                    _ngcontent-rgj-c47=""
                                    class="ng-fa-icon pdf-icon"
                                  >
                                    <svg
                                      role="img"
                                      aria-hidden="true"
                                      focusable="false"
                                      data-prefix="fas"
                                      data-icon="plus-circle"
                                      class="svg-inline--fa fa-plus-circle fa-w-16"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 512 512"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"
                                      ></path>
                                    </svg>
                                  </fa-icon>
                                </Link>
                              </div>
                            </td>
                            <td _ngcontent-rgj-c47="">
                              <Link
                                to={`/customer/result?customer_id=${item.customer_id}`}
                              >
                                <div
                                  _ngcontent-rgj-c47=""
                                  class="table-btn rounded-circle d-flex justify-content-center align-items-center shadow-sm bg-white"
                                >
                                  <fa-icon
                                    _ngcontent-rgj-c47=""
                                    class="ng-fa-icon inquiry-icon"
                                    tabindex="0"
                                  >
                                    <svg
                                      role="img"
                                      aria-hidden="true"
                                      focusable="false"
                                      data-prefix="fas"
                                      data-icon="question"
                                      class="svg-inline--fa fa-question fa-w-12"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 384 512"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M202.021 0C122.202 0 70.503 32.703 29.914 91.026c-7.363 10.58-5.093 25.086 5.178 32.874l43.138 32.709c10.373 7.865 25.132 6.026 33.253-4.148 25.049-31.381 43.63-49.449 82.757-49.449 30.764 0 68.816 19.799 68.816 49.631 0 22.552-18.617 34.134-48.993 51.164-35.423 19.86-82.299 44.576-82.299 106.405V320c0 13.255 10.745 24 24 24h72.471c13.255 0 24-10.745 24-24v-5.773c0-42.86 125.268-44.645 125.268-160.627C377.504 66.256 286.902 0 202.021 0zM192 373.459c-38.196 0-69.271 31.075-69.271 69.271 0 38.195 31.075 69.27 69.271 69.27s69.271-31.075 69.271-69.271-31.075-69.27-69.271-69.27z"
                                      ></path>
                                    </svg>
                                  </fa-icon>
                                </div>
                              </Link>
                            </td>
                            <td _ngcontent-rgj-c47="">
                              <div
                                onClick={() => PushHandler(item.customer_id)}
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
                            </td>

                            <td _ngcontent-rgj-c47="">
                              <div
                                onClick={() => deletecustomer(item.id)}
                                _ngcontent-rgj-c47=""
                                class="table-btn rounded-circle d-flex justify-content-center align-items-center shadow-sm bg-white"
                              >
                                <fa-icon
                                  _ngcontent-rgj-c47=""
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
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
          <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            message="تم حذف التحليل بنجاح"
          />
        </div>
      </div>
      <PaginatedItems oncustomClick={paginationClicked} pageCount={pageCount} />
      <Footer />
    </div>
  );
}

export default Dashboard;
