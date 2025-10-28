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
import { FiMessageSquare, FiUsers, FiMail } from "react-icons/fi";
import { IoArrowBackCircle, IoLogoBitbucket } from "react-icons/io5";
import { RiSnapchatFill } from "react-icons/ri";
import BindPhone from "../../components/demo/BindPhone";

// Snapchat Light Mode Theme – Darker Yellow
const theme = createTheme({
  palette: {
    primary: {
      main: "#fffc00",
      light: "#ffff52",
      dark: "#c7cc00",
    },
    secondary: {
      main: "#000000",
      light: "#333333",
      dark: "#000000",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#1c1c1c",
      secondary: "#666666",
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
          color: "#666666",
          "&.Mui-selected": {
            color: "#000000",
          },
        },
      },
    },
  },
});

// === Younger, Mixed-Gender Profiles (50/50) ===
const chats = [
  {
    id: 1,
    name: "lily.rosee",
    avatar: "https://i.pravatar.cc/150?img=27", // young woman
    lastMessage: "streaks?",
    time: "1m",
    messages: [
      { text: "don't break the streak", time: "14:10", incoming: true },
      { text: "streaks?", time: "14:11", incoming: false },
    ],
  },
  {
    id: 2,
    name: "jake.surf",
    avatar: "https://i.pravatar.cc/150?img=32", // young man
    lastMessage: "beach day",
    time: "5m",
    messages: [
      { text: "you coming?", time: "13:45", incoming: true },
      { text: "beach day", time: "13:46", incoming: false },
    ],
  },
  {
    id: 3,
    name: "mia.vibes",
    avatar: "https://i.pravatar.cc/150?img=25", // young woman
    lastMessage: "new fit check",
    time: "1h",
    messages: [
      { text: "rate my outfit", time: "12:30", incoming: true },
      { text: "new fit check", time: "12:31", incoming: false },
    ],
  },
  {
    id: 4,
    name: "ethan.music",
    avatar: "https://i.pravatar.cc/150?img=30", // young man
    lastMessage: "new drop",
    time: "3h",
    messages: [
      { text: "u heard my beat?", time: "10:00", incoming: true },
      { text: "new drop", time: "10:01", incoming: false },
    ],
  },
  {
    id: 5,
    name: "sophia.art",
    avatar: "https://i.pravatar.cc/150?img=26", // young woman
    lastMessage: "sketch reveal",
    time: "6h",
    messages: [
      { text: "guess who", time: "08:20", incoming: true },
      { text: "sketch reveal", time: "08:21", incoming: false },
    ],
  },
];

// === Followers (Young, Mixed) ===
const followers = [
  {
    id: 1,
    name: "ava.dance",
    avatar: "https://i.pravatar.cc/150?img=24",
    phone: "+1 555-4001",
    email: "ava@snap.com",
  },
  {
    id: 2,
    name: "noah.beck",
    avatar: "https://i.pravatar.cc/150?img=31",
    phone: "+1 555-4002",
    email: "noah@snap.com",
  },
  {
    id: 3,
    name: "ella.fit",
    avatar: "https://i.pravatar.cc/150?img=28",
    phone: "+1 555-4003",
    email: "ella@snap.com",
  },
  {
    id: 4,
    name: "liam.guitar",
    avatar: "https://i.pravatar.cc/150?img=33",
    phone: "+1 555-4004",
    email: "liam@snap.com",
  },
  {
    id: 5,
    name: "zoe.style",
    avatar: "https://i.pravatar.cc/150?img=29",
    phone: "+1 555-4005",
    email: "zoe@snap.com",
  },
  {
    id: 6,
    name: "carter.skate",
    avatar: "https://i.pravatar.cc/150?img=34",
    phone: "+1 555-4006",
    email: "carter@snap.com",
  },
  {
    id: 7,
    name: "grace.photo",
    avatar: "https://i.pravatar.cc/150?img=23",
    phone: "+1 555-4007",
    email: "grace@snap.com",
  },
  {
    id: 8,
    name: "dylan.vlog",
    avatar: "https://i.pravatar.cc/150?img=35",
    phone: "+1 555-4008",
    email: "dylan@snap.com",
  },
];

