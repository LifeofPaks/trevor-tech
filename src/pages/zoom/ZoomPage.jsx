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
import { IoArrowBackCircle, IoLogoBitbucket } from "react-icons/io5";
import BindPhone from "../../components/demo/BindPhone";
import { RiCheckDoubleFill } from "react-icons/ri";
import { SiZoom } from "react-icons/si";

// Zoom Light Mode Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#0B5CFF",
      light: "#4D8AFF",
      dark: "#0039B3",
    },
    secondary: {
      main: "#F5F5F5",
      light: "#FFFFFF",
      dark: "#E0E0E0",
    },
    success: { main: "#10B981" }, // incoming
    error: { main: "#EF4444" }, // missed
    info: { main: "#0B5CFF" }, // outgoing
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
            color: "#0B5CFF",
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
    name: "Ava Chen",
    avatar: "https://i.pravatar.cc/150?img=27",
    lastMessage: "I can't stop thinking about you",
    time: "00:42",
    messages: [
      { text: "You're still up?", time: "00:30", incoming: true },
      { text: "Yeah, can't sleep", time: "00:31", incoming: false },
      { text: "Same. Wish you were here", time: "00:32", incoming: true },
      {
        text: "I can't stop thinking about you",
        time: "00:42",
        incoming: false,
      },
    ],
  },
  {
    id: 2,
    name: "Liam Park",
    avatar: "https://i.pravatar.cc/150?img=32",
    lastMessage: "Delete after reading",
    time: "23:15",
    messages: [
      { text: "That hotel was perfect", time: "23:00", incoming: true },
      { text: "We have to do it again", time: "23:01", incoming: false },
      { text: "Soon. I promise", time: "23:02", incoming: true },
      { text: "Delete after reading", time: "23:15", incoming: false },
    ],
  },
  {
    id: 3,
    name: "Zoe Kim",
    avatar: "https://i.pravatar.cc/150?img=25",
    lastMessage: "He's out of town",
    time: "22:10",
    messages: [
      { text: "You free tonight?", time: "22:00", incoming: true },
      { text: "He's out of town", time: "22:01", incoming: false },
      { text: "Meet me at 10", time: "22:02", incoming: true },
      { text: "On my way", time: "22:10", incoming: false },
    ],
  },
  {
    id: 4,
    name: "Ethan Brooks",
    avatar: "https://i.pravatar.cc/150?img=30",
    lastMessage: "Send it",
    time: "21:45",
    messages: [
      { text: "You look so good", time: "21:30", incoming: true },
      { text: "Stop teasing me", time: "21:31", incoming: false },
      { text: "Send it", time: "21:32", incoming: true },
      { text: "Sent. Delete in 5", time: "21:45", incoming: false },
    ],
  },
  {
    id: 5,
    name: "Maya Wu",
    avatar: "https://i.pravatar.cc/150?img=26",
    lastMessage: "I love you more",
    time: "02:20",
    messages: [
      { text: "I shouldn't say this", time: "02:10", incoming: true },
      { text: "But?", time: "02:11", incoming: false },
      { text: "I love you", time: "02:12", incoming: true },
      { text: "I love you more", time: "02:20", incoming: false },
    ],
  },
  {
    id: 6,
    name: "Noah Lee",
    avatar: "https://i.pravatar.cc/150?img=31",
    lastMessage: "Room 808",
    time: "19:50",
    messages: [
      { text: "Same place?", time: "19:40", incoming: true },
      { text: "Room 808", time: "19:41", incoming: false },
      { text: "I'll be there", time: "19:42", incoming: true },
      { text: "Door's open", time: "19:50", incoming: false },
    ],
  },
  {
    id: 7,
    name: "Isabella Zhang",
    avatar: "https://i.pravatar.cc/150?img=28",
    lastMessage: "No one suspects",
    time: "18:30",
    messages: [
      { text: "We need to be careful", time: "18:20", incoming: true },
      { text: "I know. But I can't stop", time: "18:21", incoming: false },
      { text: "Same. Just one more time", time: "18:22", incoming: true },
      { text: "No one suspects", time: "18:30", incoming: false },
    ],
  },
  {
    id: 8,
    name: "Dylan Kim",
    avatar: "https://i.pravatar.cc/150?img=33",
    lastMessage: "You're my escape",
    time: "01:15",
    messages: [
      { text: "I told her I was at the office", time: "01:00", incoming: true },
      { text: "I told him I was with friends", time: "01:01", incoming: false },
      { text: "This is so wrong", time: "01:02", incoming: true },
      { text: "But you're my escape", time: "01:15", incoming: false },
    ],
  },
];

