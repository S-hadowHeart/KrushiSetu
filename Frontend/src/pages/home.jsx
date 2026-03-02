import React from "react";
import { NavLink } from "react-router-dom";

export function Home(){
    return(
        <>
        <section className="@container">
          <div className="p-4 md:p-6 lg:p-8">
            <div
              className="relative flex min-h-[500px] flex-col items-center justify-center gap-8 rounded-xl overflow-hidden bg-cover bg-center bg-no-repeat p-8 md:p-16 shadow-lg"
              data-alt="Lush green farm fields in Gujarat during sunset"
              style={{
                  backgroundImage:
                  `linear-gradient(
                    rgba(16, 34, 16, 0.4) 0%,
                    rgba(16, 34, 16, 0.7) 100%
                  ),
                 url('images/home/farm.png')`
                }}
            >
              <div className="flex max-w-3xl flex-col gap-4 text-center z-10">
                <div
                  className="inline-flex items-center justify-center gap-2 self-center rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-xs font-bold text-white mb-2 border border-white/30"
                >
                  <span className="material-symbols-outlined text-[16px]"
                    >location_on</span
                  >
                  <span>Serving Rajkot, Amreli &amp; Junagadh</span>
                </div>
                <h1
                  className="text-white text-4xl font-black leading-tight tracking-tight md:text-5xl lg:text-6xl drop-shadow-sm"
                >
                  Direct from Gujarat's Farms to Your Doorstep
                </h1>
                <h2
                  className="text-gray-100 text-base font-medium leading-relaxed md:text-lg lg:text-xl max-w-2xl mx-auto drop-shadow-sm"
                >
                  India's most trusted zero-commission marketplace. Connect
                  directly with verified farmers, bypass middlemen, and get the
                  best prices for your produce.
                </h2>
              </div>
              <div
                className="flex flex-col sm:flex-row flex-wrap gap-4 z-10 w-full justify-center"
              >
                <NavLink
                  to='/farmmer/registration'
                  className="group flex min-w-[160px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary-dark px-6 py-4 text-text-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <span
                    className="material-symbols-outlined group-hover:animate-bounce"
                    >agriculture</span
                  >
                  <span className="text-base font-bold">Join as Farmer</span>
            </NavLink>
                <NavLink
                to="/buyer/registration"
                  className="group flex min-w-[160px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent-orange hover:bg-orange-600 px-6 py-4 text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <span className="material-symbols-outlined">shopping_basket</span>
                  <span className="text-base font-bold">Join as Buyer</span>
          </NavLink>
              </div>
            </div>
          </div>
        </section>
        
        <section className="layout-container px-4 py-12 md:px-10 lg:px-20">
          <div className="flex flex-col items-center gap-4 text-center mb-12">
            <h2 className="text-text-dark text-3xl font-bold leading-tight">
              Why Choose KrushiSetu?
            </h2>
            <p className="text-gray-600 max-w-lg">
              We are committed to transparent agricultural trading that empowers
              the kisan community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            <div
              className="group flex flex-col gap-4 rounded-xl border border-primary/20 bg-white p-6 transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div
                className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary-dark group-hover:bg-primary group-hover:text-text-dark transition-colors"
              >
                <span className="material-symbols-outlined text-[28px]"
                  >currency_rupee</span
                >
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-text-dark text-lg font-bold">
                  Zero Commission
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Keep 100% of your hard-earned money. No hidden fees or
                  platform charges for farmers.
                </p>
              </div>
            </div>
           
            <div
              className="group flex flex-col gap-4 rounded-xl border border-primary/20 bg-white p-6 transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div
                className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary-dark group-hover:bg-primary group-hover:text-text-dark transition-colors"
              >
                <span className="material-symbols-outlined text-[28px]"
                  >handshake</span
                >
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-text-dark text-lg font-bold">Direct Trading</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Chat directly with buyers and sellers. Negotiate your own
                  terms without middlemen intervention.
                </p>
              </div>
            </div>
           
            <div
              className="group flex flex-col gap-4 rounded-xl border border-primary/20 bg-white p-6 transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div
                className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary-dark group-hover:bg-primary group-hover:text-text-dark transition-colors"
              >
                <span className="material-symbols-outlined text-[28px]"
                  >verified_user</span
                >
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-text-dark text-lg font-bold">
                  Verified Profiles
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Trade with confidence. All participants undergo mandatory ID
                  verification (Aadhar/Kisan Card).
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section
          className="bg-gray-50 py-16 px-4 md:px-10 lg:px-20 border-y border-gray-100"
        >
          <div className="layout-container mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2
                  className="text-text-dark text-2xl md:text-3xl font-bold leading-tight"
                >
                  Live Market Preview
                </h2>
                <p className="text-gray-500 mt-1 text-sm">
                  Fresh listings from across Saurashtra
                </p>
              </div>
              <NavLink
                className="hidden sm:flex items-center gap-1 text-primary-dark font-bold text-sm hover:underline"
                to="#"
              >
                View All Markets
                <span className="material-symbols-outlined text-[18px]"
                  >arrow_forward</span
                >
              </NavLink>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div
                className="group flex flex-col rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="h-48 w-full bg-gray-200 relative">
                  <img
                    alt="Fresh harvested wheat crop"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    data-alt="Golden wheat grains close up"
                    src="/test_images/home/wheat.png"
                    loading="lazy"
                    />
                  <div
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-text-dark shadow-sm"
                  >
                    2 hrs ago
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow gap-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-text-dark text-lg">
                      Wheat - Sharbati
                    </h3>
                    <span
                      className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded"
                      >Organic</span
                    >
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <span className="material-symbols-outlined text-[14px]"
                      >location_on</span
                    >
                    <span>Gondal APMC</span>
                  </div>
                  <div
                    className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-gray-400 text-xs font-medium">Price</p>
                      <p className="text-accent-orange font-bold">
                        ₹2,800
                        <span className="text-xs font-normal text-gray-500"
                          >/ Quintal</span
                        >
                      </p>
                    </div>
                    <button
                      className="bg-primary/10 hover:bg-primary text-primary-dark hover:text-text-dark p-2 rounded-lg transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]"
                        >chat</span
                      >
                    </button>
                  </div>
                </div>
              </div>
              
              <div
                className="group flex flex-col rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="h-48 w-full bg-gray-200 relative">
                  <img
                    alt="Raw cotton bolls on plant"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    data-alt="White fluffy cotton bolls ready for harvest"
                    src="/test_images/home/cotten.png"  
                    loading="lazy"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow gap-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-text-dark text-lg">
                      Cotton (Kapas)
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <span className="material-symbols-outlined text-[14px]"
                      >location_on</span
                    >
                    <span>Amreli, Gujarat</span>
                  </div>
                  <div
                    className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-gray-400 text-xs font-medium">Price</p>
                      <p className="text-accent-orange font-bold">
                        ₹6,500
                        <span className="text-xs font-normal text-gray-500"
                          >/ Quintal</span
                        >
                      </p>
                    </div>
                    <button
                      className="bg-primary/10 hover:bg-primary text-primary-dark hover:text-text-dark p-2 rounded-lg transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]"
                        >chat</span
                      >
                    </button>
                  </div>
                </div>
              </div>
              
              <div
                className="group flex flex-col rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="h-48 w-full bg-gray-200 relative">
                  <img
                    alt="Heap of groundnuts"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    data-alt="Freshly harvested groundnuts peanuts pile"
                    src="/test_images/home/groundnut.png"  
                    loading="lazy"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow gap-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-text-dark text-lg">
                      Groundnut (Java)
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <span className="material-symbols-outlined text-[14px]"
                      >location_on</span
                    >
                    <span>Junagadh Yard</span>
                  </div>
                  <div
                    className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-gray-400 text-xs font-medium">Price</p>
                      <p className="text-accent-orange font-bold">
                        ₹5,200
                        <span className="text-xs font-normal text-gray-500"
                          >/ Quintal</span
                        >
                      </p>
                    </div>
                    <button
                      className="bg-primary/10 hover:bg-primary text-primary-dark hover:text-text-dark p-2 rounded-lg transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]"
                        >chat</span
                      >
                    </button>
                  </div>
                </div>
              </div>
             
              <div
                className="group flex flex-col rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="h-48 w-full bg-gray-200 relative">
                  <img
                    alt="Red onions pile"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    data-alt="Pile of red onions at market"
                    src="test_images/home/onion.png"  
                    loading="lazy"
                  />
                  <div
                    className="absolute top-3 right-3 bg-accent-orange px-2 py-1 rounded text-xs font-bold text-white shadow-sm"
                  >
                    Hot
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow gap-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-text-dark text-lg">
                      Red Onion (Nashik)
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <span className="material-symbols-outlined text-[14px]"
                      >location_on</span
                    >
                    <span>Mahuva, Bhavnagar</span>
                  </div>
                  <div
                    className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-gray-400 text-xs font-medium">Price</p>
                      <p className="text-accent-orange font-bold">
                        ₹1,200
                        <span className="text-xs font-normal text-gray-500"
                          >/ 20kg</span
                        >
                      </p>
                    </div>
                    <button
                      className="bg-primary/10 hover:bg-primary text-primary-dark hover:text-text-dark p-2 rounded-lg transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]"
                        >chat</span
                      >
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center sm:hidden">
              <NavLink
                className="inline-flex items-center gap-1 text-primary-dark font-bold text-sm hover:underline"
                to="#"
              >
                View All Markets
                <span className="material-symbols-outlined text-[18px]"
                  >arrow_forward</span
                >
              </NavLink>
            </div>
          </div>
        </section>
        
        <section className="bg-background-dark py-12 px-4 md:px-10">
          <div
            className="layout-container mx-auto flex flex-col md:flex-row items-center justify-center gap-12 text-white text-center md:text-left"
          >
            <div className="flex flex-col gap-1">
              <h4 className="text-4xl font-bold text-primary">15,000+</h4>
              <p className="text-gray-300 text-sm">Active Farmers</p>
            </div>
            <div className="hidden md:block h-12 w-px bg-white/10"></div>
            <div className="flex flex-col gap-1">
              <h4 className="text-4xl font-bold text-primary">₹20 Cr+</h4>
              <p className="text-gray-300 text-sm">Trade Value Generated</p>
            </div>
            <div className="hidden md:block h-12 w-px bg-white/10"></div>
            <div className="flex items-center gap-4 max-w-sm">
              <div
                className="size-12 rounded-full bg-gray-700 shrink-0 overflow-hidden"
              >
                <img
                  alt="Indian farmer portrait"
                  data-alt="Portrait of a smiling Indian man with a turban"
                  src="/test_images/home/indianFarmmer.png"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-sm italic text-gray-200">
                  "KrushiSetu helped me sell my cotton crop directly to a mill
                  in Ahmedabad. Best rates I've ever got!"
                </p>
                <p className="text-xs font-bold text-primary mt-1">
                  - Rajeshbhai Patel, Rajkot
                </p>
              </div>
            </div>
          </div>
        </section>
        </>
    );
}