const SnapchatPage = () => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const [tab, setTab] = useState("chat");
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedFollower, setSelectedFollower] = useState(null);

  const handleBack = () => {
    setSelectedChat(null);
    setSelectedFollower(null);
  };

  const groupFollowersByLetter = () => {
    const grouped = {};
    followers.forEach((follower) => {
      const letter = follower.name[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(follower);
    });
    return grouped;
  };

  const showDetail = selectedChat || selectedFollower;

  return (
    <ThemeProvider theme={theme}>
      <header className="!mb-4 sm:!mb-6 !px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
          <div className="flex items-center !gap-2 sm:!gap-3">
            <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
              Snapchat
              <IoLogoBitbucket className="text-[#0695c8] rotate-[180deg]" />
            </h1>
          </div>
          <BindPhone />
        </div>
      </header>

      <Box
        sx={{
          bgcolor: "background.default",
          p: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box sx={{ maxWidth: 1400, mx: "auto" }}>
          {/* Tabs – Only Chat & Followers */}
          {!showDetail && (
            <Tabs
              value={tab}
              onChange={(e, v) => setTab(v)}
              sx={{
                mb: 3,
                "& .MuiTabs-indicator": {
                  background: "#ffd600", // Darker yellow
                  height: 3,
                },
              }}
            >
              <Tab
                icon={<RiSnapchatFill />}
                iconPosition="start"
                label={isMobile ? "" : "Chat"}
                value="chat"
              />
              <Tab
                icon={<FiUsers />}
                iconPosition="start"
                label={isMobile ? "" : "Followers"}
                value="followers"
              />
            </Tabs>
          )}

          {/* Back Button */}
          {showDetail && (
            <Box sx={{ mb: 2 }}>
              <IconButton onClick={handleBack} sx={{ color: "secondary.main" }}>
                <IoArrowBackCircle className="!text-[25px]" />
              </IconButton>
            </Box>
          )}

          {/* Content Grid */}
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
            {/* Left Panel: Lists */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                display: showDetail && isMobile ? "none" : "block",
                height: "100%",
                maxHeight: "80vh",
                overflowY: "auto",
                bgcolor: "background.paper",
                "&::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              className="scrollbar-hide"
            >
              {/* Chat List */}
              {tab === "chat" && (
                <Stack>
                  {chats.map((chat) => (
                    <Box
                      key={chat.id}
                      sx={{
                        p: 2,
                        cursor: "pointer",
                        "&:hover": { bgcolor: "#f7f7f7" },
                      }}
                      onClick={() => setSelectedChat(chat)}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          src={chat.avatar}
                          sx={{ width: 56, height: 56 }}
                        />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            sx={{ fontWeight: 600, color: "text.primary" }}
                          >
                            {chat.name}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.875rem",
                              color: "text.secondary",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {chat.lastMessage}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{ fontSize: "0.75rem", color: "#666666" }}
                        >
                          {chat.time}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              )}

              {/* Followers List */}
              {tab === "followers" && (
                <Stack
                  className="scrollbar-hide"
                  sx={{
                    maxHeight: "70vh",
                    overflowY: "auto",
                  }}
                >
                  {Object.keys(groupFollowersByLetter())
                    .sort()
                    .map((letter) => (
                      <Box key={letter}>
                        <Box sx={{ px: 2, py: 1, bgcolor: "#f0f0f0" }}>
                          <Typography
                            sx={{
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              color: "#666666",
                            }}
                          >
                            {letter}
                          </Typography>
                        </Box>
                        {groupFollowersByLetter()[letter].map((follower) => (
                          <Box
                            key={follower.id}
                            sx={{
                              p: 2,
                              cursor: "pointer",
                              "&:hover": { bgcolor: "#f7f7f7" },
                            }}
                            onClick={() => setSelectedFollower(follower)}
                          >
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                            >
                              <Avatar
                                src={follower.avatar}
                                sx={{ width: 56, height: 56 }}
                              />
                              <Typography
                                sx={{ fontWeight: 500, color: "text.primary" }}
                              >
                                {follower.name}
                              </Typography>
                            </Stack>
                          </Box>
                        ))}
                      </Box>
                    ))}
                </Stack>
              )}
            </Paper>

            {/* Right Panel: Details */}
            {showDetail && (
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  p: 4,
                  height: "100%",
                  maxHeight: "80vh",
                  overflowY: "auto",
                  bgcolor: "background.paper",
                  "&::-webkit-scrollbar": { display: "none" },
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
                className="scrollbar-hide"
              >
                {/* Chat Detail */}
                {selectedChat && (
                  <Stack spacing={3}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        src={selectedChat.avatar}
                        sx={{ width: 72, height: 72 }}
                      />
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, color: "text.primary" }}
                      >
                        {selectedChat.name}
                      </Typography>
                    </Stack>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                      {selectedChat.messages.map((msg, i) => (
                        <Box
                          key={i}
                          sx={{
                            display: "flex",
                            justifyContent: msg.incoming
                              ? "flex-start"
                              : "flex-end",
                          }}
                        >
                          <Box
                            sx={{
                              maxWidth: "75%",
                              bgcolor: msg.incoming ? "#f0f0f0" : "#fffc00",
                              color: "#000",
                              borderRadius: "18px",
                              px: 3,
                              py: 1.5,
                              borderBottomLeftRadius: msg.incoming ? 4 : "18px",
                              borderBottomRightRadius: msg.incoming
                                ? "18px"
                                : 4,
                            }}
                          >
                            <Typography sx={{ fontSize: "0.9375rem" }}>
                              {msg.text}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "0.75rem",
                                mt: 0.5,
                                color: "#666",
                                opacity: 0.8,
                              }}
                            >
                              {msg.time}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </Stack>
                )}

                {/* Follower Detail */}
                {selectedFollower && (
                  <Stack spacing={4} alignItems="center">
                    <Avatar
                      src={selectedFollower.avatar}
                      sx={{ width: 140, height: 140 }}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "text.primary" }}
                    >
                      {selectedFollower.name}
                    </Typography>

                    {selectedFollower.phone && (
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: "#fff9c4",
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
                            bgcolor: "#fffc00",
                            borderRadius: "50%",
                            p: 1.2,
                            display: "flex",
                          }}
                        >
                          <FiMail style={{ color: "black", fontSize: 22 }} />
                        </Box>
                        <Box sx={{ textAlign: "left" }}>
                          <Typography
                            sx={{ fontSize: "0.8125rem", color: "#666666" }}
                          >
                            Phone
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 600, color: "text.primary" }}
                          >
                            {selectedFollower.phone}
                          </Typography>
                        </Box>
                      </Paper>
                    )}

                    {selectedFollower.email && (
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: "#f0f4ff",
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
                            bgcolor: "#000000",
                            borderRadius: "50%",
                            p: 1.2,
                            display: "flex",
                          }}
                        >
                          <FiMail style={{ color: "white", fontSize: 22 }} />
                        </Box>
                        <Box sx={{ textAlign: "left" }}>
                          <Typography
                            sx={{ fontSize: "0.8125rem", color: "#666666" }}
                          >
                            Email
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 600, color: "text.primary" }}
                          >
                            {selectedFollower.email}
                          </Typography>
                        </Box>
                      </Paper>
                    )}
                  </Stack>
                )}
              </Paper>
            )}
          </Box>
        </Box>
      </Box>

      {/* Hide Scrollbar */}
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

export default SnapchatPage;
