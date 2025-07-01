import ProjectList from "../components/ProjectList";
import ClientList from "../components/ClientList";
import ContactForm from "../components/ContactForm";
import NewsletterForm from "../components/NewsletterForm";
import { useState } from "react";
import api from "../api/axios";

// Social Media Icons
import { ReactComponent as FacebookIcon } from "../assets/Frame.svg";
import { ReactComponent as TwitterIcon } from "../assets/Group-1.svg";
import { ReactComponent as InstagramIcon } from "../assets/Group.svg";
import { ReactComponent as LinkedinIcon } from "../assets/Linkedin.svg";
import { ReactComponent as Logo } from "../assets/logo.svg";
import RectangleBg from "../assets/Rectangle.svg";

// Why Choose Us Icons
import { ReactComponent as ROIIcon } from "../assets/circle-dollar-sign.svg";
import { ReactComponent as DesignIcon } from "../assets/paintbrush-2.svg";
import { ReactComponent as HomeIcon } from "../assets/home.svg";

export default function Home() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);
  
  // Hero form state
  const [heroForm, setHeroForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: ""
  });
  const [heroFormSuccess, setHeroFormSuccess] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/newsletter", { email: newsletterEmail });
      setNewsletterDone(true);
      setNewsletterEmail("");
      setTimeout(() => setNewsletterDone(false), 3000); // Hide success message after 3 seconds
    } catch (error) {
      console.error("Newsletter subscription failed:", error);
    }
  };

  const handleHeroFormChange = (e) => {
    setHeroForm({ ...heroForm, [e.target.name]: e.target.value });
  };

  const handleHeroFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/contacts", heroForm);
      setHeroFormSuccess(true);
      setHeroForm({ name: "", email: "", phone: "", city: "" });
      setTimeout(() => setHeroFormSuccess(false), 5000); // Hide success message after 5 seconds
    } catch (error) {
      console.error("Hero form submission failed:", error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
        <Logo className="w-20 h-16" /> {/* Enlarged logo */}
        <nav className="flex gap-6 text-sm font-medium">
          <a href="#" className="hover:text-blue-600">Home</a>
          <a href="#why-choose-us" className="hover:text-blue-600">Why Choose Us</a>
          <a href="#about" className="hover:text-blue-600">About Us</a>
          <a href="#projects" className="hover:text-blue-600">Projects</a>
        </nav>
      </header>

      {/* Hero Section with Consultation Form */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat min-h-[calc(100vh-80px)] py-12 px-6"
        style={{
          backgroundImage: url(/assests/young-couple-examining-blueprints-with-real-estate-agent-while-buying-new-home1.svg),
        }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 items-center h-full min-h-[calc(100vh-160px)]">
          {/* Left Content - Takes up 2 columns */}
          <div className="lg:col-span-2">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Consultation,<br />
              Design,<br />
              <span className="text-blue-400">& Marketing</span>
            </h1>
            <p className="text-gray-200 text-xl mb-10 leading-relaxed max-w-2xl">
              We provide comprehensive solutions for your property needs. From initial consultation 
              to final marketing, our expert team ensures maximum value and quick results.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="bg-blue-600 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition shadow-lg">
                Get Started
              </button>
              <button className="border-2 border-white text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition shadow-lg">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Consultation Form - Takes up 1 column */}
          <div className="lg:col-span-1 bg-blue-600 rounded-xl p-6 text-white shadow-2xl max-w-sm ml-auto w-full">
            <h3 className="text-xl font-bold mb-6 text-center">Get a Free<br />Consultation</h3>
            <form className="space-y-4" onSubmit={handleHeroFormSubmit}>
              <div>
                <input
                  type="text"
                  name="name"
                  value={heroForm.name}
                  onChange={handleHeroFormChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-lg text-white bg-transparent border-2 border-white placeholder-gray-200 focus:ring-2 focus:ring-white focus:border-white text-sm"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={heroForm.email}
                  onChange={handleHeroFormChange}
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg text-white bg-transparent border-2 border-white placeholder-gray-200 focus:ring-2 focus:ring-white focus:border-white text-sm"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={heroForm.phone}
                  onChange={handleHeroFormChange}
                  placeholder="Mobile Number"
                  className="w-full px-4 py-3 rounded-lg text-white bg-transparent border-2 border-white placeholder-gray-200 focus:ring-2 focus:ring-white focus:border-white text-sm"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="city"
                  value={heroForm.city}
                  onChange={handleHeroFormChange}
                  placeholder="Area, City"
                  className="w-full px-4 py-3 rounded-lg text-white bg-transparent border-2 border-white placeholder-gray-200 focus:ring-2 focus:ring-white focus:border-white text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold text-sm hover:bg-orange-600 transition mt-6 shadow-lg"
              >
                Get Quick Quote
              </button>
              {heroFormSuccess && (
                <p className="text-green-200 text-center text-sm mt-4 font-medium">
                  Thank you! We received your consultation request.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Potential ROI */}
            <div className="text-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ROIIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Potential ROI</h3>
              <p className="text-gray-600 leading-relaxed">
                We help you maximize your return on investment through strategic planning, market analysis, and proven methodologies that deliver exceptional results.
              </p>
            </div>

            {/* Design */}
            <div className="text-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <DesignIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Design</h3>
              <p className="text-gray-600 leading-relaxed">
                Our expert design team creates stunning, functional spaces that capture attention and enhance property value through innovative solutions.
              </p>
            </div>

            {/* Marketing */}
            <div className="text-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <HomeIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Marketing</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive marketing strategies that reach the right audience, showcase your property's best features, and drive qualified leads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Us</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-8"></div>
          </div>
          
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Real estate is a compelling and long-term investment that has provided many Australians 
              with wealth-building opportunities. When you invest with us, we provide you with 
              solid investment products that have shown strong and sustainable performance over 
              the long term, with the resources and expertise to navigate and succeed in challenging environments. 
              We are creating a better tomorrow.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="p-6 flex-grow">
        {/* Our Projects */}
        <section id="projects" className="py-16">
          <div className="max-w-7xl mx-auto">
            <ProjectList />
          </div>
        </section>

        {/* Happy Clients */}
        <section id="clients" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Happy Clients</h2>
              <div className="w-16 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Our satisfied clients are our biggest achievement. Here's what they have to say about our services.
              </p>
            </div>
            <ClientList />
          </div>
        </section>
      </main>
      {/* SVG Background Section Above Footer */}
<section
  className="relative bg-cover bg-center text-white py-15 px-6"
  style={{
    backgroundImage: url(${RectangleBg}),
  }}
>
  <div className="bg-black bg-opacity-50 p-8 rounded-md max-w-2xl mx-auto text-center">
    <h2 className="text-2xl md:text-3xl font-semibold mb-4">
      Learn more about our listing process, as well as our additional staging and design work.
    </h2>
    <button className="mt-4 px-6 py-3 bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-100 transition">
      LEARN MORE
    </button>
  </div>
</section>


      {/* Footer */}
      <footer className="mt-16">
        {/* Upper Footer */}
        <div className="bg-blue-600 text-white px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <nav className="flex gap-6 text-sm font-medium">
              <a href="#" className="hover:underline">Home</a>
              <a href="#why-choose-us" className="hover:underline">Why Choose Us</a>
              <a href="#about" className="hover:underline">About Us</a>
              <a href="#projects" className="hover:underline">Projects</a>
              <a href="#clients" className="hover:underline">Happy Clients</a>
            </nav>
            <div className="flex flex-col items-center md:items-end">
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 items-center">
                <h3 className="text-lg font-semibold">Subscribe Us</h3>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter Email Address"
                  className="px-3 py-2 rounded-md text-black bg-white border"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-100"
                >
                  Subscribe
                </button>
              </form>
              {newsletterDone && (
                <p className="text-green-200 text-sm mt-2">Subscribed successfully!</p>
              )}
            </div>
          </div>
        </div>
        

        {/* Lower Footer */}
        <div className="bg-gray-900 text-white px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">All Rights Reserved {new Date().getFullYear()}</p>
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Logo className="w-20 h-20" />
            </div>
            <div className="flex gap-4">
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
    <div className="bg-white p-2 rounded-full">
      <TwitterIcon className="w-5 h-5 text-blue-500 hover:text-blue-600" />
    </div>
  </a>
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
    <div className="bg-white p-2 rounded-full">
      <FacebookIcon className="w-5 h-5 text-blue-600 hover:text-blue-700" />
    </div>
  </a>
  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
    <div className="bg-white p-2 rounded-full">
      <InstagramIcon className="w-5 h-5 text-pink-500 hover:text-pink-600" />
    </div>
  </a>
  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
    <div className="bg-white p-2 rounded-full">
      <LinkedinIcon className="w-5 h-5 text-blue-700 hover:text-blue-800" />
    </div>
  </a>
</div>

          </div>
        </div>
      </footer>
    </div>
  );
}