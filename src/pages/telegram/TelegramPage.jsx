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
import { useTranslation } from "react-i18next";
import BindPhone from "../../components/demo/BindPhone";
import { RiCheckDoubleFill } from "react-icons/ri";
import { SiTelegram } from "react-icons/si";

// Telegram Light Mode Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#229ED9", // Telegram blue
      light: "#4FB3F6",
      dark: "#1C7BB0",
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
            color: "#229ED9",
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
    nameKey: "jake_morrison",
    avatar: "https://i.pravatar.cc/150?img=38",
    time: "03:12",
    msg1_time: "02:50",
    msg2_time: "02:51",
    msg3_time: "02:52",
    msg4_time: "02:53",
    msg5_time: "03:12",
  },
  {
    id: 2,
    nameKey: "tyler_reed",
    avatar: "https://i.pravatar.cc/150?img=39",
    time: "01:47",
    msg1_time: "01:30",
    msg2_time: "01:31",
    msg3_time: "01:32",
    msg4_time: "01:33",
    msg5_time: "01:47",
  },
  {
    id: 3,
    nameKey: "caleb_holt",
    avatar: "https://i.pravatar.cc/150?img=40",
    time: "00:28",
    msg1_time: "00:10",
    msg2_time: "00:11",
    msg3_time: "00:12",
    msg4_time: "00:28",
  },
  {
    id: 4,
    nameKey: "logan_pierce",
    avatar: "https://i.pravatar.cc/150?img=41",
    time: "23:55",
    msg1_time: "23:40",
    msg2_time: "23:41",
    msg3_time: "23:42",
    msg4_time: "23:55",
  },
  {
    id: 5,
    nameKey: "austin_grey",
    avatar: "https://i.pravatar.cc/150?img=42",
    time: "02:30",
    msg1_time: "02:00",
    msg2_time: "02:01",
    msg3_time: "02:02",
    msg4_time: "02:03",
    msg5_time: "02:30",
  },
  {
    id: 6,
    nameKey: "brandon_cole",
    avatar: "https://i.pravatar.cc/150?img=43",
    time: "22:10",
    msg1_time: "21:50",
    msg2_time: "21:51",
    msg3_time: "21:52",
    msg4_time: "21:53",
    msg5_time: "22:10",
  },
  {
    id: 7,
    nameKey: "evan_shaw",
    avatar: "https://i.pravatar.cc/150?img=44",
    time: "20:45",
    msg1_time: "20:30",
    msg2_time: "20:31",
    msg3_time: "20:32",
    msg4_time: "20:45",
  },
  {
    id: 8,
    nameKey: "gavin_knox",
    avatar: "https://i.pravatar.cc/150?img=45",
    time: "03:05",
    msg1_time: "02:55",
    msg2_time: "02:56",
    msg3_time: "02:57",
    msg4_time: "03:05",
  },
  {
    id: 9,
    nameKey: "hunter_blake",
    avatar: "https://i.pravatar.cc/150?img=46",
    time: "01:15",
    msg1_time: "01:00",
    msg2_time: "01:01",
    msg3_time: "01:02",
    msg4_time: "01:15",
  },
  {
    id: 10,
    nameKey: "jordan_miles",
    avatar: "https://i.pravatar.cc/150?img=47",
    time: "00:05",
    msg1_time: "23:50",
    msg2_time: "23:51",
    msg3_time: "23:52",
    msg4_time: "00:05",
  },
  {
    id: 11,
    nameKey: "kyle_vance",
    avatar: "https://i.pravatar.cc/150?img=48",
    time: "04:20",
    msg1_time: "04:00",
    msg2_time: "04:01",
    msg3_time: "04:02",
    msg4_time: "04:20",
  },
  {
    id: 12,
    nameKey: "mason_hale",
    avatar: "https://i.pravatar.cc/150?img=49",
    time: "21:30",
    msg1_time: "21:15",
    msg2_time: "21:16",
    msg3_time: "21:17",
    msg4_time: "21:30",
  },
];

// === Friends (Contacts) ===
const friends = [
  ...chats.map((c) => ({
    id: c.id,
    nameKey: c.nameKey,
    avatar: c.avatar,
    phone: `+1 555-${1000 + c.id}`,
    email: `${c.nameKey.split("_")[0]}@telegram.com`,
  })),
];

// === Call Logs ===
const callLogs = [
  {
    id: 1,
    nameKey: "jake_morrison",
    avatar: "https://i.pravatar.cc/150?img=38",
    type: "outgoing",
    time: "2025-10-28 23:30",
    duration: "22:15",
  },
  {
    id: 2,
    nameKey: "tyler_reed",
    avatar: "https://i.pravatar.cc/150?img=39",
    type: "incoming",
    time: "2025-10-28 22:10",
    duration: "14:30",
  },
  {
    id: 3,
    nameKey: "caleb_holt",
    avatar: "https://i.pravatar.cc/150?img=40",
    type: "missed",
    time: "2025-10-28 21:05",
  },
  {
    id: 4,
    nameKey: "logan_pierce",
    avatar: "https://i.pravatar.cc/150?img=41",
    type: "outgoing",
    time: "2025-10-27 20:45",
    duration: "38:20",
  },
  {
    id: 5,
    nameKey: "austin_grey",
    avatar: "https://i.pravatar.cc/150?img=42",
    type: "incoming",
    time: "2025-10-27 19:20",
    duration: "27:10",
  },
  {
    id: 6,
    nameKey: "kyle_vance",
    avatar: "https://i.pravatar.cc/150?img=48",
    type: "missed",
    time: "2025-10-27 18:00",
  },
];

