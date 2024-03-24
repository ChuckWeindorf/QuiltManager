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
    //console.log(tmpData);
    if (tmpData.length == 1)
       {return true}
    else {return false};
};

module.exports = { checkLogin }