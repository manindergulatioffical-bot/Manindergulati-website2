import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, MessageCircle, Headphones } from "lucide-react";
import { CONTACT_INFO, WHATSAPP_NUMBER } from "@/constants";
import Link from "next/link";
import ContactForm from "./form";

export default function ContactPageContent() {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-gray-50 py-16">
        <div className="container px-4 ">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light tracking-wider mb-4 text-gray-900 uppercase">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600 font-medium tracking-wide">
              We&apos;d love to hear from you. Get in touch with us.
            </p>
          </div>
        </div>
      </div>

      {/* Main Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl!">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Side - Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-light tracking-wider mb-8 text-gray-900 uppercase">
                  Get In Touch
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Have a question about our products, need styling advice, or
                  want to learn more about our brand? We&apos;re here to help.
                  Reach out to us through any of the channels below.
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 tracking-wide uppercase">
                      Address
                    </h3>
                    <p className="text-gray-600">{CONTACT_INFO.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 tracking-wide uppercase">
                      Phone
                    </h3>
                    <p className="text-gray-600">
                      {CONTACT_INFO.phone}, {WHATSAPP_NUMBER}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 tracking-wide uppercase">
                      Email
                    </h3>
                    <p className="text-gray-600">{CONTACT_INFO.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-3xl font-light tracking-wider mb-8 text-gray-900 uppercase">
                Send Message
              </h2>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Additional Content - Support Options */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light tracking-wider mb-4 text-gray-900 uppercase">
              Other Ways to Reach Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the support option that works best for you. Our team is
              ready to assist you with any questions or concerns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium mb-3 tracking-wide uppercase">
                Live Chat
              </h3>
              <p className="text-gray-600 mb-4">
                Get instant help from our customer service team through live
                chat support.
              </p>
              <Button variant="outline" className="bg-transparent" asChild>
                <Link href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank">
                  Start Chat
                </Link>
              </Button>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium mb-3 tracking-wide uppercase">
                Phone Support
              </h3>
              <p className="text-gray-600 mb-4">
                Speak directly with our support team for personalized
                assistance.
              </p>
              <Button variant="outline" className="bg-transparent" asChild>
                <Link href={`tel:${CONTACT_INFO.phone}`} target="_blank">
                  Call Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light tracking-wider mb-4 text-gray-900 uppercase">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">
                Find quick answers to common questions about our products and
                services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2 tracking-wide">
                    What is your return policy?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    At Maninder Gulati, each piece is made with utmost care,
                    attention to detail, and weeks of dedicated craftsmanship.
                    As most of our designs are customized and made-to-order, we
                    do not offer returns.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 tracking-wide">
                    How long does shipping take?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    All orders are processed and delivered within 7–10 business
                    days, which includes both production time and shipping.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 tracking-wide">
                    Do you offer international shipping?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Yes, we ship to over 30 countries worldwide. International
                    shipping rates vary by location.
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2 tracking-wide">
                    How do I find my size?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Use our size guide available on each product page. Contact
                    us if you need personalized sizing help.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 tracking-wide">
                    Are your products sustainable?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Yes, we&apos;re committed to sustainable fashion using
                    eco-friendly materials and ethical manufacturing.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 tracking-wide">
                    Do you have a loyalty program?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Yes, join our rewards program to earn points on purchases
                    and get exclusive member benefits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
