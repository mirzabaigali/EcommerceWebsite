const nodemailer = require("nodemailer");

const sendContactEmail = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_ADDRESS,
      subject: "New Contact Form Submission",
      html: `
          <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <h2 style="color: #333;">New Contact Form Submission</h2>
            <div style="background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
            </div>
          </div>
        `,
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  sendContactEmail,
};
