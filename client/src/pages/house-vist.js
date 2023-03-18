import React, { useState } from "react";
import axios from "../axios";
import { Link, useHistory } from "react-router-dom";

import MainHeader from "../components/MainHeader";
import TopHeader from "../components/TopHeader";
import Modal from "../components/Modal";

function House() {
  const [username, setusername] = useState("");
  const [address, setaddress] = useState("");
  const [phone_Number, setphone] = useState(0);
  const [purpose, setpurpose] = useState("");
  const [file, setfile] = useState("");

  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const router = useHistory();

  const postVisit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("address", address);
    formData.append("phone_Number", phone_Number);
    formData.append("purpose", purpose);
    formData.append("file", file);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    //const data = { username, address, phone_Number, purpose };

    try {
      const result = await axios.post("visit/post", formData, config);
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
      <MainHeader active="house" />
      <section
        _ngcontent-heq-c36=""
        class="py-5 bg-grey d-flex align-items-center main-section"
      >
        <div
          _ngcontent-heq-c36=""
          class="container d-flex justify-content-center"
        >
          <form
            _ngcontent-heq-c36=""
            novalidate=""
            class="bg-light p-5 corner-30 shadow-sm w-50 text-center ng-untouched ng-pristine ng-invalid"
          >
            <h2
              _ngcontent-heq-c36=""
              class="text-center fw-bold pb-4 color-main"
            >
              حجز زيارة منزلية
            </h2>
            <div _ngcontent-heq-c36="" class="w-100 text-center py-4">
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
              <Link
                _ngcontent-heq-c36=""
                routerlink="/guides"
                class="color-light bg-main text-decoration-none corner-5 p-3"
                to="/guides"
              >
                شروط واحتياطات التحاليل
              </Link>
            </div>
            <input
              _ngcontent-heq-c36=""
              type="text"
              formcontrolname="name"
              onChange={(e) => setusername(e.target.value)}
              placeholder="الاسم"
              class="form-control text-center border-0 my-3 p-3 corner-5 ng-untouched ng-pristine ng-invalid"
            />
            <input
              _ngcontent-heq-c36=""
              type="text"
              formcontrolname="phone"
              onChange={(e) => setphone(e.target.value)}
              placeholder="رقم الهاتف"
              class="form-control text-center border-0 my-3 p-3 corner-5 ng-untouched ng-pristine ng-invalid"
            />
            <input
              _ngcontent-heq-c36=""
              type="text"
              formcontrolname="address"
              onChange={(e) => setaddress(e.target.value)}
              placeholder="العنوان"
              class="form-control text-center border-0 my-3 p-3 corner-5 ng-untouched ng-pristine ng-invalid"
            />
            <input
              _ngcontent-heq-c36=""
              type="text"
              formcontrolname="test"
              onChange={(e) => setpurpose(e.target.value)}
              placeholder="غرض الزيارة او نوع التحليل"
              class="form-control text-center border-0 my-3 p-3 corner-5 ng-untouched ng-pristine ng-invalid"
            />
            <h6 _ngcontent-heq-c36="" class="text-muted text-end py-3">
              روشتة ( اختياري ) - يسمح برفع صورة JPG او ملف PDF فقط
            </h6>
            <input
              _ngcontent-heq-c36=""
              type="file"
              id="formFile"
              class="form-control border-0"
              name="file"
              /* value={customer_image}*/
              onChange={(e) => {
                setfile(e.target.files[0]);
              }}
            />
            <input
              _ngcontent-heq-c36=""
              type="submit"
              value="حجز"
              onClick={(e) => postVisit(e)}
              class="btn bg-main color-light font-20 mt-4 bg-main-hover"
            />
          </form>
        </div>
        <Modal
          show={modalShow}
          onHide={() => {
            router.push("/");

            setModalShow(false);
          }}
          message="تم ارسال الحجز بنجاح"
        />
      </section>
      <footer _ngcontent-heq-c39="" class="text-center p-4 bg-main font-20">
        <p _ngcontent-heq-c39="" class="color-light">
          All Rights Reserved © Silver Lab Group 2021 Made With ❤ By Zid
          Solutions
        </p>
      </footer>
    </div>
  );
}

export default House;
