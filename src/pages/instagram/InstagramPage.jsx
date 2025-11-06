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
import { FiInstagram } from "react-icons/fi";
import BindPhone from "../../components/demo/BindPhone";

// Instagram Gradient Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#833ab4",
      light: "#5851db",
      dark: "#833ab4",
    },
    secondary: {
      main: "#fd1d1d",
      light: "#f56040",
      dark: "#c13584",
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
    text: {
      primary: "#262626",
      secondary: "#8e8e8e",
    },
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
        },
      },
    },
  },
});

// === Instagram-Style Data with Cheating Theme ===
const chats = [
  {
    id: 1,
    nameKey: "dminsta.chats.emilyChen.name",
    avatar: "https://i.pravatar.cc/150?img=68",
    lastMessageKey: "dminsta.chats.emilyChen.lastMessage",
    time: "2m",
    messages: [
      {
        textKey: "dminsta.chats.emilyChen.messages.msg1.text",
        time: "10:20",
        incoming: true,
      },
      {
        textKey: "dminsta.chats.emilyChen.messages.msg2.text",
        time: "10:21",
        incoming: false,
      },
      {
        textKey: "dminsta.chats.emilyChen.messages.msg3.text",
        time: "10:22",
        incoming: true,
      },
    ],
  },
  {
    id: 2,
    nameKey: "dminsta.chats.michaelTorres.name",
    avatar: "https://i.pravatar.cc/150?img=56",
    lastMessageKey: "dminsta.chats.michaelTorres.lastMessage",
    time: "15m",
    messages: [
      {
        textKey: "dminsta.chats.michaelTorres.messages.msg1.text",
        time: "09:50",
        incoming: true,
      },
      {
        textKey: "dminsta.chats.michaelTorres.messages.msg2.text",
        time: "09:51",
        incoming: false,
      },
      {
        textKey: "dminsta.chats.michaelTorres.messages.msg3.text",
        time: "09:52",
        incoming: true,
      },
    ],
  },
  {
    id: 3,
    nameKey: "dminsta.chats.sarahKim.name",
    avatar: "https://i.pravatar.cc/150?img=3",
    lastMessageKey: "dminsta.chats.sarahKim.lastMessage",
    time: "1h",
    messages: [
      {
        textKey: "dminsta.chats.sarahKim.messages.msg1.text",
        time: "14:30",
        incoming: true,
      },
      {
        textKey: "dminsta.chats.sarahKim.messages.msg2.text",
        time: "14:32",
        incoming: false,
      },
    ],
  },
  {
    id: 4,
    nameKey: "dminsta.chats.davidPatel.name",
    avatar: "https://i.pravatar.cc/150?img=24",
    lastMessageKey: "dminsta.chats.davidPatel.lastMessage",
    time: "3h",
    messages: [
      {
        textKey: "dminsta.chats.davidPatel.messages.msg1.text",
        time: "11:00",
        incoming: true,
      },
      {
        textKey: "dminsta.chats.davidPatel.messages.msg2.text",
        time: "11:01",
        incoming: false,
      },
      {
        textKey: "dminsta.chats.davidPatel.messages.msg3.text",
        time: "11:02",
        incoming: true,
      },
    ],
  },
  {
    id: 5,
    nameKey: "dminsta.chats.lisaWong.name",
    avatar: "https://i.pravatar.cc/150?img=47",
    lastMessageKey: "dminsta.chats.lisaWong.lastMessage",
    time: "5h",
    messages: [
      {
        textKey: "dminsta.chats.lisaWong.messages.msg1.text",
        time: "06:45",
        incoming: true,
      },
      {
        textKey: "dminsta.chats.lisaWong.messages.msg2.text",
        time: "06:48",
        incoming: false,
      },
      {
        textKey: "dminsta.chats.lisaWong.messages.msg3.text",
        time: "06:50",
        incoming: true,
      },
    ],
  },
];

