const sgMail = require('@sendgrid/mail');

exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405
        };
    }
    let user = "chat";
    let domain = "chatsumlin.com";
    let requestBody = JSON.parse(event.body);

    function validateBody(body) {
        if (!('name' in body)) {
            throw new Error('Name is required ')
        }
        if (!('email' in body)) {
            throw new Error('Email is required ')
        }
        if (!('phone' in body)) {
            throw new Error('Phone is required ')
        }
        if (!('company' in body)) {
            throw new Error('Company is required ')
        }
        for (var prop in body) {
            if (body[prop] === "") {
                throw new Error(prop + " cannot be empty.")
            }
        }
    }

    validateBody(requestBody);
    let emailBody = ` - Name: ${requestBody.name} <br/>
     - Email: ${requestBody.email} <br/>
     - Phone: ${requestBody.phone} <br/>
     - Company: ${requestBody.company} <br/>
     - Message: ${requestBody.message} <br/>
     `;
    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to:`${user}@${domain}`,
            from: `${user}@${domain}`,
            subject: 'New form submission from portfolio',
            text: emailBody,
            html: emailBody,
        };
        return sgMail.send(msg).then((result) => {
            return {
                statusCode: 200,
                body: JSON.stringify({sent:true})
            }
        }).catch((e) => {
            return {
                statusCode: 400,
                body: JSON.stringify(e)
            }
        });


    } catch (e) {
        return {
            statusCode: 400,
            body: JSON.stringify({error: "Failed to get guild"})
        };
    }
}