import React, { useState, useEffect } from "react";
import axios from "../../axios";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import DatePicker from "react-datepicker";
import TopHeader from "../../components/TopHeader";
import MainHeader from "../../components/MainHeader";
import Footer from "../../components/Footer";
import Sidebar from "../../components/sidebar";
import imgsrc from "../../assets/img/cover.jpg";
import imgticket from "../../assets/img/ticket.png";
import barcode from "../../assets/img/barcode.png";

import usersrc from "../../assets/img/user.jpg";

import Form from "../../components/Form";
import Modal from "../../components/Modal";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory, useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";

const ref = React.createRef();

function EditCustomer({ uncompleted }) {
  const [value, onChange] = useState(null);
  const [valueOfReportDate, setonChangeReportDate] = useState(null);
  const [password, setpassword] = useState("");
  const [years, setyears] = useState("");

  const [username_ar, setusername_ar] = useState("");
  const [username_en, setusername_en] = useState("");
  const [birth, setbirth] = useState("");
  const [phone, setphone] = useState("");

  const [gender, setgender] = useState("male");
  const [passport_Number, setpassport_Number] = useState("");
  const [identity_Number, setidentity_Number] = useState("");
  const [nation, setnation] = useState("");
  const [location, setlocation] = useState("faker");
  const [customer_id, setcustomer_id] = useState("");
  const [test, settest] = useState("Covid -19 By PCR");
  const [result, setresult] = useState("Negative");
  const [modalShow, setModalShow] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [collectDate, setcollectDate] = useState("");
  const [reportDate, setreportDate] = useState(null);
  const [unit, setunit] = useState("N/A");
  const [branch, setbranch] = useState("Itay Elbaroud");
  const [border, setborder] = useState("Negative");
  const [refDoctor, setrefDoctor] = useState("");

  const [RefOrg, setRefOrg] = useState("");

  const [customer_report, setcustomer_report] = useState(null);
  const [customer_image, setcustomer_image] = useState("faker");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const [Ticket, setTicket] = useState(true);
  const [background, setbackground] = useState(true);
  const [DisplayComment, setDisplayComment] = useState(true);
  const [qrsrc, setqrsrc] = useState(
    `https://plasmalabs-eg.com/#/customer/result?customer_id=${customer_id}`
  );
  const [useriamgefromapi, setuseriamgefromapi] = useState(null);

  const [data, setData] = useState([]);
  const router = useHistory();

  useEffect(() => {
    var localStorageObj = localStorage.getItem("user");
    var parsed = JSON.parse(localStorageObj);
    if (
      parsed?.role !== "superAdmin" &&
      parsed?.role !== "leader" &&
      parsed?.role !== "employer"
    ) {
      // return router.push("/login");
    }
  }, []);
  const onChangeCollectDate = (date) => {
    onChange(date);
    console.log(JSON.stringify(date), "dateee");
    var h = new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    var d = new Date(date).toLocaleDateString("en-GB");
    console.log(`${d} ${h}`);
    setcollectDate(`${d} ${h}`);
  };
  const onChangeReportDate = (date) => {
    setonChangeReportDate(date);
    console.log(JSON.stringify(date), "dateee");
    var h = new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    var d = new Date(date).toLocaleDateString("en-GB");
    console.log(`${d} ${h}`);
    setreportDate(`${d} ${h}`);
  };
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();
  console.log(query.get("customer_id"), "xiddd");
  const Query = query.get("customer_id");
  console.log(Query, "Query");

  useEffect(async () => {
    try {
      const customer = await axios.get(`customer/result?customer_id=${Query}`);
      console.log(customer.data[0], "customer");
      // setSuccess(customer.status == 200 ? true : false);
      setData(customer.data[0]);
      setusername_ar(customer.data[0].username_ar);
      setusername_en(customer.data[0].username_en);
      setbirth(customer.data[0].birth);
      setphone(customer.data[0].phone);
      setgender(customer.data[0].gender);
      setborder(customer.data[0].border);
      setbranch(customer.data[0].branch);
      setcollectDate(customer.data[0].collectDate);
      setreportDate(customer.data[0].reportDate);
      setidentity_Number(customer.data[0].identity_Number);
      setlocation(customer.data[0].location);
      setunit(customer.data[0].unit);
      settest(customer.data[0].test);
      setresult(customer.data[0].result);
      setpassport_Number(customer.data[0].passport_Number);
      setnation(customer.data[0].nation);
      setrefDoctor(customer.data[0].refDoctor);
      setcustomer_id(customer.data[0].customer_id);
      setpassword(customer.data[0].password);
      setRefOrg(customer.data[0].RefOrg);
      setyears(customer.data[0].years);
      setuseriamgefromapi(customer.data[0].customer_image);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const psotCustomer = async (e) => {
    console.log("psotCustomer");
    e.preventDefault();
    const formData = new FormData();
    formData.append("customer_image", customer_image);
    formData.append("customer_report", customer_report);
    formData.append("username_ar", username_ar);
    formData.append("username_en", username_en);
    formData.append("birth", birth);
    formData.append("gender", gender);
    formData.append("password", password);
    formData.append("years", years);
    formData.append("phone", phone);

    formData.append("passport_Number", passport_Number);
    formData.append("identity_Number", identity_Number);
    formData.append("nation", nation);
    formData.append("location", location);
    formData.append("customer_id", customer_id);
    formData.append("test", test);
    formData.append("result", result);
    formData.append("collectDate", collectDate);
    formData.append("reportDate", reportDate);
    formData.append("unit", unit);
    formData.append("branch", branch);
    formData.append("border", border);
    formData.append("refDoctor", refDoctor);
    formData.append("RefOrg", RefOrg);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    try {
      const result = await axios.post(
        `customer/findoneandUpdate?customer_id=${Query}`,
        formData,
        { withCredentials: true },
        config
      );
      console.log(result, "result");
      setSuccess(result.status == 200 ? true : false);
      setErrors([]);
      setModalShow(true);
    } catch (error) {
      setErrors(error.response.data.errors);
      console.log(error.response.data, "eoor");
    }
  };

  useEffect(() => {
    setqrsrc(
      `https://plasmalabs-eg.com/#/customer/result?customer_id=${customer_id}`
    );
  }, [customer_id]);
  const generate = () => {
    const options = {
      scale: 1,
      allowTaint: false,
      logging: true,
      useCORS: true,
    };
    html2canvas(document.querySelector("#cpdf"), options).then((canvas) => {
      // document.body.appendChild(canvas);
      const pdf = new jsPDF("p", "pt", "a4", true);
      console.log(canvas.width, "canvas.width ");
      var imgWidth = pdf.internal.pageSize.getWidth();
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("image/jpg");
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight, "", "FAST");
      pdf.save(`${username_en}.pdf`);
    });
  };
  const DisplayTicket = () => {
    setTicket(!Ticket);
  };
  const DisplayBack = () => {
    setbackground(!background);
  };
  const Displaycomment = () => {
    setDisplayComment(false);
  };
  const ShowComment = () => {
    setDisplayComment(true);
  };

  /*
 
  */
  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUserImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const typeOfComment = () => {
    return (
      <div
        _ngcontent-edh-c48=""
        id="comment"
        style={{
          display: DisplayComment ? "" : "none",
        }}
        class="row"
      >
        <div _ngcontent-edh-c48="" class="col-2">
          <h4
            _ngcontent-edh-c48=""
            class="fw-bold"
            style={{ color: "black", textDecoration: "underline" }}
          >
            Comment:{" "}
          </h4>
        </div>
        <div _ngcontent-edh-c48="" class="col-12" style={{ marginLeft: "0px" }}>
          <h5 _ngcontent-edh-c48="">
            <div _ngcontent-dnd-c42="" class="w-75 mx-auto">
              <h4 _ngcontent-dnd-c42="" className="comment-font">
                Type of Sample:Upper respiratory specimens Nasopharyngeal /
                Oropharyngeal swab
              </h4>
              <br _ngcontent-dnd-c42="" />
              <h4 _ngcontent-dnd-c42="" className="comment-font">
                Sample was collected according to WHO guidelines and infection
                control standards Results might be dependent on the level of
                virus excretion and the quality of the sample tested.
              </h4>
              <h4 className="comment-font">
                Please correlate this result clinically and epidemiologically
                for further management decisions.
              </h4>
              <div _ngcontent-dnd-c42="" class="w-50 dashed py-4"></div>
            </div>
          </h5>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="">
        <TopHeader />
        <MainHeader active="dashboard" />
        <div _ngcontent-rgj-c41="" class="d-flex minhight">
          <Sidebar active="customers" />
          <section
            _ngcontent-edh-c48=""
            style={{ width: "85%" }}
            class="px-4 py-5"
          >
            <div _ngcontent-edh-c48="" class="w-100">
              <div _ngcontent-edh-c48="" class="row justify-content-center">
                <form
                  _ngcontent-edh-c48=""
                  novalidate=""
                  class="bg-white p-5 corner-30 shadow-sm col-md-6 text-center ng-invalid ng-dirty ng-touched"
                >
                  {success && errors.length == 0 ? (
                    <div class="alert alert-success" role="alert">
                      success{" "}
                    </div>
                  ) : (
                    ""
                  )}
                  {errors && errors.length == 1 ? (
                    <div class="alert alert-danger" role="alert">
                      {errors[0].msg}{" "}
                    </div>
                  ) : (
                    ""
                  )}
                  <h2
                    _ngcontent-edh-c48=""
                    class="text-center fw-bold pb-4 color-main"
                  >
                    اضافة عميل جديد
                  </h2>
                  <input
                    _ngcontent-edh-c48=""
                    type="text"
                    formcontrolname="name"
                    value={username_ar}
                    onChange={(e) => setusername_ar(e.target.value)}
                    placeholder="اسم العميل"
                    class={`form-control text-center border-main-2 my-3 p-3 corner-5 ng-valid ng-dirty ng-touched ${
                      errors?.find((x) => x.param === "username_ar")
                        ? "is-invalid"
                        : "valid"
                    }`}
                  />
                  <input
                    _ngcontent-edh-c48=""
                    type="text"
                    formcontrolname="name_en"
                    value={username_en}
                    onChange={(e) => setusername_en(e.target.value)}
                    placeholder="اسم العميل انجليزي"
                    class={`form-control text-center border-main-2 my-3 p-3 corner-5 ng-valid ng-dirty ng-touched ${
                      errors?.find((x) => x.param === "username_en")
                        ? "is-invalid"
                        : "valid"
                    }`}
                  />

                  <h6 _ngcontent-edh-c48="" class="text-center">
                    النوع
                  </h6>
                  <select
                    value={gender}
                    _ngcontent-edh-c48=""
                    onChange={(e) => setgender(e.target.value)}
                    formcontrolname="gender"
                    class={`form-control text-center border-main-2 my-3 p-3 corner-5 ng-valid ng-dirty ng-touched ${
                      errors?.find((x) => x.param === "gender")
                        ? "is-invalid"
                        : "valid"
                    }`}
                  >
                    <option value="male" _ngcontent-edh-c48="" value="male">
                      ذكر
                    </option>
                    <option value="female" _ngcontent-edh-c48="" value="female">
                      انثى
                    </option>
                  </select>

                  <input
                    _ngcontent-edh-c48=""
                    type="date"
                    onfocus="(this.type='date')"
                    placeholder="تاريخ الميلاد"
                    formcontrolname="date_of_birth"
                    value={birth}
                    onChange={(e) => setbirth(e.target.value)}
                    class={`form-control text-center border-main-2 my-3 p-3 corner-5 ng-valid ng-dirty ng-touched ${
                      errors?.find((x) => x.param === "birth")
                        ? "is-invalid"
                        : "valid"
                    }`}
                  />
                  <input
                    _ngcontent-edh-c48=""
                    onfocus="(this.type='date')"
                    placeholder=" العمر"
                    formcontrolname=""
                    value={years}
                    required
                    onChange={(e) => setyears(e.target.value)}
                    class={`form-control text-center border-main-2 my-3 p-3 corner-5 ng-valid ng-dirty ng-touched ${
                      errors?.find((x) => x.param === "birth")
                        ? "is-invalid"
                        : "valid"
                    }`}
                  />
                  <input
                    _ngcontent-edh-c48=""
                    type="text"
                    formcontrolname="name"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                    placeholder="رقم الموبايل "
                    class={`form-control text-center border-main-2 my-3 p-3 corner-5 ng-valid ng-dirty ng-touched ${
                      errors?.find((x) => x.param === "phone")
                        ? "is-invalid"
                        : "valid"
                    }`}
                  />
                  <input
                    _ngcontent-edh-c48=""
                    type="text"
                    formcontrolname="identity"
                    placeholder="رقم الباسبور"
                    value={passport_Number}
                    onChange={(e) => setpassport_Number(e.target.value)}
                    class={`form-control text-center border-main-2 my-3 p-3 corner-5 ng-valid ng-dirty ng-touched ${
                      errors?.find((x) => x.param === "passport_Number")
                        ? "is-invalid"
                        : "valid"
                    }`}
                  />
                  <input
                    _ngcontent-edh-c48=""
                    type="text"
                    formcontrolname="national_id"
                    placeholder="الرقم القومي"
                    value={identity_Number}
                    onChange={(e) => setidentity_Number(e.target.value)}
                    class={`form-control text-center border-main-2 my-3 p-3 corner-5 ng-valid ng-dirty ng-touched ${
                      errors?.find((x) => x.param === "identity_Number")
                        ? "is-invalid"
                        : "valid"
                    }`}
                  />

                  {/*
                  <input
                    _ngcontent-edh-c48=""
                    type="text"
                    formcontrolname="location"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setlocation(e.target.value)}
                    class={`form-control text-center border-main-2 my-3 p-3 corner-5 ng-valid ng-dirty ng-touched ${
                      errors?.find((x) => x.param === "location")
                        ? "is-invalid"
                        : "valid"
                    }`}
                  />
                  */}
                  {/*  <input
                    _ngcontent-edh-c48=""
                    type="text"
                    formcontrolname="nationality"
                    placeholder="الجنسية"
                    value={nation}
                    onChange={(e) => setnation(e.target.value)}
                    class={`form-control text-center border-main-2 my-3 p-3 corner-5 ng-valid ng-dirty ng-touched ${
                      errors?.find((x) => x.param === "nation")
                        ? "is-invalid"
                        : "valid"
                    }`}
                  />
                  */}
                  <input
                    _ngcontent-edh-c48=""
                    type="text"
                    formcontrolname="patient_id"
                    placeholder="العميل ID"
                    value={customer_id}
                    onChange={(e) => setcustomer_id(e.target.value)}
                    class={`form-control text-center border-main-2 my-3 p-3 corner-5 ng-valid ng-dirty ng-touched ${
                      errors?.find((x) => x.param === "customer_id")
                        ? "is-invalid"
                        : "valid"
                    }`}
                  />
                  <input
                    _ngcontent-edh-c48=""
                    type="text"
                    formcontrolname="password"
                    placeholder="كلمه المرور"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    class={`form-control text-center border-main-2 my-3 p-3 corner-5 ng-valid ng-dirty ng-touched ${
                      errors?.find((x) => x.param === "password")
                        ? "is-invalid"
                        : "valid"
                    }`}
                  />

                  <h6 _ngcontent-edh-c48="" class="text-center">
                    التحليل
                  </h6>
                  <select
                    _ngcontent-edh-c48=""
                    formcontrolname="test"
                    value={test}
                    onChange={(e) => settest(e.target.value)}
                    formcontrolname="gender"
                    class={`form-control text-center border-main-2 my-3 p-3 corner-5 ng-valid ng-dirty ng-touched ${
                      errors?.find((x) => x.param === "test")
                        ? "is-invalid"
                        : "valid"
                    }`}
                  >
                    <option _ngcontent-edh-c48="" value="Covid-19 by RT-PCR">
                      Covid-19 by RT-PCR
                    </option>
                    <option _ngcontent-edh-c48="" value="Covid-19 Ag">
                      Covid-19 Ag
                    </option>
                    <option _ngcontent-edh-c48="" value="Covid-19 Ab">
                      Covid-19 Ab
                    </option>
                  </select>
                  <h6 _ngcontent-edh-c48="" class="text-center">
                    النتيجة
                  </h6>
                  <select
                    _ngcontent-edh-c48=""
                    formcontrolname="result"
                    value={result}
                    onChange={(e) => setresult(e.target.value)}
                    formcontrolname="gender"
                    class={`form-control text-center border-main-2 my-3 p-3 corner-5 ng-valid ng-dirty ng-touched ${
                      errors?.find((x) => x.param === "result")
                        ? "is-invalid"
                        : "valid"
                    }`}
                  >
                    <option _ngcontent-edh-c48="" selected="">
                      النتيجة
                    </option>
                    <option _ngcontent-edh-c48="" value="Negative">
                      Negative
                    </option>
                    <option _ngcontent-edh-c48="" value="Positive">
                      Positive
                    </option>
                  </select>

                  <span
                    class={` spanfordate form-control text-center border-main-2  corner-5 ng-valid ng-dirty ng-touched ${
                      errors?.find((x) => x.param === "collectDate")
                        ? "is-invalid"
                        : "valid"
                    }`}
                  >
                    <DatePicker
                      selected={value}
                      placeholderText="Collect date"
                      onChange={(date) => onChangeCollectDate(date)}
                      showTimeSelect
                      dateFormat="dd/MM/yyyy  EE hh:mm a"
                    />
                  </span>

                  <span
                    class={` spanfordate form-control text-center border-main-2 my-3 corner-5 ng-valid ng-dirty ng-touched ${
                      errors?.find((x) => x.param === "reportDate")
                        ? "is-invalid"
                        : "valid"
                    }`}
                  >
                    <DatePicker
                      selected={valueOfReportDate}
                      placeholderText="report date"
                      onChange={(date) => {
                        onChangeReportDate(date);
                      }}
                      showTimeSelect
                      dateFormat="dd/MM/yyyy  EE hh:mm a"
                    />
                  </span>
                  <h6 _ngcontent-edh-c48="" class="text-center">
                    Unit
                  </h6>
                  <select
                    _ngcontent-edh-c48=""
                    formcontrolname="unit"
                    value={unit}
                    onChange={(e) => setunit(e.target.value)}
                    class={`form-control text-center border-main-2 my-3 p-3 corner-5 ng-valid ng-dirty ng-touched ${
                      errors?.find((x) => x.param === "unit")
                        ? "is-invalid"
                        : "valid"
                    }`}
                  >
                    <option _ngcontent-edh-c48="" value="N/A">
                      N/A
                    </option>
                    <option _ngcontent-edh-c48="" value="N/L">
                      N/L
                    </option>
                    <option _ngcontent-edh-c48="" value="IU/Ml">
                      IU/Ml
                    </option>
                  </select>

                  {/*
                   */}
                  <input
                    _ngcontent-edh-c48=""
                    type="text"
                    formcontrolname="branch"
                    placeholder="الفرع"
                    value={branch}
                    onChange={(e) => setbranch(e.target.value)}
                    class={`form-control text-center border-main-2 my-3 p-3 corner-5 ng-valid ng-dirty ng-touched ${
                      errors?.find((x) => x.param === "branch")
                        ? "is-invalid"
                        : "valid"
                    }`}
                  />
                  <h6 _ngcontent-edh-c48="" class="text-center">
                    النطاق المرجعي
                  </h6>
                  <select
                    _ngcontent-edh-c48=""
                    formcontrolname="reference_range"
                    value={border}
                    onChange={(e) => setborder(e.target.value)}
                    class={`form-control text-center border-main-2 my-3 p-3 corner-5 ng-valid ng-dirty ng-touched ${
                      errors?.find((x) => x.param === "border")
                        ? "is-invalid"
                        : "valid"
                    }`}
                  >
                    <option _ngcontent-edh-c48="" value="سلبي">
                      سلبي
                    </option>
                    <option _ngcontent-edh-c48="" value="Positive">
                      Positive
                    </option>
                  </select>
                  <h6 _ngcontent-edh-c48="" class="text-center">
                    Nationality
                  </h6>
                  <input
                    _ngcontent-edh-c48=""
                    type="text"
                    placeholder="Nationality"
                    value={RefOrg}
                    onChange={(e) => setRefOrg(e.target.value)}
                    class={`form-control text-center border-main-2 my-3 p-3 corner-5 ng-valid ng-dirty ng-touched ${
                      errors?.find((x) => x.param === "RefOrg")
                        ? "is-invalid"
                        : "valid"
                    }`}
                  />
                  <input
                    _ngcontent-edh-c48=""
                    type="text"
                    formcontrolname="identity"
                    placeholder=" Ref. Doctor"
                    value={refDoctor}
                    onChange={(e) => setrefDoctor(e.target.value)}
                    class={`form-control text-center border-main-2 my-3 p-3 corner-5 ng-valid ng-dirty ng-touched ${
                      errors?.find((x) => x.param === "refDoctor")
                        ? "is-invalid"
                        : "valid"
                    }`}
                  />

                  <h5
                    _ngcontent-edh-c48=""
                    class="text-muted text-end py-3"
                    style={{ marginRight: "50px" }}
                  >
                    تقرير العميل
                  </h5>
                  <input
                    _ngcontent-edh-c48=""
                    type="file"
                    id="formFile"
                    class="form-control"
                    name="customer_report"
                    //value={customer_report}
                    onChange={(e) => setcustomer_report(e.target.files[0])}
                    class={`form-control text-center border-main-2 my-3 p-3 corner-5 ng-valid ng-dirty ng-touched ${
                      errors?.find((x) => x.param === "customer_report")
                        ? "is-invalid"
                        : "valid"
                    }`}
                  />
                  {/*  <h5 _ngcontent-edh-c48="" class="text-muted text-end py-3">
                    صورة العميل
                  </h5>
                  <input
                    _ngcontent-edh-c48=""
                    type="file"
                    id="formFile"
                    name="customer_image"
                    /* value={customer_image}*/
                  /*  onChange={(e) => {
                      imageHandler(e);
                      setcustomer_image(e.target.files[0]);
                    }}
                    class={`form-control text-center border-main-2 my-3 p-3 corner-5 ng-valid ng-dirty ng-touched ${
                      errors?.find((x) => x.param === "customer_image")
                        ? "is-invalid"
                        : "valid"
                    }`}
                  />
                  */}
                  <div
                    _ngcontent-edh-c48=""
                    class="w-100 py-4"
                    onClick={DisplayTicket}
                  >
                    <a _ngcontent-edh-c48="" class="btn btn-warning">
                      اظهار / اخفاء الختم
                    </a>
                  </div>
                  <div
                    _ngcontent-edh-c48=""
                    class="w-100 py-4"
                    onClick={DisplayBack}
                  >
                    <a _ngcontent-edh-c48="" class="btn btn-warning">
                      اظهار / اخفاء خلفية التقرير
                    </a>
                  </div>
                  <div _ngcontent-edh-c48="" class="w-100 py-4">
                    <a
                      _ngcontent-edh-c48=""
                      class="btn btn-warning"
                      onClick={Displaycomment}
                    >
                      اخفاء الكومنت
                    </a>
                    <a
                      _ngcontent-edh-c48=""
                      class="btn btn-success"
                      onClick={ShowComment}
                    >
                      اظهار الكومنت
                    </a>
                  </div>
                  <input
                    _ngcontent-edh-c48=""
                    type="submit"
                    onClick={(e) => psotCustomer(e)}
                    value="اضافة"
                    style={{ width: "200px !important" }}
                    class="btn bg-main color-light font-20 mt-4 bg-main-hover"
                  />
                </form>
                <Modal
                  show={modalShow}
                  onHide={() => {
                    router.push("/dashboard");

                    setModalShow(false);
                  }}
                  message="تم اضافه التحليل بنجاح"
                />
              </div>
            </div>
            <div
              id=""
              _ngcontent-edh-c48=""
              class="w-100 d-flex justify-content-center"
            >
              <div
                _ngcontent-edh-c48=""
                dir="ltr"
                class="report-preview  col-md-6 w-100"
              >
                <div
                  _ngcontent-edh-c48=""
                  id="cpdf"
                  ref={ref}
                  class="report  d-flex flex-column letter-head"
                  style={{
                    backgroundSize: "cover",

                    backgroundImage: `${
                      background ? `url(${imgsrc})` : "none"
                    }`,
                  }}
                >
                  <div
                    className="m-3 cpdf-border"
                    style={{
                      height: "100%",
                    }}
                  >
                    <div _ngcontent-edh-c48="" class="person-details ">
                      <div
                        _ngcontent-edh-c48=""
                        class="row  person-info one align-items-center"
                      >
                        <div
                          _ngcontent-asf-c49=""
                          class="row m-3 py-2 px-2 person-info align-items-center"
                        >
                          <div
                            _ngcontent-asf-c49=""
                            class="col-5"
                            style={{ position: "relative" }}
                          >
                            <div _ngcontent-asf-c49="" class="row">
                              <div
                                _ngcontent-asf-c49=""
                                class="col-12 formheader"
                              >
                                <h4 _ngcontent-asf-c49="">
                                  <span
                                    _ngcontent-asf-c49=""
                                    class="fw-bold first"
                                  >
                                    File No
                                  </span>
                                  <span className="spanone">:</span>
                                  <span>{data?.id + 4564}</span>
                                </h4>
                                <h4 _ngcontent-asf-c49="">
                                  <span
                                    _ngcontent-asf-c49=""
                                    class="fw-bold first"
                                  >
                                    Name
                                  </span>
                                  <span className="spanone">:</span>
                                  <span style={{}}>{username_en}</span>
                                </h4>
                                <h4
                                  _ngcontent-asf-c49=""
                                  style={{ width: "auto" }}
                                >
                                  <span
                                    style={{
                                      marginLeft: "0px",
                                      width: "auto",
                                      fontFamily: "Akhbar",
                                    }}
                                  >
                                    {username_ar}
                                  </span>
                                </h4>
                                <h4 _ngcontent-asf-c49="">
                                  <span
                                    _ngcontent-asf-c49=""
                                    class="fw-bold first"
                                  >
                                    Ref. Doc
                                  </span>
                                  <span className="spanone">:</span>
                                  <span>{refDoctor}</span>
                                </h4>
                                <h4 _ngcontent-asf-c49="">
                                  <span
                                    _ngcontent-asf-c49=""
                                    class="fw-bold first"
                                  >
                                    Nationality
                                  </span>
                                  <span className="spanone">:</span>
                                  <span>{RefOrg}</span>
                                </h4>
                                <h4 _ngcontent-asf-c49="">
                                  <span
                                    _ngcontent-asf-c49=""
                                    class="fw-bold first"
                                  >
                                    Branch
                                  </span>
                                  <span className="spanone">:</span>
                                  <span> {branch}</span>
                                </h4>
                              </div>
                              <div
                                _ngcontent-asf-c49=""
                                class="col-4 d-flex justify-content-center align-items-center"
                              >
                                {/*   <img
                                _ngcontent-asf-c49=""
                                class="patient-img"
                                src="../../../../assets/images/person.jpeg"
                              />
                              */}
                              </div>
                            </div>
                            <img src={barcode} className="barcode" />
                          </div>
                          <div _ngcontent-asf-c49="" class="col-7">
                            <div
                              _ngcontent-asf-c49=""
                              class="row align-items-center"
                            >
                              <div
                                _ngcontent-asf-c49=""
                                class="col-8 formheader2"
                              >
                                <h4 _ngcontent-asf-c49="">
                                  <span
                                    _ngcontent-asf-c49=""
                                    class="fw-bold first"
                                  >
                                    Age /Sex
                                  </span>
                                  <span className="twodots">:</span>
                                  <span>
                                    {" "}
                                    {years} years{" "}
                                    <span
                                      style={{
                                        marginLeft: "8px",
                                        display: "inline",
                                      }}
                                    >
                                      {" "}
                                      {gender}
                                    </span>
                                  </span>{" "}
                                </h4>
                                <h4 _ngcontent-asf-c49="">
                                  <span
                                    _ngcontent-asf-c49=""
                                    class="fw-bold first"
                                  >
                                    Phone
                                  </span>
                                  <span className="twodots">:</span>
                                  <span> {phone}</span>
                                </h4>
                                <h4 _ngcontent-asf-c49="">
                                  <span
                                    _ngcontent-asf-c49=""
                                    class="fw-bold first"
                                  >
                                    Passport
                                  </span>
                                  <span className="twodots">:</span>
                                  <span> {passport_Number}</span>
                                </h4>
                                <h4 _ngcontent-asf-c49="">
                                  <span
                                    _ngcontent-asf-c49=""
                                    class="fw-bold first"
                                  >
                                    Nat ID.
                                  </span>
                                  <span className="twodots">:</span>
                                  <span> {identity_Number}</span>
                                </h4>
                                <h4 _ngcontent-asf-c49="">
                                  <span
                                    _ngcontent-asf-c49=""
                                    class="fw-bold first"
                                  >
                                    Reg. Date
                                  </span>
                                  <span className="twodots">:</span>
                                  <span> {collectDate}</span>
                                </h4>

                                <h4 _ngcontent-asf-c49="">
                                  <span
                                    _ngcontent-asf-c49=""
                                    class="fw-bold first"
                                  >
                                    Rep. Date
                                  </span>
                                  <span className="twodots">:</span>
                                  <span> {reportDate}</span>
                                </h4>
                              </div>
                              <div className="col-4">
                                <div className="divforqr mt-3">
                                  <div
                                    _ngcontent-edh-c48=""
                                    class=" d-flex justify-content-center align-items-center"
                                  >
                                    <qrcode _ngcontent-edh-c48="">
                                      <div class="qrcode">
                                        <QRCode
                                          fgColor={"#096d0f"}
                                          value={qrsrc}
                                        />
                                        ,{" "}
                                      </div>
                                    </qrcode>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          _ngcontent-elm-c47=""
                          class="row"
                          style={{ padding: "0px 35px" }}
                        >
                          <h3
                            _ngcontent-elm-c47=""
                            class="  fw-bold text-center py-2 mt-4 mb-3 boold"
                            style={{
                              fontSize: "24px",
                              fontWeight: "700 !important",
                              color: "black",
                              textDecoration: "underline",
                            }}
                          >
                            AUTOIMMUNITY TESTS
                          </h3>
                          <div
                            className="immunity"
                            style={{
                              color: "black",
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <h2>Test Name</h2>
                            <h2>Result</h2>
                            <h2>Unit</h2>
                            <h2>Ref.Range</h2>
                          </div>
                          <hr />
                          <div
                            className="immunity"
                            style={{
                              color: "black",
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <h2>
                              <h3 style={{ marginTop: "10px" }}>{test}</h3>
                            </h2>
                            <h2>
                              <h3 style={{ marginTop: "10px" }}>{result}</h3>
                            </h2>
                            <h2>
                              <h3 style={{ marginTop: "10px" }}>{unit}</h3>
                            </h2>
                            <h2>
                              <h3 style={{ marginTop: "10px" }}>{border}</h3>
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      _ngcontent-edh-c48=""
                      class="sample py-2"
                      style={{ padding: "0px 35px" }}
                    >
                      {/* <div _ngcontent-edh-c48="" class="row">
                      <div _ngcontent-edh-c48="" class="col-3">
                        <h4 _ngcontent-edh-c48="" class="fw-bold">
                          Type of Sample:{" "}
                        </h4>
                      </div>
                      <div _ngcontent-edh-c48="" class="col-9">
                        <h5 _ngcontent-edh-c48="">
                          Nasopharyngeal / Oropharyngeal swab on Viral Transport
                          Media.
                        </h5>
                      </div>
                    </div>
                    <div _ngcontent-edh-c48="" class="row">
                      <div _ngcontent-edh-c48="" class="col-3">
                        <h4 _ngcontent-edh-c48="" class="fw-bold">
                          Test Methodology
                        </h4>
                      </div>
                      <div _ngcontent-edh-c48="" class="col-9">
                        <h5 _ngcontent-edh-c48="">
                          Real-time PCR using specific primers and probes for
                          SARS CoV-2 (COVID-19(. Analyser: Bio-Rad CFX96 RT PCR.
                          The assay detects presence of 3 different genes of
                          SARS CoV-2.{" "}
                        </h5>
                      </div>
                    </div>
                  */}
                      {/* <div _ngcontent-edh-c48="" class="row">
                      <div _ngcontent-edh-c48="" class="col-3">
                        <h4 _ngcontent-edh-c48="" class="fw-bold">
                          Results Interpretation:{" "}
                        </h4>
                      </div>
                      <div _ngcontent-edh-c48="" class="col-9">
                        <h5 _ngcontent-edh-c48="">
                          Detected samples are reported as: "Positive".
                        </h5>
                        <h5 _ngcontent-edh-c48="">
                          Not detected samples are reported as: "Negative".
                        </h5>
                        <h5 _ngcontent-edh-c48="">
                          Sample reported as "inconclusive'' may contain low
                          amount of viral RNA and should be repeated for
                          confirmation.
                        </h5>
                      </div>
                          
                    </div>
                    */}

                      {typeOfComment()}
                    </div>
                    <div _ngcontent-edh-c48="" class="px-5 mx-5"></div>
                    <div _ngcontent-edh-c48="" id="stamp-img" class=" text-end">
                      <div
                        _ngcontent-elm-c47=""
                        class="col-6 d-flex align-items-center justify-content-between"
                      >
                        <div
                          _ngcontent-elm-c47=""
                          class="row"
                          style={{ width: "100%" }}
                        >
                          <h6
                            _ngcontent-edh-c48=""
                            class="fst-italic  my-2 text-center mb-3"
                          >
                            <img
                              src={imgticket}
                              style={{
                                width: " 200px",
                                position: "absolute",
                                bottom: "170px",
                                right: "63px",
                                display: Ticket ? "block" : "none",
                              }}
                            />
                          </h6>

                          <h6
                            _ngcontent-edh-c48=""
                            class="fst-italic  my-2 text-center mb-3"
                            style={{ position: "absolute", bottom: "400px" }}
                          >
                            {/* <img src={imgticket} style={{ width: "250px" }} />*/}
                          </h6>
                        </div>
                      </div>
                    </div>
                    {/*  <h6
                      style={{
                        textAlign: "center",
                        position: "absolute",
                        bottom: "150px",
                        left: "200px",
                      }}
                    >
                      <img src={imgticket2} style={{ width: "350px" }} />
                    </h6>
                    */}
                    <h3
                      style={{
                        left: "35%",
                        position: "absolute",
                        bottom: "115px",
                      }}
                    >
                      Approved by : Dr. Ahmed Esmaiel
                    </h3>
                  </div>
                </div>
                <div _ngcontent-edh-c48="" class="download-btn text-center">
                  <button
                    _ngcontent-edh-c48=""
                    value="اضافة"
                    class="btn bg-main color-light font-20 mt-4 bg-main-hover"
                    onClick={generate}
                  >
                    {" "}
                    تحميل
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/*  <Form />*/}
        <Footer />
      </div>
    </>
  );
}

export default EditCustomer;
