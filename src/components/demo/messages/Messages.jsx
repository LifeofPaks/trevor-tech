import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Paper,
  Stack,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  FiSearch,
  FiSend,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { IoLogoBitbucket } from "react-icons/io5";
import BuyModal from "../../buyModal/BuyModal";

const contacts = [
  {
    id: 1,
    name: "Ari, T",
    phone: "3489899023",
    lastMessage: "No, I'll be by the office later. I can pick it up.",
    time: "2022-01-05 09:31",
    avatar: "https://i.pravatar.cc/150?img=1",
    messages: [
      {
        text: "Did you want this report sent to your house?",
        time: "2022-01-05 09:30",
        sent: false,
      },
      {
        text: "No, I'll be by the office later. I can pick it up.",
        time: "2022-01-05 09:31",
        sent: true,
      },
    ],
  },
  {
    id: 2,
    name: "Sally, J",
    phone: "3427465723",
    lastMessage: "Sure.",
    time: "2022-01-06 10:31",
    avatar: "https://i.pravatar.cc/150?img=5",
    messages: [
      { text: "Hey Nina", time: "2022-01-06 10:20", sent: false },
      {
        text: "Hi, I haven't seen you in a while. Are you ok?",
        time: "2022-01-06 10:21",
        sent: true,
      },
      {
        text: "I'm good. What's up with your sister?",
        time: "2022-01-06 10:23",
        sent: false,
      },
      {
        text: "I don't want to talk about it.",
        time: "2022-01-06 10:25",
        sent: true,
      },
      { text: "Want to meet?", time: "2022-01-06 10:30", sent: false },
      { text: "Sure.", time: "2022-01-06 10:31", sent: true },
    ],
  },
  {
    id: 3,
    name: "Tony, S",
    phone: "3432780098",
    lastMessage:
      "Oh, that's great. I just couldn't find it any of the shops you told me about.",
    time: "2022-01-14 10:06",
    avatar: "https://i.pravatar.cc/150?img=3",
    messages: [
      { text: "Are you OK?", time: "2022-01-14 10:00", sent: true },
      {
        text: "Heard you went to the doctor yesterday.",
        time: "2022-01-14 10:01",
        sent: true,
      },
      {
        text: "I'm ok. It was nothing.",
        time: "2022-01-14 10:02",
        sent: false,
      },
      {
        text: "Are you coming home for Mom's birthday?",
        time: "2022-01-14 10:03",
        sent: false,
      },
      {
        text: "Yes, I finally found mom's present...",
        time: "2022-01-14 10:04",
        sent: true,
      },
      {
        text: "I had to look everywhere to find it, but I did...",
        time: "2022-01-14 10:05",
        sent: true,
      },
      {
        text: "Oh, that's great. I just couldn't find it any of the shops you told me about.",
        time: "2022-01-14 10:06",
        sent: false,
      },
    ],
  },
];

