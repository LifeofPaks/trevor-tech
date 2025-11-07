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
import { FiMessageSquare, FiUsers, FiMail } from "react-icons/fi";
import { IoArrowBackCircle, IoLogoBitbucket } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import BindPhone from "../../components/demo/BindPhone";

// LinkedIn Light Mode Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#0A66C2",
      light: "#3d8be0",
      dark: "#004182",
    },
    secondary: {
      main: "#000000",
      light: "#333333",
      dark: "#000000",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#1c1c1c",
      secondary: "#666666",
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
          color: "#666666",
          "&.Mui-selected": {
            color: "#0A66C2",
          },
        },
      },
    },
  },
});

// === Cheating Drama Chats (8 Total) ===
const chats = [
  {
    id: 1,
    nameKey: "dmlink.chats.emma_chen.name",
    avatar: "https://i.pravatar.cc/150?img=27", // young woman
    titleKey: "dmlink.chats.emma_chen.title",
    lastMessageKey: "dmlink.chats.emma_chen.lastMessage",
    time: "2m",
    messages: [
      {
        textKey: "dmlink.chats.emma_chen.messages.msg1.text",
        time: "00:15",
        incoming: true,
      },
      {
        textKey: "dmlink.chats.emma_chen.messages.msg2.text",
        time: "00:16",
        incoming: false,
      },
      {
        textKey: "dmlink.chats.emma_chen.messages.msg3.text",
        time: "00:18",
        incoming: true,
      },
      {
        textKey: "dmlink.chats.emma_chen.messages.msg4.text",
        time: "00:20",
        incoming: false,
      },
    ],
  },
  {
    id: 2,
    nameKey: "dmlink.chats.alex_rivera.name",
    avatar: "https://i.pravatar.cc/150?img=32", // young man
    titleKey: "dmlink.chats.alex_rivera.title",
    lastMessageKey: "dmlink.chats.alex_rivera.lastMessage",
    time: "10m",
    messages: [
      {
        textKey: "dmlink.chats.alex_rivera.messages.msg1.text",
        time: "22:30",
        incoming: true,
      },
      {
        textKey: "dmlink.chats.alex_rivera.messages.msg2.text",
        time: "22:31",
        incoming: false,
      },
      {
        textKey: "dmlink.chats.alex_rivera.messages.msg3.text",
        time: "22:32",
        incoming: true,
      },
      {
        textKey: "dmlink.chats.alex_rivera.messages.msg4.text",
        time: "22:33",
        incoming: false,
      },
    ],
  },
  {
    id: 3,
    nameKey: "dmlink.chats.sofia_patel.name",
    avatar: "https://i.pravatar.cc/150?img=25", // young woman
    titleKey: "dmlink.chats.sofia_patel.title",
    lastMessageKey: "dmlink.chats.sofia_patel.lastMessage",
    time: "1h",
    messages: [
      {
        textKey: "dmlink.chats.sofia_patel.messages.msg1.text",
        time: "23:45",
        incoming: true,
      },
      {
        textKey: "dmlink.chats.sofia_patel.messages.msg2.text",
        time: "23:46",
        incoming: false,
      },
      {
        textKey: "dmlink.chats.sofia_patel.messages.msg3.text",
        time: "23:47",
        incoming: true,
      },
      {
        textKey: "dmlink.chats.sofia_patel.messages.msg4.text",
        time: "23:48",
        incoming: false,
      },
    ],
  },
  {
    id: 4,
    nameKey: "dmlink.chats.liam_brooks.name",
    avatar: "https://i.pravatar.cc/150?img=30", // young man
    titleKey: "dmlink.chats.liam_brooks.title",
    lastMessageKey: "dmlink.chats.liam_brooks.lastMessage",
    time: "3h",
    messages: [
      {
        textKey: "dmlink.chats.liam_brooks.messages.msg1.text",
        time: "21:00",
        incoming: true,
      },
      {
        textKey: "dmlink.chats.liam_brooks.messages.msg2.text",
        time: "21:01",
        incoming: false,
      },
      {
        textKey: "dmlink.chats.liam_brooks.messages.msg3.text",
        time: "21:02",
        incoming: true,
      },
      {
        textKey: "dmlink.chats.liam_brooks.messages.msg4.text",
        time: "21:03",
        incoming: false,
      },
    ],
  },
  {
    id: 5,
    nameKey: "dmlink.chats.maya_kim.name",
    avatar: "https://i.pravatar.cc/150?img=26", // young woman
    titleKey: "dmlink.chats.maya_kim.title",
    lastMessageKey: "dmlink.chats.maya_kim.lastMessage",
    time: "6h",
    messages: [
      {
        textKey: "dmlink.chats.maya_kim.messages.msg1.text",
        time: "02:10",
        incoming: true,
      },
      {
        textKey: "dmlink.chats.maya_kim.messages.msg2.text",
        time: "02:11",
        incoming: false,
      },
      {
        textKey: "dmlink.chats.maya_kim.messages.msg3.text",
        time: "02:12",
        incoming: true,
      },
      {
        textKey: "dmlink.chats.maya_kim.messages.msg4.text",
        time: "02:13",
        incoming: false,
      },
    ],
  },
  {
    id: 6,
    nameKey: "dmlink.chats.noah_kim.name",
    avatar: "https://i.pravatar.cc/150?img=31", // young man
    titleKey: "dmlink.chats.noah_kim.title",
    lastMessageKey: "dmlink.chats.noah_kim.lastMessage",
    time: "1d",
    messages: [
      {
        textKey: "dmlink.chats.noah_kim.messages.msg1.text",
        time: "18:00",
        incoming: true,
      },
      {
        textKey: "dmlink.chats.noah_kim.messages.msg2.text",
        time: "18:01",
        incoming: false,
      },
      {
        textKey: "dmlink.chats.noah_kim.messages.msg3.text",
        time: "18:02",
        incoming: true,
      },
      {
        textKey: "dmlink.chats.noah_kim.messages.msg4.text",
        time: "18:03",
        incoming: false,
      },
    ],
  },
  {
    id: 7,
    nameKey: "dmlink.chats.isabella_wu.name",
    avatar: "https://i.pravatar.cc/150?img=28", // young woman
    titleKey: "dmlink.chats.isabella_wu.title",
    lastMessageKey: "dmlink.chats.isabella_wu.lastMessage",
    time: "2d",
    messages: [
      {
        textKey: "dmlink.chats.isabella_wu.messages.msg1.text",
        time: "20:30",
        incoming: true,
      },
      {
        textKey: "dmlink.chats.isabella_wu.messages.msg2.text",
        time: "20:31",
        incoming: false,
      },
      {
        textKey: "dmlink.chats.isabella_wu.messages.msg3.text",
        time: "20:32",
        incoming: true,
      },
      {
        textKey: "dmlink.chats.isabella_wu.messages.msg4.text",
        time: "20:33",
        incoming: false,
      },
    ],
  },
  {
    id: 8,
    nameKey: "dmlink.chats.ethan_zhang.name",
    avatar: "https://i.pravatar.cc/150?img=33", // young man
    titleKey: "dmlink.chats.ethan_zhang.title",
    lastMessageKey: "dmlink.chats.ethan_zhang.lastMessage",
    time: "3d",
    messages: [
      {
        textKey: "dmlink.chats.ethan_zhang.messages.msg1.text",
        time: "23:00",
        incoming: true,
      },
      {
        textKey: "dmlink.chats.ethan_zhang.messages.msg2.text",
        time: "23:01",
        incoming: false,
      },
      {
        textKey: "dmlink.chats.ethan_zhang.messages.msg3.text",
        time: "23:02",
        incoming: true,
      },
      {
        textKey: "dmlink.chats.ethan_zhang.messages.msg4.text",
        time: "23:03",
        incoming: false,
      },
    ],
  },
];

