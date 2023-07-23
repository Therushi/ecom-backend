const Company = require("../models/CompanyModel");
const asyncHandler = require("../utils/asyncHandler");

exports.companyRegister = asyncHandler(async (req, res) => {
  const { name, email, website, contact, isVerified } = req.body;

  const existingCompany = await Company.findOne({
    email,
    name,
  });

  if (existingCompany)
    return res
      .status(400)
      .json({ status: false, message: "Company already exists" });

  const company = await Company.create({
    name,
    email,
    website,
    contact,
    isVerified,
  });

  if (company)
    return res.status(201).json({
      status: true,
      message: "Company created sucessfully",
      data: Company,
    });
});
exports.updateCompany = asyncHandler(async (req, res) => {
  const { companyId } = req.body;
  const filter = { _id: companyId };
  const updates = {};
  for (const field in req.body) {
    if (Object.prototype.hasOwnProperty.call(req.body, field)) {
      updates[field] = req.body[field];
    }
  }
  const updatedCompany = await Company.findOneAndUpdate(filter, updates, {
    new: true,
  });
  if (!updatedCompany) {
    return res.status(404).json({
      message: "Project not found",
    });
  }
  res.status(200).json({
    message: "Project updated successfully",
    data: updatedCompany,
  });
});
