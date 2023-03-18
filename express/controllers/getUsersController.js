const { User, Customer } = require("../models");

const allUsers = async (req, res) => {
  console.log(req.user.id);
  try {
    if (req.user.role == "superAdmin") {
      let users = await User.findAll({
        include: [
          {
            model: Customer,
            as: "customer", // <---- HERE
          },
        ],
      });
      var newusers = users.filter((item) => item.id !== req.user.id);
      return res.status(200).send(newusers);
    }

    let users = await User.findAll({
      where: { createdBy: req.user.id },
      include: [
        {
          model: Customer,
          as: "customer", // <---- HERE
        },
      ],
    });

    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(`Server error ${e}`);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id, "id");

    if (req.user.role == "superAdmin") {
      let user = await User.destroy({
        where: {
          // criteria

          id,
        },
      });
      return res.status(200).send("success");
    }
    let user = await User.destroy({
      where: {
        // criteria
        createdBy: req.user.id,
        id,
      },
    });
    console.log(user, "user");

    res.status(200).send("success");
  } catch (e) {
    res.status(500).send(`Server error ${e}`);
  }
};

exports.allUsers = allUsers;
exports.deleteUser = deleteUser;
