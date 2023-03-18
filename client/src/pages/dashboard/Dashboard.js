import React from "react";

function Dashboard() {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0-1/css/all.min.css"
        integrity="sha512-wDB6AYiYP4FO5Sxieamqy9wtpAY3qdHMqlhZecIEUu1YjkLw5gQf/4ZDgOzmCBAF5SheMjmugkpUSVoUrGbLkQ=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <div class="row">
        <h1 class="page-header">
          <i class="fa fa-home fa-fw"></i> الصفحة الرئيسية
        </h1>
        <div class="col-lg-3 col-md-6">
          <div class="panel panel-primary">
            <div class="panel-heading">
              <div class="row">
                <div class="col-3">
                  <i class="">
                    <img src="https://lis.alreihan-lab.com/Content/img/registration.png" />
                  </i>
                </div>
                <div class="col-9 text-left">
                  <div class="medium">6</div>
                  <div>مريض جديد</div>
                </div>
              </div>
            </div>
            <a href="/Patients">
              <div class="panel-footer">
                <span class="pull-left">عرض المرضى</span>
                <span class="pull-right">
                  <i class="fa fa-arrow-circle-left"></i>
                </span>
                <div class="clearfix"></div>
              </div>
            </a>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="panel panel-yellow">
            <div class="panel-heading">
              <div class="row">
                <div class="col-3">
                  <i class="">
                    <img src="https://lis.alreihan-lab.com/Content/img/medical-records.png" />
                  </i>
                </div>
                <div class="col-9 text-left">
                  <div class="medium">5</div>
                  <div>زيارة جديدة</div>
                </div>
              </div>
            </div>
            <a href="/PatientsVisits">
              <div class="panel-footer">
                <span class="pull-left">عرض الزيارات</span>
                <span class="pull-right">
                  <i class="fa fa-arrow-circle-left"></i>
                </span>
                <div class="clearfix"></div>
              </div>
            </a>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="panel panel-green">
            <div class="panel-heading">
              <div class="row">
                <div class="col-3">
                  <i class="">
                    <img src="https://lis.alreihan-lab.com/Content/img/laboratory.png" />
                  </i>
                </div>
                <div class="col-9 text-left">
                  <div class="medium">7</div>
                  <div>نتيجة منتهية</div>
                </div>
              </div>
            </div>
            <a href="/PatientsResults">
              <div class="panel-footer">
                <span class="pull-left">عرض النتائج</span>
                <span class="pull-right">
                  <i class="fa fa-arrow-circle-left"></i>
                </span>
                <div class="clearfix"></div>
              </div>
            </a>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="panel panel-red">
            <div class="panel-heading">
              <div class="row">
                <div class="col-3">
                  <i class="">
                    <img src="https://lis.alreihan-lab.com/Content/img/billing.png" />
                  </i>
                </div>
                <div class="col-9 text-left">
                  <div class="medium">6600</div>
                  <div>إجمالي المبالغ المحصلة</div>
                </div>
              </div>
            </div>
            <a href="/AccountsReports">
              <div class="panel-footer">
                <span class="pull-left">عرض الإيرادات</span>
                <span class="pull-right">
                  <i class="fa fa-arrow-circle-left"></i>
                </span>
                <div class="clearfix"></div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-8"></div>
        <div class="col-lg-4">
          <div class="panel panel-info">
            <div class="panel-heading">
              <i class="fa fa-bell fa-fw"></i> تنبيهات النظام
            </div>
            <div class="panel-body">
              <div class="list-group">
                <a href="#" class="list-group-item">
                  <i class="fa fa-check-square fa-fw"></i>{" "}
                  <span class="small">لقد قمت بتسجيل زيارة جديدة</span>
                  <span class="pull-right text-muted small">
                    <em class="small">منذ 5 أيام</em>
                  </span>
                </a>
                <a href="#" class="list-group-item">
                  <i class="fa fa-check-square fa-fw"></i>{" "}
                  <span class="small">لقد قمت بتسجيل زيارة جديدة</span>
                  <span class="pull-right text-muted small">
                    <em class="small">منذ 5 أيام</em>
                  </span>
                </a>
                <a href="#" class="list-group-item">
                  <i class="fa fa-user-plus fa-fw"></i>{" "}
                  <span class="small">لقد قمت بتسجيل مريض جديد</span>
                  <span class="pull-right text-muted small">
                    <em class="small">منذ 5 أيام</em>
                  </span>
                </a>
                <a href="#" class="list-group-item">
                  <i class="fa fa-user-plus fa-fw"></i>{" "}
                  <span class="small">لقد قمت بتسجيل مريض جديد</span>
                  <span class="pull-right text-muted small">
                    <em class="small">منذ 5 أيام</em>
                  </span>
                </a>
                <a href="#" class="list-group-item">
                  <i class="fa fa-user-plus fa-fw"></i>{" "}
                  <span class="small">لقد قمت بتسجيل مريض جديد</span>
                  <span class="pull-right text-muted small">
                    <em class="small">منذ 5 أيام</em>
                  </span>
                </a>
                <a href="#" class="list-group-item">
                  <i class="fa fa-check-square fa-fw"></i>{" "}
                  <span class="small">لقد قمت بتسجيل زيارة جديدة</span>
                  <span class="pull-right text-muted small">
                    <em class="small">منذ 5 أيام</em>
                  </span>
                </a>
                <a href="#" class="list-group-item">
                  <i class="fa fa-user-plus fa-fw"></i>{" "}
                  <span class="small">لقد قمت بتسجيل مريض جديد</span>
                  <span class="pull-right text-muted small">
                    <em class="small">منذ 5 أيام</em>
                  </span>
                </a>
              </div>
              <a href="/Notifications" class="btn btn-primary btn-block">
                عرض تنبيهات النظام
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
