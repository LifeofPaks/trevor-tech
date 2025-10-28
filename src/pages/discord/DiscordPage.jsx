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
  FiPhoneCall,
  FiPhoneIncoming,
  FiPhoneMissed,
  FiMail,
} from "react-icons/fi";
import { IoArrowBackCircle } from "react-icons/io5";
import BindPhone from "../../components/demo/BindPhone";
import { RiCheckDoubleFill } from "react-icons/ri";
import { SiDiscord } from "react-icons/si";

// Discord Light Mode Theme (Blurple)
const theme = createTheme({
  palette: {
    primary: {
      main: "#5865F2", // Discord Blurple
      light: "#738ADB",
      dark: "#4752C4",
    },
    secondary: {
      main: "#F2F3F5",
      light: "#FFFFFF",
      dark: "#E3E5E8",
    },
    success: { main: "#10B981" }, // incoming
    error: { main: "#EF4444" }, // missed
    info: { main: "#0B5CFF" }, // outgoing
    grey: { 700: "#374151" },
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
          color: "#6B7280",
          "&.Mui-selected": {
            color: "#5865F2",
          },
        },
      },
    },
  },
});

// === Cheating Drama DMs (12 Total) – Young Men Only ===
const chats = [
  {
    id: 1,
    name: "Luka Voss",
    avatar: "https://i.pravatar.cc/150?img=28",
    lastMessage: "I left my hoodie at your place",
    time: "03:15",
    status: "online",
    messages: [
      { text: "you still up?", time: "03:00", incoming: true },
      { text: "yeah. can't sleep", time: "03:01", incoming: false },
      {
        text: "I left my hoodie at your place",
        time: "03:15",
        incoming: false,
      },
    ],
  },
  {
    id: 2,
    name: "Cade Wilder",
    avatar: "https://i.pravatar.cc/150?img=29",
    lastMessage: "she didn't see the notifs",
    time: "02:30",
    status: "idle",
    messages: [
      { text: "that was too close", time: "02:15", incoming: true },
      { text: "but we're good", time: "02:16", incoming: false },
      { text: "she didn't see the notifs", time: "02:30", incoming: false },
    ],
  },
  {
    id: 3,
    name: "Jace Holt",
    avatar: "https://i.pravatar.cc/150?img=30",
    lastMessage: "send the clip again",
    time: "01:45",
    status: "online",
    messages: [
      { text: "you deleted it?", time: "01:30", incoming: true },
      { text: "had to. too risky", time: "01:31", incoming: false },
      { text: "send the clip again", time: "01:45", incoming: false },
    ],
  },
  {
    id: 4,
    name: "Knox Reed",
    avatar: "https://i.pravatar.cc/150?img=31",
    lastMessage: "i'm in your room rn",
    time: "00:50",
    status: "dnd",
    messages: [
      { text: "you home?", time: "00:35", incoming: true },
      { text: "she's out. door's open", time: "00:36", incoming: false },
      { text: "i'm in your room rn", time: "00:50", incoming: false },
    ],
  },
  {
    id: 5,
    name: "Ryder Kane",
    avatar: "https://i.pravatar.cc/150?img=32",
    lastMessage: "i'm addicted to you",
    time: "04:20",
    status: "online",
    messages: [
      {
        text: "i can't stop thinking about you",
        time: "04:05",
        incoming: true,
      },
      { text: "same. every second", time: "04:06", incoming: false },
      { text: "i'm addicted to you", time: "04:20", incoming: false },
    ],
  },
  {
    id: 6,
    name: "Zeke Ford",
    avatar: "https://i.pravatar.cc/150?img=33",
    lastMessage: "told her i was gaming",
    time: "22:55",
    status: "idle",
    messages: [
      { text: "where are you?", time: "22:35", incoming: true },
      { text: "gaming. late session", time: "22:36", incoming: false },
      { text: "liar", time: "22:37", incoming: true },
      { text: "told her i was gaming", time: "22:55", incoming: false },
    ],
  },
  {
    id: 7,
    name: "Milo Grey",
    avatar: "https://i.pravatar.cc/150?img=34",
    lastMessage: "this is getting dangerous",
    time: "21:10",
    status: "online",
    messages: [
      { text: "we said last time was the last", time: "20:55", incoming: true },
      { text: "i know", time: "20:56", incoming: false },
      { text: "then why am i here?", time: "20:57", incoming: true },
      { text: "this is getting dangerous", time: "21:10", incoming: false },
    ],
  },
  {
    id: 8,
    name: "Asher Dean",
    avatar: "https://i.pravatar.cc/150?img=35",
    lastMessage: "i dream about you every night",
    time: "05:30",
    status: "idle",
    messages: [
      { text: "you sleeping?", time: "05:15", incoming: true },
      { text: "no. you?", time: "05:16", incoming: false },
      { text: "thinking of you", time: "05:17", incoming: true },
      { text: "i dream about you every night", time: "05:30", incoming: false },
    ],
  },
  {
    id: 9,
    name: "Beck Hale",
    avatar: "https://i.pravatar.cc/150?img=36",
    lastMessage: "delete after reading",
    time: "02:40",
    status: "dnd",
    messages: [
      {
        text: "i can't stop replaying last night",
        time: "02:25",
        incoming: true,
      },
      { text: "that thing you did...", time: "02:26", incoming: false },
      { text: "shh. don't type it", time: "02:27", incoming: true },
      { text: "delete after reading", time: "02:40", incoming: false },
    ],
  },
  {
    id: 10,
    name: "Tate Moss",
    avatar: "https://i.pravatar.cc/150?img=37",
    lastMessage: "i'm falling for you",
    time: "01:55",
    status: "online",
    messages: [
      { text: "this is getting serious", time: "01:40", incoming: true },
      { text: "i know", time: "01:41", incoming: false },
      { text: "but i don't want to stop", time: "01:42", incoming: true },
      { text: "i'm falling for you", time: "01:55", incoming: false },
    ],
  },
  {
    id: 11,
    name: "Rhys Vale",
    avatar: "https://i.pravatar.cc/150?img=38",
    lastMessage: "your scent is on my pillow",
    time: "06:45",
    status: "idle",
    messages: [
      { text: "i can still smell you", time: "06:25", incoming: true },
      { text: "good", time: "06:26", incoming: false },
      { text: "your scent is on my pillow", time: "06:45", incoming: false },
    ],
  },
  {
    id: 12,
    name: "Dax Noir",
    avatar: "https://i.pravatar.cc/150?img=39",
    lastMessage: "i lied to her for you",
    time: "23:20",
    status: "dnd",
    messages: [
      { text: "she asked where i was", time: "23:05", incoming: true },
      { text: "what'd you say?", time: "23:06", incoming: false },
      { text: "with you", time: "23:07", incoming: true },
      { text: "i lied to her for you", time: "23:20", incoming: false },
    ],
  },
];