// === Participants ===
const participants = [
  {
    id: 1,
    name: "Ava Chen",
    avatar: "https://i.pravatar.cc/150?img=27",
    email: "ava@zoom.us",
  },
  {
    id: 2,
    name: "Liam Park",
    avatar: "https://i.pravatar.cc/150?img=32",
    email: "liam@zoom.us",
  },
  {
    id: 3,
    name: "Zoe Kim",
    avatar: "https://i.pravatar.cc/150?img=25",
    email: "zoe@zoom.us",
  },
  {
    id: 4,
    name: "Ethan Brooks",
    avatar: "https://i.pravatar.cc/150?img=30",
    email: "ethan@zoom.us",
  },
  {
    id: 5,
    name: "Maya Wu",
    avatar: "https://i.pravatar.cc/150?img=26",
    email: "maya@zoom.us",
  },
  {
    id: 6,
    name: "Noah Lee",
    avatar: "https://i.pravatar.cc/150?img=31",
    email: "noah@zoom.us",
  },
  {
    id: 7,
    name: "Isabella Zhang",
    avatar: "https://i.pravatar.cc/150?img=28",
    email: "isabella@zoom.us",
  },
  {
    id: 8,
    name: "Dylan Kim",
    avatar: "https://i.pravatar.cc/150?img=33",
    email: "dylan@zoom.us",
  },
];

// === Call Logs ===
const callLogs = [
  {
    id: 1,
    name: "Ava Chen",
    avatar: "https://i.pravatar.cc/150?img=27",
    type: "outgoing",
    time: "2025-10-28 23:30",
    duration: "15:20",
  },
  {
    id: 2,
    name: "Liam Park",
    avatar: "https://i.pravatar.cc/150?img=32",
    type: "incoming",
    time: "2025-10-28 22:15",
    duration: "08:45",
  },
  {
    id: 3,
    name: "Zoe Kim",
    avatar: "https://i.pravatar.cc/150?img=25",
    type: "missed",
    time: "2025-10-28 21:00",
  },
  {
    id: 4,
    name: "Ethan Brooks",
    avatar: "https://i.pravatar.cc/150?img=30",
    type: "outgoing",
    time: "2025-10-27 20:30",
    duration: "22:10",
  },
  {
    id: 5,
    name: "Maya Wu",
    avatar: "https://i.pravatar.cc/150?img=26",
    type: "incoming",
    time: "2025-10-27 19:00",
    duration: "30:00",
  },
];

