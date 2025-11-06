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
  FiPhone,
  FiPhoneCall,
  FiPhoneIncoming,
  FiPhoneMissed,
  FiMail,
  FiUsers,
} from "react-icons/fi";
import { IoArrowBackCircle } from "react-icons/io5";
import { FaFacebookMessenger } from "react-icons/fa6";
import { RiCheckDoubleFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import BindPhone from "../../components/demo/BindPhone";

// Facebook Blue Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1877f2",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    background: {
      default: "#f0f2f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#1c1e21",
      secondary: "#606770",
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

// Chat Data (sorted by time, cheating theme)
const chats = [
  {
    id: 1,
    nameKey: "emilyChen.name",
    avatar: "https://i.pravatar.cc/150?img=15",
    lastMessageKey: "emilyChen.lastMessage",
    time: "2025-11-06 10:25", // Most recent
    messages: [
      {
        textKey: "emilyChen.messages.msg1.text",
        time: "10:20",
        incoming: true,
      },
      {
        textKey: "emilyChen.messages.msg2.text",
        time: "10:22",
        incoming: false,
      },
      {
        textKey: "emilyChen.messages.msg3.text",
        time: "10:25",
        incoming: true,
      },
    ],
  },
  {
    id: 2,
    nameKey: "michaelTorres.name",
    avatar: "https://i.pravatar.cc/150?img=12",
    lastMessageKey: "michaelTorres.lastMessage",
    time: "2025-11-06 09:58",
    messages: [
      {
        textKey: "michaelTorres.messages.msg1.text",
        time: "09:50",
        incoming: true,
      },
      {
        textKey: "michaelTorres.messages.msg2.text",
        time: "09:52",
        incoming: false,
      },
      {
        textKey: "michaelTorres.messages.msg3.text",
        time: "09:58",
        incoming: false,
      },
    ],
  },
  {
    id: 5,
    nameKey: "lisaWong.name",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessageKey: "lisaWong.lastMessage",
    time: "2025-11-05 12:15", // Yesterday
    messages: [
      { textKey: "lisaWong.messages.msg1.text", time: "12:00", incoming: true },
      {
        textKey: "lisaWong.messages.msg2.text",
        time: "12:10",
        incoming: false,
      },
      { textKey: "lisaWong.messages.msg3.text", time: "12:15", incoming: true },
    ],
  },
  {
    id: 4,
    nameKey: "davidPatel.name",
    avatar: "https://i.pravatar.cc/150?img=16",
    lastMessageKey: "davidPatel.lastMessage",
    time: "2025-11-04 11:30", // Monday
    messages: [
      {
        textKey: "davidPatel.messages.msg1.text",
        time: "11:00",
        incoming: true,
      },
      {
        textKey: "davidPatel.messages.msg2.text",
        time: "11:05",
        incoming: false,
      },
      {
        textKey: "davidPatel.messages.msg3.text",
        time: "11:30",
        incoming: false,
      },
    ],
  },
  {
    id: 3,
    nameKey: "sarahKim.name",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessageKey: "sarahKim.lastMessage",
    time: "2025-11-03 15:10", // Older
    messages: [
      { textKey: "sarahKim.messages.msg1.text", time: "14:30", incoming: true },
      {
        textKey: "sarahKim.messages.msg2.text",
        time: "15:10",
        incoming: false,
      },
    ],
  },
];

// Contact Data
const contacts = [
  {
    id: 1,
    nameKey: "alexRivera.name",
    avatar: "https://i.pravatar.cc/150?img=3",
    phone: "555-123-4567",
    emailKey: "alexRivera.email",
  },
  {
    id: 2,
    nameKey: "briannaLee.name",
    avatar: "https://i.pravatar.cc/150?img=4",
    phone: "555-987-6543",
    emailKey: "briannaLee.email",
  },
  {
    id: 3,
    nameKey: "carlosMendoza.name",
    avatar: "https://i.pravatar.cc/150?img=5",
    phone: "555-456-7890",
    emailKey: "carlosMendoza.email",
  },
  {
    id: 4,
    nameKey: "dianaFoster.name",
    avatar: "https://i.pravatar.cc/150?img=6",
    phone: "555-321-0987",
    emailKey: "dianaFoster.email",
  },
  {
    id: 5,
    nameKey: "ethanBrooks.name",
    avatar: "https://i.pravatar.cc/150?img=7",
    phone: "555-789-0123",
    emailKey: "ethanBrooks.email",
  },
  {
    id: 6,
    nameKey: "fionaGrant.name",
    avatar: "https://i.pravatar.cc/150?img=8",
    phone: "555-654-3210",
    emailKey: "fionaGrant.email",
  },
  {
    id: 7,
    nameKey: "gabrielOrtiz.name",
    avatar: "https://i.pravatar.cc/150?img=9",
    phone: "555-210-9876",
    emailKey: "gabrielOrtiz.email",
  },
  {
    id: 8,
    nameKey: "hannahPark.name",
    avatar: "https://i.pravatar.cc/150?img=10",
    phone: "555-876-5432",
    emailKey: "hannahPark.email",
  },
  {
    id: 9,
    nameKey: "isaacNewton.name",
    avatar: "https://i.pravatar.cc/150?img=11",
    phone: "555-345-6789",
    emailKey: "isaacNewton.email",
  },
];

// Call Logs
const callLogs = [
  {
    id: 1,
    nameKey: "emilyChen.name",
    avatar: "https://i.pravatar.cc/150?img=15",
    type: "outgoing",
    time: "2025-10-27 14:30",
    duration: "12:45",
  },
  {
    id: 2,
    nameKey: "michaelTorres.name",
    avatar: "https://i.pravatar.cc/150?img=12",
    type: "incoming",
    time: "2025-10-26 09:15",
    duration: "08:20",
  },
  {
    id: 3,
    nameKey: "sarahKim.name",
    avatar: "https://i.pravatar.cc/150?img=1",
    type: "missed",
    time: "2025-10-25 18:42",
  },
  {
    id: 4,
    nameKey: "davidPatel.name",
    avatar: "https://i.pravatar.cc/150?img=16",
    type: "outgoing",
    time: "2025-10-24 11:10",
    duration: "05:30",
  },
  {
    id: 5,
    nameKey: "lisaWong.name",
    avatar: "https://i.pravatar.cc/150?img=2",
    type: "incoming",
    time: "2025-10-23 13:05",
    duration: "15:10",
  },
];

const FacebookPage = () => {
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
    if (type === "outgoing")
      return <FiPhoneCall style={{ fontSize: 16, color: "#10b981" }} />;
    if (type === "incoming")
      return <FiPhoneIncoming style={{ fontSize: 16, color: "#10b981" }} />;
    return <FiPhoneMissed style={{ fontSize: 16, color: "#ef4444" }} />;
  };

  const groupContactsByLetter = () => {
    const grouped = {};
    contacts.forEach((contact) => {
      const name = t(`dmfbchat.contacts.${contact.nameKey}`);
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
              {t("dmfbchat.header.title")}
              <FaFacebookMessenger className="text-[#1877f2]" />
            </h1>
          </div>
          <BindPhone />
        </div>
      </header>

      <Box
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          bgcolor: "background.default",
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
              aria-label={t("dmfbchat.tabs.aria_label")}
            >
              <Tab
                icon={<FaFacebookMessenger />}
                iconPosition="start"
                label={isMobile ? "" : t("dmfbchat.tabs.chat")}
                value="chat"
                aria-label={t("dmfbchat.tabs.chat_aria")}
              />
              <Tab
                icon={<FiUsers />}
                iconPosition="start"
                label={isMobile ? "" : t("dmfbchat.tabs.contacts")}
                value="contacts"
                aria-label={t("dmfbchat.tabs.contacts_aria")}
              />
              <Tab
                icon={<FiPhone />}
                iconPosition="start"
                label={isMobile ? "" : t("dmfbchat.tabs.call_log")}
                value="call-log"
                aria-label={t("dmfbchat.tabs.call_log_aria")}
              />
            </Tabs>
          )}

          {/* Back Button */}
          {showDetail && (
            <Box sx={{ mb: 2 }}>
              <IconButton
                onClick={handleBack}
                sx={{ color: "primary.main" }}
                aria-label={t("dmfbchat.back_button_aria")}
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
              aria-label={t(
                tab === "chat"
                  ? "dmfbchat.chat.list_aria"
                  : tab === "contacts"
                  ? "dmfbchat.contacts.list_aria"
                  : "dmfbchat.callLogs.list_aria"
              )}
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
                        "&:hover": { bgcolor: "#f5f6f7" },
                      }}
                      onClick={() => setSelectedChat(chat)}
                      role="button"
                      aria-label={t("dmfbchat.chat.item_aria", {
                        name: t(`dmfbchat.chats.${chat.nameKey}`),
                      })}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          src={chat.avatar}
                          sx={{ width: 48, height: 48 }}
                          alt={t(`dmfbchat.chats.${chat.nameKey}`)}
                        />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            sx={{ fontWeight: 600, color: "text.primary" }}
                          >
                            {t(`dmfbchat.chats.${chat.nameKey}`)}
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
                            {t(`dmfbchat.chats.${chat.lastMessageKey}`)}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{ fontSize: "0.75rem", color: "#8a8d91" }}
                        >
                          {chat.time.split(" ")[1] || chat.time}
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
                >
                  {Object.keys(groupContactsByLetter())
                    .sort()
                    .map((letter) => (
                      <Box key={letter}>
                        <Box sx={{ px: 2, py: 1, bgcolor: "#f0f2f5" }}>
                          <Typography
                            sx={{
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              color: "#606770",
                            }}
                          >
                            {letter}
                          </Typography>
                        </Box>
                        {groupContactsByLetter()[letter].map((contact) => (
                          <Box
                            className="scrollbar-hide"
                            key={contact.id}
                            sx={{
                              p: 2,
                              cursor: "pointer",
                              "&:hover": { bgcolor: "#f5f6f7" },
                              borderBottom: "1px solid #e4e6eb",
                            }}
                            onClick={() => setSelectedContact(contact)}
                            role="button"
                            aria-label={t("dmfbchat.contacts.item_aria", {
                              name: t(`dmfbchat.contacts.${contact.nameKey}`),
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
                                alt={t(`dmfbchat.contacts.${contact.nameKey}`)}
                              />
                              <Typography
                                sx={{ fontWeight: 500, color: "text.primary" }}
                              >
                                {t(`dmfbchat.contacts.${contact.nameKey}`)}
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
                <Stack>
                  {callLogs.map((call) => {
                    const color =
                      call.type === "missed" ? "#ef4444" : "#10b981";
                    return (
                      <Box
                        key={call.id}
                        sx={{
                          p: 2,
                          cursor: "pointer",
                          "&:hover": { bgcolor: "#f5f6f7" },
                          borderBottom: "1px solid #e4e6eb",
                        }}
                        onClick={() => setSelectedCall(call)}
                        role="button"
                        aria-label={t("dmfbchat.callLogs.item_aria", {
                          name: t(`dmfbchat.callLogs.${call.nameKey}`),
                        })}
                      >
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Box sx={{ position: "relative" }}>
                            <Avatar
                              src={call.avatar}
                              sx={{ width: 48, height: 48 }}
                              alt={t(`dmfbchat.callLogs.${call.nameKey}`)}
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
                              {getCallIcon(call.type)}
                            </Box>
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              sx={{ fontWeight: 600, color: "text.primary" }}
                            >
                              {t(`dmfbchat.callLogs.${call.nameKey}`)}
                            </Typography>
                            <Typography sx={{ fontSize: "0.875rem", color }}>
                              {t(`dmfbchat.callTypes.${call.type}`)}
                            </Typography>
                          </Box>
                          <Typography
                            sx={{ fontSize: "0.75rem", color: "#8a8d91" }}
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
                aria-label={t(
                  selectedChat
                    ? "dmfbchat.chat.detail_aria"
                    : selectedContact
                    ? "dmfbchat.contacts.detail_aria"
                    : "dmfbchat.callLogs.detail_aria",
                  {
                    name: selectedChat
                      ? t(`dmfbchat.chats.${selectedChat.nameKey}`)
                      : selectedContact
                      ? t(`dmfbchat.contacts.${selectedContact.nameKey}`)
                      : t(`dmfbchat.callLogs.${selectedCall.nameKey}`),
                  }
                )}
              >
                {/* Chat Detail */}
                {selectedChat && (
                  <Stack spacing={3}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        src={selectedChat.avatar}
                        sx={{ width: 64, height: 64 }}
                        alt={t(`dmfbchat.chats.${selectedChat.nameKey}`)}
                      />
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, color: "text.primary" }}
                      >
                        {t(`dmfbchat.chats.${selectedChat.nameKey}`)}
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
                              bgcolor: msg.incoming ? "#e4e6eb" : "#1877f2",
                              color: msg.incoming ? "#1c1e21" : "#fff",
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
                              {t(`dmfbchat.chats.${msg.textKey}`)}
                            </Typography>
                            <Typography
                              className="flex items-center gap-1"
                              sx={{
                                fontSize: "0.75rem",
                                mt: 0.5,
                                color: msg.incoming
                                  ? "#606770"
                                  : "rgba(255,255,255,0.8)",
                              }}
                            >
                              {msg.time}
                              {msg.incoming ? "" : <RiCheckDoubleFill />}
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
                      alt={t(`dmfbchat.contacts.${selectedContact.nameKey}`)}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "text.primary" }}
                    >
                      {t(`dmfbchat.contacts.${selectedContact.nameKey}`)}
                    </Typography>

                    {selectedContact.phone && (
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: "#e3f2fd",
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
                            bgcolor: "#1877f2",
                            borderRadius: "50%",
                            p: 1.2,
                            display: "flex",
                          }}
                        >
                          <FiPhone style={{ color: "white", fontSize: 22 }} />
                        </Box>
                        <Box sx={{ textAlign: "left" }}>
                          <Typography
                            sx={{ fontSize: "0.8125rem", color: "#606770" }}
                          >
                            {t("dmfbchat.contacts.number")}
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
                          bgcolor: "#e3f2fd",
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
                            bgcolor: "#1877f2",
                            borderRadius: "50%",
                            p: 1.2,
                            display: "flex",
                          }}
                        >
                          <FiMail style={{ color: "white", fontSize: 22 }} />
                        </Box>
                        <Box sx={{ textAlign: "left" }}>
                          <Typography
                            sx={{ fontSize: "0.8125rem", color: "#606770" }}
                          >
                            {t("dmfbchat.contacts.email")}
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 600, color: "text.primary" }}
                          >
                            {t(`dmfbchat.contacts.${selectedContact.emailKey}`)}
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
                      alt={t(`dmfbchat.callLogs.${selectedCall.nameKey}`)}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "text.primary" }}
                    >
                      {t(`dmfbchat.callLogs.${selectedCall.nameKey}`)}
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
                          {selectedCall.duration}{" "}
                          {t("dmfbchat.call.answered_calls")}
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

export default FacebookPage;
