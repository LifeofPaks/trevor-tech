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
import { SiBadoo } from "react-icons/si";

// Badoo Light Mode Theme (Purple + Pink)
const theme = createTheme({
  palette: {
    primary: {
      main: "#9C27B0", // Badoo Purple
      light: "#BA68C8",
      dark: "#7B1FA2",
    },
    secondary: {
      main: "#E91E63", // Badoo Pink accent
      light: "#FF6090",
      dark: "#C2185B",
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
            color: "#9C27B0",
          },
        },
      },
    },
  },
});

// === Cheating Drama DMs (12 Total) – Young Men Only ===
const chats = [
  {
    id: 1,
    name: "Diego Morales",
    avatar: "https://i.pravatar.cc/150?img=52",
    lastMessage: "I’m in your neighborhood",
    time: "03:40",
    messages: [
      { text: "You awake?", time: "03:25", incoming: true },
      { text: "Yeah. Can’t sleep", time: "03:26", incoming: false },
      { text: "I’m in your neighborhood", time: "03:40", incoming: false },
    ],
  },
  {
    id: 2,
    name: "Rafael Ortiz",
    avatar: "https://i.pravatar.cc/150?img=53",
    lastMessage: "She has no idea",
    time: "02:05",
    messages: [
      { text: "That was too close", time: "01:50", incoming: true },
      { text: "But we made it", time: "01:51", incoming: false },
      { text: "She has no idea", time: "02:05", incoming: false },
    ],
  },
  {
    id: 3,
    name: "Santiago Vega",
    avatar: "https://i.pravatar.cc/150?img=54",
    lastMessage: "Send the photo again",
    time: "01:15",
    messages: [
      { text: "You deleted it?", time: "01:00", incoming: true },
      { text: "Had to. Too dangerous", time: "01:01", incoming: false },
      { text: "Send the photo again", time: "01:15", incoming: false },
    ],
  },
  {
    id: 4,
    name: "Mateo Herrera",
    avatar: "https://i.pravatar.cc/150?img=55",
    lastMessage: "I’m at your door",
    time: "00:30",
    messages: [
      { text: "You home?", time: "00:15", incoming: true },
      { text: "She’s asleep. Door’s open", time: "00:16", incoming: false },
      { text: "I’m at your door", time: "00:30", incoming: false },
    ],
  },
  {
    id: 5,
    name: "Alejandro Ruiz",
    avatar: "https://i.pravatar.cc/150?img=56",
    lastMessage: "I’m obsessed with you",
    time: "04:05",
    messages: [
      {
        text: "I can’t stop thinking about you",
        time: "03:50",
        incoming: true,
      },
      { text: "Same. Every second", time: "03:51", incoming: false },
      { text: "I’m obsessed with you", time: "04:05", incoming: false },
    ],
  },
  {
    id: 6,
    name: "Gabriel Castro",
    avatar: "https://i.pravatar.cc/150?img=57",
    lastMessage: "I told her I was out with friends",
    time: "22:45",
    messages: [
      { text: "Where are you?", time: "22:25", incoming: true },
      { text: "With friends. Late night", time: "22:26", incoming: false },
      { text: "Liar", time: "22:27", incoming: true },
      {
        text: "I told her I was out with friends",
        time: "22:45",
        incoming: false,
      },
    ],
  },
  {
    id: 7,
    name: "Javier Silva",
    avatar: "https://i.pravatar.cc/150?img=58",
    lastMessage: "This can’t keep going",
    time: "21:00",
    messages: [
      { text: "We said last time was final", time: "20:45", incoming: true },
      { text: "I know", time: "20:46", incoming: false },
      { text: "Then why am I here?", time: "20:47", incoming: true },
      { text: "This can’t keep going", time: "21:00", incoming: false },
    ],
  },
  {
    id: 8,
    name: "Carlos Navarro",
    avatar: "https://i.pravatar.cc/150?img=59",
    lastMessage: "I dream about you every night",
    time: "05:10",
    messages: [
      { text: "You sleeping?", time: "04:55", incoming: true },
      { text: "No. You?", time: "04:56", incoming: false },
      { text: "Thinking of you", time: "04:57", incoming: true },
      { text: "I dream about you every night", time: "05:10", incoming: false },
    ],
  },
  {
    id: 9,
    name: "Luis Mendoza",
    avatar: "https://i.pravatar.cc/150?img=60",
    lastMessage: "Delete after reading",
    time: "02:20",
    messages: [
      {
        text: "I can’t stop replaying last night",
        time: "02:05",
        incoming: true,
      },
      { text: "That thing you did...", time: "02:06", incoming: false },
      { text: "Shh. Don’t type it", time: "02:07", incoming: true },
      { text: "Delete after reading", time: "02:20", incoming: false },
    ],
  },
  {
    id: 10,
    name: "Felipe Torres",
    avatar: "https://i.pravatar.cc/150?img=61",
    lastMessage: "I’m falling for you",
    time: "01:35",
    messages: [
      { text: "This is getting serious", time: "01:20", incoming: true },
      { text: "I know", time: "01:21", incoming: false },
      { text: "But I don’t want to stop", time: "01:22", incoming: true },
      { text: "I’m falling for you", time: "01:35", incoming: false },
    ],
  },
  {
    id: 11,
    name: "Andrés Gomez",
    avatar: "https://i.pravatar.cc/150?img=62",
    lastMessage: "Your scent is on my shirt",
    time: "06:20",
    messages: [
      { text: "I can still smell you", time: "06:00", incoming: true },
      { text: "Good", time: "06:01", incoming: false },
      { text: "Your scent is on my shirt", time: "06:20", incoming: false },
    ],
  },
  {
    id: 12,
    name: "Marco Rivera",
    avatar: "https://i.pravatar.cc/150?img=63",
    lastMessage: "I lied to her for you",
    time: "23:15",
    messages: [
      { text: "She asked where I was", time: "23:00", incoming: true },
      { text: "What’d you say?", time: "23:01", incoming: false },
      { text: "With you", time: "23:02", incoming: true },
      { text: "I lied to her for you", time: "23:15", incoming: false },
    ],
  },
];

