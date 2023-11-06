const ElasticEmail = require("@elasticemail/elasticemail-client");

require("dotenv").config();

const { ELASTIC_API_KEY } = process.env;

const defaultClient = ElasticEmail.ApiClient.instance;

const { apikey } = defaultClient.authentications;
apikey.apiKey = ELASTIC_API_KEY;

const api = new ElasticEmail.EmailsApi();

const sendDataToEmail = ({ name, email, phone, message }) => {
  const emailToSend = ElasticEmail.EmailMessageData.constructFromObject({
    Recipients: [new ElasticEmail.EmailRecipient("sevapa7888@mainmile.com")],
    Content: {
      Body: [
        ElasticEmail.BodyPart.constructFromObject({
          ContentType: "HTML",
          Content: `<strong>Congratulations, you have received a new request: </strong><br /> <hr /><br />Name: ${
            name ? name : ""
          } <br /> Phone: ${
            phone ? phone : ""
          } <br /> Email: ${email} <br /> Message: ${message ? message : ""}`,
        }),
      ],
      Subject: `New study request from ${name}`,
      From: "landing-english@mail.com",
    },
  });

  var callback = function (error, data, response) {
    if (error) {
      console.error(error);
    } else {
      console.log("API called successfully.");
    }
  };
  api.emailsPost(emailToSend, callback);
};

module.exports = { sendDataToEmail };
