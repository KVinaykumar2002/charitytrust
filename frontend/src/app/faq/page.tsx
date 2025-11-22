"use client";

import { useState } from "react";
import NavigationHeader from "@/components/sections/navigation-header";
import Footer from "@/components/sections/footer";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Chiranjeevi Charitable Trust (CCT)?",
    answer: "Chiranjeevi Charitable Trust (CCT) is a non-profit organization dedicated to creating positive change in communities through various social initiatives, including education support, health programs, and community development projects."
  },
  {
    question: "How can I donate to CCT?",
    answer: "You can donate to CCT through our website by clicking the 'Donate Now' button in the navigation bar. We accept various payment methods and all donations are used transparently for our charitable programs."
  },
  {
    question: "How are donations used?",
    answer: "All donations are used to support our various programs including education initiatives, health support, community development projects, and emergency relief efforts. We maintain complete transparency in our financial operations."
  },
  {
    question: "Can I volunteer with CCT?",
    answer: "Yes! We welcome volunteers who want to make a difference. You can contact us through our website or attend our events to learn more about volunteer opportunities. We have various roles available for people with different skills and time commitments."
  },
  {
    question: "How can I stay updated about CCT's activities?",
    answer: "You can stay updated by following us on our social media platforms, subscribing to our newsletter, or regularly checking our website for news, events, and project updates. We also share regular updates about our programs and their impact."
  },
  {
    question: "Are donations tax-deductible?",
    answer: "Yes, donations to Chiranjeevi Charitable Trust are tax-deductible as per applicable tax laws. We provide donation receipts that can be used for tax purposes. Please consult with a tax advisor for specific details regarding your tax situation."
  },
  {
    question: "How can I report a concern or provide feedback?",
    answer: "We value your feedback and concerns. You can reach out to us through the contact information provided on our website, or send us an email. We take all concerns seriously and will address them promptly."
  },
  {
    question: "What types of programs does CCT run?",
    answer: "CCT runs various programs including educational support for underprivileged children, health camps and medical assistance, community development projects, disaster relief efforts, and empowerment programs for women and youth."
  },
  {
    question: "How can I partner with CCT?",
    answer: "We welcome partnerships with organizations, businesses, and individuals who share our vision. Please contact us through our website to discuss potential partnership opportunities. We work with various stakeholders to maximize our impact."
  },
  {
    question: "Is CCT registered and recognized?",
    answer: "Yes, Chiranjeevi Charitable Trust is a registered charitable organization. We operate in compliance with all applicable laws and regulations, and our activities are regularly audited to ensure transparency and accountability."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary to-primary/90 py-20 md:py-32 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <h1
                data-text-animation="reveal-from-bottom"
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              >
                Frequently Asked Questions
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Find answers to common questions about Chiranjeevi Charitable Trust.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-primary pr-8">
                        {faq.question}
                      </h3>
                      <ChevronDown
                        className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                          openIndex === index ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-6 pb-5 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Section */}
              <div className="mt-16 text-center bg-primary/5 rounded-2xl p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  Still have questions?
                </h2>
                <p className="text-muted-foreground mb-6">
                  If you couldn't find the answer you're looking for, feel free to reach out to us.
                </p>
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

