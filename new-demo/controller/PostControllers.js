exports.getAllData = async (req, res, next) => {
  res.send("Get all data Route");
};

exports.insertNewData = async (req, res, next) => {
  res.send("Create New Data Route");
};

exports.getDatabyId = async (req, res, next) => {
  res.send("Get data by Id Route");
};
