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
import { MdOutlineWifiPassword } from "react-icons/md";

const WifiBlockPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [wifiList, setWifiList] = useState([
    {
      bssid: "b3:a43c:ae:df:24",
      title: "No free Wi-Fi here",
      time: "2022-01-24 17:30",
      lat: 34.567386,
      lng: -50.304054,
      blocked: false,
    },
    {
      bssid: "b4:c43c:ae:df:40",
      title: "Korman 1102",
      time: "2022-01-26 08:30",
      lat: 34.560186,
      lng: -50.303454,
      blocked: true,
    },
    {
      bssid: "a7:f43c:ae:df:89",
      title: "Willeroad",
      time: "2022-01-27 13:30",
      lat: 34.565886,
      lng: -50.300954,
      blocked: true,
    },
    {
      bssid: "25:d43c:ae:df:34",
      title: "Password is password",
      time: "2022-01-28 16:30",
      lat: 34.562786,
      lng: -50.307854,
      blocked: true,
    },
    {
      bssid: "23:b43c:ae:df:81",
      title: "CBCI-E524",
      time: "2022-01-30 11:30",
      lat: 34.565486,
      lng: -50.305654,
      blocked: true,
    },
    {
      bssid: "24:a43c:ae:df:82",
      title: "Starbucks",
      time: "2022-01-31 19:30",
      lat: 34.564586,
      lng: -50.302054,
      blocked: true,
    },
    {
      bssid: "a0:f3:c13b:6f:90",
      title: "School",
      time: "2022-02-01 10:30",
      lat: 34.569986,
      lng: -50.306754,
      blocked: true,
    },
    {
      bssid: "a0:a43c:9e:d2:67",
      title: "Home",
      time: "2022-02-02 20:30",
      lat: 34.568886,
      lng: -50.307654,
      blocked: false,
    },
    {
      bssid: "24:a43c:ae:df:83",
      title: "Jewell cafe",
      time: "2022-02-03 18:30",
      lat: 34.567786,
      lng: -50.304554,
      blocked: true,
    },
  ]);

  const toggleBlock = (bssid) => {
    setWifiList((prev) =>
      prev.map((item) =>
        item.bssid === bssid ? { ...item, blocked: !item.blocked } : item
      )
    );
  };

    return (
      <>
        <header className="!mb-4 sm:!mb-6 !px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
            <div className="flex items-center !gap-2 sm:!gap-3">
              <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
                Wi-Fi Block
                <MdOutlineWifiPassword className="text-[#0695c8]" />
              </h1>
            </div>
            <BindPhone />
          </div>
          <Box className="!p-6 !bg-gray-50  !mt-6">
            {/* Table */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  bgcolor: "#f9fafb",
                  p: 3,
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "1fr 1fr 1fr"
                    : "1.5fr 1.5fr 1.2fr 1fr 1fr 1fr",
                  gap: 2,
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <Typography className="!font-semibold !text-xs !text-gray-600 uppercase tracking-wider">
                  Title
                </Typography>
                {!isMobile && (
                  <>
                    <Typography className="!font-semibold !text-xs !text-gray-600 uppercase tracking-wider">
                      Connected Time
                    </Typography>
                    <Typography className="!font-semibold !text-xs !text-gray-600 uppercase tracking-wider">
                      Latitude
                    </Typography>
                    <Typography className="!font-semibold !text-xs !text-gray-600 uppercase tracking-wider">
                      Longitude
                    </Typography>
                  </>
                )}
                <Typography className="!font-semibold !text-xs !text-gray-600 uppercase tracking-wider text-right">
                  Block/Blocked
                </Typography>
              </Box>

              {/* Rows */}
              <Box
                sx={{ maxHeight: "70vh", overflowY: "auto" }}
                className="scrollbar-hide "
              >
                {wifiList.map((wifi) => (
                  <Box
                    key={wifi.bssid}
                    sx={{
                      p: 3,
                      display: "grid",
                      gridTemplateColumns: isMobile
                        ? "1fr 1fr 1fr"
                        : "1.5fr 1.5fr 1.2fr 1fr 1fr 1fr",
                      gap: 2,
                      alignItems: "center",
                      borderBottom: "1px solid #f3f4f6",
                      "&:last-child": { borderBottom: "none" },
                    }}
                  >
                    {/* Title */}
                    <Typography className="!text-sm !font-medium !text-gray-900">
                      {isMobile
                        ? wifi.title.length > 8
                          ? wifi.title.slice(0, 8) + "..."
                          : wifi.title
                        : wifi.title}
                    </Typography>

                    {/* Mobile: Merged Info */}
                    {isMobile ? (
                      <Box></Box>
                    ) : (
                      <>
                        <Typography className="!text-sm !text-gray-600">
                          {wifi.time}
                        </Typography>
                        <Typography className="!text-sm !text-gray-600">
                          {wifi.lat.toFixed(6)}
                        </Typography>
                        <Typography className="!text-sm !text-gray-600">
                          {wifi.lng.toFixed(6)}
                        </Typography>
                      </>
                    )}

                    {/* Block/Unblock Button */}
                    <Box className="!flex !justify-end">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => toggleBlock(wifi.bssid)}
                        sx={{
                          backgroundColor: wifi.blocked ? "#10b981" : "#ef4444",
                          color: "white",
                          textTransform: "none",
                          fontWeight: 600,
                          borderRadius: "999px",
                          fontSize: "0.675rem",
                          px: 3,
                          minWidth: "auto",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          "&:hover": {
                            backgroundColor: wifi.blocked
                              ? "#059669"
                              : "#dc2626",
                          },
                        }}
                      >
                        {wifi.blocked ? "Unblock" : "Block"}
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Box>
        </header>
      </>
    );
};

export default WifiBlockPage;
