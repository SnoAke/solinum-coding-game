module.exports = {
  transport: {
    host: "smtp.example.com",
    port: 587,
    secure: false,
    auth: {
      user: "username",
      pass: "password"
    }
  },
  admin_mail: "malo@solinum.org",         // Email of the person that will receive the new poi created email
  standard_email: "test@example.com",     // Email from which every email will be sent
};
