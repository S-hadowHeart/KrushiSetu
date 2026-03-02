import React, { useState } from "react";

export function About() {
    const [activeTab, setActiveTab] = useState("farmmers")
    return (
        <>
            <section className="relative overflow-hidden bg-background-dark py-20 lg:py-32">
                <div className="absolute inset-0 z-0 opacity-40">
                    <img
                        alt="Indian farmers in a green field looking at crops"
                        className="h-full w-full object-cover"
                        data-alt="Indian farmers discussing in a green field under bright sun"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0gaVg7FOweQap1B0VCyviFX0hJ17A8HKrtRgecazAyaZpQ9IIYxup31dhC97iZ8BZcMDKDjqFSk0TK8iuEZhl4z3ByFgS2HCTCbvRfayi42RiujjRysCzui1r5cIG8miWDXM6AbTD3MCBU612GgK1X1_-fusHBuYROg0xdb3rTHc0_4Xhz1uLajEUQUFtDNMvCZ8Y65bb-kbKXXgSiPg-HGwGsdWplzw0OJW9iVgRVlR5FIS57dq5SC15mtByYlGVJwIJZePdm9k"
                    />
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent"
                    ></div>
                </div>
                <div
                    className="layout-container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
                >
                    <div className="max-w-3xl">
                        <div
                            className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-sm font-semibold text-primary backdrop-blur-sm mb-6 border border-primary/20"
                        >
                            <span className="material-symbols-outlined text-sm">location_on</span>
                            Serving Rajkot &amp; Jamnagar
                        </div>
                        <h1
                            className="text-4xl font-black text-white sm:text-5xl lg:text-7xl tracking-tight mb-6"
                        >
                            Bridging the Gap: <br />
                            <span className="text-primary">Farm to Market</span> in Gujarat.
                        </h1>
                        <p
                            className="text-lg text-gray-300 sm:text-xl max-w-2xl leading-relaxed mb-10"
                        >
                            We are building a transparent ecosystem where farmers sell directly to
                            buyers. No middlemen, no hidden fees—just fair prices for everyone
                            involved.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                className="flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-base font-bold text-[#0d1b0d] shadow-lg shadow-primary/25 transition-transform hover:scale-105"
                            >
                                View Marketplace
                            </button>
                            <button
                                className="flex h-12 items-center justify-center rounded-lg border border-white/20 bg-white/5 px-8 text-base font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                            >
                                Our Story
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 sm:py-24 bg-background-light dark:bg-background-dark">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-2">
                            Our Mission
                        </h2>
                        <h3
                            className="text-3xl font-black text-text-main dark:text-white sm:text-4xl mb-4"
                        >
                            Why KrushiSetu Exists
                        </h3>
                        <p className="text-text-muted dark:text-gray-400 text-lg">
                            We believe that the people who grow our food deserve the biggest share
                            of the profit. We are rewriting the rules of agricultural trade in
                            Gujarat.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div
                            className="group relative overflow-hidden rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-white/5 p-8 shadow-sm transition-all hover:shadow-md dark:hover:bg-white/5"
                        >
                            <div
                                className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black transition-colors"
                            >
                                <span className="material-symbols-outlined text-3xl">handshake</span>
                            </div>
                            <h4 className="text-xl font-bold text-text-main dark:text-white mb-3">
                                Eliminating Middlemen
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Direct connections mean
                                <span className="text-primary font-bold">0% commission fees</span>.
                                Farmers keep more of what they earn, and buyers get fresher produce at
                                better rates.
                            </p>
                        </div>

                        <div
                            className="group relative overflow-hidden rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-white/5 p-8 shadow-sm transition-all hover:shadow-md dark:hover:bg-white/5"
                        >
                            <div
                                className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black transition-colors"
                            >
                                <span className="material-symbols-outlined text-3xl">trending_up</span>
                            </div>
                            <h4 className="text-xl font-bold text-text-main dark:text-white mb-3">
                                Empowering Farmers
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                We provide digital tools for inventory management and fair pricing
                                data, giving control back to the growers of Jamnagar and Rajkot.
                            </p>
                        </div>

                        <div
                            className="group relative overflow-hidden rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-white/5 p-8 shadow-sm transition-all hover:shadow-md dark:hover:bg-white/5"
                        >
                            <div
                                className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black transition-colors"
                            >
                                <span className="material-symbols-outlined text-3xl">local_shipping</span>
                            </div>
                            <h4 className="text-xl font-bold text-text-main dark:text-white mb-3">
                                Hyper-Local Logistics
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Our platform is optimized for local transport networks, ensuring
                                quick, reliable, and cost-effective movement of goods within the
                                district.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section
                className="py-16 bg-white dark:bg-surface-dark border-y border-gray-100 dark:border-white/5"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div
                        className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
                    >
                        <div className="max-w-xl">
                            <h2
                                className="text-3xl font-black text-text-main dark:text-white sm:text-4xl mb-4"
                            >
                                How KrushiSetu Works
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">
                                Whether you are harvesting or buying, we make the process simple,
                                secure, and fast.
                            </p>
                        </div>

                        <div
                            className="inline-flex rounded-lg bg-gray-100 dark:bg-black/20 p-1 self-start md:self-end"
                        >
                            <button
                                onClick={() => setActiveTab("farmmers")}
                                id="farmers-tab"
                                className={`px-4 py-2 rounded-md transition ${activeTab === "farmmers"
                                        ? "bg-white dark:bg-background-dark shadow-sm font-bold text-text-main dark:text-white ring-1 ring-black/5 dark:ring-white/10"
                                        : "text-gray-500 dark:text-gray-400"
                                    }`}
                            >
                                For Farmers
                            </button>
                            <button
                                onClick={() => setActiveTab("buyers")}
                                className={`px-4 py-2 rounded-md transition ${activeTab === "buyers"
                                        ? "bg-white dark:bg-background-dark shadow-sm font-bold text-text-main dark:text-white ring-1 ring-black/5 dark:ring-white/10"
                                        : "text-gray-500 dark:text-gray-400"
                                    }`}
                            >
                                For Buyers
                            </button>
                        </div>
                    </div>

                    {activeTab == "farmmers" && (
                        <div id="farmers-steps" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">

                            <div
                                className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -z-10"
                            ></div>

                            <div className="relative flex flex-col items-center text-center">
                                <div
                                    className="h-24 w-24 rounded-full bg-surface-light dark:bg-surface-dark border-4 border-white dark:border-background-dark shadow-lg flex items-center justify-center mb-6 z-10"
                                >
                                    <span className="material-symbols-outlined text-4xl text-primary"
                                    >person_add</span
                                    >
                                </div>
                                <h3 className="text-lg font-bold text-text-main dark:text-white mb-2">
                                    1. Create Profile
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Sign up with your mobile number and basic farm details.
                                </p>
                            </div>

                            <div className="relative flex flex-col items-center text-center">
                                <div
                                    className="h-24 w-24 rounded-full bg-surface-light dark:bg-surface-dark border-4 border-white dark:border-background-dark shadow-lg flex items-center justify-center mb-6 z-10"
                                >
                                    <span className="material-symbols-outlined text-4xl text-primary"
                                    >inventory_2</span
                                    >
                                </div>
                                <h3 className="text-lg font-bold text-text-main dark:text-white mb-2">
                                    2. List Your Crop
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Add photos, set your price, and specify quantity available.
                                </p>
                            </div>

                            <div className="relative flex flex-col items-center text-center">
                                <div
                                    className="h-24 w-24 rounded-full bg-surface-light dark:bg-surface-dark border-4 border-white dark:border-background-dark shadow-lg flex items-center justify-center mb-6 z-10"
                                >
                                    <span className="material-symbols-outlined text-4xl text-primary"
                                    >verified_user</span
                                    >
                                </div>
                                <h3 className="text-lg font-bold text-text-main dark:text-white mb-2">
                                    3. Get Verified
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Complete our quick verification to earn the 'Trusted Seller' badge.
                                </p>
                            </div>

                            <div className="relative flex flex-col items-center text-center">
                                <div
                                    className="h-24 w-24 rounded-full bg-surface-light dark:bg-surface-dark border-4 border-white dark:border-background-dark shadow-lg flex items-center justify-center mb-6 z-10"
                                >
                                    <span className="material-symbols-outlined text-4xl text-primary"
                                    >payments</span
                                    >
                                </div>
                                <h3 className="text-lg font-bold text-text-main dark:text-white mb-2">
                                    4. Sell Directly
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Receive orders, arrange pickup, and get paid instantly.
                                </p>
                            </div>
                        </div>
                    )
                    }
                    {activeTab == "buyers" && (
                        <div id="buyers-steps" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative ">

                            <div
                                className="lg:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -z-10"
                            ></div>


                            <div className="relative flex flex-col items-center text-center">
                                <div
                                    className="h-24 w-24 rounded-full bg-surface-light dark:bg-surface-dark border-4 border-white dark:border-background-dark shadow-lg flex items-center justify-center mb-6 z-10"
                                >
                                    <span className="material-symbols-outlined text-4xl text-primary">
                                        account_circle
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-text-main dark:text-white mb-2">
                                    1. Create Account
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Register as a buyer with your business or personal details.
                                </p>
                            </div>


                            <div className="relative flex flex-col items-center text-center">
                                <div
                                    className="h-24 w-24 rounded-full bg-surface-light dark:bg-surface-dark border-4 border-white dark:border-background-dark shadow-lg flex items-center justify-center mb-6 z-10"
                                >
                                    <span className="material-symbols-outlined text-4xl text-primary">
                                        search
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-text-main dark:text-white mb-2">
                                    2. Browse or Post Requirement
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Search available crops or post your specific quantity requirement.
                                </p>
                            </div>


                            <div className="relative flex flex-col items-center text-center">
                                <div
                                    className="h-24 w-24 rounded-full bg-surface-light dark:bg-surface-dark border-4 border-white dark:border-background-dark shadow-lg flex items-center justify-center mb-6 z-10"
                                >
                                    <span className="material-symbols-outlined text-4xl text-primary">
                                        handshake
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-text-main dark:text-white mb-2">
                                    3. Send Offer & Negotiate
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Connect directly with farmers, negotiate pricing and finalize terms.
                                </p>
                            </div>


                            <div className="relative flex flex-col items-center text-center">
                                <div
                                    className="h-24 w-24 rounded-full bg-surface-light dark:bg-surface-dark border-4 border-white dark:border-background-dark shadow-lg flex items-center justify-center mb-6 z-10"
                                >
                                    <span className="material-symbols-outlined text-4xl text-primary">
                                        local_shipping
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-text-main dark:text-white mb-2">
                                    4. Receive & Review
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Arrange delivery or pickup, complete payment, and leave a review.
                                </p>
                            </div>
                        </div>
                    )
                    }
                </div>
            </section>

            <section
                className="py-16 sm:py-24 bg-background-light dark:bg-background-dark relative overflow-hidden"
            >

                <div
                    className="absolute right-0 top-0 h-full w-1/3 bg-primary/5 -skew-x-12 translate-x-20"
                ></div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="flex-1 space-y-8">
                            <div>
                                <div
                                    className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-4"
                                >
                                    <span className="material-symbols-outlined text-sm">security</span>
                                    Trust &amp; Safety
                                </div>
                                <h2
                                    className="text-3xl font-black text-text-main dark:text-white sm:text-4xl mb-6"
                                >
                                    Real Farmers.<br />Verified Quality.
                                </h2>
                                <p className="text-lg text-gray-600 dark:text-gray-400">
                                    Trust is the foundation of KrushiSetu. We've built a multi-tiered
                                    verification system to ensure that every profile on our platform
                                    belongs to a genuine agricultural producer or verified buyer.
                                </p>
                            </div>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <div
                                        className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                                    >
                                        <span className="material-symbols-outlined text-lg">badge</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-text-main dark:text-white">
                                            Government ID Check
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            We cross-reference Aadhar information to verify identity.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div
                                        className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                                    >
                                        <span className="material-symbols-outlined text-lg">landscape</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-text-main dark:text-white">
                                            Land Record Verification
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            Optional 7/12 extract verification for 'Pro Farmer' status.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div
                                        className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                                    >
                                        <span className="material-symbols-outlined text-lg">call</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-text-main dark:text-white">
                                            Active Phone Validation
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            OTP-based login ensures secure and reachable contacts.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="flex-1 w-full max-w-md lg:max-w-full">
                            <div
                                className="relative rounded-2xl bg-white dark:bg-surface-dark shadow-xl border border-gray-100 dark:border-white/10 p-6 overflow-hidden"
                            >

                                <div
                                    className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/20 blur-xl"
                                ></div>
                                <div className="flex flex-col items-center text-center py-8">
                                    <img
                                        alt="Portrait of a smiling Indian farmer in traditional shirt"
                                        className="h-24 w-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md mb-4"
                                        data-alt="Portrait of verified farmer Ramesh Patel"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKqDmyJ_jnUlqM1v7BKIcTXoNjDpCqiKQyuXe_yc4w7u2FR1QSCqM9EIsO4NNmBOUO5A-UXAqo3QOrjTRRz6coKS0HEhiSmyvBbuSy5oMkzyAY1QFn4TeVSYrIC3JoGMT0hfUNxdz7je4FV-7NUIDJXn5JrguoECKS43rbOl23xnJPisuLTJPsa3CzwXsyzcsp5ChBPzZOpsieiDbaAUxP0bOp2e-dvswN03472Y-J4hKvGbRh1WhJRYV-VjZv9St287oICUpqEmU"
                                    />
                                    <h3 className="text-xl font-bold text-text-main dark:text-white">
                                        Ramesh Patel
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-4">Farmer • Rajkot District</p>
                                    <div
                                        className="inline-flex items-center gap-1.5 rounded-full bg-green-100 dark:bg-green-900/50 px-3 py-1 text-sm font-bold text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                                    >
                                        <span className="material-symbols-outlined text-sm filled"
                                        >verified</span
                                        >
                                        Identity Verified
                                    </div>
                                    <div
                                        className="grid grid-cols-3 gap-4 w-full mt-8 pt-8 border-t border-gray-100 dark:border-white/10"
                                    >
                                        <div>
                                            <div className="text-2xl font-black text-text-main dark:text-white">
                                                45
                                            </div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wide">
                                                Deals
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-black text-text-main dark:text-white">
                                                4.9
                                            </div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wide">
                                                Rating
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-black text-text-main dark:text-white">
                                                2yr
                                            </div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wide">
                                                Member
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white dark:bg-surface-dark">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2
                            className="text-3xl font-black text-text-main dark:text-white sm:text-4xl"
                        >
                            Built for the Community
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            Join thousands of farmers and buyers already growing together.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
                        <div
                            className="col-span-2 row-span-2 relative group overflow-hidden rounded-xl"
                        >
                            <img
                                alt="Wide shot of busy agricultural market in Gujarat"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                data-alt="Bustling marketplace with piles of onions and active traders"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDU0pR6CgBKY0Yu-FqmlcvDE2-TRHd9GoA02PBqN5z2eUB5YZ9S_KQZOez9QoR4O1ccWGFwWGOllVTcugXz3GNK9P9yQOB8aTqV7Migj7NIQpeKgm0jxSL9flkrL-GnIeZGyj8OEBABocEEDX-6reeDaYSAdbV9lP0LGSjmjrAmO5dKg4iMjE79ePToWGvims_kRqyFwW8pkipC25nj2U439DZFwwMOlQY2b3WhFOvErBchzILsX0YIAd-H-K4XxYNNey7pmCD1t-o"
                            />
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end"
                            >
                                <span className="text-white font-bold text-lg">Rajkot Market Yard</span>
                            </div>
                        </div>
                        <div className="relative group overflow-hidden rounded-xl">
                            <img
                                alt="Close up of hands holding fresh groundnuts"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                data-alt="Hands holding fresh harvested groundnuts"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIYNcRKsmUY4p17gLr3gmdDYnjp0DGY6x9cwihOVCxGw6-nkrj1RD3V3lhhocNejbaDUoQe4M1_pnBzXgElsRqxAR9LpkSVD25dqno6d3kaIcpf_Kw3s2dza9ZeF_SFtPOZdtHdEh8Ce96AeQxlWDoJL17c-Xisz0u6S37vMhScU3bumCTy6WOrvh9i7RWwYtQIz-MuTZ3NdvcKQZ23lMs1PbGR5Aqa1XAuTKvSaUAyfMF6hW3zUlVi49a2Y0hJ97n66Rlv7OJfj8"
                            />
                        </div>
                        <div className="relative group overflow-hidden rounded-xl">
                            <img
                                alt="Fresh green vegetables displayed in sunlight"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                data-alt="Vibrant green vegetables ready for sale"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbrpqjtpWJ7mLoQo7Jxf5sM3RCA-uJ61RxdpK3aN0MGtIGjWlxI_6ePrL_ymqPA8o6HgIdzW39SWWE6zPvZZ1CqxmMySixy75tUZvxDz5502qJkNq0o-IUXmIHFBmme8LGazht6usGrYp3mnrhD1K6tjQBqqTa29Mj9N0Dp7hnqSOdoF7DWBpHZV3Dwzay0hvCcdY41F1p-MqTGoC8ortgHVto-kkKvphYGwKBBMPNagTm623UBiucupw4mMoSSkgm6PtbQ4zBkUk"
                            />
                        </div>
                        <div
                            className="col-span-2 relative group overflow-hidden rounded-xl bg-primary flex items-center justify-center p-8 text-center"
                        >
                            <div className="space-y-4">
                                <span className="material-symbols-outlined text-5xl text-[#0d1b0d]"
                                >format_quote</span
                                >
                                <p className="text-xl font-bold text-[#0d1b0d]">
                                    "KrushiSetu helped me sell my entire cotton harvest in 2 days at a
                                    15% higher rate than the local agent offered."
                                </p>
                                <p className="text-sm font-medium text-[#0d1b0d]/80">
                                    - Vikrambhai, Jamnagar
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



        </>

    );

}
