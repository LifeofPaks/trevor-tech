import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  IconButton,
  Paper,
  Divider,
  useTheme,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { FiPlus, FiTrash2, FiDownload } from "react-icons/fi";
import html2canvas from "html2canvas";

// === App Templates (All Apps + iMessage + Email) ===
const appTemplates = {
  viber: {
    name: "Viber",
    primary: "#7B68EE",
    bg: "#f8f9fa",
    bubble: { sent: "#7B68EE", received: "#e9ecef" },
    text: { sent: "#fff", received: "#000" },
    header: "#7B68EE",
    headerText: "#fff",
  },
  telegram: {
    name: "Telegram",
    primary: "#229ED9",
    bg: "#f0f2f5",
    bubble: { sent: "#229ED9", received: "#ffffff" },
    text: { sent: "#fff", received: "#000" },
    header: "#229ED9",
    headerText: "#fff",
  },
  whatsapp: {
    name: "WhatsApp",
    primary: "#25D366",
    bg: "#ece5dd",
    bubble: { sent: "#dcf8c6", received: "#ffffff" },
    text: { sent: "#000", received: "#000" },
    header: "#075e54",
    headerText: "#fff",
  },
  discord: {
    name: "Discord",
    primary: "#5865F2",
    bg: "#36393f",
    bubble: { sent: "#5865F2", received: "#2f3136" },
    text: { sent: "#fff", received: "#dcddde" },
    header: "#2c2f33",
    headerText: "#fff",
  },
  imo: {
    name: "imo",
    primary: "#00D084",
    bg: "#fafafa",
    bubble: { sent: "#00D084", received: "#f3f4f6" },
    text: { sent: "#fff", received: "#000" },
    header: "#00D084",
    headerText: "#fff",
  },
  badoo: {
    name: "Badoo",
    primary: "#9C27B0",
    bg: "#fafafa",
    bubble: { sent: "#9C27B0", received: "#f3f4f6" },
    text: { sent: "#fff", received: "#000" },
    header: "#9C27B0",
    headerText: "#fff",
  },
  wechat: {
    name: "WeChat",
    primary: "#07C160",
    bg: "#fafafa",
    bubble: { sent: "#07C160", received: "#f3f4f6" },
    text: { sent: "#fff", received: "#000" },
    header: "#07C160",
    headerText: "#fff",
  },
  imessage: {
    name: "iMessage",
    primary: "#007AFF",
    bg: "#f2f2f7",
    bubble: { sent: "#007AFF", received: "#e5e5ea" },
    text: { sent: "#fff", received: "#000" },
    header: "#f2f2f7",
    headerText: "#000",
    showTail: true,
  },
  email: {
    name: "Email",
    primary: "#1a73e8",
    bg: "#ffffff",
    bubble: { sent: "#e8f0fe", received: "#f5f5f5" },
    text: { sent: "#1a73e8", received: "#000" },
    header: "#ffffff",
    headerText: "#000",
    isEmail: true,
  },
};

