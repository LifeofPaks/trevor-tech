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
import { SiKakaotalk } from "react-icons/si";

// KakaoTalk Light Mode Theme (Yellow + Brown)
const theme = createTheme({
  palette: {
    primary: {
      main: "#FEE500", // Kakao Yellow
      light: "#FFF6B3",
      dark: "#E6C200",
    },
    secondary: {
      main: "#3C1E1E", // Kakao Brown
      light: "#5D4037",
      dark: "#2A130F",
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
            color: "#3C1E1E",
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
    name: "Minjun Kim",
    avatar: "https://i.pravatar.cc/150?img=62",
    lastMessage: "I left my ring at your place",
    time: "03:30",
    messages: [
      { text: "You still up?", time: "03:10", incoming: true },
      { text: "Yeah... can’t sleep", time: "03:11", incoming: false },
      { text: "I left my ring at your place", time: "03:30", incoming: false },
    ],
  },
  {
    id: 2,
    name: "Jaehyun Park",
    avatar: "https://i.pravatar.cc/150?img=63",
    lastMessage: "She doesn’t suspect anything",
    time: "01:55",
    messages: [
      { text: "That was too close", time: "01:40", incoming: true },
      { text: "But we pulled it off", time: "01:41", incoming: false },
      { text: "She doesn’t suspect anything", time: "01:55", incoming: false },
    ],
  },
  {
    id: 3,
    name: "Seojun Lee",
    avatar: "https://i.pravatar.cc/150?img=64",
    lastMessage: "Send the video again",
    time: "00:20",
    messages: [
      { text: "You deleted it?", time: "00:05", incoming: true },
      { text: "Had to. Too risky", time: "00:06", incoming: false },
      { text: "Send the video again", time: "00:20", incoming: false },
    ],
  },
  {
    id: 4,
    name: "Dohyun Choi",
    avatar: "https://i.pravatar.cc/150?img=65",
    lastMessage: "I’m in your apartment",
    time: "23:45",
    messages: [
      { text: "You home?", time: "23:30", incoming: true },
      { text: "She’s out. Door’s open", time: "23:31", incoming: false },
      { text: "I’m in your apartment", time: "23:45", incoming: false },
    ],
  },
  {
    id: 5,
    name: "Yejun Jung",
    avatar: "https://i.pravatar.cc/150?img=66",
    lastMessage: "I’m obsessed with you",
    time: "02:15",
    messages: [
      {
        text: "I can’t stop thinking about you",
        time: "02:00",
        incoming: true,
      },
      { text: "Same. Every second", time: "02:01", incoming: false },
      { text: "I’m obsessed with you", time: "02:15", incoming: false },
    ],
  },
  {
    id: 6,
    name: "Siwoo Kang",
    avatar: "https://i.pravatar.cc/150?img=67",
    lastMessage: "I told her I was at work",
    time: "21:50",
    messages: [
      { text: "Where are you?", time: "21:30", incoming: true },
      { text: "Work. Late meeting", time: "21:31", incoming: false },
      { text: "Liar", time: "21:32", incoming: true },
      { text: "I told her I was at work", time: "21:50", incoming: false },
    ],
  },
  {
    id: 7,
    name: "Haneul Song",
    avatar: "https://i.pravatar.cc/150?img=68",
    lastMessage: "This is dangerous",
    time: "20:10",
    messages: [
      { text: "We said last time was the last", time: "19:55", incoming: true },
      { text: "I know", time: "19:56", incoming: false },
      { text: "Then why am I here?", time: "19:57", incoming: true },
      { text: "This is dangerous", time: "20:10", incoming: false },
    ],
  },
  {
    id: 8,
    name: "Juwon Han",
    avatar: "https://i.pravatar.cc/150?img=69",
    lastMessage: "I dream about you every night",
    time: "04:05",
    messages: [
      { text: "Are you sleeping?", time: "03:50", incoming: true },
      { text: "No. You?", time: "03:51", incoming: false },
      { text: "Thinking of you", time: "03:52", incoming: true },
      { text: "I dream about you every night", time: "04:05", incoming: false },
    ],
  },
  {
    id: 9,
    name: "Eunwoo Shin",
    avatar: "https://i.pravatar.cc/150?img=70",
    lastMessage: "Delete after reading",
    time: "01:30",
    messages: [
      {
        text: "I can’t stop replaying last night",
        time: "01:15",
        incoming: true,
      },
      { text: "That thing you did...", time: "01:16", incoming: false },
      { text: "Shh. Don’t type it", time: "01:17", incoming: true },
      { text: "Delete after reading", time: "01:30", incoming: false },
    ],
  },
  {
    id: 10,
    name: "Taeyang Yoon",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "I’m falling for you",
    time: "00:40",
    messages: [
      { text: "This is getting serious", time: "00:25", incoming: true },
      { text: "I know", time: "00:26", incoming: false },
      { text: "But I don’t want to stop", time: "00:27", incoming: true },
      { text: "I’m falling for you", time: "00:40", incoming: false },
    ],
  },
  {
    id: 11,
    name: "Jihoon Baek",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "Your scent is on my pillow",
    time: "05:00",
    messages: [
      { text: "I can still smell you", time: "04:40", incoming: true },
      { text: "Good", time: "04:41", incoming: false },
      { text: "Your scent is on my pillow", time: "05:00", incoming: false },
    ],
  },
  {
    id: 12,
    name: "Woojin Oh",
    avatar: "https://i.pravatar.cc/150?img=3",
    lastMessage: "I lied to her for you",
    time: "22:20",
    messages: [
      { text: "She asked where I was", time: "22:05", incoming: true },
      { text: "What’d you say?", time: "22:06", incoming: false },
      { text: "With you", time: "22:07", incoming: true },
      { text: "I lied to her for you", time: "22:20", incoming: false },
    ],
  },
];

// === Friends (KakaoTalk uses "Friends") ===
const friends = [
  ...chats.map((c) => ({
    id: c.id,
    name: c.name,
    avatar: c.avatar,
    phone: `+82 10-${String(1000 + c.id).padStart(4, "0")}`,
    email: `${c.name.split(" ")[0].toLowerCase()}@kakao.com`,
  })),
];

// === Call Logs ===
const callLogs = [
  {
    id: 1,
    name: "Minjun Kim",
    avatar: "https://i.pravatar.cc/150?img=62",
    type: "outgoing",
    time: "2025-10-28 23:55",
    duration: "17:40",
  },
  {
    id: 2,
    name: "Jaehyun Park",
    avatar: "https://i.pravatar.cc/150?img=63",
    type: "incoming",
    time: "2025-10-28 22:30",
    duration: "11:20",
  },
  {
    id: 3,
    name: "Seojun Lee",
    avatar: "https://i.pravatar.cc/150?img=64",
    type: "missed",
    time: "2025-10-28 21:10",
  },
  {
    id: 4,
    name: "Dohyun Choi",
    avatar: "https://i.pravatar.cc/150?img=65",
    type: "outgoing",
    time: "2025-10-27 20:45",
    duration: "33:15",
  },
  {
    id: 5,
    name: "Yejun Jung",
    avatar: "https://i.pravatar.cc/150?img=66",
    type: "incoming",
    time: "2025-10-27 19:20",
    duration: "28:50",
  },
  {
    id: 6,
    name: "Jihoon Baek",
    avatar: "https://i.pravatar.cc/150?img=2",
    type: "missed",
    time: "2025-10-27 18:00",
  },
];

const KakaoTalkPage = () => {
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
              KakaoTalk
              <SiKakaotalk className="text-[#524a04] drop-shadow-md" />
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
                "& .MuiTabs-indicator": { bgcolor: "#3C1E1E", height: 3 },
              }}
            >
              <Tab
                icon={<SiKakaotalk className="text-[#524a04]" />}
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
              <IconButton onClick={handleBack} sx={{ color: "#3C1E1E" }}>
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
                            LDSX
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
                              bgcolor: msg.incoming ? "#f3f4f6" : "#FEE500",
                              color: msg.incoming ? "#000" : "#3C1E1E",
                              borderRadius: "18px",
                              px: 3,
                              py: 1.5,
                              borderBottomLeftRadius: msg.incoming ? 0 : "18px",
                              borderBottomRightRadius: msg.incoming
                                ? "18px"
                                : 0,
                              fontWeight: msg.incoming ? 400 : 600,
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
                                color: msg.incoming ? "#6b7280" : "#3C1E1E",
                                opacity: 0.9,
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
                          bgcolor: "#FFF6B3",
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
                            bgcolor: "#3C1E1E",
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
                          bgcolor: "#E6C200",
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
                            bgcolor: "#3C1E1E",
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

export default KakaoTalkPage;
