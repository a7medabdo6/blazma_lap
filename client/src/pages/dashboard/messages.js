import React, { useState, useEffect } from "react";
import axios from "../../axios";
import Footer from "../../components/Footer";
import { useHistory } from "react-router-dom";
import Modal from "../../components/Modal";

import MainHeader from "../../components/MainHeader";
import Sidebar from "../../components/sidebar";
import TopHeader from "../../components/TopHeader";

function Messages() {
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);
  const [deletemessage, setdeletemessage] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [numbersOfNewMessages, setnumbersOfNewMessages] = useState(0);

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
  }, []);
  useEffect(async () => {
    try {
      const result = await axios.get("contact/allcontacts");
      console.log(result.data, "result");
      setSuccess(result.status == 200 ? true : false);
      setErrors([]);
      setData(result.data);
    } catch (error) {
      setErrors(error.response.data.errors);
      console.log(error.response.data.errors);
    }
  }, [deletemessage]);
  const deletecustomer = async (e) => {
    try {
      const result = await axios.post(`contact/delete?id=${e}`);
      console.log(result, "result");
      setSuccess(result.status == 200 ? true : false);
      setModalShow(true);

      setdeletemessage(!deletemessage);
    } catch (error) {
      console.log(error.response.data.errors);
    }
  };
  return (
    <div>
      <TopHeader />
      <MainHeader active="dashboard" />
      <div _ngcontent-rgj-c41="" class="d-flex minhight">
        <Sidebar
          active="messages"
          setnumbersOfNewReservations={setnumbersOfNewMessages}
        />
        <div _ngcontent-vwu-c41="" class="dashboard-content bg-light">
          <section _ngcontent-vwu-c43="" class="px-4 py-5">
            <div _ngcontent-vwu-c43="" class="row justify-content-between">
              <div _ngcontent-vwu-c43="" class="heading">
                <h2 _ngcontent-vwu-c43="" class="fw-bold color-dark py-4">
                  الرسائل
                </h2>
              </div>
            </div>
            <table
              _ngcontent-vwu-c43=""
              datatable=""
              id="users-table"
              class="table table-hover"
            >
              <thead _ngcontent-vwu-c43="">
                <tr _ngcontent-vwu-c43="">
                  <th _ngcontent-vwu-c43="">الاسم</th>
                  <th _ngcontent-vwu-c43="">الهاتف</th>
                  <th _ngcontent-vwu-c43="">الرسالة</th>
                  <th _ngcontent-vwu-c43="">حذف</th>
                </tr>
              </thead>
              <tbody _ngcontent-vwu-c43="">
                {data.map((item, i) => {
                  let truthy = false;
                  if (i < numbersOfNewMessages) {
                    truthy = true;
                  }
                  return (
                    <tr
                      _ngcontent-vwu-c43=""
                      className={truthy ? "notification-active" : ""}
                    >
                      <td _ngcontent-vwu-c43="">{item.username}</td>
                      <td _ngcontent-vwu-c43="">{item.phone_Number}</td>
                      <td _ngcontent-vwu-c43="">{item.message}</td>
                      <td _ngcontent-vwu-c43="">
                        <div
                          onClick={() => deletecustomer(item.id)}
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
              </tbody>
            </table>
            <Modal
              show={modalShow}
              onHide={() => setModalShow(false)}
              message="تم  حذف الرسال بنجاح"
            />
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Messages;
