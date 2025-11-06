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
import { FiTwitter } from "react-icons/fi";
import { RiTwitterXLine } from "react-icons/ri";
import BindPhone from "../../components/demo/BindPhone";

// X (Twitter) Light Mode Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#0f1419",
      light: "#4ab3f4",
      dark: "#1a8cd8",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f1419",
      secondary: "#536471",
    },
    divider: "#eff3f4",
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
          color: "#536471",
          "&.Mui-selected": {
            color: "#0f1419",
          },
        },
      },
    },
  },
});

// === X-Style DM Data ===
const chats = [
  {
    id: 1,
    handleKey: "dmtwitter.chats.elonmusk.handle",
    nameKey: "dmtwitter.chats.elonmusk.name",
    avatar: "https://i.pravatar.cc/150?img=68",
    lastMessageKey: "dmtwitter.chats.elonmusk.lastMessage",
    time: "1m",
    messages: [
      {
        textKey: "dmtwitter.chats.elonmusk.messages.msg1.text",
        time: "09:00",
        incoming: true,
      },
      {
        textKey: "dmtwitter.chats.elonmusk.messages.msg2.text",
        time: "09:01",
        incoming: false,
      },
    ],
  },
  {
    id: 2,
    handleKey: "dmtwitter.chats.codinghorror.handle",
    nameKey: "dmtwitter.chats.codinghorror.name",
    avatar: "https://i.pravatar.cc/150?img=56",
    lastMessageKey: "dmtwitter.chats.codinghorror.lastMessage",
    time: "5m",
    messages: [
      {
        textKey: "dmtwitter.chats.codinghorror.messages.msg1.text",
        time: "08:50",
        incoming: true,
      },
      {
        textKey: "dmtwitter.chats.codinghorror.messages.msg2.text",
        time: "08:51",
        incoming: false,
      },
    ],
  },
  {
    id: 3,
    handleKey: "dmtwitter.chats.verge.handle",
    nameKey: "dmtwitter.chats.verge.name",
    avatar: "https://i.pravatar.cc/150?img=3",
    lastMessageKey: "dmtwitter.chats.verge.lastMessage",
    time: "30m",
    messages: [
      {
        textKey: "dmtwitter.chats.verge.messages.msg1.text",
        time: "08:20",
        incoming: true,
      },
      {
        textKey: "dmtwitter.chats.verge.messages.msg2.text",
        time: "08:21",
        incoming: false,
      },
    ],
  },
  {
    id: 4,
    handleKey: "dmtwitter.chats.nasdaily.handle",
    nameKey: "dmtwitter.chats.nasdaily.name",
    avatar: "https://i.pravatar.cc/150?img=24",
    lastMessageKey: "dmtwitter.chats.nasdaily.lastMessage",
    time: "2h",
    messages: [
      {
        textKey: "dmtwitter.chats.nasdaily.messages.msg1.text",
        time: "07:00",
        incoming: true,
      },
      {
        textKey: "dmtwitter.chats.nasdaily.messages.msg2.text",
        time: "07:01",
        incoming: false,
      },
    ],
  },
  {
    id: 5,
    handleKey: "dmtwitter.chats.techcrunch.handle",
    nameKey: "dmtwitter.chats.techcrunch.name",
    avatar: "https://i.pravatar.cc/150?img=47",
    lastMessageKey: "dmtwitter.chats.techcrunch.lastMessage",
    time: "4h",
    messages: [
      {
        textKey: "dmtwitter.chats.techcrunch.messages.msg1.text",
        time: "05:30",
        incoming: true,
      },
      {
        textKey: "dmtwitter.chats.techcrunch.messages.msg2.text",
        time: "05:31",
        incoming: false,
      },
    ],
  },
];

