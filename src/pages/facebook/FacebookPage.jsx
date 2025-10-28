import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Stack,
  Avatar,
  Paper,
  IconButton,
  Divider,
  useMediaQuery,
  useTheme,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import {
  FiMessageSquare,
  FiUsers,
  FiPhone,
  FiArrowLeft,
  FiPhoneCall,
  FiPhoneIncoming,
  FiPhoneMissed,
  FiMail,
} from "react-icons/fi";
import { IoArrowBackCircle, IoLogoBitbucket } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import BindPhone from "../../components/demo/BindPhone";

// Custom Facebook Blue Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1877f2",
      light: "#0695c8",
      dark: "#1877f2",
    },
    background: {
      default: "#f0f2f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          fontSize: "0.9375rem",
        },
      },
    },
  },
});

// Sample Data: Notifications (from screenshot)
const notifications = [
  {
    id: 1,
    type: "birthday",
    message: "It's Sally's birthday today. Help her celebrate.",
    time: "2022-02-16 14:34",
    icon: "birthday",
  },
  {
    id: 2,
    type: "friend-suggestion",
    message:
      "You have new friend suggestions: Wiliany Mejia, Olga Moreno and 14 others.",
    time: "2022-01-25 10:04",
  },
  {
    id: 3,
    type: "photo",
    message: "Shane added a new photo.",
    time: "2022-01-28 11:35",
  },
  {
    id: 4,
    type: "link",
    message: "Terri shared a link.",
    time: "2022-01-31 01:08",
  },
  {
    id: 5,
    type: "like",
    message: "Tom liked your post.",
    time: "2022-02-08 09:09",
  },
  {
    id: 6,
    type: "video",
    message: "Sam added a new video.",
    time: "2022-02-10 11:07",
  },
  {
    id: 7,
    type: "birthday",
    message: "It's Sally's birthday today. Help her celebrate.",
    time: "2022-02-16 14:34",
  },
];

// Sample Contacts (for detail view)
const contacts = [
  {
    id: 1,
    name: "Facebook",
    avatar: "",
    phone: "",
    email: "",
  },
];

const FacebookPage = () => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const [tab, setTab] = useState("notifications");
  const [selectedContact, setSelectedContact] = useState(null);

  const handleBack = () => {
    setSelectedContact(null);
  };

  const showDetail = selectedContact;

  return (
    <ThemeProvider theme={theme}>
      <header className="!mb-4 sm:!mb-6 !px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
          <div className="flex items-center !gap-2 sm:!gap-3">
            <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
Facebook
              <IoLogoBitbucket className="text-[#0695c8] rotate-[180deg]" />
            </h1>
          </div>
          <BindPhone />
        </div>
      </header>

      <Box
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box sx={{ maxWidth: 1400, mx: "auto" }}>
          {/* Tabs */}
          {!showDetail && (
            <Tabs
              value={tab}
              onChange={(e, v) => setTab(v)}
              sx={{
                mb: 3,
                "& .MuiTabs-indicator": { bgcolor: "primary.main", height: 3 },
              }}
            >
              <Tab
                icon={<FiMessageSquare />}
                iconPosition="start"
                label={isMobile ? "" : "Notifications"}
                value="notifications"
              />
              <Tab
                icon={<FiUsers />}
                iconPosition="start"
                label={isMobile ? "" : "Contacts"}
                value="contacts"
              />
            </Tabs>
          )}

          {/* Back Button */}
          {showDetail && (
            <Box sx={{ mb: 2 }}>
              <IconButton onClick={handleBack} sx={{ color: "primary.main" }}>
                <IoArrowBackCircle fontSize={28} />
              </IconButton>
            </Box>
          )}

          {/* Main Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                lg: showDetail ? "1fr 1fr" : "1fr",
              },
              gap: 3,
            }}
          >
            {/* Left Panel: List */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                display: showDetail && isMobile ? "none" : "block",
                height: "fit-content",
                maxHeight: "80vh",
                overflowY: "auto",
              }}
            >
              {/* Notifications Tab */}
              {tab === "notifications" && (
                <Stack>
                  {notifications.map((notif) => (
                    <Box
                      key={notif.id}
                      sx={{
                        p: 2,
                        cursor: "pointer",
                        "&:hover": { bgcolor: "#f5f6f7" },
                      }}
                      onClick={() => setSelectedContact(contacts[0])}
                    >
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="flex-start"
                      >
                        <Avatar
                          sx={{
                            bgcolor: "primary.dark",
                            width: 30,
                            height: 30,
                          }}
                        >
                          <FaFacebookF
                            style={{ color: "white", fontSize: 15 }}
                          />
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            sx={{
                              fontSize: "0.9375rem",
                              color: "#1c1e21",
                              lineHeight: 1.4,
                            }}
                          >
                            {notif.message}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.75rem",
                              color: "#606770",
                              mt: 0.5,
                            }}
                          >
                            {notif.time}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              )}

              {/* Contacts Tab - Placeholder */}
              {tab === "contacts" && (
                <Box sx={{ p: 3, textAlign: "center", color: "#606770" }}>
                  <Typography>No contacts to display</Typography>
                </Box>
              )}
            </Paper>

            {/* Right Panel: Contact Detail */}
            {showDetail && (
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  p: { xs: 3, md: 5 },
                  height: "fit-content",
                  textAlign: "center",
                }}
              >
                <Stack spacing={4} alignItems="center">
                  {/* Facebook Logo */}
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      bgcolor: "primary.dark",
                    }}
                  >
                    <FaFacebookF style={{ fontSize: 50, color: "white" }} />
                  </Avatar>

                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: "#1c1e21" }}
                  >
                    Facebook
                  </Typography>

                  {/* Number Card */}
                  <Paper
                    elevation={0}
                    sx={{
                      bgcolor: "#e6f3ff",
                      borderRadius: 3,
                      p: 2.5,
                      width: "100%",
                      maxWidth: 360,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "#42a5f5",
                        borderRadius: "50%",
                        p: 1.2,
                        display: "flex",
                      }}
                    >
                      <FiPhone style={{ color: "white", fontSize: 22 }} />
                    </Box>
                    <Box sx={{ textAlign: "left" }}>
                      <Typography
                        sx={{ fontSize: "0.8125rem", color: "#606770" }}
                      >
                        Number
                      </Typography>
                      <Typography sx={{ fontWeight: 600, color: "#1c1e21" }}>
                        —
                      </Typography>
                    </Box>
                  </Paper>

                  {/* Email Card */}
                  <Paper
                    elevation={0}
                    sx={{
                      bgcolor: "#e3f2fd",
                      borderRadius: 3,
                      p: 2.5,
                      width: "100%",
                      maxWidth: 360,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "#1877f2",
                        borderRadius: "50%",
                        p: 1.2,
                        display: "flex",
                      }}
                    >
                      <FiMail style={{ color: "white", fontSize: 22 }} />
                    </Box>
                    <Box sx={{ textAlign: "left" }}>
                      <Typography
                        sx={{ fontSize: "0.8125rem", color: "#606770" }}
                      >
                        Email
                      </Typography>
                      <Typography sx={{ fontWeight: 600, color: "#1c1e21" }}>
                        —
                      </Typography>
                    </Box>
                  </Paper>
                </Stack>
              </Paper>
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default FacebookPage;
