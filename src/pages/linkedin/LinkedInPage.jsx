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
import { RiLinkedinFill } from "react-icons/ri";
import BindPhone from "../../components/demo/BindPhone";

// LinkedIn Light Mode Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#0A66C2",
      light: "#3d8be0",
      dark: "#004182",
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
            color: "#0A66C2",
          },
        },
      },
    },
  },
});

// === Cheating Drama Chats (8 Total) ===
const chats = [
  {
    id: 1,
    name: "Emma Chen",
    avatar: "https://i.pravatar.cc/150?img=27", // young woman
    title: "UX Designer @ Figma",
    lastMessage: "I miss you already...",
    time: "2m",
    messages: [
      { text: "Last night was amazing", time: "00:15", incoming: true },
      {
        text: "I can't stop thinking about it",
        time: "00:16",
        incoming: false,
      },
      { text: "Same... wish you stayed longer", time: "00:18", incoming: true },
      { text: "I miss you already...", time: "00:20", incoming: false },
    ],
  },
  {
    id: 2,
    name: "Alex Rivera",
    avatar: "https://i.pravatar.cc/150?img=32", // young man
    title: "Frontend Engineer @ Stripe",
    lastMessage: "Delete this chat",
    time: "10m",
    messages: [
      {
        text: "You looked incredible in that dress",
        time: "22:30",
        incoming: true,
      },
      { text: "Stop, someone might see", time: "22:31", incoming: false },
      { text: "I don't care. I want you", time: "22:32", incoming: true },
      { text: "Delete this chat", time: "22:33", incoming: false },
    ],
  },
  {
    id: 3,
    name: "Sofia Patel",
    avatar: "https://i.pravatar.cc/150?img=25", // young woman
    title: "Product Manager @ Notion",
    lastMessage: "He's asleep",
    time: "1h",
    messages: [
      { text: "Can you talk?", time: "23:45", incoming: true },
      { text: "Yes, he's asleep", time: "23:46", incoming: false },
      { text: "I wish I was with you instead", time: "23:47", incoming: true },
      { text: "Same. This is torture", time: "23:48", incoming: false },
    ],
  },
  {
    id: 4,
    name: "Liam Brooks",
    avatar: "https://i.pravatar.cc/150?img=30", // young man
    title: "Data Analyst @ Google",
    lastMessage: "Send me a pic",
    time: "3h",
    messages: [
      { text: "What are you wearing?", time: "21:00", incoming: true },
      { text: "Nothing you haven't seen", time: "21:01", incoming: false },
      { text: "Send me a pic", time: "21:02", incoming: true },
      { text: "Deleting in 10...", time: "21:03", incoming: false },
    ],
  },
  {
    id: 5,
    name: "Maya Kim",
    avatar: "https://i.pravatar.cc/150?img=26", // young woman
    title: "Growth Marketer @ Canva",
    lastMessage: "I love you",
    time: "6h",
    messages: [
      { text: "I can't do this anymore", time: "02:10", incoming: true },
      { text: "Do what?", time: "02:11", incoming: false },
      { text: "Pretend I don't love you", time: "02:12", incoming: true },
      { text: "I love you", time: "02:13", incoming: false },
    ],
  },
  {
    id: 6,
    name: "Noah Kim",
    avatar: "https://i.pravatar.cc/150?img=31", // young man
    title: "Software Engineer @ Meta",
    lastMessage: "Hotel booked",
    time: "1d",
    messages: [
      { text: "Same hotel as last time?", time: "18:00", incoming: true },
      { text: "Yes. Room 512", time: "18:01", incoming: false },
      { text: "I'll be there at 8", time: "18:02", incoming: true },
      { text: "Hotel booked", time: "18:03", incoming: false },
    ],
  },
  {
    id: 7,
    name: "Isabella Wu",
    avatar: "https://i.pravatar.cc/150?img=28", // young woman
    title: "Product Designer @ Airbnb",
    lastMessage: "No one will know",
    time: "2d",
    messages: [
      { text: "We have to be more careful", time: "20:30", incoming: true },
      { text: "I know. But I can't stop", time: "20:31", incoming: false },
      { text: "Same. Just one more time", time: "20:32", incoming: true },
      { text: "No one will know", time: "20:33", incoming: false },
    ],
  },
  {
    id: 8,
    name: "Ethan Zhang",
    avatar: "https://i.pravatar.cc/150?img=33", // young man
    title: "ML Engineer @ OpenAI",
    lastMessage: "You're my secret",
    time: "3d",
    messages: [
      {
        text: "I told my girlfriend I was working late",
        time: "23:00",
        incoming: true,
      },
      { text: "I told my boyfriend the same", time: "23:01", incoming: false },
      { text: "This is so wrong", time: "23:02", incoming: true },
      {
        text: "But it feels so right. You're my secret",
        time: "23:03",
        incoming: false,
      },
    ],
  },
];

