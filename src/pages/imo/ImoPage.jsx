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
import { BsChatText } from "react-icons/bs";

// imo Light Mode Theme (Green + Blue)
const theme = createTheme({
  palette: {
    primary: {
      main: "#00D084", // imo Green
      light: "#33E0A1",
      dark: "#00A66B",
    },
    secondary: {
      main: "#1DA1F2", // imo Blue accent
      light: "#4DB8FF",
      dark: "#0D8BD9",
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
            color: "#00D084",
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
    name: "Aryan Patel",
    avatar: "https://i.pravatar.cc/150?img=16",
    lastMessageKey: "aryan_patel.lastMessage",
    time: "03:20",
    messages: [
      { textKey: "aryan_patel.message1", time: "03:05", incoming: true },
      { textKey: "aryan_patel.message2", time: "03:06", incoming: false },
      { textKey: "aryan_patel.message3", time: "03:20", incoming: false },
    ],
  },
  {
    id: 2,
    name: "Rohan Mehta",
    avatar: "https://i.pravatar.cc/150?img=17",
    lastMessageKey: "rohan_mehta.lastMessage",
    time: "02:15",
    messages: [
      { textKey: "rohan_mehta.message1", time: "02:00", incoming: true },
      { textKey: "rohan_mehta.message2", time: "02:01", incoming: false },
      { textKey: "rohan_mehta.message3", time: "02:15", incoming: false },
    ],
  },
  {
    id: 3,
    name: "Vikram Singh",
    avatar: "https://i.pravatar.cc/150?img=18",
    lastMessageKey: "vikram_singh.lastMessage",
    time: "01:30",
    messages: [
      { textKey: "vikram_singh.message1", time: "01:15", incoming: true },
      { textKey: "vikram_singh.message2", time: "01:16", incoming: false },
      { textKey: "vikram_singh.message3", time: "01:30", incoming: false },
    ],
  },
  {
    id: 4,
    name: "Arjun Desai",
    avatar: "https://i.pravatar.cc/150?img=19",
    lastMessageKey: "arjun_desai.lastMessage",
    time: "00:45",
    messages: [
      { textKey: "arjun_desai.message1", time: "00:30", incoming: true },
      { textKey: "arjun_desai.message2", time: "00:31", incoming: false },
      { textKey: "arjun_desai.message3", time: "00:45", incoming: false },
    ],
  },
  {
    id: 5,
    name: "Neil Sharma",
    avatar: "https://i.pravatar.cc/150?img=20",
    lastMessageKey: "neil_sharma.lastMessage",
    time: "04:10",
    messages: [
      { textKey: "neil_sharma.message1", time: "03:55", incoming: true },
      { textKey: "neil_sharma.message2", time: "03:56", incoming: false },
      { textKey: "neil_sharma.message3", time: "04:10", incoming: false },
    ],
  },
  {
    id: 6,
    name: "Karan Reddy",
    avatar: "https://i.pravatar.cc/150?img=21",
    lastMessageKey: "karan_reddy.lastMessage",
    time: "22:40",
    messages: [
      { textKey: "karan_reddy.message1", time: "22:20", incoming: true },
      { textKey: "karan_reddy.message2", time: "22:21", incoming: false },
      { textKey: "karan_reddy.message3", time: "22:22", incoming: true },
      { textKey: "karan_reddy.message4", time: "22:40", incoming: false },
    ],
  },
  {
    id: 7,
    name: "Dev Kapoor",
    avatar: "https://i.pravatar.cc/150?img=22",
    lastMessageKey: "dev_kapoor.lastMessage",
    time: "21:05",
    messages: [
      { textKey: "dev_kapoor.message1", time: "20:50", incoming: true },
      { textKey: "dev_kapoor.message2", time: "20:51", incoming: false },
      { textKey: "dev_kapoor.message3", time: "20:52", incoming: true },
      { textKey: "dev_kapoor.message4", time: "21:05", incoming: false },
    ],
  },
  {
    id: 8,
    name: "Siddharth Rao",
    avatar: "https://i.pravatar.cc/150?img=23",
    lastMessageKey: "siddharth_rao.lastMessage",
    time: "05:00",
    messages: [
      { textKey: "siddharth_rao.message1", time: "04:45", incoming: true },
      { textKey: "siddharth_rao.message2", time: "04:46", incoming: false },
      { textKey: "siddharth_rao.message3", time: "04:47", incoming: true },
      { textKey: "siddharth_rao.message4", time: "05:00", incoming: false },
    ],
  },
  {
    id: 9,
    name: "Yash Malhotra",
    avatar: "https://i.pravatar.cc/150?img=24",
    lastMessageKey: "yash_malhotra.lastMessage",
    time: "02:25",
    messages: [
      { textKey: "yash_malhotra.message1", time: "02:10", incoming: true },
      { textKey: "yash_malhotra.message2", time: "02:11", incoming: false },
      { textKey: "yash_malhotra.message3", time: "02:12", incoming: true },
      { textKey: "yash_malhotra.message4", time: "02:25", incoming: false },
    ],
  },
  {
    id: 10,
    name: "Rishi Gupta",
    avatar: "https://i.pravatar.cc/150?img=25",
    lastMessageKey: "rishi_gupta.lastMessage",
    time: "01:40",
    messages: [
      { textKey: "rishi_gupta.message1", time: "01:25", incoming: true },
      { textKey: "rishi_gupta.message2", time: "01:26", incoming: false },
      { textKey: "rishi_gupta.message3", time: "01:27", incoming: true },
      { textKey: "rishi_gupta.message4", time: "01:40", incoming: false },
    ],
  },
  {
    id: 11,
    name: "Aadi Nair",
    avatar: "https://i.pravatar.cc/150?img=26",
    lastMessageKey: "aadi_nair.lastMessage",
    time: "06:15",
    messages: [
      { textKey: "aadi_nair.message1", time: "05:55", incoming: true },
      { textKey: "aadi_nair.message2", time: "05:56", incoming: false },
      { textKey: "aadi_nair.message3", time: "06:15", incoming: false },
    ],
  },
  {
    id: 12,
    name: "Vivan Joshi",
    avatar: "https://i.pravatar.cc/150?img=27",
    lastMessageKey: "vivan_joshi.lastMessage",
    time: "23:10",
    messages: [
      { textKey: "vivan_joshi.message1", time: "22:55", incoming: true },
      { textKey: "vivan_joshi.message2", time: "22:56", incoming: false },
      { textKey: "vivan_joshi.message3", time: "22:57", incoming: true },
      { textKey: "vivan_joshi.message4", time: "23:10", incoming: false },
    ],
  },
];

// === Contacts (imo uses "Contacts") ===
const contacts = [
  ...chats.map((c) => ({
    id: c.id,
    name: c.name,
    avatar: c.avatar,
    phone: `+91 98${String(100 + c.id).padStart(3, "0")} 12345`,
    email: `${c.name.split(" ")[0].toLowerCase()}@imo.im`,
  })),
];

// === Call Logs ===
const callLogs = [
  {
    id: 1,
    name: "Aryan Patel",
    avatar: "https://i.pravatar.cc/150?img=16",
    type: "outgoing",
    time: "2025-10-28 23:55",
    duration: "18:50",
  },
  {
    id: 2,
    name: "Rohan Mehta",
    avatar: "https://i.pravatar.cc/150?img=17",
    type: "incoming",
    time: "2025-10-28 22:35",
    duration: "13:20",
  },
  {
    id: 3,
    name: "Vikram Singh",
    avatar: "https://i.pravatar.cc/150?img=18",
    type: "missed",
    time: "2025-10-28 21:15",
  },
  {
    id: 4,
    name: "Arjun Desai",
    avatar: "https://i.pravatar.cc/150?img=19",
    type: "outgoing",
    time: "2025-10-27 20:50",
    duration: "35:10",
  },
  {
    id: 5,
    name: "Neil Sharma",
    avatar: "https://i.pravatar.cc/150?img=20",
    type: "incoming",
    time: "2025-10-27 19:25",
    duration: "29:40",
  },
  {
    id: 6,
    name: "Aadi Nair",
    avatar: "https://i.pravatar.cc/150?img=26",
    type: "missed",
    time: "2025-10-27 18:00",
  },
];

const ImoPage = () => {
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
              {t("dmimo.header.title")}
              <BsChatText className="text-[#00D084] text-xl" />
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
              aria-label={t("dmimo.tabs.aria_label")}
            >
              <Tab
                icon={<BsChatText className="text-[#00D084]" />}
                iconPosition="start"
                label={isMobile ? "" : t("dmimo.tabs.chat")}
                value="chat"
                aria-label={t("dmimo.tabs.chat_aria")}
              />
              <Tab
                icon={<FiUsers />}
                iconPosition="start"
                label={isMobile ? "" : t("dmimo.tabs.contacts")}
                value="contacts"
                aria-label={t("dmimo.tabs.contacts_aria")}
              />
              <Tab
                icon={<FiPhone />}
                iconPosition="start"
                label={isMobile ? "" : t("dmimo.tabs.calls")}
                value="calls"
                aria-label={t("dmimo.tabs.calls_aria")}
              />
            </Tabs>
          )}

          {/* Back Button */}
          {showDetail && (
            <Box sx={{ mb: 2 }}>
              <IconButton
                onClick={handleBack}
                sx={{ color: "primary.main" }}
                aria-label={t("dmimo.back_button_aria")}
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
                <Stack aria-label={t("dmimo.chat.list_aria")}>
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
                      aria-label={t("dmimo.chat.item_aria", {
                        name: chat.name,
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
                            {t(`dmimo.chats.${chat.lastMessageKey}`)}
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
                <Stack aria-label={t("dmimo.contacts.list_aria")}>
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
                            aria-label={t("dmimo.contacts.item_aria", {
                              name: contact.name,
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
                <Stack aria-label={t("dmimo.call_log.list_aria")}>
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
                      aria-label={t("dmimo.call_log.item_aria", {
                        name: call.name,
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
                            {t(`dmimo.call_log.types.${call.type}`)}
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
                    aria-label={t("dmimo.chat.detail_aria", {
                      name: selectedChat.name,
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
                              bgcolor: msg.incoming ? "#f3f4f6" : "#00D084",
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
                              {t(`dmimo.chats.${msg.textKey}`)}
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
                    aria-label={t("dmimo.contacts.detail_aria", {
                      name: selectedContact.name,
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
                      {selectedContact.name}
                    </Typography>

                    {selectedContact.phone && (
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: "#D4F7E8",
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
                            bgcolor: "#00D084",
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
                            {t("dmimo.contacts.phone_label")}
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
                          bgcolor: "#B3E8D4",
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
                            bgcolor: "#00D084",
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
                            {t("dmimo.contacts.email_label")}
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
                    aria-label={t("dmimo.call_log.detail_aria", {
                      name: selectedCall.name,
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
                          {t(`dmimo.call_log.types.${selectedCall.type}`)}
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

export default ImoPage;
