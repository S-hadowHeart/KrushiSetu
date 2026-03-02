import React from "react";

export function Footer(){
    return(
        <footer className="bg-white border-t border-gray-200 py-10 px-6">
        <div
          className="layout-container mx-auto max-w-6xl flex flex-col md:flex-row justify-between gap-8"
        >
          <div className="flex flex-col gap-4 max-w-xs">
            <div className="flex items-center gap-2">
              <div
                className="flex size-8 items-center justify-center rounded bg-primary text-text-dark"
              >
                <span className="material-symbols-outlined text-xl"
                  >agriculture</span
                >
              </div>
              <h2 className="text-text-dark text-lg font-bold tracking-tight">
                KrushiSetu
              </h2>
            </div>
            <p className="text-gray-500 text-sm">
              Connecting Gujarat's agricultural ecosystem. Empowering farmers,
              enabling buyers.
            </p>
          </div>
          <div className="flex gap-16 flex-wrap">
            <div className="flex flex-col gap-3">
              <h5 className="font-bold text-text-dark text-sm">Platform</h5>
              <a className="text-gray-500 text-sm hover:text-primary-dark" href="#"
                >Browse Crops</a
              >
              <a className="text-gray-500 text-sm hover:text-primary-dark" href="#"
                >Sell Produce</a
              >
              <a className="text-gray-500 text-sm hover:text-primary-dark" href="#"
                >Market Rates</a
              >
            </div>
            <div className="flex flex-col gap-3">
              <h5 className="font-bold text-text-dark text-sm">Support</h5>
              <a className="text-gray-500 text-sm hover:text-primary-dark" href="#"
                >Help Center</a
              >
              <a className="text-gray-500 text-sm hover:text-primary-dark" href="#"
                >Safety Tips</a
              >
              <a className="text-gray-500 text-sm hover:text-primary-dark" href="#"
                >Contact Us</a
              >
            </div>
            <div className="flex flex-col gap-3">
              <h5 className="font-bold text-text-dark text-sm">Legal</h5>
              <a className="text-gray-500 text-sm hover:text-primary-dark" href="#"
                >Terms of Service</a
              >
              <a className="text-gray-500 text-sm hover:text-primary-dark" href="#"
                >Privacy Policy</a
              >
            </div>
          </div>
        </div>
        <div
          className="layout-container mx-auto max-w-6xl mt-10 pt-6 border-t border-gray-100 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs"
        >
          <p>© 2023 KrushiSetu. Made with ❤️ in Gujarat.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a className="hover:text-primary-dark transition-colors" href="#"
              ><span className="material-symbols-outlined text-lg"
                >social_leaderboard</span
              ></a
            >
            <a className="hover:text-primary-dark transition-colors" href="#"
              ><span className="material-symbols-outlined text-lg">public</span></a
            >
            
          </div>
        </div>
      </footer>
    );
}