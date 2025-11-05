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
import { useTranslation } from "react-i18next";
import BindPhone from "../../components/demo/BindPhone";
import { MdAppBlocking } from "react-icons/md";

const AppBlockPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [blockedApps, setBlockedApps] = useState([]);

  const apps = [
    {
      nameKey: "app1.name",
      icon: "https://www.google.com/s2/favicons?domain=instagram.com&sz=64",
    },
    {
      nameKey: "app2.name",
      icon: "https://www.google.com/s2/favicons?domain=line.me&sz=64",
    },
    {
      nameKey: "app3.name",
      icon: "https://www.google.com/s2/favicons?domain=snapchat.com&sz=64",
    },
    {
      nameKey: "app4.name",
      icon: "https://www.google.com/s2/favicons?domain=tinder.com&sz=64",
    },
    {
      nameKey: "app5.name",
      icon: "https://www.google.com/s2/favicons?domain=twitter.com&sz=64",
    },
    {
      nameKey: "app6.name",
      icon: "https://www.google.com/s2/favicons?domain=viber.com&sz=64",
    },
    {
      nameKey: "app7.name",
      icon: "https://www.google.com/s2/favicons?domain=facebook.com&sz=64",
    },
    {
      nameKey: "app8.name",
      icon: "https://www.google.com/s2/favicons?domain=whatsapp.com&sz=64",
    },
    {
      nameKey: "app9.name",
      icon: "https://www.google.com/s2/favicons?domain=tiktok.com&sz=64",
    },
    {
      nameKey: "app10.name",
      icon: "https://www.google.com/s2/favicons?domain=youtube.com&sz=64",
    },
    {
      nameKey: "app11.name",
      icon: "https://www.google.com/s2/favicons?domain=netflix.com&sz=64",
    },
    {
      nameKey: "app12.name",
      icon: "https://www.google.com/s2/favicons?domain=spotify.com&sz=64",
    },
    {
      nameKey: "app13.name",
      icon: "https://www.google.com/s2/favicons?domain=discord.com&sz=64",
    },
    {
      nameKey: "app14.name",
      icon: "https://www.google.com/s2/favicons?domain=telegram.org&sz=64",
    },
    {
      nameKey: "app15.name",
      icon: "https://www.google.com/s2/favicons?domain=twitch.tv&sz=64",
    },
    {
      nameKey: "app16.name",
      icon: "https://www.google.com/s2/favicons?domain=pinterest.com&sz=64",
    },
    {
      nameKey: "app17.name",
      icon: "https://www.google.com/s2/favicons?domain=linkedin.com&sz=64",
    },
    {
      nameKey: "app18.name",
      icon: "https://www.google.com/s2/favicons?domain=amazon.com&sz=64",
    },
  ];

  const toggleBlock = (nameKey) => {
    const appName = t(`dmappblock.apps.${nameKey}`);
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
              {t("dmappblock.header.title")}{" "}
              <MdAppBlocking className="text-[#0695c8]" />
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
          aria-label={t("dmappblock.grid.aria_label")}
        >
          {apps.map((app) => {
            const isBlocked = blockedApps.includes(
              t(`dmappblock.apps.${app.nameKey}`)
            );
            return (
              <Paper
                key={app.nameKey}
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
                    alt={t(`dmappblock.apps.${app.nameKey}`)}
                    className="!w-10 !h-10 !rounded-lg"
                  />
                  <Typography className="!font-medium !text-gray-900 !text-[13px]">
                    {t(`dmappblock.apps.${app.nameKey}`)}
                  </Typography>
                </Stack>

                <Button
                  variant="contained"
                  size="small"
                  onClick={() => toggleBlock(app.nameKey)}
                  sx={{
                    backgroundColor: isBlocked ? "#ef4444" : "#10b981",
                    color: "white",
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: "999px",
                    px: 3,
                    py: 1,
                    width: "120px",
                    fontSize: "0.675rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    "&:hover": {
                      backgroundColor: isBlocked ? "#dc2626" : "#059669",
                    },
                  }}
                  aria-label={t(
                    isBlocked
                      ? "dmappblock.button.unblock_aria"
                      : "dmappblock.button.block_aria",
                    { name: t(`dmappblock.apps.${app.nameKey}`) }
                  )}
                >
                  {t(
                    isBlocked
                      ? "dmappblock.button.unblock"
                      : "dmappblock.button.block"
                  )}
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
