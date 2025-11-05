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
  Avatar,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import { FiChevronLeft, FiChevronRight, FiMail } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { useTranslation } from "react-i18next";
import BindPhone from "../../components/demo/BindPhone";

// Sample Emails with Profile Pictures (Cheating/Phishing Theme)
const emails = [
  {
    id: 1,
    fromKey: "email1.from",
    subjectKey: "email1.subject",
    time: "2022-02-10 09:00",
    previewKey: "email1.preview",
    bodyKey: "email1.body",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    fromKey: "email2.from",
    subjectKey: "email2.subject",
    time: "2022-02-05 10:20",
    previewKey: "email2.preview",
    bodyKey: "email2.body",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    fromKey: "email3.from",
    subjectKey: "email3.subject",
    time: "2022-01-10 22:40",
    previewKey: "email3.preview",
    bodyKey: "email3.body",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 4,
    fromKey: "email4.from",
    subjectKey: "email4.subject",
    time: "2022-01-07 21:32",
    previewKey: "email4.preview",
    bodyKey: "email4.body",
    avatar: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: 5,
    fromKey: "email5.from",
    subjectKey: "email5.subject",
    time: "2022-01-05 14:15",
    previewKey: "email5.preview",
    bodyKey: "email5.body",
    avatar: "https://i.pravatar.cc/150?img=20",
  },
];

const ROWS_PER_PAGE = 10;

