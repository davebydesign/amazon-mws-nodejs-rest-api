var
	nodemailer   = require('nodemailer'),
	transporter  = nodemailer.createTransport();

module.exports = {
	email : function(subject, text) {
	    if (!text) {
	        text = '';
	    }
	    transporter.sendMail({
	        from    : 'node@aws',
	        to      : 'davecoon@bookbuyers.com',
	        subject : subject,
	        text    : text
	    }); 
	}

};