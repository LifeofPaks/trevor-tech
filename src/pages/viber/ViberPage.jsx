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
import { IoArrowBackCircle, IoLogoBitbucket } from "react-icons/io5";
import BindPhone from "../../components/demo/BindPhone";
import { RiCheckDoubleFill } from "react-icons/ri";
import { FaViber } from "react-icons/fa";

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
    name: "Alex Rivera",
    avatar: "https://i.pravatar.cc/150?img=32",
    lastMessage: "I can't stop thinking about you",
    time: "00:45",
    messages: [
      { text: "You're still awake?", time: "00:30", incoming: true },
      {
        text: "Can't sleep. Thinking about last night",
        time: "00:31",
        incoming: false,
      },
      { text: "Same. I miss your touch", time: "00:32", incoming: true },
      {
        text: "I can't stop thinking about you",
        time: "00:45",
        incoming: false,
      },
    ],
  },
  {
    id: 2,
    name: "Liam Park",
    avatar: "https://i.pravatar.cc/150?img=33",
    lastMessage: "Delete this chat",
    time: "23:20",
    messages: [
      { text: "That hotel was perfect", time: "23:00", incoming: true },
      { text: "We have to do it again", time: "23:01", incoming: false },
      { text: "Next week?", time: "23:02", incoming: true },
      { text: "Delete this chat", time: "23:20", incoming: false },
    ],
  },
  {
    id: 3,
    name: "Ethan Brooks",
    avatar: "https://i.pravatar.cc/150?img=30",
    lastMessage: "She's asleep",
    time: "22:15",
    messages: [
      { text: "Can you talk?", time: "22:00", incoming: true },
      { text: "She's asleep", time: "22:01", incoming: false },
      { text: "I wish I was with you", time: "22:02", incoming: true },
      { text: "Same. This is torture", time: "22:15", incoming: false },
    ],
  },
  {
    id: 4,
    name: "Noah Lee",
    avatar: "https://i.pravatar.cc/150?img=31",
    lastMessage: "Send the pic",
    time: "21:40",
    messages: [
      { text: "What are you wearing?", time: "21:30", incoming: true },
      { text: "Nothing you haven't seen", time: "21:31", incoming: false },
      { text: "Send the pic", time: "21:32", incoming: true },
      { text: "Deleting in 10...", time: "21:40", incoming: false },
    ],
  },
  {
    id: 5,
    name: "Dylan Kim",
    avatar: "https://i.pravatar.cc/150?img=35",
    lastMessage: "I love you",
    time: "02:25",
    messages: [
      { text: "I shouldn't say this", time: "02:10", incoming: true },
      { text: "Say it", time: "02:11", incoming: false },
      { text: "I love you", time: "02:12", incoming: true },
      { text: "I love you more", time: "02:25", incoming: false },
    ],
  },
  {
    id: 6,
    name: "Carter Lee",
    avatar: "https://i.pravatar.cc/150?img=34",
    lastMessage: "Room 707",
    time: "19:55",
    messages: [
      { text: "Same hotel?", time: "19:40", incoming: true },
      { text: "Room 707", time: "19:41", incoming: false },
      { text: "I'll be there at 8", time: "19:42", incoming: true },
      { text: "Door's open", time: "19:55", incoming: false },
    ],
  },
  {
    id: 7,
    name: "Mason Wu",
    avatar: "https://i.pravatar.cc/150?img=36",
    lastMessage: "No one will know",
    time: "18:35",
    messages: [
      { text: "We have to be careful", time: "18:20", incoming: true },
      { text: "I know. But I can't stop", time: "18:21", incoming: false },
      { text: "Just one more time", time: "18:22", incoming: true },
      { text: "No one will know", time: "18:35", incoming: false },
    ],
  },
  {
    id: 8,
    name: "Ryan Chen",
    avatar: "https://i.pravatar.cc/150?img=37",
    lastMessage: "You're my secret",
    time: "01:20",
    messages: [
      {
        text: "I told my girlfriend I was working late",
        time: "01:00",
        incoming: true,
      },
      { text: "I told my boyfriend the same", time: "01:01", incoming: false },
      { text: "This is so wrong", time: "01:02", incoming: true },
      { text: "But you're my secret", time: "01:20", incoming: false },
    ],
  },
];

