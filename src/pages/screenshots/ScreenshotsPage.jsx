import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FiChevronLeft, FiChevronRight, FiVideo } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import Image1 from "../../assets/dashboard/screenshots/i-1.png";
import Image2 from "../../assets/dashboard/screenshots/i-2.png";
import Image3 from "../../assets/dashboard/screenshots/i-3.png";
import Image4 from "../../assets/dashboard/screenshots/i-4.webp";
import Image5 from "../../assets/dashboard/screenshots/i-5.webp";
import Image6 from "../../assets/dashboard/screenshots/i-6.webp";
import Image7 from "../../assets/dashboard/screenshots/i-7.webp";
import Image8 from "../../assets/dashboard/screenshots/i-8.webp";
import Image9 from "../../assets/dashboard/screenshots/i-9.webp";
import { IoLogoBitbucket } from "react-icons/io5";
import BindPhone from "../../components/demo/BindPhone";
import { RiScreenshot2Fill } from "react-icons/ri";

// Sample Data with translation keys
const allItems = [
  {
    id: 1,
    appKey: "item1.app",
    typeKey: "item1.type",
    dateKey: "item1.date",
    image: Image4,
  },
  {
    id: 2,
    appKey: "item2.app",
    typeKey: "item2.type",
    dateKey: "item2.date",
    image: Image1,
  },
  {
    id: 3,
    appKey: "item3.app",
    typeKey: "item3.type",
    dateKey: "item3.date",
    image: Image2,
  },
  {
    id: 4,
    appKey: "item4.app",
    typeKey: "item4.type",
    dateKey: "item4.date",
    image: Image3,
  },
  {
    id: 5,
    appKey: "item5.app",
    typeKey: "item5.type",
    dateKey: "item5.date",
    image: Image5,
  },
  {
    id: 6,
    appKey: "item6.app",
    typeKey: "item6.type",
    dateKey: "item6.date",
    image: Image6,
  },
  {
    id: 7,
    appKey: "item7.app",
    typeKey: "item7.type",
    dateKey: "item7.date",
    image: Image7,
  },
  {
    id: 8,
    appKey: "item8.app",
    typeKey: "item8.type",
    dateKey: "item8.date",
    image: Image8,
  },
  {
    id: 9,
    appKey: "item9.app",
    typeKey: "item9.type",
    dateKey: "item9.date",
    image: Image9,
  },
  {
    id: 10,
    appKey: "item10.app",
    typeKey: "item10.type",
    dateKey: "item10.date",
    image: Image3,
  },
];

const ROWS_PER_PAGE = 10;