// === Followers (with @handle) ===
const followers = [
  {
    id: 1,
    handleKey: "dmtwitter.followers.a16z.handle",
    nameKey: "dmtwitter.followers.a16z.name",
    avatar: "https://i.pravatar.cc/150?img=12",
    phone: "+1 555-1001",
    emailKey: "dmtwitter.followers.a16z.email",
  },
  {
    id: 2,
    handleKey: "dmtwitter.followers.balajis.handle",
    nameKey: "dmtwitter.followers.balajis.name",
    avatar: "https://i.pravatar.cc/150?img=33",
    phone: "+1 555-1002",
    emailKey: "dmtwitter.followers.balajis.email",
  },
  {
    id: 3,
    handleKey: "dmtwitter.followers.cdixon.handle",
    nameKey: "dmtwitter.followers.cdixon.name",
    avatar: "https://i.pravatar.cc/150?img=45",
    phone: "+1 555-1003",
    emailKey: "dmtwitter.followers.cdixon.email",
  },
  {
    id: 4,
    handleKey: "dmtwitter.followers.pmarca.handle",
    nameKey: "dmtwitter.followers.pmarca.name",
    avatar: "https://i.pravatar.cc/150?img=61",
    phone: "+1 555-1004",
    emailKey: "dmtwitter.followers.pmarca.email",
  },
  {
    id: 5,
    handleKey: "dmtwitter.followers.naval.handle",
    nameKey: "dmtwitter.followers.naval.name",
    avatar: "https://i.pravatar.cc/150?img=19",
    phone: "+1 555-1005",
    emailKey: "dmtwitter.followers.naval.email",
  },
  {
    id: 6,
    handleKey: "dmtwitter.followers.paulg.handle",
    nameKey: "dmtwitter.followers.paulg.name",
    avatar: "https://i.pravatar.cc/150?img=52",
    phone: "+1 555-1006",
    emailKey: "dmtwitter.followers.paulg.email",
  },
  {
    id: 7,
    handleKey: "dmtwitter.followers.sama.handle",
    nameKey: "dmtwitter.followers.sama.name",
    avatar: "https://i.pravatar.cc/150?img=28",
    phone: "+1 555-1007",
    emailKey: "dmtwitter.followers.sama.email",
  },
  {
    id: 8,
    handleKey: "dmtwitter.followers.jack.handle",
    nameKey: "dmtwitter.followers.jack.name",
    avatar: "https://i.pravatar.cc/150?img=39",
    phone: "+1 555-1008",
    emailKey: "dmtwitter.followers.jack.email",
  },
  {
    id: 9,
    handleKey: "dmtwitter.followers.vitalik.handle",
    nameKey: "dmtwitter.followers.vitalik.name",
    avatar: "https://i.pravatar.cc/150?img=7",
    phone: "+1 555-1009",
    emailKey: "dmtwitter.followers.vitalik.email",
  },
];

const callLogs = [
  {
    id: 1,
    handleKey: "dmtwitter.callLogs.elonmusk.handle",
    avatar: "https://i.pravatar.cc/150?img=68",
    typeKey: "dmtwitter.callTypes.outgoing",
    time: "2025-10-28 14:00",
    duration: "15:30",
  },
  {
    id: 2,
    handleKey: "dmtwitter.callLogs.codinghorror.handle",
    avatar: "https://i.pravatar.cc/150?img=56",
    typeKey: "dmtwitter.callTypes.incoming",
    time: "2025-10-28 11:20",
    duration: "08:45",
  },
  {
    id: 3,
    handleKey: "dmtwitter.callLogs.verge.handle",
    avatar: "https://i.pravatar.cc/150?img=3",
    typeKey: "dmtwitter.callTypes.missed",
    time: "2025-10-28 09:15",
  },
  {
    id: 4,
    handleKey: "dmtwitter.callLogs.nasdaily.handle",
    avatar: "https://i.pravatar.cc/150?img=24",
    typeKey: "dmtwitter.callTypes.outgoing",
    time: "2025-10-27 20:00",
    duration: "03:20",
  },
  {
    id: 5,
    handleKey: "dmtwitter.callLogs.techcrunch.handle",
    avatar: "https://i.pravatar.cc/150?img=47",
    typeKey: "dmtwitter.callTypes.incoming",
    time: "2025-10-27 16:45",
    duration: "12:10",
  },
];

