import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "../../axios";

import Footer from "../../components/Footer";
import MainHeader from "../../components/MainHeader";
import TopHeader from "../../components/TopHeader";
import Sidebar from "../../components/sidebar";
import Modal from "../../components/Modal";

function AddextReport() {
  const [customer_external_report, setcustomer_external_report] = useState("");
  const [nameofExternalReport, setnameofExternalReport] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
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
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();
  console.log(query.get("customer_id"), "xiddd");
  const customer_id_query = query.get("customer_id");

  const submit = async (e) => {
    const formData = new FormData();
    formData.append("customer_external_report", customer_external_report);
    formData.append("nameofExternalReport", nameofExternalReport);

    try {
      e.preventDefault();

      const result = await axios.post(
        `customer/addExternalReport?customer_id=${customer_id_query}`,
        formData,
        {
          withCredentials: true,
        }
      );
      console.log(result.data);
      setSuccess(result.status == 200 ? true : false);
      if (result.status == 200) {
        setModalShow(true);
      }
    } catch (error) {
      setErrors(error.response.data.errors);

      console.log(error.response.data.errors);
    }
  };
  return (
    <>
      <TopHeader />
      <MainHeader active="dashboard" />
      <div _ngcontent-rgj-c41="" class="d-flex minhight">
        <Sidebar active="" />
        <div _ngcontent-vwu-c41="" class="dashboard-content bg-light">
          <section _ngcontent-vwu-c43="" class="px-4 py-5">
            <div _ngcontent-vwu-c43="" class="row justify-content-between">
              <div _ngcontent-gal-c50="" class="container">
                <form
                  _ngcontent-gal-c50=""
                  novalidate=""
                  class="bg-white p-5 w-100 corner-30 shadow-sm col-md-6 text-center ng-untouched ng-pristine ng-invalid"
                >
                  <h2
                    _ngcontent-gal-c50=""
                    class="text-center fw-bold pb-4 color-main"
                  >
                    تخزين تقرير جديد
                  </h2>
                  <input
                    _ngcontent-gal-c50=""
                    type="text"
                    formcontrolname="title"
                    value={nameofExternalReport}
                    onChange={(e) => setnameofExternalReport(e.target.value)}
                    placeholder="اسم التقرير"
                    class={`form-control text-center border-main-2 my-3 p-3 corner-5 ng-valid ng-dirty ng-touched ${
                      errors?.find((x) => x.param === "nameofExternalReport")
                        ? "is-invalid"
                        : "valid"
                    }`}
                  />
                  <h5 _ngcontent-gal-c50="" class="text-muted text-end py-3">
                    تقرير العميل
                  </h5>
                  <input
                    _ngcontent-gal-c50=""
                    type="file"
                    name="customer_external_report"
                    // value={customer_external_report}
                    onChange={(e) =>
                      setcustomer_external_report(e.target.files[0])
                    }
                    id="formFile"
                    class={`form-control text-center border-main-2 my-3 p-3 corner-5 ng-valid ng-dirty ng-touched ${
                      errors?.find(
                        (x) => x.param === "customer_external_report"
                      )
                        ? "is-invalid"
                        : "valid"
                    }`}
                  />
                  <input
                    _ngcontent-gal-c50=""
                    type="submit"
                    value="تخزين"
                    onClick={submit}
                    class="btn bg-main color-light font-20 mt-4 bg-main-hover"
                  />
                </form>
              </div>
              <Modal
                show={modalShow}
                onHide={() => {
                  router.push("/dashboard");

                  setModalShow(false);
                }}
                message="تم اضافه التقرير بنجاح"
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default AddextReport;
