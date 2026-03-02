import React from "react";
export function ContactUs() {
    return (
        <>
            <section className="relative bg-[#f0fdf0] px-4 py-12 md:py-20 overflow-hidden">
                <div
                    className="absolute inset-0 z-0 opacity-10 pattern-grid-lg text-primary"
                ></div>
                <div className="container mx-auto max-w-6xl relative z-10 text-center">
                    <h1
                        className="text-4xl md:text-5xl font-black text-[#0d1b0d] mb-4 tracking-tight"
                    >
                        We're Here to Help
                    </h1>
                    <p className="text-lg text-[#0d1b0d]/70 max-w-2xl mx-auto mb-8">
                        Connecting farmers and buyers across Gujarat. Whether you have questions
                        about listing crops, verification, or market prices, our team is ready to
                        assist you.
                    </p>
                    <div className="flex justify-center gap-4">
                        <a
                            className="inline-flex items-center justify-center h-12 px-6 rounded-lg bg-primary hover:bg-[#0fd60f] text-[#0d1b0d] font-bold transition-colors"
                            href="#contact-form"
                        >
                            Send a Message
                        </a>
                        <a
                            className="inline-flex items-center justify-center h-12 px-6 rounded-lg bg-white border border-[#e7f3e7] hover:bg-[#f6fbf6] text-[#0d1b0d] font-bold gap-2 transition-colors"
                            href="https://wa.me/919876543210"
                        >
                            <span className="material-symbols-outlined text-green-600">chat</span>
                            WhatsApp Us
                        </a>
                    </div>
                </div>
            </section>

            <section className="py-12 px-4 bg-white">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <div
                            className="flex flex-col items-center text-center p-8 rounded-xl bg-[#f8fcf8] border border-[#e7f3e7] hover:shadow-lg transition-shadow"
                        >
                            <div
                                className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4"
                            >
                                <span className="material-symbols-outlined text-3xl">storefront</span>
                            </div>
                            <h3 className="text-xl font-bold text-[#0d1b0d] mb-2">Visit Our Office</h3>
                            <p className="text-[#0d1b0d]/70">
                                102, Agro Hub, Kalavad Road,<br />
                                Rajkot, Gujarat - 360005
                            </p>
                        </div>

                        <div
                            className="flex flex-col items-center text-center p-8 rounded-xl bg-[#f8fcf8] border border-[#e7f3e7] hover:shadow-lg transition-shadow"
                        >
                            <div
                                className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4"
                            >
                                <span className="material-symbols-outlined text-3xl">mail</span>
                            </div>
                            <h3 className="text-xl font-bold text-[#0d1b0d] mb-2">Email Support</h3>
                            <p className="text-[#0d1b0d]/70 mb-2">
                                For general inquiries &amp; verification
                            </p>
                            <a
                                className="text-green-700 font-semibold hover:underline"
                                href="mailto:support@krushisetu.com"
                            >support@krushisetu.com</a
                            >
                        </div>

                        <div
                            className="flex flex-col items-center text-center p-8 rounded-xl bg-[#f8fcf8] border border-[#e7f3e7] hover:shadow-lg transition-shadow"
                        >
                            <div
                                className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4"
                            >
                                <span className="material-symbols-outlined text-3xl">call</span>
                            </div>
                            <h3 className="text-xl font-bold text-[#0d1b0d] mb-2">Call or WhatsApp</h3>
                            <p className="text-[#0d1b0d]/70 mb-2">Mon-Sat, 9:00 AM - 6:00 PM</p>
                            <a
                                className="text-green-700 font-bold text-lg hover:underline"
                                href="tel:+919876543210"
                            >+91 98765 43210</a
                            >
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 px-4 bg-background-light" id="contact-form">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        <div
                            className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-[#e7f3e7]"
                        >
                            <h2 className="text-2xl font-bold text-[#0d1b0d] mb-6">
                                Send us a Message
                            </h2>
                            <form className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-[#0d1b0d]" htmlFor="firstName"
                                        >First Name</label
                                        >
                                        <input
                                            className="w-full h-12 px-4 rounded-lg border border-[#e7f3e7] bg-[#f8fcf8] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                            id="firstName"
                                            placeholder="Enter first name"
                                            type="text"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-[#0d1b0d]" htmlFor="lastName"
                                        >Last Name</label
                                        >
                                        <input
                                            className="w-full h-12 px-4 rounded-lg border border-[#e7f3e7] bg-[#f8fcf8] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                            id="lastName"
                                            placeholder="Enter last name"
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#0d1b0d]" htmlFor="role"
                                    >I am a...</label
                                    >
                                    <select
                                        className="w-full h-12 px-4 rounded-lg border border-[#e7f3e7] bg-[#f8fcf8] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                        id="role"
                                    >
                                        <option disabled="" selected="" value="">Select your role</option>
                                        <option value="farmer">Farmer (Khedut)</option>
                                        <option value="buyer">Buyer / Trader</option>
                                        <option value="apmc">APMC Official</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#0d1b0d]" htmlFor="phone"
                                    >Mobile Number</label
                                    >
                                    <div className="relative">
                                        <span
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0d1b0d]/50 font-medium"
                                        >+91</span
                                        >
                                        <input
                                            className="w-full h-12 pl-12 pr-4 rounded-lg border border-[#e7f3e7] bg-[#f8fcf8] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                            id="phone"
                                            placeholder="98765 43210"
                                            type="tel"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#0d1b0d]" htmlFor="message"
                                    >Message</label
                                    >
                                    <textarea
                                        className="w-full p-4 rounded-lg border border-[#e7f3e7] bg-[#f8fcf8] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                                        id="message"
                                        placeholder="How can we help you regarding your crops or purchase?"
                                        rows="4"
                                    ></textarea>
                                </div>
                                <button
                                    className="w-full h-12 bg-primary hover:bg-[#0fd60f] text-[#0d1b0d] font-bold rounded-lg transition-colors shadow-sm"
                                    type="button"
                                >
                                    Submit Request
                                </button>
                                <p className="text-xs text-center text-[#0d1b0d]/50 mt-4">
                                    We typically reply within 24 hours. Your details are secure with us.
                                </p>
                            </form>
                        </div>

                        <div className="flex flex-col gap-8">

                            <div
                                className="w-full h-64 bg-gray-200 rounded-xl overflow-hidden relative shadow-sm border border-[#e7f3e7]"
                            >

                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-80"
                                    style={{
                                        backgroundImage: 'url("https://via.placeholder.com/600x300")',
                                        backgroundSize: 'cover'
                                    }}
                                >
                                    <div
                                        className="absolute inset-0 bg-black/10 flex items-center justify-center"
                                    >
                                        <button
                                            className="bg-white px-4 py-2 rounded-lg font-bold shadow-md flex items-center gap-2 hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-red-500"
                                            >location_on</span
                                            >
                                            View on Google Maps
                                        </button>
                                    </div>
                                </div>
                                <img
                                    className="w-full h-full object-cover"
                                    data-alt="Map of Gujarat showing Rajkot office location service area"
                                    data-location="Rajkot, Gujarat"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJUqyHLzIjkJ2Xnx_dkC-jabAj6VSZ9ksOMJC6y-shCc107pIw_hVA8VaJn9XI5VHKWQBhMT1t-Tx2slV2qiuFl0XmVYB9e5P-G-Ik18tXXbFQ9khf2hg_mHOY1Lcj14X6oCnzm5mRN4GNjQf6Nvsrqr3Y8XB6OYqrmZ7s8z-zv9zQgiFEWAjFqfP2VoXSW0iztMi1ijDUQnhfCNX906pq6tCg9p3pw77s6ECypejazmE5iTINbcPktG-A705XkTEA7ImbQznemeU"
                                />
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-[#0d1b0d] mb-6">
                                    Frequently Asked Questions
                                </h3>
                                <div className="space-y-4">

                                    <details
                                        className="group bg-white rounded-lg border border-[#e7f3e7] open:bg-[#f0fdf0] transition-colors"
                                    >
                                        <summary
                                            className="flex items-center justify-between p-4 cursor-pointer font-semibold text-[#0d1b0d] list-none"
                                        >
                                            <span>How do I verify my identity as a farmer?</span>
                                            <span
                                                className="material-symbols-outlined transform group-open:rotate-180 transition-transform text-gray-400 group-open:text-primary"
                                            >expand_more</span
                                            >
                                        </summary>
                                        <div className="px-4 pb-4 text-[#0d1b0d]/70 text-sm">
                                            To verify your identity, upload a copy of your 7/12 extract or
                                            Aadhaar card in your profile settings. Our team usually approves
                                            documents within 24-48 hours.
                                        </div>
                                    </details>

                                    <details
                                        className="group bg-white rounded-lg border border-[#e7f3e7] open:bg-[#f0fdf0] transition-colors"
                                    >
                                        <summary
                                            className="flex items-center justify-between p-4 cursor-pointer font-semibold text-[#0d1b0d] list-none"
                                        >
                                            <span>Is there a fee to list my wheat crop?</span>
                                            <span
                                                className="material-symbols-outlined transform group-open:rotate-180 transition-transform text-gray-400 group-open:text-primary"
                                            >expand_more</span
                                            >
                                        </summary>
                                        <div className="px-4 pb-4 text-[#0d1b0d]/70 text-sm">
                                            No, KrushiSetu is currently free for farmers. You can list up to
                                            5 crops at a time without any charges. Premium features for
                                            traders may apply in the future.
                                        </div>
                                    </details>

                                    <details
                                        className="group bg-white rounded-lg border border-[#e7f3e7] open:bg-[#f0fdf0] transition-colors"
                                    >
                                        <summary
                                            className="flex items-center justify-between p-4 cursor-pointer font-semibold text-[#0d1b0d] list-none"
                                        >
                                            <span>How do I contact a buyer directly?</span>
                                            <span
                                                className="material-symbols-outlined transform group-open:rotate-180 transition-transform text-gray-400 group-open:text-primary"
                                            >expand_more</span
                                            >
                                        </summary>
                                        <div className="px-4 pb-4 text-[#0d1b0d]/70 text-sm">
                                            Once a buyer expresses interest in your listing, you will
                                            receive a notification. You can then use the in-app chat or view
                                            their contact number if they have made it public.
                                        </div>
                                    </details>

                                    <details
                                        className="group bg-white rounded-lg border border-[#e7f3e7] open:bg-[#f0fdf0] transition-colors"
                                    >
                                        <summary
                                            className="flex items-center justify-between p-4 cursor-pointer font-semibold text-[#0d1b0d] list-none"
                                        >
                                            <span>I forgot my password, how to reset?</span>
                                            <span
                                                className="material-symbols-outlined transform group-open:rotate-180 transition-transform text-gray-400 group-open:text-primary"
                                            >expand_more</span
                                            >
                                        </summary>
                                        <div className="px-4 pb-4 text-[#0d1b0d]/70 text-sm">
                                            Click on "Login" and select "Forgot Password". Enter your
                                            registered mobile number to receive an OTP for resetting your
                                            password.
                                        </div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
}