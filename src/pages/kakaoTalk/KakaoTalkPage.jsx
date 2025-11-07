import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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

// === Data with translation keys (avatars stay in code) ===
const chats = [
  {
    id: 1,
    nameKey: "minjun_kim",
    avatar: "https://i.pravatar.cc/150?img=62",
    lastMessageKey: "minjun_kim.lastMessage",
    time: "03:30",
    messages: [
      { textKey: "minjun_kim.message1", time: "03:10", incoming: true },
      { textKey: "minjun_kim.message2", time: "03:11", incoming: false },
      { textKey: "minjun_kim.message3", time: "03:30", incoming: false },
    ],
  },
  {
    id: 2,
    nameKey: "jaehyun_park",
    avatar: "https://i.pravatar.cc/150?img=63",
    lastMessageKey: "jaehyun_park.lastMessage",
    time: "01:55",
    messages: [
      { textKey: "jaehyun_park.message1", time: "01:40", incoming: true },
      { textKey: "jaehyun_park.message2", time: "01:41", incoming: false },
      { textKey: "jaehyun_park.message3", time: "01:55", incoming: false },
    ],
  },
  {
    id: 3,
    nameKey: "seojun_lee",
    avatar: "https://i.pravatar.cc/150?img=64",
    lastMessageKey: "seojun_lee.lastMessage",
    time: "00:20",
    messages: [
      { textKey: "seojun_lee.message1", time: "00:05", incoming: true },
      { textKey: "seojun_lee.message2", time: "00:06", incoming: false },
      { textKey: "seojun_lee.message3", time: "00:20", incoming: false },
    ],
  },
  {
    id: 4,
    nameKey: "dohyun_choi",
    avatar: "https://i.pravatar.cc/150?img=65",
    lastMessageKey: "dohyun_choi.lastMessage",
    time: "23:45",
    messages: [
      { textKey: "dohyun_choi.message1", time: "23:30", incoming: true },
      { textKey: "dohyun_choi.message2", time: "23:31", incoming: false },
      { textKey: "dohyun_choi.message3", time: "23:45", incoming: false },
    ],
  },
  {
    id: 5,
    nameKey: "yejun_jung",
    avatar: "https://i.pravatar.cc/150?img=66",
    lastMessageKey: "yejun_jung.lastMessage",
    time: "02:15",
    messages: [
      { textKey: "yejun_jung.message1", time: "02:00", incoming: true },
      { textKey: "yejun_jung.message2", time: "02:01", incoming: false },
      { textKey: "yejun_jung.message3", time: "02:15", incoming: false },
    ],
  },
  {
    id: 6,
    nameKey: "siwoo_kang",
    avatar: "https://i.pravatar.cc/150?img=67",
    lastMessageKey: "siwoo_kang.lastMessage",
    time: "21:50",
    messages: [
      { textKey: "siwoo_kang.message1", time: "21:30", incoming: true },
      { textKey: "siwoo_kang.message2", time: "21:31", incoming: false },
      { textKey: "siwoo_kang.message3", time: "21:32", incoming: true },
      { textKey: "siwoo_kang.message4", time: "21:50", incoming: false },
    ],
  },
  {
    id: 7,
    nameKey: "haneul_song",
    avatar: "https://i.pravatar.cc/150?img=68",
    lastMessageKey: "haneul_song.lastMessage",
    time: "20:10",
    messages: [
      { textKey: "haneul_song.message1", time: "19:55", incoming: true },
      { textKey: "haneul_song.message2", time: "19:56", incoming: false },
      { textKey: "haneul_song.message3", time: "19:57", incoming: true },
      { textKey: "haneul_song.message4", time: "20:10", incoming: false },
    ],
  },
  {
    id: 8,
    nameKey: "juwon_han",
    avatar: "https://i.pravatar.cc/150?img=69",
    lastMessageKey: "juwon_han.lastMessage",
    time: "04:05",
    messages: [
      { textKey: "juwon_han.message1", time: "03:50", incoming: true },
      { textKey: "juwon_han.message2", time: "03:51", incoming: false },
      { textKey: "juwon_han.message3", time: "03:52", incoming: true },
      { textKey: "juwon_han.message4", time: "04:05", incoming: false },
    ],
  },
  {
    id: 9,
    nameKey: "eunwoo_shin",
    avatar: "https://i.pravatar.cc/150?img=70",
    lastMessageKey: "eunwoo_shin.lastMessage",
    time: "01:30",
    messages: [
      { textKey: "eunwoo_shin.message1", time: "01:15", incoming: true },
      { textKey: "eunwoo_shin.message2", time: "01:16", incoming: false },
      { textKey: "eunwoo_shin.message3", time: "01:17", incoming: true },
      { textKey: "eunwoo_shin.message4", time: "01:30", incoming: false },
    ],
  },
  {
    id: 10,
    nameKey: "taeyang_yoon",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessageKey: "taeyang_yoon.lastMessage",
    time: "00:40",
    messages: [
      { textKey: "taeyang_yoon.message1", time: "00:25", incoming: true },
      { textKey: "taeyang_yoon.message2", time: "00:26", incoming: false },
      { textKey: "taeyang_yoon.message3", time: "00:27", incoming: true },
      { textKey: "taeyang_yoon.message4", time: "00:40", incoming: false },
    ],
  },
  {
    id: 11,
    nameKey: "jihoon_baek",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessageKey: "jihoon_baek.lastMessage",
    time: "05:00",
    messages: [
      { textKey: "jihoon_baek.message1", time: "04:40", incoming: true },
      { textKey: "jihoon_baek.message2", time: "04:41", incoming: false },
      { textKey: "jihoon_baek.message3", time: "05:00", incoming: false },
    ],
  },
  {
    id: 12,
    nameKey: "woojin_oh",
    avatar: "https://i.pravatar.cc/150?img=3",
    lastMessageKey: "woojin_oh.lastMessage",
    time: "22:20",
    messages: [
      { textKey: "woojin_oh.message1", time: "22:05", incoming: true },
      { textKey: "woojin_oh.message2", time: "22:06", incoming: false },
      { textKey: "woojin_oh.message3", time: "22:07", incoming: true },
      { textKey: "woojin_oh.message4", time: "22:20", incoming: false },
    ],
  },
];

