import React from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { BsBrowserSafari } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import PhoneSectionImage from '../../assets/phone-section-image.webp';

const PhoneSection = () => {

    const features = [
      {
        id: 1,
        Icon: IoChatbubbleEllipses,
        iconBg: "bg-green-50",
        iconColor: "text-green-500",
        title: "Read Messages & Social Chats",
        desc: `Hack/spy WhatsApp, Facebook, Instagram, Snapchat, Telegram, iMessage, and any messaging app — view full conversations, timestamps, contact names, media files, voice notes, and attachments. Export chat threads as PDF or screenshots.`,
      },
      {
        id: 2,
        Icon: FaPhone,
        iconBg: "bg-orange-50",
        iconColor: "text-orange-400",
        title: "Check Call History",
        desc: `Monitor incoming, outgoing, and missed calls with details: numbers, contact names, exact dates/times, durations and call type (voice, video, VoIP). Get alerts for specific contacts.`,
      },
      {
        id: 3,
        Icon: BsBrowserSafari,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        title: "Track Browser History",
        desc: `View every website visited on Chrome, Safari, Firefox, or any browser (full URL, title, visit time, duration, frequency). Capture incognito/private mode history and export searchable reports.`,
      },
      {
        id: 4,
        Icon: MdEmail,
        iconBg: "bg-purple-50",
        iconColor: "text-[#9112BC]",
        title: "Recover Hacked Email & Social Accounts",
        desc: `Regain control of compromised Gmail, Outlook, Yahoo, Instagram, Facebook, Twitter — change passwords, remove attackers, recover deleted emails/posts, and secure the account permanently.`,
      },
    ];
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

      <div className="!mt-12 flex items-center gap-2 flex-col lg:flex-row">
        <img
          src={PhoneSectionImage}
          alt="phone-section-image"
          className="w-[600px]"
        />
        <div>
          {features.map(({ id, Icon, iconBg, iconColor, title, desc }) => (
            <div key={id} className="flex gap-4 items-start mb-4!">
              {/* Icon container: fixed size so icons are visually identical */}
              <div
                className={`flex-shrink-0 w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center`}
                aria-hidden="true"
              >
                <Icon className={`${iconColor}`} size={22} />
              </div>

              {/* Text block */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 leading-tight">
                  {title}
                </h3>
                <p className="mt-1 text-[13px] text-gray-600 leading-relaxed max-w-prose">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PhoneSection