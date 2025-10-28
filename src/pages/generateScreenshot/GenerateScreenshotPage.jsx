import React, { useState, useRef } from "react";
import { FiPlus, FiTrash2, FiDownload, FiMessageSquare } from "react-icons/fi";
import html2canvas from "html2canvas";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import whatsappBg from "../../assets/whatsapp-bg.jpeg";

// App Templates
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
    hasBackground: true,
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

// Create MUI theme with primary color #0695c8
const theme = createTheme({
  palette: {
    primary: {
      main: "#0695c8",
      light: "#3aabdb",
      dark: "#04698a",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(6, 149, 200, 0.25)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 10px 40px -10px rgba(6, 149, 200, 0.2)",
          borderRadius: 16,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#0695c8",
            },
          },
        },
      },
    },
  },
});

const Index = () => {
  const previewRef = useRef(null);
  const [selectedApp, setSelectedApp] = useState("whatsapp");
  const app = appTemplates[selectedApp];

  const [sender, setSender] = useState("Alex");
  const [recipient, setRecipient] = useState("Jordan");
  const [messages, setMessages] = useState([
    { text: "Hey, you up?", time: new Date(), sender: false },
    { text: "Yeah, can't sleep", time: new Date(), sender: true },
  ]);

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
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #f5f5f5 0%, #e8f4f8 50%, #f5f5f5 100%)",
          py: 4,
          px: 2,
        }}
      >
        <Box sx={{ maxWidth: 1400, mx: "auto" }}>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 3,
                  bgcolor: "rgba(6, 149, 200, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FiMessageSquare
                  style={{ width: 32, height: 32, color: "#0695c8" }}
                />
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    background:
                      "linear-gradient(135deg, #0695c8 0%, #3aabdb 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Screenshot Generator
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  Create realistic chat screenshots for any messaging app
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
              gap: 4,
            }}
          >
            {/* Left: Controls */}
            <Card elevation={3}>
              <CardHeader
                sx={{
                  background:
                    "linear-gradient(135deg, #0695c8 0%, #3aabdb 100%)",
                  color: "white",
                  pb: 2,
                }}
                title={
                  <Typography variant="h6" fontWeight={700}>
                    Customize Your Screenshot
                  </Typography>
                }
                subheader={
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.85)", mt: 0.5 }}
                  >
                    Configure messages and preview in real-time
                  </Typography>
                }
              />
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {/* App Selection */}
                  <FormControl fullWidth>
                    <InputLabel>Select App</InputLabel>
                    <Select
                      value={selectedApp}
                      label="Select App"
                      onChange={(e) => setSelectedApp(e.target.value)}
                      sx={{ height: 56 }}
                    >
                      {Object.entries(appTemplates).map(([key, val]) => (
                        <MenuItem key={key} value={key}>
                          {val.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Names/Emails */}
                  {!app.isEmail && (
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 2,
                      }}
                    >
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
                    </Box>
                  )}

                  {app.isEmail && (
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
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
                    </Box>
                  )}

                  <Divider />

                  {/* Messages */}
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Typography variant="h6" fontWeight={600}>
                        {app.isEmail ? "Email Body" : "Messages"}
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<FiPlus />}
                        onClick={addMessage}
                        sx={{ textTransform: "none" }}
                      >
                        Add {app.isEmail ? "Paragraph" : "Message"}
                      </Button>
                    </Box>

                    <Box
                      sx={{ maxHeight: 400, overflowY: "auto", pr: 1 }}
                      className="scrollbar-custom"
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        {messages.map((msg, i) => (
                          <Card
                            key={i}
                            variant="outlined"
                            sx={{
                              transition: "all 0.2s",
                              "&:hover": {
                                borderColor: "primary.main",
                                boxShadow: "0 2px 8px rgba(6, 149, 200, 0.15)",
                              },
                            }}
                          >
                            <CardContent
                              sx={{ p: 2, "&:last-child": { pb: 2 } }}
                            >
                              <Box sx={{ display: "flex", gap: 1 }}>
                                <TextField
                                  multiline
                                  minRows={2}
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
                                  fullWidth
                                  size="small"
                                />
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                  }}
                                >
                                  {!app.isEmail && (
                                    <Button
                                      variant={
                                        msg.sender ? "contained" : "outlined"
                                      }
                                      size="small"
                                      onClick={() =>
                                        updateMessage(i, "sender", !msg.sender)
                                      }
                                      sx={{
                                        minWidth: 60,
                                        backgroundColor: msg.sender
                                          ? app.primary
                                          : undefined,
                                        "&:hover": {
                                          backgroundColor: msg.sender
                                            ? app.primary
                                            : undefined,
                                        },
                                      }}
                                    >
                                      {msg.sender ? "You" : "Other"}
                                    </Button>
                                  )}
                                  <IconButton
                                    color="error"
                                    size="small"
                                    onClick={() => deleteMessage(i)}
                                  >
                                    <FiTrash2 />
                                  </IconButton>
                                </Box>
                              </Box>
                              {msg.text && (
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  sx={{
                                    display: "block",
                                    textAlign: "right",
                                    mt: 1,
                                  }}
                                >
                                  {formatTime(msg.time)}
                                </Typography>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </Box>
                    </Box>
                  </Box>

                  {/* Download Button */}
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    startIcon={<FiDownload />}
                    onClick={downloadScreenshot}
                    sx={{
                      height: 56,
                      fontSize: "1.1rem",
                      background:
                        "linear-gradient(135deg, #0695c8 0%, #3aabdb 100%)",
                      boxShadow: "0 4px 16px rgba(6, 149, 200, 0.3)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #04698a 0%, #0695c8 100%)",
                        boxShadow: "0 6px 20px rgba(6, 149, 200, 0.4)",
                      },
                    }}
                  >
                    Download PNG
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Right: Live Preview */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                position: { lg: "sticky" },
                top: { lg: 32 },
              }}
            >
              <Box
                ref={previewRef}
                sx={{
                  width: 380,
                  height: 720,
                  borderRadius: "2.5rem",
                  overflow: "hidden",
                  boxShadow: "0 20px 60px -15px rgba(0,0,0,0.3)",
                  bgcolor: app.bg,
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    height: 60,
                    display: "flex",
                    alignItems: "center",
                    px: 2,
                    fontWeight: 600,
                    bgcolor: app.header,
                    color: app.headerText,
                    borderBottom: app.isEmail ? "1px solid #ddd" : "none",
                  }}
                >
                  {app.isEmail ? (
                    <Box sx={{ width: "100%" }}>
                      <Typography sx={{ fontSize: "0.9rem", fontWeight: 600 }}>
                        {sender}
                      </Typography>
                      <Typography sx={{ fontSize: "0.75rem", opacity: 0.8 }}>
                        to {recipient}
                      </Typography>
                    </Box>
                  ) : (
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          bgcolor: "rgba(255,255,255,0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {recipient[0]?.toUpperCase()}
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: "1rem" }}>
                          {recipient}
                        </Typography>
                        <Typography sx={{ fontSize: "0.75rem", opacity: 0.8 }}>
                          online
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>

                {/* Messages Area */}
                <Box
                  sx={{
                    height: 600,
                    p: 2,
                    overflowY: "auto",
                    bgcolor: app.bg,
                    backgroundImage: app.hasBackground
                      ? `url(${whatsappBg})`
                      : undefined,
                    backgroundSize: app.hasBackground ? "cover" : undefined,
                    backgroundPosition: app.hasBackground
                      ? "center"
                      : undefined,
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
                      height: 60,
                      display: "flex",
                      alignItems: "center",
                      px: 2,
                      borderTop: "1px solid rgba(0,0,0,0.1)",
                      bgcolor: app.bg === "#36393f" ? "#292b2f" : "#f8f9fa",
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
    </ThemeProvider>
  );
};

export default Index;
