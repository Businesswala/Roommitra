import Razorpay from 'razorpay';
import crypto from 'crypto';

// Initialize Razorpay instance
// In a real environment, ensure these are configured in .env
export const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_mock123',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'rzp_test_secret_mock456',
});

/**
 * Utility to verify Razorpay signatures securely on the server
 */
export const verifyRazorpaySignature = (
  orderId: string,
  paymentId: string,
  signature: string
) => {
  const secret = process.env.RAZORPAY_KEY_SECRET || 'rzp_test_secret_mock456';
  const generatedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return generatedSignature === signature;
};
