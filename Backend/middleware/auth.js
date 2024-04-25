const jwt = require('jsonwebtoken')
const axios = require('axios')

exports.protect = async (req,res,next) => {
    try{
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            const token = req.headers.authorization.split(' ')[1];
            if(!token){
                return res.status(200).json({
                    success: false,
                    message: "Unauthorized"
                });
            }
            console.log('Token ',token)
            const identity = jwt.verify(token,process.env.JWT_SECRET);
            console.log('Identity: ',identity);
            const options = {
                method: 'GET',
                url: 'http://localhost:4444/auth/validate',
                headers: {
                    'content-type': 'application/json',
                },
                data: {
                    user_id: identity.id,
                }
            };
            axios.request(options)
            .then(function (response) {
                if(!response.data.success || !hasAccess(req.url,response.data.role)){
                    return res.status(200).json({
                        success: false,
                        message: "Unauthorized"
                    })
                }
                req.body.user = {
                    id: identity.id,
                    user_type: response.data.role
                }
                
                next();
            })
            .catch(function (error) {
                return res.status(500).json({
                    success: false,
                    error: error.message
                })
            });

        }else{
            return res.status(200).json({
                success: false,
                message: "Unauthorized"
            })
        }

    }catch(err){
        if(err.name == 'JsonWebTokenError'){
        
            return res.status(400).json({
                success: false,
                error: 'Token unrecognized'
            })
        }else{
            return res.status(400).json({
                success: false,
                error: err.message
            })
        }
        
    }
}

function hasAccess(route, user_role){
    var rules = {
        '/login': ['*'],
        '/register': ['*'],
        '/getAudit': ['admin','patient','audit-1','audit-2','audit-3'],
        '/getPatient': ['admin','patient','audit-1','audit-2','audit-3'],
        '/addPatient': ['admin','audit-1','audit-2','audit-3'],
        '/updatePatient': ['admin','audit-1','audit-2','audit-3'],
        '/deletePatient': ['admin','audit-1','audit-2','audit-3'],
        '/getVRequests': ['admin'],
        '/verifyUser': ['admin']
    }
    return rules[route].includes(user_role);
}