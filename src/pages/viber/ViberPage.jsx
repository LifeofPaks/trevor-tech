
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
import { FaViber } from "react-icons/fa";
import { useTranslation } from "react-i18next";

// Viber Light Mode Theme
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
            color: "#7B4B94",
          },
        },
      },
    },
  },
});

// === Cheating Drama Chats (8 Total) – Young Men Only ===
const chats = [
  {
    id: 1,
    name: "alex_rivera",
    avatar: "https://i.pravatar.cc/150?img=32",
    lastMessage: "dmvibez.chats.alex_rivera.lastMessage",
    time: "00:45",
    messages: [
      {
        text: "dmvibez.chats.alex_rivera.messages.msg1",
        time: "00:30",
        incoming: true,
      },
      {
        text: "dmvibez.chats.alex_rivera.messages.msg2",
        time: "00:31",
        incoming: false,
      },
      {
        text: "dmvibez.chats.alex_rivera.messages.msg3",
        time: "00:32",
        incoming: true,
      },
      {
        text: "dmvibez.chats.alex_rivera.messages.msg4",
        time: "00:45",
        incoming: false,
      },
    ],
  },
  {
    id: 2,
    name: "liam_park",
    avatar: "https://i.pravatar.cc/150?img=33",
    lastMessage: "dmvibez.chats.liam_park.lastMessage",
    time: "23:20",
    messages: [
      {
        text: "dmvibez.chats.liam_park.messages.msg1",
        time: "23:00",
        incoming: true,
      },
      {
        text: "dmvibez.chats.liam_park.messages.msg2",
        time: "23:01",
        incoming: false,
      },
      {
        text: "dmvibez.chats.liam_park.messages.msg3",
        time: "23:02",
        incoming: true,
      },
      {
        text: "dmvibez.chats.liam_park.messages.msg4",
        time: "23:20",
        incoming: false,
      },
    ],
  },
  {
    id: 3,
    name: "ethan_brooks",
    avatar: "https://i.pravatar.cc/150?img=30",
    lastMessage: "dmvibez.chats.ethan_brooks.lastMessage",
    time: "22:15",
    messages: [
      {
        text: "dmvibez.chats.ethan_brooks.messages.msg1",
        time: "22:00",
        incoming: true,
      },
      {
        text: "dmvibez.chats.ethan_brooks.messages.msg2",
        time: "22:01",
        incoming: false,
      },
      {
        text: "dmvibez.chats.ethan_brooks.messages.msg3",
        time: "22:02",
        incoming: true,
      },
      {
        text: "dmvibez.chats.ethan_brooks.messages.msg4",
        time: "22:15",
        incoming: false,
      },
    ],
  },
  {
    id: 4,
    name: "noah_lee",
    avatar: "https://i.pravatar.cc/150?img=31",
    lastMessage: "dmvibez.chats.noah_lee.lastMessage",
    time: "21:40",
    messages: [
      {
        text: "dmvibez.chats.noah_lee.messages.msg1",
        time: "21:30",
        incoming: true,
      },
      {
        text: "dmvibez.chats.noah_lee.messages.msg2",
        time: "21:31",
        incoming: false,
      },
      {
        text: "dmvibez.chats.noah_lee.messages.msg3",
        time: "21:32",
        incoming: true,
      },
      {
        text: "dmvibez.chats.noah_lee.messages.msg4",
        time: "21:40",
        incoming: false,
      },
    ],
  },
  {
    id: 5,
    name: "dylan_kim",
    avatar: "https://i.pravatar.cc/150?img=35",
    lastMessage: "dmvibez.chats.dylan_kim.lastMessage",
    time: "02:25",
    messages: [
      {
        text: "dmvibez.chats.dylan_kim.messages.msg1",
        time: "02:10",
        incoming: true,
      },
      {
        text: "dmvibez.chats.dylan_kim.messages.msg2",
        time: "02:11",
        incoming: false,
      },
      {
        text: "dmvibez.chats.dylan_kim.messages.msg3",
        time: "02:12",
        incoming: true,
      },
      {
        text: "dmvibez.chats.dylan_kim.messages.msg4",
        time: "02:25",
        incoming: false,
      },
    ],
  },
  {
    id: 6,
    name: "carter_lee",
    avatar: "https://i.pravatar.cc/150?img=34",
    lastMessage: "dmvibez.chats.carter_lee.lastMessage",
    time: "19:55",
    messages: [
      {
        text: "dmvibez.chats.carter_lee.messages.msg1",
        time: "19:40",
        incoming: true,
      },
      {
        text: "dmvibez.chats.carter_lee.messages.msg2",
        time: "19:41",
        incoming: false,
      },
      {
        text: "dmvibez.chats.carter_lee.messages.msg3",
        time: "19:42",
        incoming: true,
      },
      {
        text: "dmvibez.chats.carter_lee.messages.msg4",
        time: "19:55",
        incoming: false,
      },
    ],
  },
  {
    id: 7,
    name: "mason_wu",
    avatar: "https://i.pravatar.cc/150?img=36",
    lastMessage: "dmvibez.chats.mason_wu.lastMessage",
    time: "18:35",
    messages: [
      {
        text: "dmvibez.chats.mason_wu.messages.msg1",
        time: "18:20",
        incoming: true,
      },
      {
        text: "dmvibez.chats.mason_wu.messages.msg2",
        time: "18:21",
        incoming: false,
      },
      {
        text: "dmvibez.chats.mason_wu.messages.msg3",
        time: "18:22",
        incoming: true,
      },
      {
        text: "dmvibez.chats.mason_wu.messages.msg4",
        time: "18:35",
        incoming: false,
      },
    ],
  },
  {
    id: 8,
    name: "ryan_chen",
    avatar: "https://i.pravatar.cc/150?img=37",
    lastMessage: "dmvibez.chats.ryan_chen.lastMessage",
    time: "01:20",
    messages: [
      {
        text: "dmvibez.chats.ryan_chen.messages.msg1",
        time: "01:00",
        incoming: true,
      },
      {
        text: "dmvibez.chats.ryan_chen.messages.msg2",
        time: "01:01",
        incoming: false,
      },
      {
        text: "dmvibez.chats.ryan_chen.messages.msg3",
        time: "01:02",
        incoming: true,
      },
      {
        text: "dmvibez.chats.ryan_chen.messages.msg4",
        time: "01:20",
        incoming: false,
      },
    ],
  },
];

