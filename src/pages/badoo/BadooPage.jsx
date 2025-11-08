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
    nameKey: "diego_morales",
    avatar: "https://i.pravatar.cc/150?img=52",
    lastMessageKey: "diego_morales.lastMessage",
    time: "03:40",
    messages: [
      { textKey: "diego_morales.message1", time: "03:25", incoming: true },
      { textKey: "diego_morales.message2", time: "03:26", incoming: false },
      { textKey: "diego_morales.message3", time: "03:40", incoming: false },
    ],
  },
  {
    id: 2,
    nameKey: "rafael_ortiz",
    avatar: "https://i.pravatar.cc/150?img=53",
    lastMessageKey: "rafael_ortiz.lastMessage",
    time: "02:05",
    messages: [
      { textKey: "rafael_ortiz.message1", time: "01:50", incoming: true },
      { textKey: "rafael_ortiz.message2", time: "01:51", incoming: false },
      { textKey: "rafael_ortiz.message3", time: "02:05", incoming: false },
    ],
  },
  {
    id: 3,
    nameKey: "santiago_vega",
    avatar: "https://i.pravatar.cc/150?img=54",
    lastMessageKey: "santiago_vega.lastMessage",
    time: "01:15",
    messages: [
      { textKey: "santiago_vega.message1", time: "01:00", incoming: true },
      { textKey: "santiago_vega.message2", time: "01:01", incoming: false },
      { textKey: "santiago_vega.message3", time: "01:15", incoming: false },
    ],
  },
  {
    id: 4,
    nameKey: "mateo_herrera",
    avatar: "https://i.pravatar.cc/150?img=55",
    lastMessageKey: "mateo_herrera.lastMessage",
    time: "00:30",
    messages: [
      { textKey: "mateo_herrera.message1", time: "00:15", incoming: true },
      { textKey: "mateo_herrera.message2", time: "00:16", incoming: false },
      { textKey: "mateo_herrera.message3", time: "00:30", incoming: false },
    ],
  },
  {
    id: 5,
    nameKey: "alejandro_ruiz",
    avatar: "https://i.pravatar.cc/150?img=56",
    lastMessageKey: "alejandro_ruiz.lastMessage",
    time: "04:05",
    messages: [
      { textKey: "alejandro_ruiz.message1", time: "03:50", incoming: true },
      { textKey: "alejandro_ruiz.message2", time: "03:51", incoming: false },
      { textKey: "alejandro_ruiz.message3", time: "04:05", incoming: false },
    ],
  },
  {
    id: 6,
    nameKey: "gabriel_castro",
    avatar: "https://i.pravatar.cc/150?img=57",
    lastMessageKey: "gabriel_castro.lastMessage",
    time: "22:45",
    messages: [
      { textKey: "gabriel_castro.message1", time: "22:25", incoming: true },
      { textKey: "gabriel_castro.message2", time: "22:26", incoming: false },
      { textKey: "gabriel_castro.message3", time: "22:27", incoming: true },
      { textKey: "gabriel_castro.message4", time: "22:45", incoming: false },
    ],
  },
  {
    id: 7,
    nameKey: "javier_silva",
    avatar: "https://i.pravatar.cc/150?img=58",
    lastMessageKey: "javier_silva.lastMessage",
    time: "21:00",
    messages: [
      { textKey: "javier_silva.message1", time: "20:45", incoming: true },
      { textKey: "javier_silva.message2", time: "20:46", incoming: false },
      { textKey: "javier_silva.message3", time: "20:47", incoming: true },
      { textKey: "javier_silva.message4", time: "21:00", incoming: false },
    ],
  },
  {
    id: 8,
    nameKey: "carlos_navarro",
    avatar: "https://i.pravatar.cc/150?img=59",
    lastMessageKey: "carlos_navarro.lastMessage",
    time: "05:10",
    messages: [
      { textKey: "carlos_navarro.message1", time: "04:55", incoming: true },
      { textKey: "carlos_navarro.message2", time: "04:56", incoming: false },
      { textKey: "carlos_navarro.message3", time: "04:57", incoming: true },
      { textKey: "carlos_navarro.message4", time: "05:10", incoming: false },
    ],
  },
  {
    id: 9,
    nameKey: "luis_mendoza",
    avatar: "https://i.pravatar.cc/150?img=60",
    lastMessageKey: "luis_mendoza.lastMessage",
    time: "02:20",
    messages: [
      { textKey: "luis_mendoza.message1", time: "02:05", incoming: true },
      { textKey: "luis_mendoza.message2", time: "02:06", incoming: false },
      { textKey: "luis_mendoza.message3", time: "02:07", incoming: true },
      { textKey: "luis_mendoza.message4", time: "02:20", incoming: false },
    ],
  },
  {
    id: 10,
    nameKey: "felipe_torres",
    avatar: "https://i.pravatar.cc/150?img=61",
    lastMessageKey: "felipe_torres.lastMessage",
    time: "01:35",
    messages: [
      { textKey: "felipe_torres.message1", time: "01:20", incoming: true },
      { textKey: "felipe_torres.message2", time: "01:21", incoming: false },
      { textKey: "felipe_torres.message3", time: "01:22", incoming: true },
      { textKey: "felipe_torres.message4", time: "01:35", incoming: false },
    ],
  },
  {
    id: 11,
    nameKey: "andres_gomez",
    avatar: "https://i.pravatar.cc/150?img=62",
    lastMessageKey: "andres_gomez.lastMessage",
    time: "06:20",
    messages: [
      { textKey: "andres_gomez.message1", time: "06:00", incoming: true },
      { textKey: "andres_gomez.message2", time: "06:01", incoming: false },
      { textKey: "andres_gomez.message3", time: "06:20", incoming: false },
    ],
  },
  {
    id: 12,
    nameKey: "marco_rivera",
    avatar: "https://i.pravatar.cc/150?img=63",
    lastMessageKey: "marco_rivera.lastMessage",
    time: "23:15",
    messages: [
      { textKey: "marco_rivera.message1", time: "23:00", incoming: true },
      { textKey: "marco_rivera.message2", time: "23:01", incoming: false },
      { textKey: "marco_rivera.message3", time: "23:02", incoming: true },
      { textKey: "marco_rivera.message4", time: "23:15", incoming: false },
    ],
  },
];

