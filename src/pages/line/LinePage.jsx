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
    name: "kai_nakamura",
    avatar: "https://i.pravatar.cc/150?img=50",
    lastMessage: "dmline.chats.kai_nakamura.lastMessage",
    time: "02:41",
    messages: [
      {
        text: "dmline.chats.kai_nakamura.messages.msg1",
        time: "02:30",
        incoming: true,
      },
      {
        text: "dmline.chats.kai_nakamura.messages.msg2",
        time: "02:31",
        incoming: false,
      },
      {
        text: "dmline.chats.kai_nakamura.messages.msg3",
        time: "02:32",
        incoming: true,
      },
      {
        text: "dmline.chats.kai_nakamura.messages.msg4",
        time: "02:41",
        incoming: false,
      },
    ],
  },
  {
    id: 2,
    name: "riku_sato",
    avatar: "https://i.pravatar.cc/150?img=51",
    lastMessage: "dmline.chats.riku_sato.lastMessage",
    time: "01:15",
    messages: [
      {
        text: "dmline.chats.riku_sato.messages.msg1",
        time: "01:00",
        incoming: true,
      },
      {
        text: "dmline.chats.riku_sato.messages.msg2",
        time: "01:01",
        incoming: false,
      },
      {
        text: "dmline.chats.riku_sato.messages.msg3",
        time: "01:02",
        incoming: true,
      },
      {
        text: "dmline.chats.riku_sato.messages.msg4",
        time: "01:15",
        incoming: false,
      },
    ],
  },
  {
    id: 3,
    name: "haruto_tanaka",
    avatar: "https://i.pravatar.cc/150?img=52",
    lastMessage: "dmline.chats.haruto_tanaka.lastMessage",
    time: "23:58",
    messages: [
      {
        text: "dmline.chats.haruto_tanaka.messages.msg1",
        time: "23:45",
        incoming: true,
      },
      {
        text: "dmline.chats.haruto_tanaka.messages.msg2",
        time: "23:46",
        incoming: false,
      },
      {
        text: "dmline.chats.haruto_tanaka.messages.msg3",
        time: "23:47",
        incoming: true,
      },
      {
        text: "dmline.chats.haruto_tanaka.messages.msg4",
        time: "23:58",
        incoming: false,
      },
    ],
  },
  {
    id: 4,
    name: "sora_yamamoto",
    avatar: "https://i.pravatar.cc/150?img=53",
    lastMessage: "dmline.chats.sora_yamamoto.lastMessage",
    time: "22:30",
    messages: [
      {
        text: "dmline.chats.sora_yamamoto.messages.msg1",
        time: "22:10",
        incoming: true,
      },
      {
        text: "dmline.chats.sora_yamamoto.messages.msg2",
        time: "22:11",
        incoming: false,
      },
      {
        text: "dmline.chats.sora_yamamoto.messages.msg3",
        time: "22:12",
        incoming: true,
      },
      {
        text: "dmline.chats.sora_yamamoto.messages.msg4",
        time: "22:30",
        incoming: false,
      },
    ],
  },
  {
    id: 5,
    name: "ren_kobayashi",
    avatar: "https://i.pravatar.cc/150?img=54",
    lastMessage: "dmline.chats.ren_kobayashi.lastMessage",
    time: "03:20",
    messages: [
      {
        text: "dmline.chats.ren_kobayashi.messages.msg1",
        time: "03:00",
        incoming: true,
      },
      {
        text: "dmline.chats.ren_kobayashi.messages.msg2",
        time: "03:01",
        incoming: false,
      },
      {
        text: "dmline.chats.ren_kobayashi.messages.msg3",
        time: "03:02",
        incoming: true,
      },
      {
        text: "dmline.chats.ren_kobayashi.messages.msg4",
        time: "03:20",
        incoming: false,
      },
    ],
  },
  {
    id: 6,
    name: "yuto_ikeda",
    avatar: "https://i.pravatar.cc/150?img=55",
    lastMessage: "dmline.chats.yuto_ikeda.lastMessage",
    time: "00:45",
    messages: [
      {
        text: "dmline.chats.yuto_ikeda.messages.msg1",
        time: "00:30",
        incoming: true,
      },
      {
        text: "dmline.chats.yuto_ikeda.messages.msg2",
        time: "00:31",
        incoming: false,
      },
      {
        text: "dmline.chats.yuto_ikeda.messages.msg3",
        time: "00:45",
        incoming: false,
      },
    ],
  },
  {
    id: 7,
    name: "daichi_fujimoto",
    avatar: "https://i.pravatar.cc/150?img=56",
    lastMessage: "dmline.chats.daichi_fujimoto.lastMessage",
    time: "21:10",
    messages: [
      {
        text: "dmline.chats.daichi_fujimoto.messages.msg1",
        time: "20:55",
        incoming: true,
      },
      {
        text: "dmline.chats.daichi_fujimoto.messages.msg2",
        time: "20:56",
        incoming: false,
      },
      {
        text: "dmline.chats.daichi_fujimoto.messages.msg3",
        time: "20:57",
        incoming: true,
      },
      {
        text: "dmline.chats.daichi_fujimoto.messages.msg4",
        time: "21:10",
        incoming: false,
      },
    ],
  },
  {
    id: 8,
    name: "kaito_mori",
    avatar: "https://i.pravatar.cc/150?img=57",
    lastMessage: "dmline.chats.kaito_mori.lastMessage",
    time: "19:40",
    messages: [
      {
        text: "dmline.chats.kaito_mori.messages.msg1",
        time: "19:20",
        incoming: true,
      },
      {
        text: "dmline.chats.kaito_mori.messages.msg2",
        time: "19:21",
        incoming: false,
      },
      {
        text: "dmline.chats.kaito_mori.messages.msg3",
        time: "19:22",
        incoming: true,
      },
      {
        text: "dmline.chats.kaito_mori.messages.msg4",
        time: "19:40",
        incoming: false,
      },
    ],
  },
  {
    id: 9,
    name: "shota_okada",
    avatar: "https://i.pravatar.cc/150?img=58",
    lastMessage: "dmline.chats.shota_okada.lastMessage",
    time: "02:05",
    messages: [
      {
        text: "dmline.chats.shota_okada.messages.msg1",
        time: "01:50",
        incoming: true,
      },
      {
        text: "dmline.chats.shota_okada.messages.msg2",
        time: "01:51",
        incoming: false,
      },
      {
        text: "dmline.chats.shota_okada.messages.msg3",
        time: "01:52",
        incoming: true,
      },
      {
        text: "dmline.chats.shota_okada.messages.msg4",
        time: "02:05",
        incoming: false,
      },
    ],
  },
  {
    id: 10,
    name: "ryo_hashimoto",
    avatar: "https://i.pravatar.cc/150?img=59",
    lastMessage: "dmline.chats.ryo_hashimoto.lastMessage",
    time: "00:10",
    messages: [
      {
        text: "dmline.chats.ryo_hashimoto.messages.msg1",
        time: "23:55",
        incoming: true,
      },
      {
        text: "dmline.chats.ryo_hashimoto.messages.msg2",
        time: "23:56",
        incoming: false,
      },
      {
        text: "dmline.chats.ryo_hashimoto.messages.msg3",
        time: "23:57",
        incoming: true,
      },
      {
        text: "dmline.chats.ryo_hashimoto.messages.msg4",
        time: "00:10",
        incoming: false,
      },
    ],
  },
  {
    id: 11,
    name: "toma_inoue",
    avatar: "https://i.pravatar.cc/150?img=60",
    lastMessage: "dmline.chats.toma_inoue.lastMessage",
    time: "04:30",
    messages: [
      {
        text: "dmline.chats.toma_inoue.messages.msg1",
        time: "04:10",
        incoming: true,
      },
      {
        text: "dmline.chats.toma_inoue.messages.msg2",
        time: "04:11",
        incoming: false,
      },
      {
        text: "dmline.chats.toma_inoue.messages.msg3",
        time: "04:30",
        incoming: false,
      },
    ],
  },
  {
    id: 12,
    name: "yuki_arai",
    avatar: "https://i.pravatar.cc/150?img=61",
    lastMessage: "dmline.chats.yuki_arai.lastMessage",
    time: "22:00",
    messages: [
      {
        text: "dmline.chats.yuki_arai.messages.msg1",
        time: "21:45",
        incoming: true,
      },
      {
        text: "dmline.chats.yuki_arai.messages.msg2",
        time: "21:46",
        incoming: false,
      },
      {
        text: "dmline.chats.yuki_arai.messages.msg3",
        time: "21:47",
        incoming: true,
      },
      {
        text: "dmline.chats.yuki_arai.messages.msg4",
        time: "22:00",
        incoming: false,
      },
    ],
  },
];