const GenerateScreenshotPage = () => {
  const previewRef = useRef(null);
  const [selectedApp, setSelectedApp] = useState("whatsapp");
  const app = appTemplates[selectedApp];

  const [sender, setSender] = useState("Alex");
  const [recipient, setRecipient] = useState("Jordan");
  const [messages, setMessages] = useState([
    { text: "Hey, you up?", time: new Date(), sender: false },
    { text: "Yeah, can't sleep", time: new Date(), sender: true },
  ]);

  // Auto-format time (HH:MM) without date-fns
  const formatTime = (date) => {
    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    return `${h}:${m}`;
  };

  const addMessage = () => {
    setMessages([...messages, { text: "", time: new Date(), sender: true }]);
  };

  const updateMessage = (index, field, value) => {
    const updated = [...messages];
    updated[index][field] = value;
    if (field === "text" && value) updated[index].time = new Date();
    setMessages(updated);
  };

  const deleteMessage = (index) => {
    setMessages(messages.filter((_, i) => i !== index));
  };

  const downloadScreenshot = async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, {
      scale: 2,
      backgroundColor: app.bg,
      logging: false,
    });
    const link = document.createElement("a");
    link.download = `${app.name}-screenshot.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <ThemeProvider theme={createTheme({ palette: { mode: "light" } })}>
      <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", p: 3 }}>
        <Box sx={{ maxWidth: 1600, mx: "auto" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, mb: 3, color: "#1f2937" }}
          >
            Generate Screenshot
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
              gap: 4,
            }}
          >
            {/* Left: Controls */}
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Stack spacing={3}>
                <FormControl fullWidth>
                  <InputLabel>App</InputLabel>
                  <Select
                    value={selectedApp}
                    label="App"
                    onChange={(e) => setSelectedApp(e.target.value)}
                  >
                    {Object.entries(appTemplates).map(([key, val]) => (
                      <MenuItem key={key} value={key}>
                        {val.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {!app.isEmail && (
                  <>
                    <TextField
                      label="Your Name"
                      value={sender}
                      onChange={(e) => setSender(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="Recipient Name"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      fullWidth
                    />
                  </>
                )}

                {app.isEmail && (
                  <>
                    <TextField
                      label="From (Email)"
                      value={sender}
                      onChange={(e) => setSender(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="To (Email)"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="Subject"
                      defaultValue="Hey, check this out"
                      fullWidth
                    />
                  </>
                )}

                <Divider />

                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {app.isEmail ? "Email Body" : "Messages"}
                </Typography>

                <Stack spacing={2} sx={{ maxHeight: 500, overflowY: "auto" }}>
                  {messages.map((msg, i) => (
                    <Paper
                      key={i}
                      variant="outlined"
                      sx={{ p: 2, bgcolor: "#fafafa" }}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <TextField
                          fullWidth
                          multiline
                          minRows={1}
                          maxRows={4}
                          value={msg.text}
                          onChange={(e) =>
                            updateMessage(i, "text", e.target.value)
                          }
                          placeholder={
                            app.isEmail
                              ? "Type email content..."
                              : "Type message..."
                          }
                          sx={{ "& .MuiOutlinedInput-root": { pr: 0 } }}
                        />
                        {!app.isEmail && (
                          <IconButton
                            size="small"
                            onClick={() =>
                              updateMessage(i, "sender", !msg.sender)
                            }
                            sx={{ color: msg.sender ? app.primary : "#666" }}
                          >
                            {msg.sender ? "You" : "Other"}
                          </IconButton>
                        )}
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => deleteMessage(i)}
                        >
                          <FiTrash2 />
                        </IconButton>
                      </Stack>
                      {msg.text && (
                        <Typography
                          sx={{
                            fontSize: "0.75rem",
                            color: "#888",
                            mt: 0.5,
                            textAlign: "right",
                          }}
                        >
                          {formatTime(msg.time)}
                        </Typography>
                      )}
                    </Paper>
                  ))}
                </Stack>

                <Button
                  variant="outlined"
                  startIcon={<FiPlus />}
                  onClick={addMessage}
                  fullWidth
                >
                  Add {app.isEmail ? "Paragraph" : "Message"}
                </Button>

                <Button
                  variant="contained"
                  startIcon={<FiDownload />}
                  onClick={downloadScreenshot}
                  fullWidth
                  sx={{
                    bgcolor: app.primary,
                    "&:hover": { bgcolor: app.primary },
                  }}
                >
                  Download PNG
                </Button>
              </Stack>
            </Paper>

            {/* Right: Live Preview (No Frame) */}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box
                ref={previewRef}
                sx={{
                  width: 380,
                  height: 720,
                  bgcolor: app.bg,
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  fontFamily: '"Montserrat", "Helvetica", sans-serif',
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    height: 60,
                    bgcolor: app.header,
                    color: app.headerText,
                    display: "flex",
                    alignItems: "center",
                    px: 3,
                    fontWeight: 600,
                    borderBottom: app.isEmail ? "1px solid #ddd" : "none",
                  }}
                >
                  {app.isEmail ? (
                    <Stack sx={{ width: "100%" }}>
                      <Typography sx={{ fontSize: "0.9rem", fontWeight: 600 }}>
                        {sender}
                      </Typography>
                      <Typography sx={{ fontSize: "0.75rem", opacity: 0.8 }}>
                        to {recipient}
                      </Typography>
                    </Stack>
                  ) : (
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          bgcolor: "rgba(255,255,255,0.3)",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {recipient[0].toUpperCase()}
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: "1rem" }}>
                          {recipient}
                        </Typography>
                        <Typography sx={{ fontSize: "0.75rem", opacity: 0.8 }}>
                          online
                        </Typography>
                      </Box>
                    </Stack>
                  )}
                </Box>

                {/* Messages / Email Body */}
                <Box
                  sx={{
                    flex: 1,
                    p: app.isEmail ? 3 : 2,
                    overflowY: "auto",
                    "&::-webkit-scrollbar": { display: "none" },
                    scrollbarWidth: "none",
                  }}
                >
                  {app.isEmail ? (
                    <Box sx={{ color: "#000", lineHeight: 1.6 }}>
                      {messages
                        .filter((m) => m.text)
                        .map((msg, i) => (
                          <Typography
                            key={i}
                            sx={{ mb: 2, fontSize: "0.95rem" }}
                          >
                            {msg.text}
                          </Typography>
                        ))}
                    </Box>
                  ) : (
                    messages
                      .filter((m) => m.text)
                      .map((msg, i) => (
                        <Box
                          key={i}
                          sx={{
                            display: "flex",
                            justifyContent: msg.sender
                              ? "flex-end"
                              : "flex-start",
                            mb: 1.5,
                          }}
                        >
                          <Box
                            sx={{
                              maxWidth: "75%",
                              bgcolor: msg.sender
                                ? app.bubble.sent
                                : app.bubble.received,
                              color: msg.sender
                                ? app.text.sent
                                : app.text.received,
                              borderRadius: "18px",
                              px: 2.5,
                              py: 1.2,
                              position: "relative",
                              ...(app.showTail && {
                                "&:after": {
                                  content: '""',
                                  position: "absolute",
                                  bottom: 0,
                                  [msg.sender ? "right" : "left"]: -6,
                                  width: 0,
                                  height: 0,
                                  border: "6px solid transparent",
                                  borderTopColor: msg.sender
                                    ? app.bubble.sent
                                    : app.bubble.received,
                                  borderBottom: 0,
                                  borderLeft: msg.sender
                                    ? 0
                                    : "6px solid transparent",
                                  borderRight: msg.sender
                                    ? "6px solid transparent"
                                    : 0,
                                },
                              }),
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "0.925rem",
                                wordBreak: "break-word",
                              }}
                            >
                              {msg.text}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "0.65rem",
                                mt: 0.5,
                                opacity: 0.7,
                                textAlign: "right",
                              }}
                            >
                              {formatTime(msg.time)}
                            </Typography>
                          </Box>
                        </Box>
                      ))
                  )}
                </Box>

                {/* Input Bar */}
                {!app.isEmail && (
                  <Box
                    sx={{
                      height: 56,
                      bgcolor: app.bg === "#36393f" ? "#292b2f" : "#f8f9fa",
                      borderTop: "1px solid rgba(0,0,0,0.1)",
                      display: "flex",
                      alignItems: "center",
                      px: 2,
                    }}
                  >
                    <Box
                      sx={{
                        flex: 1,
                        bgcolor: "#fff",
                        borderRadius: "25px",
                        height: 40,
                        px: 2,
                        display: "flex",
                        alignItems: "center",
                        color: "#888",
                        fontSize: "0.9rem",
                      }}
                    >
                      Type a message...
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Hide Scrollbar */}
      <style jsx>{`
        * {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        *::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </ThemeProvider>
  );
};

export default GenerateScreenshotPage;
