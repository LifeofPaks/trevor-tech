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
import { SiTiktok } from "react-icons/si";
import BindPhone from "../../components/demo/BindPhone";

// TikTok Light Mode Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#ff0050",
      light: "#ff4d8d",
      dark: "#cc0040",
    },
    secondary: {
      main: "#00f2ea",
      light: "#66f7f2",
      dark: "#00c2b8",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#1c1c1c",
      secondary: "#606060",
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
          color: "#606060",
          "&.Mui-selected": {
            color: "#ff0050",
          },
        },
      },
    },
  },
});

// === TikTok-Style DM Data ===
const chats = [
  {
    id: 1,
    nameKey: "dmtiktok.chats.charli_damelio.name",
    avatar: "https://i.pravatar.cc/150?img=70",
    lastMessageKey: "dmtiktok.chats.charli_damelio.lastMessage",
    time: "1m",
    messages: [
      {
        textKey: "dmtiktok.chats.charli_damelio.messages.msg1.text",
        time: "14:10",
        incoming: true,
      },
      {
        textKey: "dmtiktok.chats.charli_damelio.messages.msg2.text",
        time: "14:11",
        incoming: false,
      },
    ],
  },
  {
    id: 2,
    nameKey: "dmtiktok.chats.khaby_lame.name",
    avatar: "https://i.pravatar.cc/150?img=69",
    lastMessageKey: "dmtiktok.chats.khaby_lame.lastMessage",
    time: "10m",
    messages: [
      {
        textKey: "dmtiktok.chats.khaby_lame.messages.msg1.text",
        time: "13:45",
        incoming: true,
      },
      {
        textKey: "dmtiktok.chats.khaby_lame.messages.msg2.text",
        time: "13:46",
        incoming: false,
      },
    ],
  },
  {
    id: 3,
    nameKey: "dmtiktok.chats.addisonrae.name",
    avatar: "https://i.pravatar.cc/150?img=68",
    lastMessageKey: "dmtiktok.chats.addisonrae.lastMessage",
    time: "1h",
    messages: [
      {
        textKey: "dmtiktok.chats.addisonrae.messages.msg1.text",
        time: "12:30",
        incoming: true,
      },
      {
        textKey: "dmtiktok.chats.addisonrae.messages.msg2.text",
        time: "12:31",
        incoming: false,
      },
    ],
  },
  {
    id: 4,
    nameKey: "dmtiktok.chats.zachking.name",
    avatar: "https://i.pravatar.cc/150?img=67",
    lastMessageKey: "dmtiktok.chats.zachking.lastMessage",
    time: "3h",
    messages: [
      {
        textKey: "dmtiktok.chats.zachking.messages.msg1.text",
        time: "10:00",
        incoming: true,
      },
      {
        textKey: "dmtiktok.chats.zachking.messages.msg2.text",
        time: "10:01",
        incoming: false,
      },
    ],
  },
  {
    id: 5,
    nameKey: "dmtiktok.chats.bellapoarch.name",
    avatar: "https://i.pravatar.cc/150?img=66",
    lastMessageKey: "dmtiktok.chats.bellapoarch.lastMessage",
    time: "6h",
    messages: [
      {
        textKey: "dmtiktok.chats.bellapoarch.messages.msg1.text",
        time: "08:20",
        incoming: true,
      },
      {
        textKey: "dmtiktok.chats.bellapoarch.messages.msg2.text",
        time: "08:21",
        incoming: false,
      },
    ],
  },
];

// === Friends List ===
const friends = [
  {
    id: 1,
    nameKey: "dmtiktok.friends.dixiedamelio.name",
    avatar: "https://i.pravatar.cc/150?img=65",
    phone: "+1 555-2001",
    emailKey: "dmtiktok.friends.dixiedamelio.email",
  },
  {
    id: 2,
    nameKey: "dmtiktok.friends.noahbeck.name",
    avatar: "https://i.pravatar.cc/150?img=64",
    phone: "+1 555-2002",
    emailKey: "dmtiktok.friends.noahbeck.email",
  },
  {
    id: 3,
    nameKey: "dmtiktok.friends.jamescharles.name",
    avatar: "https://i.pravatar.cc/150?img=63",
    phone: "+1 555-2003",
    emailKey: "dmtiktok.friends.jamescharles.email",
  },
  {
    id: 4,
    nameKey: "dmtiktok.friends.larray.name",
    avatar: "https://i.pravatar.cc/150?img=62",
    phone: "+1 555-2004",
    emailKey: "dmtiktok.friends.larray.email",
  },
  {
    id: 5,
    nameKey: "dmtiktok.friends.madi.name",
    avatar: "https://i.pravatar.cc/150?img=61",
    phone: "+1 555-2005",
    emailKey: "dmtiktok.friends.madi.email",
  },
  {
    id: 6,
    nameKey: "dmtiktok.friends.quenblackwell.name",
    avatar: "https://i.pravatar.cc/150?img=60",
    phone: "+1 555-2006",
    emailKey: "dmtiktok.friends.quenblackwell.email",
  },
  {
    id: 7,
    nameKey: "dmtiktok.friends.brycehall.name",
    avatar: "https://i.pravatar.cc/150?img=59",
    phone: "+1 555-2007",
    emailKey: "dmtiktok.friends.brycehall.email",
  },
  {
    id: 8,
    nameKey: "dmtiktok.friends.lorengray.name",
    avatar: "https://i.pravatar.cc/150?img=58",
    phone: "+1 555-2008",
    emailKey: "dmtiktok.friends.lorengray.email",
  },
];

