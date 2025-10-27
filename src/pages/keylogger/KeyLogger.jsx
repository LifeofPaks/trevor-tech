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
  Divider,
} from "@mui/material";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

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

  const filteredLogs =
    selectedApp === "All"
      ? keylogs
      : keylogs.filter((log) => log.app === selectedApp);

  const hasActivity = filteredLogs.length > 0;

  return (
    <Box className="!p-6 !bg-gray-50 !min-h-screen">
      {/* Header: Dropdown */}
      <Box className="!mb-6">
        <FormControl  size="small" sx={{ minWidth: 350 }}>
          <Select
            value={selectedApp}
            label="App"
            onChange={(e) => {
              setSelectedApp(e.target.value);
              setPage(1);
            }}
            sx={{
              borderRadius: "12px",
              backgroundColor: "#f9fafb",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#d1d5db",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00d4ff",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00d4ff",
              },
              "& .MuiSelect-select": {
                py: 1.5,
                fontSize: "0.875rem",
              },
              
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 300,
                  borderRadius: "12px",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  mt: 1,
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
                    "&:hover": { backgroundColor: "#cce7ff" },
                  },
                }}
              >
                {app}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          overflow: "hidden",
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
                  }}
                >
                  <TableCell
                    sx={{
                      fontWeight: 500,
                      color: "#1f2937",
                      pl: 3,
                      fontSize: "0.875rem",
                    }}
                  >
                    {log.app}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#4b5563",
                      fontSize: "0.875rem",
                      maxWidth: 400,
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
                    }}
                  >
                    {log.time}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} sx={{ py: 8 }}>
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
                backgroundColor: "#00d4ff",
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
  );
};

export default KeyLogger;
