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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Stack,
  IconButton,
} from "@mui/material";
import { FiChevronLeft, FiChevronRight, FiKey } from "react-icons/fi";
import { IoLogoBitbucket } from "react-icons/io5";
import BuyModal from "../../components/buyModal/BuyModal";

// Sample Keylog Data
const keylogs = [
  {
    app: "Chrome",
    text: "What is the best way to cite references?",
    time: "2022-02-14 21:45",
  },
  { app: "Snapchat", text: "Awesome photo!", time: "2022-02-06 20:45" },
  {
    app: "Facebook Messenger",
    text: "Today is going to be a great day.",
    time: "2022-02-01 10:23",
  },
  { app: "Chrome", text: "How to bake a cake?", time: "2022-01-31 11:46" },
  {
    app: "WhatsApp",
    text: "Hey, Sally. How's your vacation?",
    time: "2022-01-25 10:11",
  },
  {
    app: "Kik",
    text: "Did you want to have dinner at home tonight?",
    time: "2022-01-15 09:30",
  },
  {
    app: "LINE",
    text: "I can't find that book anywhere.",
    time: "2022-01-06 20:30",
  },
  {
    app: "Messages",
    text: "Hey, mom is looking for you.",
    time: "2022-01-06 14:30",
  },
  { app: "Chrome", text: "How to care for my skin?", time: "2022-01-01 01:30" },
];

const appOptions = [
  "All",
  "Chrome",
  "Snapchat",
  "Facebook Messenger",
  "WhatsApp",
  "Kik",
  "LINE",
  "Messages",
  "Skype",
  "Telegram",
  "Tinder",
  "Tumblr",
  "Viber",
  "WeChat",
  "POF",
  "Hangouts",
  "Instagram",
  "Badoo",
];

const KeyLogger = () => {
  const [selectedApp, setSelectedApp] = useState("All");
  const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  const filteredLogs =
    selectedApp === "All"
      ? keylogs
      : keylogs.filter((log) => log.app === selectedApp);

  const hasActivity = filteredLogs.length > 0;

  return (
    <>
      <header className="!mb-4 sm:!mb-6 !px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
          <div className="flex items-center !gap-2 sm:!gap-3">
            <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
              KeyLogger
              <FiKey className="text-[#0695c8] " />
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
      <Box className="!p-6 !bg-gray-50 !min-h-screen">
        {/* Header: Dropdown */}
        <Box className="!mb-6">
          <FormControl size="small" className="lg:max-w-[350px] w-full">
            <InputLabel>Apps</InputLabel>
            <Select
              label="Apps"
              value={selectedApp}
              onChange={(e) => {
                setSelectedApp(e.target.value);
                setPage(1);
              }}
              displayEmpty
              sx={{
                borderRadius: "12px",
                backgroundColor: "#f9fafb",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#d1d5db",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#0695c8",
                },
                "& .MuiSelect-select": {
                  py: 1.5,
                  fontSize: "0.875rem",
                  color: selectedApp === "All" ? "#6b7280" : "#1f2937",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: 300,
                    borderRadius: "12px",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    mt: 1,
                    "&::-webkit-scrollbar": { display: "none" },
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  },
                },
              }}
            >
              {appOptions.map((app) => (
                <MenuItem
                  key={app}
                  value={app}
                  sx={{
                    fontSize: "0.875rem",
                    py: 1,
                    "&.Mui-selected": {
                      backgroundColor: "#e0f2fe",
                      color: "#0695c8",
                      fontWeight: 500,
                      "&:hover": { backgroundColor: "#cce7ff" },
                    },
                    "&:hover": {
                      backgroundColor: "#f3f4f6",
                    },
                  }}
                >
                  {app}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Table - Borderless */}
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            borderRadius: "12px",
            overflow: "hidden",
            border: "none",
            boxShadow: "none",
          }}
          className="!rounded-xl"
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f9fafb" }}>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "#374151",
                    fontSize: "0.875rem",
                    py: 2,
                    pl: 3,
                    borderBottom: "none",
                  }}
                >
                  App Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "#374151",
                    fontSize: "0.875rem",
                    py: 2,
                    borderBottom: "none",
                  }}
                >
                  Logged Text
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 600,
                    color: "#374151",
                    fontSize: "0.875rem",
                    py: 2,
                    pr: 3,
                    borderBottom: "none",
                  }}
                >
                  Time
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hasActivity ? (
                filteredLogs.map((log, i) => (
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
                        fontWeight: 500,
                        color: "#1f2937",
                        pl: 3,
                        fontSize: "0.875rem",
                        borderBottom:
                          i < filteredLogs.length - 1
                            ? "1px solid #f3f4f6"
                            : "none",
                      }}
                    >
                      {log.app}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#4b5563",
                        fontSize: "0.875rem",
                        maxWidth: 400,
                        borderBottom:
                          i < filteredLogs.length - 1
                            ? "1px solid #f3f4f6"
                            : "none",
                      }}
                    >
                      {log.text}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontFamily: "monospace",
                        color: "#6b7280",
                        pr: 3,
                        fontSize: "0.8125rem",
                        borderBottom:
                          i < filteredLogs.length - 1
                            ? "1px solid #f3f4f6"
                            : "none",
                      }}
                    >
                      {log.time}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} sx={{ py: 8, borderBottom: "none" }}>
                    <Box className="!text-center">
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ fontStyle: "italic" }}
                      >
                        No Recent Activity
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        {hasActivity && (
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
        )}
      </Box>
      <BuyModal handleClose={handleClose} open={open} />
    </>
  );
};

export default KeyLogger;