// === Connections (Same as before) ===
const connections = [
  {
    id: 1,
    name: "Noah Kim",
    avatar: "https://i.pravatar.cc/150?img=31",
    title: "Software Engineer @ Meta",
    email: "noah@meta.com",
  },
  {
    id: 2,
    name: "Isabella Wu",
    avatar: "https://i.pravatar.cc/150?img=28",
    title: "Product Designer @ Airbnb",
    email: "isabella@airbnb.com",
  },
  {
    id: 3,
    name: "Ethan Zhang",
    avatar: "https://i.pravatar.cc/150?img=33",
    title: "ML Engineer @ OpenAI",
    email: "ethan@openai.com",
  },
  {
    id: 4,
    name: "Zoe Park",
    avatar: "https://i.pravatar.cc/150?img=29",
    title: "Content Strategist @ TikTok",
    email: "zoe@tiktok.com",
  },
  {
    id: 5,
    name: "Carter Lee",
    avatar: "https://i.pravatar.cc/150?img=34",
    title: "DevOps @ AWS",
    email: "carter@amazon.com",
  },
  {
    id: 6,
    name: "Grace Liu",
    avatar: "https://i.pravatar.cc/150?img=23",
    title: "Brand Designer @ Adobe",
    email: "grace@adobe.com",
  },
  {
    id: 7,
    name: "Dylan Chen",
    avatar: "https://i.pravatar.cc/150?img=35",
    title: "Fullstack @ Shopify",
    email: "dylan@shopify.com",
  },
  {
    id: 8,
    name: "Ava Singh",
    avatar: "https://i.pravatar.cc/150?img=24",
    title: "UX Researcher @ Spotify",
    email: "ava@spotify.com",
  },
];

const LinkedInPage = () => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const [tab, setTab] = useState("chat");
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedConnection, setSelectedConnection] = useState(null);

  const handleBack = () => {
    setSelectedChat(null);
    setSelectedConnection(null);
  };

  const groupConnectionsByLetter = () => {
    const grouped = {};
    connections.forEach((conn) => {
      const letter = conn.name[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(conn);
    });
    return grouped;
  };

  const showDetail = selectedChat || selectedConnection;

  return (
    <ThemeProvider theme={theme}>
      <header className="!mb-4 sm:!mb-6 !px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
          <div className="flex items-center !gap-2 sm:!gap-3">
            <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
              LinkedIn
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
          {/* Tabs */}
          {!showDetail && (
            <Tabs
              value={tab}
              onChange={(e, v) => setTab(v)}
              sx={{
                mb: 3,
                "& .MuiTabs-indicator": {
                  background: "#0A66C2",
                  height: 3,
                },
              }}
            >
              <Tab
                icon={<RiLinkedinFill />}
                iconPosition="start"
                label={isMobile ? "" : "Messages"}
                value="chat"
              />
              <Tab
                icon={<FiUsers />}
                iconPosition="start"
                label={isMobile ? "" : "Connections"}
                value="connections"
              />
            </Tabs>
          )}

          {/* Back Button */}
          {showDetail && (
            <Box sx={{ mb: 2 }}>
              <IconButton onClick={handleBack} sx={{ color: "primary.main" }}>
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
                        "&:hover": { bgcolor: "#f8f9fa" },
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
                              fontSize: "0.8125rem",
                              color: "#0A66C2",
                              fontWeight: 500,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {chat.title}
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

              {/* Connections List */}
              {tab === "connections" && (
                <Stack
                  className="scrollbar-hide"
                  sx={{
                    maxHeight: "70vh",
                    overflowY: "auto",
                  }}
                >
                  {Object.keys(groupConnectionsByLetter())
                    .sort()
                    .map((letter) => (
                      <Box key={letter}>
                        <Box sx={{ px: 2, py: 1, bgcolor: "#f0f4f8" }}>
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
                        {groupConnectionsByLetter()[letter].map((conn) => (
                          <Box
                            key={conn.id}
                            sx={{
                              p: 2,
                              cursor: "pointer",
                              "&:hover": { bgcolor: "#f8f9fa" },
                            }}
                            onClick={() => setSelectedConnection(conn)}
                          >
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                            >
                              <Avatar
                                src={conn.avatar}
                                sx={{ width: 56, height: 56 }}
                              />
                              <Box sx={{ flex: 1 }}>
                                <Typography
                                  sx={{
                                    fontWeight: 600,
                                    color: "text.primary",
                                  }}
                                >
                                  {conn.name}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "0.8125rem",
                                    color: "#0A66C2",
                                    fontWeight: 500,
                                  }}
                                >
                                  {conn.title}
                                </Typography>
                              </Box>
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
                      <Box>
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: 700, color: "text.primary" }}
                        >
                          {selectedChat.name}
                        </Typography>
                        <Typography
                          sx={{ color: "#0A66C2", fontSize: "0.9375rem" }}
                        >
                          {selectedChat.title}
                        </Typography>
                      </Box>
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
                              bgcolor: msg.incoming ? "#f1f3f5" : "#0A66C2",
                              color: msg.incoming ? "#1c1c1c" : "#ffffff",
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
                                color: msg.incoming
                                  ? "#666"
                                  : "rgba(255,255,255,0.8)",
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

                {/* Connection Detail */}
                {selectedConnection && (
                  <Stack spacing={4} alignItems="center">
                    <Avatar
                      src={selectedConnection.avatar}
                      sx={{ width: 140, height: 140 }}
                    />
                    <Box textAlign="center">
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, color: "text.primary" }}
                      >
                        {selectedConnection.name}
                      </Typography>
                      <Typography
                        sx={{ color: "#0A66C2", fontSize: "1rem", mt: 1 }}
                      >
                        {selectedConnection.title}
                      </Typography>
                    </Box>

                    {selectedConnection.email && (
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: "#e7f0ff",
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
                            bgcolor: "#0A66C2",
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
                            {selectedConnection.email}
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

export default LinkedInPage;
