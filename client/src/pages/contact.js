import React, { useState } from "react";
import axios from "../axios";
import { Link, useHistory } from "react-router-dom";

import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import Modal from "../components/Modal";
import TopHeader from "../components/TopHeader";

function Contact() {
  const [username, setusername] = useState("");
  const [message, setmessage] = useState("");
  const [phone_Number, setphone] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const router = useHistory();

  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const psotContactus = async (e) => {
    e.preventDefault();
    const data = { username, message, phone_Number };

    try {
      const result = await axios.post("contact/post", data);
      console.log(result, "result");
      setSuccess(result.status == 200 ? true : false);
      setErrors([]);
      setModalShow(true);
    } catch (error) {
      setErrors(error.response.data.errors);
      console.log(error.response.data.errors);
    }
  };
  return (
    <div>
      <TopHeader />
      <MainHeader active="contact" />
      <section
        _ngcontent-euv-c30=""
        class="py-5 bg-grey d-flex align-items-center main-section"
      >
        <div
          _ngcontent-euv-c30=""
          class="container d-flex flex-column align-items-center"
        >
          <form
            _ngcontent-euv-c30=""
            novalidate=""
            class="bg-light p-5 corner-30 shadow-sm w-50 text-center ng-untouched ng-pristine ng-invalid"
          >
            {success && errors.length == 0 ? (
              <div class="alert alert-success" role="alert">
                success{" "}
              </div>
            ) : (
              ""
            )}
            {errors.map((error) => {
              return (
                <div class="alert alert-danger" role="alert">
                  {error.msg}
                </div>
              );
            })}
            <h2
              _ngcontent-euv-c30=""
              class="text-center fw-bold pb-4 color-main"
            >
              نحن نتطلع للتواصل معكم دائماً
            </h2>
            <input
              _ngcontent-euv-c30=""
              type="text"
              formcontrolname="name"
              placeholder="الاسم"
              onChange={(e) => setusername(e.target.value)}
              class="form-control text-center border-0 my-3 p-3 corner-5 ng-untouched ng-pristine ng-invalid"
            />
            <input
              _ngcontent-euv-c30=""
              type="text"
              formcontrolname="phone"
              onChange={(e) => setphone(e.target.value)}
              placeholder="رقم الهاتف"
              class="form-control text-center border-0 my-3 p-3 corner-5 ng-untouched ng-pristine ng-invalid"
            />
            <textarea
              _ngcontent-euv-c30=""
              type="text"
              formcontrolname="message"
              onChange={(e) => setmessage(e.target.value)}
              value={message}
              placeholder="رسالتك او استشارتك الطبية"
              class="form-control text-center border-0 my-3 p-3 corner-5 ng-untouched ng-pristine ng-invalid"
            ></textarea>
            <input
              _ngcontent-euv-c30=""
              type="submit"
              onClick={(e) => psotContactus(e)}
              value="ارسال"
              class="btn bg-main color-light font-20 mt-4 bg-main-hover"
            />
          </form>
          <div _ngcontent-euv-c30="" class="contact py-4">
            <div _ngcontent-euv-c30="" class="row justify-content-center">
              <a
                _ngcontent-euv-c30=""
                href="https://wa.me/+201094045006"
                target="_blank"
                class="contact-icon my-3 whatsapp-icon d-flex justify-content-center align-items-center rounded-circle bg-white shadow-sm font-24 mx-4"
              >
                <svg
                  _ngcontent-euv-c30=""
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="whatsapp"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  class="svg-inline--fa fa-whatsapp fa-w-14"
                >
                  <path
                    _ngcontent-euv-c30=""
                    fill="currentColor"
                    d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <Modal
          show={modalShow}
          onHide={() => {
            router.push("/");

            setModalShow(false);
          }}
          message="تم ارسال رسالتك بنجاح"
        />
      </section>
      <Footer />
    </div>
  );
}

export default Contact;