// === Connections (Same as before) ===
const connections = [
  {
    id: 1,
    nameKey: "dmlink.connections.noah_kim.name",
    avatar: "https://i.pravatar.cc/150?img=31",
    titleKey: "dmlink.connections.noah_kim.title",
    emailKey: "dmlink.connections.noah_kim.email",
  },
  {
    id: 2,
    nameKey: "dmlink.connections.isabella_wu.name",
    avatar: "https://i.pravatar.cc/150?img=28",
    titleKey: "dmlink.connections.isabella_wu.title",
    emailKey: "dmlink.connections.isabella_wu.email",
  },
  {
    id: 3,
    nameKey: "dmlink.connections.ethan_zhang.name",
    avatar: "https://i.pravatar.cc/150?img=33",
    titleKey: "dmlink.connections.ethan_zhang.title",
    emailKey: "dmlink.connections.ethan_zhang.email",
  },
  {
    id: 4,
    nameKey: "dmlink.connections.zoe_park.name",
    avatar: "https://i.pravatar.cc/150?img=29",
    titleKey: "dmlink.connections.zoe_park.title",
    emailKey: "dmlink.connections.zoe_park.email",
  },
  {
    id: 5,
    nameKey: "dmlink.connections.carter_lee.name",
    avatar: "https://i.pravatar.cc/150?img=34",
    titleKey: "dmlink.connections.carter_lee.title",
    emailKey: "dmlink.connections.carter_lee.email",
  },
  {
    id: 6,
    nameKey: "dmlink.connections.grace_liu.name",
    avatar: "https://i.pravatar.cc/150?img=23",
    titleKey: "dmlink.connections.grace_liu.title",
    emailKey: "dmlink.connections.grace_liu.email",
  },
  {
    id: 7,
    nameKey: "dmlink.connections.dylan_chen.name",
    avatar: "https://i.pravatar.cc/150?img=35",
    titleKey: "dmlink.connections.dylan_chen.title",
    emailKey: "dmlink.connections.dylan_chen.email",
  },
  {
    id: 8,
    nameKey: "dmlink.connections.ava_singh.name",
    avatar: "https://i.pravatar.cc/150?img=24",
    titleKey: "dmlink.connections.ava_singh.title",
    emailKey: "dmlink.connections.ava_singh.email",
  },
];

