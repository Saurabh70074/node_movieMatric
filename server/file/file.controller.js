//deleteFromSpace
const { deleteFromSpace } = require("../../util/deleteFromSpace");

//config
const config = require("../../config");

//upload content to digital ocean storage
exports.uploadContent = async (req, res) => {
  try {
    console.log("body: ", req.body);
    console.log("file: ", req.file);

    if (!req.body?.folderStructure || !req.body?.keyName) {
      return res.status(200).json({ status: false, message: "Oops ! Invalid details." });
    }

    if (!req?.file) {
      return res.status(200).json({ status: false, message: "Please upload a valid files." });
    }

    console.log("Upload started  .......");

    const url = `${config?.endpoint}/${req.body.folderStructure}/${req.body.keyName}`;

    return res.status(200).json({ status: true, message: "finally, file uploaded Successfully.", url: url });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message || "Internal Server Error" });
  }
};

//delete upload content from digital ocean storage
exports.deleteUploadContent = async (req, res) => {
  try {
    if (!req.body?.folderStructure || !req.body?.keyName) {
      return res.status(200).json({ status: false, message: "Oops ! Invalid details." });
    }

    await deleteFromSpace({ folderStructure: req.body?.folderStructure, keyName: req.body?.keyName });

    return res.status(200).json({ status: true, message: "finally, file deleted Successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message || "Internal Server Error" });
  }
};
