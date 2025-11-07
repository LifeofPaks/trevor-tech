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
import { SiDiscord } from "react-icons/si";

// Discord Light Mode Theme (Blurple)
const theme = createTheme({
  palette: {
    primary: {
      main: "#5865F2", // Discord Blurple
      light: "#738ADB",
      dark: "#4752C4",
    },
    secondary: {
      main: "#F2F3F5",
      light: "#FFFFFF",
      dark: "#E3E5E8",
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
            color: "#5865F2",
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
    nameKey: "luka_voss",
    avatar: "https://i.pravatar.cc/150?img=28",
    lastMessageKey: "luka_voss.lastMessage",
    time: "03:15",
    status: "online",
    messages: [
      { textKey: "luka_voss.message1", time: "03:00", incoming: true },
      { textKey: "luka_voss.message2", time: "03:01", incoming: false },
      { textKey: "luka_voss.message3", time: "03:15", incoming: false },
    ],
  },
  {
    id: 2,
    nameKey: "cade_wilder",
    avatar: "https://i.pravatar.cc/150?img=29",
    lastMessageKey: "cade_wilder.lastMessage",
    time: "02:30",
    status: "idle",
    messages: [
      { textKey: "cade_wilder.message1", time: "02:15", incoming: true },
      { textKey: "cade_wilder.message2", time: "02:16", incoming: false },
      { textKey: "cade_wilder.message3", time: "02:30", incoming: false },
    ],
  },
  {
    id: 3,
    nameKey: "jace_holt",
    avatar: "https://i.pravatar.cc/150?img=30",
    lastMessageKey: "jace_holt.lastMessage",
    time: "01:45",
    status: "online",
    messages: [
      { textKey: "jace_holt.message1", time: "01:30", incoming: true },
      { textKey: "jace_holt.message2", time: "01:31", incoming: false },
      { textKey: "jace_holt.message3", time: "01:45", incoming: false },
    ],
  },
  {
    id: 4,
    nameKey: "knox_reed",
    avatar: "https://i.pravatar.cc/150?img=31",
    lastMessageKey: "knox_reed.lastMessage",
    time: "00:50",
    status: "dnd",
    messages: [
      { textKey: "knox_reed.message1", time: "00:35", incoming: true },
      { textKey: "knox_reed.message2", time: "00:36", incoming: false },
      { textKey: "knox_reed.message3", time: "00:50", incoming: false },
    ],
  },
  {
    id: 5,
    nameKey: "ryder_kane",
    avatar: "https://i.pravatar.cc/150?img=32",
    lastMessageKey: "ryder_kane.lastMessage",
    time: "04:20",
    status: "online",
    messages: [
      { textKey: "ryder_kane.message1", time: "04:05", incoming: true },
      { textKey: "ryder_kane.message2", time: "04:06", incoming: false },
      { textKey: "ryder_kane.message3", time: "04:20", incoming: false },
    ],
  },
  {
    id: 6,
    nameKey: "zeke_ford",
    avatar: "https://i.pravatar.cc/150?img=33",
    lastMessageKey: "zeke_ford.lastMessage",
    time: "22:55",
    status: "idle",
    messages: [
      { textKey: "zeke_ford.message1", time: "22:35", incoming: true },
      { textKey: "zeke_ford.message2", time: "22:36", incoming: false },
      { textKey: "zeke_ford.message3", time: "22:37", incoming: true },
      { textKey: "zeke_ford.message4", time: "22:55", incoming: false },
    ],
  },
  {
    id: 7,
    nameKey: "milo_grey",
    avatar: "https://i.pravatar.cc/150?img=34",
    lastMessageKey: "milo_grey.lastMessage",
    time: "21:10",
    status: "online",
    messages: [
      { textKey: "milo_grey.message1", time: "20:55", incoming: true },
      { textKey: "milo_grey.message2", time: "20:56", incoming: false },
      { textKey: "milo_grey.message3", time: "20:57", incoming: true },
      { textKey: "milo_grey.message4", time: "21:10", incoming: false },
    ],
  },
  {
    id: 8,
    nameKey: "asher_dean",
    avatar: "https://i.pravatar.cc/150?img=35",
    lastMessageKey: "asher_dean.lastMessage",
    time: "05:30",
    status: "idle",
    messages: [
      { textKey: "asher_dean.message1", time: "05:15", incoming: true },
      { textKey: "asher_dean.message2", time: "05:16", incoming: false },
      { textKey: "asher_dean.message3", time: "05:17", incoming: true },
      { textKey: "asher_dean.message4", time: "05:30", incoming: false },
    ],
  },
  {
    id: 9,
    nameKey: "beck_hale",
    avatar: "https://i.pravatar.cc/150?img=36",
    lastMessageKey: "beck_hale.lastMessage",
    time: "02:40",
    status: "dnd",
    messages: [
      { textKey: "beck_hale.message1", time: "02:25", incoming: true },
      { textKey: "beck_hale.message2", time: "02:26", incoming: false },
      { textKey: "beck_hale.message3", time: "02:27", incoming: true },
      { textKey: "beck_hale.message4", time: "02:40", incoming: false },
    ],
  },
  {
    id: 10,
    nameKey: "tate_moss",
    avatar: "https://i.pravatar.cc/150?img=37",
    lastMessageKey: "tate_moss.lastMessage",
    time: "01:55",
    status: "online",
    messages: [
      { textKey: "tate_moss.message1", time: "01:40", incoming: true },
      { textKey: "tate_moss.message2", time: "01:41", incoming: false },
      { textKey: "tate_moss.message3", time: "01:42", incoming: true },
      { textKey: "tate_moss.message4", time: "01:55", incoming: false },
    ],
  },
  {
    id: 11,
    nameKey: "rhys_vale",
    avatar: "https://i.pravatar.cc/150?img=38",
    lastMessageKey: "rhys_vale.lastMessage",
    time: "06:45",
    status: "idle",
    messages: [
      { textKey: "rhys_vale.message1", time: "06:25", incoming: true },
      { textKey: "rhys_vale.message2", time: "06:26", incoming: false },
      { textKey: "rhys_vale.message3", time: "06:45", incoming: false },
    ],
  },
  {
    id: 12,
    nameKey: "dax_noir",
    avatar: "https://i.pravatar.cc/150?img=39",
    lastMessageKey: "dax_noir.lastMessage",
    time: "23:20",
    status: "dnd",
    messages: [
      { textKey: "dax_noir.message1", time: "23:05", incoming: true },
      { textKey: "dax_noir.message2", time: "23:06", incoming: false },
      { textKey: "dax_noir.message3", time: "23:07", incoming: true },
      { textKey: "dax_noir.message4", time: "23:20", incoming: false },
    ],
  },
];

// === Friends (Discord uses "Friends") ===
const friends = [
  ...chats.map((c) => ({
    id: c.id,
    nameKey: c.nameKey,
    avatar: c.avatar,
    status: c.status,
    tag: `#${String(1000 + c.id).padStart(4, "0")}`,
  })),
];

// === Call Logs ===
const callLogs = [
  {
    id: 1,
    nameKey: "luka_voss",
    avatar: "https://i.pravatar.cc/150?img=28",
    type: "outgoing",
    time: "2025-10-28 23:55",
    duration: "22:15",
  },
  {
    id: 2,
    nameKey: "cade_wilder",
    avatar: "https://i.pravatar.cc/150?img=29",
    type: "incoming",
    time: "2025-10-28 22:40",
    duration: "16:30",
  },
  {
    id: 3,
    nameKey: "jace_holt",
    avatar: "https://i.pravatar.cc/150?img=30",
    type: "missed",
    time: "2025-10-28 21:20",
  },
  {
    id: 4,
    nameKey: "knox_reed",
    avatar: "https://i.pravatar.cc/150?img=31",
    type: "outgoing",
    time: "2025-10-27 20:55",
    duration: "41:20",
  },
  {
    id: 5,
    nameKey: "ryder_kane",
    avatar: "https://i.pravatar.cc/150?img=32",
    type: "incoming",
    time: "2025-10-27 19:30",
    duration: "33:10",
  },
  {
    id: 6,
    nameKey: "rhys_vale",
    avatar: "https://i.pravatar.cc/150?img=38",
    type: "missed",
    time: "2025-10-27 18:00",
  },
];

const DiscordPage = () => {
  const { t } = useTranslation();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const [tab, setTab] = useState("chat");
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [selectedCall, setSelectedCall] = useState(null);

  const handleBack = () => {
    setSelectedChat(null);
    setSelectedFriend(null);
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

  const getStatusDot = (status) => {
    const color =
      status === "online"
        ? "#3BA55C"
        : status === "idle"
        ? "#FAA61A"
        : status === "dnd"
        ? "#ED4245"
        : "#747F8D";
    return (
      <Box
        sx={{
          width: 10,
          height: 10,
          bgcolor: color,
          borderRadius: "50%",
          border: "2px solid #F2F3F5",
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
      />
    );
  };

  const groupFriendsByLetter = () => {
    const grouped = {};
    friends.forEach((f) => {
      const letter = t(
        `dmdiscord.friends_list.${f.nameKey}.name`
      )[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(f);
    });
    return grouped;
  };

  const showDetail = selectedChat || selectedFriend || selectedCall;

  return (
    <ThemeProvider theme={theme}>
      <header className="!mb-4 sm:!mb-6 !px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
          <div className="flex items-center !gap-2 sm:!gap-3">
            <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
              {t("dmdiscord.header.title")}
              <SiDiscord className="text-[#5865F2]" />
            </h1>
          </div>
          <BindPhone />
        </div>
      </header>

      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#F2F3F5",
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
              aria-label={t("dmdiscord.tabs.aria_label")}
            >
              <Tab
                icon={<SiDiscord />}
                iconPosition="start"
                label={isMobile ? "" : t("dmdiscord.tabs.dms")}
                value="chat"
                aria-label={t("dmdiscord.tabs.dms_aria")}
              />
              <Tab
                icon={<FiUsers />}
                iconPosition="start"
                label={isMobile ? "" : t("dmdiscord.tabs.friends")}
                value="friends"
                aria-label={t("dmdiscord.tabs.friends_aria")}
              />
              <Tab
                icon={<FiPhone />}
                iconPosition="start"
                label={isMobile ? "" : t("dmdiscord.tabs.calls")}
                value="calls"
                aria-label={t("dmdiscord.tabs.calls_aria")}
              />
            </Tabs>
          )}

          {/* Back Button */}
          {showDetail && (
            <Box sx={{ mb: 2 }}>
              <IconButton
                onClick={handleBack}
                sx={{ color: "primary.main" }}
                aria-label={t("dmdiscord.back_button_aria")}
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
                bgcolor: "#FFFFFF",
                "&::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
              }}
              className="scrollbar-hide"
            >
              {/* DM List */}
              {tab === "chat" && (
                <Stack aria-label={t("dmdiscord.chat.list_aria")}>
                  {chats.map((chat) => (
                    <Box
                      key={chat.id}
                      sx={{
                        p: 2,
                        cursor: "pointer",
                        "&:hover": { bgcolor: "#F2F3F5" },
                        transition: "background 0.2s",
                      }}
                      onClick={() => setSelectedChat(chat)}
                      aria-label={t("dmdiscord.chat.item_aria", {
                        name: t(`dmdiscord.chats.${chat.nameKey}.name`),
                      })}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{ position: "relative" }}>
                          <Avatar
                            src={chat.avatar}
                            sx={{ width: 48, height: 48 }}
                          />
                          {getStatusDot(chat.status)}
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            sx={{ fontWeight: 600, color: "#2C2F33" }}
                          >
                            {t(`dmdiscord.chats.${chat.nameKey}.name`)}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.875rem",
                              color: "#99AAB5",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {t(`dmdiscord.chats.${chat.lastMessageKey}`)}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{ fontSize: "0.75rem", color: "#99AAB5" }}
                        >
                          {chat.time}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              )}

              {/* Friends List */}
              {tab === "friends" && (
                <Stack aria-label={t("dmdiscord.friends.list_aria")}>
                  {Object.keys(groupFriendsByLetter())
                    .sort()
                    .map((letter) => (
                      <Box key={letter}>
                        <Box sx={{ px: 2, py: 1, bgcolor: "#F2F3F5" }}>
                          <Typography
                            sx={{
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              color: "#99AAB5",
                            }}
                          >
                            {letter}
                          </Typography>
                        </Box>
                        {groupFriendsByLetter()[letter].map((friend) => (
                          <Box
                            key={friend.id}
                            sx={{
                              p: 2,
                              cursor: "pointer",
                              "&:hover": { bgcolor: "#F2F3F5" },
                              transition: "background 0.2s",
                            }}
                            onClick={() => setSelectedFriend(friend)}
                            aria-label={t("dmdiscord.friends.item_aria", {
                              name: t(
                                `dmdiscord.friends_list.${friend.nameKey}.name`
                              ),
                            })}
                          >
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                            >
                              <Box sx={{ position: "relative" }}>
                                <Avatar
                                  src={friend.avatar}
                                  sx={{ width: 48, height: 48 }}
                                />
                                {getStatusDot(friend.status)}
                              </Box>
                              <Box sx={{ flex: 1 }}>
                                <Typography
                                  sx={{ fontWeight: 600, color: "#2C2F33" }}
                                >
                                  {t(
                                    `dmdiscord.friends_list.${friend.nameKey}.name`
                                  )}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "0.8125rem",
                                    color: "#99AAB5",
                                  }}
                                >
                                  {
                                    t(
                                      `dmdiscord.friends_list.${friend.nameKey}.name`
                                    ).split(" ")[0]
                                  }
                                  #{friend.tag.slice(1)}
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
                <Stack aria-label={t("dmdiscord.call_log.list_aria")}>
                  {callLogs.map((call) => (
                    <Box
                      key={call.id}
                      sx={{
                        p: 2,
                        cursor: "pointer",
                        "&:hover": { bgcolor: "#F2F3F5" },
                        transition: "background 0.2s",
                      }}
                      onClick={() => setSelectedCall(call)}
                      aria-label={t("dmdiscord.call_log.item_aria", {
                        name: t(`dmdiscord.call_logs.${call.nameKey}.name`),
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
                            sx={{ fontWeight: 600, color: "#2C2F33" }}
                          >
                            {t(`dmdiscord.call_logs.${call.nameKey}.name`)}
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
                            {t(`dmdiscord.call_log.types.${call.type}`)}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{ fontSize: "0.75rem", color: "#99AAB5" }}
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
                  bgcolor: "#FFFFFF",
                }}
              >
                {/* DM Detail */}
                {selectedChat && (
                  <Stack
                    spacing={3}
                    aria-label={t("dmdiscord.chat.detail_aria", {
                      name: t(`dmdiscord.chats.${selectedChat.nameKey}.name`),
                    })}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box sx={{ position: "relative" }}>
                        <Avatar
                          src={selectedChat.avatar}
                          sx={{ width: 64, height: 64 }}
                        />
                        {getStatusDot(selectedChat.status)}
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, color: "#2C2F33" }}
                      >
                        {t(`dmdiscord.chats.${selectedChat.nameKey}.name`)}
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
                              bgcolor: msg.incoming ? "#F2F3F5" : "#5865F2",
                              color: msg.incoming ? "#2C2F33" : "#FFFFFF",
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
                              {t(`dmdiscord.chats.${msg.textKey}`)}
                            </Typography>
                            <Typography
                              className="flex items-center gap-1"
                              sx={{
                                fontSize: "0.75rem",
                                mt: 0.5,
                                color: msg.incoming
                                  ? "#99AAB5"
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

                {/* Friend Detail */}
                {selectedFriend && (
                  <Stack
                    spacing={4}
                    alignItems="center"
                    aria-label={t("dmdiscord.friends.detail_aria", {
                      name: t(
                        `dmdiscord.friends_list.${selectedFriend.nameKey}.name`
                      ),
                    })}
                  >
                    <Box sx={{ position: "relative" }}>
                      <Avatar
                        src={selectedFriend.avatar}
                        sx={{ width: 120, height: 120 }}
                      />
                      {getStatusDot(selectedFriend.status)}
                    </Box>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "#2C2F33" }}
                    >
                      {t(
                        `dmdiscord.friends_list.${selectedFriend.nameKey}.name`
                      )}
                    </Typography>
                    <Typography sx={{ fontSize: "1rem", color: "#99AAB5" }}>
                      {
                        t(
                          `dmdiscord.friends_list.${selectedFriend.nameKey}.name`
                        ).split(" ")[0]
                      }
                      #{selectedFriend.tag.slice(1)}
                    </Typography>
                  </Stack>
                )}

                {/* Call Detail */}
                {selectedCall && (
                  <Stack
                    spacing={4}
                    alignItems="center"
                    aria-label={t("dmdiscord.call_log.detail_aria", {
                      name: t(
                        `dmdiscord.call_logs.${selectedCall.nameKey}.name`
                      ),
                    })}
                  >
                    <Avatar
                      src={selectedCall.avatar}
                      sx={{ width: 120, height: 120 }}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "#2C2F33" }}
                    >
                      {t(`dmdiscord.call_logs.${selectedCall.nameKey}.name`)}
                    </Typography>
                    <Paper
                      elevation={0}
                      sx={{
                        bgcolor: "#F2F3F5",
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
                          color: "#2C2F33",
                        }}
                      >
                        {new Date(selectedCall.time).toLocaleString()}
                      </Typography>
                      {selectedCall.duration && (
                        <Typography
                          sx={{ fontSize: "0.875rem", color: "#99AAB5", mt: 1 }}
                        >
                          {selectedCall.duration} •{" "}
                          {t(`dmdiscord.call_log.types.${selectedCall.type}`)}
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

export default DiscordPage;