// === Contacts (Young Men Only) ===
const contacts = [
  {
    id: 1,
    name: "Alex Rivera",
    avatar: "https://i.pravatar.cc/150?img=32",
    phone: "+1 555-1001",
    email: "alex@viber.com",
  },
  {
    id: 2,
    name: "Liam Park",
    avatar: "https://i.pravatar.cc/150?img=33",
    phone: "+1 555-1002",
    email: "liam@viber.com",
  },
  {
    id: 3,
    name: "Ethan Brooks",
    avatar: "https://i.pravatar.cc/150?img=30",
    phone: "+1 555-1003",
    email: "ethan@viber.com",
  },
  {
    id: 4,
    name: "Noah Lee",
    avatar: "https://i.pravatar.cc/150?img=31",
    phone: "+1 555-1004",
    email: "noah@viber.com",
  },
  {
    id: 5,
    name: "Dylan Kim",
    avatar: "https://i.pravatar.cc/150?img=35",
    phone: "+1 555-1005",
    email: "dylan@viber.com",
  },
  {
    id: 6,
    name: "Carter Lee",
    avatar: "https://i.pravatar.cc/150?img=34",
    phone: "+1 555-1006",
    email: "carter@viber.com",
  },
  {
    id: 7,
    name: "Mason Wu",
    avatar: "https://i.pravatar.cc/150?img=36",
    phone: "+1 555-1007",
    email: "mason@viber.com",
  },
  {
    id: 8,
    name: "Ryan Chen",
    avatar: "https://i.pravatar.cc/150?img=37",
    phone: "+1 555-1008",
    email: "ryan@viber.com",
  },
];

// === Call Logs ===
const callLogs = [
  {
    id: 1,
    name: "Alex Rivera",
    avatar: "https://i.pravatar.cc/150?img=32",
    type: "outgoing",
    time: "2025-10-28 23:30",
    duration: "18:20",
  },
  {
    id: 2,
    name: "Liam Park",
    avatar: "https://i.pravatar.cc/150?img=33",
    type: "incoming",
    time: "2025-10-28 22:15",
    duration: "09:45",
  },
  {
    id: 3,
    name: "Ethan Brooks",
    avatar: "https://i.pravatar.cc/150?img=30",
    type: "missed",
    time: "2025-10-28 21:00",
  },
  {
    id: 4,
    name: "Noah Lee",
    avatar: "https://i.pravatar.cc/150?img=31",
    type: "outgoing",
    time: "2025-10-27 20:30",
    duration: "25:10",
  },
  {
    id: 5,
    name: "Dylan Kim",
    avatar: "https://i.pravatar.cc/150?img=35",
    type: "incoming",
    time: "2025-10-27 19:00",
    duration: "32:00",
  },
];

const ViberPage = () => {
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
        : "#EF4444"; // missed
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
              Viber
              <FaViber className="text-[#7B4B94]" />
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
            >
              <Tab
                icon={<FaViber />}
                iconPosition="start"
                label={isMobile ? "" : "Chat"}
                value="chat"
              />
              <Tab
                icon={<FiUsers />}
                iconPosition="start"
                label={isMobile ? "" : "Contacts"}
                value="contacts"
              />
              <Tab
                icon={<FiPhone />}
                iconPosition="start"
                label={isMobile ? "" : "Call Log"}
                value="call-log"
              />
            </Tabs>
          )}

          {/* Back Button */}
          {showDetail && (
            <Box sx={{ mb: 2 }}>
              <IconButton onClick={handleBack} sx={{ color: "primary.main" }}>
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
                            {chat.lastMessage}
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
                            {call.type.charAt(0).toUpperCase() +
                              call.type.slice(1)}
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
                  <Stack spacing={3}>
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
                              {msg.text}
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
                            Phone
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
                            Email
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
                  <Stack spacing={4} alignItems="center">
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
                        {selectedCall.time}
                      </Typography>
                      {selectedCall.duration && (
                        <Typography
                          sx={{ fontSize: "0.875rem", color: "#6b7280", mt: 1 }}
                        >
                          {selectedCall.duration} •{" "}
                          {selectedCall.type.charAt(0).toUpperCase() +
                            selectedCall.type.slice(1)}
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
