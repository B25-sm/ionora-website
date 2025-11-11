import sendgridMail from "@sendgrid/mail";

const { SENDGRID_API_KEY, SENDGRID_FROM_EMAIL, SENDGRID_FROM_NAME } = process.env;

if (SENDGRID_API_KEY) {
  sendgridMail.setApiKey(SENDGRID_API_KEY);
} else {
  console.warn("SENDGRID_API_KEY is not set. Emails will not be sent.");
}

const defaultFrom = {
  email: SENDGRID_FROM_EMAIL ?? "no-reply@example.com",
  name: SENDGRID_FROM_NAME ?? "Ionora",
};

const baseEmailStyles = `
  font-family: Arial, Helvetica, sans-serif;
  color: #1b1b1f;
  background-color: #f5f7fb;
  padding: 0;
  margin: 0;
`;

const buttonStyles = `
  display: inline-block;
  padding: 12px 24px;
  border-radius: 6px;
  background-color: #0058ff;
  color: #ffffff !important;
  text-decoration: none;
  font-weight: 600;
`;

const cardStyles = `
  background-color: #ffffff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 6px 24px rgba(0, 40, 120, 0.08);
`;

const buildEmailShell = (content) => `
  <div style="${baseEmailStyles}">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr>
        <td align="center" style="padding: 40px 16px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 640px;">
            <tr>
              <td>
                <div style="${cardStyles}">
                  ${content}
                </div>
                <p style="text-align: center; color: #62636a; font-size: 12px; margin-top: 24px;">
                  You are receiving this email because you have an account with Ionora.
                  If this was not you, please <a href="mailto:support@ionora.in" style="color: #0058ff;">contact support</a>.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
`;

export const welcomeEmail = (name, email, verificationLink) => {
  const hasVerificationLink = Boolean(verificationLink && verificationLink !== "#");

  const content = `
    <img src="https://ionora.in/logo.png" alt="Ionora" width="120" style="display:block;margin:0 auto 24px;" />
    <h1 style="font-size: 28px; line-height: 1.3; margin: 0 0 16px; text-align:center;">Welcome to Ionora, ${name ?? "there"}!</h1>
    <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
      We’re thrilled to have you join the Ionora community—where hydration meets innovation.
      Your new account unlocks curated product recommendations, smarter comparison tools,
      and insider access to the science behind alkaline hydration.
    </p>
    ${
      hasVerificationLink
        ? `
          <p style="text-align: center; margin: 24px 0;">
            <a href="${verificationLink}" style="${buttonStyles}">Verify My Email</a>
          </p>
          <p style="font-size: 14px; color: #444956; line-height: 1.6; margin: 0 0 24px;">
            Verifying your email helps us secure your account and tailor recommendations just for you.
          </p>
        `
        : ""
    }
    <h2 style="font-size: 20px; margin: 24px 0 12px;">Here’s how to make the most of Ionora:</h2>
    <ul style="padding-left: 18px; margin: 0 0 24px; color: #25252b; line-height: 1.6;">
      <li><strong>Discover your perfect ionizer:</strong> explore detailed specs, comparisons, and expert picks.</li>
      <li><strong>Track your wellness goals:</strong> stay updated on the latest hydration tips and recipes.</li>
      <li><strong>Get priority support:</strong> our specialists are on standby to help you customize your setup.</li>
    </ul>
    <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
      We’ll be checking in with tailored updates and invites to exclusive Ionora events. Until then,
      dive into your dashboard and start exploring the possibilities.
    </p>
    <p style="font-size: 16px; line-height: 1.6; margin: 0;">
      Stay energized,<br />
      <strong>The Ionora Team</strong>
    </p>
  `;

  return {
    to: email,
    subject: "Welcome to Ionora – Let’s Elevate Your Hydration",
    html: buildEmailShell(content),
  };
};

