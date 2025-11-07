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
import { FaSkype } from "react-icons/fa";

// Skype Light Mode Theme (Blue)
const theme = createTheme({
  palette: {
    primary: {
      main: "#00AFF0", // Skype Blue
      light: "#4DC9FF",
      dark: "#008CC7",
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
            color: "#00AFF0",
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
    nameKey: "marcus_hale",
    avatar: "https://i.pravatar.cc/150?img=4",
    lastMessageKey: "marcus_hale.lastMessage", // Fixed: Removed leading space
    time: "03:45",
    messages: [
      { textKey: "marcus_hale.message1", time: "03:30", incoming: true },
      { textKey: "marcus_hale.message2", time: "03:31", incoming: false },
      { textKey: "marcus_hale.message3", time: "03:45", incoming: false },
    ],
  },
  {
    id: 2,
    nameKey: "nico_rivera",
    avatar: "https://i.pravatar.cc/150?img=5",
    lastMessageKey: "nico_rivera.lastMessage",
    time: "02:10",
    messages: [
      { textKey: "nico_rivera.message1", time: "01:55", incoming: true },
      { textKey: "nico_rivera.message2", time: "01:56", incoming: false },
      { textKey: "nico_rivera.message3", time: "02:10", incoming: false },
    ],
  },
  {
    id: 3,
    nameKey: "eli_grant",
    avatar: "https://i.pravatar.cc/150?img=6",
    lastMessageKey: "eli_grant.lastMessage",
    time: "01:20",
    messages: [
      { textKey: "eli_grant.message1", time: "01:05", incoming: true },
      { textKey: "eli_grant.message2", time: "01:06", incoming: false },
      { textKey: "eli_grant.message3", time: "01:20", incoming: false },
    ],
  },
  {
    id: 4,
    nameKey: "leo_pierce",
    avatar: "https://i.pravatar.cc/150?img=7",
    lastMessageKey: "leo_pierce.lastMessage",
    time: "00:35",
    messages: [
      { textKey: "leo_pierce.message1", time: "00:20", incoming: true },
      { textKey: "leo_pierce.message2", time: "00:21", incoming: false },
      { textKey: "leo_pierce.message3", time: "00:35", incoming: false },
    ],
  },
  {
    id: 5,
    nameKey: "owen_blake",
    avatar: "https://i.pravatar.cc/150?img=8",
    lastMessageKey: "owen_blake.lastMessage",
    time: "04:00",
    messages: [
      { textKey: "owen_blake.message1", time: "03:45", incoming: true },
      { textKey: "owen_blake.message2", time: "03:46", incoming: false },
      { textKey: "owen_blake.message3", time: "04:00", incoming: false },
    ],
  },
  {
    id: 6,
    nameKey: "finn_cole",
    avatar: "https://i.pravatar.cc/150?img=9",
    lastMessageKey: "finn_cole.lastMessage",
    time: "22:50",
    messages: [
      { textKey: "finn_cole.message1", time: "22:30", incoming: true },
      { textKey: "finn_cole.message2", time: "22:31", incoming: false },
      { textKey: "finn_cole.message3", time: "22:32", incoming: true },
      { textKey: "finn_cole.message4", time: "22:50", incoming: false },
    ],
  },
  {
    id: 7,
    nameKey: "theo_shaw",
    avatar: "https://i.pravatar.cc/150?img=10",
    lastMessageKey: "theo_shaw.lastMessage",
    time: "21:15",
    messages: [
      { textKey: "theo_shaw.message1", time: "21:00", incoming: true },
      { textKey: "theo_shaw.message2", time: "21:01", incoming: false },
      { textKey: "theo_shaw.message3", time: "21:02", incoming: true },
      { textKey: "theo_shaw.message4", time: "21:15", incoming: false },
    ],
  },
  {
    id: 8,
    nameKey: "zane_knox",
    avatar: "https://i.pravatar.cc/150?img=11",
    lastMessageKey: "zane_knox.lastMessage",
    time: "05:05",
    messages: [
      { textKey: "zane_knox.message1", time: "04:50", incoming: true },
      { textKey: "zane_knox.message2", time: "04:51", incoming: false },
      { textKey: "zane_knox.message3", time: "04:52", incoming: true },
      { textKey: "zane_knox.message4", time: "05:05", incoming: false },
    ],
  },
  {
    id: 9,
    nameKey: "jett_miles",
    avatar: "https://i.pravatar.cc/150?img=12",
    lastMessageKey: "jett_miles.lastMessage",
    time: "02:30",
    messages: [
      { textKey: "jett_miles.message1", time: "02:15", incoming: true },
      { textKey: "jett_miles.message2", time: "02:16", incoming: false },
      { textKey: "jett_miles.message3", time: "02:17", incoming: true },
      { textKey: "jett_miles.message4", time: "02:30", incoming: false },
    ],
  },
  {
    id: 10,
    nameKey: "kade_vance",
    avatar: "https://i.pravatar.cc/150?img=13",
    lastMessageKey: "kade_vance.lastMessage",
    time: "01:45",
    messages: [
      { textKey: "kade_vance.message1", time: "01:30", incoming: true },
      { textKey: "kade_vance.message2", time: "01:31", incoming: false },
      { textKey: "kade_vance.message3", time: "01:32", incoming: true },
      { textKey: "kade_vance.message4", time: "01:45", incoming: false },
    ],
  },
  {
    id: 11,
    nameKey: "rhett_stone",
    avatar: "https://i.pravatar.cc/150?img=14",
    lastMessageKey: "rhett_stone.lastMessage",
    time: "06:00",
    messages: [
      { textKey: "rhett_stone.message1", time: "05:40", incoming: true },
      { textKey: "rhett_stone.message2", time: "05:41", incoming: false },
      { textKey: "rhett_stone.message3", time: "06:00", incoming: false },
    ],
  },
  {
    id: 12,
    nameKey: "cruz_reid",
    avatar: "https://i.pravatar.cc/150?img=15",
    lastMessageKey: "cruz_reid.lastMessage",
    time: "23:00",
    messages: [
      { textKey: "cruz_reid.message1", time: "22:45", incoming: true },
      { textKey: "cruz_reid.message2", time: "22:46", incoming: false },
      { textKey: "cruz_reid.message3", time: "22:47", incoming: true },
      { textKey: "cruz_reid.message4", time: "23:00", incoming: false },
    ],
  },
];

// === Contacts (Skype uses "Contacts") ===
const contacts = chats.map((c) => ({
  id: c.id,
  nameKey: c.nameKey,
  avatar: c.avatar,
  phone: `+1 555-${String(2000 + c.id).padStart(4, "0")}`,
  email: `${c.nameKey.split("_")[0].toLowerCase()}@skype.com`,
}));

// === Call Logs ===
const callLogs = [
  {
    id: 1,
    nameKey: "marcus_hale",
    avatar: "https://i.pravatar.cc/150?img=4",
    type: "outgoing",
    time: "2025-10-28 23:55",
    duration: "21:30",
  },
  {
    id: 2,
    nameKey: "nico_rivera",
    avatar: "https://i.pravatar.cc/150?img=5",
    type: "incoming",
    time: "2025-10-28 22:40",
    duration: "15:10",
  },
  {
    id: 3,
    nameKey: "eli_grant",
    avatar: "https://i.pravatar.cc/150?img=6",
    type: "missed",
    time: "2025-10-28 21:20",
  },
  {
    id: 4,
    nameKey: "leo_pierce",
    avatar: "https://i.pravatar.cc/150?img=7",
    type: "outgoing",
    time: "2025-10-27 20:55",
    duration: "39:45",
  },
  {
    id: 5,
    nameKey: "owen_blake",
    avatar: "https://i.pravatar.cc/150?img=8",
    type: "incoming",
    time: "2025-10-27 19:30",
    duration: "31:20",
  },
  {
    id: 6,
    nameKey: "rhett_stone",
    avatar: "https://i.pravatar.cc/150?img=14",
    type: "missed",
    time: "2025-10-28 18:00",
  },
];

const Skype = () => {
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
      const letter = t(
        `dmskype.contacts_list.${c.nameKey}.name`
      )[0].toUpperCase();
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
              {t("dmskype.header.title")}
              <FaSkype className="text-[#00AFF0]" />
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
              aria-label={t("dmskype.tabs.aria_label")}
            >
              <Tab
                icon={<FaSkype />}
                iconPosition="start"
                label={isMobile ? "" : t("dmskype.tabs.chat")}
                value="chat"
                aria-label={t("dmskype.tabs.chat_aria")}
              />
              <Tab
                icon={<FiUsers />}
                iconPosition="start"
                label={isMobile ? "" : t("dmskype.tabs.contacts")}
                value="contacts"
                aria-label={t("dmskype.tabs.contacts_aria")}
              />
              <Tab
                icon={<FiPhone />}
                iconPosition="start"
                label={isMobile ? "" : t("dmskype.tabs.calls")}
                value="calls"
                aria-label={t("dmskype.tabs.calls_aria")}
              />
            </Tabs>
          )}

          {/* Back Button */}
          {showDetail && (
            <Box sx={{ mb: 2 }}>
              <IconButton
                onClick={handleBack}
                sx={{ color: "primary.main" }}
                aria-label={t("dmskype.back_button_aria")}
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
                <Stack aria-label={t("dmskype.chat.list_aria")}>
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
                      aria-label={t("dmskype.chat.item_aria", {
                        name: t(`dmskype.chats.${chat.nameKey}.name`),
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
                            {t(`dmskype.chats.${chat.nameKey}.name`)}
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
                            {t(`dmskype.chats.${chat.lastMessageKey}`)}
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
                <Stack aria-label={t("dmskype.contacts.list_aria")}>
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
                            aria-label={t("dmskype.contacts.item_aria", {
                              name: t(
                                `dmskype.contacts_list.${contact.nameKey}.name`
                              ),
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
                                {t(
                                  `dmskype.contacts_list.${contact.nameKey}.name`
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
                <Stack aria-label={t("dmskype.call_log.list_aria")}>
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
                      aria-label={t("dmskype.call_log.item_aria", {
                        name: t(`dmskype.call_logs.${call.nameKey}.name`),
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
                            {t(`dmskype.call_logs.${call.nameKey}.name`)}
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
                            {t(`dmskype.call_log.types.${call.type}`)}
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
                    aria-label={t("dmskype.chat.detail_aria", {
                      name: t(`dmskype.chats.${selectedChat.nameKey}.name`),
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
                        {t(`dmskype.chats.${selectedChat.nameKey}.name`)}
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
                              bgcolor: msg.incoming ? "#f3f4f6" : "#00AFF0",
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
                              {t(`dmskype.chats.${msg.textKey}`)}
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
                  <Stack
                    spacing={4}
                    alignItems="center"
                    aria-label={t("dmskype.contacts.detail_aria", {
                      name: t(
                        `dmskype.contacts_list.${selectedContact.nameKey}.name`
                      ),
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
                      {t(
                        `dmskype.contacts_list.${selectedContact.nameKey}.name`
                      )}
                    </Typography>

                    {selectedContact.phone && (
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: "#DBF3FF",
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
                            bgcolor: "#00AFF0",
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
                            {t("dmskype.contacts.phone_label")}
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
                          bgcolor: "#B3E5FC",
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
                            bgcolor: "#00AFF0",
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
                            {t("dmskype.contacts.email_label")}
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
                  <Stack
                    spacing={4}
                    alignItems="center"
                    aria-label={t("dmskype.call_log.detail_aria", {
                      name: t(`dmskype.call_logs.${selectedCall.nameKey}.name`),
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
                      {t(`dmskype.call_logs.${selectedCall.nameKey}.name`)}
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
                          {t(`dmskype.call_log.types.${selectedCall.type}`)}
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

export default Skype;
