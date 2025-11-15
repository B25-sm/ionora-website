const {
  WHATSAPP_ACCESS_TOKEN,
  WHATSAPP_PHONE_NUMBER_ID,
  WHATSAPP_DEFAULT_COUNTRY_CODE,
} = process.env;

const WHATSAPP_GRAPH_API_VERSION = process.env.WHATSAPP_GRAPH_API_VERSION ?? "v18.0";
const WHATSAPP_BASE_URL = `https://graph.facebook.com/${WHATSAPP_GRAPH_API_VERSION}`;

const normalizePhoneNumber = (input) => {
  if (!input) {
    return null;
  }

  const digits = input.replace(/\D/g, "");
  if (!digits) {
    return null;
  }

  if (WHATSAPP_DEFAULT_COUNTRY_CODE) {
    const countryDigits = WHATSAPP_DEFAULT_COUNTRY_CODE.replace(/\D/g, "");
    if (countryDigits && !digits.startsWith(countryDigits)) {
      return `${countryDigits}${digits}`;
    }
  }

  return digits;
};

const ensureWhatsAppConfig = () => {
  if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
    console.warn(
      "WhatsApp credentials are not fully configured. Skipping WhatsApp message send.",
    );
    return false;
  }

  if (typeof fetch !== "function") {
    console.error(
      "Global fetch is not available. Please ensure you are running on Node.js 18+.",
    );
    return false;
  }

  return true;
};

export const sendWhatsAppMessage = async ({ to, body }) => {
  if (!ensureWhatsAppConfig()) {
    return { success: false, skipped: true };
  }

  const normalizedPhone = normalizePhoneNumber(to);
  if (!normalizedPhone) {
    console.warn("Invalid or missing phone number for WhatsApp message. Skipping send.");
    return { success: false, skipped: true };
  }

  try {
    const response = await fetch(
      `${WHATSAPP_BASE_URL}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: normalizedPhone,
          type: "text",
          text: {
            preview_url: true,
            body,
          },
        }),
      },
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Failed to send WhatsApp message:", response.status, errorBody);
      return {
        success: false,
        error: new Error(`WhatsApp API responded with ${response.status}`),
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected error while sending WhatsApp message:", error);
    return { success: false, error };
  }
};

export const sendWelcomeWhatsAppMessage = async ({
  name,
  phone,
  verificationLink,
}) => {
  const greetingName = name?.trim() || "Ionora Explorer";
  const linkText = verificationLink
    ? `\n\n✅ Give your email a quick tap to stay in the loop: ${verificationLink}`
    : "";

  const body = `Hey ${greetingName}! 🎉\n\nWelcome to Ionora – where smarter hydration starts. You now have access to curated ionizer insights, comparison tools, and wellness content tailored for you.${linkText}\n\nNeed a hand getting started? Reply here and our hydration specialists will take it from there.\n\nStay energized,\nTeam Ionora`;

  return sendWhatsAppMessage({ to: phone, body });
};

export const sendWelcomeBackWhatsAppMessage = async ({
  name,
  phone,
  dashboardLink,
}) => {
  const greetingName = name?.trim() || "Ionora Explorer";
  const linkText = dashboardLink
    ? `\n\n⚡ Jump back in: ${dashboardLink}`
    : "";

  const body = `Hi ${greetingName}, great to have you back at Ionora! 💧\n\nFresh product comparisons, hydration insights, and support are ready whenever you are.${linkText}\n\nIf you want a personalised recommendation, just reply and we’ll help you out.\n\nCheers,\nTeam Ionora`;

  return sendWhatsAppMessage({ to: phone, body });
};

export default {
  sendWhatsAppMessage,
  sendWelcomeWhatsAppMessage,
  sendWelcomeBackWhatsAppMessage,
};








