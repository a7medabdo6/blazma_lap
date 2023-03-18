const { Customer, ExternalReport } = require("../models");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const fs = require("fs");
var path = require("path");

const { validationResult } = require("express-validator");

const postCustomer = async (req, res) => {
  // console.log(req.user.role);
  // if (req.hasOwnProperty("fileValidationError")) {
  //   return res.status(400).json({ errors: [req.fileValidationError] });
  // }

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   console.log(req.files, "filllllll");
  //   /* if (req.files?.customer_image) {
  //     fs.unlink(
  //       path.join(__dirname, "/../", req.files.customer_image[0].path),
  //       (err) => console.log(err)
  //     );
  //   }*/
  //   if (req.files?.customer_report) {
  //     fs.unlink(
  //       path.join(__dirname, "/../", req.files.customer_report[0].path),
  //       (err) => console.log(err)
  //     );
  //   }
  //   return res.status(400).json({ errors: errors.array() });
  // }

  var {
    username_ar,
    username_en,
    gender,
    birth,
    passport_Number,
    identity_Number,
    phone,

    nation,
    location,
    customer_id,
    createdBy,
    test,
    RefOrg,
    years,
    password,
    collectDate,
    reportDate,
    unit,
    branch,
    border,
    result,
    refDoctor,
    customer_image,
  } = req.body;
  console.log(req.files, "ress");
  //const customer_image = `${config.domain}/public/images/${req.files.customer_image[0]?.filename}`;
  console.log(
    username_ar,
    username_en,
    gender,
    birth,
    passport_Number,
    identity_Number,
    phone,
    nation,
    location,
    customer_id,
    test,
    password,
    collectDate,
    reportDate,
    unit,
    RefOrg,
    years,

    branch,
    border,
    result,
    refDoctor,
  );
  const customer_report = `${config.domain}/public/images/${
    req.files.customer_report ? req.files.customer_report[0]?.filename : ""
  }`;
  console.log(customer_report, "customer_report");
  try {
    const customer = await Customer.create({
      username_ar,
      username_en,
      gender,
      birth,
      passport_Number,
      identity_Number,
      phone,

      nation,
      location,
      password,
      customer_id,
      RefOrg,
      years,
      createdBy: 1,
      test,
      collectDate,
      reportDate,
      unit,
      branch,
      border,
      result,
      refDoctor,
      customer_report,
      customer_image,
    });
    res.status(200).send(customer);
  } catch (e) {
    res.status(500).send(`Server error ${e}`);
  }
};

const allCustomer = async (req, res) => {
  console.log(req.user.id);
  const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;

    return { limit, offset };
  };
  const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: items } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, items, totalPages, currentPage };
  };
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  try {
    if (req.user.role == "superAdmin") {
      let customer = await Customer.findAndCountAll({
        limit,
        offset,
        where: {},
        include: [
          {
            model: ExternalReport,
            as: "externalReports", // <---- HERE
          },
        ],
      });
      const response = getPagingData(customer, page, limit);
      return res.status(200).send(response);
    }
    let customer = await Customer.findAndCountAll({
      limit,
      offset,
      where: { createdBy: req.user.id },
      include: [
        {
          model: ExternalReport,
          as: "externalReports", // <---- HERE
        },
      ],
    });
    const response = getPagingData(customer, page, limit);
    return res.status(200).send(response);
  } catch (e) {
    res.status(500).send(`Server error ${e}`);
  }
};
const oneCustomer = async (req, res) => {
  try {
    const { customer_id } = req.query;
    console.log(customer_id, "id");

    let customer = await Customer.findAll({
      where: {
        customer_id,
      },
    });
    res.status(200).send(customer);
  } catch (e) {
    res.status(500).send(`Server error ${e}`);
  }
};
const oneCustomerReports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { customer_id, password } = req.body;
    console.log(password, "password");
    let customer = await Customer.findAll({
      where: {
        customer_id,
        password,
      },
      include: [
        {
          model: ExternalReport,
          as: "externalReports", // <---- HERE
        },
      ],
    });
    if (customer.length == 0) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    res.status(200).send(customer);
  } catch (e) {
    res.status(500).send(`Server error ${e}`);
  }
};
const deleteOne = async (req, res) => {
  try {
    const { id } = req.query;
    let customer = await Customer.destroy({
      where: {
        // criteria
        id,
      },
    });
    console.log(customer, "customer");

    res.status(200).send("success");
  } catch (e) {
    res.status(500).send(`Server error ${e}`);
  }
};
const deletemany = async (req, res) => {
  try {
    const { id } = req.query;
    const myArray = id.split(",").map(function (item) {
      return parseInt(item);
    });
    var filtered = myArray.filter(Boolean);
    let uniqueChars = [...new Set(filtered)];
    console.log(uniqueChars, "id");

    let customer = await Customer.destroy({
      where: {
        // criteria
        id: uniqueChars,
      },
    });
    console.log(customer, "customer");

    res.status(200).send("success");
  } catch (e) {
    res.status(500).send(`Server error ${e}`);
  }
};
const addExternalReport = async (req, res) => {
  const { nameofExternalReport } = req.body;
  const customer_external_report = `${config.domain}/${
    req.file?.path ? req.file.path : null
  }`;
  console.log(customer_external_report, "customer_external_report");
  const customer_id = req.query.customer_id;
  console.log(customer_id, "customer_id");
  if (req.hasOwnProperty("fileValidationError")) {
    return res.status(400).json({ errors: [req.fileValidationError] });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(req.files, "filllllll");
    if (req.file) {
      fs.unlink(path.join(__dirname, "/../", req.file.path), (err) =>
        console.log(err),
      );
    }
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let customer = await ExternalReport.create({
      customerId: customer_id,
      customer_external_report,
      nameofExternalReport,
    });

    return res.status(200).send(customer);
  } catch (error) {
    console.log(error, "error");
  }
};

