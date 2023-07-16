const Company = require("../models/Companymodel");
const asyncHandler = require("../utils/asyncHandler");

exports.createCompany = asyncHandler(async (req, res) => {
  const { name, email, website, contact, isVerified } = req.body;

  const existingCompany = await Company.find({ email });

  if (existingCompany) {
    return res.status(409).json({
      message: "Company already present",
    });
  }

  const company = await Company.create({
    name,
    email,
    website,
    contact,
  });

  if (company) {
    return res.status(200).json({
      message: "Company created sucessfully",
    });
  }
});
