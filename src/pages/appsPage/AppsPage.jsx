import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  FaInstagram,
  FaSnapchatGhost,
  FaTwitter,
  FaViber,
  FaWhatsapp,
  FaTelegramPlane,
  FaFacebookMessenger,
  FaDiscord,
  FaWeixin,
  FaLine,
  FaRedditAlien,
  FaTwitch,
  FaLinkedin,
  FaPinterest,
  FaSpotify,
  FaYoutube,
  FaTiktok,
  FaSignal,
  FaSlack,
} from "react-icons/fa";
import { SiAppstore, SiGmail, SiTinder, SiZoom } from "react-icons/si";
import { useTranslation } from "react-i18next";
import BuyModal from "../../components/buyModal/BuyModal";

// Sample Data
const apps = [
  {
    nameKey: "dmapps.apps.0.name",
    icon: <FaInstagram className="!text-pink-600 !text-2xl" />,
  },
  {
    nameKey: "dmapps.apps.1.name",
    icon: <FaLine className="!text-green-600 !text-2xl" />,
  },
  {
    nameKey: "dmapps.apps.2.name",
    icon: <FaSnapchatGhost className="!text-yellow-400 !text-2xl" />,
  },
  {
    nameKey: "dmapps.apps.3.name",
    icon: <SiTinder className="!text-red-500 !text-2xl" />,
  },
  {
    nameKey: "dmapps.apps.4.name",
    icon: <FaTwitter className="!text-blue-400 !text-2xl" />,
  },
  {
    nameKey: "dmapps.apps.5.name",
    icon: <FaViber className="!text-purple-600 !text-2xl" />,
  },
  {
    nameKey: "dmapps.apps.6.name",
    icon: <FaWhatsapp className="!text-green-500 !text-2xl" />,
  },
  {
    nameKey: "dmapps.apps.7.name",
    icon: <FaTelegramPlane className="!text-blue-500 !text-2xl" />,
  },
  {
    nameKey: "dmapps.apps.8.name",
    icon: <FaFacebookMessenger className="!text-blue-600 !text-2xl" />,
  },
  {
    nameKey: "dmapps.apps.9.name",
    icon: <FaDiscord className="!text-indigo-500 !text-2xl" />,
  },
  {
    nameKey: "dmapps.apps.10.name",
    icon: <FaWeixin className="!text-green-500 !text-2xl" />,
  },
  {
    nameKey: "dmapps.apps.11.name",
    icon: <FaRedditAlien className="!text-orange-600 !text-2xl" />,
  },
  {
    nameKey: "dmapps.apps.12.name",
    icon: <FaTwitch className="!text-purple-600 !text-2xl" />,
  },
  {
    nameKey: "dmapps.apps.13.name",
    icon: <FaLinkedin className="!text-blue-700 !text-2xl" />,
  },
  {
    nameKey: "dmapps.apps.14.name",
    icon: <FaPinterest className="!text-red-600 !text-2xl" />,
  },
  {
    nameKey: "dmapps.apps.15.name",
    icon: <FaSpotify className="!text-green-500 !text-2xl" />,
  },
  {
    nameKey: "dmapps.apps.16.name",
    icon: <FaYoutube className="!text-red-600 !text-2xl" />,
  },
  {
    nameKey: "dmapps.apps.17.name",
    icon: <FaTiktok className="!text-black !text-2xl" />,
  },
  {
    nameKey: "dmapps.apps.18.name",
    icon: <FaSignal className="!text-blue-600 !text-2xl" />,
  },
  {
    nameKey: "dmapps.apps.19.name",
    icon: <SiGmail className="!text-red-500 !text-2xl" />,
  },
  {
    nameKey: "dmapps.apps.20.name",
    icon: <FaSlack className="!text-purple-600 !text-2xl" />,
  },
  {
    nameKey: "dmapps.apps.21.name",
    icon: <SiZoom className="!text-blue-600 !text-2xl" />,
  },
];

const AppsPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <header className="!mb-4 sm:!mb-6 !px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
          <div className="flex items-center !gap-2 sm:!gap-3">
            <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
              {t("dmapps.header.title")}{" "}
              <SiAppstore className="text-[#0695c8]" />
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center !gap-2 sm:!gap-3">
            <span className="text-[10px] sm:text-xs text-orange-600 bg-orange-100 !px-3 sm:!px-4 !py-1.5 sm:!py-2 rounded-full font-medium">
              {t("dmapps.header.demo_message")}
            </span>
            <button
              onClick={handleOpen}
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[13px] !px-4 sm:!px-5 !py-1.5 sm:!py-2 rounded-full font-semibold shadow-md hover:shadow-xl transition-all hover:scale-105 whitespace-nowrap"
              aria-label={t("dmapps.header.bind_button_aria")}
            >
              {t("dmapps.header.bind_button")}
            </button>
          </div>
        </div>
      </header>
      <Box className="!p-6 !bg-gray-50 !min-h-screen">
        {/* Apps Grid */}
        <Grid container spacing={3}>
          {apps.map((app, i) => (
            <Grid item xs={12} sm={isMobile ? 6 : 4} md={4} lg={3} key={i}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: "16px",
                  border: "1px solid #e5e7eb",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
                    borderColor: "#0695c8",
                  },
                }}
                className="!bg-white w-[150px] h-[120px] !p-4 flex flex-col justify-center items-center"
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                    backgroundColor: "#f9fafb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {app.icon}
                </Box>
                <Typography
                  className="!font-medium !text-gray-800 !text-sm"
                  sx={{ fontSize: "0.9375rem" }}
                >
                  {t(app.nameKey)}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      <BuyModal handleClose={handleClose} open={open} />
    </>
  );
};

export default AppsPage;