// === Friends (derived from chats) ===
const friends = [
  ...chats.map((c) => ({
    id: c.id,
    nameKey: c.nameKey,
    avatar: c.avatar,
    phone: `+82 10-${String(1000 + c.id).padStart(4, "0")}`,
    email: `${c.nameKey.split("_")[0].toLowerCase()}@kakao.com`,
  })),
];

// === Call Logs ===
const callLogs = [
  {
    id: 1,
    nameKey: "minjun_kim",
    avatar: "https://i.pravatar.cc/150?img=62",
    type: "outgoing",
    time: "2025-10-28 23:55",
    duration: "17:40",
  },
  {
    id: 2,
    nameKey: "jaehyun_park",
    avatar: "https://i.pravatar.cc/150?img=63",
    type: "incoming",
    time: "2025-10-28 22:30",
    duration: "11:20",
  },
  {
    id: 3,
    nameKey: "seojun_lee",
    avatar: "https://i.pravatar.cc/150?img=64",
    type: "missed",
    time: "2025-10-28 21:10",
  },
  {
    id: 4,
    nameKey: "dohyun_choi",
    avatar: "https://i.pravatar.cc/150?img=65",
    type: "outgoing",
    time: "2025-10-27 20:45",
    duration: "33:15",
  },
  {
    id: 5,
    nameKey: "yejun_jung",
    avatar: "https://i.pravatar.cc/150?img=66",
    type: "incoming",
    time: "2025-10-27 19:20",
    duration: "28:50",
  },
  {
    id: 6,
    nameKey: "jihoon_baek",
    avatar: "https://i.pravatar.cc/150?img=2",
    type: "missed",
    time: "2025-10-27 18:00",
  },
];

