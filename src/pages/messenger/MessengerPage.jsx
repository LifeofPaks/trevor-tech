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
import { SiFacebook } from "react-icons/si"; // Facebook Messenger icon
import { RiCheckDoubleFill } from "react-icons/ri";
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

// === Facebook-Style Data ===

// Chat Data (Facebook-style conversations)
const chats = [
  {
    id: 1,
    name: "Emily Chen",
    avatar: "https://i.pravatar.cc/150?img=15",
    lastMessage: "Haha, that's hilarious!",
    time: "10:25",
    messages: [
      { text: "Did you see the new trailer?", time: "10:20", incoming: true },
      { text: "YES! The graphics are insane", time: "10:22", incoming: false },
      { text: "Haha, that's hilarious!", time: "10:25", incoming: true },
    ],
  },
  {
    id: 2,
    name: "Michael Torres",
    avatar: "https://i.pravatar.cc/150?img=12",
    lastMessage: "I'll be there in 10",
    time: "09:58",
    messages: [
      { text: "Still at the office?", time: "09:50", incoming: true },
      { text: "Yeah, wrapping up", time: "09:52", incoming: false },
      { text: "I'll be there in 10", time: "09:58", incoming: false },
    ],
  },
  {
    id: 3,
    name: "Sarah Kim",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "Thanks for the invite!",
    time: "Yesterday",
    messages: [
      { text: "Party at my place Saturday!", time: "14:30", incoming: true },
      { text: "Thanks for the invite!", time: "15:10", incoming: false },
    ],
  },
  {
    id: 4,
    name: "David Patel",
    avatar: "https://i.pravatar.cc/150?img=16",
    lastMessage: "Check your email",
    time: "Monday",
    messages: [
      { text: "Sent you the files", time: "11:00", incoming: true },
      { text: "Got it, thanks!", time: "11:05", incoming: false },
      { text: "Check your email", time: "11:30", incoming: false },
    ],
  },
  {
    id: 5,
    name: "Lisa Wong",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "Let's do lunch tomorrow",
    time: "12:15",
    messages: [
      { text: "Free for lunch?", time: "12:00", incoming: true },
      { text: "Yes! 1pm?", time: "12:10", incoming: false },
      { text: "Let's do lunch tomorrow", time: "12:15", incoming: true },
    ],
  },
];

// Contact Data
const contacts = [
  {
    id: 1,
    name: "Alex Rivera",
    avatar: "https://i.pravatar.cc/150?img=3",
    phone: "555-123-4567",
    email: "alex.rivera@fb.com",
  },
  {
    id: 2,
    name: "Brianna Lee",
    avatar: "https://i.pravatar.cc/150?img=4",
    phone: "555-987-6543",
    email: "brianna.lee@fb.com",
  },
  {
    id: 3,
    name: "Carlos Mendoza",
    avatar: "https://i.pravatar.cc/150?img=5",
    phone: "555-456-7890",
    email: "carlos.m@fb.com",
  },
  {
    id: 4,
    name: "Diana Foster",
    avatar: "https://i.pravatar.cc/150?img=6",
    phone: "555-321-0987",
    email: "diana.f@fb.com",
  },
  {
    id: 5,
    name: "Ethan Brooks",
    avatar: "https://i.pravatar.cc/150?img=7",
    phone: "555-789-0123",
    email: "ethan.b@fb.com",
  },
  {
    id: 6,
    name: "Fiona Grant",
    avatar: "https://i.pravatar.cc/150?img=8",
    phone: "555-654-3210",
    email: "fiona.g@fb.com",
  },
  {
    id: 7,
    name: "Gabriel Ortiz",
    avatar: "https://i.pravatar.cc/150?img=9",
    phone: "555-210-9876",
    email: "gabriel.o@fb.com",
  },
  {
    id: 8,
    name: "Hannah Park",
    avatar: "https://i.pravatar.cc/150?img=10",
    phone: "555-876-5432",
    email: "hannah.p@fb.com",
  },
  {
    id: 9,
    name: "Isaac Newton",
    avatar: "https://i.pravatar.cc/150?img=11",
    phone: "555-345-6789",
    email: "isaac.n@fb.com",
  },
];

// Call Logs
const callLogs = [
  {
    id: 1,
    name: "Emily Chen",
    avatar: "https://i.pravatar.cc/150?img=15",
    type: "outgoing",
    time: "2025-10-27 14:30",
    duration: "12:45",
  },
  {
    id: 2,
    name: "Michael Torres",
    avatar: "https://i.pravatar.cc/150?img=12",
    type: "incoming",
    time: "2025-10-26 09:15",
    duration: "08:20",
  },
  {
    id: 3,
    name: "Sarah Kim",
    avatar: "https://i.pravatar.cc/150?img=1",
    type: "missed",
    time: "2025-10-25 18:42",
  },
  {
    id: 4,
    name: "David Patel",
    avatar: "https://i.pravatar.cc/150?img=16",
    type: "outgoing",
    time: "2025-10-24 11:10",
    duration: "05:30",
  },
  {
    id: 5,
    name: "Lisa Wong",
    avatar: "https://i.pravatar.cc/150?img=2",
    type: "incoming",
    time: "2025-10-23 13:05",
    duration: "15:10",
  },
];

const FacebookPage = () => {
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
      return <FiPhoneCall sx={{ fontSize: 16, color: "#10b981" }} />;
    if (type === "incoming")
      return <FiPhoneIncoming sx={{ fontSize: 16, color: "#10b981" }} />;
    return <FiPhoneMissed sx={{ fontSize: 16, color: "#ef4444" }} />;
  };

  const groupContactsByLetter = () => {
    const grouped = {};
    contacts.forEach((contact) => {
      const letter = contact.name[0].toUpperCase();
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
              Messenger
              <IoLogoBitbucket className="text-[#0695c8] rotate-[180deg]" />
            </h1>
          </div>
          <BindPhone />
        </div>
      </header>

      <Box
        sx={{
          minHeight: "100vh",
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
              sx={{
                mb: 3,
                "& .MuiTabs-indicator": { bgcolor: "primary.main", height: 3 },
              }}
            >
              <Tab
                icon={<FiMessageSquare />}
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
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          src={chat.avatar}
                          sx={{ width: 48, height: 48 }}
                        />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            sx={{ fontWeight: 600, color: "text.primary" }}
                          >
                            {chat.name}
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
                            {chat.lastMessage}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{ fontSize: "0.75rem", color: "#8a8d91" }}
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
                            key={contact.id}
                            sx={{
                              p: 2,
                              cursor: "pointer",
                              "&:hover": { bgcolor: "#f5f6f7" },
                              borderBottom: "1px solid #e4e6eb",
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
                                sx={{ fontWeight: 500, color: "text.primary" }}
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
                              }}
                            >
                              {getCallIcon(call.type)}
                            </Box>
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              sx={{ fontWeight: 600, color: "text.primary" }}
                            >
                              {call.name}
                            </Typography>
                            <Typography sx={{ fontSize: "0.875rem", color }}>
                              {call.type.charAt(0).toUpperCase() +
                                call.type.slice(1)}
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
                        sx={{ fontWeight: 700, color: "text.primary" }}
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
                              {msg.text}
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
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "text.primary" }}
                    >
                      {selectedContact.name}
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
                            Number
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 600, color: "text.primary" }}
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
                            Email
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 600, color: "text.primary" }}
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
                      sx={{ fontWeight: 700, color: "text.primary" }}
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
                          {selectedCall.duration} Answered
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