const Messages = () => {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
          const [open, setOpen] = useState(false);

          const handleOpen = () => setOpen(true);
          const handleClose = () => setOpen(false);

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
  );

  return (
    <div className="!relative">
      {/* Header */}
      <header className="!mb-4 sm:!mb-6 !px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
          <div className="flex items-center !gap-2 sm:!gap-3">
            <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
              Text Message{" "}
              <IoLogoBitbucket className="text-[#0695c8] rotate-[180deg]" />
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center !gap-2 sm:!gap-3">
            <span className="text-[10px] sm:text-xs text-orange-600 bg-orange-100 !px-3 sm:!px-4 !py-1.5 sm:!py-2 rounded-full font-medium">
              Demo data. Bind your device to collect actual data.
            </span>
            <button
              onClick={handleOpen}
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[13px] !px-4 sm:!px-5 !py-1.5 sm:!py-2 rounded-full font-semibold shadow-md hover:shadow-xl transition-all hover:scale-105 whitespace-nowrap"
            >
              Bind My Device
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <Box className="flex !h-[calc(100vh-140px)] bg-gray-50 relative overflow-hidden">
        {/* Left Sidebar */}
        <Box
          className={`fixed sm:static top-0 left-0 h-full sm:!h-auto z-50 bg-white !w-80 sm:!w-96 !border-r !border-gray-200 flex flex-col transition-transform duration-300 ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full sm:translate-x-0"
          }`}
        >
          {/* Sidebar Header */}
          <Box className="!p-4 !border-b !border-gray-200 flex items-center justify-between">
            <div className="hidden lg:flex items-center !gap-3 bg-gray-50 border border-gray-200 rounded-2xl !px-4 !py-2 hover:shadow-md transition-all cursor-default">
              <FiCalendar className="text-gray-500 text-lg" />
              <span className="text-gray-800 font-semibold text-[13px] sm:text-[13px]">
                October 26, 2025
              </span>
            </div>
            <Chip
              label="Last 7 days"
              size="small"
              sx={{
                backgroundColor: "#e0f2fe",
                color: "#0695c8",
                fontWeight: 600,
                fontSize: "0.75rem",
                height: 28,
                borderRadius: "12px",
              }}
            />
            {/* Close button (mobile only) */}
            <IconButton
              onClick={() => setIsSidebarOpen(false)}
              className="sm:!hidden"
            >
              <FiX />
            </IconButton>
          </Box>

          {/* Search */}
          <Box className="!p-3">
            <TextField
              fullWidth
              size="small"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FiSearch className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Box>

          {/* Contact List */}
          <List className="!flex-1 !overflow-y-auto">
            {filteredContacts.map((contact) => (
              <React.Fragment key={contact.id}>
                <ListItem
                  button
                  selected={selectedContact.id === contact.id}
                  onClick={() => {
                    setSelectedContact(contact);
                    setIsSidebarOpen(false);
                  }}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "#e6f7ff",
                      "&:hover": { backgroundColor: "#d6f0ff" },
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={contact.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography fontWeight="medium">
                        {contact.name}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {contact.phone}
                        </Typography>
                        <br />
                        <Typography variant="caption" color="text.secondary">
                          {contact.lastMessage}
                        </Typography>
                      </>
                    }
                  />
                  <Typography variant="caption" color="text.secondary">
                    {contact.time.split(" ")[1]}
                  </Typography>
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </Box>

        {/* Right Chat Panel */}
        <Box className="!flex-1 flex flex-col bg-white !p-0 sm:!p-0">
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <Box className="!p-4 !border-b !border-gray-200 flex items-center justify-between">
                <Stack direction="row" spacing={2} alignItems="center">
                  {/* Mobile Menu Button */}
                  <IconButton
                    onClick={() => setIsSidebarOpen(true)}
                    className="sm:!hidden"
                  >
                    <FiMenu />
                  </IconButton>
                  <Avatar src={selectedContact.avatar} />
                  <Box>
                    <Typography fontWeight="medium">
                      {selectedContact.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {selectedContact.phone}
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Messages */}
              <Box className="!flex-1 !overflow-y-auto !p-4 space-y-4">
                {selectedContact.messages.map((msg, i) => (
                  <Box
                    key={i}
                    className={`flex !mb-2 ${
                      msg.sent ? "justify-end" : "justify-start"
                    }`}
                  >
                    <Paper
                      elevation={0}
                      className={`!max-w-xs sm:!max-w-sm md:!max-w-md !px-4 !py-2 !rounded-2xl ${
                        msg.sent
                          ? "!bg-[#0695c8] !text-white"
                          : "!bg-gray-100 !text-gray-800"
                      }`}
                    >
                      <Typography variant="body2">{msg.text}</Typography>
                      <Typography
                        variant="caption"
                        className={`!block !text-right !mt-1 ${
                          msg.sent ? "!text-white/70" : "!text-gray-500"
                        }`}
                      >
                        {msg.time.split(" ")[1]}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>

              {/* Message Input */}
              <Box className="!p-4 !border-t !border-gray-200">
                <Stack direction="row" spacing={2} alignItems="center">
                  <IconButton size="small" sx={{ color: "#9ca3af" }}>
                    <FiChevronLeft />
                  </IconButton>
                  <Chip
                    label={page}
                    size="small"
                    sx={{
                      backgroundColor: "#0695c8",
                      color: "white",
                      fontWeight: "bold",
                      width: 32,
                      height: 32,
                    }}
                  />
                  <IconButton size="small" sx={{ color: "#9ca3af" }}>
                    <FiChevronRight />
                  </IconButton>
                  <Box className="!flex-1" />
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Type a message..."
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small" sx={{ color: "#0695c8" }}>
                            <FiSend />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
                  />
                </Stack>
              </Box>
            </>
          ) : (
            <Box className="!flex-1 flex items-center justify-center">
              <Typography color="text.secondary">
                Select a contact to view messages
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <BuyModal handleClose={handleClose} open={open} />
    </div>
  );
};

export default Messages;
