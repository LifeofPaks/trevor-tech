import React from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FiMail, FiMapPin } from "react-icons/fi";
import { FaSimCard } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BindPhone from "../../components/demo/BindPhone";

// Locations with translation keys
const locations = [
  {
    addressKey: "loc1.address",
    timeKey: "loc1.time",
  },
  {
    addressKey: "loc2.address",
    timeKey: "loc2.time",
  },
  {
    addressKey: "loc3.address",
    timeKey: "loc3.time",
  },
  {
    addressKey: "loc4.address",
    timeKey: "loc4.time",
  },
  {
    addressKey: "loc5.address",
    timeKey: "loc5.time",
  },
];

const SimPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <header className="!mb-4 sm:!mb-6 !px-4">
        <div className="flex flex-col sm:flex-row sm:items-centerנתsm:justify-between !gap-3 sm:!gap-4">
          <div className="flex items-center !gap-2 sm:!gap-3">
            <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
              {t("dmsim.header.title")} <FaSimCard className="text-[#0695c8]" />
            </h1>
          </div>
          <BindPhone />
        </div>
      </header>
      <Box className="!p-6 !bg-gray-50 !min-h-screen">
        {/* SIM Card & Change Email - Grid */}
        <Box
          className={
            isMobile
              ? "!grid !grid-cols-1 !gap-6"
              : "!grid !grid-cols-1 md:!grid-cols-2 !gap-6"
          }
        >
          {/* SIM Card */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: "16px",
              border: "1px solid #e5e7eb",
              p: 4,
              backgroundColor: "#fff",
            }}
          >
            <Typography
              variant="h6"
              className="!font-bold !text-gray-800 !mb-4"
              sx={{ color: "#0695c8" }}
            >
              {t("dmsim.sim_card.title")}
            </Typography>
            <Stack spacing={2}>
              <Box className="!flex !justify-between">
                <Typography className="!text-gray-600">
                  {t("dmsim.sim_card.operator_label")}
                </Typography>
                <Typography className="!font-medium !text-gray-900">
                  T-Mobile US
                </Typography>
              </Box>
              <Box className="!flex !justify-between">
                <Typography className="!text-gray-600">
                  {t("dmsim.sim_card.phone_label")}
                </Typography>
                <Typography className="!font-medium !text-gray-900">
                  262238764
                </Typography>
              </Box>
              <Box className="!flex !justify-between">
                <Typography className="!text-gray-600">
                  {t("dmsim.sim_card.mnc_label")}
                </Typography>
                <Typography className="!font-medium !text-gray-900">
                  250
                </Typography>
              </Box>
              <Box className="!flex !justify-between">
                <Typography className="!text-gray-600">
                  {t("dmsim.sim_card.mcc_label")}
                </Typography>
                <Typography className="!font-medium !text-gray-900">
                  310
                </Typography>
              </Box>
              <Box className="!flex !justify-between">
                <Typography className="!text-gray-600">
                  {t("dmsim.sim_card.imei_label")}
                </Typography>
                <Typography className="!font-medium !text-gray-900">
                  861956623730200
                </Typography>
              </Box>
            </Stack>
          </Paper>

          {/* Change Email */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: "16px",
              border: "1px solid #e5e7eb",
              p: 4,
              backgroundColor: "#f8fafc",
            }}
          >
            <Typography
              variant="h6"
              className="!font-bold !text-gray-800 !mb-4"
              sx={{ color: "#0695c8" }}
            >
              {t("dmsim.change_email.title")}
            </Typography>
            <Stack spacing={3} alignItems="flex-start">
              <Box className="!flex !items-start !gap-3">
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "12px",
                    backgroundColor: "#e0f2fe",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <FiMail className="!text-lg !text-sky-600" />
                </Box>
                <Typography className="!text-sm !text-gray-700 !leading-relaxed">
                  {t("dmsim.change_email.notification_text")}
                </Typography>
              </Box>
              <Typography className="!text-sm !text-gray-600">
                {t("dmsim.change_email.invalid_email_text")}{" "}
                <Button
                  variant="text"
                  size="small"
                  sx={{
                    textTransform: "none",
                    color: "#0695c8",
                    fontWeight: 600,
                    p: 0,
                    minWidth: "auto",
                    "&:hover": {
                      backgroundColor: "transparent",
                      textDecoration: "underline",
                    },
                  }}
                  aria-label={t("dmsim.change_email.change_button_aria")}
                >
                  {t("dmsim.change_email.change_button")}
                </Button>
              </Typography>
            </Stack>
          </Paper>
        </Box>

        {/* Recent Locations */}
        <Box className="!mt-8">
          <Typography
            variant="h6"
            className="!font-bold !text-gray-800 !mb-4"
            sx={{ color: "#0695c8" }}
          >
            {t("dmsim.recent_locations.title")}
          </Typography>

          <Box
            className={
              isMobile
                ? "!grid !grid-cols-1 !gap-6"
                : "!grid !grid-cols-1 md:!grid-cols-2 !gap-6"
            }
          >
            {/* Map */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: "16px",
                overflow: "hidden",
                height: 400,
                backgroundColor: "#e5e7eb",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
                  borderRadius: "16px",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "60%",
                    height: "60%",
                    background:
                      "radial-gradient(circle, rgba(34,197,94,0.3) 0%, transparent 70%)",
                    borderRadius: "50%",
                  },
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "40%",
                    left: "45%",
                    width: 12,
                    height: 12,
                    backgroundColor: "#10b981",
                    borderRadius: "50%",
                    boxShadow: "0 0 0 4px rgba(16,185,129,0.3)",
                    animation: "pulse 2s infinite",
                  }}
                />
                <style jsx>{`
                  @keyframes pulse {
                    0% {
                      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
                    }
                    70% {
                      box-shadow: 0 0 0 16px rgba(16, 185, 129, 0);
                    }
                    100% {
                      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
                    }
                  }
                `}</style>
              </Box>
              <Typography className="!absolute !bottom-4 !left-4 !text-white !font-medium !text-sm">
                New Jersey, USA
              </Typography>
            </Paper>

            {/* Location List */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
                p: 4,
                "&::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
              }}
            >
              <Stack spacing={3}>
                {locations.map((loc, i) => (
                  <Box key={i} className="!flex !items-start !gap-3">
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: "#10b981",
                        flexShrink: 0,
                        mt: 0.5,
                      }}
                    />
                    <Box>
                      <Typography className="!text-sm !font-medium !text-gray-900 !leading-tight">
                        {t(`dmsim.locations.${loc.addressKey}`)}
                      </Typography>
                      <Typography className="!text-xs !text-gray-500 !mt-0.5">
                        {t(`dmsim.locations.${loc.timeKey}`)}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
              <Link
                to="/demo/general/gps"
                className="text-[#0695c8] !mt-4 !block !font-medium"
                aria-label={t("dmsim.recent_locations.all_locations_aria")}
              >
                {t("dmsim.recent_locations.all_locations")}
              </Link>
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SimPage;