const contacts = [
  {
    id: 1,
    nameKey: "dminsta.contacts.alexRivera.name",
    avatar: "https://i.pravatar.cc/150?img=12",
    phone: "+1 555-0101",
    emailKey: "dminsta.contacts.alexRivera.email",
  },
  {
    id: 2,
    nameKey: "dminsta.contacts.briannaLee.name",
    avatar: "https://i.pravatar.cc/150?img=33",
    phone: "+1 555-0102",
    emailKey: "dminsta.contacts.briannaLee.email",
  },
  {
    id: 3,
    nameKey: "dminsta.contacts.carlosMendoza.name",
    avatar: "https://i.pravatar.cc/150?img=45",
    phone: "+1 555-0103",
    emailKey: "dminsta.contacts.carlosMendoza.email",
  },
  {
    id: 4,
    nameKey: "dminsta.contacts.dianaFoster.name",
    avatar: "https://i.pravatar.cc/150?img=61",
    phone: "+1 555-0104",
    emailKey: "dminsta.contacts.dianaFoster.email",
  },
  {
    id: 5,
    nameKey: "dminsta.contacts.ethanBrooks.name",
    avatar: "https://i.pravatar.cc/150?img=19",
    phone: "+1 555-0105",
    emailKey: "dminsta.contacts.ethanBrooks.email",
  },
  {
    id: 6,
    nameKey: "dminsta.contacts.fionaGrant.name",
    avatar: "https://i.pravatar.cc/150?img=52",
    phone: "+1 555-0106",
    emailKey: "dminsta.contacts.fionaGrant.email",
  },
  {
    id: 7,
    nameKey: "dminsta.contacts.gabrielOrtiz.name",
    avatar: "https://i.pravatar.cc/150?img=28",
    phone: "+1 555-0107",
    emailKey: "dminsta.contacts.gabrielOrtiz.email",
  },
  {
    id: 8,
    nameKey: "dminsta.contacts.hannahPark.name",
    avatar: "https://i.pravatar.cc/150?img=39",
    phone: "+1 555-0108",
    emailKey: "dminsta.contacts.hannahPark.email",
  },
  {
    id: 9,
    nameKey: "dminsta.contacts.isaacNewton.name",
    avatar: "https://i.pravatar.cc/150?img=7",
    phone: "+1 555-0109",
    emailKey: "dminsta.contacts.isaacNewton.email",
  },
];

const callLogs = [
  {
    id: 1,
    nameKey: "dminsta.callLogs.emilyChen.name",
    avatar: "https://i.pravatar.cc/150?img=68",
    typeKey: "dminsta.callTypes.outgoing",
    time: "2025-11-06 09:30",
    duration: "08:12",
  },
  {
    id: 2,
    nameKey: "dminsta.callLogs.michaelTorres.name",
    avatar: "https://i.pravatar.cc/150?img=56",
    typeKey: "dminsta.callTypes.incoming",
    time: "2025-11-05 19:45",
    duration: "22:30",
  },
  {
    id: 3,
    nameKey: "dminsta.callLogs.sarahKim.name",
    avatar: "https://i.pravatar.cc/150?img=3",
    typeKey: "dminsta.callTypes.missed",
    time: "2025-11-05 14:20",
  },
  {
    id: 4,
    nameKey: "dminsta.callLogs.davidPatel.name",
    avatar: "https://i.pravatar.cc/150?img=24",
    typeKey: "dminsta.callTypes.outgoing",
    time: "2025-11-04 12:15",
    duration: "05:40",
  },
  {
    id: 5,
    nameKey: "dminsta.callLogs.lisaWong.name",
    avatar: "https://i.pravatar.cc/150?img=47",
    typeKey: "dminsta.callTypes.incoming",
    time: "2025-11-04 07:00",
    duration: "10:25",
  },
];

