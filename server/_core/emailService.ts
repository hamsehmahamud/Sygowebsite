import { ENV } from "./env";

export type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

/**
 * Sends an email using the Manus built-in email service.
 * Returns true if successful, false if the service is unavailable.
 */
export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
    console.warn("[Email] Email service not configured");
    return false;
  }

  const endpoint = new URL(
    "webdevtoken.v1.WebDevService/SendEmail",
    ENV.forgeApiUrl.endsWith("/") ? ENV.forgeApiUrl : `${ENV.forgeApiUrl}/`
  ).toString();

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1",
      },
      body: JSON.stringify({
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Email] Failed to send email (${response.status} ${response.statusText})${
          detail ? `: ${detail}` : ""
        }`
      );
      return false;
    }

    return true;
  } catch (error) {
    console.warn("[Email] Error sending email:", error);
    return false;
  }
}

/**
 * Sends a donation confirmation email to the donor.
 */
export async function sendDonationConfirmationEmail(
  donorEmail: string,
  donorName: string | undefined,
  amount: number
): Promise<boolean> {
  const name = donorName || "Valued Donor";
  const amountFormatted = (amount / 100).toFixed(2); // Assuming amount is in cents

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #7209B7 0%, #F72585 100%); padding: 20px; border-radius: 10px; color: white; text-align: center;">
        <h1 style="margin: 0; font-size: 28px;">🎉 Thank You for Your Donation!</h1>
      </div>
      
      <div style="padding: 30px; background: #f9f9f9; border-radius: 10px; margin-top: 20px;">
        <p style="font-size: 16px; color: #333;">Dear ${name},</p>
        
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          We are deeply grateful for your generous donation of <strong>$${amountFormatted}</strong> to SYGO (Somali Youth Growth Mind Organization). Your support makes a real difference in the lives of young people, especially young women and girls, in our community.
        </p>
        
        <div style="background: white; padding: 20px; border-left: 4px solid #4CC9F0; margin: 20px 0; border-radius: 5px;">
          <p style="margin: 0; font-size: 14px; color: #666;">
            <strong>Donation Amount:</strong> $${amountFormatted}<br>
            <strong>Date:</strong> ${new Date().toLocaleDateString()}<br>
            <strong>Organization:</strong> SYGO - Youth Empowerment
          </p>
        </div>
        
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          Your contribution will help us continue our mission to empower youth through skills development, leadership training, and economic opportunities. Together, we are creating positive social and economic change.
        </p>
        
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          If you have any questions or would like to learn more about our programs, please don't hesitate to reach out.
        </p>
        
        <p style="font-size: 16px; color: #333;">
          With heartfelt gratitude,<br>
          <strong>The SYGO Team</strong>
        </p>
      </div>
      
      <div style="padding: 20px; text-align: center; color: #999; font-size: 12px; border-top: 1px solid #ddd; margin-top: 20px;">
        <p>SYGO - Somali Youth Growth Mind Organization<br>
        Jigjiga City, Ethiopia<br>
        <a href="mailto:sygoacorg@gmail.com" style="color: #4CC9F0; text-decoration: none;">sygoacorg@gmail.com</a></p>
      </div>
    </div>
  `;

  return sendEmail({
    to: donorEmail,
    subject: "Thank You for Your Donation to SYGO",
    html,
  });
}

/**
 * Sends a new donation alert email to admin.
 */
export async function sendNewDonationAlertEmail(
  adminEmail: string,
  donorName: string | undefined,
  donorEmail: string,
  amount: number,
  message: string | undefined
): Promise<boolean> {
  const name = donorName || "Anonymous";
  const amountFormatted = (amount / 100).toFixed(2);

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #7209B7; padding: 20px; border-radius: 10px; color: white; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">💝 New Donation Received!</h1>
      </div>
      
      <div style="padding: 30px; background: #f9f9f9; border-radius: 10px; margin-top: 20px;">
        <h2 style="color: #7209B7; margin-top: 0;">Donation Details</h2>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 10px; font-weight: bold; color: #333;">Donor Name:</td>
            <td style="padding: 10px; color: #666;">${name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 10px; font-weight: bold; color: #333;">Donor Email:</td>
            <td style="padding: 10px; color: #666;"><a href="mailto:${donorEmail}" style="color: #4CC9F0;">${donorEmail}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 10px; font-weight: bold; color: #333;">Amount:</td>
            <td style="padding: 10px; color: #F72585; font-size: 18px; font-weight: bold;">$${amountFormatted}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 10px; font-weight: bold; color: #333;">Date:</td>
            <td style="padding: 10px; color: #666;">${new Date().toLocaleString()}</td>
          </tr>
          ${
            message
              ? `<tr>
            <td style="padding: 10px; font-weight: bold; color: #333;">Message:</td>
            <td style="padding: 10px; color: #666;">${message}</td>
          </tr>`
              : ""
          }
        </table>
        
        <p style="margin-top: 20px; padding: 15px; background: #E0FBFC; border-radius: 5px; color: #333;">
          <strong>Action:</strong> Please acknowledge receipt and send a thank you email to the donor if needed.
        </p>
      </div>
    </div>
  `;

  return sendEmail({
    to: adminEmail,
    subject: `New Donation: $${amountFormatted} from ${name}`,
    html,
  });
}

/**
 * Sends a newsletter subscription confirmation email.
 */
export async function sendNewsletterConfirmationEmail(
  subscriberEmail: string
): Promise<boolean> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #4CC9F0 0%, #7209B7 100%); padding: 20px; border-radius: 10px; color: white; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">✅ Welcome to SYGO Newsletter!</h1>
      </div>
      
      <div style="padding: 30px; background: #f9f9f9; border-radius: 10px; margin-top: 20px;">
        <p style="font-size: 16px; color: #333;">Hello,</p>
        
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          Thank you for subscribing to the SYGO newsletter! You're now part of our community and will receive updates about our latest programs, interventions, and impact stories.
        </p>
        
        <div style="background: white; padding: 20px; border-left: 4px solid #FFD60A; margin: 20px 0; border-radius: 5px;">
          <h3 style="margin-top: 0; color: #7209B7;">What to Expect:</h3>
          <ul style="color: #333; line-height: 1.8;">
            <li>Monthly updates on our youth empowerment programs</li>
            <li>Success stories from young leaders we've trained</li>
            <li>Information about upcoming events and opportunities</li>
            <li>Ways you can get involved and support our mission</li>
          </ul>
        </div>
        
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          If you have any questions or would like to unsubscribe, you can do so at any time by replying to this email.
        </p>
        
        <p style="font-size: 16px; color: #333;">
          Best regards,<br>
          <strong>The SYGO Team</strong>
        </p>
      </div>
      
      <div style="padding: 20px; text-align: center; color: #999; font-size: 12px; border-top: 1px solid #ddd; margin-top: 20px;">
        <p>SYGO - Somali Youth Growth Mind Organization<br>
        Jigjiga City, Ethiopia<br>
        <a href="mailto:sygoacorg@gmail.com" style="color: #4CC9F0; text-decoration: none;">sygoacorg@gmail.com</a></p>
      </div>
    </div>
  `;

  return sendEmail({
    to: subscriberEmail,
    subject: "Welcome to SYGO Newsletter",
    html,
  });
}
