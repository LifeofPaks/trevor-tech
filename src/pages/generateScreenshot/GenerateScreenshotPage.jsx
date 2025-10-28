import React, { useState, useRef } from "react";
import {
  FiPlus,
  FiTrash2,
  FiDownload,
  FiMessageSquare,
  FiZap,
} from "react-icons/fi";
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
import { motion, AnimatePresence } from "framer-motion";

// === App Templates ===
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

// === Cyber Theme ===
const cyberTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00ffff" },
    background: { default: "#0a0a1f", paper: "rgba(20, 20, 40)" },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(0, 255, 255)",
          borderRadius: 16,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            background: "rgba(255,255,255,0.05)",
          },
        },
      },
    },
  },
});

// === Floating Particles ===
const Particles = () => (
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      pointerEvents: "none",
    }}
  >
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ x: Math.random() * 100 + "%", y: -50 }}
        animate={{ y: "120vh" }}
        transition={{
          duration: 12 + Math.random() * 8,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 5,
        }}
        style={{
          position: "absolute",
          width: 3,
          height: 3,
          borderRadius: "50%",
          background: "linear-gradient(45deg, #00ffff, #ff00ff)",
          filter: "blur(1.5px)",
          left: `${Math.random() * 100}%`,
        }}
      />
    ))}
  </Box>
);

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

  const addMessage = () =>
    setMessages([...messages, { text: "", time: new Date(), sender: true }]);
  const updateMessage = (i, field, value) => {
    const updated = [...messages];
    updated[i][field] = value;
    if (field === "text" && value) updated[i].time = new Date();
    setMessages(updated);
  };
  const deleteMessage = (i) =>
    setMessages(messages.filter((_, idx) => idx !== i));

  const downloadScreenshot = async () => {
    if (!previewRef.current) return;
    const { default: html2canvas } = await import("html2canvas");
    const canvas = await html2canvas(previewRef.current, {
      scale: 2,
      backgroundColor: app.bg,
      useCORS: true,
    });
    const link = document.createElement("a");
    link.download = `${app.name}-screenshot.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <ThemeProvider theme={cyberTheme}>
      <Box
      className="!p-4 md:!p-8 lg:!p-12"
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0a0a1f 0%, #1a0033 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Particles />

        <Box
          sx={{ maxWidth: 1600, mx: "auto", position: "relative", zIndex: 10 }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 5 }} className="flex-col md:flex-row !py-4">
              <Box
                sx={{
                  p: 2,
                  borderRadius: 4,
                  bgcolor: "rgba(0, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 0 30px rgba(0,255,255,0.4)",
                }}
              >
                <FiMessageSquare
                  style={{ width: 40, height: 40, color: "#00ffff" }}
                />
              </Box>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 900,
                    background: "linear-gradient(90deg, #00ffff, #ff00ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Cyber Screenshot Lab
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "rgba(255,255,255,0.7)", mt: 1 }}
                >
                  Forge hyper-realistic chat screenshots in real-time
                </Typography>
              </Box>
            </Box>
          </motion.div>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
              gap: 5,
            }}
          >
            {/* Left: Controls */}
            <motion.div
              whileHover={{ scale: 1.005 }}
              style={{ perspective: 1000 }}
            >
              <Card
                sx={{
                  background: "rgba(15, 15, 35, 0.8)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(0,255,255,0.3)",
                  boxShadow: "0 0 40px rgba(0,255,255,0.3)",
                }}
              >
                <CardHeader
                  sx={{
                    background:
                      "linear-gradient(135deg, #1a1a3d 0%, #2a1a5d 100%)",
                    color: "#fff",
                    pb: 3,
                  }}
                  title={
                    <Typography
                      variant="h5"
                      fontWeight={800}
                      sx={{ textShadow: "0 0 15px rgba(0,255,255,0.8)" }}
                    >
                      Customize
                    </Typography>
                  }
                  subheader={
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.8)",
                        fontStyle: "italic",
                        fontSize: "0.75rem",
                      }}
                    >
                      Live • Animated • Ultra-Real
                    </Typography>
                  }
                />
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}
                  >
                    {/* App Selector */}
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <FormControl fullWidth>
                        <InputLabel sx={{ color: "#00ffff", fontWeight: 600 }}>
                          App
                        </InputLabel>
                        <Select
                          value={selectedApp}
                          label="App"
                          onChange={(e) => setSelectedApp(e.target.value)}
                          sx={{
                            height: 60,
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#00ffff",
                              borderWidth: 2,
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#ff00ff",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#ff00ff",
                              boxShadow: "0 0 15px rgba(255,0,255,0.5)",
                            },
                          }}
                        >
                          {Object.entries(appTemplates).map(([k, v]) => (
                            <MenuItem
                              key={k}
                              value={k}
                              sx={{
                                color: "#fff",
                                bgcolor: " rgb(21, 18, 45)",
                              }}
                            >
                              {v.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </motion.div>

                    {/* Names */}
                    {!app.isEmail ? (
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 2,
                        }}
                      >
                        {[
                          { l: "You", v: sender, s: setSender },
                          { l: "Recipient", v: recipient, s: setRecipient },
                        ].map((f, i) => (
                          <motion.div key={i} whileHover={{ y: -3 }}>
                            <TextField
                              label={f.l}
                              value={f.v}
                              onChange={(e) => f.s(e.target.value)}
                              fullWidth
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  background: "rgba(255,255,255,0.05)",
                                  borderRadius: 3,
                                },
                                "&:hover .MuiOutlinedInput-root": {
                                  borderColor: "#00ffff",
                                },
                                "&.Mui-focused .MuiOutlinedInput-root": {
                                  borderColor: "#ff00ff",
                                  boxShadow: "0 0 12px rgba(255,0,255,0.4)",
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                  color: "#ff00ff",
                                },
                              }}
                            />
                          </motion.div>
                        ))}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          gap: 2,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {[
                          { l: "From", v: sender, s: setSender },
                          { l: "To", v: recipient, s: setRecipient },
                          {
                            l: "Subject",
                            v: "Hey, check this out",
                            s: () => {},
                          },
                        ].map((f, i) => (
                          <motion.div key={i} whileHover={{ y: -3 }}>
                            <TextField
                              label={f.l}
                              value={f.v}
                              onChange={(e) => f.s(e.target.value)}
                              fullWidth
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  background: "rgba(255,255,255,0.05)",
                                  borderRadius: 3,
                                },
                                "&:hover .MuiOutlinedInput-root": {
                                  borderColor: "#00ffff",
                                },
                                "&.Mui-focused .MuiOutlinedInput-root": {
                                  borderColor: "#ff00ff",
                                  boxShadow: "0 0 12px rgba(255,0,255,0.4)",
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                  color: "#ff00ff",
                                },
                              }}
                            />
                          </motion.div>
                        ))}
                      </Box>
                    )}

                    <Divider sx={{ borderColor: "rgba(0,255,255,0.3)" }} />

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
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#00ffff",
                            textShadow: "0 0 10px rgba(0,255,255,0.6)",
                            fontWeight: 700,
                          }}
                        >
                          {app.isEmail ? "Email Body" : "Messages"}
                        </Typography>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<FiPlus />}
                            onClick={addMessage}
                            sx={{
                              borderColor: "#00ffff",
                              color: "#00ffff",
                              fontWeight: 600,
                              "&:hover": {
                                borderColor: "#ff00ff",
                                color: "#ff00ff",
                                background: "rgba(255,0,255,0.1)",
                              },
                            }}
                          >
                            Add {app.isEmail ? "Paragraph" : "Message"}
                          </Button>
                        </motion.div>
                      </Box>

                      <Box
                        sx={{ maxHeight: 420, overflowY: "auto", pr: 1 }}
                        className="scrollbar-custom"
                      >
                        <AnimatePresence>
                          {messages.map((msg, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -60, scale: 0.9 }}
                              animate={{ opacity: 1, x: 0, scale: 1 }}
                              exit={{ opacity: 0, x: 60, scale: 0.9 }}
                              transition={{ duration: 0.3 }}
                              whileHover={{
                                y: -5,
                                boxShadow: "0 10px 25px rgba(0,255,255,0.2)",
                              }}
                            >
                              <Card
                                sx={{
                                  mb: 2,
                                  background: "rgba(30,30,60,0.6)",
                                  border: "1px solid rgba(0,255,255,0.2)",
                                  borderRadius: 3,
                                }}
                              >
                                <CardContent sx={{ p: 2.5 }}>
                                  <Box sx={{ display: "flex", gap: 1.5 }}>
                                    <TextField
                                      multiline
                                      minRows={2}
                                      maxRows={5}
                                      value={msg.text}
                                      onChange={(e) =>
                                        updateMessage(i, "text", e.target.value)
                                      }
                                      placeholder={
                                        app.isEmail ? "Type..." : "Message..."
                                      }
                                      fullWidth
                                      size="small"
                                      sx={{
                                        "& .MuiOutlinedInput-root": {
                                          background: "rgba(255,255,255,0.05)",
                                        },
                                      }}
                                    />
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 1,
                                      }}
                                    >
                                      {!app.isEmail && (
                                        <motion.div whileHover={{ scale: 1.1 }}>
                                          <Button
                                            variant={
                                              msg.sender
                                                ? "contained"
                                                : "outlined"
                                            }
                                            size="small"
                                            onClick={() =>
                                              updateMessage(
                                                i,
                                                "sender",
                                                !msg.sender
                                              )
                                            }
                                            sx={{
                                              minWidth: 68,
                                              background: msg.sender
                                                ? "linear-gradient(45deg, #ff00ff, #00ffff)"
                                                : "transparent",
                                              borderColor: msg.sender
                                                ? "transparent"
                                                : "#00ffff",
                                              color: msg.sender
                                                ? "#fff"
                                                : "#00ffff",
                                              "&:hover": {
                                                background: msg.sender
                                                  ? "linear-gradient(45deg, #ff00ff, #00ffff)"
                                                  : "rgba(0,255,255,0.1)",
                                              },
                                            }}
                                          >
                                            {msg.sender ? "You" : "Other"}
                                          </Button>
                                        </motion.div>
                                      )}
                                      <motion.div
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                      >
                                        <IconButton
                                          color="error"
                                          size="small"
                                          onClick={() => deleteMessage(i)}
                                        >
                                          <FiTrash2 />
                                        </IconButton>
                                      </motion.div>
                                    </Box>
                                  </Box>
                                  {msg.text && (
                                    <Typography
                                      sx={{
                                        display: "block",
                                        textAlign: "right",
                                        mt: 1,
                                        color: "#00ffff",
                                        fontFamily: "monospace",
                                        fontSize: "0.75rem",
                                      }}
                                    >
                                      {formatTime(msg.time)}
                                    </Typography>
                                  )}
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </Box>
                    </Box>

                    {/* Holographic Download */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        startIcon={<FiDownload />}
                        onClick={downloadScreenshot}
                        sx={{
                          height: 68,
                          fontSize: "1.25rem",
                          fontWeight: 700,
                          background:
                            "linear-gradient(45deg, #ff00ff, #00ffff, #ff00ff)",
                          backgroundSize: "200%",
                          color: "#fff",
                          borderRadius: 4,
                          boxShadow:
                            "0 0 40px rgba(0,255,255,0.7), 0 0 80px rgba(255,0,255,0.5)",
                          animation: "pulse 2s infinite",
                          "&:hover": {
                            backgroundPosition: "100%",
                            boxShadow: "0 0 50px rgba(0,255,255,0.9)",
                          },
                          "@keyframes pulse": {
                            "0%,100%": {
                              boxShadow: "0 0 40px rgba(0,255,255,0.7)",
                            },
                            "50%": { boxShadow: "0 0 60px rgba(0,255,255,1)" },
                          },
                        }}
                      >
                        Download PNG
                      </Button>
                    </motion.div>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right: Preview */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <motion.div
                whileHover={{ scale: 1.02, rotateX: 5, rotateY: 5 }}
                style={{ perspective: 1000 }}
              >
                <Box
                  ref={previewRef}
                  sx={{
                    width: 380,
                    height: 720,
                    borderRadius: "2.5rem",
                    overflow: "hidden",
                    boxShadow:
                      "0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(0,255,255,0.4)",
                    bgcolor: app.bg,
                    border: "2px solid rgba(0,255,255,0.3)",
                  }}
                >
                  {/* Header */}
                  <Box
                    sx={{
                      height: 60,
                      display: "flex",
                      alignItems: "center",
                      px: 2,
                      bgcolor: app.header,
                      color: app.headerText,
                      borderBottom: app.isEmail ? "1px solid #ddd" : "none",
                    }}
                  >
                    {app.isEmail ? (
                      <Box sx={{ width: "100%" }}>
                        <Typography
                          sx={{ fontSize: "0.9rem", fontWeight: 600 }}
                        >
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
                          <Typography
                            sx={{ fontSize: "0.75rem", opacity: 0.8 }}
                          >
                            online
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Box>

                  {/* Messages */}
                  <Box
                    sx={{
                      height: 600,
                      p: 2,
                      overflowY: "auto",
                      bgcolor: app.bg,
                      backgroundImage: app.hasBackground
                        ? `url(${whatsappBg})`
                        : "none",
                      backgroundSize: "cover",
                      "&::-webkit-scrollbar": { display: "none" },
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
                                ...(app.showTail && {
                                  position: "relative",
                                  "&:after": {
                                    content: '""',
                                    position: "absolute",
                                    bottom: 0,
                                    [msg.sender ? "right" : "left"]: -6,
                                    border: "6px solid transparent",
                                    borderTopColor: msg.sender
                                      ? app.bubble.sent
                                      : app.bubble.received,
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
              </motion.div>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Index;
