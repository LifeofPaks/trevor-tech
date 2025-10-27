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
  Button,
  Tabs,
  Tab,
  Chip,
  Stack,
  IconButton,
} from "@mui/material";
import { FiChevronLeft, FiChevronRight, FiMapPin, FiCalendar } from "react-icons/fi";
import { IoLogoBitbucket } from "react-icons/io5";
import BuyModal from "../../buyModal/BuyModal";

// Sample GPS Data
const gpsData = [
  {
    lat: 34.0849,
    lng: -118.3596,
    accuracy: "2.75m",
    address: "5905 Wilshire Blvd, Los Angeles, CA 90036, United States",
    time: "2022-02-10 22:30",
  },
  {
    lat: 34.1622,
    lng: -118.3143,
    accuracy: "2.75m",
    address: "Los Angeles, CA 90068, United States",
    time: "2022-02-04 05:00",
  },
  {
    lat: 34.1474,
    lng: -118.3019,
    accuracy: "2.75m",
    address: "2800 E Observatory Rd, Los Angeles, CA 90027, United States",
    time: "2022-02-02 15:45",
  },
  {
    lat: 34.1611,
    lng: -118.3514,
    accuracy: "2.75m",
    address: "100 Universal City Plaza, Universal City, CA 91608, United States",
    time: "2022-01-27 17:20",
  },
  {
    lat: 34.1031,
    lng: -118.4681,
    accuracy: "2.75m",
    address: "1200 Getty Center Dr, Los Angeles, CA 90049, United States",
    time: "2022-01-25 10:05",
  },
  {
    lat: 34.0269,
    lng: -118.4956,
    accuracy: "2.75m",
    address: "200 Santa Monica Pier, Santa Monica, CA 90401, United States",
    time: "2022-01-24 18:18",
  },
  {
    lat: 33.7784,
    lng: -118.1893,
    accuracy: "2.75m",
    address: "1126 Queens Hwy, Long Beach, CA 90802, United States",
    time: "2022-01-20 07:24",
  },
  {
    lat: 33.84,
    lng: -117.9215,
    accuracy: "2.75m",
    address: "Anaheim, CA 92802, United States",
    time: "2022-01-18 08:30",
  },
];

// New Jersey Map Center
const NJ_LAT = 40.0583;
const NJ_LNG = -74.4057;
const NJ_ZOOM = 10;

