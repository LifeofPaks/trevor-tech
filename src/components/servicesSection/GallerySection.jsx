import React from "react";
import CryptoImage from "../../assets/crypto-image.png";
import { IoCheckmarkDone } from "react-icons/io5";

const features = [
  {
    id: 1,
    title: "Recover Stolen & Scammed Crypto",
    desc: "Recover lost, stolen, or scammed cryptocurrency from wallets (Bitcoin, Ethereum, USDT, etc.). Trace blockchain transactions and identify scammer wallets. Success rate tracking included.",
  },
  {
    id: 2,
    title: "Boost Credit & Load Cards",
    desc: "Boost credit scores (Equifax, TransUnion, Experian) by addressing negative items. Load debit/prepaid cards and access full credit reports and transaction histories.",
  },
  {
    id: 3,
    title: "Hidden Chats & Private Data",
    desc: "Access hidden chats, deleted stories, direct messages, and private albums across major platforms — see conversation history and shared media.",
  },
  {
    id: 4,
    title: "Stop Blackmail & Remove Compromising Material",
    desc: "Identify blackmailers, remove compromising material from devices/cloud, block future contact, and erase traces online for full protection and peace of mind.",
  },
  {
    id: 5,
    title: "Driving Records & ID Services",
    desc: "Pull driving records and access registration details. (Note: follow local laws and use only legal services.)",
  },
];

const GallerySection = () => {
  return (
    <section className="!pt-20">
      <div className="max-w-7xl !mx-auto lg:!px-6">
        <div className="flex flex-col-reverse lg:flex-row items-start gap-10 lg:gap-16">
          {/* Left - content */}
          <div className="flex-1">
            <h2 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl text-gray-900 text-center lg:text-left">
              Financial & Crypto Recovery Solutions
            </h2>

            <p className="!mt-4 text-gray-600 text-base sm:text-lg max-w-3xl text-center lg:text-left">
              Take back control of money, credit, and digital assets. Recover
              scammed crypto, boost credit scores, load debit cards, and stop
              financial blackmail. Full transparency into bank logs,
              transactions, and hidden accounts.
            </p>

            <ul className="!mt-8 !space-y-4">
              {features.map((f) => (
                <li key={f.id} className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-md flex items-center justify-center bg-green-50"
                    aria-hidden="true"
                  >
                    <IoCheckmarkDone className="text-green-600" size={20} />
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800">
                      {f.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed max-w-prose">
                      {f.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - image */}
          <div className="w-full lg:w-[500px] flex-shrink-0">
            <img
              src={CryptoImage}
              alt="cryptocurrency illustration"
              className="w-full h-[500px] rounded-xl object-cover "
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
