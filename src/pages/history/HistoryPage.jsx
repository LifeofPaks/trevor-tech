import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  IconButton,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoLogoBitbucket } from "react-icons/io5";
import BuyModal from "../../components/buyModal/BuyModal";

// History data grouped by date
const historyByDate = [
  {
    date: "2022-02-02",
    entries: [
      {
        time: "12:30",
        url: "https://www.google.com/",
        favicon: "https://www.google.com/favicon.ico",
      },
      {
        time: "10:30",
        url: "https://www.youtube.com/",
        favicon: "https://www.youtube.com/favicon.ico",
      },
      {
        time: "07:00",
        url: "https://twitter.com/home",
        favicon: "https://twitter.com/favicon.ico",
      },
    ],
  },
  {
    date: "2022-01-01",
    entries: [
      {
        time: "13:50",
        url: "https://www.facebook.com/",
        favicon: "https://www.facebook.com/favicon.ico",
      },
      {
        time: "11:20",
        url: "https://www.instagram.com/",
        favicon: "https://www.instagram.com/favicon.ico",
      },
      {
        time: "09:15",
        url: "https://www.netflix.com/",
        favicon: "https://www.netflix.com/favicon.ico",
      },
    ],
  },
  {
    date: "2021-12-31",
    entries: [
      {
        time: "22:45",
        url: "https://www.amazon.com/",
        favicon: "https://www.amazon.com/favicon.ico",
      },
      {
        time: "20:10",
        url: "https://www.reddit.com/",
        favicon: "https://www.reddit.com/favicon.ico",
      },
      {
        time: "18:30",
        url: "https://www.wikipedia.org/",
        favicon: "https://www.wikipedia.org/favicon.ico",
      },
    ],
  },
  {
    date: "2021-12-30",
    entries: [
      {
        time: "15:00",
        url: "https://www.github.com/",
        favicon: "https://github.com/favicon.ico",
      },
      {
        time: "14:20",
        url: "https://www.spotify.com/",
        favicon: "https://www.spotify.com/favicon.ico",
      },
      {
        time: "13:45",
        url: "https://www.twitch.tv/",
        favicon: "https://www.twitch.tv/favicon.ico",
      },
    ],
  },
];

// Flatten for pagination
const allEntries = historyByDate.flatMap((group) =>
  group.entries.map((entry) => ({ ...entry, date: group.date }))
);
const ROWS_PER_PAGE = 10;

const HistoryPage = () => {
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const totalPages = Math.ceil(allEntries.length / ROWS_PER_PAGE);
  const startIndex = (page - 1) * ROWS_PER_PAGE;
  const currentEntries = allEntries.slice(
    startIndex,
    startIndex + ROWS_PER_PAGE
  );

  // Group current page entries by date
  const groupedEntries = currentEntries.reduce((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = [];
    }
    acc[entry.date].push(entry);
    return acc;
  }, {});

  return (
    <>
      <header className="!mb-4 sm:!mb-6 !px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
          <div className="flex items-center !gap-2 sm:!gap-3">
            <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
              Browser History
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
      <Box className="!p-6 !bg-gray-50 !min-h-screen">
        {/* History List */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: "16px",
            border: "1px solid #e5e7eb",
            overflow: "hidden",
          }}
        >
          <Stack spacing={0}>
            {Object.entries(groupedEntries).map(([date, entries]) => (
              <Box key={date}>
                {/* Date Header */}
                <Box
                  sx={{
                    px: 3,
                    py: 2,
                    backgroundColor: "#f9fafb",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <Typography className="!font-mono !text-sm !text-gray-600 !font-semibold">
                    {date}
                  </Typography>
                </Box>

                {/* Entries */}
                {entries.map((entry, i) => (
                  <Box
                    key={`${entry.date}-${i}`}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 3,
                      borderBottom:
                        i < entries.length - 1 ? "1px solid #f3f4f6" : "none",
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#f0f9ff",
                        "& .favicon": {
                          transform: "scale(1.1)",
                        },
                      },
                    }}
                  >
                    <Typography
                      className="!text-gray-500 !font-mono !text-xs !w-16 !flex-shrink-0"
                      sx={{ fontSize: isMobile ? "0.6875rem" : "0.75rem" }}
                    >
                      {entry.time}
                    </Typography>
                    <Box
                      component="img"
                      src={entry.favicon}
                      alt="favicon"
                      className="favicon"
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: "4px",
                        flexShrink: 0,
                        transition: "transform 0.2s ease",
                      }}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/20?text=F";
                      }}
                    />
                    <Typography
                      className="!text-gray-700 !font-mono !text-sm !truncate"
                      sx={{
                        flex: 1,
                        fontSize: isMobile ? "0.8125rem" : "0.875rem",
                        color: "#4b5563",
                      }}
                    >
                      {entry.url}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ))}
          </Stack>
        </Paper>

        {/* Pagination */}
        <Box className="!flex justify-center !mt-6">
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              size="small"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              sx={{ color: page === 1 ? "#d1d5db" : "#9ca3af" }}
            >
              <FiChevronLeft />
            </IconButton>

            {[...Array(totalPages)].map((_, i) => (
              <Chip
                key={i + 1}
                label={i + 1}
                size="small"
                onClick={() => setPage(i + 1)}
                sx={{
                  backgroundColor: page === i + 1 ? "#0695c8" : "#f3f4f6",
                  color: page === i + 1 ? "white" : "#6b7280",
                  fontWeight: page === i + 1 ? "bold" : "medium",
                  minWidth: 36,
                  height: 36,
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  "&:hover": {
                    backgroundColor: page === i + 1 ? "#0695c8" : "#e5e7eb",
                  },
                }}
              />
            ))}

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

      <BuyModal handleClose={handleClose} open={open} />
    </>
  );
};

export default HistoryPage;