const ScreenshotsPage = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [appFilter, setAppFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Filter logic
  const filteredItems = allItems.filter((item) => {
    const appMatch =
      appFilter === "All" || t(`dmscp.items.${item.appKey}`) === appFilter;
    const typeMatch =
      typeFilter === "All" || t(`dmscp.items.${item.typeKey}`) === typeFilter;
    return appMatch && typeMatch;
  });

  const totalPages = Math.ceil(filteredItems.length / ROWS_PER_PAGE);
  const startIndex = (page - 1) * ROWS_PER_PAGE;
  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + ROWS_PER_PAGE
  );

  const apps = [
    "All",
    ...new Set(allItems.map((i) => t(`dmscp.items.${i.appKey}`))),
  ];

  return (
    <>
      <header className="!mb-4 sm:!mb-6 !px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
          <div className="flex items-center !gap-2 sm:!gap-3">
            <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
              {t("dmscp.header.title")}{" "}
              <RiScreenshot2Fill className="text-[#0695c8]" />
            </h1>
          </div>
          <BindPhone />
        </div>
      </header>

      <Box className="!p-6 !bg-gray-50 overflow-x-hidden">
        {/* Header Filters */}
        <Box className="!mb-6">
          <Stack
            direction={isMobile ? "row" : "row"}
            spacing={2}
            alignItems="center"
            className="!flex-wrap"
          >
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel id="app-filter-label">
                {t("dmscp.filters.app_label")}
              </InputLabel>
              <Select
                labelId="app-filter-label"
                value={appFilter}
                onChange={(e) => {
                  setAppFilter(e.target.value);
                  setPage(1);
                }}
                label={t("dmscp.filters.app_label")}
                sx={{
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#d1d5db",
                  },
                }}
                aria-label={t("dmscp.filters.app_aria")}
              >
                {apps.map((app) => (
                  <MenuItem key={app} value={app}>
                    {app}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel id="type-filter-label">
                {t("dmscp.filters.type_label")}
              </InputLabel>
              <Select
                labelId="type-filter-label"
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value);
                  setPage(1);
                }}
                label={t("dmscp.filters.type_label")}
                sx={{
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#d1d5db",
                  },
                }}
                aria-label={t("dmscp.filters.type_aria")}
              >
                <MenuItem value="All">{t("dmscp.filters.types.all")}</MenuItem>
                <MenuItem value={t("dmscp.filters.types.screenshot")}>
                  {t("dmscp.filters.types.screenshot")}
                </MenuItem>
                <MenuItem value={t("dmscp.filters.types.recording")}>
                  {t("dmscp.filters.types.recording")}
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Box>

        {/* Gallery */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: "16px",
            overflow: "hidden",
            bgcolor: "transparent",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "repeat(2, 1fr)"
                : "repeat(4, 1fr)",
              gap: 3,
            }}
          >
            {currentItems.map((item) => (
              <Box
                className="h-[200px]"
                key={item.id}
                onClick={() => setSelectedImage(item)}
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  borderRadius: "12px",
                  overflow: "hidden",
                  backgroundColor: "#f3f4f6",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={t(`dmscp.items.${item.appKey}`)}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    borderRadius: "12px",
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                    color: "white",
                    p: 2,
                    fontSize: "0.75rem",
                  }}
                >
                  <Typography className="!font-medium !text-xs">
                    {t(`dmscp.items.${item.appKey}`)}
                  </Typography>
                  <Typography className="!text-xs !opacity-80">
                    {t(`dmscp.items.${item.dateKey}`)}
                  </Typography>
                </Box>

                {t(`dmscp.items.${item.typeKey}`) ===
                  t("dmscp.filters.types.recording") && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: "rgba(0,0,0,0.6)",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FiVideo className="!text-white !text-sm" />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Pagination */}
        <Box className="!flex justify-center !mt-6">
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              size="small"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              sx={{ color: page === 1 ? "#d1d5db" : "#9ca3af" }}
              aria-label={t("dmscp.pagination.previous_aria")}
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
              aria-label={t("dmscp.pagination.next_aria")}
            >
              <FiChevronRight />
            </IconButton>
          </Stack>
        </Box>

        {/* Modal */}
        {selectedImage && (
          <Box
            className="!fixed !inset-0 !z-50 !bg-black/90 !flex !items-center !justify-center !p-4"
            onClick={() => setSelectedImage(null)}
          >
            <IconButton
              className="!absolute !top-4 !left-4 !text-white !text-2xl"
              onClick={() => setSelectedImage(null)}
              aria-label={t("dmscp.modal.close_aria")}
            >
              <FiChevronLeft />
            </IconButton>

            <Box className="!max-w-4xl !w-full !flex !flex-col !items-center">
              <Box
                component="img"
                src={selectedImage.image}
                alt={t(`dmscp.items.${selectedImage.appKey}`)}
                sx={{
                  maxHeight: "80vh",
                  width: "auto",
                  borderRadius: "16px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                }}
              />
              <Box className="!mt-4 !text-center !text-white">
                <Typography className="!font-medium">
                  {t(`dmscp.items.${selectedImage.appKey}`)}
                </Typography>
                <Typography className="!text-sm !opacity-80">
                  {t(`dmscp.items.${selectedImage.dateKey}`)}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ScreenshotsPage;
