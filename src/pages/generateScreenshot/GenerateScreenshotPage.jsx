import React, { useState, useRef } from "react";
import {
  FiPlus,
  FiTrash2,
  FiDownload,
  FiMessageSquare,
  FiSearch,
  FiCamera,
  FiSend,
  FiMic,
  FiPaperclip,
  FiEdit2,
  FiMoreVertical,
  FiPhone,
  FiMail,
  FiVideo,
  FiSmile,
  FiArrowLeft,
  FiCheck,
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
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Badge,
  createTheme,
  ThemeProvider,
  Menu,
} from "@mui/material";
import whatsappBg from "../../assets/whatsapp-bg.jpeg";
import { motion, AnimatePresence } from "framer-motion";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

/* ------------------------------------------------------------------ */
/*                         APP TEMPLATES (Updated)                    */
/* ------------------------------------------------------------------ */
const appTemplates = {
  whatsapp: {
    name: "WhatsApp",
    primary: "#25D366",
    bg: "#ece5dd",
    header: "#075e54",
    headerText: "#fff",
    bubble: { sent: "#dcf8c6", received: "#ffffff" },
    text: { sent: "#000", received: "#000" },
    hasBackground: true,
    tabBar: "#f0f2f5",
    tabIcons: true,
    contactList: true,
    showTime: true,
    showStatus: true,
    showAvatar: true,
    showUnread: true,
    showHeaderBack: true,
    showHeaderCall: true,
    showHeaderVideo: true,
    showHeaderMore: true,
    showInputEmoji: true,
    showInputAttach: true,
    showInputMic: true,
    showInputSend: true,
    showMessageCheck: true,
  },
  instagram: {
    name: "Instagram",
    primary: "#E4405F",
    bg: "#fafafa",
    header: "#fff",
    headerText: "#000",
    bubble: { sent: "#E4405F", received: "#f0f0f0" },
    text: { sent: "#fff", received: "#000" },
    hasBackground: false,
    tabBar: "#fff",
    borderBottom: "1px solid #dbdbdb",
    contactList: true,
    showTime: true,
    showStatus: false,
    showAvatar: true,
    showUnread: true,
    dmHeader: true,
    stories: true,
    showHeaderBack: true,
    showHeaderMore: false,
    showInputSend: true,
    showInputAttach: true,
    showInputCamera: true,
  },
  twitter: {
    name: "Twitter",
    primary: "#1DA1F2",
    bg: "#fff",
    header: "#fff",
    headerText: "#000",
    bubble: { sent: "#1DA1F2", received: "#f7f9f9" },
    text: { sent: "#fff", received: "#000" },
    hasBackground: false,
    tabBar: "#fff",
    borderBottom: "1px solid #e6ecf0",
    contactList: true,
    showTime: true,
    showStatus: false,
    showAvatar: true,
    showUnread: true,
    dmHeader: true,
    showHeaderBack: true,
    showHeaderMore: true,
    showInputSend: true,
    showInputAttach: false,
    showInputMic: false,
  },
  snapchat: {
    name: "Snapchat",
    primary: "#FFFC00",
    bg: "#fff",
    header: "#FFFC00",
    headerText: "#000",
    bubble: { sent: "#FFFC00", received: "#f0f0f0" },
    text: { sent: "#000", received: "#000" },
    hasBackground: false,
    tabBar: "#fff",
    contactList: true,
    showTime: false,
    showStatus: true,
    showAvatar: true,
    showUnread: false,
    snapStyle: true,
    showHeaderBack: true,
    showHeaderCamera: true,
    showHeaderMore: false,
    showInputSend: true,
    showInputCamera: true,
  },
  messenger: {
    name: "Messenger",
    primary: "#0084FF",
    bg: "#fff",
    header: "#0084FF",
    headerText: "#fff",
    bubble: { sent: "#0084FF", received: "#e4e6eb" },
    text: { sent: "#fff", received: "#000" },
    hasBackground: false,
    tabBar: "#fff",
    contactList: true,
    showTime: true,
    showStatus: false,
    showAvatar: true,
    showUnread: true,
    activeStatus: true,
    showHeaderBack: true,
    showHeaderCall: true,
    showHeaderVideo: true,
    showHeaderMore: true,
    showInputEmoji: true,
    showInputAttach: true,
    showInputMic: true,
    showInputSend: true,
  },
  telegram: {
    name: "Telegram",
    primary: "#229ED9",
    bg: "#f0f2f5",
    header: "#229ED9",
    headerText: "#fff",
    bubble: { sent: "#229ED9", received: "#ffffff" },
    text: { sent: "#fff", received: "#000" },
    hasBackground: false,
    tabBar: "#f0f2f5",
    contactList: true,
    showTime: true,
    showStatus: true,
    showAvatar: true,
    showUnread: true,
    showHeaderBack: true,
    showHeaderCall: true,
    showHeaderVideo: true,
    showHeaderMore: true,
    showInputAttach: true,
    showInputMic: true,
    showInputSend: true,
  },
  discord: {
    name: "Discord",
    primary: "#5865F2",
    bg: "#36393f",
    header: "#2c2f33",
    headerText: "#fff",
    bubble: { sent: "#5865F2", received: "#2f3136" },
    text: { sent: "#fff", received: "#dcddde" },
    hasBackground: false,
    tabBar: "#23272a",
    contactList: true,
    showTime: true,
    showStatus: true,
    showAvatar: true,
    showUnread: true,
    dmSidebar: true,
    showHeaderBack: false,
    showHeaderMore: true,
    showInputSend: true,
    showInputAttach: true,
  },
  sms: {
    name: "SMS",
    primary: "#34C759",
    bg: "#f2f2f7",
    header: "#fff",
    headerText: "#000",
    bubble: { sent: "#34C759", received: "#e5e5ea" },
    text: { sent: "#fff", received: "#000" },
    hasBackground: false,
    tabBar: "#fff",
    contactList: true,
    showTime: true,
    showStatus: false,
    showAvatar: false,
    showUnread: true,
    showHeaderBack: true,
    showHeaderMore: true,
    showInputSend: true,
    showInputAttach: false,
    showInputMic: false,
    showMessageCheck: false,
  },
  email: {
    name: "Email",
    primary: "#007AFF",
    bg: "#f9f9f9",
    header: "#fff",
    headerText: "#000",
    bubble: { sent: "#007AFF", received: "#e5e5ea" },
    text: { sent: "#fff", received: "#000" },
    hasBackground: false,
    tabBar: "#fff",
    contactList: true,
    showTime: true,
    showStatus: false,
    showAvatar: true,
    showUnread: true,
    showHeaderBack: true,
    showHeaderMore: true,
    showInputSend: true,
    showInputAttach: true,
    showInputMic: false,
    showMessageCheck: false,
  },
};

