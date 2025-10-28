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
  useMediaQuery,
  useTheme,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import {
  FiMessageSquare,
  FiUsers,
  FiPhone,
  FiMail,
  FiUsers as FiMutualFriends,
} from "react-icons/fi";
import { IoArrowBackCircle, IoLogoBitbucket } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import BindPhone from "../../components/demo/BindPhone";

// Facebook Blue Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1877f2",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    background: {
      default: "#f0f2f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#1c1e21",
      secondary: "#606770",
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
          color: "#606770",
          "&.Mui-selected": {
            color: "#1877f2",
          },
        },
      },
    },
  },
});

// === Notifications Data ===
const notifications = [
  {
    id: 1,
    type: "birthday",
    message: "It's Sally's birthday today. Help her celebrate.",
    time: "2h ago",
  },
  {
    id: 2,
    type: "friend-suggestion",
    message:
      "You have new friend suggestions: Wiliany Mejia, Olga Moreno and 14 others.",
    time: "Jan 25",
  },
  {
    id: 3,
    type: "photo",
    message: "Shane added a new photo.",
    time: "Jan 28",
  },
  {
    id: 4,
    type: "link",
    message: "Terri shared a link.",
    time: "Jan 31",
  },
  {
    id: 5,
    type: "like",
    message: "Tom liked your post.",
    time: "Feb 8",
  },
  {
    id: 6,
    type: "video",
    message: "Sam added a new video.",
    time: "Feb 10",
  },
];

// === Friends List ===
const friends = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    mutual: 12,
    online: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://i.pravatar.cc/150?img=5",
    mutual: 8,
    online: false,
  },
  {
    id: 3,
    name: "Emma Wilson",
    avatar: "https://i.pravatar.cc/150?img=27",
    mutual: 23,
    online: true,
  },
  {
    id: 4,
    name: "David Martinez",
    avatar: "https://i.pravatar.cc/150?img=33",
    mutual: 5,
    online: false,
  },
  {
    id: 5,
    name: "Olivia Brown",
    avatar: "https://i.pravatar.cc/150?img=47",
    mutual: 31,
    online: true,
  },
  {
    id: 6,
    name: "James Lee",
    avatar: "https://i.pravatar.cc/150?img=52",
    mutual: 15,
    online: false,
  },
  {
    id: 7,
    name: "Sophia Garcia",
    avatar: "https://i.pravatar.cc/150?img=19",
    mutual: 9,
    online: true,
  },
  {
    id: 8,
    name: "William Davis",
    avatar: "https://i.pravatar.cc/150?img=39",
    mutual: 18,
    online: false,
  },
];

