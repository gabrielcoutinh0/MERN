const User = require("../models/user.model");

module.exports = {
  async index(req, res) {
    const user = await User.find();
    res.json(user);
  },

  async create(req, res) {
    const { name, email, type, password } = req.body;
    let data = {};
    let user = await User.findOne({ email });

    if (!user) {
      data = { name, email, type, password };
      user = await User.create(data);

      return res.status(200).json(user);
    } else {
      return res.status(500).json(user);
    }
  },

  async details(req, res) {
    const { _id } = req.params;
    const user = await User.findOne({ _id });
    res.json(user);
  },

  async delete(req, res) {
    const { _id } = req.params;
    const user = await User.findByIdAndDelete({ _id });

    return res.json(user);
  },

  async update(req, res) {
    const { _id, name, email, type, password } = req.body;
    const data = { name, email, type, password };
    const user = await User.findOneAndUpdate({ _id }, data, { new: true });

    res.json(user);
  },
};