const EmailPage = () => {
  const { t } = useTranslation();
  const [selectedEmail, setSelectedEmail] = useState(emails[3]); // Default to email4 (bank alert)
  const [page, setPage] = useState(1);
  const [source, setSource] = useState("All");
  const [folder, setFolder] = useState("Inbox");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const totalPages = Math.ceil(emails.length / ROWS_PER_PAGE);
  const startIndex = (page - 1) * ROWS_PER_PAGE;
  const currentEmails = emails.slice(startIndex, startIndex + ROWS_PER_PAGE);

  return (
    <div>
      <header className="!mb-4 sm:!mb-6 !px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
          <div className="flex items-center !gap-2 sm:!gap-3">
            <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
              {t("dmemail.header.title")} <MdEmail className="text-[#0695c8]" />
            </h1>
          </div>
          <BindPhone />
        </div>
      </header>
      <Box className="overflow-x-hidden">
        {/* Header */}
        <Box className="!m-6">
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            className="!flex-wrap"
          >
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>{t("dmemail.filters.source.label")}</InputLabel>
              <Select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                label={t("dmemail.filters.source.label")}
                sx={{
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#d1d5db",
                  },
                }}
              >
                <MenuItem value="All">
                  {t("dmemail.filters.source.all")}
                </MenuItem>
                <MenuItem value="Gmail">
                  {t("dmemail.filters.source.gmail")}
                </MenuItem>
                <MenuItem value="Outlook">
                  {t("dmemail.filters.source.outlook")}
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>{t("dmemail.filters.folder.label")}</InputLabel>
              <Select
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
                label={t("dmemail.filters.folder.label")}
                sx={{
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#d1d5db",
                  },
                }}
              >
                <MenuItem value="Inbox">
                  {t("dmemail.filters.folder.inbox")}
                </MenuItem>
                <MenuItem value="Sent">
                  {t("dmemail.filters.folder.sent")}
                </MenuItem>
                <MenuItem value="Spam">
                  {t("dmemail.filters.folder.spam")}
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Box>

        {/* Email Layout */}
        <Box
          className={
            isMobile
              ? selectedEmail
                ? "!hidden"
                : "!block"
              : "!grid !grid-cols-1 md:!grid-cols-12 !gap-6"
          }
          sx={{ width: "100%", maxWidth: "100vw", overflowX: "hidden" }}
        >
          {/* Email List - Larger Left Card */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: "16px",
              border: "1px solid #e5e7eb",
              overflow: "hidden",
              height: isMobile ? "auto" : "calc(100vh - 220px)",
              display: isMobile && selectedEmail ? "none" : "block",
              gridColumn: isMobile ? "span 12" : "span 5", // Larger left card
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <Stack spacing={0}>
              {currentEmails.map((email) => (
                <Box
                  key={email.id}
                  onClick={() => setSelectedEmail(email)}
                  sx={{
                    p: 3,
                    borderBottom: "1px solid #f3f4f6",
                    cursor: "pointer",
                    backgroundColor:
                      selectedEmail?.id === email.id
                        ? "#f0f9ff"
                        : "transparent",
                    "&:hover": {
                      backgroundColor: "#f0f9ff",
                    },
                    transition: "all 0.2s ease",
                  }}
                  className="lg:!w-full w-[80vw]"
                >
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Avatar
                      src={email.avatar}
                      alt={t("dmemail.avatar_alt", {
                        from: t(`dmemail.emails.${email.fromKey}`),
                      })}
                      sx={{
                        width: 40,
                        height: 40,
                        flexShrink: 0,
                      }}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        className="!font-medium !text-gray-900 !text-sm !truncate"
                        sx={{
                          fontWeight:
                            selectedEmail?.id === email.id ? 600 : 500,
                        }}
                      >
                        {t(`dmemail.emails.${email.fromKey}`)}
                      </Typography>
                      <Typography className="!text-xs !text-gray-500 !mt-0.5">
                        {email.time}
                      </Typography>
                      <Typography className="!font-medium !text-gray-800 !text-sm !mt-1 !truncate">
                        {t(`dmemail.emails.${email.subjectKey}`)}
                      </Typography>
                      <Typography className="!text-xs !text-gray-600 !truncate !mt-1">
                        {t(`dmemail.emails.${email.previewKey}`)}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Paper>

          {/* Email Preview - Desktop */}
          {!isMobile && (
            <Paper
              elevation={0}
              sx={{
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
                p: 4,
                height: "calc(100vh - 220px)",
                overflowY: "auto",
                display: selectedEmail ? "block" : "flex",
                alignItems: selectedEmail ? "flex-start" : "center",
                justifyContent: selectedEmail ? "flex-start" : "center",
                gridColumn: "span 7",
                "&::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {selectedEmail ? (
                <Box sx={{ width: "100%" }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    className="!mb-4"
                  >
                    <FiMail className="!text-xl !text-gray-500" />
                    <Typography
                      variant="h6"
                      className="!font-bold !text-gray-800"
                    >
                      {t(`dmemail.emails.${selectedEmail.subjectKey}`)}
                    </Typography>
                  </Stack>

                  <Stack spacing={1} className="!mb-6">
                    <Box className="!flex !justify-between">
                      <Typography className="!text-sm !text-gray-600">
                        {t("dmemail.preview.to_label")}
                      </Typography>
                      <Typography className="!text-sm !font-medium">
                        nina@gmail.com
                      </Typography>
                    </Box>
                    <Box className="!flex !justify-between">
                      <Typography className="!text-sm !text-gray-600">
                        {t("dmemail.preview.from_label")}
                      </Typography>
                      <Typography className="!text-sm !font-medium">
                        {t(`dmemail.emails.${selectedEmail.fromKey}`)}
                      </Typography>
                    </Box>
                    <Box className="!flex !justify-between">
                      <Typography className="!text-sm !text-gray-600">
                        {t("dmemail.preview.subject_label")}
                      </Typography>
                      <Typography className="!text-sm !font-medium">
                        {t(`dmemail.emails.${selectedEmail.subjectKey}`)}
                      </Typography>
                    </Box>
                    <Box className="!flex !justify-between">
                      <Typography className="!text-sm !text-gray-600">
                        {t("dmemail.preview.date_label")}
                      </Typography>
                      <Typography className="!text-sm !font-medium">
                        {selectedEmail.time}
                      </Typography>
                    </Box>
                  </Stack>

                  <Divider sx={{ my: 3 }} />

                  <Typography
                    component="pre"
                    className="!text-sm !text-gray-700 !whitespace-pre-wrap !font-sans"
                    sx={{ fontFamily: "inherit", lineHeight: 1.6 }}
                  >
                    {t(`dmemail.emails.${selectedEmail.bodyKey}`)}
                  </Typography>
                </Box>
              ) : (
                <Typography className="!text-gray-500 !text-center">
                  {t("dmemail.preview.no_selection")}
                </Typography>
              )}
            </Paper>
          )}
        </Box>

        {/* Mobile Email Preview */}
        {isMobile && selectedEmail && (
          <Box className="!fixed !inset-0 !bg-white !z-50 !p-6 !overflow-y-auto">
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              className="!mb-6"
            >
              <IconButton
                onClick={() => setSelectedEmail(null)}
                size="small"
                aria-label={t("dmemail.preview.back_aria")}
              >
                <FiChevronLeft />
              </IconButton>
              <Typography
                variant="h6"
                className="!font-bold !text-gray-800 !flex-1"
              >
                {t(`dmemail.emails.${selectedEmail.subjectKey}`)}
              </Typography>
            </Stack>

            <Stack spacing={1} className="!mb-6">
              <Box className="!flex !justify-between">
                <Typography className="!text-sm !text-gray-600">
                  {t("dmemail.preview.to_label")}
                </Typography>
                <Typography className="!text-sm !font-medium">
                  nina@gmail.com
                </Typography>
              </Box>
              <Box className="!flex !justify-between">
                <Typography className="!text-sm !text-gray-600">
                  {t("dmemail.preview.from_label")}
                </Typography>
                <Typography className="!text-sm !font-medium">
                  {t(`dmemail.emails.${selectedEmail.fromKey}`)}
                </Typography>
              </Box>
              <Box className="!flex !justify-between">
                <Typography className="!text-sm !text-gray-600">
                  {t("dmemail.preview.date_label")}
                </Typography>
                <Typography className="!text-sm !font-medium">
                  {selectedEmail.time}
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Typography
              component="pre"
              className="!text-sm !text-gray-700 !whitespace-pre-wrap !font-sans"
              sx={{ fontFamily: "inherit", lineHeight: 1.6 }}
            >
              {t(`dmemail.emails.${selectedEmail.bodyKey}`)}
            </Typography>
          </Box>
        )}

        {/* Pagination */}
        <Box className="!flex justify-center !my-6">
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              size="small"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              sx={{ color: page === 1 ? "#d1d5db" : "#9ca3af" }}
              aria-label={t("dmemail.pagination.previous_aria")}
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
              aria-label={t("dmemail.pagination.page_aria", { page })}
            />
            <IconButton
              size="small"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              sx={{ color: page === totalPages ? "#d1d5db" : "#9ca3af" }}
              aria-label={t("dmemail.pagination.next_aria")}
            >
              <FiChevronRight />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </div>
  );
};

export default EmailPage;
