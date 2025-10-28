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
import { SiWechat } from "react-icons/si";

// WeChat Light Mode Theme (Green)
const theme = createTheme({
  palette: {
    primary: {
      main: "#07C160", // WeChat Green
      light: "#34D881",
      dark: "#05A050",
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
            color: "#07C160",
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
    name: "Li Wei",
    avatar: "https://i.pravatar.cc/150?img=64",
    lastMessage: "我在你楼下",
    time: "03:30",
    messages: [
      { text: "你睡了吗？", time: "03:15", incoming: true },
      { text: "还没", time: "03:16", incoming: false },
      { text: "我在你楼下", time: "03:30", incoming: false },
    ],
  },
  {
    id: 2,
    name: "Zhang Hao",
    avatar: "https://i.pravatar.cc/150?img=65",
    lastMessage: "她完全不知道",
    time: "02:10",
    messages: [
      { text: "刚才太险了", time: "01:55", incoming: true },
      { text: "但我们安全了", time: "01:56", incoming: false },
      { text: "她完全不知道", time: "02:10", incoming: false },
    ],
  },
  {
    id: 3,
    name: "Wang Jun",
    avatar: "https://i.pravatar.cc/150?img=66",
    lastMessage: "再发一次照片",
    time: "01:20",
    messages: [
      { text: "你删了？", time: "01:05", incoming: true },
      { text: "必须删，太危险", time: "01:06", incoming: false },
      { text: "再发一次照片", time: "01:20", incoming: false },
    ],
  },
  {
    id: 4,
    name: "Chen Ming",
    avatar: "https://i.pravatar.cc/150?img=67",
    lastMessage: "我在你房间",
    time: "00:35",
    messages: [
      { text: "你在家吗？", time: "00:20", incoming: true },
      { text: "她睡了，门没锁", time: "00:21", incoming: false },
      { text: "我在你房间", time: "00:35", incoming: false },
    ],
  },
  {
    id: 5,
    name: "Liu Yang",
    avatar: "https://i.pravatar.cc/150?img=68",
    lastMessage: "我为你着迷",
    time: "04:00",
    messages: [
      { text: "我一刻都离不开你", time: "03:45", incoming: true },
      { text: "我也是", time: "03:46", incoming: false },
      { text: "我为你着迷", time: "04:00", incoming: false },
    ],
  },
  {
    id: 6,
    name: "Zhao Kai",
    avatar: "https://i.pravatar.cc/150?img=69",
    lastMessage: "我说我在加班",
    time: "22:50",
    messages: [
      { text: "你在哪？", time: "22:30", incoming: true },
      { text: "加班，不能接电话", time: "22:31", incoming: false },
      { text: "骗子", time: "22:32", incoming: true },
      { text: "我说我在加班", time: "22:50", incoming: false },
    ],
  },
  {
    id: 7,
    name: "Xu Lei",
    avatar: "https://i.pravatar.cc/150?img=70",
    lastMessage: "我们不能再这样了",
    time: "21:15",
    messages: [
      { text: "我们说好这是最后一次", time: "21:00", incoming: true },
      { text: "我知道", time: "21:01", incoming: false },
      { text: "那我为什么还在这？", time: "21:02", incoming: true },
      { text: "我们不能再这样了", time: "21:15", incoming: false },
    ],
  },
  {
    id: 8,
    name: "Sun Tao",
    avatar: "https://i.pravatar.cc/150?img=71",
    lastMessage: "我每晚都梦到你",
    time: "05:05",
    messages: [
      { text: "你睡了吗？", time: "04:50", incoming: true },
      { text: "没，你呢？", time: "04:51", incoming: false },
      { text: "在想你", time: "04:52", incoming: true },
      { text: "我每晚都梦到你", time: "05:05", incoming: false },
    ],
  },
  {
    id: 9,
    name: "Ma Bo",
    avatar: "https://i.pravatar.cc/150?img=72",
    lastMessage: "看完就删",
    time: "02:30",
    messages: [
      { text: "昨晚的事我停不下来", time: "02:15", incoming: true },
      { text: "你做的那个...", time: "02:16", incoming: false },
      { text: "嘘，别打出来", time: "02:17", incoming: true },
      { text: "看完就删", time: "02:30", incoming: false },
    ],
  },
  {
    id: 10,
    name: "Feng Rui",
    avatar: "https://i.pravatar.cc/150?img=73",
    lastMessage: "我爱上你了",
    time: "01:45",
    messages: [
      { text: "这越来越严重了", time: "01:30", incoming: true },
      { text: "我知道", time: "01:31", incoming: false },
      { text: "但我不想停", time: "01:32", incoming: true },
      { text: "我爱上你了", time: "01:45", incoming: false },
    ],
  },
  {
    id: 11,
    name: "Deng Yu",
    avatar: "https://i.pravatar.cc/150?img=74",
    lastMessage: "你的味道还在",
    time: "06:00",
    messages: [
      { text: "我还能闻到你", time: "05:40", incoming: true },
      { text: "很好", time: "05:41", incoming: false },
      { text: "你的味道还在", time: "06:00", incoming: false },
    ],
  },
  {
    id: 12,
    name: "Hu Jie",
    avatar: "https://i.pravatar.cc/150?img=75",
    lastMessage: "我为你在她面前撒谎",
    time: "23:00",
    messages: [
      { text: "她问我去哪了", time: "22:45", incoming: true },
      { text: "你怎么说？", time: "22:46", incoming: false },
      { text: "跟你在一起", time: "22:47", incoming: true },
      { text: "我为你在她面前撒谎", time: "23:00", incoming: false },
    ],
  },
];

// === Contacts (WeChat uses "Contacts") ===
const contacts = [
  ...chats.map((c) => ({
    id: c.id,
    name: c.name,
    avatar: c.avatar,
    phone: `+86 1${String(380 + c.id).padStart(2, "0")}0 1234567`,
    email: `${c.name.split(" ")[0].toLowerCase()}@wechat.com`,
  })),
];

// === Call Logs ===
const callLogs = [
  {
    id: 1,
    name: "Li Wei",
    avatar: "https://i.pravatar.cc/150?img=64",
    type: "outgoing",
    time: "2025-10-28 23:55",
    duration: "18:30",
  },
  {
    id: 2,
    name: "Zhang Hao",
    avatar: "https://i.pravatar.cc/150?img=65",
    type: "incoming",
    time: "2025-10-28 22:40",
    duration: "14:20",
  },
  {
    id: 3,
    name: "Wang Jun",
    avatar: "https://i.pravatar.cc/150?img=66",
    type: "missed",
    time: "2025-10-28 21:20",
  },
  {
    id: 4,
    name: "Chen Ming",
    avatar: "https://i.pravatar.cc/150?img=67",
    type: "outgoing",
    time: "2025-10-27 20:55",
    duration: "37:10",
  },
  {
    id: 5,
    name: "Liu Yang",
    avatar: "https://i.pravatar.cc/150?img=68",
    type: "incoming",
    time: "2025-10-27 19:30",
    duration: "31:45",
  },
  {
    id: 6,
    name: "Deng Yu",
    avatar: "https://i.pravatar.cc/150?img=74",
    type: "missed",
    time: "2025-10-27 18:00",
  },
];

const WechatPage = () => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const [tab, setTab] = useState("chat");
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedCall, setSelectedCall] = useState(null);

  const handleBack = () => {
    setSelectedChat(null);
    setSelectedContact(null);
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

  const groupContactsByLetter = () => {
    const grouped = {};
    contacts.forEach((c) => {
      const letter = c.name[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(c);
    });
    return grouped;
  };

  const showDetail = selectedChat || selectedContact || selectedCall;

  return (
    <ThemeProvider theme={theme}>
      <header className="!mb-4 sm:!mb-6 !px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
          <div className="flex items-center !gap-2 sm:!gap-3">
            <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
              WeChat
              <SiWechat className="text-[#07C160]" />
            </h1>
          </div>
          <BindPhone />
        </div>
      </header>

      <Box
        sx={{
          minHeight: "100vh",
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
                icon={<SiWechat />}
                iconPosition="start"
                label={isMobile ? "" : "Chats"}
                value="chat"
              />
              <Tab
                icon={<FiUsers />}
                iconPosition="start"
                label={isMobile ? "" : "Contacts"}
                value="contacts"
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

              {/* Contacts List */}
              {tab === "contacts" && (
                <Stack>
                  {Object.keys(groupContactsByLetter())
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
                        {groupContactsByLetter()[letter].map((contact) => (
                          <Box
                            key={contact.id}
                            sx={{
                              p: 2,
                              cursor: "pointer",
                              "&:hover": { bgcolor: "rgba(0,0,0,0.02)" },
                              transition: "background 0.2s",
                            }}
                            onClick={() => setSelectedContact(contact)}
                          >
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                            >
                              <Avatar
                                src={contact.avatar}
                                sx={{ width: 48, height: 48 }}
                              />
                              <Typography
                                sx={{ fontWeight: 500, color: "#1f2937" }}
                              >
                                {contact.name}
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
                              bgcolor: msg.incoming ? "#f3f4f6" : "#07C160",
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

                {/* Contact Detail */}
                {selectedContact && (
                  <Stack spacing={4} alignItems="center">
                    <Avatar
                      src={selectedContact.avatar}
                      sx={{ width: 120, height: 120 }}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "#1f2937" }}
                    >
                      {selectedContact.name}
                    </Typography>

                    {selectedContact.phone && (
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: "#C8E6C9",
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
                            bgcolor: "#07C160",
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
                            {selectedContact.phone}
                          </Typography>
                        </Box>
                      </Paper>
                    )}

                    {selectedContact.email && (
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: "#A5D6A7",
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
                            bgcolor: "#07C160",
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
                            {selectedContact.email}
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

export default WechatPage;
