

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

// Real bookmarks with favicons
const allBookmarks = [
  {
    url: "https://www.google.com/",
    favicon: "https://www.google.com/favicon.ico",
  },
  {
    url: "https://www.youtube.com/",
    favicon: "https://www.youtube.com/favicon.ico",
  },
  { url: "https://twitter.com/", favicon: "https://twitter.com/favicon.ico" },
  {
    url: "https://www.facebook.com/",
    favicon: "https://www.facebook.com/favicon.ico",
  },
  {
    url: "https://www.netflix.com/",
    favicon: "https://www.netflix.com/favicon.ico",
  },
  {
    url: "https://www.amazon.com/",
    favicon: "https://www.amazon.com/favicon.ico",
  },
  {
    url: "https://www.reddit.com/",
    favicon: "https://www.reddit.com/favicon.ico",
  },
  {
    url: "https://www.wikipedia.org/",
    favicon: "https://www.wikipedia.org/favicon.ico",
  },
  { url: "https://www.github.com/", favicon: "https://github.com/favicon.ico" },
  {
    url: "https://www.spotify.com/",
    favicon: "https://www.spotify.com/favicon.ico",
  },
  {
    url: "https://www.twitch.tv/",
    favicon: "https://www.twitch.tv/favicon.ico",
  },
  {
    url: "https://www.linkedin.com/",
    favicon: "https://www.linkedin.com/favicon.ico",
  },
  {
    url: "https://www.pinterest.com/",
    favicon: "https://www.pinterest.com/favicon.ico",
  },
  {
    url: "https://www.tiktok.com/",
    favicon: "https://www.tiktok.com/favicon.ico",
  },

  {
    url: "https://www.telegram.org/",
    favicon: "https://telegram.org/favicon.ico",
  },

  {
    url: "https://www.canva.com/",
    favicon: "https://www.canva.com/favicon.ico",
  },
];

const ROWS_PER_PAGE = 10;

const BookmarksPage = () => {
  const [page, setPage] = useState(1);
  const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
       const [open, setOpen] = useState(false);

       const handleOpen = () => setOpen(true);
       const handleClose = () => setOpen(false);

  const totalPages = Math.ceil(allBookmarks.length / ROWS_PER_PAGE);
  const startIndex = (page - 1) * ROWS_PER_PAGE;
  const currentBookmarks = allBookmarks.slice(
    startIndex,
    startIndex + ROWS_PER_PAGE
  );

    return (
      <>
        {" "}
        <header className="!mb-4 sm:!mb-6 !px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
            <div className="flex items-center !gap-2 sm:!gap-3">
              <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
                Bookmarks
                <IoLogoBitbucket className="text-[#0695c8] rotate-[180deg]" />
              </h1>
            </div>
            <div className="flex sm:flex-row items-start sm:items-center !gap-2 sm:!gap-3">
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
          {/* Bookmarks List */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: "16px",
              border: "1px solid #e5e7eb",
              overflow: "hidden",
            }}
          >
            <Stack spacing={0}>
              {currentBookmarks.map((bookmark, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 3,
                    borderBottom:
                      i < currentBookmarks.length - 1
                        ? "1px solid #f3f4f6"
                        : "none",
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
                  <Box
                    component="img"
                    src={bookmark.favicon}
                    alt="favicon"
                    className="favicon"
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "6px",
                      flexShrink: 0,
                      transition: "transform 0.2s ease",
                    }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/24?text=F";
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
                    {bookmark.url}
                  </Typography>
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

export default BookmarksPage;