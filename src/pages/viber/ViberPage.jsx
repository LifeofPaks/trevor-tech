"use client";

import { useState } from "react";
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
import { FaViber } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7B4B94",
      light: "#9F6BB2",
      dark: "#5A336B",
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
            color: "#7B4B94",
          },
        },
      },
    },
  },
});

const chats = [
  {
    id: 1,
    nameKey: "dmviber.chats.alex_rivera.name",
    avatarKey: "dmviber.chats.alex_rivera.avatar",
    lastMessageKey: "dmviber.chats.alex_rivera.lastMessage",
    timeKey: "dmviber.chats.alex_rivera.time",
    messages: [
      {
        textKey: "dmviber.chats.alex_rivera.messages.msg1",
        timeKey: "dmviber.chats.alex_rivera.msg1_time",
        incoming: true,
      },
      {
        textKey: "dmviber.chats.alex_rivera.messages.msg2",
        timeKey: "dmviber.chats.alex_rivera.msg2_time",
        incoming: false,
      },
      {
        textKey: "dmviber.chats.alex_rivera.messages.msg3",
        timeKey: "dmviber.chats.alex_rivera.msg3_time",
        incoming: true,
      },
      {
        textKey: "dmviber.chats.alex_rivera.messages.msg4",
        timeKey: "dmviber.chats.alex_rivera.msg4_time",
        incoming: false,
      },
    ],
  },
  {
    id: 2,
    nameKey: "dmviber.chats.liam_park.name",
    avatarKey: "dmviber.chats.liam_park.avatar",
    lastMessageKey: "dmviber.chats.liam_park.lastMessage",
    timeKey: "dmviber.chats.liam_park.time",
    messages: [
      {
        textKey: "dmviber.chats.liam_park.messages.msg1",
        timeKey: "dmviber.chats.liam_park.msg1_time",
        incoming: true,
      },
      {
        textKey: "dmviber.chats.liam_park.messages.msg2",
        timeKey: "dmviber.chats.liam_park.msg2_time",
        incoming: false,
      },
      {
        textKey: "dmviber.chats.liam_park.messages.msg3",
        timeKey: "dmviber.chats.liam_park.msg3_time",
        incoming: true,
      },
      {
        textKey: "dmviber.chats.liam_park.messages.msg4",
        timeKey: "dmviber.chats.liam_park.msg4_time",
        incoming: false,
      },
    ],
  },
  {
    id: 3,
    nameKey: "dmviber.chats.ethan_brooks.name",
    avatarKey: "dmviber.chats.ethan_brooks.avatar",
    lastMessageKey: "dmviber.chats.ethan_brooks.lastMessage",
    timeKey: "dmviber.chats.ethan_brooks.time",
    messages: [
      {
        textKey: "dmviber.chats.ethan_brooks.messages.msg1",
        timeKey: "dmviber.chats.ethan_brooks.msg1_time",
        incoming: true,
      },
      {
        textKey: "dmviber.chats.ethan_brooks.messages.msg2",
        timeKey: "dmviber.chats.ethan_brooks.msg2_time",
        incoming: false,
      },
      {
        textKey: "dmviber.chats.ethan_brooks.messages.msg3",
        timeKey: "dmviber.chats.ethan_brooks.msg3_time",
        incoming: true,
      },
      {
        textKey: "dmviber.chats.ethan_brooks.messages.msg4",
        timeKey: "dmviber.chats.ethan_brooks.msg4_time",
        incoming: false,
      },
    ],
  },
  {
    id: 4,
    nameKey: "dmviber.chats.noah_lee.name",
    avatarKey: "dmviber.chats.noah_lee.avatar",
    lastMessageKey: "dmviber.chats.noah_lee.lastMessage",
    timeKey: "dmviber.chats.noah_lee.time",
    messages: [
      {
        textKey: "dmviber.chats.noah_lee.messages.msg1",
        timeKey: "dmviber.chats.noah_lee.msg1_time",
        incoming: true,
      },
      {
        textKey: "dmviber.chats.noah_lee.messages.msg2",
        timeKey: "dmviber.chats.noah_lee.msg2_time",
        incoming: false,
      },
      {
        textKey: "dmviber.chats.noah_lee.messages.msg3",
        timeKey: "dmviber.chats.noah_lee.msg3_time",
        incoming: true,
      },
      {
        textKey: "dmviber.chats.noah_lee.messages.msg4",
        timeKey: "dmviber.chats.noah_lee.msg4_time",
        incoming: false,
      },
    ],
  },
  {
    id: 5,
    nameKey: "dmviber.chats.dylan_kim.name",
    avatarKey: "dmviber.chats.dylan_kim.avatar",
    lastMessageKey: "dmviber.chats.dylan_kim.lastMessage",
    timeKey: "dmviber.chats.dylan_kim.time",
    messages: [
      {
        textKey: "dmviber.chats.dylan_kim.messages.msg1",
        timeKey: "dmviber.chats.dylan_kim.msg1_time",
        incoming: true,
      },
      {
        textKey: "dmviber.chats.dylan_kim.messages.msg2",
        timeKey: "dmviber.chats.dylan_kim.msg2_time",
        incoming: false,
      },
      {
        textKey: "dmviber.chats.dylan_kim.messages.msg3",
        timeKey: "dmviber.chats.dylan_kim.msg3_time",
        incoming: true,
      },
      {
        textKey: "dmviber.chats.dylan_kim.messages.msg4",
        timeKey: "dmviber.chats.dylan_kim.msg4_time",
        incoming: false,
      },
    ],
  },
  {
    id: 6,
    nameKey: "dmviber.chats.carter_lee.name",
    avatarKey: "dmviber.chats.carter_lee.avatar",
    lastMessageKey: "dmviber.chats.carter_lee.lastMessage",
    timeKey: "dmviber.chats.carter_lee.time",
    messages: [
      {
        textKey: "dmviber.chats.carter_lee.messages.msg1",
        timeKey: "dmviber.chats.carter_lee.msg1_time",
        incoming: true,
      },
      {
        textKey: "dmviber.chats.carter_lee.messages.msg2",
        timeKey: "dmviber.chats.carter_lee.msg2_time",
        incoming: false,
      },
      {
        textKey: "dmviber.chats.carter_lee.messages.msg3",
        timeKey: "dmviber.chats.carter_lee.msg3_time",
        incoming: true,
      },
      {
        textKey: "dmviber.chats.carter_lee.messages.msg4",
        timeKey: "dmviber.chats.carter_lee.msg4_time",
        incoming: false,
      },
    ],
  },
  {
    id: 7,
    nameKey: "dmviber.chats.mason_wu.name",
    avatarKey: "dmviber.chats.mason_wu.avatar",
    lastMessageKey: "dmviber.chats.mason_wu.lastMessage",
    timeKey: "dmviber.chats.mason_wu.time",
    messages: [
      {
        textKey: "dmviber.chats.mason_wu.messages.msg1",
        timeKey: "dmviber.chats.mason_wu.msg1_time",
        incoming: true,
      },
      {
        textKey: "dmviber.chats.mason_wu.messages.msg2",
        timeKey: "dmviber.chats.mason_wu.msg2_time",
        incoming: false,
      },
      {
        textKey: "dmviber.chats.mason_wu.messages.msg3",
        timeKey: "dmviber.chats.mason_wu.msg3_time",
        incoming: true,
      },
      {
        textKey: "dmviber.chats.mason_wu.messages.msg4",
        timeKey: "dmviber.chats.mason_wu.msg4_time",
        incoming: false,
      },
    ],
  },
  {
    id: 8,
    nameKey: "dmviber.chats.ryan_chen.name",
    avatarKey: "dmviber.chats.ryan_chen.avatar",
    lastMessageKey: "dmviber.chats.ryan_chen.lastMessage",
    timeKey: "dmviber.chats.ryan_chen.time",
    messages: [
      {
        textKey: "dmviber.chats.ryan_chen.messages.msg1",
        timeKey: "dmviber.chats.ryan_chen.msg1_time",
        incoming: true,
      },
      {
        textKey: "dmviber.chats.ryan_chen.messages.msg2",
        timeKey: "dmviber.chats.ryan_chen.msg2_time",
        incoming: false,
      },
      {
        textKey: "dmviber.chats.ryan_chen.messages.msg3",
        timeKey: "dmviber.chats.ryan_chen.msg3_time",
        incoming: true,
      },
      {
        textKey: "dmviber.chats.ryan_chen.messages.msg4",
        timeKey: "dmviber.chats.ryan_chen.msg4_time",
        incoming: false,
      },
    ],
  },
];