// === Friends (Discord uses "Friends") ===
const friends = [
  ...chats.map((c) => ({
    id: c.id,
    name: c.name,
    avatar: c.avatar,
    status: c.status,
    tag: `#${String(1000 + c.id).padStart(4, "0")}`,
  })),
];

// === Call Logs ===
const callLogs = [
  {
    id: 1,
    name: "Luka Voss",
    avatar: "https://i.pravatar.cc/150?img=28",
    type: "outgoing",
    time: "2025-10-28 23:55",
    duration: "22:15",
  },
  {
    id: 2,
    name: "Cade Wilder",
    avatar: "https://i.pravatar.cc/150?img=29",
    type: "incoming",
    time: "2025-10-28 22:40",
    duration: "16:30",
  },
  {
    id: 3,
    name: "Jace Holt",
    avatar: "https://i.pravatar.cc/150?img=30",
    type: "missed",
    time: "2025-10-28 21:20",
  },
  {
    id: 4,
    name: "Knox Reed",
    avatar: "https://i.pravatar.cc/150?img=31",
    type: "outgoing",
    time: "2025-10-27 20:55",
    duration: "41:20",
  },
  {
    id: 5,
    name: "Ryder Kane",
    avatar: "https://i.pravatar.cc/150?img=32",
    type: "incoming",
    time: "2025-10-27 19:30",
    duration: "33:10",
  },
  {
    id: 6,
    name: "Rhys Vale",
    avatar: "https://i.pravatar.cc/150?img=38",
    type: "missed",
    time: "2025-10-27 18:00",
  },
];

