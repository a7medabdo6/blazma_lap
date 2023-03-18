import React, { useState } from "react";
import TopHeader from "../components/TopHeader";
import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";
import axios from "../axios";
import { useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const router = useHistory();
  const Login = async (e) => {
    try {
      e.preventDefault();
      const data = {
        email,
        password,
      };
      const result = await axios.post("login", data, {
        withCredentials: true,
      });
      console.log(result.data.user[0]);
      setSuccess(result.status == 200 ? true : false);
      if (result.status == 200) {
        localStorage.setItem("user", JSON.stringify(result.data.user[0]));
        const d = new Date();
        let time = d.getTime();
        localStorage.setItem("time", JSON.stringify(time));

        router.push("/dashboard");
      }
    } catch (error) {
      setErrors(error.response.data.errors);

      console.log(error.response.data.errors);
    }
    /* try {
      e.preventDefault();
      const data = {
        email: "cdsFasdfvdcasdFsa@gmail.com",
        password: "sdFdSFdsafasdrf",
        name: "ahedm",
      };
      const result = await axios.post("customer/post", data, {
        withCredentials: true,
      });
      console.log(result);
      setSuccess(result.status == 200 ? true : false);
    } catch (error) {
      // setErrors(error.response);

      console.log(error.response.data.errors);
    }*/
  };
  return (
    <div>
      <TopHeader />
      <MainHeader />
      <section
        _ngcontent-euv-c34=""
        class="py-5 main-section"
        style={{ height: "90vh" }}
      >
        <form
          _ngcontent-euv-c34=""
          novalidate=""
          class="bg-white p-5 corner-30 login shadow-sm form text-center mx-auto ng-untouched ng-pristine ng-invalid"
        >
          {errors.map((error) => {
            return (
              <div class="alert alert-danger" role="alert">
                {error.msg}
              </div>
            );
          })}
          <h2 _ngcontent-euv-c34="" class="text-center fw-bold pb-4 color-main">
            تسجيل الدخول
          </h2>
          <input
            _ngcontent-euv-c34=""
            type="text"
            formcontrolname="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="اسم المستخدم"
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
            value="تسجيل دخول"
            class="btn bg-main color-light font-20 mt-4 bg-main-hover"
            disabled=""
          />
        </form>
      </section>
      <Footer />
    </div>
  );
}

export default Login;