const InstagramPage = () => {
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

  const getCallIcon = (typeKey) => {
    const type = t(typeKey).toLowerCase();
    if (type === t("dminsta.callTypes.outgoing").toLowerCase())
      return <FiPhoneCall sx={{ fontSize: 16, color: "#10b981" }} />;
    if (type === t("dminsta.callTypes.incoming").toLowerCase())
      return <FiPhoneIncoming sx={{ fontSize: 16, color: "#10b981" }} />;
    return <FiPhoneMissed sx={{ fontSize: 16, color: "#ef4444" }} />;
  };

  const groupContactsByLetter = () => {
    const grouped = {};
    contacts.forEach((contact) => {
      const name = t(contact.nameKey);
      const letter = name[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(contact);
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
              {t("dminsta.header.title")}
              <FiInstagram className="text-[#833ab4]" />
            </h1>
          </div>
          <BindPhone />
        </div>
      </header>

      <Box
        sx={{
          bgcolor: "background.default",
          p: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box sx={{ maxWidth: 1400, mx: "auto" }}>
          {/* Tabs */}
          {!showDetail && (
            <Tabs
              value={tab}
              onChange={(e, v) => setTab(v)}
              aria-label={t("dminsta.tabs.aria_label")}
              sx={{
                mb: 3,
                "& .MuiTabs-indicator": {
                  backgroundImage: "linear-gradient(45deg, #405de6, #fd1d1d)",
                  height: 3,
                },
              }}
            >
              <Tab
                icon={<FiInstagram />}
                iconPosition="start"
                label={isMobile ? "" : t("dminsta.tabs.chat")}
                value="chat"
                aria-label={t("dminsta.tabs.chat_aria")}
              />
              <Tab
                icon={<FiUsers />}
                iconPosition="start"
                label={isMobile ? "" : t("dminsta.tabs.contacts")}
                value="contacts"
                aria-label={t("dminsta.tabs.contacts_aria")}
              />
              <Tab
                icon={<FiPhone />}
                iconPosition="start"
                label={isMobile ? "" : t("dminsta.tabs.call_log")}
                value="call-log"
                aria-label={t("dminsta.tabs.call_log_aria")}
              />
            </Tabs>
          )}

          {/* Back Button */}
          {showDetail && (
            <Box sx={{ mb: 2 }}>
              <IconButton
                onClick={handleBack}
                sx={{ color: "primary.main" }}
                aria-label={t("dminsta.back_button_aria")}
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
                borderRadius: 3,
                overflow: "hidden",
                display: showDetail && isMobile ? "none" : "block",
                height: "100%",
                maxHeight: "80vh",
                overflowY: "auto",
                bgcolor: "background.paper",
              }}
            >
              {/* Chat List */}
              {tab === "chat" && (
                <Stack aria-label={t("dminsta.chat.list_aria")}>
                  {chats.map((chat) => (
                    <Box
                      key={chat.id}
                      sx={{
                        p: 2,
                        cursor: "pointer",
                        "&:hover": { bgcolor: "#fafafa" },
                      }}
                      onClick={() => setSelectedChat(chat)}
                      aria-label={t("dminsta.chat.item_aria", {
                        name: t(chat.nameKey),
                      })}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          src={chat.avatar}
                          sx={{ width: 56, height: 56 }}
                        />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            sx={{ fontWeight: 600, color: "text.primary" }}
                          >
                            {t(chat.nameKey)}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.875rem",
                              color: "text.secondary",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {t(chat.lastMessageKey)}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{ fontSize: "0.75rem", color: "#8e8e8e" }}
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
                <Stack
                  className="scrollbar-hide"
                  sx={{
                    maxHeight: "70vh",
                    overflowY: "auto",
                  }}
                  aria-label={t("dminsta.contacts.list_aria")}
                >
                  {Object.keys(groupContactsByLetter())
                    .sort()
                    .map((letter) => (
                      <Box key={letter}>
                        <Box sx={{ px: 2, py: 1, bgcolor: "#f0f0f0" }}>
                          <Typography
                            sx={{
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              color: "#8e8e8e",
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
                              "&:hover": { bgcolor: "#fafafa" },
                            }}
                            onClick={() => setSelectedContact(contact)}
                            aria-label={t("dminsta.contacts.item_aria", {
                              name: t(contact.nameKey),
                            })}
                          >
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                            >
                              <Avatar
                                src={contact.avatar}
                                sx={{ width: 56, height: 56 }}
                              />
                              <Typography
                                sx={{ fontWeight: 500, color: "text.primary" }}
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

              {/* Call Log */}
              {tab === "call-log" && (
                <Stack aria-label={t("dminsta.callLogs.list_aria")}>
                  {callLogs.map((call) => {
                    const color =
                      t(call.typeKey).toLowerCase() ===
                      t("dminsta.callTypes.missed").toLowerCase()
                        ? "#ef4444"
                        : "#10b981";
                    return (
                      <Box
                        key={call.id}
                        sx={{
                          p: 2,
                          cursor: "pointer",
                          "&:hover": { bgcolor: "#fafafa" },
                        }}
                        onClick={() => setSelectedCall(call)}
                        aria-label={t("dminsta.callLogs.item_aria", {
                          name: t(call.nameKey),
                        })}
                      >
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Box sx={{ position: "relative" }}>
                            <Avatar
                              src={call.avatar}
                              sx={{ width: 56, height: 56 }}
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
                              }}
                            >
                              {getCallIcon(call.typeKey)}
                            </Box>
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              sx={{ fontWeight: 600, color: "text.primary" }}
                            >
                              {t(call.nameKey)}
                            </Typography>
                            <Typography sx={{ fontSize: "0.875rem", color }}>
                              {t(call.typeKey)}
                            </Typography>
                          </Box>
                          <Typography
                            sx={{ fontSize: "0.75rem", color: "#8e8e8e" }}
                          >
                            {call.time.split(" ")[1]}
                          </Typography>
                        </Stack>
                      </Box>
                    );
                  })}
                </Stack>
              )}
            </Paper>

            {/* Right Panel: Details */}
            {showDetail && (
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
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
                    aria-label={t("dminsta.chat.detail_aria", {
                      name: t(selectedChat.nameKey),
                    })}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        src={selectedChat.avatar}
                        sx={{ width: 72, height: 72 }}
                      />
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, color: "text.primary" }}
                      >
                        {t(selectedChat.nameKey)}
                      </Typography>
                    </Stack>
                    <Stack spacing={2} sx={{ mt: 2 }}>
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
                              maxWidth: "75%",
                              bgcolor: msg.incoming
                                ? "#efefef"
                                : "linear-gradient(45deg, #405de6, #fd1d1d)",
                              color: msg.incoming ? "#262626" : "#fff",
                              borderRadius: "18px",
                              px: 3,
                              py: 1.5,
                              borderBottomLeftRadius: msg.incoming ? 4 : "18px",
                              borderBottomRightRadius: msg.incoming
                                ? "18px"
                                : 4,
                              backgroundClip: msg.incoming
                                ? "border-box"
                                : "text",
                              WebkitBackgroundClip: msg.incoming
                                ? "border-box"
                                : "text",
                              WebkitTextFillColor: msg.incoming
                                ? "inherit"
                                : "transparent",
                            }}
                          >
                            <Typography sx={{ fontSize: "0.9375rem" }}>
                              {t(msg.textKey)}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "0.75rem",
                                mt: 0.5,
                                color: msg.incoming
                                  ? "#8e8e8e"
                                  : "rgba(255,255,255,0.8)",
                                opacity: 0.8,
                              }}
                            >
                              {msg.time}
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
                    aria-label={t("dminsta.contacts.detail_aria", {
                      name: t(selectedContact.nameKey),
                    })}
                  >
                    <Avatar
                      src={selectedContact.avatar}
                      sx={{ width: 140, height: 140 }}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "text.primary" }}
                    >
                      {t(selectedContact.nameKey)}
                    </Typography>

                    {selectedContact.phone && (
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: "#f5f5f5",
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
                            bgcolor: "linear-gradient(45deg, #405de6, #fd1d1d)",
                            borderRadius: "50%",
                            p: 1.2,
                            display: "flex",
                          }}
                        >
                          <FiPhone style={{ color: "#833ab4", fontSize: 22 }} />
                        </Box>
                        <Box sx={{ textAlign: "left" }}>
                          <Typography
                            sx={{ fontSize: "0.8125rem", color: "#8e8e8e" }}
                          >
                            {t("dminsta.contacts.phone")}
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 600, color: "text.primary" }}
                          >
                            {selectedContact.phone}
                          </Typography>
                        </Box>
                      </Paper>
                    )}

                    {selectedContact.emailKey && (
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: "#f5f5f5",
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
                            bgcolor: "linear-gradient(45deg, #405de6, #fd1d1d)",
                            borderRadius: "50%",
                            p: 1.2,
                            display: "flex",
                          }}
                        >
                          <FiMail style={{ color: "#833ab4", fontSize: 22 }} />
                        </Box>
                        <Box sx={{ textAlign: "left" }}>
                          <Typography
                            sx={{ fontSize: "0.8125rem", color: "#8e8e8e" }}
                          >
                            {t("dminsta.contacts.email")}
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 600, color: "text.primary" }}
                          >
                            {t(selectedContact.emailKey)}
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
                    aria-label={t("dminsta.callLogs.detail_aria", {
                      name: t(selectedCall.nameKey),
                    })}
                  >
                    <Avatar
                      src={selectedCall.avatar}
                      sx={{ width: 140, height: 140 }}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "text.primary" }}
                    >
                      {t(selectedCall.nameKey)}
                    </Typography>
                    <Paper
                      elevation={0}
                      sx={{
                        bgcolor: "#f9f9f9",
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
                          color: "text.primary",
                        }}
                      >
                        {selectedCall.time}
                      </Typography>
                      {selectedCall.duration && (
                        <Typography
                          sx={{
                            fontSize: "0.875rem",
                            color: "text.secondary",
                            mt: 1,
                          }}
                        >
                          {selectedCall.duration} • {t(selectedCall.typeKey)}
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
    </ThemeProvider>
  );
};

export default InstagramPage;
