const cloudinary = require ('cloudinary')

cloudinary.config({ 
    cloud_name: 'shalu', 
    api_key: '287145567346563', 
    api_secret: 'XC1P5K5CJJFRR9xCSPFcAUHBma4' 
  });

module.exports = cloudinary