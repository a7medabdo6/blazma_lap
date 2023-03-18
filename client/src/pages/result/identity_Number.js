import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import Background from "../../assets/img/medical-background.jpg";

import Footer from "../../components/Footer";
import MainHeader from "../../components/MainHeader";
import TopHeader from "../../components/TopHeader";
import axios from "../../axios";
import { useHistory, useLocation } from "react-router-dom";
function Result() {
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);

  const router = useHistory();
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();
  console.log(query.get("customer_id"), "xiddd");
  const customer_id_query = query.get("customer_id");

  useEffect(async () => {
    console.log(router, "iddd");
    if (!customer_id_query) {
      return router.push("/");
    }
    try {
      const result = await axios.get(
        `customer/result?customer_id=${customer_id_query}`
      );
      console.log(result, "result");
      setSuccess(result.status == 200 ? true : false);
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  }, [customer_id_query]);

  return (
    <div>
      <TopHeader />
      <MainHeader />

      <section
        style={{
          backgroundImage: `url(${Background}) `,
          backgroundSize: "cover",
        }}
        _ngcontent-twx-c32=""
        class="main-section py-5"
      >
        <div _ngcontent-twx-c32="" class="container text-center">
          <img _ngcontent-twx-c32="" src={logo} class="logo" />
          <h4 _ngcontent-twx-c32="" class="fw-bold" style={{ color: "black" }}>
            Patient Name
          </h4>
          <h1
            _ngcontent-twx-c32=""
            class="text-capitalize pb-4"
            style={{ fontSize: "30px" }}
          >
            {data[0]?.username_en}
          </h1>
          <h2 _ngcontent-twx-c32="" class="color-main fw-bold py-4">
            {data[0]?.test} Test Result
          </h2>

          <div
            _ngcontent-twx-c32=""
            class="negative-btn w-50 mx-auto font-20 py-2 corner-5 btn is-valid btn-outline-success my-4"
          >
            {data[0]?.result}
          </div>
          <br _ngcontent-twx-c32="" />

          <div _ngcontent-twx-c32="" class="panel corner-5 bg-white shadow-sm">
            <h4
              _ngcontent-twx-c32=""
              class="py-3 fw-bold bg-main text-white corner-5"
            >
              Patient info
            </h4>
            <div _ngcontent-twx-c32="" dir="ltr" class="panel-content p-4">
              <div _ngcontent-twx-c32="" class="row">
                <div _ngcontent-twx-c32="" class="col-md-6 p-2">
                  <h5 _ngcontent-twx-c32="" class="fw-bold color-main">
                    Gender
                  </h5>
                  <input
                    _ngcontent-twx-c32=""
                    type="text"
                    id="disabledTextInput"
                    disabled=""
                    value={data[0]?.gender}
                    class="form-control"
                  />
                </div>
                <div _ngcontent-twx-c32="" class="col-md-6 p-2">
                  <h5 _ngcontent-twx-c32="" class="fw-bold color-main">
                    Date of Birth
                  </h5>
                  <input
                    _ngcontent-twx-c32=""
                    type="text"
                    id="disabledTextInput"
                    disabled=""
                    value={data[0]?.birth}
                    class="form-control"
                  />
                </div>
                <div _ngcontent-twx-c32="" class="col-md-6 p-2">
                  <h5 _ngcontent-twx-c32="" class="fw-bold color-main">
                    Passport No
                  </h5>
                  <input
                    _ngcontent-twx-c32=""
                    type="text"
                    id="disabledTextInput"
                    disabled=""
                    value={data[0]?.passport_Number}
                    class="form-control"
                  />
                </div>
                <div _ngcontent-twx-c32="" class="col-md-6 p-2">
                  <h5 _ngcontent-twx-c32="" class="fw-bold color-main">
                    National ID
                  </h5>
                  <input
                    _ngcontent-twx-c32=""
                    type="text"
                    id="disabledTextInput"
                    disabled=""
                    value={data[0]?.identity_Number}
                    class="form-control"
                  />
                </div>
                <div _ngcontent-twx-c32="" class="col-md-6 p-2">
                  <h5 _ngcontent-twx-c32="" class="fw-bold color-main">
                    File No
                  </h5>
                  <input
                    _ngcontent-twx-c32=""
                    type="text"
                    id="disabledTextInput"
                    disabled=""
                    value={data[0]?.id + 4564}
                    class="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            _ngcontent-twx-c32=""
            class="panel corner-5 bg-white shadow-sm my-5"
          >
            <h4
              _ngcontent-twx-c32=""
              class="py-3 fw-bold bg-main text-white corner-5"
            >
              Test info
            </h4>
            <div _ngcontent-twx-c32="" dir="ltr" class="panel-content p-4">
              <div _ngcontent-twx-c32="" class="row">
                <div _ngcontent-twx-c32="" class="col-md-6 p-2">
                  <h5 _ngcontent-twx-c32="" class="fw-bold color-main">
                    Test
                  </h5>
                  <input
                    _ngcontent-twx-c32=""
                    type="text"
                    id="disabledTextInput"
                    disabled=""
                    value={data[0]?.test}
                    class="form-control"
                  />
                </div>
                <div _ngcontent-twx-c32="" class="col-md-6 p-2">
                  <h5 _ngcontent-twx-c32="" class="fw-bold color-main">
                    Reference Range
                  </h5>
                  <input
                    _ngcontent-twx-c32=""
                    type="text"
                    id="disabledTextInput"
                    disabled=""
                    value="Negative"
                    class="form-control"
                  />
                </div>
                <div _ngcontent-twx-c32="" class="col-md-6 p-2">
                  <h5 _ngcontent-twx-c32="" class="fw-bold color-main">
                    Collection Date
                  </h5>
                  <input
                    _ngcontent-twx-c32=""
                    type="text"
                    id="disabledTextInput"
                    disabled=""
                    value={data[0]?.collectDate}
                    class="form-control"
                  />
                </div>
                <div _ngcontent-twx-c32="" class="col-md-6 p-2">
                  <h5 _ngcontent-twx-c32="" class="fw-bold color-main">
                    Reporting Date
                  </h5>
                  <input
                    _ngcontent-twx-c32=""
                    type="text"
                    id="disabledTextInput"
                    disabled=""
                    value={data[0]?.reportDate}
                    class="form-control"
                  />
                </div>
              </div>
              <a href={data[0]?.customer_report} target="">
                <button
                  _ngcontent-twx-c32=""
                  type="submit"
                  style={{ display: "none" }}
                  class="btn bg-main color-light font-20 mt-4 bg-main-hover"
                >
                  تحميل التقرير
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Result;
