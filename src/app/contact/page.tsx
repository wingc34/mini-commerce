'use client';

import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function ContactPage() {
  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      value: 'info@modernshop.com',
      link: 'mailto:info@modernshop.com',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Address',
      value: '123 Commerce Street, San Francisco, CA 94105',
      link: '#',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Business Hours',
      value: 'Mon - Fri 09:00 - 18:00',
      link: '#',
    },
  ];

  const faqItems = [
    {
      q: 'How do I track my order?',
      a: "After confirming your order, we'll send a tracking number to your email. You can use this to track your package on our shipping partner's website.",
    },
    {
      q: 'How long does a return or refund take?',
      a: 'Once we receive and review your return request, refunds are typically processed within 5-10 business days.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept credit cards, debit cards, digital wallets, and bank transfers. All payments are secure and encrypted.',
    },
    {
      q: 'How can I contact customer service?',
      a: 'You can reach us via email, phone, or our contact form. Our customer service team will respond within 24 hours.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Contact Us
          </h1>
          <p className="text-xl text-textSecondary text-balance">
            Have any questions? Our customer service team is ready to help you
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-smooth text-center group"
              >
                <div className="text-primary mb-4 flex justify-center group-hover:scale-110 transition-smooth">
                  {method.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {method.title}
                </h3>
                <p className="text-textSecondary text-sm break-all">
                  {method.value}
                </p>
              </a>
            ))}
          </div>

          {/* Contact Form and Map */}
          <div>
            {/* Map and Additional Info */}
            <div className="space-y-6 w-full lg:w-2/3 mx-auto">
              <div className="bg-muted rounded-xl h-80 flex items-center justify-center">
                <img
                  src="/office_location.jpg"
                  alt="Office location"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Office Location
                </h3>
                <p className="text-textSecondary mb-4">
                  Visit our headquarters in San Francisco to meet our team,
                  discuss products, and learn more about ModernShop.
                </p>
                <div className="space-y-2 text-sm text-textSecondary">
                  <p>
                    <span className="font-semibold text-foreground">
                      Address:
                    </span>{' '}
                    123 Commerce Street, San Francisco, CA 94105
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">
                      Hours:
                    </span>{' '}
                    Mon - Fri 09:00 - 18:00
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">
                      Parking:
                    </span>{' '}
                    Free parking available in B1 basement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Frequently Asked Questions
          </h2>
          <Accordion type="multiple" className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                value={`item-${index + 1}`}
                key={index}
                className="group bg-background border border-border rounded-lg px-6 py-4 cursor-pointer"
              >
                <AccordionTrigger className="font-semibold text-foreground hover:text-primary transition-smooth">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-textSecondary mt-4">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
