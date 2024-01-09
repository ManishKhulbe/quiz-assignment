const userDao = require('../Dao/userdao')
const appUtils = require('../service/appUtils')
const jwtHandler = require('../service/jwthandler')

async function signUp(userInfo){
userInfo.password = appUtils.encryptHashPassword(userInfo.password , 10)
const result =  await userDao.signUp(userInfo)
return result
}

async function logIn(userInfo){
    const result =  await userDao.logIn(userInfo.email)
    const matchPass =  await appUtils.verifyEncyptedPassword(userInfo.password,result.password )
    if(matchPass){
        let AccessToken = jwtHandler.genJwtToken(result)
        return {
            "AccessToken" : AccessToken,
            "UserInfo":result
        }
        }
        else{
            return {
                "Error" : "Invalid Password"
            }
        }
    }
    

    
async function logOut(userInfo){
        const result =  redisClient.deleteValue(userInfo.email)
        return result
        }

module.exports={
    signUp,
    logIn,
    logOut
};

