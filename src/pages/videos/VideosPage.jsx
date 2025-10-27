import React, { useState } from "react";
import { Box, Typography, Paper, Stack, Chip, IconButton } from "@mui/material";
import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiVideo,
} from "react-icons/fi";
import { IoLogoBitbucket } from "react-icons/io5";

const allVideos = [
  {
    id: 1,
    url: "https://www.pexels.com/download/video/2992753/",
    time: "2022-01-10 07:30",
  },
  {
    id: 2,
    url: "https://www.pexels.com/download/video/5736057/",
    time: "2022-02-02 21:30",
  },
  {
    id: 3,
    url: "https://www.pexels.com/download/video/5899736/",
    time: "2022-02-10 12:45",
  },
  {
    id: 4,
    url: "https://www.pexels.com/download/video/7334751/",
    time: "2022-03-15 15:00",
  },
  {
    id: 5,
    url: "https://www.pexels.com/download/video/7252269/",
    time: "2022-03-20 17:30",
  },
  {
    id: 6,
    url: "https://www.pexels.com/download/video/8858444/",
    time: "2022-03-25 09:45",
  },
  {
    id: 7,
    url: "https://www.pexels.com/download/video/4832216/",
    time: "2022-04-01 10:15",
  },
  {
    id: 8,
    url: "https://www.pexels.com/download/video/8136218/",
    time: "2022-04-10 13:30",
  },
];

const VIDEOS_PER_PAGE = 8;

const VideosPage = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(allVideos.length / VIDEOS_PER_PAGE);
  const startIndex = (page - 1) * VIDEOS_PER_PAGE;
  const currentVideos = allVideos.slice(
    startIndex,
    startIndex + VIDEOS_PER_PAGE
  );

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename || `video-${Date.now()}.mp4`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="!mb-4 sm:!mb-6 !px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
          <div className="flex items-center !gap-2 sm:!gap-3">
            <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
              Videos
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

      {/* Body */}
      <Box className="!p-6 !bg-gray-50 !min-h-screen">
        {/* Filters */}
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

        {/* ✅ Responsive Grid */}
        <Box
          className="!grid !gap-6 !mb-8"
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)", // ✅ Exactly 4 columns on large screens
            },
          }}
        >
          {currentVideos.map((video) => (
            <Paper
              key={video.id}
              elevation={0}
              sx={{
                borderRadius: "24px",
                overflow: "hidden",
                position: "relative",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                  "& .download-btn": {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                },
                "& .download-btn": {
                  opacity: 0,
                  transform: "translateY(10px)",
                  transition: "all 0.25s ease",
                },
              }}
              className="!bg-white !cursor-pointer"
            >
              {/* Video Preview */}
              <Box sx={{ position: "relative", paddingTop: "130%" }}>
                <video
                  src={video.url}
                  controls
                  muted
                  preload="metadata"
                  className="!absolute !top-0 !left-0 !w-full !h-full !object-cover rounded-2xl"
                />

                {/* Download Button */}
                <IconButton
                  className="download-btn !absolute !inset-0 !m-auto !w-14 !h-14 !bg-white !shadow-xl !rounded-full"
                  sx={{
                    zIndex: 10,
                    "&:hover": {
                      backgroundColor: "#0695c8",
                      color: "white",
                      transform: "scale(1.15)",
                    },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(
                      video.url,
                      `video-${video.time.replace(/[: ]/g, "-")}.mp4`
                    );
                  }}
                >
                  <FiVideo className="!text-2xl !text-gray-700" />
                </IconButton>
              </Box>

              {/* Timestamp */}
              <Box className="!p-4 !flex !items-center !justify-between">
                <Typography
                  variant="caption"
                  className="!text-gray-600 !font-mono !text-xs !tracking-tight"
                >
                  {video.time}
                </Typography>
                <FiDownload
                  className="!text-gray-400 !text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(
                      video.url,
                      `video-${video.time.replace(/[: ]/g, "-")}.mp4`
                    );
                  }}
                />
              </Box>
            </Paper>
          ))}
        </Box>

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
                  minWidth: 44,
                  height: 44,
                  borderRadius: "14px",
                  cursor: "pointer",
                  fontSize: "0.9375rem",
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
    </>
  );
};

export default VideosPage;
