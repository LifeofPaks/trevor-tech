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
import { RiSnapchatFill } from "react-icons/ri";
import BindPhone from "../../components/demo/BindPhone";

// Snapchat Light Mode Theme – Darker Yellow
const theme = createTheme({
  palette: {
    primary: {
      main: "#fffc00",
      light: "#ffff52",
      dark: "#c7cc00",
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
            color: "#000000",
          },
        },
      },
    },
  },
});

// === Younger, Mixed-Gender Profiles (50/50) ===
const chats = [
  {
    id: 1,
    nameKey: "dmsnap.chats.lily_rosee.name",
    avatar: "https://i.pravatar.cc/150?img=27", // young woman
    lastMessageKey: "dmsnap.chats.lily_rosee.lastMessage",
    time: "1m",
    messages: [
      { textKey: "dmsnap.chats.lily_rosee.messages.msg1.text", time: "14:10", incoming: true },
      { textKey: "dmsnap.chats.lily_rosee.messages.msg2.text", time: "14:11", incoming: false },
    ],
  },
  {
    id: 2,
    nameKey: "dmsnap.chats.jake_surf.name",
    avatar: "https://i.pravatar.cc/150?img=32", // young man
    lastMessageKey: "dmsnap.chats.jake_surf.lastMessage",
    time: "5m",
    messages: [
      { textKey: "dmsnap.chats.jake_surf.messages.msg1.text", time: "13:45", incoming: true },
      { textKey: "dmsnap.chats.jake_surf.messages.msg2.text", time: "13:46", incoming: false },
    ],
  },
  {
    id: 3,
    nameKey: "dmsnap.chats.mia_vibes.name",
    avatar: "https://i.pravatar.cc/150?img=25", // young woman
    lastMessageKey: "dmsnap.chats.mia_vibes.lastMessage",
    time: "1h",
    messages: [
      { textKey: "dmsnap.chats.mia_vibes.messages.msg1.text", time: "12:30", incoming: true },
      { textKey: "dmsnap.chats.mia_vibes.messages.msg2.text", time: "12:31", incoming: false },
    ],
  },
  {
    id: 4,
    nameKey: "dmsnap.chats.ethan_music.name",
    avatar: "https://i.pravatar.cc/150?img=30", // young man
    lastMessageKey: "dmsnap.chats.ethan_music.lastMessage",
    time: "3h",
    messages: [
      { textKey: "dmsnap.chats.ethan_music.messages.msg1.text", time: "10:00", incoming: true },
      { textKey: "dmsnap.chats.ethan_music.messages.msg2.text", time: "10:01", incoming: false },
    ],
  },
  {
    id: 5,
    nameKey: "dmsnap.chats.sophia_art.name",
    avatar: "https://i.pravatar.cc/150?img=26", // young woman
    lastMessageKey: "dmsnap.chats.sophia_art.lastMessage",
    time: "6h",
    messages: [
      { textKey: "dmsnap.chats.sophia_art.messages.msg1.text", time: "08:20", incoming: true },
      { textKey: "dmsnap.chats.sophia_art.messages.msg2.text", time: "08:21", incoming: false },
    ],
  },
];

// === Followers (Young, Mixed) ===
const followers = [
  {
    id: 1,
    nameKey: "dmsnap.followers.ava_dance.name",
    avatar: "https://i.pravatar.cc/150?img=24",
    phone: "+1 555-4001",
    emailKey: "dmsnap.followers.ava_dance.email",
  },
  {
    id: 2,
    nameKey: "dmsnap.followers.noah_beck.name",
    avatar: "https://i.pravatar.cc/150?img=31",
    phone: "+1 555-4002",
    emailKey: "dmsnap.followers.noah_beck.email",
  },
  {
    id: 3,
    nameKey: "dmsnap.followers.ella_fit.name",
    avatar: "https://i.pravatar.cc/150?img=28",
    phone: "+1 555-4003",
    emailKey: "dmsnap.followers.ella_fit.email",
  },
  {
    id: 4,
    nameKey: "dmsnap.followers.liam_guitar.name",
    avatar: "https://i.pravatar.cc/150?img=33",
    phone: "+1 555-4004",
    emailKey: "dmsnap.followers.liam_guitar.email",
  },
  {
    id: 5,
    nameKey: "dmsnap.followers.zoe_style.name",
    avatar: "https://i.pravatar.cc/150?img=29",
    phone: "+1 555-4005",
    emailKey: "dmsnap.followers.zoe_style.email",
  },
  {
    id: 6,
    nameKey: "dmsnap.followers.carter_skate.name",
    avatar: "https://i.pravatar.cc/150?img=34",
    phone: "+1 555-4006",
    emailKey: "dmsnap.followers.carter_skate.email",
  },
  {
    id: 7,
    nameKey: "dmsnap.followers.grace_photo.name",
    avatar: "https://i.pravatar.cc/150?img=23",
    phone: "+1 555-4007",
    emailKey: "dmsnap.followers.grace_photo.email",
  },
  {
    id: 8,
    nameKey: "dmsnap.followers.dylan_vlog.name",
    avatar: "https://i.pravatar.cc/150?img=35",
    phone: "+1 555-4008",
    emailKey: "dmsnap.followers.dylan_vlog.email",
  },
];

