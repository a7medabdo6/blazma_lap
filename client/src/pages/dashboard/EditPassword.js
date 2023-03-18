import React, { useState, useEffect } from "react";
import TopHeader from "../../components/TopHeader";
import MainHeader from "../../components/MainHeader";
import Footer from "../../components/Footer";
import Sidebar from "../../components/sidebar";

import axios from "../../axios";
import Modal from "../../components/Modal";

import { useHistory, useLocation } from "react-router-dom";
function EditPassword() {
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
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
  let query = useQuery();
  console.log(query.get("id"), "xiddd");
  const id = query.get("id");

  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const EditHandler = async (e) => {
    try {
      e.preventDefault();
      const data = {
        password,
        id,
      };
      const result = await axios.post("users/edit-password", data, {
        withCredentials: true,
      });
      setSuccess(result.status == 200 ? true : false);
      setModalShow(true);
    } catch (error) {
      setErrors(error.response.data.errors);

      console.log(error.response.data, "error");
    }
  };
  return (
    <div>
      <TopHeader />
      <MainHeader />
      <div _ngcontent-rgj-c41="" class="d-flex minhight">
        <Sidebar active="users" />
        <section
          _ngcontent-edh-c48=""
          style={{ width: "85%" }}
          class="px-4 py-5"
        >
          <form
            style={{ width: "50%" }}
            _ngcontent-euv-c34=""
            novalidate=""
            class="bg-white p-5 corner-30 shadow-sm form text-center mx-auto ng-untouched ng-pristine ng-invalid"
          >
            {errors.map((error) => {
              return (
                <div class="alert alert-danger" role="alert">
                  {error}
                </div>
              );
            })}
            <h2
              _ngcontent-euv-c34=""
              class="text-center fw-bold pb-4 color-main"
            >
              تعديد كلمه المرور
            </h2>

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
              onClick={EditHandler}
              value="حفظ "
              class="btn bg-main color-light font-20 mt-4 bg-main-hover"
              disabled=""
            />
          </form>
          <Modal
            show={modalShow}
            onHide={() => {
              router.push("/dashboard");

              setModalShow(false);
            }}
            message="تم التعديل بنجاح  "
          />
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default EditPassword;
