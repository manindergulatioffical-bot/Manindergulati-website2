import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read Maninder Gulati's Privacy Policy to understand how we collect, use, and protect your personal information. Learn about our data practices and your privacy rights.",
  keywords: ["privacy policy", "data protection", "personal information", "privacy rights", "data practices", "Maninder Gulati privacy", "customer privacy"],
  openGraph: {
    title: "Privacy Policy - Maninder Gulati",
    description: "Read Maninder Gulati's Privacy Policy to understand how we collect, use, and protect your personal information.",
    url: "https://manindergulati.com/privacy-policy",
    images: [
      {
        url: "/privacy-policy-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Privacy Policy",
      },
    ],
  },
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicy() {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light tracking-wider mb-4 text-gray-900 uppercase">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 font-medium tracking-wide">
              Maninder Gulati Official
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-8">
                Your privacy is important to us. This Privacy Policy outlines
                how we collect, use, and protect your personal information when
                you visit or make a purchase from{" "}
                <strong>Maninder Gulati Official.</strong>
              </p>

              <div className="space-y-12">
                {/* Section 1 */}
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4 text-gray-900 uppercase">
                    1. Information We Collect
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We may collect the following personal information when you
                    visit our website, place an order, or contact us:
                  </p>
                  <ul className="text-gray-600 leading-relaxed space-y-2 list-disc pl-6">
                    <li>Name</li>
                    <li>Phone number</li>
                    <li>Email address</li>
                    <li>Shipping address</li>
                    <li>
                      Billing information (only for payment processing, not
                      stored)
                    </li>
                    <li>
                      Device information (IP address, browser type, location,
                      etc.)
                    </li>
                  </ul>
                </div>

                {/* Section 2 */}
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4 text-gray-900 uppercase">
                    2. How We Use Your Information
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Your information is used solely for the purpose of:
                  </p>
                  <ul className="text-gray-600 leading-relaxed space-y-2 list-disc pl-6">
                    <li>Processing and fulfilling your orders</li>
                    <li>
                      Communicating with you regarding your order or support
                      queries
                    </li>
                    <li>Sending order updates or important notifications</li>
                    <li>Improving our website and customer service</li>
                    <li>Complying with legal obligations</li>
                  </ul>
                </div>

                {/* Section 3 */}
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4 text-gray-900 uppercase">
                    3. Payment Security
                  </h2>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <p className="text-green-800 leading-relaxed">
                      We use secure and trusted third-party payment gateways to
                      process transactions. We do not store your debit/credit
                      card details or any sensitive payment information on our
                      servers.
                    </p>
                  </div>
                </div>

                {/* Section 4 */}
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4 text-gray-900 uppercase">
                    4. Data Protection
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    We take appropriate technical and organizational measures to
                    protect your personal data from unauthorized access, loss,
                    misuse, or alteration.
                  </p>
                </div>

                {/* Section 5 */}
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4 text-gray-900 uppercase">
                    5. Sharing of Information
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    We do not sell or rent your personal information to third
                    parties. However, we may share your data with trusted
                    logistics and payment partners solely for the purpose of
                    fulfilling your order.
                  </p>
                </div>

                {/* Section 6 */}
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4 text-gray-900 uppercase">
                    6. Cookies
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Our website may use cookies to enhance your browsing
                    experience. Cookies help us analyze web traffic and
                    personalize your experience. You can choose to disable
                    cookies through your browser settings.
                  </p>
                </div>

                {/* Section 7 */}
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4 text-gray-900 uppercase">
                    7. Your Rights
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    You have the right to:
                  </p>
                  <ul className="text-gray-600 leading-relaxed space-y-2 list-disc pl-6">
                    <li>Access the personal information we hold about you</li>
                    <li>Request correction of inaccurate data</li>
                    <li>
                      Request deletion of your data (except where we are legally
                      required to keep it)
                    </li>
                    <li>
                      Withdraw consent for marketing communications at any time
                    </li>
                  </ul>
                </div>

                {/* Section 8 */}
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4 text-gray-900 uppercase">
                    8. Changes to This Policy
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    We may update this Privacy Policy from time to time. Changes
                    will be posted on this page with the updated date. Continued
                    use of our website after changes constitutes your
                    acceptance.
                  </p>
                </div>

                {/* Section 9 */}
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4 text-gray-900 uppercase">
                    9. Contact Us
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    If you have any questions or concerns regarding this Privacy
                    Policy or how we handle your data, please contact us:
                  </p>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="space-y-2 text-gray-700">
                      <p>
                        <strong>Phone:</strong> +91 70650 30555
                      </p>
                      <p>
                        <strong>Email:</strong> shelacreation@gmail.com
                      </p>
                      <p>
                        <strong>Instagram:</strong> @manindergulatiofficial
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Last Updated */}
              <div className="mt-16 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  Last updated:{" "}
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
