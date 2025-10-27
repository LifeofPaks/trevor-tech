import React, { useState } from "react";
import { Box, Typography, Paper, Stack, Chip, IconButton } from "@mui/material";
import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
} from "react-icons/fi";
import { BsCamera2 } from "react-icons/bs";
import { CameraIcon } from "lucide-react";
import { FiCamera } from "react-icons/fi";
import { IoLogoBitbucket } from "react-icons/io5";

const allPhotos = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1000&h=1000&fit=crop",
    time: "2022-01-10 07:30",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1000&h=1000&fit=crop",
    time: "2022-01-10 07:30",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&h=1000&fit=crop",
    time: "2022-01-10 07:30",
  },
  {
    id: 4,
    url: "https://editaphotography.in/wp-content/uploads/2024/03/Baby_photo_shoot_Pune_07.jpg",
    time: "2022-02-02 21:30",
  },
  {
    id: 5,
    url: "https://img.joomcdn.net/feb4b761ec6ead7f48559062aca9992cb6e154cb_original.jpeg",
    time: "2022-02-01 06:30",
  },
  {
    id: 6,
    url: "https://media.istockphoto.com/id/2148975617/photo/woman-jumping-high-after-successful-job-interview.jpg?s=612x612&w=0&k=20&c=puWecKm9APpx7QYJmjHEySQVZM38wRDEQQvSZaCeL30=",
    time: "2022-01-31 19:30",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1000&h=1000&fit=crop",
    time: "2022-01-30 01:30",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1000&h=1000&fit=crop",
    time: "2022-01-29 04:30",
  },
  {
    id: 9,
    url: "https://i.pinimg.com/1200x/5a/56/7a/5a567a7ec454bcd3fff0e1e99b352718.jpg",
    time: "2022-01-28 16:30",
  },
  {
    id: 10,
    url: "https://i.pinimg.com/1200x/1f/2c/04/1f2c04be1eac7fab7e22986e7719b44b.jpg",
    time: "2022-01-28 16:30",
  },
  {
    id: 11,
    url: "https://i.pinimg.com/1200x/a4/63/ba/a463baea34adb43d0117f07dfa713e5d.jpg",
    time: "2022-01-27 17:30",
  },
  {
    id: 12,
    url: "https://i.pinimg.com/1200x/3e/fe/7c/3efe7c09bcb876cc18d54a0e6c8b62c6.jpg",
    time: "2022-01-27 17:30",
  },
];

const PHOTOS_PER_PAGE = 12;

const PhotosPage = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(allPhotos.length / PHOTOS_PER_PAGE);
  const startIndex = (page - 1) * PHOTOS_PER_PAGE;
  const currentPhotos = allPhotos.slice(
    startIndex,
    startIndex + PHOTOS_PER_PAGE
  );

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename || `photo-${Date.now()}.jpg`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

    return (
      <>
        <header className="!mb-4 sm:!mb-6 !px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
            <div className="flex items-center !gap-2 sm:!gap-3">
              <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
Photos
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
        <Box className="!p-6 !bg-gray-50 !min-h-screen">
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

          {/* ✅ Fixed Responsive Grid */}
          <Box
            className="!grid !gap-6 !mb-8"
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)", // ✅ Forces exactly 4 columns on large
              },
            }}
          >
            {currentPhotos.map((photo) => (
              <Paper
                key={photo.id}
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
                {/* Larger Image */}
                <Box sx={{ position: "relative", paddingTop: "130%" }}>
                  <Box
                    component="img"
                    src={photo.url}
                    alt={`Photo ${photo.id}`}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    loading="lazy"
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
                  >
                    <FiCamera className="!text-2xl !text-gray-700" />
                  </IconButton>
                </Box>

                {/* Timestamp */}
                <Box className="!p-4 !flex !items-center !justify-between">
                  <Typography
                    variant="caption"
                    className="!text-gray-600 !font-mono !text-xs !tracking-tight"
                  >
                    {photo.time}
                  </Typography>
                  <FiDownload
                    className="!text-gray-400 !text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(
                        photo.url,
                        `photo-${photo.time.replace(/[: ]/g, "-")}.jpg`
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

export default PhotosPage;