// === Contacts ===
const contacts = [
  ...chats.map((c) => ({
    id: c.id,
    name: c.name,
    avatar: c.avatar,
    phone: `dmvibez.contacts.${c.name}.phone`,
    email: `dmvibez.contacts.${c.name}.email`,
  })),
];

// === Call Logs ===
const callLogs = [
  {
    id: 1,
    name: "alex_rivera",
    avatar: "https://i.pravatar.cc/150?img=32",
    type: "dmvibez.call_log.alex_rivera.type",
    time: "2025-10-28 23:30",
    duration: "18:20",
  },
  {
    id: 2,
    name: "liam_park",
    avatar: "https://i.pravatar.cc/150?img=33",
    type: "dmvibez.call_log.liam_park.type",
    time: "2025-10-28 22:15",
    duration: "09:45",
  },
  {
    id: 3,
    name: "ethan_brooks",
    avatar: "https://i.pravatar.cc/150?img=30",
    type: "dmvibez.call_log.ethan_brooks.type",
    time: "2025-10-28 21:00",
  },
  {
    id: 4,
    name: "noah_lee",
    avatar: "https://i.pravatar.cc/150?img=31",
    type: "dmvibez.call_log.noah_lee.type",
    time: "2025-10-27 20:30",
    duration: "25:10",
  },
  {
    id: 5,
    name: "dylan_kim",
    avatar: "https://i.pravatar.cc/150?img=35",
    type: "dmvibez.call_log.dylan_kim.type",
    time: "2025-10-27 19:00",
    duration: "32:00",
  },
];

