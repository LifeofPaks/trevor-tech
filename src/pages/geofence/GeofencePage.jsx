import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Tabs,
  Tab,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FiCopy, FiTrash2, FiPlus } from "react-icons/fi";
import { IoLogoBitbucket } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import BindPhone from "../../components/demo/BindPhone";
import { FaLocationDot } from "react-icons/fa6";

const GeofencePage = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState(1); // 0 = Allowed, 1 = Restricted
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const location = {
    nameKey: "location.name",
    lat: 34.0522,
    lng: -118.2437,
    radius: 500, // meters
  };

  return (
    <>
      <header className="!mb-4 sm:!mb-6 !px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
          <div className="flex items-center !gap-2 sm:!gap-3">
            <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
              {t("dmgf.header.title")}{" "}
              <FaLocationDot className="text-[#0695c8]" />
            </h1>
          </div>
          <BindPhone />
        </div>
      </header>
      <Box className="!p-6 !bg-gray-50 !min-h-screen">
        {/* Tabs */}
        <Paper
          elevation={0}
          sx={{
            overflow: "hidden",
            mb: 4,
          }}
        >
          <Tabs
            value={tab}
            onChange={(e, v) => setTab(v)}
            variant="fullWidth"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#0695c8",
                height: 3,
              },
            }}
            aria-label={t("dmgf.tabs.aria_label")}
          >
            <Tab
              label={t("dmgf.tabs.allowed")}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                color: tab === 0 ? "#0695c8 !important" : "#6b7280",
              }}
            />
            <Tab
              label={t("dmgf.tabs.restricted")}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                color: tab === 1 ? "#0695c8 !important" : "#6b7280",
              }}
            />
          </Tabs>
        </Paper>

        {/* Main Content */}
        <Box
          className={
            isMobile
              ? "!grid !grid-cols-1 !gap-6"
              : "!grid !grid-cols-1 md:!grid-cols-3 !gap-6"
          }
        >
          {/* Left Panel */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: "16px",
              border: "1px solid #e5e7eb",
              p: 4,
              gridColumn: isMobile ? "span 1" : "span 1",
              height: "fit-content",
            }}
          >
            <Stack spacing={3}>
              {/* Location */}
              <Box className="!flex !items-center !justify-between">
                <Typography
                  className="!text-sm !font-medium !text-gray-900 !pr-2"
                  sx={{ wordBreak: "break-word" }}
                >
                  {t(`dmgf.${location.nameKey}`)}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <IconButton
                    size="small"
                    sx={{ color: "#0695c8" }}
                    aria-label={t("dmgf.left_panel.copy_aria")}
                  >
                    <FiCopy />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{ color: "#ef4444" }}
                    aria-label={t("dmgf.left_panel.delete_aria")}
                  >
                    <FiTrash2 />
                  </IconButton>
                </Stack>
              </Box>

              {/* Add Button */}
              <Button
                variant="contained"
                startIcon={<FiPlus />}
                fullWidth
                sx={{
                  backgroundColor: "#0695c8",
                  color: "white",
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: "999px",
                  py: 1.5,
                  boxShadow: "0 4px 12px #0695c833",
                  "&:hover": {
                    backgroundColor: "#0695c8",
                    boxShadow: "0 6px 16px rgba(16, 134, 197, 0.4)",
                  },
                }}
                aria-label={t("dmgf.left_panel.add_button_aria")}
              >
                {t("dmgf.left_panel.add_button")}
              </Button>
            </Stack>
          </Paper>

          {/* Map View */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              gridColumn: isMobile ? "span 1" : "span 2",
              height: isMobile ? 400 : 500,
              position: "relative",
              backgroundColor: "#f3f4f6",
            }}
          >
            {/* Map Title */}
            <Typography
              className="!absolute !top-4 !left-6 !z-10 !text-lg !font-bold !text-gray-800"
              sx={{ textShadow: "0 1px 3px rgba(255,255,255,0.8)" }}
            >
              {t("dmgf.map.title")}
            </Typography>

            {/* Realistic Map Background */}
            <Box
              sx={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle road lines */}
              <Box
                sx={{
                  position: "absolute",
                  top: "30%",
                  left: "10%",
                  width: "60%",
                  height: 2,
                  backgroundColor: "#9ca3af",
                  opacity: 0.3,
                  transform: "rotate(-15deg)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "20%",
                  width: "50%",
                  height: 2,
                  backgroundColor: "#9ca3af",
                  opacity: 0.3,
                  transform: "rotate(20deg)",
                }}
              />

              {/* Geofence Circle */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  backgroundColor: "rgba(239, 68, 68, 0.15)",
                  border: "3px solid #ef4444",
                  boxShadow: "0 0 0 8px rgba(239, 68, 68, 0.1)",
                  animation: "pulse 3s infinite",
                }}
              />

              {/* Center Pin */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 32,
                  height: 32,
                  backgroundColor: "#ef4444",
                  borderRadius: "50% 50% 50% 0",
                  transform: "translate(-50%, -100%) rotate(-45deg)",
                  boxShadow: "0 4px 12px rgba(239,68,68,0.4)",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%) rotate(45deg)",
                    width: 12,
                    height: 12,
                    backgroundColor: "white",
                    borderRadius: "50%",
                  },
                }}
              />

              {/* Pulse Animation */}
              <style jsx>{`
                @keyframes pulse {
                  0% {
                    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.2);
                  }
                  70% {
                    box-shadow: 0 0 0 30px rgba(239, 68, 68, 0);
                  }
                  100% {
                    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
                  }
                }
              `}</style>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default GeofencePage;
