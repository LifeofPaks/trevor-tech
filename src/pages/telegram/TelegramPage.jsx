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
import { SiTelegram } from "react-icons/si";

// Telegram Light Mode Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#229ED9", // Telegram blue
      light: "#4FB3F6",
      dark: "#1C7BB0",
    },
    secondary: {
      main: "#F5F5F5",
      light: "#FFFFFF",
      dark: "#E0E0E0",
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
            color: "#229ED9",
          },
        },
      },
    },
  },
});

// === Cheating Drama Chats (12 Total) – Young Men Only ===
const chats = [
  {
    id: 1,
    name: "Jake Morrison",
    avatar: "https://i.pravatar.cc/150?img=38",
    lastMessage: "I left my hoodie at your place",
    time: "03:12",
    messages: [
      { text: "You still up?", time: "02:50", incoming: true },
      { text: "Yeah... can't sleep", time: "02:51", incoming: false },
      { text: "Thinking about earlier?", time: "02:52", incoming: true },
      { text: "Every second", time: "02:53", incoming: false },
      {
        text: "I left my hoodie at your place",
        time: "03:12",
        incoming: false,
      },
    ],
  },
  {
    id: 2,
    name: "Tyler Reed",
    avatar: "https://i.pravatar.cc/150?img=39",
    lastMessage: "She has no idea",
    time: "01:47",
    messages: [
      { text: "That was close today", time: "01:30", incoming: true },
      {
        text: "Too close. My heart was racing",
        time: "01:31",
        incoming: false,
      },
      { text: "But worth it", time: "01:32", incoming: true },
      { text: "Every time", time: "01:33", incoming: false },
      { text: "She has no idea", time: "01:47", incoming: false },
    ],
  },
  {
    id: 3,
    name: "Caleb Holt",
    avatar: "https://i.pravatar.cc/150?img=40",
    lastMessage: "Send it again, I deleted it",
    time: "00:28",
    messages: [
      { text: "You looked insane tonight", time: "00:10", incoming: true },
      {
        text: "You weren't supposed to see that",
        time: "00:11",
        incoming: false,
      },
      { text: "Too late. Save it", time: "00:12", incoming: true },
      { text: "Send it again, I deleted it", time: "00:28", incoming: false },
    ],
  },
  {
    id: 4,
    name: "Logan Pierce",
    avatar: "https://i.pravatar.cc/150?img=41",
    lastMessage: "Door’s unlocked. Come in quiet",
    time: "23:55",
    messages: [
      { text: "You home?", time: "23:40", incoming: true },
      { text: "Yeah. She’s asleep", time: "23:41", incoming: false },
      { text: "On my way", time: "23:42", incoming: true },
      {
        text: "Door’s unlocked. Come in quiet",
        time: "23:55",
        incoming: false,
      },
    ],
  },
  {
    id: 5,
    name: "Austin Grey",
    avatar: "https://i.pravatar.cc/150?img=42",
    lastMessage: "I’m addicted to you",
    time: "02:30",
    messages: [
      { text: "I shouldn’t be here", time: "02:00", incoming: true },
      { text: "Then why are you?", time: "02:01", incoming: false },
      { text: "Because I can’t stay away", time: "02:02", incoming: true },
      { text: "Good", time: "02:03", incoming: false },
      { text: "I’m addicted to you", time: "02:30", incoming: false },
    ],
  },
  {
    id: 6,
    name: "Brandon Cole",
    avatar: "https://i.pravatar.cc/150?img=43",
    lastMessage: "I told her I was at the gym",
    time: "22:10",
    messages: [
      { text: "Where are you?", time: "21:50", incoming: true },
      { text: "Gym. Late session", time: "21:51", incoming: false },
      { text: "Liar", time: "21:52", incoming: true },
      { text: "You know why", time: "21:53", incoming: false },
      { text: "I told her I was at the gym", time: "22:10", incoming: false },
    ],
  },
  {
    id: 7,
    name: "Evan Shaw",
    avatar: "https://i.pravatar.cc/150?img=44",
    lastMessage: "This can’t keep happening",
    time: "20:45",
    messages: [
      { text: "We said last time was the last", time: "20:30", incoming: true },
      { text: "I know", time: "20:31", incoming: false },
      {
        text: "Then why am I pulling into your driveway?",
        time: "20:32",
        incoming: true,
      },
      { text: "This can’t keep happening", time: "20:45", incoming: false },
    ],
  },
  {
    id: 8,
    name: "Gavin Knox",
    avatar: "https://i.pravatar.cc/150?img=45",
    lastMessage: "I dream about you every night",
    time: "03:05",
    messages: [
      { text: "Are you asleep?", time: "02:55", incoming: true },
      { text: "No. You?", time: "02:56", incoming: false },
      { text: "Wide awake. Thinking of you", time: "02:57", incoming: true },
      { text: "I dream about you every night", time: "03:05", incoming: false },
    ],
  },
  {
    id: 9,
    name: "Hunter Blake",
    avatar: "https://i.pravatar.cc/150?img=46",
    lastMessage: "Delete after reading",
    time: "01:15",
    messages: [
      {
        text: "I can’t stop replaying last night",
        time: "01:00",
        incoming: true,
      },
      { text: "Same. That thing you did...", time: "01:01", incoming: false },
      { text: "Shh. Don’t type it", time: "01:02", incoming: true },
      { text: "Delete after reading", time: "01:15", incoming: false },
    ],
  },
  {
    id: 10,
    name: "Jordan Miles",
    avatar: "https://i.pravatar.cc/150?img=47",
    lastMessage: "I’m falling for you",
    time: "00:05",
    messages: [
      { text: "This is getting dangerous", time: "23:50", incoming: true },
      { text: "I know", time: "23:51", incoming: false },
      { text: "But I don’t want to stop", time: "23:52", incoming: true },
      { text: "I’m falling for you", time: "00:05", incoming: false },
    ],
  },
  {
    id: 11,
    name: "Kyle Vance",
    avatar: "https://i.pravatar.cc/150?img=48",
    lastMessage: "Your scent is still on my sheets",
    time: "04:20",
    messages: [
      { text: "I can still taste you", time: "04:00", incoming: true },
      { text: "Stop. I’m getting hard again", time: "04:01", incoming: false },
      { text: "Good", time: "04:02", incoming: true },
      {
        text: "Your scent is still on my sheets",
        time: "04:20",
        incoming: false,
      },
    ],
  },
  {
    id: 12,
    name: "Mason Hale",
    avatar: "https://i.pravatar.cc/150?img=49",
    lastMessage: "I lied to her for you",
    time: "21:30",
    messages: [
      { text: "She asked where I was", time: "21:15", incoming: true },
      { text: "What’d you say?", time: "21:16", incoming: false },
      { text: "With you", time: "21:17", incoming: true },
      { text: "I lied to her for you", time: "21:30", incoming: false },
    ],
  },
];

