import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { IoLogoBitbucket } from "react-icons/io5";
import BindPhone from "../../components/demo/BindPhone";

const AppBlockPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [blockedApps, setBlockedApps] = useState([]);

  const apps = [
    {
      name: "Instagram",
      icon: "https://www.google.com/s2/favicons?domain=instagram.com&sz=64",
    },
    {
      name: "LINE",
      icon: "https://www.google.com/s2/favicons?domain=line.me&sz=64",
    },
    {
      name: "Snapchat",
      icon: "https://www.google.com/s2/favicons?domain=snapchat.com&sz=64",
    },
    {
      name: "Tinder",
      icon: "https://www.google.com/s2/favicons?domain=tinder.com&sz=64",
    },
    {
      name: "Twitter",
      icon: "https://www.google.com/s2/favicons?domain=twitter.com&sz=64",
    },
    {
      name: "Viber",
      icon: "https://www.google.com/s2/favicons?domain=viber.com&sz=64",
    },
    {
      name: "Facebook",
      icon: "https://www.google.com/s2/favicons?domain=facebook.com&sz=64",
    },
    {
      name: "WhatsApp",
      icon: "https://www.google.com/s2/favicons?domain=whatsapp.com&sz=64",
    },
    {
      name: "TikTok",
      icon: "https://www.google.com/s2/favicons?domain=tiktok.com&sz=64",
    },
    {
      name: "YouTube",
      icon: "https://www.google.com/s2/favicons?domain=youtube.com&sz=64",
    },
    {
      name: "Netflix",
      icon: "https://www.google.com/s2/favicons?domain=netflix.com&sz=64",
    },
    {
      name: "Spotify",
      icon: "https://www.google.com/s2/favicons?domain=spotify.com&sz=64",
    },
    {
      name: "Discord",
      icon: "https://www.google.com/s2/favicons?domain=discord.com&sz=64",
    },
    {
      name: "Telegram",
      icon: "https://www.google.com/s2/favicons?domain=telegram.org&sz=64",
    },
    {
      name: "Twitch",
      icon: "https://www.google.com/s2/favicons?domain=twitch.tv&sz=64",
    },
    {
      name: "Pinterest",
      icon: "https://www.google.com/s2/favicons?domain=pinterest.com&sz=64",
    },
    {
      name: "LinkedIn",
      icon: "https://www.google.com/s2/favicons?domain=linkedin.com&sz=64",
    },
    {
      name: "Amazon",
      icon: "https://www.google.com/s2/favicons?domain=amazon.com&sz=64",
    },
  ];

  const toggleBlock = (appName) => {
    setBlockedApps((prev) =>
      prev.includes(appName)
        ? prev.filter((a) => a !== appName)
        : [...prev, appName]
    );
  };

  const cols = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <>
      <header className="!mb-4 sm:!mb-6 !px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
          <div className="flex items-center !gap-2 sm:!gap-3">
            <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
              App Block
              <IoLogoBitbucket className="text-[#0695c8] rotate-[180deg]" />
            </h1>
          </div>
          <BindPhone />
        </div>
      </header>
      <Box className="!p-6 !bg-gray-50 !min-h-screen">

        {/* Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: 4,
          }}
        >
          {apps.map((app) => {
            const isBlocked = blockedApps.includes(app.name);
            return (
              <Paper
                key={app.name}
                elevation={0}
                sx={{
                  borderRadius: "16px",
                  border: "1px solid #e5e7eb",
                  p: 3,
                  backgroundColor: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: "100%",
                  minHeight: 80,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="!w-10 !h-10 !rounded-lg"
                  />
                  <Typography className="!font-medium !text-gray-900 !text-[13px]">
                    {app.name}
                  </Typography>
                </Stack>

                <Button
                  variant="contained"
                  size="small"
                  onClick={() => toggleBlock(app.name)}
                  sx={{
                    backgroundColor: isBlocked ? "#ef4444" : "#10b981",
                    color: "white",
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: "999px",
                    px: 3,
                      minWidth: "auto",
                    fontSize:"0.675rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    "&:hover": {
                      backgroundColor: isBlocked ? "#dc2626" : "#059669",
                    },
                  }}
                >
                  {isBlocked ? "Unblock" : "Block"}
                </Button>
              </Paper>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default AppBlockPage;