const TelegramPage = () => {
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
      type === t("dmtele.call_log.outgoing")
        ? "#0B5CFF"
        : type === t("dmtele.call_log.incoming")
        ? "#10B981"
        : "#EF4444";
    return (
      <Box sx={{ color: iconColor }}>
        {type === t("dmtele.call_log.outgoing") && (
          <FiPhoneCall style={{ fontSize: 16 }} />
        )}
        {type === t("dmtele.call_log.incoming") && (
          <FiPhoneIncoming style={{ fontSize: 16 }} />
        )}
        {type === t("dmtele.call_log.missed") && (
          <FiPhoneMissed style={{ fontSize: 16 }} />
        )}
      </Box>
    );
  };

  const groupFriendsByLetter = () => {
    const grouped = {};
    friends.forEach((f) => {
      const name = t(`dmtele.contacts.${f.nameKey}.name`);
      const letter = name[0].toUpperCase();
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
              {t("dmtele.header.title")}
              <SiTelegram className="text-[#229ED9]" />
            </h1>
          </div>
          <BindPhone />
        </div>
      </header>

      <Box
        sx={{
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
              aria-label={t("dmtele.tabs.aria_label")}
            >
              <Tab
                icon={<SiTelegram />}
                iconPosition="start"
                label={isMobile ? "" : t("dmtele.tabs.chat")}
                value="chat"
                aria-label={t("dmtele.tabs.chat_aria")}
              />
              <Tab
                icon={<FiUsers />}
                iconPosition="start"
                label={isMobile ? "" : t("dmtele.tabs.friends")}
                value="friends"
                aria-label={t("dmtele.tabs.friends_aria")}
              />
              <Tab
                icon={<FiPhone />}
                iconPosition="start"
                label={isMobile ? "" : t("dmtele.tabs.calls")}
                value="calls"
                aria-label={t("dmtele.tabs.calls_aria")}
              />
            </Tabs>
          )}

          {/* Back Button */}
          {showDetail && (
            <Box sx={{ mb: 2 }}>
              <IconButton
                onClick={handleBack}
                sx={{ color: "primary.main" }}
                aria-label={t("dmtele.back_button_aria")}
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
              aria-label={t(
                tab === "chat"
                  ? "dmtele.chat.list_aria"
                  : tab === "friends"
                  ? "dmtele.contacts.list_aria"
                  : "dmtele.call_log.list_aria"
              )}
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
                      role="button"
                      aria-label={t("dmtele.chat.item_aria", {
                        name: t(`dmtele.chats.${chat.nameKey}.name`),
                      })}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          src={chat.avatar}
                          sx={{ width: 48, height: 48 }}
                          alt={t(`dmtele.chats.${chat.nameKey}.name`)}
                        />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            sx={{ fontWeight: 600, color: "#1f2937" }}
                          >
                            {t(`dmtele.chats.${chat.nameKey}.name`)}
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
                            {t(`dmtele.chats.${chat.nameKey}.lastMessage`)}
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

              {/* Friends List */}
              {tab === "friends" && (
                <Stack>
                  {Object.keys(groupFriendsByLetter())
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
                        {groupFriendsByLetter()[letter].map((friend) => (
                          <Box
                            key={friend.id}
                            sx={{
                              p: 2,
                              cursor: "pointer",
                              "&:hover": { bgcolor: "rgba(0,0,0,0.02)" },
                              transition: "background 0.2s",
                            }}
                            onClick={() => setSelectedFriend(friend)}
                            role="button"
                            aria-label={t("dmtele.contacts.item_aria", {
                              name: t(`dmtele.contacts.${friend.nameKey}.name`),
                            })}
                          >
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                            >
                              <Avatar
                                src={friend.avatar}
                                sx={{ width: 48, height: 48 }}
                                alt={t(
                                  `dmtele.contacts.${friend.nameKey}.name`
                                )}
                              />
                              <Typography
                                sx={{ fontWeight: 500, color: "#1f2937" }}
                              >
                                {t(`dmtele.contacts.${friend.nameKey}.name`)}
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
                      role="button"
                      aria-label={t("dmtele.call_log.item_aria", {
                        name: t(`dmtele.call_log.${call.nameKey}.name`),
                      })}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{ position: "relative" }}>
                          <Avatar
                            src={call.avatar}
                            sx={{ width: 48, height: 48 }}
                            alt={t(`dmtele.call_log.${call.nameKey}.name`)}
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
                            {getCallIcon(t(`dmtele.call_log.${call.type}`))}
                          </Box>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            sx={{ fontWeight: 600, color: "#1f2937" }}
                          >
                            {t(`dmtele.call_log.${call.nameKey}.name`)}
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
                            {t(`dmtele.call_log.${call.type}`)}
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
                aria-label={t(
                  selectedChat
                    ? "dmtele.chat.detail_aria"
                    : selectedFriend
                    ? "dmtele.contacts.detail_aria"
                    : "dmtele.call_log.detail_aria",
                  {
                    name: selectedChat
                      ? t(`dmtele.chats.${selectedChat.nameKey}.name`)
                      : selectedFriend
                      ? t(`dmtele.contacts.${selectedFriend.nameKey}.name`)
                      : t(`dmtele.call_log.${selectedCall.nameKey}.name`),
                  }
                )}
              >
                {/* Chat Detail */}
                {selectedChat && (
                  <Stack spacing={3}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        src={selectedChat.avatar}
                        sx={{ width: 64, height: 64 }}
                        alt={t(`dmtele.chats.${selectedChat.nameKey}.name`)}
                      />
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, color: "#1f2937" }}
                      >
                        {t(`dmtele.chats.${selectedChat.nameKey}.name`)}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack spacing={2}>
                      {["msg1", "msg2", "msg3", "msg4", "msg5"].map(
                        (msgKey, i) =>
                          t(
                            `dmtele.chats.${selectedChat.nameKey}.messages.${msgKey}`,
                            { defaultValue: "" }
                          ) && (
                            <Box
                              key={i}
                              sx={{
                                display: "flex",
                                justifyContent:
                                  t(
                                    `dmtele.chats.${selectedChat.nameKey}.messages.${msgKey}_incoming`
                                  ) === "true"
                                    ? "flex-start"
                                    : "flex-end",
                              }}
                            >
                              <Box
                                sx={{
                                  maxWidth: "70%",
                                  bgcolor:
                                    t(
                                      `dmtele.chats.${selectedChat.nameKey}.messages.${msgKey}_incoming`
                                    ) === "true"
                                      ? "#f3f4f6"
                                      : "#229ED9",
                                  color:
                                    t(
                                      `dmtele.chats.${selectedChat.nameKey}.messages.${msgKey}_incoming`
                                    ) === "true"
                                      ? "#000"
                                      : "#fff",
                                  borderRadius: "18px",
                                  px: 3,
                                  py: 1.5,
                                  borderBottomLeftRadius:
                                    t(
                                      `dmtele.chats.${selectedChat.nameKey}.messages.${msgKey}_incoming`
                                    ) === "true"
                                      ? 0
                                      : "18px",
                                  borderBottomRightRadius:
                                    t(
                                      `dmtele.chats.${selectedChat.nameKey}.messages.${msgKey}_incoming`
                                    ) === "true"
                                      ? "18px"
                                      : 0,
                                }}
                              >
                                <Typography sx={{ fontSize: "0.875rem" }}>
                                  {t(
                                    `dmtele.chats.${selectedChat.nameKey}.messages.${msgKey}`
                                  )}
                                </Typography>
                                <Typography
                                  className="flex items-center gap-1"
                                  sx={{
                                    fontSize: "0.75rem",
                                    mt: 0.5,
                                    color:
                                      t(
                                        `dmtele.chats.${selectedChat.nameKey}.messages.${msgKey}_incoming`
                                      ) === "true"
                                        ? "#6b7280"
                                        : "rgba(255,255,255,0.8)",
                                  }}
                                >
                                  {selectedChat[`${msgKey}_time`]}
                                  {t(
                                    `dmtele.chats.${selectedChat.nameKey}.messages.${msgKey}_incoming`
                                  ) !== "true" && <RiCheckDoubleFill />}
                                </Typography>
                              </Box>
                            </Box>
                          )
                      )}
                    </Stack>
                  </Stack>
                )}

                {/* Friend Detail */}
                {selectedFriend && (
                  <Stack spacing={4} alignItems="center">
                    <Avatar
                      src={selectedFriend.avatar}
                      sx={{ width: 120, height: 120 }}
                      alt={t(`dmtele.contacts.${selectedFriend.nameKey}.name`)}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "#1f2937" }}
                    >
                      {t(`dmtele.contacts.${selectedFriend.nameKey}.name`)}
                    </Typography>

                    {selectedFriend.phone && (
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: "#DBEAFE",
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
                            bgcolor: "#229ED9",
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
                            {t("dmtele.contacts.phone_label")}
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 600, color: "#1f2937" }}
                          >
                            {selectedFriend.phone}
                          </Typography>
                        </Box>
                      </Paper>
                    )}

                    {selectedFriend.email && (
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: "#E0E7FF",
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
                            bgcolor: "#229ED9",
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
                            {t("dmtele.contacts.email_label")}
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 600, color: "#1f2937" }}
                          >
                            {selectedFriend.email}
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
                      alt={t(`dmtele.call_log.${selectedCall.nameKey}.name`)}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "#1f2937" }}
                    >
                      {t(`dmtele.call_log.${selectedCall.nameKey}.name`)}
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
                          {t(`dmtele.call_log.${selectedCall.type}`)}
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

export default TelegramPage;