const findallandUpdate = async (req, res) => {
  console.log(req.user.role);
  if (req.hasOwnProperty("fileValidationError")) {
    return res.status(400).json({ errors: [req.fileValidationError] });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(req.files, "filllllll");
    if (req.files?.customer_image) {
      fs.unlink(
        path.join(__dirname, "/../", req.files.customer_image[0].path),
        (err) => console.log(err),
      );
    }
    if (req.files?.customer_report) {
      fs.unlink(
        path.join(__dirname, "/../", req.files.customer_report[0].path),
        (err) => console.log(err),
      );
    }
    return res.status(400).json({ errors: errors.array() });
  }
  //const customer_image = `${config.domain}/public/images/${req.files.customer_image[0]?.filename}`;

  const customer_report = `${config.domain}/public/images/${
    req.files.customer_report ? req.files.customer_report[0]?.filename : ""
  }`;
  var {
    username_ar,
    username_en,
    gender,
    birth,
    passport_Number,
    identity_Number,
    phone,

    nation,
    location,
    customer_id,
    createdBy,
    test,
    collectDate,
    reportDate,
    unit,
    branch,
    border,
    RefOrg,
    years,
    result,
    customer_image,
    refDoctor,
  } = req.body;
  const customer_id_query = req.query.customer_id;
  const findedcustomer = await Customer.findAll({
    where: { customer_id: customer_id_query },
  });
  const delteFilesBeforeSaveEdit = async () => {
    // const myArray = findedcustomer[0].customer_image.split("/");
    const myArrayreport = findedcustomer[0].customer_report.split("/");

    /*  console.log(myArray, "myArray");
    fs.unlink(
      path.join(__dirname, "/../public/images", myArray[3]),
      function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log("File deleted!");
      }
    );
    */
    fs.unlink(
      path.join(__dirname, "/../public/images", myArrayreport[3]),
      function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log("File deleted!");
      },
    );
  };
  if (req.user.role == "superAdmin") {
    let customer = await Customer.update(
      {
        username_ar,
        username_en,
        gender,
        birth,
        passport_Number,
        customer_report,
        identity_Number,
        phone,

        nation,
        location,
        customer_id,
        createdBy,
        test,
        collectDate,
        reportDate,
        unit,
        branch,
        RefOrg,
        years,
        border,
        customer_image,
        result,
        refDoctor,
      },
      {
        where: { customer_id: customer_id },
      },
    );

    delteFilesBeforeSaveEdit();

    return res.status(200).send(customer);
  }
  try {
    let customer = await Customer.update(
      {
        username_ar,
        username_en,
        gender,
        birth,
        passport_Number,
        identity_Number,
        phone,

        nation,
        location,
        customer_id,
        createdBy,
        customer_image,
        customer_report,
        test,
        collectDate,
        reportDate,
        unit,
        RefOrg,
        years,
        branch,
        border,
        result,
        refDoctor,
      },
      {
        where: {
          customer_id: customer_id_query,
          createdBy: req.user.id,
        },
      },
    );
    delteFilesBeforeSaveEdit();
    res.status(200).send(customer);
  } catch (e) {
    res.status(500).send(`Server error ${e}`);
  }
};
const progressforpdfs = async (req, res) => {
  res.status(200).send("success");
};
exports.postCustomer = postCustomer;
exports.allCustomer = allCustomer;
exports.oneCustomer = oneCustomer;
exports.oneCustomerReports = oneCustomerReports;
exports.deleteOne = deleteOne;
exports.deletemany = deletemany;
exports.findallandUpdate = findallandUpdate;
exports.addExternalReport = addExternalReport;
exports.progressforpdfs = progressforpdfs;