// === People Nearby (Badoo uses "People Nearby") ===
const peopleNearby = [
  ...chats.map((c) => ({
    id: c.id,
    nameKey: c.nameKey,
    avatar: c.avatar,
    distanceKey: `${Math.floor(Math.random() * 5) + 1} km away`,
    phone: `+34 6${String(100 + c.id).padStart(3, "0")} 12345`,
    email: `${c.nameKey.split("_")[0].toLowerCase()}@badoo.com`,
  })),
];

// === Call Logs ===
const callLogs = [
  {
    id: 1,
    nameKey: "diego_morales",
    avatar: "https://i.pravatar.cc/150?img=52",
    type: "outgoing",
    time: "2025-10-28 23:55",
    duration: "20:40",
  },
  {
    id: 2,
    nameKey: "rafael_ortiz",
    avatar: "https://i.pravatar.cc/150?img=53",
    type: "incoming",
    time: "2025-10-28 22:35",
    duration: "12:50",
  },
  {
    id: 3,
    nameKey: "santiago_vega",
    avatar: "https://i.pravatar.cc/150?img=54",
    type: "missed",
    time: "2025-10-28 21:15",
  },
  {
    id: 4,
    nameKey: "mateo_herrera",
    avatar: "https://i.pravatar.cc/150?img=55",
    type: "outgoing",
    time: "2025-10-27 20:50",
    duration: "36:30",
  },
  {
    id: 5,
    nameKey: "alejandro_ruiz",
    avatar: "https://i.pravatar.cc/150?img=56",
    type: "incoming",
    time: "2025-10-27 19:25",
    duration: "30:10",
  },
  {
    id: 6,
    nameKey: "andres_gomez",
    avatar: "https://i.pravatar.cc/150?img=62",
    type: "missed",
    time: "2025-10-27 18:00",
  },
];