const Gps = () => {
  const [view, setView] = useState("list"); // "list" or "map"
  const [page, setPage] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState(null);
      const [open, setOpen] = useState(false);

      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);

  const handleViewMap = (lat, lng) => {
    setSelectedLocation({ lat, lng });
    setView("map");
  };

    return (
      <>
        <header className="!mb-4 sm:!mb-6 !px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
            <div className="flex items-center !gap-2 sm:!gap-3">
              <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
                GPS Locations
                <IoLogoBitbucket className="text-[#0695c8] rotate-[180deg]" />
              </h1>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center !gap-2 sm:!gap-3">
              <span className="text-[10px] sm:text-xs text-orange-600 bg-orange-100 !px-3 sm:!px-4 !py-1.5 sm:!py-2 rounded-full font-medium">
                Demo data. Bind your device to collect actual data.
              </span>
              <button
                onClick={handleOpen}
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[13px] !px-4 sm:!px-5 !py-1.5 sm:!py-2 rounded-full font-semibold shadow-md hover:shadow-xl transition-all hover:scale-105 whitespace-nowrap"
              >
                Bind My Device
              </button>
            </div>
          </div>
        </header>
        <Box className="!p-6 !bg-gray-50 ">
          {/* Tabs + Date Badge */}
          <Box className="!mb-2">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Tabs
                value={view}
                onChange={(e, v) => setView(v)}
                sx={{
                  "& .MuiTab-root": {
                    textTransform: "none",
                    fontWeight: 500,
                    color: "#666",
                    fontSize: "0.9375rem",
                  },
                  "& .Mui-selected": {
                    color: "#0695c8 !important",
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#0695c8",
                    height: 3,
                  },
                }}
              >
                <Tab label="List View" value="list" />
                <Tab label="Map View" value="map" />
              </Tabs>

              {/* Static Date Badge */}
              <div className="hidden lg:flex items-center !gap-3 bg-gray-50 border border-gray-200 rounded-2xl !px-4 !py-2 hover:shadow-md transition-all cursor-default">
                <FiCalendar className="text-gray-500 text-lg" />
                <span className="text-gray-800 font-semibold text-[13px] sm:text-[13px]">
                  October 26, 2025
                </span>
              </div>
            </Stack>
          </Box>

          {/* Content */}
          {view === "list" ? (
            <>
              {/* Table */}
              <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                  width: "100%",
                  overflowX: "auto",
                }}
                className="!rounded-xl !overflow-x-auto !w-full"
              >
                <Table>
                  <TableHead>
                    <TableRow
                      sx={{
                        backgroundColor: "#f9fafb",
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                      }}
                    >
                      {[
                        { label: "Latitude", hideOnMobile: true },
                        { label: "Longitude", hideOnMobile: true },
                        { label: "Accuracy", hideOnMobile: true },
                        { label: "Map View", hideOnMobile: false },
                        { label: "Address", hideOnMobile: false },
                        { label: "Location Time", hideOnMobile: false },
                      ].map(({ label, hideOnMobile }) => (
                        <TableCell
                          key={label}
                          sx={{
                            fontWeight: 600,
                            color: "#515162",
                            fontSize: { xs: "0.75rem", sm: "0.79rem" },
                            py: { xs: 1, sm: 2 },
                            whiteSpace: "nowrap",
                            display: hideOnMobile
                              ? { xs: "none", sm: "table-cell" }
                              : "table-cell",
                          }}
                        >
                          {label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {gpsData.map((row, i) => (
                      <TableRow
                        key={i}
                        hover
                        sx={{
                          "&:nth-of-type(odd)": { backgroundColor: "#f9fafb" },
                          "&:hover": { backgroundColor: "#f0f9ff" },
                        }}
                        className="transition-all"
                      >
                        {/* Latitude */}
                        <TableCell
                          sx={{
                            fontFamily: "monospace",
                            fontSize: { xs: "0.75rem", sm: "0.775rem" },
                            whiteSpace: "nowrap",
                            display: { xs: "none", sm: "table-cell" },
                          }}
                        >
                          {row.lat}
                        </TableCell>

                        {/* Longitude */}
                        <TableCell
                          sx={{
                            fontFamily: "monospace",
                            fontSize: { xs: "0.75rem", sm: "0.775rem" },
                            whiteSpace: "nowrap",
                            display: { xs: "none", sm: "table-cell" },
                          }}
                        >
                          {row.lng}
                        </TableCell>

                        {/* Accuracy */}
                        <TableCell
                          sx={{
                            color: "#0695c8",
                            fontWeight: 500,
                            fontSize: { xs: "0.75rem", sm: "0.775rem" },
                            whiteSpace: "nowrap",
                            display: { xs: "none", sm: "table-cell" },
                          }}
                        >
                          {row.accuracy}
                        </TableCell>

                        {/* Map View */}
                        <TableCell sx={{ whiteSpace: "nowrap" }}>
                          <Button
                            size="small"
                            variant="text"
                            startIcon={<FiMapPin />}
                            onClick={() => handleViewMap(row.lat, row.lng)}
                            sx={{
                              color: "#0695c8",
                              textTransform: "none",
                              fontWeight: 500,
                              "&:hover": { backgroundColor: "#e0f2fe" },
                              fontSize: { xs: "0.75rem", sm: "0.775rem" },
                              minWidth: "auto",
                              px: { xs: 1, sm: 2 },
                            }}
                          >
                            View
                          </Button>
                        </TableCell>

                        {/* Address */}
                        <TableCell
                          sx={{
                            maxWidth: { xs: 180, sm: 300 },
                            fontSize: { xs: "0.75rem", sm: "0.775rem" },
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {row.address}
                        </TableCell>

                        {/* Location Time */}
                        <TableCell
                          sx={{
                            fontFamily: "monospace",
                            fontSize: { xs: "0.75rem", sm: "0.775rem" },
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.time}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination */}
              <Box className="!mt-6 !flex justify-center">
                <Stack direction="row" spacing={1} alignItems="center">
                  <IconButton size="small" sx={{ color: "#9ca3af" }}>
                    <FiChevronLeft />
                  </IconButton>
                  <Chip
                    label={page}
                    size="small"
                    sx={{
                      backgroundColor: "#0695c8",
                      color: "white",
                      fontWeight: "bold",
                      width: 32,
                      height: 32,
                    }}
                  />
                  <IconButton size="small" sx={{ color: "#9ca3af" }}>
                    <FiChevronRight />
                  </IconButton>
                </Stack>
              </Box>
            </>
          ) : (
            /* Map View */
            <Box className="!h-full !min-h-96 !rounded-lg !overflow-hidden !border !border-gray-300 relative">
              <iframe
                title="Location Map"
                width="100%"
                height="600"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                  NJ_LNG - 0.1
                }%2C${NJ_LAT - 0.1}%2C${NJ_LNG + 0.1}%2C${
                  NJ_LAT + 0.1
                }&layer=mapnik&marker=${NJ_LAT}%2C${NJ_LNG}`}
              />

              {selectedLocation && (
                <Box
                  className="!absolute !top-4 !left-4 !bg-white !p-3 !rounded-lg !shadow-lg !z-10 !border !border-gray-200"
                  sx={{ minWidth: 200 }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="#0695c8"
                  >
                    Selected Location
                  </Typography>
                  <Typography
                    variant="body2"
                    fontFamily="monospace"
                    fontSize="0.8125rem"
                  >
                    {selectedLocation.lat}, {selectedLocation.lng}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
        <BuyModal handleClose={handleClose} open={open} />
      </>
    );
};

export default Gps;