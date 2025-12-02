import { ArrowRight, Users, Award, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  const features = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Quality Guarantee',
      description:
        'Carefully curated selection from top global brands and manufacturers, ensuring every product meets our highest quality standards',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Fast Shipping',
      description:
        'Partner with multiple logistics companies to provide fast and reliable shipping services, getting your orders to you quickly',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Customer First',
      description:
        '24/7 customer support dedicated to providing each customer with the best shopping experience',
    },
  ];

  const timeline = [
    {
      year: '2020',
      title: 'Company Founded',
      description:
        'ModernShop officially launched with a mission to provide quality shopping experiences',
    },
    {
      year: '2021',
      title: 'Breakthrough',
      description:
        'Achieved monthly sales of 1 million, gaining widespread customer recognition',
    },
    {
      year: '2022',
      title: 'National Expansion',
      description:
        'Opened 5 retail locations, product catalog exceeded 10,000 items',
    },
    {
      year: '2024',
      title: 'Continuous Innovation',
      description:
        'Launched AI recommendation system, optimized shopping experience, serving over 500,000 users',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            About ModernShop
          </h1>
          <p className="text-xl text-textSecondary mb-8 text-balance">
            We are committed to providing the best online shopping experience,
            bringing convenience, trust, and innovation to customers worldwide
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6 text-center lg:text-left">
                Our Mission
              </h2>
              <p className="text-lg text-textSecondary mb-4 leading-relaxed text-center lg:text-left">
                ModernShop&apos;s core mission is to bring world-class shopping
                experience to every customer through carefully curated product
                selection and exceptional customer service. We believe shopping
                should be simple, enjoyable, and trustworthy.
              </p>
              <p className="text-lg text-textSecondary leading-relaxed text-center lg:text-left">
                Wherever you are, we are committed to meeting every need with
                the fastest speed, best quality, and most sincere service.
              </p>
            </div>
            <div className="bg-primary/10 rounded-2xl h-80 flex items-center justify-center">
              <Image
                src="/Collaborative-Team-Culture.png"
                alt="Team collaboration"
                className="w-full h-full object-cover rounded-2xl"
                width={400}
                height={300}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Our Advantages
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-background rounded-xl p-8 shadow-sm border border-border"
              >
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-textSecondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Our Journey
          </h2>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold mb-4">
                    {item.year.slice(-2)}
                  </div>
                  {index !== timeline.length - 1 && (
                    <div className="w-0.5 h-20 bg-border" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-textSecondary">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Explore our curated selection and discover a better shopping
            experience
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-smooth"
          >
            Browse Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
