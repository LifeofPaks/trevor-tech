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
  FiArrowLeft,
  FiPhoneCall,
  FiPhoneIncoming,
  FiPhoneMissed,
  FiMail,
} from "react-icons/fi";
import { IoLogoBitbucket } from "react-icons/io5";
import BindPhone from "../../components/demo/BindPhone";

// Create custom theme with cyan primary color
const theme = createTheme({
  palette: {
    primary: {
      main: "#0695c8",
      light: "#38b2d6",
      dark: "#05728f",
    },
    secondary: {
      main: "#c7f7f0",
      light: "#e0fdf9",
      dark: "#9ee6db",
    },
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

// Sample Data
const chats = [
  {
    id: 1,
    name: "Dr. Jame's Office",
    avatar: "https://i.pravatar.cc/150?img=15",
    lastMessage: "You should come in tomorrow.",
    time: "2022-01-12 09:35",
    messages: [],
  },
  {
    id: 2,
    name: "Sarah, T",
    avatar: "https://i.pravatar.cc/150?img=12",
    lastMessage:
      "He loves you. of course, he'll forgive you. you just's gotta say you're sorry.",
    time: "2022-01-10 09:34",
    messages: [],
  },
  {
    id: 3,
    name: "Jerome T",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "Then I have a few meetings in the city.",
    time: "2022-01-07 10:45",
    messages: [
      {
        text: "Are you going to get home on time?",
        time: "2022-01-07 10:30",
        incoming: true,
      },
      {
        text: "Yes. I'm almost done at the office.",
        time: "2022-01-07 10:40",
        incoming: false,
      },
      {
        text: "Then I have a few meetings in the city.",
        time: "2022-01-07 10:45",
        incoming: false,
      },
    ],
  },
  {
    id: 4,
    name: "Sally, J",
    avatar: "https://i.pravatar.cc/150?img=16",
    lastMessage: "I'll be there as soon as I can.",
    time: "2022-01-06 10:41",
    messages: [],
  },
  {
    id: 5,
    name: "Bob",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "Thanks.",
    time: "2022-01-06 10:00",
    messages: [
      {
        text: "Nina, Tom said you weren't feeling well. Are you ok?",
        time: "2022-01-06 08:11",
        incoming: true,
      },
      {
        text: "No. I won't be able to hang out today.",
        time: "2022-01-06 08:33",
        incoming: false,
      },
      {
        text: "Don't worry about it. Feel better soon!",
        time: "2022-01-06 09:52",
        incoming: true,
      },
      { text: "Thanks.", time: "2022-01-06 10:00", incoming: false },
    ],
  },
];

const contacts = [
  {
    id: 1,
    name: "Adam",
    avatar: "https://i.pravatar.cc/150?img=3",
    phone: "3474652243",
    email: "adam@gmail.com",
  },
  {
    id: 2,
    name: "Alicia",
    avatar: "https://i.pravatar.cc/150?img=4",
    phone: "3457565667",
    email: "alicia@gmail.com",
  },
  { id: 3, name: "Andrew", avatar: "https://i.pravatar.cc/150?img=5" },
  { id: 4, name: "Arya", avatar: "https://i.pravatar.cc/150?img=6" },
  { id: 5, name: "Alice", avatar: "https://i.pravatar.cc/150?img=7" },
  { id: 6, name: "Bart", avatar: "https://i.pravatar.cc/150?img=8" },
  { id: 7, name: "Barry", avatar: "https://i.pravatar.cc/150?img=9" },
  { id: 8, name: "Brian", avatar: "https://i.pravatar.cc/150?img=10" },
  { id: 9, name: "Brenda", avatar: "https://i.pravatar.cc/150?img=11" },
];

const callLogs = [
  {
    id: 1,
    name: "Adam",
    avatar: "https://i.pravatar.cc/150?img=3",
    type: "outgoing",
    time: "2022-02-10 20:30",
    duration: "20:30",
  },
  {
    id: 2,
    name: "Sarah",
    avatar: "https://i.pravatar.cc/150?img=12",
    type: "outgoing",
    time: "2022-02-08 09:45",
    duration: "09:45",
  },
  {
    id: 3,
    name: "Jane",
    avatar: "https://i.pravatar.cc/150?img=13",
    type: "missed",
    time: "2022-02-04 18:38",
  },
  {
    id: 4,
    name: "Arya",
    avatar: "https://i.pravatar.cc/150?img=6",
    type: "incoming",
    time: "2022-01-28 09:30",
    duration: "05:20",
  },
  {
    id: 5,
    name: "Alicia",
    avatar: "https://i.pravatar.cc/150?img=4",
    type: "outgoing",
    time: "2022-01-15 17:30",
    duration: "12:15",
  },
  {
    id: 6,
    name: "Tom",
    avatar: "https://i.pravatar.cc/150?img=14",
    type: "missed",
    time: "2022-01-11 07:56",
  },
  {
    id: 7,
    name: "Dr. James",
    avatar: "https://i.pravatar.cc/150?img=15",
    type: "outgoing",
    time: "2022-01-10 15:45",
    duration: "08:30",
  },
  {
    id: 8,
    name: "Brenda",
    avatar: "https://i.pravatar.cc/150?img=11",
    type: "outgoing",
    time: "2022-01-01 10:30",
    duration: "03:45",
  },
];

const Index = () => {
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
              WhatsApp
              <IoLogoBitbucket className="text-[#0695c8] rotate-[180deg]" />
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
                <FiArrowLeft />
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
              // height: "calc(100vh - 200px)",
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
                          {chat.time.split(" ")[1]}
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
                              sx={{ fontWeight: 600, color: "#1f2937" }}
                            >
                              {call.name}
                            </Typography>
                            <Typography sx={{ fontSize: "0.875rem", color }}>
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
                              bgcolor: msg.incoming ? "#f3f4f6" : "#0695c8",
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
                              sx={{
                                fontSize: "0.75rem",
                                mt: 0.5,
                                color: msg.incoming
                                  ? "#6b7280"
                                  : "rgba(255,255,255,0.8)",
                              }}
                            >
                              {msg.time.split(" ")[1]}
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
                          <FiPhone
                            sx={{ color: "white", fontSize: 20 }}
                            className="!text-white"
                          />
                        </Box>
                        <Box>
                          <Typography
                            sx={{ fontSize: "0.75rem", color: "#6b7280" }}
                          >
                            Number
                          </Typography>
                          <Typography sx={{ fontWeight: 500 }}>
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
                          <FiMail
                            sx={{ color: "white", fontSize: 20 }}
                            className="!text-white"
                          />
                        </Box>
                        <Box>
                          <Typography
                            sx={{ fontSize: "0.75rem", color: "#6b7280" }}
                          >
                            Email
                          </Typography>
                          <Typography sx={{ fontWeight: 500 }}>
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
                          {selectedCall.duration} Answered Calls
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

export default Index;
