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
    name: "Marcus Hale",
    avatar: "https://i.pravatar.cc/150?img=4",
    lastMessage: "I left my watch at your place",
    time: "03:45",
    messages: [
      { text: "You still online?", time: "03:30", incoming: true },
      { text: "Yeah. Can’t sleep", time: "03:31", incoming: false },
      { text: "I left my watch at your place", time: "03:45", incoming: false },
    ],
  },
  {
    id: 2,
    name: "Nico Rivera",
    avatar: "https://i.pravatar.cc/150?img=5",
    lastMessage: "She has no clue",
    time: "02:10",
    messages: [
      { text: "That was risky", time: "01:55", incoming: true },
      { text: "But we got away with it", time: "01:56", incoming: false },
      { text: "She has no clue", time: "02:10", incoming: false },
    ],
  },
  {
    id: 3,
    name: "Eli Grant",
    avatar: "https://i.pravatar.cc/150?img=6",
    lastMessage: "Send the pic again",
    time: "01:20",
    messages: [
      { text: "You deleted it?", time: "01:05", incoming: true },
      { text: "Had to. Too dangerous", time: "01:06", incoming: false },
      { text: "Send the pic again", time: "01:20", incoming: false },
    ],
  },
  {
    id: 4,
    name: "Leo Pierce",
    avatar: "https://i.pravatar.cc/150?img=7",
    lastMessage: "I’m in your room",
    time: "00:35",
    messages: [
      { text: "You home?", time: "00:20", incoming: true },
      { text: "She’s asleep. Door’s open", time: "00:21", incoming: false },
      { text: "I’m in your room", time: "00:35", incoming: false },
    ],
  },
  {
    id: 5,
    name: "Owen Blake",
    avatar: "https://i.pravatar.cc/150?img=8",
    lastMessage: "I’m addicted to you",
    time: "04:00",
    messages: [
      {
        text: "I can’t stop thinking about you",
        time: "03:45",
        incoming: true,
      },
      { text: "Same. Every second", time: "03:46", incoming: false },
      { text: "I’m addicted to you", time: "04:00", incoming: false },
    ],
  },
  {
    id: 6,
    name: "Finn Cole",
    avatar: "https://i.pravatar.cc/150?img=9",
    lastMessage: "I told her I was on a call",
    time: "22:50",
    messages: [
      { text: "Where are you?", time: "22:30", incoming: true },
      { text: "Work call. Can’t talk", time: "22:31", incoming: false },
      { text: "Liar", time: "22:32", incoming: true },
      { text: "I told her I was on a call", time: "22:50", incoming: false },
    ],
  },
  {
    id: 7,
    name: "Theo Shaw",
    avatar: "https://i.pravatar.cc/150?img=10",
    lastMessage: "This can’t keep happening",
    time: "21:15",
    messages: [
      { text: "We said last time was final", time: "21:00", incoming: true },
      { text: "I know", time: "21:01", incoming: false },
      { text: "Then why am I here?", time: "21:02", incoming: true },
      { text: "This can’t keep happening", time: "21:15", incoming: false },
    ],
  },
  {
    id: 8,
    name: "Zane Knox",
    avatar: "https://i.pravatar.cc/150?img=11",
    lastMessage: "I dream about you every night",
    time: "05:05",
    messages: [
      { text: "You sleeping?", time: "04:50", incoming: true },
      { text: "No. You?", time: "04:51", incoming: false },
      { text: "Thinking of you", time: "04:52", incoming: true },
      { text: "I dream about you every night", time: "05:05", incoming: false },
    ],
  },
  {
    id: 9,
    name: "Jett Miles",
    avatar: "https://i.pravatar.cc/150?img=12",
    lastMessage: "Delete after reading",
    time: "02:30",
    messages: [
      {
        text: "I can’t stop replaying last night",
        time: "02:15",
        incoming: true,
      },
      { text: "That thing you did...", time: "02:16", incoming: false },
      { text: "Shh. Don’t type it", time: "02:17", incoming: true },
      { text: "Delete after reading", time: "02:30", incoming: false },
    ],
  },
  {
    id: 10,
    name: "Kade Vance",
    avatar: "https://i.pravatar.cc/150?img=13",
    lastMessage: "I’m falling for you",
    time: "01:45",
    messages: [
      { text: "This is getting serious", time: "01:30", incoming: true },
      { text: "I know", time: "01:31", incoming: false },
      { text: "But I don’t want to stop", time: "01:32", incoming: true },
      { text: "I’m falling for you", time: "01:45", incoming: false },
    ],
  },
  {
    id: 11,
    name: "Rhett Stone",
    avatar: "https://i.pravatar.cc/150?img=14",
    lastMessage: "Your scent is on my jacket",
    time: "06:00",
    messages: [
      { text: "I can still smell you", time: "05:40", incoming: true },
      { text: "Good", time: "05:41", incoming: false },
      { text: "Your scent is on my jacket", time: "06:00", incoming: false },
    ],
  },
  {
    id: 12,
    name: "Cruz Reid",
    avatar: "https://i.pravatar.cc/150?img=15",
    lastMessage: "I lied to her for you",
    time: "23:00",
    messages: [
      { text: "She asked where I was", time: "22:45", incoming: true },
      { text: "What’d you say?", time: "22:46", incoming: false },
      { text: "With you", time: "22:47", incoming: true },
      { text: "I lied to her for you", time: "23:00", incoming: false },
    ],
  },
];

// === Contacts (Skype uses "Contacts") ===
const contacts = [
  ...chats.map((c) => ({
    id: c.id,
    name: c.name,
    avatar: c.avatar,
    phone: `+1 555-${String(2000 + c.id).padStart(4, "0")}`,
    email: `${c.name.split(" ")[0].toLowerCase()}@skype.com`,
  })),
];

// === Call Logs ===
const callLogs = [
  {
    id: 1,
    name: "Marcus Hale",
    avatar: "https://i.pravatar.cc/150?img=4",
    type: "outgoing",
    time: "2025-10-28 23:55",
    duration: "21:30",
  },
  {
    id: 2,
    name: "Nico Rivera",
    avatar: "https://i.pravatar.cc/150?img=5",
    type: "incoming",
    time: "2025-10-28 22:40",
    duration: "15:10",
  },
  {
    id: 3,
    name: "Eli Grant",
    avatar: "https://i.pravatar.cc/150?img=6",
    type: "missed",
    time: "2025-10-28 21:20",
  },
  {
    id: 4,
    name: "Leo Pierce",
    avatar: "https://i.pravatar.cc/150?img=7",
    type: "outgoing",
    time: "2025-10-27 20:55",
    duration: "39:45",
  },
  {
    id: 5,
    name: "Owen Blake",
    avatar: "https://i.pravatar.cc/150?img=8",
    type: "incoming",
    time: "2025-10-27 19:30",
    duration: "31:20",
  },
  {
    id: 6,
    name: "Rhett Stone",
    avatar: "https://i.pravatar.cc/150?img=14",
    type: "missed",
    time: "2025-10-27 18:00",
  },
];

const Skype = () => {
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
              Skype
              <FaSkype className="text-[#00AFF0]" />
            </h1>
          </div>
          <BindPhone />
        </div>
      </header>

      <Box
        sx={{
          minHeight: "100vh",
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
                icon={<FaSkype />}
                iconPosition="start"
                label={isMobile ? "" : "Chats"}
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
                label={isMobile ? "" : "Calls"}
                value="calls"
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
              {tab === "calls" && (
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
                        {new Date(selectedCall.time).toLocaleString()}
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

export default Skype;