const DiscordPage = () => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const [tab, setTab] = useState("chat");
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [selectedCall, setSelectedCall] = useState(null);

  const handleBack = () => {
    setSelectedChat(null);
    setSelectedFriend(null);
    setSelectedCall(null);
  };

  const getCallIcon = (type) => {
    const iconColor =
      type === "incoming"
        ? "#10B981"
        : type === "outgoing"
        ? "#0B5CFF"
        : "#EF4444";
    return (
      <Box sx={{ color: iconColor }}>
        {type === "outgoing" && <FiPhoneCall style={{ fontSize: 16 }} />}
        {type === "incoming" && <FiPhoneIncoming style={{ fontSize: 16 }} />}
        {type === "missed" && <FiPhoneMissed style={{ fontSize: 16 }} />}
      </Box>
    );
  };

  const getStatusDot = (status) => {
    const color =
      status === "online"
        ? "#3BA55C"
        : status === "idle"
        ? "#FAA61A"
        : status === "dnd"
        ? "#ED4245"
        : "#747F8D";
    return (
      <Box
        sx={{
          width: 10,
          height: 10,
          bgcolor: color,
          borderRadius: "50%",
          border: "2px solid #F2F3F5",
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
      />
    );
  };

  const groupFriendsByLetter = () => {
    const grouped = {};
    friends.forEach((f) => {
      const letter = f.name[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(f);
    });
    return grouped;
  };

  const showDetail = selectedChat || selectedFriend || selectedCall;

  return (
    <ThemeProvider theme={theme}>
      <header className="!mb-4 sm:!mb-6 !px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
          <div className="flex items-center !gap-2 sm:!gap-3">
            <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
              Discord
              <SiDiscord className="text-[#5865F2]" />
            </h1>
          </div>
          <BindPhone />
        </div>
      </header>

      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#F2F3F5",
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
                icon={<SiDiscord />}
                iconPosition="start"
                label={isMobile ? "" : "DMs"}
                value="chat"
              />
              <Tab
                icon={<FiUsers />}
                iconPosition="start"
                label={isMobile ? "" : "Friends"}
                value="friends"
              />
              <Tab
                icon={<FiPhone />}
                iconPosition="start"
                label={isMobile ? "" : "Calls"}
                value="calls"
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
                borderRadius: 4,
                overflow: "hidden",
                display: showDetail && isMobile ? "none" : "block",
                height: "100%",
                maxHeight: "80vh",
                overflowY: "auto",
                bgcolor: "#FFFFFF",
                "&::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
              }}
              className="scrollbar-hide"
            >
              {/* DM List */}
              {tab === "chat" && (
                <Stack>
                  {chats.map((chat) => (
                    <Box
                      key={chat.id}
                      sx={{
                        p: 2,
                        cursor: "pointer",
                        "&:hover": { bgcolor: "#F2F3F5" },
                        transition: "background 0.2s",
                      }}
                      onClick={() => setSelectedChat(chat)}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{ position: "relative" }}>
                          <Avatar
                            src={chat.avatar}
                            sx={{ width: 48, height: 48 }}
                          />
                          {getStatusDot(chat.status)}
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            sx={{ fontWeight: 600, color: "#2C2F33" }}
                          >
                            {chat.name}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.875rem",
                              color: "#99AAB5",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {chat.lastMessage}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{ fontSize: "0.75rem", color: "#99AAB5" }}
                        >
                          {chat.time}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              )}

              {/* Friends List */}
              {tab === "friends" && (
                <Stack>
                  {Object.keys(groupFriendsByLetter())
                    .sort()
                    .map((letter) => (
                      <Box key={letter}>
                        <Box sx={{ px: 2, py: 1, bgcolor: "#F2F3F5" }}>
                          <Typography
                            sx={{
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              color: "#99AAB5",
                            }}
                          >
                            {letter}
                          </Typography>
                        </Box>
                        {groupFriendsByLetter()[letter].map((friend) => (
                          <Box
                            key={friend.id}
                            sx={{
                              p: 2,
                              cursor: "pointer",
                              "&:hover": { bgcolor: "#F2F3F5" },
                              transition: "background 0.2s",
                            }}
                            onClick={() => setSelectedFriend(friend)}
                          >
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                            >
                              <Box sx={{ position: "relative" }}>
                                <Avatar
                                  src={friend.avatar}
                                  sx={{ width: 48, height: 48 }}
                                />
                                {getStatusDot(friend.status)}
                              </Box>
                              <Box sx={{ flex: 1 }}>
                                <Typography
                                  sx={{ fontWeight: 600, color: "#2C2F33" }}
                                >
                                  {friend.name}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "0.8125rem",
                                    color: "#99AAB5",
                                  }}
                                >
                                  {friend.name.split(" ")[0]}#
                                  {friend.tag.slice(1)}
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
              {tab === "calls" && (
                <Stack>
                  {callLogs.map((call) => (
                    <Box
                      key={call.id}
                      sx={{
                        p: 2,
                        cursor: "pointer",
                        "&:hover": { bgcolor: "#F2F3F5" },
                        transition: "background 0.2s",
                      }}
                      onClick={() => setSelectedCall(call)}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{ position: "relative" }}>
                          <Avatar
                            src={call.avatar}
                            sx={{ width: 48, height: 48 }}
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
                            sx={{ fontWeight: 600, color: "#2C2F33" }}
                          >
                            {call.name}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.875rem",
                              color:
                                call.type === "incoming"
                                  ? "#10B981"
                                  : call.type === "outgoing"
                                  ? "#0B5CFF"
                                  : "#EF4444",
                            }}
                          >
                            {call.type.charAt(0).toUpperCase() +
                              call.type.slice(1)}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{ fontSize: "0.75rem", color: "#99AAB5" }}
                        >
                          {call.time.split(" ")[1].slice(0, 5)}
                        </Typography>
                      </Stack>
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
                  borderRadius: 4,
                  p: 4,
                  height: "100%",
                  maxHeight: "80vh",
                  overflowY: "auto",
                  bgcolor: "#FFFFFF",
                }}
              >
                {/* DM Detail */}
                {selectedChat && (
                  <Stack spacing={3}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box sx={{ position: "relative" }}>
                        <Avatar
                          src={selectedChat.avatar}
                          sx={{ width: 64, height: 64 }}
                        />
                        {getStatusDot(selectedChat.status)}
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, color: "#2C2F33" }}
                      >
                        {selectedChat.name}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack spacing={2}>
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
                              maxWidth: "70%",
                              bgcolor: msg.incoming ? "#F2F3F5" : "#5865F2",
                              color: msg.incoming ? "#2C2F33" : "#FFFFFF",
                              borderRadius: "18px",
                              px: 3,
                              py: 1.5,
                              borderBottomLeftRadius: msg.incoming ? 0 : "18px",
                              borderBottomRightRadius: msg.incoming
                                ? "18px"
                                : 0,
                            }}
                          >
                            <Typography sx={{ fontSize: "0.875rem" }}>
                              {msg.text}
                            </Typography>
                            <Typography
                              className="flex items-center gap-1"
                              sx={{
                                fontSize: "0.75rem",
                                mt: 0.5,
                                color: msg.incoming
                                  ? "#99AAB5"
                                  : "rgba(255,255,255,0.8)",
                              }}
                            >
                              {msg.time}
                              {!msg.incoming && <RiCheckDoubleFill />}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </Stack>
                )}

                {/* Friend Detail */}
                {selectedFriend && (
                  <Stack spacing={4} alignItems="center">
                    <Box sx={{ position: "relative" }}>
                      <Avatar
                        src={selectedFriend.avatar}
                        sx={{ width: 120, height: 120 }}
                      />
                      {getStatusDot(selectedFriend.status)}
                    </Box>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "#2C2F33" }}
                    >
                      {selectedFriend.name}
                    </Typography>
                    <Typography sx={{ fontSize: "1rem", color: "#99AAB5" }}>
                      {selectedFriend.name.split(" ")[0]}#
                      {selectedFriend.tag.slice(1)}
                    </Typography>
                  </Stack>
                )}

                {/* Call Detail */}
                {selectedCall && (
                  <Stack spacing={4} alignItems="center">
                    <Avatar
                      src={selectedCall.avatar}
                      sx={{ width: 120, height: 120 }}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "#2C2F33" }}
                    >
                      {selectedCall.name}
                    </Typography>
                    <Paper
                      elevation={0}
                      sx={{
                        bgcolor: "#F2F3F5",
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
                          color: "#2C2F33",
                        }}
                      >
                        {new Date(selectedCall.time).toLocaleString()}
                      </Typography>
                      {selectedCall.duration && (
                        <Typography
                          sx={{ fontSize: "0.875rem", color: "#99AAB5", mt: 1 }}
                        >
                          {selectedCall.duration} •{" "}
                          {selectedCall.type.charAt(0).toUpperCase() +
                            selectedCall.type.slice(1)}
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

export default DiscordPage;
