const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const config = require("../config");

const s3 = new aws.S3({
  accessKeyId: config?.aws_access_key_id,
  secretAccessKey: config?.aws_secret_access_key,
  endpoint: new aws.Endpoint(config?.hostName),
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config?.bucketName,
    key: function (request, file, cb) {
      console.log("file in s3multer:     " + file);
      console.log("request in s3multer:  ", request.body);

      const folderStructure = request.body.folderStructure;
      const keyName = request.body.keyName;

      const Key = `${folderStructure}/${keyName}`;
      cb(null, Key);
    },
  }),
}).single("content");

module.exports = upload;
