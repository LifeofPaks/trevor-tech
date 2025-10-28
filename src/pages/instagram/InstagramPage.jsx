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

// === Instagram-Style Data ===
const chats = [
  {
    id: 1,
    name: "jessica.travel",
    avatar: "https://i.pravatar.cc/150?img=68",
    lastMessage: "Just landed in Bali",
    time: "2m",
    messages: [
      { text: "How's Tokyo?", time: "10:20", incoming: true },
      { text: "Amazing! Just landed in Bali", time: "10:22", incoming: false },
    ],
  },
  {
    id: 2,
    name: "alex.codes",
    avatar: "https://i.pravatar.cc/150?img=56",
    lastMessage: "React 19 is wild",
    time: "15m",
    messages: [
      { text: "Did you try the new React 19?", time: "09:50", incoming: true },
      { text: "React 19 is wild", time: "09:52", incoming: false },
    ],
  },
  {
    id: 3,
    name: "maria.art",
    avatar: "https://i.pravatar.cc/150?img=3",
    lastMessage: "Sent you a sketch",
    time: "1h",
    messages: [
      { text: "Working on your portrait", time: "14:30", incoming: true },
      { text: "Sent you a sketch", time: "14:32", incoming: false },
    ],
  },
  {
    id: 4,
    name: "tom.foodie",
    avatar: "https://i.pravatar.cc/150?img=24",
    lastMessage: "That ramen was",
    time: "3h",
    messages: [
      { text: "Best ramen in town", time: "11:00", incoming: true },
      { text: "That ramen was", time: "11:02", incoming: false },
    ],
  },
  {
    id: 5,
    name: "lily.yoga",
    avatar: "https://i.pravatar.cc/150?img=47",
    lastMessage: "Morning flow at 7",
    time: "5h",
    messages: [
      { text: "Join me for sunrise yoga?", time: "06:45", incoming: true },
      { text: "Morning flow at 7", time: "06:50", incoming: false },
    ],
  },
];

const contacts = [
  {
    id: 1,
    name: "ava.dance",
    avatar: "https://i.pravatar.cc/150?img=12",
    phone: "+1 555-0101",
    email: "ava@ig.com",
  },
  {
    id: 2,
    name: "ben.guitar",
    avatar: "https://i.pravatar.cc/150?img=33",
    phone: "+1 555-0102",
    email: "ben@ig.com",
  },
  {
    id: 3,
    name: "chloe.fit",
    avatar: "https://i.pravatar.cc/150?img=45",
    phone: "+1 555-0103",
    email: "chloe@ig.com",
  },
  {
    id: 4,
    name: "diego.photo",
    avatar: "https://i.pravatar.cc/150?img=61",
    phone: "+1 555-0104",
    email: "diego@ig.com",
  },
  {
    id: 5,
    name: "ella.bake",
    avatar: "https://i.pravatar.cc/150?img=19",
    phone: "+1 555-0105",
    email: "ella@ig.com",
  },
  {
    id: 6,
    name: "finn.surf",
    avatar: "https://i.pravatar.cc/150?img=52",
    phone: "+1 555-0106",
    email: "finn@ig.com",
  },
  {
    id: 7,
    name: "grace.run",
    avatar: "https://i.pravatar.cc/150?img=28",
    phone: "+1 555-0107",
    email: "grace@ig.com",
  },
  {
    id: 8,
    name: "henry.drone",
    avatar: "https://i.pravatar.cc/150?img=39",
    phone: "+1 555-0108",
    email: "henry@ig.com",
  },
  {
    id: 9,
    name: "isla.paint",
    avatar: "https://i.pravatar.cc/150?img=7",
    phone: "+1 555-0109",
    email: "isla@ig.com",
  },
];

const callLogs = [
  {
    id: 1,
    name: "jessica.travel",
    avatar: "https://i.pravatar.cc/150?img=68",
    type: "outgoing",
    time: "2025-10-28 09:30",
    duration: "08:12",
  },
  {
    id: 2,
    name: "alex.codes",
    avatar: "https://i.pravatar.cc/150?img=56",
    type: "incoming",
    time: "2025-10-27 19:45",
    duration: "22:30",
  },
  {
    id: 3,
    name: "maria.art",
    avatar: "https://i.pravatar.cc/150?img=3",
    type: "missed",
    time: "2025-10-27 14:20",
  },
  {
    id: 4,
    name: "tom.foodie",
    avatar: "https://i.pravatar.cc/150?img=24",
    type: "outgoing",
    time: "2025-10-26 12:15",
    duration: "05:40",
  },
  {
    id: 5,
    name: "lily.yoga",
    avatar: "https://i.pravatar.cc/150?img=47",
    type: "incoming",
    time: "2025-10-26 07:00",
    duration: "10:25",
  },
];

const InstagramPage = () => {
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
              Instagram
              <IoLogoBitbucket className="text-[#0695c8] rotate-[180deg]" />
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
                label={isMobile ? "" : "Messages"}
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
                        "&:hover": { bgcolor: "#fafafa" },
                      }}
                      onClick={() => setSelectedChat(chat)}
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
                    maxHeight: "70vh", // ensure scrolling still works
                    overflowY: "auto",
                  }}
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
                          "&:hover": { bgcolor: "#fafafa" },
                        }}
                        onClick={() => setSelectedCall(call)}
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
                  <Stack spacing={3}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        src={selectedChat.avatar}
                        sx={{ width: 72, height: 72 }}
                      />
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, color: "text.primary" }}
                      >
                        {selectedChat.name}
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
                              {msg.text}
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
                  <Stack spacing={4} alignItems="center">
                    <Avatar
                      src={selectedContact.avatar}
                      sx={{ width: 140, height: 140 }}
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
                            Phone
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
                      sx={{ width: 140, height: 140 }}
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
                          {selectedCall.duration} • {selectedCall.type}
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
