import React from "react";
import { useTranslation } from "react-i18next";

const DemoFooter = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center !py-6 sm:!py-8 text-[10px] sm:text-xs text-slate-500">
      {t("df.copyright", { year: 2025 })}{" "}
      <span className="font-bold">TrevorTech</span> {t("df.rights_reserved")}
    </div>
  );
};

export default DemoFooter;