const callLogs = [
  {
    id: 1,
    nameKey: "dmtiktok.callLogs.charli_damelio.name",
    avatar: "https://i.pravatar.cc/150?img=70",
    typeKey: "dmtiktok.callTypes.outgoing",
    time: "2025-10-28 15:00",
    duration: "12:45",
  },
  {
    id: 2,
    nameKey: "dmtiktok.callLogs.khaby_lame.name",
    avatar: "https://i.pravatar.cc/150?img=69",
    typeKey: "dmtiktok.callTypes.incoming",
    time: "2025-10-28 11:30",
    duration: "05:20",
  },
  {
    id: 3,
    nameKey: "dmtiktok.callLogs.addisonrae.name",
    avatar: "https://i.pravatar.cc/150?img=68",
    typeKey: "dmtiktok.callTypes.missed",
    time: "2025-10-28 09:15",
  },
  {
    id: 4,
    nameKey: "dmtiktok.callLogs.zachking.name",
    avatar: "https://i.pravatar.cc/150?img=67",
    typeKey: "dmtiktok.callTypes.outgoing",
    time: "2025-10-27 21:00",
    duration: "18:30",
  },
  {
    id: 5,
    nameKey: "dmtiktok.callLogs.bellapoarch.name",
    avatar: "https://i.pravatar.cc/150?img=66",
    typeKey: "dmtiktok.callTypes.incoming",
    time: "2025-10-27 17:45",
    duration: "09:10",
  },
];

