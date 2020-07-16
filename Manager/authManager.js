var query_manager = require("../Functions/QueryManager");
const HttpStatus = require("http-status-codes");

async function sign_in_manager(mail, password) {
  let result = await query_manager.ExecuteQuery(
    `SELECT * FROM Login('${mail}', '${password}');`
  );
  if (result["status"] == HttpStatus.CONTINUE) {
    try {
      result = result["msg"]["rows"][0];
      console.log(result);
      if (result["code"] === 1) {
        result = {
          code: result["code"],
          status: HttpStatus.CONTINUE,
          msg: result["msg"],
          data: { id: result["id"] },
        };
      } else {
        result = {
          code: result["code"],
          status: HttpStatus.EXPECTATION_FAILED,
          msg: result["msg"],
        };
      }
    } catch (err) {
      result = { status: HttpStatus.INTERNAL_SERVER_ERROR, msg: "" };
    }
  }
  return result;
}

async function get_info_manager(user_id) {
  let result = await query_manager.ExecuteQuery(
    `SELECT * FROM Getprofile(${user_id})`
  );
  if (result["status"] == HttpStatus.CONTINUE) {
    try {
      result = result["msg"]["rows"][0];
      if (result["code"] === 1) {
        result = {
          code: result["code"],
          status: HttpStatus.CONTINUE,
          msg: result["msg"],
          data: {
            id: result["id_user"],
            userName: result["username"],
            email: result["mail"],
            cellphone: result["cellphone"] == null ? "" : result["cellphone"],
            address: result["address"] == null ? "" : result["address"],
          },
        };
      } else {
        result = {
          code: result["code"],
          status: HttpStatus.EXPECTATION_FAILED,
          msg: result["msg"],
        };
      }
    } catch (err) {
      result = { status: HttpStatus.INTERNAL_SERVER_ERROR, msg: "" };
    }
  }
  return result;
}

async function sign_up_manager(username, mail, password) {
  let result = await query_manager.ExecuteQuery(
    `SELECT * FROM Signup('${username}', '${mail}', '${password}')`
  );
  if (result["status"] == HttpStatus.CONTINUE) {
    result = await query_manager.checkTF(result["msg"]);
  }
  return result;
}

module.exports = {
  sign_in_manager,
  sign_up_manager,
  get_info_manager,
};