const ViberPage = () => {
  const { t } = useTranslation();
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
    const iconColor = t(type).includes("incoming")
      ? "#10B981"
      : t(type).includes("outgoing")
      ? "#0B5CFF"
      : "#EF4444";
    return (
      <Box sx={{ color: iconColor }}>
        {t(type).includes("outgoing") && <FiPhoneCall style={{ fontSize: 16 }} />}
        {t(type).includes("incoming") && (
          <FiPhoneIncoming style={{ fontSize: 16 }} />
        )}
        {t(type).includes("missed") && <FiPhoneMissed style={{ fontSize: 16 }} />}
      </Box>
    );
  };

  const groupContactsByLetter = () => {
    const grouped = {};
    contacts.forEach((c) => {
      const letter = t(`dmvibez.contacts.${c.name}.name`)[0].toUpperCase();
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
              {t("dmvibez.header.title")} <FaViber className="text-[#7B4B94]" />
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
              aria-label={t("dmvibez.tabs.aria_label")}
            >
              <Tab
                icon={<FaViber />}
                iconPosition="start"
                label={isMobile ? "" : t("dmvibez.tabs.chat")}
                value="chat"
                aria-label={t("dmvibez.tabs.chat_aria")}
              />
              <Tab
                icon={<FiUsers />}
                iconPosition="start"
                label={isMobile ? "" : t("dmvibez.tabs.contacts")}
                value="contacts"
                aria-label={t("dmvibez.tabs.contacts_aria")}
              />
              <Tab
                icon={<FiPhone />}
                iconPosition="start"
                label={isMobile ? "" : t("dmvibez.tabs.call_log")}
                value="call-log"
                aria-label={t("dmvibez.tabs.call_log_aria")}
              />
            </Tabs>
          )}

          {/* Back Button */}
          {showDetail && (
            <Box sx={{ mb: 2 }}>
              <IconButton
                onClick={handleBack}
                sx={{ color: "primary.main" }}
                aria-label={t("dmvibez.back_button_aria")}
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
                <Stack aria-label={t("dmvibez.chat.list_aria")}>
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
                      aria-label={t("dmvibez.chat.item_aria", {
                        name: t(`dmvibez.chats.${chat.name}.name`),
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
                            {t(`dmvibez.chats.${chat.name}.name`)}
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

              {/* Contacts List */}
              {tab === "contacts" && (
                <Stack aria-label={t("dmvibez.contacts.list_aria")}>
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
                            aria-label={t("dmvibez.contacts.item_aria", {
                              name: t(`dmvibez.contacts.${contact.name}.name`),
                            })}
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
                                {t(`dmvibez.contacts.${contact.name}.name`)}
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
                <Stack aria-label={t("dmvibez.call_log.list_aria")}>
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
                      aria-label={t("dmvibez.call_log.item_aria", {
                        name: t(`dmvibez.call_log.${call.name}.name`),
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
                            {t(`dmvibez.call_log.${call.name}.name`)}
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
                    aria-label={t("dmvibez.chat.detail_aria", {
                      name: t(`dmvibez.chats.${selectedChat.name}.name`),
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
                        {t(`dmvibez.chats.${selectedChat.name}.name`)}
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
                              <RiCheckDoubleFill />
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </Stack>
                )}

                {/* Contact Detail */}
                {selectedContact && (
                  <Stack
                    spacing={4}
                    alignItems="center"
                    aria-label={t("dmvibez.contacts.detail_aria", {
                      name: t(`dmvibez.contacts.${selectedContact.name}.name`),
                    })}
                  >
                    <Avatar
                      src={selectedContact.avatar}
                      sx={{ width: 120, height: 120 }}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "#1f2937" }}
                    >
                      {t(`dmvibez.contacts.${selectedContact.name}.name`)}
                    </Typography>

                    {selectedContact.phone && (
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
                            {t("dmvibez.contacts.phone_label")}
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 600, color: "#1f2937" }}
                          >
                            {t(selectedContact.phone)}
                          </Typography>
                        </Box>
                      </Paper>
                    )}

                    {selectedContact.email && (
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
                            {t("dmvibez.contacts.email_label")}
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 600, color: "#1f2937" }}
                          >
                            {t(selectedContact.email)}
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
                    aria-label={t("dmvibez.call_log.detail_aria", {
                      name: t(`dmvibez.call_log.${selectedCall.name}.name`),
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
                      {t(`dmvibez.call_log.${selectedCall.name}.name`)}
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

export default ViberPage;