const ZoomPage = () => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const [tab, setTab] = useState("chat");
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [selectedCall, setSelectedCall] = useState(null);

  const handleBack = () => {
    setSelectedChat(null);
    setSelectedParticipant(null);
    setSelectedCall(null);
  };

  const getCallIcon = (type) => {
    const iconColor =
      type === "incoming"
        ? "#10B981"
        : type === "outgoing"
        ? "#0B5CFF"
        : "#EF4444"; // missed
    return (
      <Box sx={{ color: iconColor }}>
        {type === "outgoing" && <FiPhoneCall style={{ fontSize: 16 }} />}
        {type === "incoming" && <FiPhoneIncoming style={{ fontSize: 16 }} />}
        {type === "missed" && <FiPhoneMissed style={{ fontSize: 16 }} />}
      </Box>
    );
  };

  const groupParticipantsByLetter = () => {
    const grouped = {};
    participants.forEach((p) => {
      const letter = p.name[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(p);
    });
    return grouped;
  };

  const showDetail = selectedChat || selectedParticipant || selectedCall;

  return (
    <ThemeProvider theme={theme}>
      <header className="!mb-4 sm:!mb-6 !px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
          <div className="flex items-center !gap-2 sm:!gap-3">
            <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
              Zoom
              <SiZoom className="text-[#0B5CFF]" />
            </h1>
          </div>
          <BindPhone />
        </div>
      </header>

      <Box
        sx={{
          bgcolor: "#fafafa",
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
                icon={<SiZoom />}
                iconPosition="start"
                label={isMobile ? "" : "Chat"}
                value="chat"
              />
              <Tab
                icon={<FiUsers />}
                iconPosition="start"
                label={isMobile ? "" : "Participants"}
                value="participants"
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
                borderRadius: 4,
                overflow: "hidden",
                display: showDetail && isMobile ? "none" : "block",
                height: "100%",
                maxHeight: "80vh",
                overflowY: "auto",
                bgcolor: "background.paper",
                "&::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
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
                        "&:hover": { bgcolor: "rgba(0,0,0,0.02)" },
                        transition: "background 0.2s",
                      }}
                      onClick={() => setSelectedChat(chat)}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          src={chat.avatar}
                          sx={{ width: 48, height: 48 }}
                        />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            sx={{ fontWeight: 600, color: "#1f2937" }}
                          >
                            {chat.name}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.875rem",
                              color: "#6b7280",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {chat.lastMessage}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{ fontSize: "0.75rem", color: "#9ca3af" }}
                        >
                          {chat.time}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              )}

              {/* Participants List */}
              {tab === "participants" && (
                <Stack>
                  {Object.keys(groupParticipantsByLetter())
                    .sort()
                    .map((letter) => (
                      <Box key={letter}>
                        <Box sx={{ px: 2, py: 1, bgcolor: "#f3f4f6" }}>
                          <Typography
                            sx={{
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              color: "#6b7280",
                            }}
                          >
                            {letter}
                          </Typography>
                        </Box>
                        {groupParticipantsByLetter()[letter].map((p) => (
                          <Box
                            key={p.id}
                            sx={{
                              p: 2,
                              cursor: "pointer",
                              "&:hover": { bgcolor: "rgba(0,0,0,0.02)" },
                              transition: "background 0.2s",
                            }}
                            onClick={() => setSelectedParticipant(p)}
                          >
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                            >
                              <Avatar
                                src={p.avatar}
                                sx={{ width: 48, height: 48 }}
                              />
                              <Typography
                                sx={{ fontWeight: 500, color: "#1f2937" }}
                              >
                                {p.name}
                              </Typography>
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
                  {callLogs.map((call) => (
                    <Box
                      key={call.id}
                      sx={{
                        p: 2,
                        cursor: "pointer",
                        "&:hover": { bgcolor: "rgba(0,0,0,0.02)" },
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
                            sx={{ fontWeight: 600, color: "#1f2937" }}
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
                          sx={{ fontSize: "0.75rem", color: "#9ca3af" }}
                        >
                          {call.time.split(" ")[1]}
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
                  bgcolor: "background.paper",
                }}
              >
                {/* Chat Detail */}
                {selectedChat && (
                  <Stack spacing={3}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        src={selectedChat.avatar}
                        sx={{ width: 64, height: 64 }}
                      />
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, color: "#1f2937" }}
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
                              bgcolor: msg.incoming ? "#f3f4f6" : "#0B5CFF",
                              color: msg.incoming ? "#000" : "#fff",
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
                                  ? "#6b7280"
                                  : "rgba(255,255,255,0.8)",
                              }}
                            >
                              {msg.time}
                              <RiCheckDoubleFill />
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </Stack>
                )}

                {/* Participant Detail */}
                {selectedParticipant && (
                  <Stack spacing={4} alignItems="center">
                    <Avatar
                      src={selectedParticipant.avatar}
                      sx={{ width: 120, height: 120 }}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "#1f2937" }}
                    >
                      {selectedParticipant.name}
                    </Typography>

                    {selectedParticipant.email && (
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: "#dbeafe",
                          borderRadius: 3,
                          p: 2,
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <Box
                          sx={{
                            bgcolor: "#0B5CFF",
                            borderRadius: "50%",
                            p: 1,
                            display: "flex",
                          }}
                        >
                          <FiMail
                            className="!text-white"
                            style={{ fontSize: 20 }}
                          />
                        </Box>
                        <Box>
                          <Typography
                            sx={{ fontSize: "0.75rem", color: "#6b7280" }}
                          >
                            Email
                          </Typography>
                          <Typography sx={{ fontWeight: 500 }}>
                            {selectedParticipant.email}
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
                      sx={{ width: 120, height: 120 }}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "#1f2937" }}
                    >
                      {selectedCall.name}
                    </Typography>
                    <Paper
                      elevation={0}
                      sx={{
                        bgcolor: "#f9fafb",
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
                          color: "#1f2937",
                        }}
                      >
                        {selectedCall.time}
                      </Typography>
                      {selectedCall.duration && (
                        <Typography
                          sx={{ fontSize: "0.875rem", color: "#6b7280", mt: 1 }}
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

export default ZoomPage;