const SnapchatPage = () => {
  const { t } = useTranslation();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const [tab, setTab] = useState("chat");
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedFollower, setSelectedFollower] = useState(null);

  const handleBack = () => {
    setSelectedChat(null);
    setSelectedFollower(null);
  };

  const groupFollowersByLetter = () => {
    const grouped = {};
    followers.forEach((follower) => {
      const letter = t(follower.nameKey)[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(follower);
    });
    return grouped;
  };

  const showDetail = selectedChat || selectedFollower;

  return (
    <ThemeProvider theme={theme}>
      <header className="!mb-4 sm:!mb-6 !px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
          <div className="flex items-center !gap-2 sm:!gap-3">
            <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
              {t("dmsnap.header.title")} <RiSnapchatFill className="text-[#666505]" />
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
          {/* Tabs – Only Chat & Followers */}
          {!showDetail && (
            <Tabs
              value={tab}
              onChange={(e, v) => setTab(v)}
              aria-label={t("dmsnap.tabs.aria_label")}
              sx={{
                mb: 3,
                "& .MuiTabs-indicator": {
                  background: "#ffd600", // Darker yellow
                  height: 3,
                },
              }}
            >
              <Tab
                icon={<RiSnapchatFill />}
                iconPosition="start"
                label={isMobile ? "" : t("dmsnap.tabs.chat")}
                value="chat"
                aria-label={t("dmsnap.tabs.chat_aria")}
              />
              <Tab
                icon={<FiUsers />}
                iconPosition="start"
                label={isMobile ? "" : t("dmsnap.tabs.followers")}
                value="followers"
                aria-label={t("dmsnap.tabs.followers_aria")}
              />
            </Tabs>
          )}

          {/* Back Button */}
          {showDetail && (
            <Box sx={{ mb: 2 }}>
              <IconButton
                onClick={handleBack}
                sx={{ color: "secondary.main" }}
                aria-label={t("dmsnap.back_button_aria")}
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
                <Stack aria-label={t("dmsnap.chat.list_aria")}>
                  {chats.map((chat) => (
                    <Box
                      key={chat.id}
                      sx={{
                        p: 2,
                        cursor: "pointer",
                        "&:hover": { bgcolor: "#f7f7f7" },
                      }}
                      onClick={() => setSelectedChat(chat)}
                      aria-label={t("dmsnap.chat.item_aria", { name: t(chat.nameKey) })}
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
                          sx={{ fontSize: "0.75rem", color: "#666666" }}
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
                  aria-label={t("dmsnap.followers.list_aria")}
                >
                  {Object.keys(groupFollowersByLetter())
                    .sort()
                    .map((letter) => (
                      <Box key={letter}>
                        <Box sx={{ px: 2, py: 1, bgcolor: "#f0f0f0" }}>
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
                        {groupFollowersByLetter()[letter].map((follower) => (
                          <Box
                            key={follower.id}
                            sx={{
                              p: 2,
                              cursor: "pointer",
                              "&:hover": { bgcolor: "#f7f7f7" },
                            }}
                            onClick={() => setSelectedFollower(follower)}
                            aria-label={t("dmsnap.followers.item_aria", { name: t(follower.nameKey) })}
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
                              <Typography
                                sx={{ fontWeight: 500, color: "text.primary" }}
                              >
                                {t(follower.nameKey)}
                              </Typography>
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
                  <Stack spacing={3} aria-label={t("dmsnap.chat.detail_aria", { name: t(selectedChat.nameKey) })}>
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
                              bgcolor: msg.incoming ? "#f0f0f0" : "#fffc00",
                              color: "#000",
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
                                color: "#666",
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
                  <Stack spacing={4} alignItems="center" aria-label={t("dmsnap.followers.detail_aria", { name: t(selectedFollower.nameKey) })}>
                    <Avatar
                      src={selectedFollower.avatar}
                      sx={{ width: 140, height: 140 }}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "text.primary" }}
                    >
                      {t(selectedFollower.nameKey)}
                    </Typography>

                    {selectedFollower.phone && (
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: "#fff9c4",
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
                            bgcolor: "#fffc00",
                            borderRadius: "50%",
                            p: 1.2,
                            display: "flex",
                          }}
                        >
                          <FiMail style={{ color: "black", fontSize: 22 }} />
                        </Box>
                        <Box sx={{ textAlign: "left" }}>
                          <Typography
                            sx={{ fontSize: "0.8125rem", color: "#666666" }}
                          >
                            {t("dmsnap.followers.phone")}
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 600, color: "text.primary" }}
                          >
                            {selectedFollower.phone}
                          </Typography>
                        </Box>
                      </Paper>
                    )}

                    {selectedFollower.emailKey && (
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: "#f0f4ff",
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
                            bgcolor: "#000000",
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
                            {t("dmsnap.followers.email")}
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

export default SnapchatPage;