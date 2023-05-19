const axios = require('axios');

const uploadSeaweed = async(file, url, folder, fileName) =>
{
    var formData = {
        file: file.buffer
    }
    try {
        const response = await axios({
            method: "post",
            url: `${url}/${folder}/${fileName}.jpg`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
        })
        return `${url}/${folder}/${fileName}.jpg`;
    } catch(err) {
        console.log(err);
    }
    
}
module.exports = uploadSeaweed;