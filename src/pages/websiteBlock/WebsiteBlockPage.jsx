import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  TextField,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import { FiPlus } from "react-icons/fi";
import { IoLogoBitbucket } from "react-icons/io5";
import BindPhone from "../../components/demo/BindPhone";

const WebsiteBlockPage = () => {
  const [input, setInput] = useState("");
  const [blockedSites, setBlockedSites] = useState([
    {
      domain: "youtube.com",
      favicon: "https://www.google.com/s2/favicons?domain=youtube.com&sz=32",
    },
    {
      domain: "google.com",
      favicon: "https://www.google.com/s2/favicons?domain=google.com&sz=32",
    },
    {
      domain: "facebook.com",
      favicon: "https://www.google.com/s2/favicons?domain=facebook.com&sz=32",
    },
  ]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleAdd = () => {
    if (input.trim() && !blockedSites.find((s) => s.domain === input.trim())) {
      const domain = input
        .trim()
        .replace(/^https?:\/\//, "")
        .split("/")[0];
      setBlockedSites([
        ...blockedSites,
        {
          domain,
          favicon: `https://www.google.com/s2/favicons?domain=${domain}&sz=32`,
        },
      ]);
      setInput("");
    }
  };

  const handleUnblock = (domain) => {
    setBlockedSites(blockedSites.filter((s) => s.domain !== domain));
  };

    return (
      <>
        <header className="!mb-4 sm:!mb-6 !px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
            <div className="flex items-center !gap-2 sm:!gap-3">
              <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
Website Block
                <IoLogoBitbucket className="text-[#0695c8] rotate-[180deg]" />
              </h1>
            </div>
            <BindPhone />
          </div>
        </header>
        <Box className="!p-6 !bg-gray-50 !min-h-[75vh] !space-y-6">

          {/* Main Grid */}
          <Box
            className={
              isMobile
                ? "!grid !grid-cols-1 !gap-6"
                : "!grid !grid-cols-1 md:!grid-cols-2 !gap-6"
            }
          >
            {/* Left: Description + Add Form */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
                p: 4,
                backgroundColor: "#fff",
                gridColumn: isMobile ? "span 1" : "span 1",
              }}
            >
              <Typography className="!text-sm !text-gray-600 !mb-6 !leading-relaxed">
                This feature will block all web pages on any website, not just
                the homepage. For example, if you visit example.com, all web
                pages connected to it such as www.example.com/page1.html will
                also be blocked.
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Stack spacing={3}>
                <Typography className="!font-semibold !text-gray-800">
                  Add Websites
                </Typography>

                <TextField
                  placeholder="Enter a web address (ex: abc.com)"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAdd()}
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      backgroundColor: "#f9fafb",
                      "& fieldset": { borderColor: "#d1d5db" },
                    },
                  }}
                />

                <Button
                  variant="contained"
                  startIcon={<FiPlus />}
                  onClick={handleAdd}
                  fullWidth
                  sx={{
                    backgroundColor: "#0695c8",
                    color: "white",
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: "999px",
                    py: 1.5,
                    boxShadow: "0 4px 12px rgba(6,149,200,0.3)",
                    "&:hover": {
                      backgroundColor: "#05719c",
                      boxShadow: "0 6px 16px rgba(6,149,200,0.4)",
                    },
                  }}
                >
                  Add
                </Button>
              </Stack>
            </Paper>

            {/* Right: Blocked Sites */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
                p: 4,
                backgroundColor: "#fff",
                gridColumn: isMobile ? "span 1" : "span 1",
                maxHeight: 500,
                overflowY: "auto",
                "&::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
              }}
            >
              <Typography className="!font-semibold !text-gray-800 !mb-4">
                Blocked Sites
              </Typography>

              <Stack spacing={3}>
                {blockedSites.length === 0 ? (
                  <Typography className="!text-sm !text-gray-500 !text-center !py-8">
                    No websites blocked yet.
                  </Typography>
                ) : (
                  blockedSites.map((site) => (
                    <Box
                      key={site.domain}
                      className="!flex !items-center !justify-between !p-3 !bg-gray-50 !rounded-lg"
                    >
                      <Box className="!flex !items-center !gap-3">
                        <img
                          src={site.favicon}
                          alt={site.domain}
                          className="!w-6 !h-6 !rounded"
                        />
                        <Typography className="!font-medium !text-gray-900 !text-sm">
                          {site.domain}
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleUnblock(site.domain)}
                        sx={{
                          backgroundColor: "#10b981",
                          color: "white",
                          textTransform: "none",
                          fontWeight: 600,
                          borderRadius: "999px",
                          px: 3,
                            minWidth: "auto",
                          fontSize: "0.675rem",
                          boxShadow: "0 2px 8px rgba(16,197,129,0.3)",
                          "&:hover": {
                            backgroundColor: "#059669",
                          },
                        }}
                      >
                        Unblock
                      </Button>
                    </Box>
                  ))
                )}
              </Stack>
            </Paper>
          </Box>
        </Box>
      </>
    );
};

export default WebsiteBlockPage;
