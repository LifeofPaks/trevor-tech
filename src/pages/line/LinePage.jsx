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
import { SiLine } from "react-icons/si";

// LINE Light Mode Theme (Green)
const theme = createTheme({
  palette: {
    primary: {
      main: "#00B900", // LINE Green
      light: "#33C933",
      dark: "#008C00",
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
            color: "#00B900",
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
    name: "Kai Nakamura",
    avatar: "https://i.pravatar.cc/150?img=50",
    lastMessage: "I’m outside. She’s not home",
    time: "02:41",
    messages: [
      { text: "You still awake?", time: "02:30", incoming: true },
      { text: "Yeah. You?", time: "02:31", incoming: false },
      { text: "Just left her place", time: "02:32", incoming: true },
      { text: "I’m outside. She’s not home", time: "02:41", incoming: false },
    ],
  },
  {
    id: 2,
    name: "Riku Sato",
    avatar: "https://i.pravatar.cc/150?img=51",
    lastMessage: "I can’t delete your photos",
    time: "01:15",
    messages: [
      { text: "That night was unreal", time: "01:00", incoming: true },
      { text: "I still have the video", time: "01:01", incoming: false },
      { text: "You better delete it", time: "01:02", incoming: true },
      { text: "I can’t delete your photos", time: "01:15", incoming: false },
    ],
  },
  {
    id: 3,
    name: "Haruto Tanaka",
    avatar: "https://i.pravatar.cc/150?img=52",
    lastMessage: "Meet me in the parking garage",
    time: "23:58",
    messages: [
      { text: "Where are you?", time: "23:45", incoming: true },
      { text: "Work. Late shift", time: "23:46", incoming: false },
      { text: "Liar. I’m in the car", time: "23:47", incoming: true },
      { text: "Meet me in the parking garage", time: "23:58", incoming: false },
    ],
  },
  {
    id: 4,
    name: "Sora Yamamoto",
    avatar: "https://i.pravatar.cc/150?img=53",
    lastMessage: "I told her I was sick",
    time: "22:30",
    messages: [
      { text: "She thinks I’m home sick", time: "22:10", incoming: true },
      { text: "You’re not?", time: "22:11", incoming: false },
      { text: "I’m in your bed", time: "22:12", incoming: true },
      { text: "I told her I was sick", time: "22:30", incoming: false },
    ],
  },
  {
    id: 5,
    name: "Ren Kobayashi",
    avatar: "https://i.pravatar.cc/150?img=54",
    lastMessage: "You’re my escape",
    time: "03:20",
    messages: [
      { text: "I hate going home", time: "03:00", incoming: true },
      { text: "Then don’t", time: "03:01", incoming: false },
      { text: "I wish I could stay", time: "03:02", incoming: true },
      { text: "You’re my escape", time: "03:20", incoming: false },
    ],
  },
  {
    id: 6,
    name: "Yuto Ikeda",
    avatar: "https://i.pravatar.cc/150?img=55",
    lastMessage: "I still taste you",
    time: "00:45",
    messages: [
      {
        text: "I can’t stop thinking about your lips",
        time: "00:30",
        incoming: true,
      },
      { text: "Same. On my neck", time: "00:31", incoming: false },
      { text: "I still taste you", time: "00:45", incoming: false },
    ],
  },
  {
    id: 7,
    name: "Daichi Fujimoto",
    avatar: "https://i.pravatar.cc/150?img=56",
    lastMessage: "This is getting out of control",
    time: "21:10",
    messages: [
      { text: "We said one time", time: "20:55", incoming: true },
      { text: "I know", time: "20:56", incoming: false },
      { text: "Then why am I in your shower?", time: "20:57", incoming: true },
      {
        text: "This is getting out of control",
        time: "21:10",
        incoming: false,
      },
    ],
  },
  {
    id: 8,
    name: "Kaito Mori",
    avatar: "https://i.pravatar.cc/150?img=57",
    lastMessage: "I lied to her again",
    time: "19:40",
    messages: [
      { text: "She asked if I was with you", time: "19:20", incoming: true },
      { text: "What’d you say?", time: "19:21", incoming: false },
      { text: "Work emergency", time: "19:22", incoming: true },
      { text: "I lied to her again", time: "19:40", incoming: false },
    ],
  },
  {
    id: 9,
    name: "Shota Okada",
    avatar: "https://i.pravatar.cc/150?img=58",
    lastMessage: "Your name is saved as 'Boss'",
    time: "02:05",
    messages: [
      { text: "Change my name in your phone", time: "01:50", incoming: true },
      { text: "Already did", time: "01:51", incoming: false },
      { text: "To what?", time: "01:52", incoming: true },
      { text: "Your name is saved as 'Boss'", time: "02:05", incoming: false },
    ],
  },
  {
    id: 10,
    name: "Ryo Hashimoto",
    avatar: "https://i.pravatar.cc/150?img=59",
    lastMessage: "I’m in love with you",
    time: "00:10",
    messages: [
      { text: "This isn’t just sex anymore", time: "23:55", incoming: true },
      { text: "I know", time: "23:56", incoming: false },
      { text: "Then what is it?", time: "23:57", incoming: true },
      { text: "I’m in love with you", time: "00:10", incoming: false },
    ],
  },
  {
    id: 11,
    name: "Toma Inoue",
    avatar: "https://i.pravatar.cc/150?img=60",
    lastMessage: "I left marks on your neck",
    time: "04:30",
    messages: [
      { text: "You bit me too hard", time: "04:10", incoming: true },
      { text: "You asked for it", time: "04:11", incoming: false },
      { text: "I left marks on your neck", time: "04:30", incoming: false },
    ],
  },
  {
    id: 12,
    name: "Yuki Arai",
    avatar: "https://i.pravatar.cc/150?img=61",
    lastMessage: "I can’t lose you",
    time: "22:00",
    messages: [
      { text: "She found a hair on my shirt", time: "21:45", incoming: true },
      { text: "Was it yours?", time: "21:46", incoming: false },
      { text: "Yes", time: "21:47", incoming: true },
      { text: "I can’t lose you", time: "22:00", incoming: false },
    ],
  },
];

// === Friends (LINE uses "Friends") ===
const friends = [
  ...chats.map((c) => ({
    id: c.id,
    name: c.name,
    avatar: c.avatar,
    phone: `+81 90-${String(1000 + c.id).padStart(4, "0")}`,
    email: `${c.name.split(" ")[0].toLowerCase()}@line.me`,
  })),
];

// === Call Logs ===
const callLogs = [
  {
    id: 1,
    name: "Kai Nakamura",
    avatar: "https://i.pravatar.cc/150?img=50",
    type: "outgoing",
    time: "2025-10-28 23:45",
    duration: "19:30",
  },
  {
    id: 2,
    name: "Riku Sato",
    avatar: "https://i.pravatar.cc/150?img=51",
    type: "incoming",
    time: "2025-10-28 22:20",
    duration: "12:45",
  },
  {
    id: 3,
    name: "Haruto Tanaka",
    avatar: "https://i.pravatar.cc/150?img=52",
    type: "missed",
    time: "2025-10-28 21:15",
  },
  {
    id: 4,
    name: "Sora Yamamoto",
    avatar: "https://i.pravatar.cc/150?img=53",
    type: "outgoing",
    time: "2025-10-27 20:50",
    duration: "41:10",
  },
  {
    id: 5,
    name: "Ren Kobayashi",
    avatar: "https://i.pravatar.cc/150?img=54",
    type: "incoming",
    time: "2025-10-27 19:30",
    duration: "29:55",
  },
  {
    id: 6,
    name: "Toma Inoue",
    avatar: "https://i.pravatar.cc/150?img=60",
    type: "missed",
    time: "2025-10-27 18:00",
  },
];

const LinePage = () => {
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
              LINE
              <SiLine className="text-[#00B900]" />
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
                icon={<SiLine />}
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
                              color: "#980000",
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
                              bgcolor: msg.incoming ? "#f3f4f6" : "#00B900",
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
                          bgcolor: "#d4edda",
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
                            bgcolor: "#00B900",
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
                          bgcolor: "#d1ecf1",
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
                            bgcolor: "#00B900",
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

export default LinePage;
