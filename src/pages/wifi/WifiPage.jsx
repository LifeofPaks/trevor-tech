import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Stack,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoLogoBitbucket } from "react-icons/io5";

// Sample WiFi Data (from screenshot)
const wifiData = [
  {
    bssid: "24:a4:3c:ae:df:83",
    name: "Jewell cafe",
    connected: "2022-02-03 18:30",
    lat: "34.567786",
    lng: "-50.304554",
  },
  {
    bssid: "a0:a4:3c:9e:d2:67",
    name: "Home",
    connected: "2022-02-02 20:30",
    lat: "34.568886",
    lng: "-50.307654",
  },
  {
    bssid: "a0:f3:c1:3b:6f:90",
    name: "School",
    connected: "2022-02-01 10:30",
    lat: "34.569986",
    lng: "-50.306754",
  },
  {
    bssid: "24:a4:3c:ae:df:82",
    name: "Starbucks",
    connected: "2022-01-31 19:30",
    lat: "34.564586",
    lng: "-50.302054",
  },
  {
    bssid: "23:b4:3c:ae:df:81",
    name: "CBCI-E524",
    connected: "2022-01-30 11:30",
    lat: "34.565486",
    lng: "-50.305654",
  },
  {
    bssid: "25:d4:3c:ae:df:34",
    name: "Password is password",
    connected: "2022-01-28 16:30",
    lat: "34.562786",
    lng: "-50.307854",
  },
  {
    bssid: "a7:f4:3c:ae:df:89",
    name: "Wileroad",
    connected: "2022-01-27 13:30",
    lat: "34.565886",
    lng: "-50.300954",
  },
  {
    bssid: "b4:c4:3c:ae:df:40",
    name: "Korman 1102",
    connected: "2022-01-26 08:30",
    lat: "34.560186",
    lng: "-50.303454",
  },
  {
    bssid: "b3:a4:3c:ae:df:24",
    name: "No free Wi-Fi here",
    connected: "2022-01-24 17:30",
    lat: "34.567386",
    lng: "-50.304054",
  },
];

const ROWS_PER_PAGE = 10;

