// const { LexModelBuildingService } = require('aws-sdk');
const jwt = require('jsonwebtoken');
// const { userList } = require('./module/v1/user/userDao');

function genJwtToken(userInfo){
const accessToken = jwt.sign({
    id : userInfo._id,
    email : userInfo.email
},process.env.JWT_SECRET_KEY )

return accessToken
}

function verifyToken(token){
        const user =  jwt.verify(token ,process.env.JWT_SECRET_KEY)
        return user
   
}


module.exports = {
    genJwtToken,
    verifyToken
}