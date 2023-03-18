import React, { useState } from "react";

import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import TopHeader from "../components/TopHeader";
import axios from "../axios";
import { useHistory } from "react-router-dom";
import icon from "../assets/img/icon.png";

function Result() {
  const [customer_id, setcustomer_id] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const [TestResultstate, setTestResult] = useState(false);
  const [data, setdata] = useState([]);

  const [externalreports, setexternalreports] = useState([]);

  const router = useHistory();

  const TestResult = async (e) => {
    try {
      e.preventDefault();
      const data = {
        customer_id,
        password,
      };
      const result = await axios.post("customer/customer-results", data, {
        withCredentials: true,
      });
      console.log(result.data);
      setdata(result.data);
      setexternalreports(result.data[0].externalReports);
      setSuccess(result.status == 200 ? true : false);
      if (result.status == 200) {
        setTestResult(true);
      }
    } catch (error) {
      setErrors(error.response.data.errors);

      console.log(error.response.data.errors);
    }
  };
  const handlerender = () => {
    if (TestResultstate) {
      return (
        <div>
          {data.map((item) => {
            return (
              <>
                <div className="testreport">
                  <h3>{item.test}</h3>
                  <a href={item.customer_report}>
                    <img src={icon} />
                  </a>
                </div>
              </>
            );
          })}
          {externalreports.map((item) => {
            return (
              <>
                <div className="testreport">
                  <h3>{item.nameofExternalReport}</h3>
                  <a href={item.customer_external_report}>
                    <img src={icon} />
                  </a>
                </div>
              </>
            );
          })}
        </div>
      );
    } else {
      return (
        <form
          _ngcontent-oxm-c37=""
          novalidate=""
          class="bg-light p-5 corner-30 shadow-sm w-50 text-center ng-untouched ng-pristine ng-invalid"
        >
          {errors.length > 0 ? (
            <div class="alert alert-danger" role="alert">
              Invalid Credentials
            </div>
          ) : (
            ""
          )}
          <h2 _ngcontent-oxm-c37="" class="text-center fw-bold pb-4 color-main">
            نتيجة تحليل
          </h2>
          <input
            _ngcontent-oxm-c37=""
            type="text"
            value={customer_id}
            formcontrolname="patient_id"
            onChange={(e) => setcustomer_id(e.target.value)}
            placeholder="ID"
            class={`form-control text-center border-main-2 my-3 p-3 corner-5 ng-valid ng-dirty ng-touched ${
              errors?.find((x) => x.param === "customer_id")
                ? "is-invalid"
                : "valid"
            }`}
          />
          <input
            _ngcontent-oxm-c37=""
            type="text"
            formcontrolname="user_password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            class={`form-control text-center border-main-2 my-3 p-3 corner-5 ng-valid ng-dirty ng-touched ${
              errors?.find((x) => x.param === "password")
                ? "is-invalid"
                : "valid"
            }`}
          />
          <input
            _ngcontent-oxm-c37=""
            type="submit"
            value="استعلام"
            onClick={TestResult}
            class="btn bg-main color-light font-20 mt-4 bg-main-hover"
            disabled=""
          />
        </form>
      );
    }
  };
  return (
    <div>
      <TopHeader />
      <MainHeader active="result" />
      <section
        _ngcontent-oxm-c37=""
        class="py-5 bg-grey d-flex align-items-center"
      >
        <div
          _ngcontent-oxm-c37=""
          class="container d-flex justify-content-center"
        >
          {handlerender()}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Result;
