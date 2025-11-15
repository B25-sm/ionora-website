const DEFAULT_WHATSAPP_NUMBER = '+919203123452';

const envWhatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
const rawWhatsAppNumber =
  envWhatsappNumber && envWhatsappNumber.length > 0
    ? envWhatsappNumber
    : DEFAULT_WHATSAPP_NUMBER;

const sanitizedWhatsAppNumber = rawWhatsAppNumber.replace(/[\s+]/g, '');

export const HAS_WHATSAPP_NUMBER = sanitizedWhatsAppNumber.length > 0;

export const WHATSAPP_NUMBER = sanitizedWhatsAppNumber;

export const WHATSAPP_URL = HAS_WHATSAPP_NUMBER ? `https://wa.me/${sanitizedWhatsAppNumber}` : '';

export const getWhatsAppUrlWithMessage = (message?: string) => {
  if (!HAS_WHATSAPP_NUMBER) return '';
  if (!message) return WHATSAPP_URL;
  const encodedMessage = encodeURIComponent(message);
  return `${WHATSAPP_URL}?text=${encodedMessage}`;
};

