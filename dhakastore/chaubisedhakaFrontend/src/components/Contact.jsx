import React from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, User, ArrowRight } from "lucide-react";

const Contact = () => {
  return (
    <div className="mt-22 min-h-screen bg-white dark:bg-zinc-950 py-24 sm:py-32">
      <section className="px-4 md:px-16 lg:px-24 xl:px-32 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 sm:mb-24"
        >
          <p className="inline-block font-black text-blue-600 px-8 py-2 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/30 uppercase tracking-[0.3em] text-xs mb-4">
            Contact
          </p>
          <h2 className="text-4xl md:text-7xl font-black text-gray-900 dark:text-gray-100 uppercase italic tracking-tighter mb-4">
            Reach Out <span className="text-blue-600">To Us</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Ready to grow your style? Let’s connect and build something
            exceptional together.
          </p>
        </motion.div>

        <div className="flex flex-col gap-16 max-w-4xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-50 dark:bg-zinc-900/50 p-8 sm:p-12 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl"
          >
            <form className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <p className="mb-3 font-bold text-sm uppercase tracking-wider text-zinc-600 dark:text-zinc-400 pl-1">
                    Your name
                  </p>
                  <div className="flex items-center pl-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
                    <User className="w-5 h-5 text-zinc-400" />
                    <input
                      placeholder="John Doe"
                      className="w-full p-4 bg-transparent outline-none text-zinc-900 dark:text-zinc-100 font-bold placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                      type="text"
                      name="name"
                    />
                  </div>
                </div>
                <div>
                  <p className="mb-3 font-bold text-sm uppercase tracking-wider text-zinc-600 dark:text-zinc-400 pl-1">
                    Email address
                  </p>
                  <div className="flex items-center pl-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
                    <Mail className="w-5 h-5 text-zinc-400" />
                    <input
                      placeholder="john@example.com"
                      className="w-full p-4 bg-transparent outline-none text-zinc-900 dark:text-zinc-100 font-bold placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                      type="email"
                      name="email"
                    />
                  </div>
                </div>
              </div>
              <div>
                <p className="mb-3 font-bold text-sm uppercase tracking-wider text-zinc-600 dark:text-zinc-400 pl-1">
                  Your Message
                </p>
                <textarea
                  name="message"
                  rows="6"
                  placeholder="Tell us what you're looking for..."
                  className="w-full p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300 rounded-2xl outline-none text-zinc-900 dark:text-zinc-100 font-bold placeholder:text-zinc-400 dark:placeholder:text-zinc-600 resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="group w-full sm:w-max flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest transition-all hover:scale-105 shadow-2xl shadow-blue-600/30"
              >
                Send Message
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <div className="flex flex-col gap-8">
              <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-lg">
                <h3 className="text-3xl font-black text-gray-900 dark:text-gray-100 uppercase italic tracking-tighter mb-6 flex items-center gap-4">
                  <MapPin className="w-8 h-8 text-blue-600" />
                  Locate <span className="text-blue-600">Us</span>
                </h3>
                <div className="overflow-hidden rounded-[1.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl grayscale hover:grayscale-0 transition-all duration-700">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8468.901212854422!2d87.27941147473346!3d26.816586460033236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef410067552123%3A0x30ba4e0e7309ddb3!2sChaubise%20sanyak%20bhaka%20showroom!5e0!3m2!1sen!2snp!4v1762744261423!5m2!1sen!2snp"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400">
                    <MapPin className="w-6 h-6 text-blue-600" />
                    <span className="font-bold">
                      Chatara Line, Dharan-13 Sunsari, Nepal
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400">
                    <Phone className="w-6 h-6 text-blue-600" />
                    <span className="font-bold">+977 1234567890</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