const KakaoTalkPage = () => {
  const { t } = useTranslation();
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
      const letter = t(
        `dmkaks.friends_list.${f.nameKey}.name`
      )[0].toUpperCase();
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
              {t("dmkaks.header.title")}
              <SiKakaotalk className="text-[#524a04] drop-shadow-md" />
            </h1>
          </div>
          <BindPhone />
        </div>
      </header>

      <Box sx={{ bgcolor: "#fafafa", p: { xs: 2, sm: 3, md: 4 } }}>
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
              aria-label={t("dmkaks.tabs.aria_label")}
            >
              <Tab
                icon={<SiKakaotalk className="text-[#524a04]" />}
                iconPosition="start"
                label={isMobile ? "" : t("dmkaks.tabs.chat")}
                value="chat"
                aria-label={t("dmkaks.tabs.chat_aria")}
              />
              <Tab
                icon={<FiUsers />}
                iconPosition="start"
                label={isMobile ? "" : t("dmkaks.tabs.friends")}
                value="friends"
                aria-label={t("dmkaks.tabs.friends_aria")}
              />
              <Tab
                icon={<FiPhone />}
                iconPosition="start"
                label={isMobile ? "" : t("dmkaks.tabs.calls")}
                value="calls"
                aria-label={t("dmkaks.tabs.calls_aria")}
              />
            </Tabs>
          )}

          {/* Back Button */}
          {showDetail && (
            <Box sx={{ mb: 2 }}>
              <IconButton
                onClick={handleBack}
                sx={{ color: "#3C1E1E" }}
                aria-label={t("dmkaks.back_button_aria")}
              >
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
            {/* Left Panel */}
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
                <Stack aria-label={t("dmkaks.chat.list_aria")}>
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
                      aria-label={t("dmkaks.chat.item_aria", {
                        name: t(`dmkaks.chats.${chat.nameKey}.name`),
                      })}
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
                            {t(`dmkaks.chats.${chat.nameKey}.name`)}
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
                            {t(`dmkaks.chats.${chat.lastMessageKey}`)}
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
                <Stack aria-label={t("dmkaks.friends.list_aria")}>
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
                            aria-label={t("dmkaks.friends.item_aria", {
                              name: t(
                                `dmkaks.friends_list.${friend.nameKey}.name`
                              ),
                            })}
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
                                {t(
                                  `dmkaks.friends_list.${friend.nameKey}.name`
                                )}
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
                <Stack aria-label={t("dmkaks.call_log.list_aria")}>
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
                      aria-label={t("dmkaks.call_log.item_aria", {
                        name: t(`dmkaks.call_logs.${call.nameKey}.name`),
                      })}
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
                            {t(`dmkaks.call_logs.${call.nameKey}.name`)}
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
                            {t(`dmkaks.call_log.types.${call.type}`)}
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

            {/* Right Panel – Details */}
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
                  <Stack
                    spacing={3}
                    aria-label={t("dmkaks.chat.detail_aria", {
                      name: t(`dmkaks.chats.${selectedChat.nameKey}.name`),
                    })}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        src={selectedChat.avatar}
                        sx={{ width: 64, height: 64 }}
                      />
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, color: "#1f2937" }}
                      >
                        {t(`dmkaks.chats.${selectedChat.nameKey}.name`)}
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
                              {t(`dmkaks.chats.${msg.textKey}`)}
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
                  <Stack
                    spacing={4}
                    alignItems="center"
                    aria-label={t("dmkaks.friends.detail_aria", {
                      name: t(
                        `dmkaks.friends_list.${selectedFriend.nameKey}.name`
                      ),
                    })}
                  >
                    <Avatar
                      src={selectedFriend.avatar}
                      sx={{ width: 120, height: 120 }}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "#1f2937" }}
                    >
                      {t(`dmkaks.friends_list.${selectedFriend.nameKey}.name`)}
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
                            {t("dmkaks.friends.phone_label")}
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
                            {t("dmkaks.friends.email_label")}
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
                  <Stack
                    spacing={4}
                    alignItems="center"
                    aria-label={t("dmkaks.call_log.detail_aria", {
                      name: t(`dmkaks.call_logs.${selectedCall.nameKey}.name`),
                    })}
                  >
                    <Avatar
                      src={selectedCall.avatar}
                      sx={{ width: 120, height: 120 }}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "#1f2937" }}
                    >
                      {t(`dmkaks.call_logs.${selectedCall.nameKey}.name`)}
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
                          {t(`dmkaks.call_log.types.${selectedCall.type}`)}
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
