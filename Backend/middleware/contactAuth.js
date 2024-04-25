const axios = require('axios')

function contactAuthServer(http_method, header_data, endpoint, request_data,res){
    const options = {
        method: http_method,
        url: 'http://localhost:4444'+endpoint,
        headers: header_data,
        data: request_data.body,
    };
    axios.request(options)
    .then(function (response) {
        return res.status(200).json(response.data)
    })
    .catch(function (error) {
        console.log('Error occured while contacting Auth server at '+endpoint, error)
        return res.status(500).json({
            success: false, 
            error: error.message
        })
    });
}

module.exports = contactAuthServer
