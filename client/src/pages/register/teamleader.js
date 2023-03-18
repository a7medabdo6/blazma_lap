import React, { useState, useEffect } from "react";
import TopHeader from "../../components/TopHeader";
import MainHeader from "../../components/MainHeader";
import Footer from "../../components/Footer";
import axios from "../../axios";
import Modal from "../../components/Modal";

import { useHistory } from "react-router-dom";
function Login() {
  const [name, setname] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const router = useHistory();
  useEffect(() => {
    var localStorageObj = localStorage.getItem("user");
    var parsed = JSON.parse(localStorageObj);
    console.log(parsed.role, "role");
    if (parsed?.role !== "superAdmin") {
      return router.push("/");
    }
  }, []);
  const Login = async (e) => {
    try {
      e.preventDefault();
      const data = {
        name,
        email,
        password,
        role: "leader",
      };
      const result = await axios.post("users", data, {
        withCredentials: true,
      });
      console.log(result);
      setSuccess(result.status == 200 ? true : false);
      setModalShow(true);
    } catch (error) {
      setErrors(error.response.data.errors);

      console.log(error.response.data.errors);
    }
  };
  return (
    <div>
      <TopHeader />
      <MainHeader />
      <section _ngcontent-euv-c34="" class="py-5 main-section">
        <form
          style={{ width: "50%" }}
          _ngcontent-euv-c34=""
          novalidate=""
          class="bg-white p-5 corner-30 shadow-sm form text-center mx-auto ng-untouched ng-pristine ng-invalid"
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
          <h2 _ngcontent-euv-c34="" class="text-center fw-bold pb-4 color-main">
            انشاء حساب ليدر
          </h2>
          <input
            _ngcontent-euv-c34=""
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
            placeholder=" اسم الليدر"
            class="form-control text-center border-main-2 my-3 p-3 corner-5 ng-untouched ng-pristine ng-invalid"
          />
          <input
            _ngcontent-euv-c34=""
            type="text"
            formcontrolname="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" الايميل"
            class="form-control text-center border-main-2 my-3 p-3 corner-5 ng-untouched ng-pristine ng-invalid"
          />
          <input
            _ngcontent-euv-c34=""
            type="password"
            formcontrolname="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="كلمة المرور"
            class="form-control text-center border-main-2 my-3 p-3 corner-5 ng-untouched ng-pristine ng-invalid"
          />
          <input
            _ngcontent-euv-c34=""
            type="submit"
            onClick={(e) => Login(e)}
            value="انشاء حساب ايدر"
            class="btn bg-main color-light font-20 mt-4 bg-main-hover"
            disabled=""
          />
        </form>
      </section>
      <Modal
        show={modalShow}
        onHide={() => {
          router.push("/dashboard/users");

          setModalShow(false);
        }}
        message="تم التسجيل بنجاح"
      />
      <Footer />
    </div>
  );
}

export default Login;
