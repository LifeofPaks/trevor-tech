"use client";

import { useState } from "react";
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
    success: { main: "#10B981" },
    error: { main: "#EF4444" },
    info: { main: "#0B5CFF" },
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

const chats = [
  {
    id: 1,
    nameKey: "dmzoom.chats.ava_chen.name",
    avatar: "https://i.pravatar.cc/150?img=27",
    lastMessageKey: "dmzoom.chats.ava_chen.lastMessage",
    time: "00:42",
    messages: [
      {
        textKey: "dmzoom.chats.ava_chen.messages.msg1.text",
        time: "00:30",
        incoming: true,
      },
      {
        textKey: "dmzoom.chats.ava_chen.messages.msg2.text",
        time: "00:31",
        incoming: false,
      },
      {
        textKey: "dmzoom.chats.ava_chen.messages.msg3.text",
        time: "00:32",
        incoming: true,
      },
      {
        textKey: "dmzoom.chats.ava_chen.messages.msg4.text",
        time: "00:42",
        incoming: false,
      },
    ],
  },
  {
    id: 2,
    nameKey: "dmzoom.chats.liam_park.name",
    avatar: "https://i.pravatar.cc/150?img=32",
    lastMessageKey: "dmzoom.chats.liam_park.lastMessage",
    time: "23:15",
    messages: [
      {
        textKey: "dmzoom.chats.liam_park.messages.msg1.text",
        time: "23:00",
        incoming: true,
      },
      {
        textKey: "dmzoom.chats.liam_park.messages.msg2.text",
        time: "23:01",
        incoming: false,
      },
      {
        textKey: "dmzoom.chats.liam_park.messages.msg3.text",
        time: "23:02",
        incoming: true,
      },
      {
        textKey: "dmzoom.chats.liam_park.messages.msg4.text",
        time: "23:15",
        incoming: false,
      },
    ],
  },
  {
    id: 3,
    nameKey: "dmzoom.chats.zoe_kim.name",
    avatar: "https://i.pravatar.cc/150?img=25",
    lastMessageKey: "dmzoom.chats.zoe_kim.lastMessage",
    time: "22:10",
    messages: [
      {
        textKey: "dmzoom.chats.zoe_kim.messages.msg1.text",
        time: "22:00",
        incoming: true,
      },
      {
        textKey: "dmzoom.chats.zoe_kim.messages.msg2.text",
        time: "22:01",
        incoming: false,
      },
      {
        textKey: "dmzoom.chats.zoe_kim.messages.msg3.text",
        time: "22:02",
        incoming: true,
      },
      {
        textKey: "dmzoom.chats.zoe_kim.messages.msg4.text",
        time: "22:10",
        incoming: false,
      },
    ],
  },
  {
    id: 4,
    nameKey: "dmzoom.chats.ethan_brooks.name",
    avatar: "https://i.pravatar.cc/150?img=30",
    lastMessageKey: "dmzoom.chats.ethan_brooks.lastMessage",
    time: "21:45",
    messages: [
      {
        textKey: "dmzoom.chats.ethan_brooks.messages.msg1.text",
        time: "21:30",
        incoming: true,
      },
      {
        textKey: "dmzoom.chats.ethan_brooks.messages.msg2.text",
        time: "21:31",
        incoming: false,
      },
      {
        textKey: "dmzoom.chats.ethan_brooks.messages.msg3.text",
        time: "21:32",
        incoming: true,
      },
      {
        textKey: "dmzoom.chats.ethan_brooks.messages.msg4.text",
        time: "21:45",
        incoming: false,
      },
    ],
  },
  {
    id: 5,
    nameKey: "dmzoom.chats.maya_wu.name",
    avatar: "https://i.pravatar.cc/150?img=26",
    lastMessageKey: "dmzoom.chats.maya_wu.lastMessage",
    time: "02:20",
    messages: [
      {
        textKey: "dmzoom.chats.maya_wu.messages.msg1.text",
        time: "02:10",
        incoming: true,
      },
      {
        textKey: "dmzoom.chats.maya_wu.messages.msg2.text",
        time: "02:11",
        incoming: false,
      },
      {
        textKey: "dmzoom.chats.maya_wu.messages.msg3.text",
        time: "02:12",
        incoming: true,
      },
      {
        textKey: "dmzoom.chats.maya_wu.messages.msg4.text",
        time: "02:20",
        incoming: false,
      },
    ],
  },
  {
    id: 6,
    nameKey: "dmzoom.chats.noah_lee.name",
    avatar: "https://i.pravatar.cc/150?img=31",
    lastMessageKey: "dmzoom.chats.noah_lee.lastMessage",
    time: "19:50",
    messages: [
      {
        textKey: "dmzoom.chats.noah_lee.messages.msg1.text",
        time: "19:40",
        incoming: true,
      },
      {
        textKey: "dmzoom.chats.noah_lee.messages.msg2.text",
        time: "19:41",
        incoming: false,
      },
      {
        textKey: "dmzoom.chats.noah_lee.messages.msg3.text",
        time: "19:42",
        incoming: true,
      },
      {
        textKey: "dmzoom.chats.noah_lee.messages.msg4.text",
        time: "19:50",
        incoming: false,
      },
    ],
  },
  {
    id: 7,
    nameKey: "dmzoom.chats.isabella_zhang.name",
    avatar: "https://i.pravatar.cc/150?img=28",
    lastMessageKey: "dmzoom.chats.isabella_zhang.lastMessage",
    time: "18:30",
    messages: [
      {
        textKey: "dmzoom.chats.isabella_zhang.messages.msg1.text",
        time: "18:20",
        incoming: true,
      },
      {
        textKey: "dmzoom.chats.isabella_zhang.messages.msg2.text",
        time: "18:21",
        incoming: false,
      },
      {
        textKey: "dmzoom.chats.isabella_zhang.messages.msg3.text",
        time: "18:22",
        incoming: true,
      },
      {
        textKey: "dmzoom.chats.isabella_zhang.messages.msg4.text",
        time: "18:30",
        incoming: false,
      },
    ],
  },
  {
    id: 8,
    nameKey: "dmzoom.chats.dylan_kim.name",
    avatar: "https://i.pravatar.cc/150?img=33",
    lastMessageKey: "dmzoom.chats.dylan_kim.lastMessage",
    time: "01:15",
    messages: [
      {
        textKey: "dmzoom.chats.dylan_kim.messages.msg1.text",
        time: "01:00",
        incoming: true,
      },
      {
        textKey: "dmzoom.chats.dylan_kim.messages.msg2.text",
        time: "01:01",
        incoming: false,
      },
      {
        textKey: "dmzoom.chats.dylan_kim.messages.msg3.text",
        time: "01:02",
        incoming: true,
      },
      {
        textKey: "dmzoom.chats.dylan_kim.messages.msg4.text",
        time: "01:15",
        incoming: false,
      },
    ],
  },
];

