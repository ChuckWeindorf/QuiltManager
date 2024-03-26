const quiltQuery = require("../database/connection");

/**
 *
 * @param {login, password} Check for valid account
 * @returns T/F
 */
async function checkLogin(login, password)
{
    tmpData = await quiltQuery("SELECT * FROM login WHERE LoginName = ? AND LoginPass = MD5(?)", 
       [ login, password ]);
    if (tmpData.length == 1)
       {return "accepted"}
    else {return "denied"};
};

module.exports = { checkLogin }