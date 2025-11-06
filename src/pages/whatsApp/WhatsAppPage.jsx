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
  FiMessageSquare,
  FiUsers,
  FiPhone,
  FiPhoneCall,
  FiPhoneIncoming,
  FiPhoneMissed,
  FiMail,
} from "react-icons/fi";
import { IoArrowBackCircle } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import BindPhone from "../../components/demo/BindPhone";
import { RiCheckDoubleFill, RiWhatsappFill } from "react-icons/ri";

// Create custom theme with cyan primary color
const theme = createTheme({
  palette: {
    primary: {
      main: "#066a5e",
      light: "#38b2d6",
      dark: "#066a5e",
    },
    secondary: {
      main: "#c7f7f0",
      light: "#e0fdf9",
      dark: "#9ee6db",
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

// Sample Data with updated keys
const chats = [
  {
    id: 1,
    nameKey: "drJames.name",
    lastMessageKey: "drJames.lastMessage",
    avatar: "https://i.pravatar.cc/150?img=15",
    time: "09:35",
    messages: [
      { textKey: "drJames.messages.msg1.text", time: "09:30", incoming: true },
      { textKey: "drJames.messages.msg2.text", time: "09:32", incoming: false },
      { textKey: "drJames.messages.msg3.text", time: "09:35", incoming: true },
    ],
  },
  {
    id: 2,
    nameKey: "sarahT.name",
    lastMessageKey: "sarahT.lastMessage",
    avatar: "https://i.pravatar.cc/150?img=12",
    time: "10:34",
    messages: [
      { textKey: "sarahT.messages.msg1.text", time: "10:00", incoming: false },
      { textKey: "sarahT.messages.msg2.text", time: "10:42", incoming: true },
      { textKey: "sarahT.messages.msg3.text", time: "10:45", incoming: false },
      { textKey: "sarahT.messages.msg4.text", time: "10:54", incoming: true },
    ],
  },
  {
    id: 3,
    nameKey: "jeromeT.name",
    lastMessageKey: "jeromeT.lastMessage",
    avatar: "https://i.pravatar.cc/150?img=1",
    time: "2022-01-07 10:45",
    messages: [
      { textKey: "jeromeT.messages.msg1.text", time: "10:50", incoming: true },
      { textKey: "jeromeT.messages.msg2.text", time: "11:10", incoming: false },
      { textKey: "jeromeT.messages.msg3.text", time: "11:15", incoming: false },
    ],
  },
  {
    id: 4,
    nameKey: "sallyJ.name",
    lastMessageKey: "sallyJ.lastMessage",
    avatar: "https://i.pravatar.cc/150?img=16",
    time: "11:41",
    messages: [
      { textKey: "sallyJ.messages.msg1.text", time: "11:50", incoming: true },
      { textKey: "sallyJ.messages.msg2.text", time: "11:51", incoming: false },
      { textKey: "sallyJ.messages.msg3.text", time: "11:58", incoming: false },
    ],
  },
  {
    id: 5,
    nameKey: "bob.name",
    lastMessageKey: "bob.lastMessage",
    avatar: "https://i.pravatar.cc/150?img=2",
    time: "12:00",
    messages: [
      { textKey: "bob.messages.msg1.text", time: "12:11", incoming: true },
      { textKey: "bob.messages.msg2.text", time: "12:33", incoming: false },
      { textKey: "bob.messages.msg3.text", time: "12:52", incoming: true },
      { textKey: "bob.messages.msg4.text", time: "12:58", incoming: false },
    ],
  },
];

const contacts = [
  {
    id: 1,
    nameKey: "adam.name",
    emailKey: "adam.email",
    avatar: "https://i.pravatar.cc/150?img=3",
    phone: "3474652243",
  },
  {
    id: 2,
    nameKey: "alicia.name",
    emailKey: "alicia.email",
    avatar: "https://i.pravatar.cc/150?img=4",
    phone: "3457565667",
  },
  {
    id: 3,
    nameKey: "andrew.name",
    emailKey: "andrew.email",
    avatar: "https://i.pravatar.cc/150?img=5",
    phone: "3471122334",
  },
  {
    id: 4,
    nameKey: "arya.name",
    emailKey: "arya.email",
    avatar: "https://i.pravatar.cc/150?img=6",
    phone: "3479988776",
  },
  {
    id: 5,
    nameKey: "alice.name",
    emailKey: "alice.email",
    avatar: "https://i.pravatar.cc/150?img=7",
    phone: "3472233445",
  },
  {
    id: 6,
    nameKey: "bart.name",
    emailKey: "bart.email",
    avatar: "https://i.pravatar.cc/150?img=8",
    phone: "3475566778",
  },
  {
    id: 7,
    nameKey: "barry.name",
    emailKey: "barry.email",
    avatar: "https://i.pravatar.cc/150?img=9",
    phone: "3478899001",
  },
  {
    id: 8,
    nameKey: "brian.name",
    emailKey: "brian.email",
    avatar: "https://i.pravatar.cc/150?img=10",
    phone: "3473344556",
  },
  {
    id: 9,
    nameKey: "brenda.name",
    emailKey: "brenda.email",
    avatar: "https://i.pravatar.cc/150?img=11",
    phone: "3476677889",
  },
];

const callLogs = [
  {
    id: 1,
    nameKey: "adam.name",
    type: "outgoing",
    duration: "20:30",
    avatar: "https://i.pravatar.cc/150?img=3",
    time: "2022-02-10 20:30",
  },
  {
    id: 2,
    nameKey: "sarah.name",
    type: "outgoing",
    duration: "09:45",
    avatar: "https://i.pravatar.cc/150?img=12",
    time: "2022-02-08 09:45",
  },
  {
    id: 3,
    nameKey: "jane.name",
    type: "missed",
    avatar: "https://i.pravatar.cc/150?img=13",
    time: "2022-02-04 18:38",
  },
  {
    id: 4,
    nameKey: "arya.name",
    type: "incoming",
    duration: "05:20",
    avatar: "https://i.pravatar.cc/150?img=6",
    time: "2022-01-28 09:30",
  },
  {
    id: 5,
    nameKey: "alicia.name",
    type: "outgoing",
    duration: "12:15",
    avatar: "https://i.pravatar.cc/150?img=4",
    time: "2022-01-15 17:30",
  },
  {
    id: 6,
    nameKey: "tom.name",
    type: "missed",
    avatar: "https://i.pravatar.cc/150?img=14",
    time: "2022-01-11 07:56",
  },
  {
    id: 7,
    nameKey: "drJames.name",
    type: "outgoing",
    duration: "08:30",
    avatar: "https://i.pravatar.cc/150?img=15",
    time: "2022-01-10 15:45",
  },
  {
    id: 8,
    nameKey: "brenda.name",
    type: "outgoing",
    duration: "03:45",
    avatar: "https://i.pravatar.cc/150?img=11",
    time: "2022-01-01 10:30",
  },
];

const WhatsAppPage = () => {
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
      const name = t(`dmwhatsapp.contacts.${contact.nameKey}`);
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
              {t("dmwhatsapp.header.title")}{" "}
              <RiWhatsappFill className="text-[#066a5e]" />
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
              aria-label={t("dmwhatsapp.tabs.aria_label")}
            >
              <Tab
                icon={<RiWhatsappFill />}
                iconPosition="start"
                label={isMobile ? "" : t("dmwhatsapp.tabs.chat")}
                value="chat"
                aria-label={t("dmwhatsapp.tabs.chat_aria")}
              />
              <Tab
                icon={<FiUsers />}
                iconPosition="start"
                label={isMobile ? "" : t("dmwhatsapp.tabs.contacts")}
                value="contacts"
                aria-label={t("dmwhatsapp.tabs.contacts_aria")}
              />
              <Tab
                icon={<FiPhone />}
                iconPosition="start"
                label={isMobile ? "" : t("dmwhatsapp.tabs.call_log")}
                value="call-log"
                aria-label={t("dmwhatsapp.tabs.call_log_aria")}
              />
            </Tabs>
          )}

          {/* Back Button */}
          {showDetail && (
            <Box sx={{ mb: 2 }}>
              <IconButton
                onClick={handleBack}
                sx={{ color: "primary.main" }}
                aria-label={t("dmwhatsapp.back_button_aria")}
              >
                <IoArrowBackCircle className="!text-[25px]" />
              </IconButton>
            </Box>
          )}

          {/* Content */}
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
                overflowY: "auto",
              }}
              aria-label={t(
                tab === "chat"
                  ? "dmwhatsapp.chat.list_aria"
                  : tab === "contacts"
                  ? "dmwhatsapp.contacts.list_aria"
                  : "dmwhatsapp.callLogs.list_aria"
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
                        "&:hover": { bgcolor: "rgba(0,0,0,0.02)" },
                        transition: "background 0.2s",
                      }}
                      onClick={() => setSelectedChat(chat)}
                      role="button"
                      aria-label={t("dmwhatsapp.chat.item_aria", {
                        name: t(`dmwhatsapp.chats.${chat.nameKey}`),
                      })}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          src={chat.avatar}
                          sx={{ width: 48, height: 48 }}
                          alt={t(`dmwhatsapp.chats.${chat.nameKey}`)}
                        />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            sx={{ fontWeight: 600, color: "#1f2937" }}
                          >
                            {t(`dmwhatsapp.chats.${chat.nameKey}`)}
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
                            {t(`dmwhatsapp.chats.${chat.lastMessageKey}`)}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{ fontSize: "0.75rem", color: "#9ca3af" }}
                        >
                          {/* Extract time part if date-time string, else show full time */}
                          {chat.time.split(" ")[1] || chat.time}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              )}

              {/* Contact List */}
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
                            role="button"
                            aria-label={t("dmwhatsapp.contacts.item_aria", {
                              name: t(`dmwhatsapp.contacts.${contact.nameKey}`),
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
                                alt={t(
                                  `dmwhatsapp.contacts.${contact.nameKey}`
                                )}
                              />
                              <Typography
                                sx={{ fontWeight: 500, color: "#1f2937" }}
                              >
                                {t(`dmwhatsapp.contacts.${contact.nameKey}`)}
                              </Typography>
                            </Stack>
                          </Box>
                        ))}
                      </Box>
                    ))}
                </Stack>
              )}

              {/* Call Log List */}
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
                          "&:hover": { bgcolor: "rgba(0,0,0,0.02)" },
                          transition: "background 0.2s",
                        }}
                        onClick={() => setSelectedCall(call)}
                        role="button"
                        aria-label={t("dmwhatsapp.callLogs.item_aria", {
                          name: t(`dmwhatsapp.callLogs.${call.nameKey}`),
                        })}
                      >
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Box sx={{ position: "relative" }}>
                            <Avatar
                              src={call.avatar}
                              sx={{ width: 48, height: 48 }}
                              alt={t(`dmwhatsapp.callLogs.${call.nameKey}`)}
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
                              sx={{ fontWeight: 600, color: "#1f2937" }}
                            >
                              {t(`dmwhatsapp.callLogs.${call.nameKey}`)}
                            </Typography>
                            <Typography sx={{ fontSize: "0.875rem", color }}>
                              {t(`dmwhatsapp.callTypes.${call.type}`)}
                            </Typography>
                          </Box>
                          <Typography
                            sx={{ fontSize: "0.75rem", color: "#9ca3af" }}
                          >
                            {/* Extract time part if date-time string, else show full time */}
                            {call.time.split(" ")[1] || call.time}
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
                  borderRadius: 4,
                  p: 4,
                  height: "100%",
                  overflowY: "auto",
                }}
                aria-label={t(
                  selectedChat
                    ? "dmwhatsapp.chat.detail_aria"
                    : selectedContact
                    ? "dmwhatsapp.contacts.detail_aria"
                    : "dmwhatsapp.callLogs.detail_aria",
                  {
                    name: selectedChat
                      ? t(`dmwhatsapp.chats.${selectedChat.nameKey}`)
                      : selectedContact
                      ? t(`dmwhatsapp.contacts.${selectedContact.nameKey}`)
                      : t(`dmwhatsapp.callLogs.${selectedCall.nameKey}`),
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
                        alt={t(`dmwhatsapp.chats.${selectedChat.nameKey}`)}
                      />
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, color: "#1f2937" }}
                      >
                        {t(`dmwhatsapp.chats.${selectedChat.nameKey}`)}
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
                              bgcolor: msg.incoming ? "#f3f4f6" : "#066a5e",
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
                              {t(`dmwhatsapp.chats.${msg.textKey}`)}
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
                  <Stack spacing={4} alignItems="center">
                    <Avatar
                      src={selectedContact.avatar}
                      sx={{ width: 120, height: 120 }}
                      alt={t(`dmwhatsapp.contacts.${selectedContact.nameKey}`)}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "#1f2937" }}
                    >
                      {t(`dmwhatsapp.contacts.${selectedContact.nameKey}`)}
                    </Typography>

                    {selectedContact.phone && (
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: "#dcfce7",
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
                            bgcolor: "#10b981",
                            borderRadius: "50%",
                            p: 1,
                            display: "flex",
                          }}
                        >
                          <FiPhone className="!text-white !text-[20px]" />
                        </Box>
                        <Box>
                          <Typography
                            sx={{ fontSize: "0.75rem", color: "#6b7280" }}
                          >
                            {t("dmwhatsapp.contacts.number")}
                          </Typography>
                          <Typography sx={{ fontWeight: 500 }}>
                            {selectedContact.phone}
                          </Typography>
                        </Box>
                      </Paper>
                    )}

                    {selectedContact.emailKey && (
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
                            bgcolor: "#0695c8",
                            borderRadius: "50%",
                            p: 1,
                            display: "flex",
                          }}
                        >
                          <FiMail className="!text-white !text-[20px]" />
                        </Box>
                        <Box>
                          <Typography
                            sx={{ fontSize: "0.75rem", color: "#6b7280" }}
                          >
                            {t("dmwhatsapp.contacts.email")}
                          </Typography>
                          <Typography sx={{ fontWeight: 500 }}>
                            {t(
                              `dmwhatsapp.contacts.${selectedContact.emailKey}`
                            )}
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
                      alt={t(`dmwhatsapp.callLogs.${selectedCall.nameKey}`)}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "#1f2937" }}
                    >
                      {t(`dmwhatsapp.callLogs.${selectedCall.nameKey}`)}
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
                          {selectedCall.duration}{" "}
                          {t("dmwhatsapp.call.answered_calls")}
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

export default WhatsAppPage;