const BadooPage = () => {
  const { t } = useTranslation();
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
      const letter = t(`dmbadoo.chats.${p.nameKey}.name`)[0].toUpperCase();
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
              {t("dmbadoo.header.title")}
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
              aria-label={t("dmbadoo.tabs.aria_label")}
            >
              <Tab
                icon={<SiBadoo />}
                iconPosition="start"
                label={isMobile ? "" : t("dmbadoo.tabs.chat")}
                value="chat"
                aria-label={t("dmbadoo.tabs.chat_aria")}
              />
              <Tab
                icon={<FiUsers />}
                iconPosition="start"
                label={isMobile ? "" : t("dmbadoo.tabs.people")}
                value="people"
                aria-label={t("dmbadoo.tabs.people_aria")}
              />
              <Tab
                icon={<FiPhone />}
                iconPosition="start"
                label={isMobile ? "" : t("dmbadoo.tabs.calls")}
                value="calls"
                aria-label={t("dmbadoo.tabs.calls_aria")}
              />
            </Tabs>
          )}

          {/* Back Button */}
          {showDetail && (
            <Box sx={{ mb: 2 }}>
              <IconButton
                onClick={handleBack}
                sx={{ color: "primary.main" }}
                aria-label={t("dmbadoo.back_button_aria")}
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
                <Stack aria-label={t("dmbadoo.chat.list_aria")}>
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
                      aria-label={t("dmbadoo.chat.item_aria", {
                        name: t(`dmbadoo.chats.${chat.nameKey}.name`),
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
                            {t(`dmbadoo.chats.${chat.nameKey}.name`)}
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
                            {t(`dmbadoo.chats.${chat.lastMessageKey}`)}
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
                <Stack aria-label={t("dmbadoo.people.list_aria")}>
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
                            aria-label={t("dmbadoo.people.item_aria", {
                              name: t(`dmbadoo.chats.${person.nameKey}.name`),
                            })}
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
                                  {t(`dmbadoo.chats.${person.nameKey}.name`)}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "0.8125rem",
                                    color: "#9C27B0",
                                  }}
                                >
                                  {t("dmbadoo.people.distance", {
                                    distance: person.distanceKey.split(" ")[0],
                                  })}
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
                <Stack aria-label={t("dmbadoo.call_log.list_aria")}>
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
                      aria-label={t("dmbadoo.call_log.item_aria", {
                        name: t(`dmbadoo.call_logs.${call.nameKey}.name`),
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
                            {t(`dmbadoo.call_logs.${call.nameKey}.name`)}
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
                            {t(`dmbadoo.call_log.types.${call.type}`)}
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
                    aria-label={t("dmbadoo.chat.detail_aria", {
                      name: t(`dmbadoo.chats.${selectedChat.nameKey}.name`),
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
                        {t(`dmbadoo.chats.${selectedChat.nameKey}.name`)}
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
                              {t(`dmbadoo.chats.${msg.textKey}`)}
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
                  <Stack
                    spacing={4}
                    alignItems="center"
                    aria-label={t("dmbadoo.people.detail_aria", {
                      name: t(`dmbadoo.chats.${selectedPerson.nameKey}.name`),
                    })}
                  >
                    <Avatar
                      src={selectedPerson.avatar}
                      sx={{ width: 120, height: 120 }}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "#1f2937" }}
                    >
                      {t(`dmbadoo.chats.${selectedPerson.nameKey}.name`)}
                    </Typography>
                    <Typography sx={{ fontSize: "1rem", color: "#9C27B0" }}>
                      {t("dmbadoo.people.distance", {
                        distance: selectedPerson.distanceKey.split(" ")[0],
                      })}
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
                            {t("dmbadoo.people.phone_label")}
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
                            {t("dmbadoo.people.email_label")}
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
                  <Stack
                    spacing={4}
                    alignItems="center"
                    aria-label={t("dmbadoo.call_log.detail_aria", {
                      name: t(`dmbadoo.call_logs.${selectedCall.nameKey}.name`),
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
                      {t(`dmbadoo.call_logs.${selectedCall.nameKey}.name`)}
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
                          {t(`dmbadoo.call_log.types.${selectedCall.type}`)}
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
