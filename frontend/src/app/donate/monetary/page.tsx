"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ArrowLeft,
  Check,
  Copy,
  Building2,
  Smartphone,
  QrCode,
  CreditCard,
  Shield,
  Gift,
  Users,
  Sparkles,
  ChevronRight,
  IndianRupee,
} from "lucide-react";
import NavigationHeader from "@/components/sections/navigation-header";
import { Component as FlickeringFooter } from "@/components/ui/flickering-footer";

const presetAmounts = [500, 1000, 2500, 5000, 10000, 25000];

const impactData = [
  { amount: 500, impact: "Provides a health checkup for 1 person" },
  { amount: 1000, impact: "Feeds a family for a week" },
  { amount: 2500, impact: "Funds medication for 5 patients" },
  { amount: 5000, impact: "Sponsors a child's education for a month" },
  { amount: 10000, impact: "Supports a community health camp" },
  { amount: 25000, impact: "Enables a life-saving surgery" },
];

const bankDetails = {
  bankName: "State Bank of India",
  accountName: "Chiranjeevi Charitable Trust",
  accountNumber: "38985672410",
  ifscCode: "SBIN0001234",
  branch: "Jubilee Hills, Hyderabad",
};

const upiId = "cct@sbi";

export default function MonetaryDonationPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [activeTab, setActiveTab] = useState<"upi" | "bank" | "card">("upi");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    panNumber: "",
    message: "",
  });
  const [copied, setCopied] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;

  const getImpact = (amount: number | null) => {
    if (!amount) return null;
    const impact = impactData.find((i) => i.amount <= amount);
    return impactData.reverse().find((i) => amount >= i.amount)?.impact || impactData[0].impact;
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      <NavigationHeader />

      <main className="flex-1 pt-28 pb-20">
        {/* Back Link */}
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Donation Options
          </Link>
        </div>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FD7E14] to-[#E56B00] mb-6"
            >
              <Heart className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Make a <span className="text-[#FD7E14]">Donation</span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Your generosity helps us provide healthcare, education, and support to those in need.
              Every contribution makes a lasting impact.
            </p>
          </motion.div>
        </section>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
              onClick={() => setShowSuccess(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#1a1a1a] rounded-3xl p-8 max-w-md w-full text-center border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-10 h-10 text-green-500" />
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-2">Thank You!</h2>
                <p className="text-white/60 mb-6">
                  Your donation information has been recorded. Please complete the payment using the
                  details provided. You'll receive a confirmation email once the payment is verified.
                </p>
                <div className="bg-white/5 rounded-xl p-4 mb-6">
                  <p className="text-sm text-white/40 mb-1">Donation Amount</p>
                  <p className="text-3xl font-bold text-[#FD7E14]">₹{finalAmount?.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="w-full py-3 bg-[#FD7E14] hover:bg-[#E56B00] text-white font-semibold rounded-xl transition-colors"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left Column - Amount & Payment */}
            <div className="lg:col-span-3 space-y-6">
              {/* Amount Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[#111] rounded-2xl border border-white/10 p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-[#FD7E14]" />
                  Select Amount
                </h2>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {presetAmounts.map((amount) => (
                    <motion.button
                      key={amount}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount("");
                      }}
                      className={`relative py-4 px-4 rounded-xl font-semibold transition-all ${
                        selectedAmount === amount && !customAmount
                          ? "bg-[#FD7E14] text-white"
                          : "bg-white/5 text-white/80 hover:bg-white/10 border border-white/10"
                      }`}
                    >
                      ₹{amount.toLocaleString()}
                      {selectedAmount === amount && !customAmount && (
                        <motion.div
                          layoutId="selected"
                          className="absolute inset-0 bg-[#FD7E14] rounded-xl -z-10"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-semibold">
                    ₹
                  </div>
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    className="w-full py-4 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#FD7E14] transition-colors"
                  />
                </div>

                {/* Impact Display */}
                {finalAmount && finalAmount >= 500 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-6 p-4 bg-[#FD7E14]/10 border border-[#FD7E14]/20 rounded-xl"
                  >
                    <div className="flex items-start gap-3">
                      <Gift className="w-5 h-5 text-[#FD7E14] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-[#FD7E14]">Your Impact</p>
                        <p className="text-white/70 text-sm">{getImpact(finalAmount)}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Payment Methods */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-[#111] rounded-2xl border border-white/10 p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#FD7E14]" />
                  Payment Method
                </h2>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 p-1 bg-white/5 rounded-xl">
                  {[
                    { id: "upi", label: "UPI", icon: Smartphone },
                    { id: "bank", label: "Bank Transfer", icon: Building2 },
                    { id: "card", label: "QR Code", icon: QrCode },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                        activeTab === tab.id
                          ? "bg-[#FD7E14] text-white"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                  {activeTab === "upi" && (
                    <motion.div
                      key="upi"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-white/40 mb-1">UPI ID</p>
                          <p className="text-lg font-mono text-white">{upiId}</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(upiId, "upi")}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          {copied === "upi" ? (
                            <Check className="w-5 h-5 text-green-500" />
                          ) : (
                            <Copy className="w-5 h-5 text-white/60" />
                          )}
                        </button>
                      </div>
                      <p className="text-sm text-white/40">
                        Open your UPI app (Google Pay, PhonePe, Paytm, etc.) and send the amount to
                        the UPI ID above.
                      </p>
                    </motion.div>
                  )}

                  {activeTab === "bank" && (
                    <motion.div
                      key="bank"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-3"
                    >
                      {[
                        { label: "Bank Name", value: bankDetails.bankName },
                        { label: "Account Name", value: bankDetails.accountName },
                        { label: "Account Number", value: bankDetails.accountNumber },
                        { label: "IFSC Code", value: bankDetails.ifscCode },
                        { label: "Branch", value: bankDetails.branch },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="bg-white/5 rounded-xl p-4 flex items-center justify-between"
                        >
                          <div>
                            <p className="text-sm text-white/40 mb-1">{item.label}</p>
                            <p className="font-medium text-white">{item.value}</p>
                          </div>
                          <button
                            onClick={() => copyToClipboard(item.value, item.label)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            {copied === item.label ? (
                              <Check className="w-5 h-5 text-green-500" />
                            ) : (
                              <Copy className="w-5 h-5 text-white/60" />
                            )}
                          </button>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === "card" && (
                    <motion.div
                      key="card"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center py-6"
                    >
                      <div className="w-48 h-48 mx-auto bg-white rounded-xl p-2 mb-4">
                        {/* Placeholder QR - in production, generate dynamic QR */}
                        <div className="w-full h-full bg-[#111] rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <QrCode className="w-16 h-16 text-white/20 mx-auto mb-2" />
                            <p className="text-xs text-white/40">Scan to pay</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-white/40">
                        Scan this QR code with any UPI app to make a payment
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Right Column - Donor Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[#111] rounded-2xl border border-white/10 p-6 sticky top-28"
              >
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#FD7E14]" />
                  Donor Information
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={donorInfo.name}
                      onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                      className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#FD7E14] transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={donorInfo.email}
                      onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                      className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#FD7E14] transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={donorInfo.phone}
                      onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value })}
                      className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#FD7E14] transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      PAN Number <span className="text-white/30">(for 80G certificate)</span>
                    </label>
                    <input
                      type="text"
                      value={donorInfo.panNumber}
                      onChange={(e) =>
                        setDonorInfo({ ...donorInfo, panNumber: e.target.value.toUpperCase() })
                      }
                      className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#FD7E14] transition-colors uppercase"
                      placeholder="ABCDE1234F"
                      maxLength={10}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Message (Optional)</label>
                    <textarea
                      value={donorInfo.message}
                      onChange={(e) => setDonorInfo({ ...donorInfo, message: e.target.value })}
                      className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#FD7E14] transition-colors resize-none"
                      placeholder="Leave a message..."
                      rows={3}
                    />
                  </div>

                  {/* Summary */}
                  <div className="bg-white/5 rounded-xl p-4 mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/60">Donation Amount</span>
                      <span className="text-xl font-bold text-white">
                        ₹{finalAmount?.toLocaleString() || "0"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-400">
                      <Shield className="w-4 h-4" />
                      <span>80G Tax Benefit Eligible</span>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={!finalAmount || finalAmount < 100 || isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-[#FD7E14] to-[#E56B00] hover:from-[#E56B00] hover:to-[#FD7E14] text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Heart className="w-5 h-5" />
                        Confirm Donation
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs text-white/40 text-center">
                    By donating, you agree to our{" "}
                    <Link href="/terms" className="text-[#FD7E14] hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-[#FD7E14] hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <section className="max-w-6xl mx-auto px-6 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid sm:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Shield,
                title: "100% Secure",
                description: "Your payment information is protected with bank-level security",
              },
              {
                icon: Gift,
                title: "Tax Benefits",
                description: "Get 80G certificate for tax exemption on your donation",
              },
              {
                icon: Sparkles,
                title: "Direct Impact",
                description: "100% of your donation goes directly to helping those in need",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-4 p-5 bg-white/5 rounded-xl border border-white/5"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FD7E14]/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-[#FD7E14]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-white/50">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-6 mt-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Is my donation tax-deductible?",
                  a: "Yes, all donations to Chiranjeevi Charitable Trust are eligible for tax exemption under Section 80G of the Income Tax Act. You will receive an 80G certificate via email.",
                },
                {
                  q: "How will my donation be used?",
                  a: "Your donation directly supports our healthcare initiatives, blood donation drives, eye care programs, and community outreach activities. We maintain complete transparency in fund utilization.",
                },
                {
                  q: "Can I make a recurring donation?",
                  a: "Yes! Contact us at donate@cct.org.in to set up a monthly or yearly recurring donation that makes a sustained impact.",
                },
                {
                  q: "Will I receive a receipt?",
                  a: "Yes, you will receive an official donation receipt and 80G certificate via email within 24-48 hours of payment verification.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="bg-white/5 rounded-xl p-5 border border-white/5"
                >
                  <h3 className="font-medium text-white mb-2 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-[#FD7E14]" />
                    {faq.q}
                  </h3>
                  <p className="text-white/60 text-sm pl-6">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <FlickeringFooter />
    </div>
  );
}