/* ------------------------------------------------------------------ */
/*                           CYBER THEME                              */
/* ------------------------------------------------------------------ */
const cyberTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00ffff" },
    background: { default: "#0a0a1f", paper: "rgba(20, 20, 40)" },
  },
});

/* ------------------------------------------------------------------ */
/*                         FLOATING PARTICLES                         */
/* ------------------------------------------------------------------ */
const Particles = () => (
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      pointerEvents: "none",
    }}
  >
    {[...Array(10)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ x: Math.random() * 100 + "%", y: -50 }}
        animate={{ y: "120vh" }}
        transition={{
          duration: 15 + Math.random() * 10,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 5,
        }}
        style={{
          position: "absolute",
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "linear-gradient(45deg, #00ffff, #ff00ff)",
          filter: "blur(2px)",
          left: `${Math.random() * 100}%`,
        }}
      />
    ))}
  </Box>
);

/* ------------------------------------------------------------------ */
/*                              MAIN COMPONENT                        */
/* ------------------------------------------------------------------ */
const Index = () => {
  const previewRef = useRef(null);
  const [view, setView] = useState("contacts"); // contacts | chat
  const [selectedApp, setSelectedApp] = useState("whatsapp");
  const app = appTemplates[selectedApp];
  const [selectedContact, setSelectedContact] = useState(null);
  const [sender, setSender] = useState("You");
  const [messages, setMessages] = useState([]);

  /* ------------------- Contacts Management ------------------- */
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Josh",
      message: "EL NINO: Sticker",
      time: "08:40",
      unread: 4,
      online: true,
    },
    {
      id: 2,
      name: "Danny",
      message: "Photo",
      time: "08:33",
      unread: 0,
      online: true,
    },
    {
      id: 3,
      name: "Peter",
      message: "Voice call",
      time: "07:23",
      unread: 0,
      online: false,
    },
    {
      id: 4,
      name: "Eliot",
      message: "Hercules Yomi: Done",
      time: "Yesterday",
      unread: 0,
      online: false,
    },
    {
      id: 5,
      name: "Andrew",
      message: "You deleted this message.",
      time: "Yesterday",
      unread: 0,
      online: false,
    },
    {
      id: 6,
      name: "+234 803 949 3808",
      message: "Hi Paks Good evening…",
      time: "Yesterday",
      unread: 0,
      online: false,
    },
    {
      id: 7,
      name: "Anthony",
      message: "Ok",
      time: "Yesterday",
      unread: 0,
      online: true,
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [formName, setFormName] = useState("");

  const openModal = (contact = null) => {
    setEditingContact(contact);
    setFormName(contact?.name || "");
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditingContact(null);
    setFormName("");
  };
  const saveContact = () => {
    if (!formName.trim()) return;
    if (editingContact) {
      setContacts((prev) =>
        prev.map((c) =>
          c.id === editingContact.id ? { ...c, name: formName } : c
        )
      );
    } else {
      const newId = Math.max(...contacts.map((c) => c.id), 0) + 1;
      setContacts((prev) => [
        ...prev,
        {
          id: newId,
          name: formName,
          message: "Hey!",
          time: "Now",
          unread: 0,
          online: Math.random() > 0.5,
        },
      ]);
    }
    closeModal();
  };
  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  /* ------------------- Ellipsis Menu ------------------- */
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuContactId, setMenuContactId] = useState(null);

  const handleMenuOpen = (event, id) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setMenuContactId(id);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuContactId(null);
  };

  /* ------------------- Chat Logic ------------------- */
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
    link.download = `${app.name}-chat.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const openChat = (contact) => {
    setSelectedContact(contact);
    setView("chat");
    setMessages([{ text: contact.message, time: new Date(), sender: false }]);
  };

  /* ------------------------------------------------------------------ */
  return (
    <ThemeProvider theme={cyberTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0a0a1f 0%, #1a0033 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Particles />
        <Box
          sx={{
            maxWidth: 1600,
            mx: "auto",
            p: 4,
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                mb: 6,
                flexWrap: "wrap",
              }}
            >
              <Box
                sx={{
                  p: 2,
                  borderRadius: 4,
                  bgcolor: "rgba(0, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
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
                  sx={{ color: "rgba(255,255,255,0.7)" }}
                >
                  Customize & download hyper-realistic screenshots
                </Typography>
              </Box>
            </Box>
          </motion.div>

          {/* App Selector */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <FormControl sx={{ minWidth: 200, mb: 4 }}>
              <InputLabel sx={{ color: "#00ffff" }}>App</InputLabel>
              <Select
                value={selectedApp}
                label="App"
                onChange={(e) => {
                  setSelectedApp(e.target.value);
                  if (view === "chat") setView("contacts");
                }}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00ffff",
                    borderWidth: 2,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ff00ff",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ff00ff",
                  },
                }}
              >
                {Object.entries(appTemplates).map(([k, v]) => (
                  <MenuItem key={k} value={k} sx={{ color: "#fff" }}>
                    {v.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </motion.div>

          {/* ==== CONTACT LIST VIEW ==== */}
          {view === "contacts" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ perspective: 1000 }}
            >
              <Box
                className="lg:mt-[-6rem]!"
                sx={{
                  width: 380,
                  height: 720,
                  borderRadius: "2.5rem",
                  overflow: "hidden",
                  boxShadow:
                    "0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(0,255,255,0.4)",
                  bgcolor: app.bg,
                  border: "2px solid rgba(0,255,255,0.3)",
                  mx: "auto",
                  position: "relative",
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
                    justifyContent: "space-between",
                    px: 3,
                    borderBottom: app.borderBottom || "none",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {app.dmHeader ? "Messages" : "Chats"}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    {app.name === "Instagram" ? (
                      <>
                        <FiCamera />
                        <FiPlus />
                      </>
                    ) : (
                      <FiSearch />
                    )}
                    <IconButton onClick={() => openModal()} size="small">
                      <FiPlus />
                    </IconButton>
                  </Box>
                </Box>

                {/* Contact List */}
                <List sx={{ bgcolor: app.bg, flex: 1, overflowY: "auto" }}>
                  <AnimatePresence>
                    {contacts.map((contact) => {
                      const seed = contact.name
                        .replace(/\s+/g, "")
                        .toLowerCase();
                      return (
                        <motion.div
                          key={contact.id}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 50 }}
                          whileHover={{
                            backgroundColor: "rgba(0,255,255,0.05)",
                          }}
                          onClick={() => openChat(contact)}
                          style={{ cursor: "pointer" }}
                        >
                          <ListItem
                            secondaryAction={
                              <IconButton
                                size="small"
                                onClick={(e) => handleMenuOpen(e, contact.id)}
                              >
                                <FiMoreVertical />
                              </IconButton>
                            }
                          >
                            {app.showAvatar && (
                              <ListItemAvatar>
                                <Avatar
                                  style={{ filter: "blur(2px)" }}
                                  src={`https://i.pravatar.cc/150?u=${seed}`}
                                />
                              </ListItemAvatar>
                            )}
                            <ListItemText
                              primary={
                                <Typography
                                  sx={{
                                    fontWeight: contact.unread ? 600 : 400,
                                  }}
                                >
                                  {contact.name}
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  sx={{
                                    fontSize: "0.85rem",
                                    color: "#666",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {contact.message}
                                </Typography>
                              }
                            />
                            <Box sx={{ textAlign: "right" }}>
                              {app.showTime && (
                                <Typography
                                  sx={{ fontSize: "0.75rem", color: "#888" }}
                                >
                                  {contact.time}
                                </Typography>
                              )}
                              {app.showUnread && contact.unread > 0 && (
                                <Badge
                                  badgeContent={contact.unread}
                                  color="primary"
                                  sx={{ mt: 0.5 }}
                                />
                              )}
                              {app.showStatus && contact.online && (
                                <Box
                                  sx={{
                                    width: 10,
                                    height: 10,
                                    bgcolor: "#4caf50",
                                    borderRadius: "50%",
                                    mt: 0.5,
                                    mx: "auto",
                                  }}
                                />
                              )}
                            </Box>
                          </ListItem>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </List>

                {/* Tab Bar */}
                {app.tabIcons && (
                  <Box
                    sx={{
                      height: 60,
                      bgcolor: app.tabBar,
                      borderTop: "1px solid #ddd",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <FiMessageSquare color="#25D366" />
                    <FiSearch />
                    <FiPlus />
                    <FiMoreVertical />
                  </Box>
                )}
              </Box>
            </motion.div>
          )}

          {/* ==== CHAT GENERATOR VIEW ==== */}
          {view === "chat" && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
                gap: 5,
              }}
            >
              {/* Controls */}
              <Card
                sx={{
                  background: "rgba(15,15,35,0.8)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(0,255,255,0.3)",
                }}
              >
                <CardHeader
                  title="Customize"
                  sx={{ bgcolor: "rgba(20,20,50,0.8)", color: "#00ffff" }}
                />
                <CardContent>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                  >
                    <TextField
                      label="Your Name"
                      value={sender}
                      onChange={(e) => setSender(e.target.value)}
                      fullWidth
                    />
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Button startIcon={<FiPlus />} onClick={addMessage}>
                        Add Message
                      </Button>
                      <Button
                        startIcon={<FiDownload />}
                        onClick={downloadScreenshot}
                        variant="contained"
                      >
                        Download
                      </Button>
                    </Box>
                    <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
                      <AnimatePresence>
                        {messages.map((msg, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <Card sx={{ mb: 2, p: 2 }}>
                              <TextField
                                multiline
                                fullWidth
                                value={msg.text}
                                onChange={(e) =>
                                  updateMessage(i, "text", e.target.value)
                                }
                              />
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  mt: 1,
                                }}
                              >
                                <Button
                                  size="small"
                                  onClick={() =>
                                    updateMessage(i, "sender", !msg.sender)
                                  }
                                >
                                  {msg.sender ? "You" : selectedContact?.name}
                                </Button>
                                <IconButton
                                  size="small"
                                  onClick={() => deleteMessage(i)}
                                >
                                  <FiTrash2 />
                                </IconButton>
                              </Box>
                            </Card>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* Preview */}
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box
                  ref={previewRef}
                  sx={{
                    width: 380,
                    height: 720,
                    borderRadius: "2.5rem",
                    overflow: "hidden",
                    boxShadow: "0 0 60px rgba(0,255,255,0.5)",
                    bgcolor: app.bg,
                  }}
                >
                  {/* Chat Header */}
                  <Box
                    sx={{
                      height: 60,
                      bgcolor: app.header,
                      color: app.headerText,
                      display: "flex",
                      alignItems: "center",
                      px: 2,
                      gap: 2,
                    }}
                  >
                    {app.showHeaderBack && (
                      <IconButton
                        size="small"
                        onClick={() => setView("contacts")}
                      >
                        <FiArrowLeft />
                      </IconButton>
                    )}
                    {app.showAvatar && (
                      <Avatar
                        style={{ filter: "blur(2px)" }}
                        src={`https://i.pravatar.cc/150?u=${selectedContact?.name
                          .replace(/\s+/g, "")
                          .toLowerCase()}`}
                      />
                    )}
                    <Box flex={1}>
                      <Typography fontWeight={600}>
                        {selectedContact?.name}
                      </Typography>
                      {app.showStatus && (
                        <Typography fontSize="0.75rem" sx={{ opacity: 0.8 }}>
                          online
                        </Typography>
                      )}
                    </Box>
                    {app.showHeaderCall && <FiPhone />}
                    {app.showHeaderVideo && <FiVideo />}
                    {app.showHeaderMore && <FiMoreVertical />}
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
                    }}
                  >
                    {messages
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
                            }}
                          >
                            <Typography sx={{ fontSize: "0.925rem" }}>
                              {msg.text}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                gap: 0.5,
                              }}
                            >
                              <Typography
                                sx={{ fontSize: "0.65rem", opacity: 0.7 }}
                              >
                                {formatTime(msg.time)}
                              </Typography>
                              {app.showMessageCheck && msg.sender && (
                                <>
                                  <FiCheck size={12} />
                                  <IoCheckmarkDoneOutline
                                    size={12}
                                    style={{ marginLeft: -6 }}
                                  />
                                </>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      ))}
                  </Box>

                  {/* Input */}
                  <Box
                    sx={{
                      height: 60,
                      bgcolor: app.bg,
                      display: "flex",
                      alignItems: "center",
                      px: 2,
                      borderTop: "1px solid #ddd",
                    }}
                  >
                    {app.showInputEmoji && <FiSmile />}
                    <Box
                      sx={{
                        flex: 1,
                        bgcolor: "#fff",
                        borderRadius: "25px",
                        height: 40,
                        px: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {app.showInputMic && <FiMic />}
                      <span style={{ color: "#888" }}>Type a message...</span>
                      {app.showInputAttach && <FiPaperclip />}
                      {app.showInputCamera && <FiCamera />}
                    </Box>
                    {app.showInputSend && (
                      <IconButton sx={{ ml: 1 }}>
                        <FiSend />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>

        {/* ==== CONTACT MODAL ==== */}
        <Dialog open={modalOpen} onClose={closeModal} maxWidth="xs" fullWidth>
          <DialogTitle>
            {editingContact ? "Edit Contact" : "Add New Contact"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              label="Name"
              fullWidth
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              sx={{ mt: 1 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal}>Cancel</Button>
            <Button onClick={saveContact} variant="contained" color="primary">
              {editingContact ? "Save" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* ==== ELLIPSIS MENU ==== */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem
            onClick={() => {
              const contact = contacts.find((c) => c.id === menuContactId);
              if (contact) openModal(contact);
              handleMenuClose();
            }}
          >
            <FiEdit2 style={{ marginRight: 8 }} /> Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (menuContactId) deleteContact(menuContactId);
              handleMenuClose();
            }}
            sx={{ color: "error.main" }}
          >
            <FiTrash2 style={{ marginRight: 8 }} /> Delete
          </MenuItem>
        </Menu>
      </Box>
    </ThemeProvider>
  );
};

export default Index;
