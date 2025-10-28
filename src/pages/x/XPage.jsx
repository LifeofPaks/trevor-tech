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
  FiPhoneCall,
  FiPhoneIncoming,
  FiPhoneMissed,
  FiMail,
} from "react-icons/fi";
import { IoArrowBackCircle, IoLogoBitbucket } from "react-icons/io5";
import { FiTwitter } from "react-icons/fi";
import BindPhone from "../../components/demo/BindPhone";
import { RiTwitterXLine } from "react-icons/ri";

// X (Twitter) Light Mode Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#0f1419",
      light: "#4ab3f4",
      dark: "#1a8cd8",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f1419",
      secondary: "#536471",
    },
    divider: "#eff3f4",
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
          color: "#536471",
          "&.Mui-selected": {
            color: "#0f1419",
          },
        },
      },
    },
  },
});

// === X-Style DM Data ===
const chats = [
  {
    id: 1,
    handle: "@elonmusk",
    name: "Elon Musk",
    avatar: "https://i.pravatar.cc/150?img=68",
    lastMessage: "To the moon",
    time: "1m",
    messages: [
      { text: "GM X fam", time: "09:00", incoming: true },
      { text: "To the moon", time: "09:01", incoming: false },
    ],
  },
  {
    id: 2,
    handle: "@codinghorror",
    name: "Jeff Atwood",
    avatar: "https://i.pravatar.cc/150?img=56",
    lastMessage: "useState is king",
    time: "5m",
    messages: [
      { text: "React hooks > classes", time: "08:50", incoming: true },
      { text: "useState is king", time: "08:51", incoming: false },
    ],
  },
  {
    id: 3,
    handle: "@verge",
    name: "The Verge",
    avatar: "https://i.pravatar.cc/150?img=3",
    lastMessage: "Breaking: AI news",
    time: "30m",
    messages: [
      { text: "New Grok model dropped", time: "08:20", incoming: true },
      { text: "Breaking: AI news", time: "08:21", incoming: false },
    ],
  },
  {
    id: 4,
    handle: "@nasdaily",
    name: "Nas Daily",
    avatar: "https://i.pravatar.cc/150?img=24",
    lastMessage: "That's one minute",
    time: "2h",
    messages: [
      { text: "See you tomorrow!", time: "07:00", incoming: true },
      { text: "That's one minute", time: "07:01", incoming: false },
    ],
  },
  {
    id: 5,
    handle: "@techcrunch",
    name: "TechCrunch",
    avatar: "https://i.pravatar.cc/150?img=47",
    lastMessage: "Startup funding round",
    time: "4h",
    messages: [
      { text: "$100M Series B", time: "05:30", incoming: true },
      { text: "Startup funding round", time: "05:31", incoming: false },
    ],
  },
];

// === Followers (with @handle) ===
const followers = [
  {
    id: 1,
    handle: "@a16z",
    name: "a16z",
    avatar: "https://i.pravatar.cc/150?img=12",
    phone: "+1 555-1001",
    email: "a16z@x.com",
  },
  {
    id: 2,
    handle: "@balajis",
    name: "Balaji Srinivasan",
    avatar: "https://i.pravatar.cc/150?img=33",
    phone: "+1 555-1002",
    email: "balaji@x.com",
  },
  {
    id: 3,
    handle: "@cdixon",
    name: "Chris Dixon",
    avatar: "https://i.pravatar.cc/150?img=45",
    phone: "+1 555-1003",
    email: "chris@x.com",
  },
  {
    id: 4,
    handle: "@pmarca",
    name: "Marc Andreessen",
    avatar: "https://i.pravatar.cc/150?img=61",
    phone: "+1 555-1004",
    email: "marc@x.com",
  },
  {
    id: 5,
    handle: "@naval",
    name: "Naval Ravikant",
    avatar: "https://i.pravatar.cc/150?img=19",
    phone: "+1 555-1005",
    email: "naval@x.com",
  },
  {
    id: 6,
    handle: "@paulg",
    name: "Paul Graham",
    avatar: "https://i.pravatar.cc/150?img=52",
    phone: "+1 555-1006",
    email: "paul@x.com",
  },
  {
    id: 7,
    handle: "@sama",
    name: "Sam Altman",
    avatar: "https://i.pravatar.cc/150?img=28",
    phone: "+1 555-1007",
    email: "sam@x.com",
  },
  {
    id: 8,
    handle: "@jack",
    name: "Jack Dorsey",
    avatar: "https://i.pravatar.cc/150?img=39",
    phone: "+1 555-1008",
    email: "jack@x.com",
  },
  {
    id: 9,
    handle: "@vitalik",
    name: "Vitalik Buterin",
    avatar: "https://i.pravatar.cc/150?img=7",
    phone: "+1 555-1009",
    email: "vitalik@x.com",
  },
];

