import React from "react";
import { Link } from "react-router-dom";

import TopHeader from "../components/TopHeader";
import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";
function Home() {
  return (
    <>
      <Link href="/auth/signin">sign in</Link>
      <link rel="stylesheet" type="text/css" href="/statics/styles/style.css" />
      <TopHeader />
      <MainHeader active="home" />
      <header
        _ngcontent-heq-c32=""
        class="row text-center justify-content-center align-items-center m-0 p-0"
      >
        <div _ngcontent-heq-c32="" class="container color-light">
          <h1 _ngcontent-heq-c32="" class="fw-bold font-50">
            معامل بلازما
          </h1>
          <h3 _ngcontent-heq-c32="" class="pb-4 pt-2">
            للتحاليل الطبية
          </h3>
          <p _ngcontent-heq-c32="" class="font-20">
            مواعيد العمل يومياً من 9 صباحاً إلى 11 مساءً طوال أيام الأسبوع
          </p>
          <div _ngcontent-heq-c32="" class="header-services-btn">
            <Link to="/house-visit">
              <a
                _ngcontent-heq-c32=""
                routerlink="/house-visit"
                class="btn color-light bg-main font-20 bg-main-hover my-3"
              >
                حجز زيارة منزلية
              </a>
            </Link>
          </div>
        </div>
      </header>
      <section _ngcontent-heq-c32="" class="bg-grey py-5">
        <div _ngcontent-heq-c32="" class="container">
          <div _ngcontent-heq-c32="" class="row">
            <div _ngcontent-heq-c32="" class="service-bg col-md-4 px-3 py-4">
              <div
                _ngcontent-heq-c32=""
                class="service corner-15 p-4 bg-light shadow-sm"
              >
                <div
                  _ngcontent-heq-c32=""
                  class="service-img bg-main d-flex justify-content-center align-items-center corner-15 py-5"
                >
                  <fa-icon
                    _ngcontent-heq-c32=""
                    class="ng-fa-icon color-light font-70"
                  >
                    <svg
                      role="img"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="clinic-medical"
                      class="svg-inline--fa fa-clinic-medical fa-w-18"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="currentColor"
                        d="M288 115L69.47 307.71c-1.62 1.46-3.69 2.14-5.47 3.35V496a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V311.1c-1.7-1.16-3.72-1.82-5.26-3.2zm96 261a8 8 0 0 1-8 8h-56v56a8 8 0 0 1-8 8h-48a8 8 0 0 1-8-8v-56h-56a8 8 0 0 1-8-8v-48a8 8 0 0 1 8-8h56v-56a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v56h56a8 8 0 0 1 8 8zm186.69-139.72l-255.94-226a39.85 39.85 0 0 0-53.45 0l-256 226a16 16 0 0 0-1.21 22.6L25.5 282.7a16 16 0 0 0 22.6 1.21L277.42 81.63a16 16 0 0 1 21.17 0L527.91 283.9a16 16 0 0 0 22.6-1.21l21.4-23.82a16 16 0 0 0-1.22-22.59z"
                      ></path>
                    </svg>
                  </fa-icon>
                </div>
                <div
                  _ngcontent-heq-c32=""
                  class="service-text text-center pt-5"
                >
                  <Link href="/house-vist">
                    <a
                      _ngcontent-heq-c32=""
                      routerlink="/house-visit"
                      class="color-main-hover color-dark text-decoration-none"
                    >
                      <h3 _ngcontent-heq-c32="" class="pb-4 fw-bold">
                        حجز زيارة منزلية
                      </h3>
                    </a>
                  </Link>
                  <p _ngcontent-heq-c32="" class="font-18">
                    يمكنك الآن حجز زيارة منزلية من خلال موقعنا بشكل فوري
                  </p>
                </div>
              </div>
            </div>
            <div _ngcontent-heq-c32="" class="service-bg col-md-4 px-3 py-4">
              <div
                _ngcontent-heq-c32=""
                class="service corner-15 p-4 bg-light shadow-sm"
              >
                <div
                  _ngcontent-heq-c32=""
                  class="service-img bg-main d-flex justify-content-center align-items-center corner-15 py-5"
                >
                  <fa-icon
                    _ngcontent-heq-c32=""
                    class="ng-fa-icon color-light font-70"
                  >
                    <svg
                      role="img"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="vial"
                      class="svg-inline--fa fa-vial fa-w-15"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 480 512"
                    >
                      <path
                        fill="currentColor"
                        d="M477.7 186.1L309.5 18.3c-3.1-3.1-8.2-3.1-11.3 0l-34 33.9c-3.1 3.1-3.1 8.2 0 11.3l11.2 11.1L33 316.5c-38.8 38.7-45.1 102-9.4 143.5 20.6 24 49.5 36 78.4 35.9 26.4 0 52.8-10 72.9-30.1l246.3-245.7 11.2 11.1c3.1 3.1 8.2 3.1 11.3 0l34-33.9c3.1-3 3.1-8.1 0-11.2zM318 256H161l148-147.7 78.5 78.3L318 256z"
                      ></path>
                    </svg>
                  </fa-icon>
                </div>
                <div
                  _ngcontent-heq-c32=""
                  class="service-text text-center pt-5"
                >
                  <a
                    _ngcontent-heq-c32=""
                    routerlink="/test-result"
                    class="color-main-hover color-dark text-decoration-none"
                    href="#/test-result"
                  >
                    <h3 _ngcontent-heq-c32="" class="pb-4 fw-bold">
                      الاستعلام عن نتيجة تحليل
                    </h3>
                  </a>
                  <p _ngcontent-heq-c32="" class="font-18">
                    تستطيع الاستعلام عن نتائج التحاليل بضغطة زر من خلال هذه
                    الخدمة
                  </p>
                </div>
              </div>
            </div>
            <div _ngcontent-heq-c32="" class="service-bg col-md-4 px-3 py-4">
              <div
                _ngcontent-heq-c32=""
                class="service corner-15 p-4 bg-light shadow-sm"
              >
                <div
                  _ngcontent-heq-c32=""
                  class="service-img bg-main d-flex justify-content-center align-items-center corner-15 py-5"
                >
                  <fa-icon
                    _ngcontent-heq-c32=""
                    class="ng-fa-icon color-light font-70"
                  >
                    <svg
                      role="img"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="question"
                      class="svg-inline--fa fa-question fa-w-12"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path
                        fill="currentColor"
                        d="M202.021 0C122.202 0 70.503 32.703 29.914 91.026c-7.363 10.58-5.093 25.086 5.178 32.874l43.138 32.709c10.373 7.865 25.132 6.026 33.253-4.148 25.049-31.381 43.63-49.449 82.757-49.449 30.764 0 68.816 19.799 68.816 49.631 0 22.552-18.617 34.134-48.993 51.164-35.423 19.86-82.299 44.576-82.299 106.405V320c0 13.255 10.745 24 24 24h72.471c13.255 0 24-10.745 24-24v-5.773c0-42.86 125.268-44.645 125.268-160.627C377.504 66.256 286.902 0 202.021 0zM192 373.459c-38.196 0-69.271 31.075-69.271 69.271 0 38.195 31.075 69.27 69.271 69.27s69.271-31.075 69.271-69.271-31.075-69.27-69.271-69.27z"
                      ></path>
                    </svg>
                  </fa-icon>
                </div>
                <div
                  _ngcontent-heq-c32=""
                  class="service-text text-center pt-5"
                >
                  <a
                    _ngcontent-heq-c32=""
                    routerlink="/contact"
                    class="color-main-hover color-dark text-decoration-none"
                    href="#/contact"
                  >
                    <h3 _ngcontent-heq-c32="" class="pb-4 fw-bold">
                      استشارات اونلاين
                    </h3>
                  </a>
                  <p _ngcontent-heq-c32="" class="font-18">
                    من خلال التواصل معنا نجيب عن كافة استفساراتك وتساؤلاتك
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
