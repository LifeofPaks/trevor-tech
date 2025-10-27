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
} from "@mui/material";
import {
  MdPhoneMissed,
  MdCallReceived,
  MdCallMade,
  MdCalendarToday,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import { IoLogoBitbucket } from "react-icons/io5";

// Sample Call Data
const calls = [
  {
    state: "Missed",
    number: "3274652243",
    name: "Mary J",
    duration: "00:00:00",
    date: "2022-02-10 08:46",
  },
  {
    state: "Incoming",
    number: "3427465723",
    name: "Sally",
    duration: "00:15:09",
    date: "2022-02-05 10:05",
  },
  {
    state: "Missed",
    number: "3467565667",
    name: "James",
    duration: "00:00:00",
    date: "2022-01-25 08:33",
  },
  {
    state: "Outgoing",
    number: "3427465723",
    name: "Sally",
    duration: "00:04:56",
    date: "2022-01-18 11:33",
  },
  {
    state: "Incoming",
    number: "3322447568",
    name: "Mom",
    duration: "00:10:04",
    date: "2022-01-15 11:40",
  },
  {
    state: "Missed",
    number: "3456785678",
    name: "Thomas",
    duration: "00:00:00",
    date: "2022-01-12 14:40",
  },
  {
    state: "Outgoing",
    number: "3420005423",
    name: "Gregg",
    duration: "00:03:47",
    date: "2022-01-08 13:30",
  },
  {
    state: "Incoming",
    number: "3274652243",
    name: "Mary J",
    duration: "00:02:17",
    date: "2022-01-05 15:40",
  },
  {
    state: "Missed",
    number: "3427465723",
    name: "Sally",
    duration: "00:00:00",
    date: "2022-01-01 08:55",
  },
  {
    state: "Missed",
    number: "3427465723",
    name: "Sally",
    duration: "00:00:00",
    date: "2022-01-01 08:40",
  },
];

const CallsPage = () => {
  const [page, setPage] = useState(1);

  return (
    <>
      <header className="!mb-4 sm:!mb-6 !px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
          <div className="flex items-center !gap-2 sm:!gap-3">
            <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
              Calls
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
      <Box className="!p-6 !bg-gray-50 ">
        {/* Header */}
        <Box className="!mb-6">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* Date Range */}
            <Stack direction="row" spacing={2} alignItems="center">
              <div className="!flex !items-center !gap-2 !bg-white !border !border-gray-200 !rounded-xl !px-4 !py-2">
                <MdCalendarToday className="!text-gray-500 !text-sm" />
                <span className="!text-gray-700 !font-medium !text-sm">
                  2021-01-01
                </span>
                <span className="!text-gray-500 !mx-1">—</span>
                <span className="!text-gray-700 !font-medium !text-sm">
                  2022-04-30
                </span>
              </div>
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
                }}
              />
            </Stack>
          </Stack>
        </Box>

        {/* Table */}
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
          className="!rounded-xl"
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f9fafb" }}>
                {["State", "Number", "Name", "Duration"].map((header) => (
                  <TableCell
                    key={header}
                    align={header === "Date" ? "right" : "left"}
                    sx={{
                      fontWeight: 600,
                      color: "#374151",
                      fontSize: "0.875rem",
                      py: 2,
                      px: 3,
                      borderBottom: "none",
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {calls.map((call, i) => {
                const isMissed = call.state === "Missed";
                const isIncoming = call.state === "Incoming";
                const isOutgoing = call.state === "Outgoing";

                const Icon = isMissed
                  ? MdPhoneMissed
                  : isIncoming
                  ? MdCallReceived
                  : MdCallMade;

                const iconColor = isMissed
                  ? "#ef4444"
                  : isIncoming
                  ? "#3b82f6"
                  : "#10b981";

                return (
                  <TableRow
                    key={i}
                    hover
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#fdfdfe" },
                      "&:hover": { backgroundColor: "#f0f9ff" },
                      "&:last-child td": { borderBottom: 0 },
                    }}
                  >
                    {/* State */}
                    <TableCell
                      sx={{
                        px: 3,
                        fontWeight: 500,
                        fontSize: "0.875rem",
                        borderBottom:
                          i < calls.length - 1 ? "1px solid #f3f4f6" : "none",
                      }}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Icon style={{ color: iconColor, fontSize: 20 }} />
                        {/* Hide text on mobile */}
                        <span className="text-gray-600 hidden sm:inline">
                          {call.state}
                        </span>
                      </Stack>
                    </TableCell>

                    {/* Number */}
                    <TableCell
                      sx={{
                        fontFamily: "monospace",
                        color: "#4b5563",
                        fontSize: "0.875rem",
                        borderBottom:
                          i < calls.length - 1 ? "1px solid #f3f4f6" : "none",
                      }}
                    >
                      {call.number}
                    </TableCell>

                    {/* Name */}
                    <TableCell
                      sx={{
                        color: "#4b5563",
                        fontWeight: 500,
                        fontSize: "0.875rem",
                        borderBottom:
                          i < calls.length - 1 ? "1px solid #f3f4f6" : "none",
                      }}
                    >
                      {call.name}
                    </TableCell>

                    {/* Duration */}
                    <TableCell
                      sx={{
                        fontFamily: "monospace",
                        color: "#6b7280",
                        fontSize: "0.875rem",
                        borderBottom:
                          i < calls.length - 1 ? "1px solid #f3f4f6" : "none",
                      }}
                    >
                      {call.duration}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box className="!mt-6 !flex justify-center">
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton size="small" sx={{ color: "#9ca3af" }}>
              <MdChevronLeft />
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
              <MdChevronRight />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default CallsPage;