const FacebookPage = () => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const [tab, setTab] = useState("notifications");
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleBack = () => {
    setSelectedFriend(null);
  };

  const showDetail = selectedFriend;

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
          minHeight: "100vh",
          bgcolor: "background.default",
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
                "& .MuiTabs-indicator": {
                  bgcolor: "primary.main",
                  height: 3,
                },
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
                label={isMobile ? "" : "Friends"}
                value="friends"
              />
            </Tabs>
          )}

          {/* Back Button */}
          {showDetail && (
            <Box sx={{ mb: 2 }}>
              <IconButton onClick={handleBack} sx={{ color: "primary.main" }}>
                <IoArrowBackCircle className="!text-[28px]" />
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
                bgcolor: "background.paper",
                // Hide scrollbar
                "&::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              className="scrollbar-hide"
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
                    >
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="flex-start"
                      >
                        <Avatar
                          sx={{
                            bgcolor: "#1877f2",
                            width: 40,
                            height: 40,
                          }}
                        >
                          <FaFacebookF
                            style={{ color: "white", fontSize: 18 }}
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

              {/* Friends Tab */}
              {tab === "friends" && (
                <Stack>
                  {friends.map((friend) => (
                    <Box
                      key={friend.id}
                      sx={{
                        p: 2,
                        cursor: "pointer",
                        "&:hover": { bgcolor: "#f5f6f7" },
                      }}
                      onClick={() => setSelectedFriend(friend)}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{ position: "relative" }}>
                          <Avatar
                            src={friend.avatar}
                            sx={{ width: 60, height: 60 }}
                          />
                          {friend.online && (
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                width: 16,
                                height: 16,
                                bgcolor: "#31a24c",
                                border: "3px solid white",
                                borderRadius: "50%",
                              }}
                            />
                          )}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: "#1c1e21",
                              fontSize: "1rem",
                            }}
                          >
                            {friend.name}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.8125rem",
                              color: "#606770",
                            }}
                          >
                            <FiMutualFriends
                              style={{
                                display: "inline",
                                marginRight: 4,
                                fontSize: 14,
                              }}
                            />
                            {friend.mutual} mutual friends
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              )}
            </Paper>

            {/* Right Panel: Friend Detail */}
            {showDetail && selectedFriend && (
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  p: { xs: 3, md: 4 },
                  height: "fit-content",
                  bgcolor: "background.paper",
                }}
              >
                <Stack spacing={3}>
                  {/* Profile Header */}
                  <Box>
                    <Box
                      sx={{
                        height: 180,
                        bgcolor: "#e4e6eb",
                        borderRadius: 2,
                        mb: -6,
                        position: "relative",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: -60,
                          left: "50%",
                          transform: "translateX(-50%)",
                        }}
                      >
                        <Avatar
                          src={selectedFriend.avatar}
                          sx={{
                            width: 168,
                            height: 168,
                            border: "5px solid white",
                          }}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: "center", mt: 10 }}>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          color: "#1c1e21",
                          fontSize: "1.75rem",
                        }}
                      >
                        {selectedFriend.name}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#606770",
                          fontSize: "1rem",
                          mt: 0.5,
                        }}
                      >
                        <FiMutualFriends
                          style={{ display: "inline", marginRight: 6 }}
                        />
                        {selectedFriend.mutual} mutual friends
                      </Typography>
                    </Box>
                  </Box>

                  {/* Action Button: Only Message */}
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Paper
                      elevation={0}
                      sx={{
                        bgcolor: "#f0f2f5",
                        borderRadius: 2,
                        px: 3,
                        py: 1.5,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        cursor: "pointer",
                        "&:hover": { bgcolor: "#e4e6eb" },
                      }}
                    >
                      <FiMessageSquare style={{ color: "#606770" }} />
                      <Typography sx={{ color: "#1c1e21", fontWeight: 600 }}>
                        Message
                      </Typography>
                    </Paper>
                  </Box>

                  {/* Contact Info */}
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: "#1c1e21",
                        mb: 2,
                        fontSize: "1.1rem",
                      }}
                    >
                      Contact Info
                    </Typography>

                    <Paper
                      elevation={0}
                      sx={{
                        bgcolor: "#f0f2f5",
                        borderRadius: 2,
                        p: 2.5,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 2,
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
                        <FiPhone style={{ color: "white", fontSize: 20 }} />
                      </Box>
                      <Box>
                        <Typography
                          sx={{ fontSize: "0.8125rem", color: "#606770" }}
                        >
                          Mobile
                        </Typography>
                        <Typography sx={{ fontWeight: 600, color: "#1c1e21" }}>
                          +1 555-0123
                        </Typography>
                      </Box>
                    </Paper>

                    <Paper
                      elevation={0}
                      sx={{
                        bgcolor: "#f0f2f5",
                        borderRadius: 2,
                        p: 2.5,
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
                        <FiMail style={{ color: "white", fontSize: 20 }} />
                      </Box>
                      <Box>
                        <Typography
                          sx={{ fontSize: "0.8125rem", color: "#606770" }}
                        >
                          Email
                        </Typography>
                        <Typography sx={{ fontWeight: 600, color: "#1c1e21" }}>
                          {selectedFriend.name.toLowerCase().replace(" ", ".")}
                          @example.com
                        </Typography>
                      </Box>
                    </Paper>
                  </Box>
                </Stack>
              </Paper>
            )}
          </Box>
        </Box>
      </Box>

      {/* CSS to hide scrollbar globally for .scrollbar-hide */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </ThemeProvider>
  );
};

export default FacebookPage;