// === People Nearby (Badoo uses "People Nearby") ===
const peopleNearby = [
  ...chats.map((c) => ({
    id: c.id,
    name: c.name,
    avatar: c.avatar,
    distance: `${Math.floor(Math.random() * 5) + 1} km away`,
    phone: `+34 6${String(100 + c.id).padStart(3, "0")} 12345`,
    email: `${c.name.split(" ")[0].toLowerCase()}@badoo.com`,
  })),
];

// === Call Logs ===
const callLogs = [
  {
    id: 1,
    name: "Diego Morales",
    avatar: "https://i.pravatar.cc/150?img=52",
    type: "outgoing",
    time: "2025-10-28 23:55",
    duration: "20:40",
  },
  {
    id: 2,
    name: "Rafael Ortiz",
    avatar: "https://i.pravatar.cc/150?img=53",
    type: "incoming",
    time: "2025-10-28 22:35",
    duration: "12:50",
  },
  {
    id: 3,
    name: "Santiago Vega",
    avatar: "https://i.pravatar.cc/150?img=54",
    type: "missed",
    time: "2025-10-28 21:15",
  },
  {
    id: 4,
    name: "Mateo Herrera",
    avatar: "https://i.pravatar.cc/150?img=55",
    type: "outgoing",
    time: "2025-10-27 20:50",
    duration: "36:30",
  },
  {
    id: 5,
    name: "Alejandro Ruiz",
    avatar: "https://i.pravatar.cc/150?img=56",
    type: "incoming",
    time: "2025-10-27 19:25",
    duration: "30:10",
  },
  {
    id: 6,
    name: "Andrés Gomez",
    avatar: "https://i.pravatar.cc/150?img=62",
    type: "missed",
    time: "2025-10-27 18:00",
  },
];

const BadooPage = () => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const [tab, setTab] = useState("chat");
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedCall, setSelectedCall] = useState(null);

  const handleBack = () => {
    setSelectedChat(null);
    setSelectedPerson(null);
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

  const groupPeopleByLetter = () => {
    const grouped = {};
    peopleNearby.forEach((p) => {
      const letter = p.name[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(p);
    });
    return grouped;
  };

  const showDetail = selectedChat || selectedPerson || selectedCall;

  return (
    <ThemeProvider theme={theme}>
      <header className="!mb-4 sm:!mb-6 !px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
          <div className="flex items-center !gap-2 sm:!gap-3">
            <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
              Badoo
              <SiBadoo className="text-[#9C27B0]" />
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
                icon={<SiBadoo />}
                iconPosition="start"
                label={isMobile ? "" : "Chats"}
                value="chat"
              />
              <Tab
                icon={<FiUsers />}
                iconPosition="start"
                label={isMobile ? "" : "People Nearby"}
                value="people"
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
                maxHeight: "80vh O",
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

              {/* People Nearby List */}
              {tab === "people" && (
                <Stack>
                  {Object.keys(groupPeopleByLetter())
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
                        {groupPeopleByLetter()[letter].map((person) => (
                          <Box
                            key={person.id}
                            sx={{
                              p: 2,
                              cursor: "pointer",
                              "&:hover": { bgcolor: "rgba(0,0,0,0.02)" },
                              transition: "background 0.2s",
                            }}
                            onClick={() => setSelectedPerson(person)}
                          >
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                            >
                              <Avatar
                                src={person.avatar}
                                sx={{ width: 48, height: 48 }}
                              />
                              <Box sx={{ flex: 1 }}>
                                <Typography
                                  sx={{ fontWeight: 500, color: "#1f2937" }}
                                >
                                  {person.name}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "0.8125rem",
                                    color: "#9C27B0",
                                  }}
                                >
                                  {person.distance}
                                </Typography>
                              </Box>
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
                              bgcolor: msg.incoming ? "#f3f4f6" : "#9C27B0",
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

                {/* Person Detail */}
                {selectedPerson && (
                  <Stack spacing={4} alignItems="center">
                    <Avatar
                      src={selectedPerson.avatar}
                      sx={{ width: 120, height: 120 }}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "#1f2937" }}
                    >
                      {selectedPerson.name}
                    </Typography>
                    <Typography sx={{ fontSize: "1rem", color: "#9C27B0" }}>
                      {selectedPerson.distance}
                    </Typography>

                    {selectedPerson.phone && (
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: "#E1BEE7",
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
                            bgcolor: "#9C27B0",
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
                            {selectedPerson.phone}
                          </Typography>
                        </Box>
                      </Paper>
                    )}

                    {selectedPerson.email && (
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: "#F3E5F5",
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
                            bgcolor: "#9C27B0",
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
                            {selectedPerson.email}
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

export default BadooPage;