const participants = [
  {
    id: 1,
    nameKey: "dmzoom.participants.ava_chen.name",
    avatar: "https://i.pravatar.cc/150?img=27",
    emailKey: "dmzoom.participants.ava_chen.email",
  },
  {
    id: 2,
    nameKey: "dmzoom.participants.liam_park.name",
    avatar: "https://i.pravatar.cc/150?img=32",
    emailKey: "dmzoom.participants.liam_park.email",
  },
  {
    id: 3,
    nameKey: "dmzoom.participants.zoe_kim.name",
    avatar: "https://i.pravatar.cc/150?img=25",
    emailKey: "dmzoom.participants.zoe_kim.email",
  },
  {
    id: 4,
    nameKey: "dmzoom.participants.ethan_brooks.name",
    avatar: "https://i.pravatar.cc/150?img=30",
    emailKey: "dmzoom.participants.ethan_brooks.email",
  },
  {
    id: 5,
    nameKey: "dmzoom.participants.maya_wu.name",
    avatar: "https://i.pravatar.cc/150?img=26",
    emailKey: "dmzoom.participants.maya_wu.email",
  },
  {
    id: 6,
    nameKey: "dmzoom.participants.noah_lee.name",
    avatar: "https://i.pravatar.cc/150?img=31",
    emailKey: "dmzoom.participants.noah_lee.email",
  },
  {
    id: 7,
    nameKey: "dmzoom.participants.isabella_zhang.name",
    avatar: "https://i.pravatar.cc/150?img=28",
    emailKey: "dmzoom.participants.isabella_zhang.email",
  },
  {
    id: 8,
    nameKey: "dmzoom.participants.dylan_kim.name",
    avatar: "https://i.pravatar.cc/150?img=33",
    emailKey: "dmzoom.participants.dylan_kim.email",
  },
];

const callLogs = [
  {
    id: 1,
    nameKey: "dmzoom.call_log.ava_chen.name",
    avatar: "https://i.pravatar.cc/150?img=27",
    typeKey: "dmzoom.call_log.ava_chen.type",
    time: "2025-10-28 23:30",
    duration: "15:20",
  },
  {
    id: 2,
    nameKey: "dmzoom.call_log.liam_park.name",
    avatar: "https://i.pravatar.cc/150?img=32",
    typeKey: "dmzoom.call_log.liam_park.type",
    time: "2025-10-28 22:15",
    duration: "08:45",
  },
  {
    id: 3,
    nameKey: "dmzoom.call_log.zoe_kim.name",
    avatar: "https://i.pravatar.cc/150?img=25",
    typeKey: "dmzoom.call_log.zoe_kim.type",
    time: "2025-10-28 21:00",
  },
  {
    id: 4,
    nameKey: "dmzoom.call_log.ethan_brooks.name",
    avatar: "https://i.pravatar.cc/150?img=30",
    typeKey: "dmzoom.call_log.ethan_brooks.type",
    time: "2025-10-27 20:30",
    duration: "22:10",
  },
  {
    id: 5,
    nameKey: "dmzoom.call_log.maya_wu.name",
    avatar: "https://i.pravatar.cc/150?img=26",
    typeKey: "dmzoom.call_log.maya_wu.type",
    time: "2025-10-27 19:00",
    duration: "30:00",
  },
];