const contacts = [
  {
    id: 1,
    nameKey: "dmviber.contacts.alex_rivera.name",
    phoneKey: "dmviber.contacts.alex_rivera.phone",
    emailKey: "dmviber.contacts.alex_rivera.email",
  },
  {
    id: 2,
    nameKey: "dmviber.contacts.liam_park.name",
    phoneKey: "dmviber.contacts.liam_park.phone",
    emailKey: "dmviber.contacts.liam_park.email",
  },
  {
    id: 3,
    nameKey: "dmviber.contacts.ethan_brooks.name",
    phoneKey: "dmviber.contacts.ethan_brooks.phone",
    emailKey: "dmviber.contacts.ethan_brooks.email",
  },
  {
    id: 4,
    nameKey: "dmviber.contacts.noah_lee.name",
    phoneKey: "dmviber.contacts.noah_lee.phone",
    emailKey: "dmviber.contacts.noah_lee.email",
  },
  {
    id: 5,
    nameKey: "dmviber.contacts.dylan_kim.name",
    phoneKey: "dmviber.contacts.dylan_kim.phone",
    emailKey: "dmviber.contacts.dylan_kim.email",
  },
  {
    id: 6,
    nameKey: "dmviber.contacts.carter_lee.name",
    phoneKey: "dmviber.contacts.carter_lee.phone",
    emailKey: "dmviber.contacts.carter_lee.email",
  },
  {
    id: 7,
    nameKey: "dmviber.contacts.mason_wu.name",
    phoneKey: "dmviber.contacts.mason_wu.phone",
    emailKey: "dmviber.contacts.mason_wu.email",
  },
  {
    id: 8,
    nameKey: "dmviber.contacts.ryan_chen.name",
    phoneKey: "dmviber.contacts.ryan_chen.phone",
    emailKey: "dmviber.contacts.ryan_chen.email",
  },
];

