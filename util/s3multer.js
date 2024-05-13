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

// const multer = require("multer");
// const config = require("../config");
// const mysql = require("mysql");

// // Create MySQL connection
// const connection = mysql.createConnection({
//   host: 'localhost',
//   port: 8889, // Remove quotes, port should be a number
//   user: 'root',
//   password: 'root',
//   database: 'moviematric'
// });

// // Establish MySQL connection
// connection.connect(function(err) {
//   if (err) {
//     console.error('Error connecting to database:', err);
//     throw err; // Throw error if connection fails
//   }
//   console.log('Connected to MySQL database successfully!');
// });

// // Configure Multer for file upload
// const handleFileUpload = multer().single("content");

// // Handle file upload
// const upload = function (request, response) {
//   handleFileUpload(request, response, function (err) {
//     if (err) {
//       return response.status(400).send("Error uploading file.");
//     }

//     const folderStructure = request.body.folderStructure;
//     const keyName = request.body.keyName;
//     const file = request.file;

//     // Logic to handle file storage and database insertion
//     // For simplicity, let's assume you're storing the file content in a BLOB column in the database
//     const fileData = {
//       file_name: file.originalname,
//       content_type: file.mimetype,
//       file_size: file.size,
//       folder_structure: folderStructure,
//       key_name: keyName,
//       file_content: file.buffer // Assuming file.buffer contains the file content
//     };

//     // Insert file metadata into MySQL database
//     connection.query("INSERT INTO files SET ?", fileData, function (err, result) {
//       if (err) {
//         console.error('Error inserting file metadata into database:', err); // Print error for debugging
//         return response.status(500).send("Error inserting file metadata into database.");
//       }
      
//       response.send("File uploaded and metadata inserted into database.");
//     });
//   });
// };

// module.exports = upload;