// === Friends (LINE uses "Friends") ===
const friends = [
  ...chats.map((c) => ({
    id: c.id,
    name: c.name,
    avatar: c.avatar,
    phone: `dmline.contacts.${c.name}.phone`,
    email: `dmline.contacts.${c.name}.email`,
  })),
];

// === Call Logs ===
const callLogs = [
  {
    id: 1,
    name: "kai_nakamura",
    avatar: "https://i.pravatar.cc/150?img=50",
    type: "dmline.call_log.kai_nakamura.type",
    time: "2025-10-28 23:45",
    duration: "19:30",
  },
  {
    id: 2,
    name: "riku_sato",
    avatar: "https://i.pravatar.cc/150?img=51",
    type: "dmline.call_log.riku_sato.type",
    time: "2025-10-28 22:20",
    duration: "12:45",
  },
  {
    id: 3,
    name: "haruto_tanaka",
    avatar: "https://i.pravatar.cc/150?img=52",
    type: "dmline.call_log.haruto_tanaka.type",
    time: "2025-10-28 21:15",
  },
  {
    id: 4,
    name: "sora_yamamoto",
    avatar: "https://i.pravatar.cc/150?img=53",
    type: "dmline.call_log.sora_yamamoto.type",
    time: "2025-10-27 20:50",
    duration: "41:10",
  },
  {
    id: 5,
    name: "ren_kobayashi",
    avatar: "https://i.pravatar.cc/150?img=54",
    type: "dmline.call_log.ren_kobayashi.type",
    time: "2025-10-27 19:30",
    duration: "29:55",
  },
  {
    id: 6,
    name: "toma_inoue",
    avatar: "https://i.pravatar.cc/150?img=60",
    type: "dmline.call_log.toma_inoue.type",
    time: "2025-10-27 18:00",
  },
];