const callLogs = [
  {
    id: 1,
    nameKey: "dmviber.call_log.alex_rivera.name",
    typeKey: "dmviber.call_log.alex_rivera.type",
    timeKey: "dmviber.call_log.alex_rivera.time",
    durationKey: "dmviber.call_log.alex_rivera.duration",
  },
  {
    id: 2,
    nameKey: "dmviber.call_log.liam_park.name",
    typeKey: "dmviber.call_log.liam_park.type",
    timeKey: "dmviber.call_log.liam_park.time",
    durationKey: "dmviber.call_log.liam_park.duration",
  },
  {
    id: 3,
    nameKey: "dmviber.call_log.ethan_brooks.name",
    typeKey: "dmviber.call_log.ethan_brooks.type",
    timeKey: "dmviber.call_log.ethan_brooks.time",
  },
  {
    id: 4,
    nameKey: "dmviber.call_log.noah_lee.name",
    typeKey: "dmviber.call_log.noah_lee.type",
    timeKey: "dmviber.call_log.noah_lee.time",
    durationKey: "dmviber.call_log.noah_lee.duration",
  },
  {
    id: 5,
    nameKey: "dmviber.call_log.dylan_kim.name",
    typeKey: "dmviber.call_log.dylan_kim.type",
    timeKey: "dmviber.call_log.dylan_kim.time",
    durationKey: "dmviber.call_log.dylan_kim.duration",
  },
];

