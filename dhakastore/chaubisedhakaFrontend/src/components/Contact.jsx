import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  User,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (formData.name.length > 50) {
      newErrors.name = "Name must be less than 50 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (formData.message.length > 1000) {
      newErrors.message = "Message must be less than 1000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to your backend API
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        // Handle backend validation errors
        if (data.errors) {
          const backendErrors = {};
          data.errors.forEach((error) => {
            backendErrors[error.field] = error.message;
          });
          setErrors(backendErrors);
          toast.error("Please check your inputs");
        } else {
          throw new Error(data.message || "Failed to send message");
        }
        return;
      }

      toast.success("Thank you! Your message has been sent.");
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error(
        error.message || "Something went wrong. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Ready to grow your style? Let's connect and build something
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
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <p className="mb-3 font-bold text-sm uppercase tracking-wider text-zinc-600 dark:text-zinc-400 pl-1">
                    Your name
                  </p>
                  <div
                    className={`flex items-center pl-4 rounded-2xl bg-white dark:bg-zinc-900 border ${errors.name ? "border-red-500 focus-within:border-red-500" : "border-zinc-200 dark:border-zinc-800 focus-within:border-blue-500"} focus-within:ring-4 ${errors.name ? "focus-within:ring-red-500/10" : "focus-within:ring-blue-500/10"} transition-all duration-300`}
                  >
                    <User
                      className={`w-5 h-5 ${errors.name ? "text-red-400" : "text-zinc-400"}`}
                    />
                    <input
                      placeholder="John Doe"
                      className="w-full p-4 bg-transparent outline-none text-zinc-900 dark:text-zinc-100 font-bold placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.name && (
                    <div className="flex items-center gap-1 mt-2 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <p className="mb-3 font-bold text-sm uppercase tracking-wider text-zinc-600 dark:text-zinc-400 pl-1">
                    Email address
                  </p>
                  <div
                    className={`flex items-center pl-4 rounded-2xl bg-white dark:bg-zinc-900 border ${errors.email ? "border-red-500 focus-within:border-red-500" : "border-zinc-200 dark:border-zinc-800 focus-within:border-blue-500"} focus-within:ring-4 ${errors.email ? "focus-within:ring-red-500/10" : "focus-within:ring-blue-500/10"} transition-all duration-300`}
                  >
                    <Mail
                      className={`w-5 h-5 ${errors.email ? "text-red-400" : "text-zinc-400"}`}
                    />
                    <input
                      placeholder="john@example.com"
                      className="w-full p-4 bg-transparent outline-none text-zinc-900 dark:text-zinc-100 font-bold placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center gap-1 mt-2 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <p className="mb-3 font-bold text-sm uppercase tracking-wider text-zinc-600 dark:text-zinc-400 pl-1">
                  Your Message
                </p>
                <div
                  className={`rounded-2xl border ${errors.message ? "border-red-500" : "border-zinc-200 dark:border-zinc-800"} transition-all duration-300`}
                >
                  <textarea
                    name="message"
                    rows="6"
                    placeholder="Tell us what you're looking for..."
                    className="w-full p-5 bg-white dark:bg-zinc-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 rounded-2xl outline-none text-zinc-900 dark:text-zinc-100 font-bold placeholder:text-zinc-400 dark:placeholder:text-zinc-600 resize-none"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                {errors.message && (
                  <div className="flex items-center gap-1 mt-2 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.message}</span>
                  </div>
                )}
                <div className="text-right text-xs text-zinc-400 mt-1">
                  {formData.message.length}/1000 characters
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full sm:w-max flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-400 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest transition-all hover:scale-105 shadow-2xl shadow-blue-600/30"
              >
                {isSubmitting ? (
                  <>
                    Sending...
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