const LinkedInPage = () => {
  const { t } = useTranslation();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const [tab, setTab] = useState("chat");
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedConnection, setSelectedConnection] = useState(null);

  const handleBack = () => {
    setSelectedChat(null);
    setSelectedConnection(null);
  };

  const groupConnectionsByLetter = () => {
    const grouped = {};
    connections.forEach((conn) => {
      const letter = t(conn.nameKey)[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(conn);
    });
    return grouped;
  };

  const showDetail = selectedChat || selectedConnection;

  return (
    <ThemeProvider theme={theme}>
      <header className="!mb-4 sm:!mb-6 !px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
          <div className="flex items-center !gap-2 sm:!gap-3">
            <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
              {t("dmlink.header.title")}{" "}
              <FaLinkedin className="text-[#0A66C2]" />
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
              aria-label={t("dmlink.tabs.aria_label")}
              sx={{
                mb: 3,
                "& .MuiTabs-indicator": {
                  background: "#0A66C2",
                  height: 3,
                },
              }}
            >
              <Tab
                icon={<FaLinkedin />}
                iconPosition="start"
                label={isMobile ? "" : t("dmlink.tabs.chat")}
                value="chat"
                aria-label={t("dmlink.tabs.chat_aria")}
              />
              <Tab
                icon={<FiUsers />}
                iconPosition="start"
                label={isMobile ? "" : t("dmlink.tabs.connections")}
                value="connections"
                aria-label={t("dmlink.tabs.connections_aria")}
              />
            </Tabs>
          )}

          {/* Back Button */}
          {showDetail && (
            <Box sx={{ mb: 2 }}>
              <IconButton
                onClick={handleBack}
                sx={{ color: "primary.main" }}
                aria-label={t("dmlink.back_button_aria")}
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
                <Stack aria-label={t("dmlink.chat.list_aria")}>
                  {chats.map((chat) => (
                    <Box
                      key={chat.id}
                      sx={{
                        p: 2,
                        cursor: "pointer",
                        "&:hover": { bgcolor: "#f8f9fa" },
                      }}
                      onClick={() => setSelectedChat(chat)}
                      aria-label={t("dmlink.chat.item_aria", {
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
                              fontSize: "0.8125rem",
                              color: "#0A66C2",
                              fontWeight: 500,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {t(chat.titleKey)}
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
                          sx={{ fontSize: "0.75rem", color: "#666666" }}
                        >
                          {chat.time}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              )}

              {/* Connections List */}
              {tab === "connections" && (
                <Stack
                  className="scrollbar-hide"
                  sx={{
                    maxHeight: "70vh",
                    overflowY: "auto",
                  }}
                  aria-label={t("dmlink.connections.list_aria")}
                >
                  {Object.keys(groupConnectionsByLetter())
                    .sort()
                    .map((letter) => (
                      <Box key={letter}>
                        <Box sx={{ px: 2, py: 1, bgcolor: "#f0f4f8" }}>
                          <Typography
                            sx={{
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              color: "#666666",
                            }}
                          >
                            {letter}
                          </Typography>
                        </Box>
                        {groupConnectionsByLetter()[letter].map((conn) => (
                          <Box
                            key={conn.id}
                            sx={{
                              p: 2,
                              cursor: "pointer",
                              "&:hover": { bgcolor: "#f8f9fa" },
                            }}
                            onClick={() => setSelectedConnection(conn)}
                            aria-label={t("dmlink.connections.item_aria", {
                              name: t(conn.nameKey),
                            })}
                          >
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                            >
                              <Avatar
                                src={conn.avatar}
                                sx={{ width: 56, height: 56 }}
                              />
                              <Box sx={{ flex: 1 }}>
                                <Typography
                                  sx={{
                                    fontWeight: 600,
                                    color: "text.primary",
                                  }}
                                >
                                  {t(conn.nameKey)}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "0.8125rem",
                                    color: "#0A66C2",
                                    fontWeight: 500,
                                  }}
                                >
                                  {t(conn.titleKey)}
                                </Typography>
                              </Box>
                            </Stack>
                          </Box>
                        ))}
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
                    aria-label={t("dmlink.chat.detail_aria", {
                      name: t(selectedChat.nameKey),
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
                          {t(selectedChat.nameKey)}
                        </Typography>
                        <Typography
                          sx={{ color: "#0A66C2", fontSize: "0.9375rem" }}
                        >
                          {t(selectedChat.titleKey)}
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
                              bgcolor: msg.incoming ? "#f1f3f5" : "#0A66C2",
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
                                  ? "#666"
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

                {/* Connection Detail */}
                {selectedConnection && (
                  <Stack
                    spacing={4}
                    alignItems="center"
                    aria-label={t("dmlink.connections.detail_aria", {
                      name: t(selectedConnection.nameKey),
                    })}
                  >
                    <Avatar
                      src={selectedConnection.avatar}
                      sx={{ width: 140, height: 140 }}
                    />
                    <Box textAlign="center">
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, color: "text.primary" }}
                      >
                        {t(selectedConnection.nameKey)}
                      </Typography>
                      <Typography
                        sx={{ color: "#0A66C2", fontSize: "1rem", mt: 1 }}
                      >
                        {t(selectedConnection.titleKey)}
                      </Typography>
                    </Box>

                    {selectedConnection.emailKey && (
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: "#e7f0ff",
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
                            bgcolor: "#0A66C2",
                            borderRadius: "50%",
                            p: 1.2,
                            display: "flex",
                          }}
                        >
                          <FiMail style={{ color: "white", fontSize: 22 }} />
                        </Box>
                        <Box sx={{ textAlign: "left" }}>
                          <Typography
                            sx={{ fontSize: "0.8125rem", color: "#666666" }}
                          >
                            {t("dmlink.connections.email")}
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 600, color: "text.primary" }}
                          >
                            {t(selectedConnection.emailKey)}
                          </Typography>
                        </Box>
                      </Paper>
                    )}
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

export default LinkedInPage;