export const welcomeBackEmail = (name, email) => {
  const content = `
    <img src="https://ionora.in/logo.png" alt="Ionora" width="120" style="display:block;margin:0 auto 24px;" />
    <h1 style="font-size: 28px; line-height: 1.3; margin: 0 0 16px; text-align:center;">Welcome back, ${name ?? "Ionora Explorer"}!</h1>
    <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
      We noticed you just signed in to Ionora—great choice! Fresh personalized insights, new comparison
      tools, and the latest hydration breakthroughs are waiting for you.
    </p>
    <h2 style="font-size: 20px; margin: 24px 0 12px;">Pick up where you left off:</h2>
    <ul style="padding-left: 18px; margin: 0 0 24px; color: #25252b; line-height: 1.6;">
      <li><strong>Check your saved ionizers:</strong> revisit your shortlists and compare upgrades instantly.</li>
      <li><strong>Explore wellness stories:</strong> get inspired by real transformations powered by Ionora.</li>
      <li><strong>Talk to a hydration expert:</strong> reply to this email and we’ll schedule a complimentary consultation.</li>
    </ul>
    <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
      Let’s keep the momentum going—your journey to smarter hydration continues now.
    </p>
    <p style="text-align: center; margin: 24px 0;">
      <a href="https://ionora.in/dashboard" style="${buttonStyles}">Open My Dashboard</a>
    </p>
    <p style="font-size: 16px; line-height: 1.6; margin: 0;">
      Always here for you,<br />
      <strong>The Ionora Team</strong>
    </p>
  `;

  return {
    to: email,
    subject: "Great to See You Again at Ionora!",
    html: buildEmailShell(content),
  };
};

export const passwordResetEmail = (name, email, resetLink) => ({
  to: email,
  subject: "Reset Your Password",
  html: `
      <h1>Password Reset Request</h1>
      <p>Hello ${name ?? ""},</p>
      <p>We received a request to reset your password. Click the link below to create a new password.</p>
      <p><a href="${resetLink}">Reset Password</a></p>
      <p>If you did not request a password reset, you can safely ignore this message.</p>
    `,
});

export const orderConfirmationEmail = (order, user) => {
  const itemsList = (order.items || [])
    .map(
      (item) =>
        `<li>${item.quantity} &times; ${item.name} - &#8377;${Number.parseFloat(
          item.price_at_purchase,
        ).toFixed(2)}</li>`,
    )
    .join("");

  return {
    to: user.email,
    subject: `Order Confirmation - ${order.order_number}`,
    html: `
      <h1>Thank you for your purchase, ${user.full_name ?? ""}!</h1>
      <p>Your order <strong>${order.order_number}</strong> has been confirmed.</p>
      <ul>${itemsList}</ul>
      <p>Total: &#8377;${Number.parseFloat(order.total_amount).toFixed(2)}</p>
      <p>We will notify you when your items have shipped.</p>
    `,
  };
};

export const orderShippedEmail = (order, user, trackingNumber) => ({
  to: user.email,
  subject: `Your Order ${order.order_number} has Shipped`,
  html: `
      <h1>Good news, ${user.full_name ?? ""}!</h1>
      <p>Your order <strong>${order.order_number}</strong> is on its way.</p>
      <p>Tracking Number: ${trackingNumber ?? "N/A"}</p>
      <p>You can use the tracking number to check the delivery status.</p>
    `,
});

export const orderDeliveredEmail = (order, user) => ({
  to: user.email,
  subject: `Order ${order.order_number} Delivered`,
  html: `
      <h1>Hi ${user.full_name ?? ""},</h1>
      <p>Your order <strong>${order.order_number}</strong> has been delivered.</p>
      <p>We hope you enjoy your purchase! If you have any questions, reply to this email.</p>
    `,
});

const resolveTemplate = (template, data) => {
  if (typeof template === "function") {
    if (Array.isArray(data)) {
      return template(...data);
    }
    if (data && typeof data === "object") {
      return template(data);
    }
    return template(data);
  }

  return template;
};

export const sendEmail = async (template, data) => {
  if (!SENDGRID_API_KEY) {
    console.warn("SendGrid API key is missing. Skipping email send.");
    return { success: false, skipped: true };
  }

  try {
    const message = resolveTemplate(template, data);

    if (!message?.to) {
      throw new Error("Email template must include a recipient.");
    }

    const msg = {
      to: message.to,
      from: defaultFrom,
      subject: message.subject,
      html: message.html,
    };

    await sendgridMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
};

export default {
  welcomeEmail,
  welcomeBackEmail,
  passwordResetEmail,
  orderConfirmationEmail,
  orderShippedEmail,
  orderDeliveredEmail,
  sendEmail,
};