const ViberPage = () => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const { t } = useTranslation();

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
      const name = t(c.nameKey);
      const letter = name[0].toUpperCase();
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
              {t("dmviber.header.title")}
              <FaViber className="text-[#7B4B94]" />
            </h1>
          </div>
          <BindPhone />
        </div>
      </header>

      <Box sx={{ bgcolor: "#fafafa", p: { xs: 2, sm: 3, md: 4 } }}>
        <Box sx={{ maxWidth: 1400, mx: "auto" }}>
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
                icon={<FaViber />}
                iconPosition="start"
                label={isMobile ? "" : t("dmviber.tabs.chat")}
                value="chat"
              />
              <Tab
                icon={<FiUsers />}
                iconPosition="start"
                label={isMobile ? "" : t("dmviber.tabs.contacts")}
                value="contacts"
              />
              <Tab
                icon={<FiPhone />}
                iconPosition="start"
                label={isMobile ? "" : t("dmviber.tabs.call_log")}
                value="call-log"
              />
            </Tabs>
          )}

          {showDetail && (
            <Box sx={{ mb: 2 }}>
              <IconButton onClick={handleBack} sx={{ color: "primary.main" }}>
                <IoArrowBackCircle className="!text-[25px]" />
              </IconButton>
            </Box>
          )}

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
              }}
            >
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
                        <Avatar sx={{ width: 48, height: 48 }} />
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
                          {t(chat.timeKey)}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              )}

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
                              <Avatar sx={{ width: 48, height: 48 }} />
                              <Typography
                                sx={{ fontWeight: 500, color: "#1f2937" }}
                              >
                                {t(contact.nameKey)}
                              </Typography>
                            </Stack>
                          </Box>
                        ))}
                      </Box>
                    ))}
                </Stack>
              )}

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
                          <Avatar sx={{ width: 48, height: 48 }} />
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
                            {t(call.typeKey)}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{ fontSize: "0.75rem", color: "#9ca3af" }}
                        >
                          {t(call.timeKey).split(" ")[1]}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              )}
            </Paper>

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
                {selectedChat && (
                  <Stack spacing={3}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ width: 64, height: 64 }} />
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
                              bgcolor: msg.incoming ? "#f3f4f6" : "#7B4B94",
                              color: msg.incoming ? "#000" : "#fff",
                              borderRadius: "18px",
                              px: 3,
                              py: 1.5,
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
                              {t(msg.timeKey)}
                              <RiCheckDoubleFill />
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </Stack>
                )}

                {selectedContact && (
                  <Stack spacing={4} alignItems="center">
                    <Avatar sx={{ width: 120, height: 120 }} />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "#1f2937" }}
                    >
                      {t(selectedContact.nameKey)}
                    </Typography>

                    <Paper
                      elevation={0}
                      sx={{
                        bgcolor: "#e9d5ff",
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
                          bgcolor: "#7B4B94",
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
                          {t("dmviber.contacts.phone_label")}
                        </Typography>
                        <Typography sx={{ fontWeight: 600, color: "#1f2937" }}>
                          {t(selectedContact.phoneKey)}
                        </Typography>
                      </Box>
                    </Paper>

                    <Paper
                      elevation={0}
                      sx={{
                        bgcolor: "#dbeafe",
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
                          bgcolor: "#7B4B94",
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
                          {t("dmviber.contacts.email_label")}
                        </Typography>
                        <Typography sx={{ fontWeight: 600, color: "#1f2937" }}>
                          {t(selectedContact.emailKey)}
                        </Typography>
                      </Box>
                    </Paper>
                  </Stack>
                )}

                {selectedCall && (
                  <Stack spacing={4} alignItems="center">
                    <Avatar sx={{ width: 120, height: 120 }} />
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
                        {t(selectedCall.timeKey)}
                      </Typography>
                      {selectedCall.durationKey && (
                        <Typography
                          sx={{ fontSize: "0.875rem", color: "#6b7280", mt: 1 }}
                        >
                          {t(selectedCall.durationKey)} •{" "}
                          {t(selectedCall.typeKey)}
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

export default ViberPage;
