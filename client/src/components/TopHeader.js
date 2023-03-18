import React from "react";
import logo from "../assets/img/logo.png";

function TopHeader() {
  return (
    <section _ngcontent-heq-c38="" class="container py-4 bg-white">
      <div _ngcontent-heq-c38="" class="row justify-content-between">
        <div _ngcontent-heq-c38="" class="col d-flex">
          <div _ngcontent-heq-c38="" class="logo-bg">
            <img
              _ngcontent-heq-c38=""
              src={logo}
              alt="The Lab Logo"
              class="logo"
            />
          </div>
          <div _ngcontent-heq-c38="" class="logo-text text-center px-3 pt-2">
            <p
              _ngcontent-heq-c38=""
              class="lab-name fw-bolder font-20 m-0 p-0 d-none d-md-block"
            >
              معامل بلازما
            </p>
            <p
              _ngcontent-heq-c38=""
              class="lab-name m-0 p-0 fw-bold d-none d-md-block"
            >
              للتحاليل الطبية
            </p>
          </div>
        </div>
        <div _ngcontent-heq-c38="" class="col d-flex justify-content-end">
          <div
            _ngcontent-heq-c38=""
            class="phone-bg d-none d-md-flex align-items-center"
          >
            <fa-icon
              _ngcontent-heq-c38=""
              class="ng-fa-icon color-main font-24"
            >
              <svg
                role="img"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="phone"
                class="svg-inline--fa fa-phone fa-w-16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"
                ></path>
              </svg>
            </fa-icon>
          </div>
          <div _ngcontent-heq-c38="" class="logo-text px-3 pt-2">
            <p _ngcontent-heq-c38="" class="lab-name fw-bolder font-20 m-0 p-0">
              اتصل بنا
            </p>
            <p _ngcontent-heq-c38="" class="lab-name m-0 p-0 fw-bold">
              01017931379
              <br />
              01094045006
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopHeader;