// === Friends (Contacts) ===
const friends = [
  ...chats.map((c) => ({
    id: c.id,
    name: c.name,
    avatar: c.avatar,
    phone: `+1 555-${1000 + c.id}`,
    email: `${c.name.split(" ")[0].toLowerCase()}@telegram.com`,
  })),
];

// === Call Logs ===
const callLogs = [
  {
    id: 1,
    name: "Jake Morrison",
    avatar: "https://i.pravatar.cc/150?img=38",
    type: "outgoing",
    time: "2025-10-28 23:30",
    duration: "22:15",
  },
  {
    id: 2,
    name: "Tyler Reed",
    avatar: "https://i.pravatar.cc/150?img=39",
    type: "incoming",
    time: "2025-10-28 22:10",
    duration: "14:30",
  },
  {
    id: 3,
    name: "Caleb Holt",
    avatar: "https://i.pravatar.cc/150?img=40",
    type: "missed",
    time: "2025-10-28 21:05",
  },
  {
    id: 4,
    name: "Logan Pierce",
    avatar: "https://i.pravatar.cc/150?img=41",
    type: "outgoing",
    time: "2025-10-27 20:45",
    duration: "38:20",
  },
  {
    id: 5,
    name: "Austin Grey",
    avatar: "https://i.pravatar.cc/150?img=42",
    type: "incoming",
    time: "2025-10-27 19:20",
    duration: "27:10",
  },
  {
    id: 6,
    name: "Kyle Vance",
    avatar: "https://i.pravatar.cc/150?img=48",
    type: "missed",
    time: "2025-10-27 18:00",
  },
];

const TelegramPage = () => {
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
              Telegram
              <SiTelegram className="text-[#229ED9]" />
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
                icon={<SiTelegram />}
                iconPosition="start"
                label={isMobile ? "" : "Chats"}
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

              {/* Friends List */}
              {tab === "friends" && (
                <Stack>
                  {Object.keys(groupFriendsByLetter())
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
                        {groupFriendsByLetter()[letter].map((friend) => (
                          <Box
                            key={friend.id}
                            sx={{
                              p: 2,
                              cursor: "pointer",
                              "&:hover": { bgcolor: "rgba(0,0,0,0.02)" },
                              transition: "background 0.2s",
                            }}
                            onClick={() => setSelectedFriend(friend)}
                          >
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                            >
                              <Avatar
                                src={friend.avatar}
                                sx={{ width: 48, height: 48 }}
                              />
                              <Typography
                                sx={{ fontWeight: 500, color: "#1f2937" }}
                              >
                                {friend.name}
                              </Typography>
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
                              bgcolor: msg.incoming ? "#f3f4f6" : "#229ED9",
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
                    <Avatar
                      src={selectedFriend.avatar}
                      sx={{ width: 120, height: 120 }}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "#1f2937" }}
                    >
                      {selectedFriend.name}
                    </Typography>

                    {selectedFriend.phone && (
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: "#DBEAFE",
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
                            bgcolor: "#229ED9",
                            borderRadius: "50%",
                            p: 1.2,
                            display: "flex",
                          }}
                        >
                          <FiPhone
                            className="!text-white"
                            style={{ fontSize: 22 }}
                          />
                        </Box>
                        <Box sx={{ textAlign: "left" }}>
                          <Typography
                            sx={{ fontSize: "0.8125rem", color: "#6b7280" }}
                          >
                            Phone
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 600, color: "#1f2937" }}
                          >
                            {selectedFriend.phone}
                          </Typography>
                        </Box>
                      </Paper>
                    )}

                    {selectedFriend.email && (
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: "#E0E7FF",
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
                            bgcolor: "#229ED9",
                            borderRadius: "50%",
                            p: 1.2,
                            display: "flex",
                          }}
                        >
                          <FiMail
                            className="!text-white"
                            style={{ fontSize: 22 }}
                          />
                        </Box>
                        <Box sx={{ textAlign: "left" }}>
                          <Typography
                            sx={{ fontSize: "0.8125rem", color: "#6b7280" }}
                          >
                            Email
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 600, color: "#1f2937" }}
                          >
                            {selectedFriend.email}
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
                        {new Date(selectedCall.time).toLocaleString()}
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

export default TelegramPage;
