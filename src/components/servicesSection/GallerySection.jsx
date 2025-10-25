import React from 'react'
import CryptoImage from '../../assets/crypto-image.jpg'
import { IoCheckmarkDone } from "react-icons/io5";

const GallerySection = () => {
  return (
    <div className="!pt-[5rem] flex items-center gap-12">
      <div>
        <h1 className=" font-extrabold text-[2rem]" id="services">
          Financial & Crypto Recovery Solutions
        </h1>
        <p className="  text-gray-600 !mt-4 text-[1.1rem]">
          Take back control of money, credit, and digital assets, recover
          scammed crypto, boost credit scores, load debit cards, and stop
          financial blackmail. Full transparency into bank logs, transactions,
          and hidden accounts.
        </p>

        <div className="!mt-6 flex flex-col gap-4">
          <div className="flex items-start gap-2">
            <IoCheckmarkDone className="text-green-600 " size={32} />
            <p className="text-[13px]">
              Hack/recover lost, stolen, or scammed cryptocurrency from wallets
              (Bitcoin, Ethereum, USDT, etc.). Trace blockchain transactions,
              identify scammer wallets, and retrieve funds — even from fake
              investment platforms or phishing attacks. Success rate tracking
              included.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <IoCheckmarkDone className="text-green-600 " size={32} />
            <p className="text-[13px]">
              Instantly boost credit scores (Equifax, TransUnion, Experian) by
              removing negative items or adding positive tradelines. Load
              debit/prepaid cards with real funds. Access full credit reports,
              bank logs, and transaction histories.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <IoCheckmarkDone className="text-green-600 " size={32} />
            <p className="text-[13px]">
              Get undetectable access to hidden chats, secret followers, deleted
              stories, direct messages, and private albums on Instagram,
              Facebook, Snapchat, and dating apps. See who they’re messaging at
              2 AM — even if they use “disappearing” messages.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <IoCheckmarkDone className="text-green-600 " size={32} />
            <p className="text-[13px]">
              Identify the blackmailer (IP, email, phone, social profiles),
              delete compromising photos/videos from their device and cloud,
              block future contact, and erase all traces of the material online.
              Full protection and peace of mind.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <IoCheckmarkDone className="text-green-600 " size={32} />
            <p className="text-[13px]">
              Pull complete driving records (points, violations, suspensions).
              Create or modify state-issued ID cards and driver licenses with
              real data in official DMV systems. Get scannable, registered
              licenses — no test, no wait.
            </p>
          </div>
        </div>
      </div>
      <img src={CryptoImage} alt="" className="w-[500px]" />
    </div>
  );
}

export default GallerySection