const WifiPage = () => {
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const totalPages = Math.ceil(wifiData.length / ROWS_PER_PAGE);
  const startIndex = (page - 1) * ROWS_PER_PAGE;
  const currentData = wifiData.slice(startIndex, startIndex + ROWS_PER_PAGE);

    return (
      <>
        <header className="!mb-4 sm:!mb-6 !px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
            <div className="flex items-center !gap-2 sm:!gap-3">
              <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
                Wi-Fi Networks
                <IoLogoBitbucket className="text-[#0695c8] rotate-[180deg]" />
              </h1>
            </div>
            <div className="flex sm:flex-row items-start sm:items-center !gap-2 sm:!gap-3">
              <span className="text-[10px] sm:text-xs text-orange-600 bg-orange-100 !px-3 sm:!px-4 !py-1.5 sm:!py-2 rounded-full font-medium">
                Demo data. Bind your device to collect actual data.
              </span>
              <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[13px] !px-4 sm:!px-5 !py-1.5 sm:!py-2 rounded-full font-semibold shadow-md hover:shadow-xl transition-all hover:scale-105 whitespace-nowrap">
                Bind My Device
              </button>
            </div>
          </div>
        </header>
        <Box className="!p-6 !bg-gray-50">
          {/* Header */}
          <Box className="!mb-8">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Paper
                  elevation={0}
                  className="!flex !items-center !gap-2 !bg-white !border !border-gray-200 !rounded-xl !px-4 !py-2"
                >
                  <FiCalendar className="!text-gray-500 !text-sm" />
                  <Typography className="!text-gray-700 !font-medium !text-sm">
                    2021-01-01
                  </Typography>
                  <Typography className="!text-gray-500 !mx-1">—</Typography>
                  <Typography className="!text-gray-700 !font-medium !text-sm">
                    2022-04-30
                  </Typography>
                </Paper>
                <Chip
                  label="Last 7 days"
                  size="small"
                  sx={{
                    backgroundColor: "#e0f2fe",
                    color: "#0695c8",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    height: 28,
                    borderRadius: "12px",
                    "& .MuiChip-label": { px: 1.5 },
                  }}
                />
              </Stack>
            </Stack>
          </Box>

          {/* Desktop Table */}
          {!isMobile && (
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                borderRadius: "16px",
                overflowX: "auto",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                mb: 4,
              }}
            >
              <Table sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f9fafb" }}>
                    {[
                      "BSSID",
                      "Name",
                      "Connected",
                      "Latitude",
                      "Longitude",
                    ].map((header) => (
                      <TableCell
                        key={header}
                        sx={{
                          fontWeight: 600,
                          color: "#374151",
                          fontSize: "0.875rem",
                          py: 2.5,
                          px: 3,
                          verticalAlign: "middle",
                          textAlign:
                            header === "Latitude" || header === "Longitude"
                              ? "center"
                              : "left",
                          borderBottom: "none",
                        }}
                      >
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {currentData.map((wifi, i) => (
                    <TableRow
                      key={i}
                      hover
                      sx={{
                        "&:nth-of-type(odd)": { backgroundColor: "#fdfdfe" },
                        "&:hover": { backgroundColor: "#f0f9ff" },
                        "&:last-child td": { borderBottom: 0 },
                      }}
                    >
                      <TableCell
                        sx={{
                          pl: 3,
                          fontFamily: "monospace",
                          color: "#1f2937",
                          fontSize: "0.8125rem",
                          verticalAlign: "middle",
                          borderBottom:
                            i < currentData.length - 1
                              ? "1px solid #f3f4f6"
                              : "none",
                        }}
                      >
                        {wifi.bssid}
                      </TableCell>

                      <TableCell
                        sx={{
                          fontWeight: 500,
                          color: "#1f2937",
                          fontSize: "0.875rem",
                          verticalAlign: "middle",
                          borderBottom:
                            i < currentData.length - 1
                              ? "1px solid #f3f4f6"
                              : "none",
                        }}
                      >
                        {wifi.name}
                      </TableCell>

                      <TableCell
                        sx={{
                          fontFamily: "monospace",
                          color: "#4b5563",
                          fontSize: "0.8125rem",
                          verticalAlign: "middle",
                          borderBottom:
                            i < currentData.length - 1
                              ? "1px solid #f3f4f6"
                              : "none",
                        }}
                      >
                        {wifi.connected}
                      </TableCell>

                      <TableCell
                        sx={{
                          fontFamily: "monospace",
                          color: "#6b7280",
                          fontSize: "0.8125rem",
                          verticalAlign: "middle",
                          textAlign: "center",
                          borderBottom:
                            i < currentData.length - 1
                              ? "1px solid #f3f4f6"
                              : "none",
                        }}
                      >
                        {wifi.lat}
                      </TableCell>

                      <TableCell
                        sx={{
                          fontFamily: "monospace",
                          color: "#6b7280",
                          fontSize: "0.8125rem",
                          verticalAlign: "middle",
                          textAlign: "center",
                          pr: 3,
                          borderBottom:
                            i < currentData.length - 1
                              ? "1px solid #f3f4f6"
                              : "none",
                        }}
                      >
                        {wifi.lng}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Mobile Cards */}
          {isMobile && (
            <Stack spacing={2} className="!mb-4">
              {currentData.map((wifi, i) => (
                <Paper
                  key={i}
                  elevation={0}
                  sx={{
                    borderRadius: "16px",
                    border: "1px solid #e5e7eb",
                    p: 3,
                    transition: "all 0.2s",
                    "&:hover": {
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  <Stack spacing={1.5}>
                    <Box className="!flex !justify-between">
                      <Typography className="!font-mono !text-xs !text-gray-600">
                        BSSID
                      </Typography>
                      <Typography className="!font-mono !text-xs !text-gray-800">
                        {wifi.bssid}
                      </Typography>
                    </Box>
                    <Box className="!flex !justify-between">
                      <Typography className="!text-sm !font-medium !text-gray-600">
                        Name
                      </Typography>
                      <Typography className="!text-sm !font-medium !text-gray-800">
                        {wifi.name}
                      </Typography>
                    </Box>
                    <Box className="!flex !justify-between">
                      <Typography className="!text-xs !text-gray-600">
                        Connected
                      </Typography>
                      <Typography className="!font-mono !text-xs !text-gray-700">
                        {wifi.connected}
                      </Typography>
                    </Box>
                    <Box className="!flex !justify-between">
                      <Typography className="!text-xs !text-gray-600">
                        Lat
                      </Typography>
                      <Typography className="!font-mono !text-xs !text-gray-700">
                        {wifi.lat}
                      </Typography>
                    </Box>
                    <Box className="!flex !justify-between">
                      <Typography className="!text-xs !text-gray-600">
                        Lng
                      </Typography>
                      <Typography className="!font-mono !text-xs !text-gray-700">
                        {wifi.lng}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          )}

          {/* Pagination */}
          <Box className="!flex justify-center">
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                size="small"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                sx={{ color: page === 1 ? "#d1d5db" : "#9ca3af" }}
              >
                <FiChevronLeft />
              </IconButton>
              <Chip
                label={page}
                size="small"
                sx={{
                  backgroundColor: "#0695c8",
                  color: "white",
                  fontWeight: "bold",
                  width: 36,
                  height: 36,
                  fontSize: "0.875rem",
                }}
              />
              <IconButton
                size="small"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                sx={{ color: page === totalPages ? "#d1d5db" : "#9ca3af" }}
              >
                <FiChevronRight />
              </IconButton>
            </Stack>
          </Box>
        </Box>
      </>
    );
};

export default WifiPage;
