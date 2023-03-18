import React from "react";
import "../assets/styles/form.css";
function Form() {
  return (
    <div dir="ltr">
      <div class="signup-container">
        <div class="left-container">
          <h1>
            <i class="fas fa-paw"></i>
            PUPASSURE
          </h1>
          <div class="puppy">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/38816/image-from-rawpixel-id-542207-jpeg.png" />
          </div>
        </div>
        <div class="right-container">
          <header>
            <h1>Yay, puppies! Ensure your pup gets the best care!</h1>
            <div class="set">
              <div class="pets-name">
                <label for="pets-name">اسم العميل</label>
                <input id="pets-name" placeholder="اسم العميل" type="text" />
              </div>
              <div class="pets-name">
                <label for="pets-name"> اسم العميل انجليزي </label>
                <input
                  id="pets-name+ثى"
                  placeholder="اسم العميل انجليزي "
                  type="text"
                />
              </div>
              {/*
               <div class="pets-photo">
                <button id="pets-upload">
                  <i class="fas fa-camera-retro"></i>
                </button>
                <label for="pets-upload">Upload a photo</label>
              </div>
            
              */}
            </div>

            <div class="set">
              <div class="pets-birthday">
                <label for="pets-birthday">تاريخ الميلاد</label>
                <input
                  id="pets-birthday"
                  placeholder="MM/DD/YYYY"
                  type="text"
                />
              </div>
              <div class="pets-gender">
                <label>النوع</label>
                <div class="radio-container">
                  <input
                    checked=""
                    id="pet-gender-female"
                    name="pet-gender"
                    type="radio"
                    checked
                    value="female"
                  />
                  <label for="pet-gender-female">انثي</label>
                  <input
                    id="pet-gender-male"
                    name="pet-gender"
                    type="radio"
                    value="male"
                  />
                  <label for="pet-gender-male">ذكر</label>
                </div>
              </div>
            </div>

            <div class="set">
              <div class="pets-name">
                <label for="pets-name">رقم الباسبورت </label>
                <input placeholder="رقم الباسبورت " type="text" />
              </div>
              <div class="pets-name">
                <label for="pets-name"> الرقم القومي </label>
                <input placeholder="  الرقم القومي " type="text" />
              </div>
              {/*
               <div class="pets-photo">
                <button id="pets-upload">
                  <i class="fas fa-camera-retro"></i>
                </button>
                <label for="pets-upload">Upload a photo</label>
              </div>
            
              */}
            </div>

            <div class="set">
              <div class="pets-name">
                <label> الموقع </label>
                <input placeholder=" الموقع " type="text" />
              </div>
              <div class="pets-name">
                <label> الجنسية </label>
                <input placeholder="  الجنسية " type="text" />
              </div>
              {/*
               <div class="pets-photo">
                <button id="pets-upload">
                  <i class="fas fa-camera-retro"></i>
                </button>
                <label for="pets-upload">Upload a photo</label>
              </div>
            
              */}
            </div>

            <div class="set">
              <div class="pets-name">
                <label>اي دي العميل </label>
                <input placeholder=" اي دي العميل " type="text" />
              </div>
              <div class="pets-gender">
                <label>التحليل</label>
                <div class="radio-container">
                  <input
                    checked=""
                    id="pet-gender-pcr"
                    name="pet-test"
                    type="radio"
                    checked
                    value="Covid -19 By PCR"
                  />
                  <label for="pet-gender-pcr">Covid -19 By PCR</label>
                  <input
                    id="pet-gender-rt"
                    name="pet-test"
                    type="radio"
                    value="RT- PCR Covid- 19"
                  />
                  <label for="pet-gender-rt">RT- PCR Covid- 19</label>
                </div>
              </div>
              {/*
               <div class="pets-photo">
                <button id="pets-upload">
                  <i class="fas fa-camera-retro"></i>
                </button>
                <label for="pets-upload">Upload a photo</label>
              </div>
            
              */}
            </div>

            <div class="set">
              <div class="pets-birthday">
                <label for="pets-birthday">تاريخ الجمع</label>
                <input
                  id="pets-birthday"
                  placeholder="MM/DD/YYYY"
                  type="text"
                />
              </div>
              <div class="pets-gender">
                <label>النتيجه</label>
                <div class="radio-container">
                  <input
                    checked=""
                    id="pet-gender-positive"
                    name="pet-result"
                    type="radio"
                    checked
                    value="positive"
                  />
                  <label for="pet-gender-positive">موجب</label>
                  <input
                    id="pet-gender-negative"
                    name="pet-result"
                    type="radio"
                    value="negative"
                  />
                  <label for="pet-gender-negative">سلبي</label>
                </div>
              </div>
            </div>

            <div class="set">
              <div class="pets-birthday">
                <label for="pets-birthday">تاريخ التقرير</label>
                <input
                  id="pets-birthday"
                  placeholder="MM/DD/YYYY"
                  type="text"
                />
              </div>
              <div class="pets-gender">
                <label>الوحده</label>
                <div class="radio-container unit">
                  <input
                    checked=""
                    id="pet-gender-N/A"
                    name="pet-unit"
                    type="radio"
                    checked
                    value="N/A"
                  />
                  <label for="pet-gender-N/A">N/A</label>
                  <input
                    id="pet-gender-N/L"
                    name="pet-unit"
                    type="radio"
                    value="N/L"
                  />
                  <label for="pet-gender-N/L">N/L</label>
                  <input
                    id="pet-gender-IU/Ml"
                    name="pet-unit"
                    type="radio"
                    value="IU/Ml"
                  />
                  <label for="pet-gender-IU/Ml">IU/Ml</label>
                </div>
              </div>
            </div>

            <div class="set">
              <div class="pets-birthday">
                <label>الفرع </label>
                <input id="pets-birthday" placeholder="الفرع" type="text" />
              </div>
              <div class="pets-gender">
                <label>النطاق المرجعي</label>
                <div class="radio-container">
                  <input
                    checked=""
                    id="pet-gender-range-pos"
                    name="pet-border"
                    type="radio"
                    checked
                    value="positive"
                  />
                  <label for="pet-gender-range-pos">موجب</label>
                  <input
                    id="pet-gender-range-nega"
                    name="pet-border"
                    type="radio"
                    value="negative"
                  />
                  <label for="pet-gender-range-nega">سلبي</label>
                </div>
              </div>
            </div>

            <div class="set">
              <div class="pets-gender">
                <label>Ref Doctor</label>
                <div class="radio-container ">
                  <input
                    checked=""
                    id="pet-gender-herself"
                    name="pet-Ref"
                    type="radio"
                    checked
                    value="herself"
                  />
                  <label for="pet-gender-herself">herself</label>
                  <input
                    id="pet-gender-himself"
                    name="pet-Ref"
                    type="radio"
                    value="himself"
                  />
                  <label for="pet-gender-himself">Himself</label>
                </div>
              </div>
              <div class="pets-gender">
                <label for="pets-upload-image">Upload a photo</label>

                <input
                  _ngcontent-edh-c48=""
                  type="file"
                  style={{
                    margin: "0px !important",
                    padding: "0px !important",
                  }}
                  id="formFile"
                  name="customer_image"
                  className="form-control customer_image text-center border-main-2 my-3 p-3 corner-5 ng-valid ng-dirty ng-touched valid"
                />
              </div>
            </div>
            <div class="set">
              <div class="pets-gender">
                <label for="pets-upload-image">Upload a report</label>

                <input
                  _ngcontent-edh-c48=""
                  type="file"
                  style={{
                    margin: "0px !important",
                    padding: "0px !important",
                  }}
                  id="formFile"
                  name="customer_report"
                  className="form-control customer_image text-center border-main-2 my-3 p-3 corner-5 ng-valid ng-dirty ng-touched valid"
                />
              </div>
            </div>
          </header>
          <footer>
            <div class="set">
              <button id="back">Back</button>
              <button id="next">Next</button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Form;
