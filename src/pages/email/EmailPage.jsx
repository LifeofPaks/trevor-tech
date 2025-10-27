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
import { IoLogoBitbucket } from "react-icons/io5";
import BindPhone from "../../components/demo/BindPhone";

// Sample Emails with Profile Pictures
const emails = [
  {
    id: 1,
    from: "jane@gmail.com",
    subject: "Happy birthday to you",
    time: "2022-02-10 09:00",
    preview: "Hope you have a wonderful day filled with joy and laughter!",
    avatar: "https://i.pravatar.cc/150?img=1",
    body: `Dear Nina,

Hope you have a wonderful day filled with joy and laughter!

Best wishes,
Jane`,
  },
  {
    id: 2,
    from: "jasonpayne@gmail.com",
    subject: "Password rest request",
    time: "2022-02-05 10:20",
    preview: "You requested a password reset for your account.",
    avatar: "https://i.pravatar.cc/150?img=5",
    body: `Hi Nina,

You requested a password reset for your account. Click the link below to proceed:

[Reset Password]

If you didn't request this, you can safely ignore this email.

Thanks,
The Team`,
  },
  {
    id: 3,
    from: "mail@mail.adobe.com",
    subject: "Unlock 25% off creative cloud",
    time: "2022-01-10 22:40",
    preview: "Limited time offer: Save 25% on Adobe Creative Cloud!",
    avatar: "https://i.pravatar.cc/150?img=11",
    body: `Hi Nina,

Unlock 25% off Creative Cloud — your all-in-one design toolkit.

- Photoshop
- Illustrator
- Premiere Pro
- And 20+ apps

Offer ends soon → https://adobe.com/offer

Adobe`,
  },
  {
    id: 4,
    from: "noreply@email.apple.com",
    subject: "Your Apple ID was used to sign in to iCloud via a web browser",
    time: "2022-01-07 21:32",
    preview:
      "Your Apple ID (nina@outlook.com) was used to sign in to iCloud via a web browser.",
    avatar: "https://i.pravatar.cc/150?img=15",
    body: `Dear Nina,

Your Apple ID (nina@outlook.com) was used to sign in to iCloud via a web browser.

Date and Time: Jan 7, 2022, 9:30 PM CST

If the information above looks familiar, you can ignore this message.

If you have not signed in to iCloud recently and believe someone may have accessed your account, go to Apple ID[](https://appleid.apple.com) and change your password as soon as possible.

Apple Support`,
  },
  {
    id: 5,
    from: "support@spotify.com",
    subject: "Your premium trial has ended",
    time: "2022-01-05 14:15",
    preview: "Keep listening ad-free with Spotify Premium.",
    avatar: "https://i.pravatar.cc/150?img=20",
    body: `Hi Nina,

Your Spotify Premium trial has ended. Keep listening ad-free, offline, and with unlimited skips.

Subscribe now → https://spotify.com/premium

Spotify`,
  },
];

const ROWS_PER_PAGE = 10;

const EmailPage = () => {
  const [selectedEmail, setSelectedEmail] = useState(emails[3]); // Apple email by default
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
              GPS Locations
              <IoLogoBitbucket className="text-[#0695c8] rotate-[180deg]" />
            </h1>
          </div>
          <BindPhone />
        </div>
      </header>
      <Box className="  overflow-x-hidden">
        {/* Header */}
        <Box className="!m-6">
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            className="!flex-wrap"
          >
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Email source</InputLabel>
              <Select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                label="Email source"
                sx={{
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#d1d5db",
                  },
                }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Gmail">Gmail</MenuItem>
                <MenuItem value="Outlook">Outlook</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Folder</InputLabel>
              <Select
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
                label="Folder"
                sx={{
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#d1d5db",
                  },
                }}
              >
                <MenuItem value="Inbox">Inbox</MenuItem>
                <MenuItem value="Sent">Sent</MenuItem>
                <MenuItem value="Spam">Spam</MenuItem>
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
                      alt={email.from}
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
                        {email.from}
                      </Typography>
                      <Typography className="!text-xs !text-gray-500 !mt-0.5">
                        {email.time}
                      </Typography>
                      <Typography className="!font-medium !text-gray-800 !text-sm !mt-1 !truncate">
                        {email.subject}
                      </Typography>
                      <Typography className="!text-xs !text-gray-600 !truncate !mt-1">
                        {email.preview}
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
                      {selectedEmail.subject}
                    </Typography>
                  </Stack>

                  <Stack spacing={1} className="!mb-6">
                    <Box className="!flex !justify-between">
                      <Typography className="!text-sm !text-gray-600">
                        To:
                      </Typography>
                      <Typography className="!text-sm !font-medium">
                        nina@gmail.com
                      </Typography>
                    </Box>
                    <Box className="!flex !justify-between">
                      <Typography className="!text-sm !text-gray-600">
                        From:
                      </Typography>
                      <Typography className="!text-sm !font-medium">
                        {selectedEmail.from}
                      </Typography>
                    </Box>
                    <Box className="!flex !justify-between">
                      <Typography className="!text-sm !text-gray-600">
                        Subject:
                      </Typography>
                      <Typography className="!text-sm !font-medium">
                        {selectedEmail.subject}
                      </Typography>
                    </Box>
                    <Box className="!flex !justify-between">
                      <Typography className="!text-sm !text-gray-600">
                        Date:
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
                    {selectedEmail.body}
                  </Typography>
                </Box>
              ) : (
                <Typography className="!text-gray-500 !text-center">
                  Select an email to preview
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
              <IconButton onClick={() => setSelectedEmail(null)} size="small">
                <FiChevronLeft />
              </IconButton>
              <Typography
                variant="h6"
                className="!font-bold !text-gray-800 !flex-1"
              >
                {selectedEmail.subject}
              </Typography>
            </Stack>

            <Stack spacing={1} className="!mb-6">
              <Box className="!flex !justify-between">
                <Typography className="!text-sm !text-gray-600">To:</Typography>
                <Typography className="!text-sm !font-medium">
                  nina@gmail.com
                </Typography>
              </Box>
              <Box className="!flex !justify-between">
                <Typography className="!text-sm !text-gray-600">
                  From:
                </Typography>
                <Typography className="!text-sm !font-medium">
                  {selectedEmail.from}
                </Typography>
              </Box>
              <Box className="!flex !justify-between">
                <Typography className="!text-sm !text-gray-600">
                  Date:
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
              {selectedEmail.body}
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
