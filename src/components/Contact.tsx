import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "../data/resumeData";

gsap.registerPlugin(ScrollTrigger);

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [location, setLocation] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [isLocationInputOpen, setIsLocationInputOpen] = useState(false);

  // Email verification states
  const [email, setEmail] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoadingOTP, setIsLoadingOTP] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Contact form states
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoadingMessage, setIsLoadingMessage] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-form", {
        x: -60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-form", start: "top 80%" },
      });
      gsap.from(".contact-image", {
        x: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-image", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleLocationClick = () => {
    if (!navigator.geolocation) {
      setIsLocationInputOpen(true);
      return;
    }

    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Use reverse geocoding to get city/location name
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const locationName = data.address?.city || data.address?.town || data.address?.county || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          setLocation(locationName);
          setLocationError("");
          setIsLocationInputOpen(false);
        } catch (error) {
          // Fallback to coordinates if reverse geocoding fails
          setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          setLocationError("");
          setIsLocationInputOpen(false);
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (error) => {
        setIsLoadingLocation(false);
        setIsLocationInputOpen(true);
      }
    );
  };

  // Send OTP to email
  const handleSendOTP = async () => {
    if (!email || !email.includes("@")) {
      setOtpError("Please enter a valid email address");
      return;
    }

    setIsLoadingOTP(true);
    setOtpError("");

    try {
      const response = await fetch(`${API_URL}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, userName: "Friend" }),
      });

      const result = await response.json();

      if (result.success) {
        setIsOTPSent(true);
        setTimeLeft(Math.floor((result.expiryTime || 120000) / 1000));
        setCanResend(false);
        startTimer(Math.floor((result.expiryTime || 120000) / 1000));
      } else {
        setOtpError(result.message);
      }
    } catch (error) {
      setOtpError("Failed to send OTP. Please try again.");
      console.error("Error sending OTP:", error);
    } finally {
      setIsLoadingOTP(false);
    }
  };

  // Start countdown timer
  const startTimer = (seconds: number) => {
    if (timerRef.current) clearInterval(timerRef.current);

    let remaining = seconds;
    timerRef.current = setInterval(() => {
      remaining -= 1;
      setTimeLeft(remaining);

      if (remaining <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        setCanResend(true);
        setIsOTPSent(false);
      }
    }, 1000);
  };

  // Verify OTP (Unused - auto-verification handles this, but kept for reference)
  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 4) {
      setOtpError("Please enter a 4-digit OTP");
      return;
    }

    await verifyOTPFromAPI(email, otp);
  };

  // Format time display (mm:ss)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Verify OTP from API
  const verifyOTPFromAPI = async (userEmail: string, userOtp: string) => {
    setIsLoadingOTP(true);

    try {
      const response = await fetch(`${API_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, otp: userOtp }),
      });

      const result = await response.json();

      if (result.success) {
        setIsVerified(true);
        setOtpError("");
        if (timerRef.current) clearInterval(timerRef.current);
        setTimeLeft(0);
        setOtp("");
      } else {
        setOtpError(result.message);
        setOtp("");
      }
    } catch (error) {
      setOtpError("Verification failed. Please try again.");
      console.error("Error verifying OTP:", error);
      setOtp("");
    } finally {
      setIsLoadingOTP(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      setMessageError("Please enter a message");
      return;
    }

    setIsLoadingMessage(true);
    setMessageError("");
    setMessageSuccess("");

    try {
      const response = await fetch(`${API_URL}/send-contact-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          location,
          message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setMessageSuccess("Message sent successfully! Thank you for reaching out.");
        setMessage("");
        setName("");
        setLocation("");
        setEmail("");
        setIsVerified(false);
        // Clear success message after 5 seconds
        setTimeout(() => setMessageSuccess(""), 5000);
      } else {
        setMessageError(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessageError("Failed to send message. Please try again.");
    } finally {
      setIsLoadingMessage(false);
    }
  };

  const { contact } = resumeData;

  return (
    <section id="contact" ref={sectionRef} className="section-padding bg-secondary/50">
      <div className="section-container grid lg:grid-cols-2 gap-16 items-center">
        {/* Form side */}
        <div className="contact-form">
          <span className="section-label">Contact</span>
          <h2 className="section-heading mb-8">Let's Connect</h2>

          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="text-primary">📧</span> {contact.email}
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="text-primary">📱</span> {contact.phone}
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="text-primary">📍</span> {contact.location}
            </div>
            <div className="mt-2 flex items-center gap-4">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-muted-foreground transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-muted-foreground transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSendMessage}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <div className="relative">
                <input
                  type="text"
                  placeholder="Your Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onFocus={!location ? handleLocationClick : undefined}
                  readOnly={isLoadingLocation && !isLocationInputOpen}
                  className={`w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                    isLoadingLocation && !isLocationInputOpen ? "cursor-wait opacity-75" : ""
                  }`}
                  title={isLoadingLocation ? "Fetching your location..." : "Click to get your location, or type manually"}
                />
              </div>
            </div>

            {/* Email Verification Section */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isVerified}
                  className={`flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 ${
                    isVerified
                      ? "bg-primary/5 border-green-500 text-green-700"
                      : "focus:ring-primary/30"
                  } ${otpError && !isOTPSent ? "border-red-500" : ""}`}
                />
              <button
                type="button"
                onClick={handleSendOTP}
                disabled={isLoadingOTP || isVerified || canResend === false && isOTPSent}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  isVerified
                    ? "bg-green-500 text-white cursor-not-allowed opacity-100 hover:brightness-110"
                    : canResend
                    ? "bg-primary text-primary-foreground hover:-translate-y-0.5 hover:brightness-110"
                    : isOTPSent
                    ? "bg-primary/60 text-primary-foreground cursor-not-allowed opacity-60"
                    : "bg-primary text-primary-foreground hover:-translate-y-0.5 hover:brightness-110"
                }`}
              >
                {isVerified ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                    Verified
                  </span>
                ) : isLoadingOTP ? (
                  "Sending..."
                ) : canResend ? (
                  "Resend"
                ) : (
                  "Verify"
                )}
              </button>
              </div>

              {otpError && !isOTPSent && (
                <p className="text-xs text-red-500">{otpError}</p>
              )}
            </div>

            {/* OTP Input Section */}
            {isOTPSent && !isVerified && (
              <div className="flex gap-4 items-start">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                    setOtp(val);
                    setOtpError(""); // Clear error on input change
                    
                    // Auto-verify when 4 digits are entered
                    if (val.length === 4) {
                      verifyOTPFromAPI(email, val);
                    }
                  }}
                  disabled={isLoadingOTP}
                  maxLength={4}
                  className={`flex-1 px-4 py-3 rounded-xl border text-center text-lg font-semibold tracking-widest bg-background focus:outline-none transition-all ${
                    otpError
                      ? "border-red-500 bg-red-50/50 text-red-700"
                      : "border-border focus:ring-2 focus:ring-primary/30"
                  }`}
                />
                <div className="text-right pt-3 min-w-12">
                  {timeLeft > 0 ? (
                    <div className="text-sm font-semibold text-primary">
                      {formatTime(timeLeft)}
                    </div>
                  ) : (
                    <div className="text-xs text-red-500 font-semibold">
                      Expired
                    </div>
                  )}
                </div>
              </div>
            )}

            {otpError && isOTPSent && !isVerified && (
              <p className="text-xs text-red-500">{otpError}</p>
            )}

            <textarea
              placeholder="Your Message"
              rows={4}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setMessageError(""); // Clear error on input change
              }}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
            {messageError && (
              <p className="text-xs text-red-500">{messageError}</p>
            )}
            {messageSuccess && (
              <p className="text-xs text-green-500">{messageSuccess}</p>
            )}
            <button
              type="submit"
              disabled={!isVerified || isLoadingMessage}
              className={`btn-primary w-full ${
                !isVerified || isLoadingMessage ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {!isVerified
                ? "Verify Email First"
                : isLoadingMessage
                ? "Sending..."
                : "Send Message"}
            </button>
          </form>
        </div>

        {/* Image */}
        <div className="contact-image flex justify-center lg:justify-end">
          <img
            src="/images/ch-2.png"
            alt="Contact"
            className="w-72 md:w-96"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