const LinePage = () => {
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
    const iconColor = t(type).includes("incoming")
      ? "#10B981"
      : t(type).includes("outgoing")
      ? "#0B5CFF"
      : "#EF4444";
    return (
      <Box sx={{ color: iconColor }}>
        {t(type).includes("outgoing") && (
          <FiPhoneCall style={{ fontSize: 16 }} />
        )}
        {t(type).includes("incoming") && (
          <FiPhoneIncoming style={{ fontSize: 16 }} />
        )}
        {t(type).includes("missed") && (
          <FiPhoneMissed style={{ fontSize: 16 }} />
        )}
      </Box>
    );
  };

  const groupFriendsByLetter = () => {
    const grouped = {};
    friends.forEach((f) => {
      const letter = t(`dmline.contacts.${f.name}.name`)[0].toUpperCase();
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
              {t("dmline.header.title")}
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
              aria-label={t("dmline.tabs.aria_label")}
            >
              <Tab
                icon={<SiLine />}
                iconPosition="start"
                label={isMobile ? "" : t("dmline.tabs.chat")}
                value="chat"
                aria-label={t("dmline.tabs.chat_aria")}
              />
              <Tab
                icon={<FiUsers />}
                iconPosition="start"
                label={isMobile ? "" : t("dmline.tabs.friends")}
                value="friends"
                aria-label={t("dmline.tabs.friends_aria")}
              />
              <Tab
                icon={<FiPhone />}
                iconPosition="start"
                value="calls"
                label={isMobile ? "" : t("dmline.tabs.calls")}
                aria-label={t("dmline.tabs.calls_aria")}
              />
            </Tabs>
          )}

          {/* Back Button */}
          {showDetail && (
            <Box sx={{ mb: 2 }}>
              <IconButton
                onClick={handleBack}
                sx={{ color: "primary.main" }}
                aria-label={t("dmline.back_button_aria")}
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
                <Stack aria-label={t("dmline.chat.list_aria")}>
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
                      aria-label={t("dmline.chat.item_aria", {
                        name: t(`dmline.chats.${chat.name}.name`),
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
                            {t(`dmline.chats.${chat.name}.name`)}
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
                            {t(chat.lastMessage)}
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
                <Stack aria-label={t("dmline.contacts.list_aria")}>
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
                            aria-label={t("dmline.contacts.item_aria", {
                              name: t(`dmline.contacts.${friend.name}.name`),
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
                                {t(`dmline.contacts.${friend.name}.name`)}
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
                <Stack aria-label={t("dmline.call_log.list_aria")}>
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
                      aria-label={t("dmline.call_log.item_aria", {
                        name: t(`dmline.call_log.${call.name}.name`),
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
                            {t(`dmline.call_log.${call.name}.name`)}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.875rem",
                              color: t(call.type).includes("incoming")
                                ? "#10B981"
                                : t(call.type).includes("outgoing")
                                ? "#0B5CFF"
                                : "#EF4444",
                            }}
                          >
                            {t(call.type)}
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
                  <Stack
                    spacing={3}
                    aria-label={t("dmline.chat.detail_aria", {
                      name: t(`dmline.chats.${selectedChat.name}.name`),
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
                        {t(`dmline.chats.${selectedChat.name}.name`)}
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
                              {t(msg.text)}
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
                  <Stack
                    spacing={4}
                    alignItems="center"
                    aria-label={t("dmline.contacts.detail_aria", {
                      name: t(`dmline.contacts.${selectedFriend.name}.name`),
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
                      {t(`dmline.contacts.${selectedFriend.name}.name`)}
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
                            {t("dmline.contacts.phone_label")}
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 600, color: "#1f2937" }}
                          >
                            {t(selectedFriend.phone)}
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
                            {t("dmline.contacts.email_label")}
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 600, color: "#1f2937" }}
                          >
                            {t(selectedFriend.email)}
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
                    aria-label={t("dmline.call_log.detail_aria", {
                      name: t(`dmline.call_log.${selectedCall.name}.name`),
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
                      {t(`dmline.call_log.${selectedCall.name}.name`)}
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
                          {selectedCall.duration} • {t(selectedCall.type)}
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
