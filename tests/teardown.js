let server=require("../index")
module.exports = async function () {
  console.log("-------teardown called---------");
  process.exit(0)
  server.exit(0)
};
