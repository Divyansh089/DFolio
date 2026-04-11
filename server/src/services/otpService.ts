// In-memory OTP storage (for development)
// For production, use Redis or MongoDB
interface OTPRecord {
  otp: string;
  email: string;
  expiresAt: number;
  attempts: number;
}

const otpStore = new Map<string, OTPRecord>();

export const generateOTP = (length: number = 4): string => {
  return Math.floor(Math.random() * Math.pow(10, length))
    .toString()
    .padStart(length, "0");
};

export const storeOTP = (email: string, otp: string, expiryMs: number = 120000): void => {
  const expiresAt = Date.now() + expiryMs;
  otpStore.set(email, {
    otp,
    email,
    expiresAt,
    attempts: 0,
  });
};

export const verifyOTP = (email: string, otp: string): boolean => {
  const record = otpStore.get(email);

  if (!record) {
    return false;
  }

  // Check if OTP has expired
  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    return false;
  }

  // Check if OTP matches
  if (record.otp === otp) {
    otpStore.delete(email); // Clear OTP after successful verification
    return true;
  }

  // Increment attempts
  record.attempts += 1;
  return false;
};

export const getOTPExpiry = (email: string): number | null => {
  const record = otpStore.get(email);
  if (!record) return null;

  const remaining = record.expiresAt - Date.now();
  return remaining > 0 ? remaining : null;
};

export const deleteOTP = (email: string): void => {
  otpStore.delete(email);
};

export const isOTPExpired = (email: string): boolean => {
  const record = otpStore.get(email);
  if (!record) return true;
  return Date.now() > record.expiresAt;
};
