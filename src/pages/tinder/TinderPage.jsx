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
} from "react-icons/fi";
import { IoArrowBackCircle } from "react-icons/io5";
import BindPhone from "../../components/demo/BindPhone";
import { RiCheckDoubleFill } from "react-icons/ri";
import { SiTinder } from "react-icons/si";

// Tinder Light Mode Theme (Pink + Orange)
const theme = createTheme({
  palette: {
    primary: { main: "#FF5A5F", light: "#FF7A7F", dark: "#E0484D" },
    secondary: { main: "#FFFFFF" },
    success: { main: "#10B981" },
    error: { main: "#EF4444" },
    info: { main: "#0B5CFF" },
  },
  typography: { fontFamily: '"Montserrat", "Roboto", sans-serif' },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          color: "#6B7280",
          "&.Mui-selected": { color: "#FF5A5F" },
        },
      },
    },
  },
});

const matches = [
  {
    id: 1,
    name: "liam_cruz",
    avatar: "https://i.pravatar.cc/150?img=40",
    lastMessage: "dmtinder.matches.liam_cruz.lastMessage",
    time: "03:10",
    messages: [
      {
        text: "dmtinder.matches.liam_cruz.messages.message1.text",
        time: "03:00",
        incoming: true,
      },
      {
        text: "dmtinder.matches.liam_cruz.messages.message2.text",
        time: "03:01",
        incoming: false,
      },
      {
        text: "dmtinder.matches.liam_cruz.messages.message3.text",
        time: "03:10",
        incoming: false,
      },
    ],
  },
  {
    id: 2,
    name: "noah_reyes",
    avatar: "https://i.pravatar.cc/150?img=41",
    lastMessage: "dmtinder.matches.noah_reyes.lastMessage",
    time: "02:25",
    messages: [
      {
        text: "dmtinder.matches.noah_reyes.messages.message1.text",
        time: "02:10",
        incoming: true,
      },
      {
        text: "dmtinder.matches.noah_reyes.messages.message2.text",
        time: "02:11",
        incoming: false,
      },
      {
        text: "dmtinder.matches.noah_reyes.messages.message3.text",
        time: "02:25",
        incoming: false,
      },
    ],
  },
  {
    id: 12,
    name: "ethan_park",
    avatar: "https://i.pravatar.cc/150?img=51",
    lastMessage: "dmtinder.matches.ethan_park.lastMessage",
    time: "23:00",
    messages: [
      {
        text: "dmtinder.matches.ethan_park.messages.message1.text",
        time: "22:45",
        incoming: true,
      },
      {
        text: "dmtinder.matches.ethan_park.messages.message2.text",
        time: "22:46",
        incoming: false,
      },
      {
        text: "dmtinder.matches.ethan_park.messages.message3.text",
        time: "22:47",
        incoming: true,
      },
      {
        text: "dmtinder.matches.ethan_park.messages.message4.text",
        time: "23:00",
        incoming: false,
      },
    ],
  },
];

const callLogs = [
  {
    id: 1,
    name: "liam_cruz",
    avatar: "https://i.pravatar.cc/150?img=40",
    type: "outgoing",
    time: "2025-10-28 23:55",
    duration: "19:20",
  },
  {
    id: 2,
    name: "noah_reyes",
    avatar: "https://i.pravatar.cc/150?img=41",
    type: "incoming",
    time: "2025-10-28 22:30",
    duration: "14:10",
  },
  {
    id: 3,
    name: "ethan_park",
    avatar: "https://i.pravatar.cc/150?img=51",
    type: "missed",
    time: "2025-10-28 21:15",
  },
];

