import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Read Maninder Gulati's Terms and Conditions to understand our policies, shipping, returns, and customer service guidelines. Learn about your rights and our responsibilities.",
  keywords: ["terms and conditions", "shipping policy", "returns policy", "customer service", "purchase terms", "Maninder Gulati terms", "customer rights"],
  openGraph: {
    title: "Terms and Conditions - Maninder Gulati",
    description: "Read Maninder Gulati's Terms and Conditions to understand our policies, shipping, returns, and customer service guidelines.",
    url: "https://manindergulati.com/terms-and-conditions",
    images: [
      {
        url: "/terms-conditions-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Terms and Conditions",
      },
    ],
  },
  alternates: {
    canonical: "/terms-and-conditions",
  },
};

export default function TermsAndConditions() {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light tracking-wider mb-4 text-gray-900 uppercase">
              Terms and Conditions
            </h1>
            <p className="text-lg text-gray-600 font-medium tracking-wide">
              Maninder Gulati Official
            </p>
          </div>
        </div>
      </div>

      {/* Terms Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-8">
                Welcome to Maninder Gulati Official. By accessing and using our
                website, you agree to the following terms and conditions. Please
                read them carefully before placing an order.
              </p>

              <div className="space-y-12">
                {/* Section 1 */}
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4 text-gray-900 uppercase">
                    1. General
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    These Terms and Conditions apply to all purchases made
                    through our website. We reserve the right to update or
                    modify these terms at any time without prior notice. Your
                    continued use of the website after any such changes
                    constitutes your agreement to follow and be bound by the
                    terms as changed.
                  </p>
                </div>

                {/* Section 2 */}
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4 text-gray-900 uppercase">
                    2. Products and Descriptions
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    All products displayed on our website are handmade and may
                    have slight variations. We strive to provide accurate
                    product descriptions, images, and pricing; however, errors
                    may occur. In such cases, we reserve the right to correct
                    the error and revise your order if necessary.
                  </p>
                </div>

                {/* Section 3 */}
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4 text-gray-900 uppercase">
                    3. Pricing
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    All prices are listed in INR (₹) and are inclusive of
                    applicable taxes unless stated otherwise. Prices and
                    availability are subject to change without notice.
                  </p>
                </div>

                {/* Section 4 */}
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4 text-gray-900 uppercase">
                    4. Orders
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Once you place an order, you will receive a confirmation
                    email. This does not guarantee acceptance of your order. We
                    reserve the right to cancel or refuse any order at our
                    discretion.
                  </p>
                </div>

                {/* Section 5 */}
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4 text-gray-900 uppercase">
                    5. Shipping and Delivery
                  </h2>
                  <ul className="text-gray-600 leading-relaxed space-y-3 list-disc pl-6">
                    <li>We deliver products across India.</li>
                    <li>
                      Delivery timeline: 7–10 business days from the date of
                      order confirmation.
                    </li>
                    <li>
                      Delivery delays may occur due to unforeseen circumstances
                      such as natural calamities, logistics issues, or public
                      holidays.
                    </li>
                  </ul>
                </div>

                {/* Section 6 */}
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4 text-gray-900 uppercase">
                    6. No Return Policy
                  </h2>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
                    <p className="text-red-800 font-medium mb-2">
                      Please note: We do not accept returns or exchanges.
                    </p>
                    <p className="text-red-700">
                      All sales are final. Please review your order carefully
                      before placing it.
                    </p>
                  </div>
                </div>

                {/* Section 7 */}
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4 text-gray-900 uppercase">
                    7. Cancellations
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Cancellations are only accepted within 12 hours of placing
                    the order. After this window, no cancellations will be
                    entertained.
                  </p>
                </div>

                {/* Section 8 */}
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4 text-gray-900 uppercase">
                    8. Intellectual Property
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    All content on this website including images, logos,
                    designs, text, and graphics are the property of Maninder
                    Gulati Official. Unauthorized use or reproduction is
                    strictly prohibited.
                  </p>
                </div>

                {/* Section 9 */}
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4 text-gray-900 uppercase">
                    9. Privacy Policy
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Your personal data is handled in accordance with our Privacy
                    Policy. By using our website, you consent to the collection
                    and use of your information as described.
                  </p>
                </div>

                {/* Section 10 */}
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4 text-gray-900 uppercase">
                    10. Contact Us
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    For any questions, concerns, or assistance regarding your
                    order or our policies, feel free to reach out to us:
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