const ZoomPage = () => {
  const { t } = useTranslation();
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
        : "#EF4444";
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
      const letter = t(p.nameKey)[0].toUpperCase();
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
              {t("dmzoom.header.title")}
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
              aria-label={t("dmzoom.tabs.aria_label")}
              sx={{
                mb: 3,
                "& .MuiTabs-indicator": { bgcolor: "primary.main", height: 3 },
              }}
            >
              <Tab
                icon={<SiZoom />}
                iconPosition="start"
                label={isMobile ? "" : t("dmzoom.tabs.chat")}
                value="chat"
                aria-label={t("dmzoom.tabs.chat_aria")}
              />
              <Tab
                icon={<FiUsers />}
                iconPosition="start"
                label={isMobile ? "" : t("dmzoom.tabs.participants")}
                value="participants"
                aria-label={t("dmzoom.tabs.participants_aria")}
              />
              <Tab
                icon={<FiPhone />}
                iconPosition="start"
                label={isMobile ? "" : t("dmzoom.tabs.call_log")}
                value="call-log"
                aria-label={t("dmzoom.tabs.call_log_aria")}
              />
            </Tabs>
          )}

          {/* Back Button */}
          {showDetail && (
            <Box sx={{ mb: 2 }}>
              <IconButton
                onClick={handleBack}
                sx={{ color: "primary.main" }}
                aria-label={t("dmzoom.back_button_aria")}
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
                <Stack aria-label={t("dmzoom.chat.list_aria")}>
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
                      aria-label={t("dmzoom.chat.item_aria", {
                        name: t(chat.nameKey),
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
                            {t(chat.nameKey)}
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
                            {t(chat.lastMessageKey)}
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
                <Stack aria-label={t("dmzoom.participants.list_aria")}>
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
                            aria-label={t("dmzoom.participants.item_aria", {
                              name: t(p.nameKey),
                            })}
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
                                {t(p.nameKey)}
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
                <Stack aria-label={t("dmzoom.call_log.list_aria")}>
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
                      aria-label={t("dmzoom.call_log.item_aria", {
                        name: t(call.nameKey),
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
                            {getCallIcon(t(call.typeKey))}
                          </Box>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            sx={{ fontWeight: 600, color: "#1f2937" }}
                          >
                            {t(call.nameKey)}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.875rem",
                              color:
                                t(call.typeKey) === "incoming"
                                  ? "#10B981"
                                  : t(call.typeKey) === "outgoing"
                                  ? "#0B5CFF"
                                  : "#EF4444",
                            }}
                          >
                            {t(call.typeKey).charAt(0).toUpperCase() +
                              t(call.typeKey).slice(1)}
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
                  <Stack
                    spacing={3}
                    aria-label={t("dmzoom.chat.detail_aria", {
                      name: t(selectedChat.nameKey),
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
                        {t(selectedChat.nameKey)}
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
                              {t(msg.textKey)}
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
                  <Stack
                    spacing={4}
                    alignItems="center"
                    aria-label={t("dmzoom.participants.detail_aria", {
                      name: t(selectedParticipant.nameKey),
                    })}
                  >
                    <Avatar
                      src={selectedParticipant.avatar}
                      sx={{ width: 120, height: 120 }}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "#1f2937" }}
                    >
                      {t(selectedParticipant.nameKey)}
                    </Typography>

                    {selectedParticipant.emailKey && (
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
                            {t("dmzoom.participants.email")}
                          </Typography>
                          <Typography sx={{ fontWeight: 500 }}>
                            {t(selectedParticipant.emailKey)}
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
                    aria-label={t("dmzoom.call_log.detail_aria", {
                      name: t(selectedCall.nameKey),
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
                      {t(selectedCall.nameKey)}
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
                          sx={{
                            fontSize: "0.875rem",
                            color: "#6b7280",
                            mt: 1,
                          }}
                        >
                          {selectedCall.duration} •{" "}
                          {t(selectedCall.typeKey).charAt(0).toUpperCase() +
                            t(selectedCall.typeKey).slice(1)}
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
