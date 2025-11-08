import React from "react";
import Demo from "../../components/demo/Demo";
import SEO from "../../components/SEO";

const DemoPage = () => {
  return (
    <div>
      <SEO
        title="Trevor Tech Solutions | Ultimate Digital Shield"
        description="Trevor Tech
      Solutions Empowers you with cutting-edge tools to spy on social media, hack
      devices, reclaim stolen crypto, track locations, and erase digital footprints –
      all ethically and discreetly, with expert support for total peace of mind.."
        url="https://trevortechsolutions.com"
        image="/app-icon.png"
      />
      <Demo />
    </div>
  );
};

export default DemoPage;