const TinderPage = () => {
  const { t } = useTranslation();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const [tab, setTab] = useState("chat");
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedCall, setSelectedCall] = useState(null);

  const handleBack = () => {
    setSelectedChat(null);
    setSelectedCall(null);
  };

  const getCallIcon = (type) => {
    const color =
      type === "incoming"
        ? "#10B981"
        : type === "outgoing"
        ? "#0B5CFF"
        : "#EF4444";
    return (
      <Box sx={{ color }}>
        {type === "outgoing" ? (
          <FiPhoneCall />
        ) : type === "incoming" ? (
          <FiPhoneIncoming />
        ) : (
          <FiPhoneMissed />
        )}
      </Box>
    );
  };

  const showDetail = selectedChat || selectedCall;

  return (
    <ThemeProvider theme={theme}>
      <header className="!mb-4 sm:!mb-6 !px-4">
        <div className="flex lg:flex-row flex-col gap-2 justify-between">
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            {t("dmtinder.header.title")} <SiTinder className="text-[#FF5A5F]" />
          </h1>
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
          {!showDetail && (
            <Tabs
              value={tab}
              onChange={(e, v) => setTab(v)}
              sx={{ mb: 3, "& .MuiTabs-indicator": { bgcolor: "#FF5A5F" } }}
              aria-label={t("dmtinder.tabs.aria_label")}
            >
              <Tab
                icon={<SiTinder />}
                label={isMobile ? "" : t("dmtinder.tabs.chat")}
                value="chat"
                aria-label={t("dmtinder.tabs.chat_aria")}
              />
              <Tab
                icon={<FiPhone />}
                label={isMobile ? "" : t("dmtinder.tabs.calls")}
                value="calls"
                aria-label={t("dmtinder.tabs.calls_aria")}
              />
            </Tabs>
          )}
          {showDetail && (
            <Box sx={{ mb: 2 }}>
              <IconButton
                onClick={handleBack}
                sx={{ color: "#FF5A5F" }}
                aria-label={t("dmtinder.back_button_aria")}
              >
                <IoArrowBackCircle className="!text-[25px]" />
              </IconButton>
            </Box>
          )}

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
            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                display: showDetail && isMobile ? "none" : "block",
                maxHeight: "80vh",
                overflowY: "auto",
                bgcolor: "white",
                "&::-webkit-scrollbar": { display: "none" },
              }}
              className="scrollbar-hide"
            >
              {tab === "chat" && (
                <Stack aria-label={t("dmtinder.chat.list_aria")}>
                  {matches.map((m) => (
                    <Box
                      key={m.id}
                      sx={{
                        p: 2,
                        cursor: "pointer",
                        "&:hover": { bgcolor: "#fdf2f2" },
                      }}
                      onClick={() => setSelectedChat(m)}
                      aria-label={t("dmtinder.chat.item_aria", {
                        name: t(`dmtinder.matches.${m.name}.name`),
                      })}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar src={m.avatar} sx={{ width: 48, height: 48 }} />
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            sx={{ fontWeight: 600, color: "#1f2937" }}
                          >
                            {t(`dmtinder.matches.${m.name}.name`)}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.875rem", color: "#6b7280" }}
                          >
                            {t(m.lastMessage)}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{ fontSize: "0.75rem", color: "#9ca3af" }}
                        >
                          {m.time}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              )}
              {tab === "calls" && (
                <Stack aria-label={t("dmtinder.call_log.list_aria")}>
                  {callLogs.map((c) => (
                    <Box
                      key={c.id}
                      sx={{
                        p: 2,
                        cursor: "pointer",
                        "&:hover": { bgcolor: "#fdf2f2" },
                      }}
                      onClick={() => setSelectedCall(c)}
                      aria-label={t("dmtinder.call_log.item_aria", {
                        name: t(`dmtinder.call_logs.${c.name}.name`),
                      })}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{ position: "relative" }}>
                          <Avatar
                            src={c.avatar}
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
                              boxShadow: "0 0 0 2px white",
                            }}
                          >
                            {getCallIcon(c.type)}
                          </Box>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            sx={{ fontWeight: 600, color: "#1f2937" }}
                          >
                            {t(`dmtinder.call_logs.${c.name}.name`)}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.875rem",
                              color:
                                c.type === "incoming"
                                  ? "#10B981"
                                  : c.type === "outgoing"
                                  ? "#0B5CFF"
                                  : "#EF4444",
                            }}
                          >
                            {t(`dmtinder.call_log.types.${c.type}`)}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{ fontSize: "0.75rem", color: "#9ca3af" }}
                        >
                          {c.time.split(" ")[1].slice(0, 5)}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              )}
            </Paper>

            {showDetail && (
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 4,
                  p: 4,
                  maxHeight: "80vh",
                  overflowY: "auto",
                  bgcolor: "white",
                }}
              >
                {selectedChat && (
                  <Stack
                    spacing={3}
                    aria-label={t("dmtinder.chat.detail_aria", {
                      name: t(`dmtinder.matches.${selectedChat.name}.name`),
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
                        {t(`dmtinder.matches.${selectedChat.name}.name`)}
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
                              bgcolor: msg.incoming ? "#f3f4f6" : "#FF5A5F",
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
                              {t(msg.text)}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "0.75rem",
                                mt: 0.5,
                                color: msg.incoming
                                  ? "#6b7280"
                                  : "rgba(255,255,255,0.8)",
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
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
                {selectedCall && (
                  <Stack
                    spacing={4}
                    alignItems="center"
                    aria-label={t("dmtinder.call_log.detail_aria", {
                      name: t(`dmtinder.call_logs.${selectedCall.name}.name`),
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
                      {t(`dmtinder.call_logs.${selectedCall.name}.name`)}
                    </Typography>
                    <Paper
                      elevation={0}
                      sx={{
                        bgcolor: "#fdf2f2",
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
                          {t(`dmtinder.call_log.types.${selectedCall.type}`)}
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

export default TinderPage;
