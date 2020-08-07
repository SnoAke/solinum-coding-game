// This was tested with my email address.

module.exports = {
  transport: {
    host: "smtp.example.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "username",
      pass: "password"
    }
  },
  admin_email: "test@example.com",
  standard_email: "test@example.com",
};
