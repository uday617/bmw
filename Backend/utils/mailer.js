const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

async function sendTestDriveConfirmation({ to, name, vehicle, city, date }) {
  const formattedDate = new Date(date).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8"/>
      <style>
        body { margin:0; padding:0; background:#f4f4f4; font-family: Arial, sans-serif; }
        .wrapper { max-width:600px; margin:40px auto; background:#ffffff; }
        .header { background:#1a1a1a; padding:32px 40px; }
        .blue-bar { background:#0066cc; height:4px; }
        .body { padding:40px; }
        .title { font-size:26px; font-weight:300; color:#1a1a1a; margin:0 0 8px; }
        .subtitle { font-size:14px; color:#666; margin:0 0 32px; }
        .card { border:1px solid #e5e5e5; padding:24px; margin-bottom:24px; }
        .card-title { font-size:11px; font-weight:700; letter-spacing:2px; color:#999; text-transform:uppercase; margin-bottom:16px; }
        .detail-row { display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #f0f0f0; font-size:14px; }
        .detail-row:last-child { border-bottom:none; }
        .detail-label { color:#999; }
        .detail-value { color:#1a1a1a; font-weight:500; }
        .status-badge { display:inline-block; background:#fff3cd; color:#856404; padding:4px 12px; font-size:12px; font-weight:600; border-radius:2px; margin-bottom:24px; }
        .message { font-size:14px; color:#555; line-height:1.8; margin-bottom:24px; }
        .footer { background:#f8f8f8; padding:24px 40px; border-top:1px solid #e5e5e5; }
        .footer p { font-size:12px; color:#999; margin:4px 0; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <div style="color:white; font-size:22px; font-weight:300; letter-spacing:4px;">BMW</div>
        </div>
        <div class="blue-bar"></div>
        <div class="body">
          <p style="font-size:13px; color:#0066cc; font-weight:600; letter-spacing:2px; text-transform:uppercase; margin:0 0 12px;">TEST DRIVE REQUEST</p>
          <h1 class="title">Thank you, ${name}.</h1>
          <p class="subtitle">Your test drive request has been received successfully.</p>
          <span class="status-badge">⏳ Pending Confirmation</span>
          <p class="message">
            We have received your request to experience the <strong>${vehicle}</strong>.
            Your BMW Dealer in <strong>${city}</strong> will contact you within <strong>24–48 hours</strong>
            to confirm your test drive appointment.
          </p>
          <div class="card">
            <div class="card-title">Booking Details</div>
            <div class="detail-row"><span class="detail-label">Vehicle</span><span class="detail-value">${vehicle}</span></div>
            <div class="detail-row"><span class="detail-label">Customer</span><span class="detail-value">${name}</span></div>
            <div class="detail-row"><span class="detail-label">City</span><span class="detail-value">${city}</span></div>
            <div class="detail-row"><span class="detail-label">Applied On</span><span class="detail-value">${formattedDate}</span></div>
            <div class="detail-row"><span class="detail-label">Status</span><span class="detail-value">Pending Dealer Confirmation</span></div>
          </div>
          <p class="message" style="font-size:13px;">
            You can view the status of your test drive anytime in your <strong>My Bookings</strong> section.
          </p>
        </div>
        <div class="footer">
          <p><strong>BMW India</strong></p>
          <p>This is an automated confirmation email. Please do not reply.</p>
          <p style="margin-top:12px;">© ${new Date().getFullYear()} BMW India. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"BMW India" <${process.env.GMAIL_USER}>`,
    to,
    subject: `Your BMW Test Drive Request – ${vehicle}`,
    html,
  });
}

module.exports = { sendTestDriveConfirmation };