const TiktokPage = () => {
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

  const getCallIcon = (typeKey) => {
    const type = t(typeKey).toLowerCase();
    const iconStyle = { fontSize: 16 };
    if (type === t("dmtiktok.callTypes.outgoing").toLowerCase())
      return <FiPhoneCall style={{ ...iconStyle, color: "#363939" }} />;
    if (type === t("dmtiktok.callTypes.incoming").toLowerCase())
      return <FiPhoneIncoming style={{ ...iconStyle, color: "#363939" }} />;
    return <FiPhoneMissed style={{ ...iconStyle, color: "#363939" }} />;
  };

  const groupFriendsByLetter = () => {
    const grouped = {};
    friends.forEach((friend) => {
      const letter = t(friend.nameKey)[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(friend);
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
              {t("dmtiktok.header.title")}{" "}
              <SiTiktok className="text-[#ff0050]" />
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
              aria-label={t("dmtiktok.tabs.aria_label")}
              sx={{
                mb: 3,
                "& .MuiTabs-indicator": {
                  background: "linear-gradient(45deg, #ff0050, #00f2ea)",
                  height: 3,
                },
              }}
            >
              <Tab
                icon={<SiTiktok />}
                iconPosition="start"
                label={isMobile ? "" : t("dmtiktok.tabs.chat")}
                value="chat"
                aria-label={t("dmtiktok.tabs.chat_aria")}
              />
              <Tab
                icon={<FiUsers />}
                iconPosition="start"
                label={isMobile ? "" : t("dmtiktok.tabs.friends")}
                value="friends"
                aria-label={t("dmtiktok.tabs.friends_aria")}
              />
              <Tab
                icon={<FiPhone />}
                iconPosition="start"
                label={isMobile ? "" : t("dmtiktok.tabs.call_log")}
                value="call-log"
                aria-label={t("dmtiktok.tabs.call_log_aria")}
              />
            </Tabs>
          )}

          {/* Back Button */}
          {showDetail && (
            <Box sx={{ mb: 2 }}>
              <IconButton
                onClick={handleBack}
                sx={{ color: "primary.main" }}
                aria-label={t("dmtiktok.back_button_aria")}
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
                "&::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              className="scrollbar-hide"
            >
              {/* Chat List */}
              {tab === "chat" && (
                <Stack aria-label={t("dmtiktok.chat.list_aria")}>
                  {chats.map((chat) => (
                    <Box
                      key={chat.id}
                      sx={{
                        p: 2,
                        cursor: "pointer",
                        "&:hover": { bgcolor: "#f7f7f7" },
                      }}
                      onClick={() => setSelectedChat(chat)}
                      aria-label={t("dmtiktok.chat.item_aria", {
                        name: t(chat.nameKey),
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
                            {t(chat.nameKey)}
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
                          sx={{ fontSize: "0.75rem", color: "#606060" }}
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
                <Stack
                  className="scrollbar-hide"
                  sx={{
                    maxHeight: "70vh",
                    overflowY: "auto",
                  }}
                  aria-label={t("dmtiktok.friends.list_aria")}
                >
                  {Object.keys(groupFriendsByLetter())
                    .sort()
                    .map((letter) => (
                      <Box key={letter}>
                        <Box sx={{ px: 2, py: 1, bgcolor: "#f0f0f0" }}>
                          <Typography
                            sx={{
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              color: "#606060",
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
                              "&:hover": { bgcolor: "#f7f7f7" },
                            }}
                            onClick={() => setSelectedFriend(friend)}
                            aria-label={t("dmtiktok.friends.item_aria", {
                              name: t(friend.nameKey),
                            })}
                          >
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                            >
                              <Avatar
                                src={friend.avatar}
                                sx={{ width: 56, height: 56 }}
                              />
                              <Typography
                                sx={{ fontWeight: 500, color: "text.primary" }}
                              >
                                {t(friend.nameKey)}
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
                <Stack aria-label={t("dmtiktok.callLogs.list_aria")}>
                  {callLogs.map((call) => {
                    const color =
                      t(call.typeKey).toLowerCase() ===
                      t("dmtiktok.callTypes.missed").toLowerCase()
                        ? "#ff0050"
                        : "#06cd20";
                    return (
                      <Box
                        key={call.id}
                        sx={{
                          p: 2,
                          cursor: "pointer",
                          "&:hover": { bgcolor: "#f7f7f7" },
                        }}
                        onClick={() => setSelectedCall(call)}
                        aria-label={t("dmtiktok.callLogs.item_aria", {
                          name: t(call.nameKey),
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
                              {t(call.nameKey)}
                            </Typography>
                            <Typography sx={{ fontSize: "0.875rem", color }}>
                              {t(call.typeKey)}
                            </Typography>
                          </Box>
                          <Typography
                            sx={{ fontSize: "0.75rem", color: "#606060" }}
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
                  "&::-webkit-scrollbar": { display: "none" },
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
                className="scrollbar-hide"
              >
                {/* Chat Detail */}
                {selectedChat && (
                  <Stack
                    spacing={3}
                    aria-label={t("dmtiktok.chat.detail_aria", {
                      name: t(selectedChat.nameKey),
                    })}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        src={selectedChat.avatar}
                        sx={{ width: 72, height: 72 }}
                      />
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, color: "text.primary" }}
                      >
                        {t(selectedChat.nameKey)}
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
                                ? "#f0f0f0"
                                : "linear-gradient(45deg, #ff0050, #00f2ea)",
                              color: msg.incoming ? "#1c1c1c" : "#ffffff",
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
                                  ? "#606060"
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

                {/* Friend Detail */}
                {selectedFriend && (
                  <Stack
                    spacing={4}
                    alignItems="center"
                    aria-label={t("dmtiktok.friends.detail_aria", {
                      name: t(selectedFriend.nameKey),
                    })}
                  >
                    <Avatar
                      src={selectedFriend.avatar}
                      sx={{ width: 140, height: 140 }}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "text.primary" }}
                    >
                      {t(selectedFriend.nameKey)}
                    </Typography>

                    {selectedFriend.phone && (
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: "#f7f7f7",
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
                            bgcolor: "linear-gradient(45deg, #ff0050, #00f2ea)",
                            borderRadius: "50%",
                            p: 1.2,
                            display: "flex",
                          }}
                        >
                          <FiPhone style={{ color: "white", fontSize: 22 }} />
                        </Box>
                        <Box sx={{ textAlign: "left" }}>
                          <Typography
                            sx={{ fontSize: "0.8125rem", color: "#606060" }}
                          >
                            {t("dmtiktok.friends.phone")}
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 600, color: "text.primary" }}
                          >
                            {selectedFriend.phone}
                          </Typography>
                        </Box>
                      </Paper>
                    )}

                    {selectedFriend.emailKey && (
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: "#f7f7f7",
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
                            bgcolor: "linear-gradient(45deg, #ff0050, #00f2ea)",
                            borderRadius: "50%",
                            p: 1.2,
                            display: "flex",
                          }}
                        >
                          <FiMail style={{ color: "white", fontSize: 22 }} />
                        </Box>
                        <Box sx={{ textAlign: "left" }}>
                          <Typography
                            sx={{ fontSize: "0.8125rem", color: "#606060" }}
                          >
                            {t("dmtiktok.friends.email")}
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 600, color: "text.primary" }}
                          >
                            {t(selectedFriend.emailKey)}
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
                    aria-label={t("dmtiktok.callLogs.detail_aria", {
                      name: t(selectedCall.nameKey),
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
                      {t(selectedCall.nameKey)}
                    </Typography>
                    <Paper
                      elevation={0}
                      sx={{
                        bgcolor: "#f7f7f7",
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

export default TiktokPage;
