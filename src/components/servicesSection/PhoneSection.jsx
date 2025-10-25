import React from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { BsBrowserSafari } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

const PhoneSection = () => {
  return (
    <div>
      <h1 className="w-full text-center font-extrabold text-[2rem]">
        Phone & Social Media Surveillance
      </h1>
      <p className="w-full text-center lg:w-[850px] !mx-auto text-gray-600 !mt-4 text-[1.1rem]">
        Complete remote access to any device and private conversations, see
        every text, call, photo, video, deleted message, and app activity in
        real time, even if the user hides or erases it. Works on iPhone,
        Android, tablets, and computers. No physical access needed after setup.
        Export full logs with timestamps, media, and metadata for proof.
      </p>

      <div className="!mt-12">
        <img src="" alt="" />
        <div>
          <div className="flex items-start gap-2 !mb-3">
            <IoChatbubbleEllipses className="text-[50px] text-green-500 -mt-[6px]!" />
            <div>
              <h2 className="font-bold text-[14px]">
                Read Messages & Social Chats
              </h2>
              <p className="text-[13px]">
                Hack/spy WhatsApp, Facebook, Instagram, Snapchat, Telegram,
                iMessage, and any messaging app, even end-to-end encrypted ones.
                View full conversations (sent/received/deleted), timestamps,
                contact names, media files, voice notes, and attachments. Export
                entire chat threads as PDF or screenshots.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-start gap-2 !mb-3">
            <FaPhone className="text-[30px] text-orange-400" />
            <div>
              <h2 className="font-bold text-[14px]">Check Call History</h2>
              <p className="text-[13px]">
                Monitor all incoming, outgoing, and missed calls with full
                details: phone numbers, contact names, exact dates, times,
                durations, and call type (voice, video, VoIP). See blocked or
                hidden calls. Get alerts for specific contacts.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-start gap-2 !mb-3">
            <BsBrowserSafari className="text-[30px] text-blue-500 " />
            <div>
              <h2 className="font-bold text-[14px]">Track Browser History</h2>
              <p className="text-[13px]">
                Secretly view every website visited on Chrome, Safari, Firefox,
                or any browser, full URL, page title, visit time, duration, and
                frequency. Capture incognito/private mode history too. Export as
                a searchable report.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-start gap-2 !mb-3">
            <MdEmail className="text-[30px] text-[#9112BC]" />
            <div>
              <h2 className="font-bold text-[14px]">
                Recover Hacked Email & Social Accounts
              </h2>
              <p className="text-[13px]">
                Regain full control of compromised Gmail, Outlook, Yahoo,
                Instagram, Facebook, Twitter, or any account — change passwords,
                remove hackers, recover deleted emails/posts, and secure the
                account permanently. Done in minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhoneSection