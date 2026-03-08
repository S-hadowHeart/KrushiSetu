import React from "react";

export function Error_404(){
    return(
        <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
  <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
    
    <div className="@container">
      <div
        className="flex flex-col gap-6 px-4 py-10 @[480px]:gap-8 @[864px]:flex-row items-center"
      >
        <div
          className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl shadow-sm @[480px]:h-auto @[480px]:min-w-[400px] @[864px]:w-1/2"
          data-alt="Close up of a small green plant sprouting from soil symbolizing growth"
          style={{
            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCowOFC_e5FrwPbMZKLlvlxsahrCQUSGRIopN2hHLSPSicGVb7qaSLLbGB7-ur65GNbl-rlLZRUh2A_hcQF4tL2PGo9Gwafo1Sxtute9AQcOOoicvFrs0fYBinJU4ErJ6Pa2NbItg2GnQYg1oTYPKlFQO40eaz5j2TtrL9t4FYkj0IMu7TbwyWLOaKXWFUXECNRN-NLh3_QEQDa7MHqCZyloDLW34kAWU_klf4BaEqr0rVFtZuh_JISTkdLRLqsb3g5XLDUBQMYRYM")`
                              
                  }}
        ></div>
        <div
          className="flex flex-col gap-6 @[480px]:min-w-[400px] @[480px]:gap-8 @[864px]:justify-center @[864px]:w-1/2"
        >
          <div className="flex flex-col gap-4 text-left">
            <span
              className="inline-block w-fit rounded-full bg-primary/20 px-3 py-1 text-sm font-semibold text-green-800"
            >
              Coming Soon
            </span>
            <h1
              className="text-[#0d1b0d] text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl"
            >
              We are cultivating new features!
            </h1>
            <h2
              className="text-neutral-600 text-sm font-normal leading-relaxed @[480px]:text-base"
            >
              To ensure the safest and most profitable experience for our
              farmers and buyers, we are currently building a Negotiation
              Dashboard, Escrow Payments, and advanced Analytics. These tools
              take time to grow perfectly.
            </h2>
          </div>
         
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#0d1b0d]"
              >Be the first to know when we harvest these updates.</label
            >
            <div className="flex flex-col sm:flex-row gap-2 w-full max-w-[480px]">
              <div
                className="flex w-full flex-1 items-stretch rounded-lg h-12 bg-white border border-[#cfe7cf] focus-within:border-primary focus-within:ring-1 focus-within:ring-primary overflow-hidden transition-all"
              >
                <div
                  className="text-[#4c9a4c] flex items-center justify-center pl-4"
                >
                  <span className="material-symbols-outlined text-[20px]"
                    >mail</span
                  >
                </div>
                <input
                  className="w-full min-w-0 flex-1 bg-transparent border-none focus:ring-0 text-[#0d1b0d] placeholder:text-[#4c9a4c]/60 px-3 text-sm"
                  placeholder="Enter your email address"
                  type="email"
                />
              </div>
              <button
                className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-primary hover:bg-[#0fd60f] text-[#0d1b0d] text-base font-bold transition-all shadow-sm hover:shadow-md"
              >
                Notify Me
              </button>
            </div>
            <p className="text-xs text-[#4c9a4c]">
              No spam, just important updates.
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <div className="flex flex-col gap-10 px-4 py-16 @container">
      <div className="flex flex-col gap-4 text-center items-center">
        <h3
          className="text-[#0d1b0d] tracking-light text-2xl font-bold leading-tight @[480px]:text-3xl"
        >
          What's Sprouting?
        </h3>
        <p
          className="text-neutral-600 text-base font-normal leading-normal max-w-[600px]"
        >
          Get ready for powerful tools designed to help you succeed in the
          marketplace.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       
        <div
          className="flex flex-col gap-4 rounded-xl border border-[#cfe7cf] bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div
            className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-green-800"
          >
            <span className="material-symbols-outlined text-[24px]">handshake</span>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-[#0d1b0d] text-lg font-bold leading-tight">
              Negotiation Dashboard
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Streamlined communication for better deals. Discuss prices and
              terms directly within the platform.
            </p>
          </div>
        </div>
        
        <div
          className="flex flex-col gap-4 rounded-xl border border-[#cfe7cf] bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div
            className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-green-800"
          >
            <span className="material-symbols-outlined text-[24px]"
              >verified_user</span
            >
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-[#0d1b0d] text-lg font-bold leading-tight">
              Escrow Payments
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Secure transactions for peace of mind. Funds are held safely until
              both parties are satisfied.
            </p>
          </div>
        </div>
      
        <div
          className="flex flex-col gap-4 rounded-xl border border-[#cfe7cf] bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div
            className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-green-800"
          >
            <span className="material-symbols-outlined text-[24px]"
              >monitoring</span
            >
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-[#0d1b0d] text-lg font-bold leading-tight">
              Advanced Analytics
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Data-driven insights to maximize profits. Understand market trends
              and pricing history.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    );
}