const callLogs = [
  {
    id: 1,
    handle: "@elonmusk",
    avatar: "https://i.pravatar.cc/150?img=68",
    type: "outgoing",
    time: "2025-10-28 14:00",
    duration: "15:30",
  },
  {
    id: 2,
    handle: "@codinghorror",
    avatar: "https://i.pravatar.cc/150?img=56",
    type: "incoming",
    time: "2025-10-28 11:20",
    duration: "08:45",
  },
  {
    id: 3,
    handle: "@verge",
    avatar: "https://i.pravatar.cc/150?img=3",
    type: "missed",
    time: "2025-10-28 09:15",
  },
  {
    id: 4,
    handle: "@nasdaily",
    avatar: "https://i.pravatar.cc/150?img=24",
    type: "outgoing",
    time: "2025-10-27 20:00",
    duration: "03:20",
  },
  {
    id: 5,
    handle: "@techcrunch",
    avatar: "https://i.pravatar.cc/150?img=47",
    type: "incoming",
    time: "2025-10-27 16:45",
    duration: "12:10",
  },
];

const XPage = () => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const [tab, setTab] = useState("chat");
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedFollower, setSelectedFollower] = useState(null);
  const [selectedCall, setSelectedCall] = useState(null);

  const handleBack = () => {
    setSelectedChat(null);
    setSelectedFollower(null);
    setSelectedCall(null);
  };

  const getCallIcon = (type) => {
    if (type === "outgoing")
      return <FiPhoneCall sx={{ fontSize: 16, color: "#10b981" }} />;
    if (type === "incoming")
      return <FiPhoneIncoming sx={{ fontSize: 16, color: "#10b981" }} />;
    return <FiPhoneMissed sx={{ fontSize: 16, color: "#ef4444" }} />;
  };

  const groupFollowersByLetter = () => {
    const grouped = {};
    followers.forEach((follower) => {
      const letter = follower.handle[1].toUpperCase(); // @a → A
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(follower);
    });
    return grouped;
  };

  const showDetail = selectedChat || selectedFollower || selectedCall;

  return (
    <ThemeProvider theme={theme}>
      <header className="!mb-4 sm:!mb-6 !px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
          <div className="flex items-center !gap-2 sm:!gap-3">
            <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
              <RiTwitterXLine className="" />
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
                  backgroundImage:
                    "linear-gradient(to right, #0f1419, #0f1419)",
                  height: 3,
                },
              }}
            >
              <Tab
                icon={<FiTwitter />}
                iconPosition="start"
                label={isMobile ? "" : "Messages"}
                value="chat"
              />
              <Tab
                icon={<FiUsers />}
                iconPosition="start"
                label={isMobile ? "" : "Followers"}
                value="followers"
              />
              <Tab
                icon={<FiPhone />}
                iconPosition="start"
                label={isMobile ? "" : "Call Log"}
                value="call-log"
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
              }}
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
                        "&:hover": { bgcolor: "#f7f9f9" },
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
                            {chat.handle}
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
                          sx={{ fontSize: "0.75rem", color: "#536471" }}
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
                        <Box sx={{ px: 2, py: 1, bgcolor: "#f7f9f9" }}>
                          <Typography
                            sx={{
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              color: "#536471",
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
                              "&:hover": { bgcolor: "#f7f9f9" },
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
                              <Box>
                                <Typography
                                  sx={{
                                    fontWeight: 600,
                                    color: "text.primary",
                                  }}
                                >
                                  {follower.handle}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "0.8125rem",
                                    color: "text.secondary",
                                  }}
                                >
                                  {follower.name}
                                </Typography>
                              </Box>
                            </Stack>
                          </Box>
                        ))}
                      </Box>
                    ))}
                </Stack>
              )}

              {/* Call Log */}
              {tab === "call-log" && (
                <Stack>
                  {callLogs.map((call) => {
                    const color =
                      call.type === "missed" ? "#ef4444" : "#10b981";
                    return (
                      <Box
                        key={call.id}
                        sx={{
                          p: 2,
                          cursor: "pointer",
                          "&:hover": { bgcolor: "#f7f9f9" },
                        }}
                        onClick={() => setSelectedCall(call)}
                      >
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Box sx={{ position: "relative" }}>
                            <Avatar
                              src={call.avatar}
                              sx={{ width: 56, height: 56 }}
                            />
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                bgcolor: "white",
                                borderRadius: "50%",
                                p: 0.3,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 0 0 2px white",
                              }}
                            >
                              {getCallIcon(call.type)}
                            </Box>
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              sx={{ fontWeight: 600, color: "text.primary" }}
                            >
                              {call.handle}
                            </Typography>
                            <Typography sx={{ fontSize: "0.875rem", color }}>
                              {call.type.charAt(0).toUpperCase() +
                                call.type.slice(1)}
                            </Typography>
                          </Box>
                          <Typography
                            sx={{ fontSize: "0.75rem", color: "#536471" }}
                          >
                            {call.time.split(" ")[1]}
                          </Typography>
                        </Stack>
                      </Box>
                    );
                  })}
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
                }}
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
                          {selectedChat.handle}
                        </Typography>
                        <Typography
                          sx={{ fontSize: "0.875rem", color: "text.secondary" }}
                        >
                          {selectedChat.name}
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
                              bgcolor: msg.incoming ? "#f0f2f5" : "#1d9bf0",
                              color: msg.incoming ? "#0f1419" : "#ffffff",
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
                                  ? "#536471"
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

                {/* Follower Detail */}
                {selectedFollower && (
                  <Stack spacing={4} alignItems="center">
                    <Avatar
                      src={selectedFollower.avatar}
                      sx={{ width: 140, height: 140 }}
                    />
                    <Box textAlign="center">
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, color: "text.primary" }}
                      >
                        {selectedFollower.handle}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          color: "text.secondary",
                          mt: 0.5,
                        }}
                      >
                        {selectedFollower.name}
                      </Typography>
                    </Box>

                    {selectedFollower.email && (
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: "#f7f9f9",
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
                            bgcolor: "#000",
                            borderRadius: "50%",
                            p: 1.2,
                            display: "flex",
                          }}
                        >
                          <RiTwitterXLine
                            style={{ color: "white", fontSize: 22 }}
                          />
                        </Box>
                        <Box sx={{ textAlign: "left" }}>
                          <Typography
                            sx={{ fontSize: "0.8125rem", color: "#536471" }}
                          >
                            Handle
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

                {/* Call Detail */}
                {selectedCall && (
                  <Stack spacing={4} alignItems="center">
                    <Avatar
                      src={selectedCall.avatar}
                      sx={{ width: 140, height: 140 }}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "text.primary" }}
                    >
                      {selectedCall.handle}
                    </Typography>
                    <Paper
                      elevation={0}
                      sx={{
                        bgcolor: "#f7f9f9",
                        borderRadius: 3,
                        p: 3,
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "1.125rem",
                          fontFamily: "monospace",
                          color: "text.primary",
                        }}
                      >
                        {selectedCall.time}
                      </Typography>
                      {selectedCall.duration && (
                        <Typography
                          sx={{
                            fontSize: "0.875rem",
                            color: "text.secondary",
                            mt: 1,
                          }}
                        >
                          {selectedCall.duration} • {selectedCall.type}
                        </Typography>
                      )}
                    </Paper>
                  </Stack>
                )}
              </Paper>
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default XPage;
