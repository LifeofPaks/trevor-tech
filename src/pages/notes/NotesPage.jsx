import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
  IconButton,
  Divider,
} from "@mui/material";
import { FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaNoteSticky } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import BuyModal from "../../components/buyModal/BuyModal";

// Sample Notes Data
const notes = [
  {
    titleKey: "dnt.notes.0.title",
    contentKey: "dnt.notes.0.content",
    time: "2022-02-08 09:30",
  },
  {
    titleKey: "dnt.notes.1.title",
    contentKey: "dnt.notes.1.content",
    time: "2022-01-27 18:46",
  },
  {
    titleKey: "dnt.notes.2.title",
    contentKey: "dnt.notes.2.content",
    time: "2022-01-06 10:30",
  },
  {
    titleKey: "dnt.notes.3.title",
    contentKey: "dnt.notes.3.content",
    time: "2022-01-01 09:30",
  },
];

const NotesPage = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <header className="!mb-4 sm:!mb-6 !px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
          <div className="flex items-center !gap-2 sm:!gap-3">
            <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
              {t("dnt.header.title")}{" "}
              <FaNoteSticky className="text-[#0695c8]" />
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center !gap-2 sm:!gap-3">
            <span className="text-[10px] sm:text-xs text-orange-600 bg-orange-100 !px-3 sm:!px-4 !py-1.5 sm:!py-2 rounded-full font-medium">
              {t("dnt.header.demo_message")}
            </span>
            <button
              onClick={handleOpen}
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[13px] !px-4 sm:!px-5 !py-1.5 sm:!py-2 rounded-full font-semibold shadow-md hover:shadow-xl transition-all hover:scale-105 whitespace-nowrap"
              aria-label={t("dnt.header.bind_button_aria")}
            >
              {t("dnt.header.bind_button")}
            </button>
          </div>
        </div>
      </header>
      <Box className="!p-6 !bg-gray-50">
        {/* Header: Date Range + Last 7 days */}
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
                  {t("dnt.header.date_range", {
                    startDate: "2021-01-01",
                    endDate: "2022-04-30",
                  })}
                </Typography>
              </Paper>
              <Chip
                label={t("dnt.header.last_7_days")}
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

        {/* Notes List */}
        <Stack spacing={3} className="!mb-8">
          {notes.map((note, i) => (
            <Paper
              key={i}
              elevation={0}
              sx={{
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
                overflow: "hidden",
                transition: "all 0.2s",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  transform: "translateY(-1px)",
                },
              }}
              className="!bg-white"
            >
              <Box className="!p-5">
                <Typography
                  variant="h6"
                  className="!font-bold !text-gray-900 !mb-1 !text-[14px]"
                  sx={{ color: "#0695c8" }}
                >
                  {t(note.titleKey)}
                </Typography>
                <Typography
                  variant="body2"
                  className="!text-gray-600 !mb-3 !leading-relaxed"
                >
                  {t(note.contentKey)}
                </Typography>
                <Divider className="!my-3" />
                <Typography
                  variant="caption"
                  className="!text-gray-500 !font-mono !text-xs"
                >
                  {note.time}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Stack>

        {/* Pagination */}
        <Box className="!flex justify-center">
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              size="small"
              sx={{ color: "#9ca3af" }}
              aria-label={t("dnt.pagination.prev_button_aria")}
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
                width: 32,
                height: 32,
                fontSize: "0.875rem",
              }}
            />
            <IconButton
              size="small"
              sx={{ color: "#9ca3af" }}
              aria-label={t("dnt.pagination.next_button_aria")}
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

export default NotesPage;
