import React, { useState, useEffect } from "react";
import axios from "../../axios";
import Footer from "../../components/Footer";
import MainHeader from "../../components/MainHeader";
import TopHeader from "../../components/TopHeader";
import Sidebar from "../../components/sidebar";
import { useHistory } from "react-router-dom";
import Modal from "../../components/Modal";

function Reservations() {
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);
  const [read, setread] = useState(false);
  const [numbersOfNewReservations, setnumbersOfNewReservations] = useState(0);
  const [modalShow, setModalShow] = useState(false);

  const [deletevisit, setdeletevisit] = useState(false);
  const router = useHistory();
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
    console.log(numbersOfNewReservations, "numbersOfNewReservations");
  }, []);
  useEffect(async () => {
    try {
      const result = await axios.get("visit/allvisits");
      console.log(result.data, "result");
      setSuccess(result.status == 200 ? true : false);
      setErrors([]);
      setData(result.data);
    } catch (error) {
      setErrors(error.response.data.errors);
      console.log(error.response.data.errors);
    }
  }, [deletevisit]);
  const deleteVisit = async (e) => {
    try {
      const result = await axios.post(`visit/delete?id=${e}`);
      console.log(result, "result");
      setSuccess(result.status == 200 ? true : false);
      setModalShow(true);

      setdeletevisit(!deletevisit);
    } catch (error) {
      console.log(error.response.data.errors);
    }
  };
  return (
    <>
      <TopHeader />
      <MainHeader active="dashboard" />
      <div _ngcontent-rgj-c41="" class="d-flex minhight">
        <Sidebar
          active="reservations"
          setnumbersOfNewReservations={setnumbersOfNewReservations}
        />

        <div _ngcontent-vwu-c41="" class="dashboard-content bg-light">
          <section _ngcontent-vwu-c44="" class="px-4 py-5">
            <div _ngcontent-vwu-c44="" class="row justify-content-between">
              <div _ngcontent-vwu-c44="" class="heading">
                <h2 _ngcontent-vwu-c44="" class="fw-bold color-dark py-4">
                  الحجوزات المنزلية
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
                  <th _ngcontent-vwu-c44="">الاسم</th>
                  <th _ngcontent-vwu-c44="">الهاتف</th>
                  <th _ngcontent-vwu-c44="">العنوان</th>
                  <th _ngcontent-vwu-c44="">غرض الزيارة أو نوع التحليل</th>
                  <th _ngcontent-vwu-c44="">الروشتة</th>

                  <th _ngcontent-vwu-c44="">حذف</th>
                </tr>
              </thead>
              <tbody _ngcontent-vwu-c44="">
                {data.map((item, i) => {
                  let truthy = false;
                  if (i < numbersOfNewReservations) {
                    truthy = true;
                  }
                  return (
                    <tr
                      _ngcontent-vwu-c44=""
                      className={truthy ? "notification-active" : ""}
                    >
                      <td _ngcontent-vwu-c44="">{item.username}</td>
                      <td _ngcontent-vwu-c44="">{item.phone_Number}</td>
                      <td _ngcontent-vwu-c44="">{item.address}</td>
                      <td _ngcontent-vwu-c44="">{item.purpose}</td>
                      <td _ngcontent-rgj-c47="">
                        {item.file ? (
                          <div
                            _ngcontent-rgj-c47=""
                            class="table-btn rounded-circle d-flex justify-content-center align-items-center shadow-sm bg-white"
                            tabindex="0"
                          >
                            <a href={`${item.file ? item.file : "#"}`}>
                              <fa-icon
                                _ngcontent-rgj-c47=""
                                class="ng-fa-icon pdf-icon"
                                target="_blank"
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
                        ) : (
                          ""
                        )}
                      </td>

                      <td _ngcontent-vwu-c44="">
                        <div
                          _ngcontent-vwu-c44=""
                          onClick={() => deleteVisit(item.id)}
                          class="table-btn rounded-circle d-flex justify-content-center align-items-center shadow-sm bg-white"
                        >
                          <fa-icon
                            _ngcontent-vwu-c44=""
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
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          message="تم  حذف الحجز بنجاح"
        />
      </div>

      <Footer />
    </>
  );
}

export default Reservations;