const XPage = () => {
  const { t } = useTranslation();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const [tab, setTab] = useState("chat");
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedFollower, setSelectedFollower] = useState(null);
  const [selectedCall, setSelectedCall] = useState(null);

  const handleBack = () => {
    setSelectedChat(null);
    setSelectedFollower(null);
    setSelectedCall(null);
  };

  const getCallIcon = (typeKey) => {
    const type = t(typeKey).toLowerCase();
    if (type === t("dmtwitter.callTypes.outgoing").toLowerCase())
      return <FiPhoneCall sx={{ fontSize: 16, color: "#10b981" }} />;
    if (type === t("dmtwitter.callTypes.incoming").toLowerCase())
      return <FiPhoneIncoming sx={{ fontSize: 16, color: "#10b981" }} />;
    return <FiPhoneMissed sx={{ fontSize: 16, color: "#ef4444" }} />;
  };

  const groupFollowersByLetter = () => {
    const grouped = {};
    followers.forEach((follower) => {
      const letter = t(follower.handleKey)[1].toUpperCase(); // @a → A
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(follower);
    });
    return grouped;
  };

  const showDetail = selectedChat || selectedFollower || selectedCall;

  return (
    <ThemeProvider theme={theme}>
      <header className="!mb-4 sm:!mb-6 !px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
          <div className="flex items-center !gap-2 sm:!gap-3">
            <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
              {t("dmtwitter.header.title")} <RiTwitterXLine className="" />
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
              aria-label={t("dmtwitter.tabs.aria_label")}
              sx={{
                mb: 3,
                "& .MuiTabs-indicator": {
                  backgroundImage:
                    "linear-gradient(to right, #0f1419, #0f1419)",
                  height: 3,
                },
              }}
            >
              <Tab
                icon={<FiTwitter />}
                iconPosition="start"
                label={isMobile ? "" : t("dmtwitter.tabs.chat")}
                value="chat"
                aria-label={t("dmtwitter.tabs.chat_aria")}
              />
              <Tab
                icon={<FiUsers />}
                iconPosition="start"
                label={isMobile ? "" : t("dmtwitter.tabs.followers")}
                value="followers"
                aria-label={t("dmtwitter.tabs.followers_aria")}
              />
              <Tab
                icon={<FiPhone />}
                iconPosition="start"
                label={isMobile ? "" : t("dmtwitter.tabs.call_log")}
                value="call-log"
                aria-label={t("dmtwitter.tabs.call_log_aria")}
              />
            </Tabs>
          )}

          {/* Back Button */}
          {showDetail && (
            <Box sx={{ mb: 2 }}>
              <IconButton
                onClick={handleBack}
                sx={{ color: "primary.main" }}
                aria-label={t("dmtwitter.back_button_aria")}
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
                <Stack aria-label={t("dmtwitter.chat.list_aria")}>
                  {chats.map((chat) => (
                    <Box
                      key={chat.id}
                      sx={{
                        p: 2,
                        cursor: "pointer",
                        "&:hover": { bgcolor: "#f7f9f9" },
                      }}
                      onClick={() => setSelectedChat(chat)}
                      aria-label={t("dmtwitter.chat.item_aria", {
                        handle: t(chat.handleKey),
                      })}
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
                            {t(chat.handleKey)}
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
                            {t(chat.lastMessageKey)}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{ fontSize: "0.75rem", color: "#536471" }}
                        >
                          {chat.time}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              )}

              {/* Followers List */}
              {tab === "followers" && (
                <Stack
                  className="scrollbar-hide"
                  sx={{
                    maxHeight: "70vh",
                    overflowY: "auto",
                  }}
                  aria-label={t("dmtwitter.followers.list_aria")}
                >
                  {Object.keys(groupFollowersByLetter())
                    .sort()
                    .map((letter) => (
                      <Box key={letter}>
                        <Box sx={{ px: 2, py: 1, bgcolor: "#f7f9f9" }}>
                          <Typography
                            sx={{
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              color: "#536471",
                            }}
                          >
                            {letter}
                          </Typography>
                        </Box>
                        {groupFollowersByLetter()[letter].map((follower) => (
                          <Box
                            key={follower.id}
                            sx={{
                              p: 2,
                              cursor: "pointer",
                              "&:hover": { bgcolor: "#f7f9f9" },
                            }}
                            onClick={() => setSelectedFollower(follower)}
                            aria-label={t("dmtwitter.followers.item_aria", {
                              handle: t(follower.handleKey),
                            })}
                          >
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                            >
                              <Avatar
                                src={follower.avatar}
                                sx={{ width: 56, height: 56 }}
                              />
                              <Box>
                                <Typography
                                  sx={{
                                    fontWeight: 600,
                                    color: "text.primary",
                                  }}
                                >
                                  {t(follower.handleKey)}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "0.8125rem",
                                    color: "text.secondary",
                                  }}
                                >
                                  {t(follower.nameKey)}
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
              {tab === "call-log" && (
                <Stack aria-label={t("dmtwitter.callLogs.list_aria")}>
                  {callLogs.map((call) => {
                    const color =
                      t(call.typeKey).toLowerCase() ===
                      t("dmtwitter.callTypes.missed").toLowerCase()
                        ? "#ef4444"
                        : "#10b981";
                    return (
                      <Box
                        key={call.id}
                        sx={{
                          p: 2,
                          cursor: "pointer",
                          "&:hover": { bgcolor: "#f7f9f9" },
                        }}
                        onClick={() => setSelectedCall(call)}
                        aria-label={t("dmtwitter.callLogs.item_aria", {
                          handle: t(call.handleKey),
                        })}
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
                                boxShadow: "0 0 0 2px white",
                              }}
                            >
                              {getCallIcon(call.typeKey)}
                            </Box>
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              sx={{ fontWeight: 600, color: "text.primary" }}
                            >
                              {t(call.handleKey)}
                            </Typography>
                            <Typography sx={{ fontSize: "0.875rem", color }}>
                              {t(call.typeKey)}
                            </Typography>
                          </Box>
                          <Typography
                            sx={{ fontSize: "0.75rem", color: "#536471" }}
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
                  <Stack
                    spacing={3}
                    aria-label={t("dmtwitter.chat.detail_aria", {
                      handle: t(selectedChat.handleKey),
                    })}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        src={selectedChat.avatar}
                        sx={{ width: 72, height: 72 }}
                      />
                      <Box>
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: 700, color: "text.primary" }}
                        >
                          {t(selectedChat.handleKey)}
                        </Typography>
                        <Typography
                          sx={{ fontSize: "0.875rem", color: "text.secondary" }}
                        >
                          {t(selectedChat.nameKey)}
                        </Typography>
                      </Box>
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
                              bgcolor: msg.incoming ? "#f0f2f5" : "#1d9bf0",
                              color: msg.incoming ? "#0f1419" : "#ffffff",
                              borderRadius: "18px",
                              px: 3,
                              py: 1.5,
                              borderBottomLeftRadius: msg.incoming ? 4 : "18px",
                              borderBottomRightRadius: msg.incoming
                                ? "18px"
                                : 4,
                            }}
                          >
                            <Typography sx={{ fontSize: "0.9375rem" }}>
                              {t(msg.textKey)}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "0.75rem",
                                mt: 0.5,
                                color: msg.incoming
                                  ? "#536471"
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

                {/* Follower Detail */}
                {selectedFollower && (
                  <Stack
                    spacing={4}
                    alignItems="center"
                    aria-label={t("dmtwitter.followers.detail_aria", {
                      handle: t(selectedFollower.handleKey),
                    })}
                  >
                    <Avatar
                      src={selectedFollower.avatar}
                      sx={{ width: 140, height: 140 }}
                    />
                    <Box textAlign="center">
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, color: "text.primary" }}
                      >
                        {t(selectedFollower.handleKey)}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          color: "text.secondary",
                          mt: 0.5,
                        }}
                      >
                        {t(selectedFollower.nameKey)}
                      </Typography>
                    </Box>

                    {selectedFollower.emailKey && (
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: "#f7f9f9",
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
                            bgcolor: "#000",
                            borderRadius: "50%",
                            p: 1.2,
                            display: "flex",
                          }}
                        >
                          <RiTwitterXLine
                            style={{ color: "white", fontSize: 22 }}
                          />
                        </Box>
                        <Box sx={{ textAlign: "left" }}>
                          <Typography
                            sx={{ fontSize: "0.8125rem", color: "#536471" }}
                          >
                            {t("dmtwitter.followers.handle")}
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 600, color: "text.primary" }}
                          >
                            {t(selectedFollower.emailKey)}
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
                    aria-label={t("dmtwitter.callLogs.detail_aria", {
                      handle: t(selectedCall.handleKey),
                    })}
                  >
                    <Avatar
                      src={selectedCall.avatar}
                      sx={{ width: 140, height: 140 }}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "text.primary" }}
                    >
                      {t(selectedCall.handleKey)}
                    </Typography>
                    <Paper
                      elevation={0}
                      sx={{
                        bgcolor: "#f7f9f9",
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
                          {selectedCall.duration} • {t(selectedCall.typeKey)}
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

export default XPage;
