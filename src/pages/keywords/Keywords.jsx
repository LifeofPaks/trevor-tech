import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Stack,
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FiPlus } from "react-icons/fi";

// Sample Data
const detectedKeywords = [
  { keyword: "dating", feature: "Snapchat", time: "2022-01-25 15:15" },
  { keyword: "dating", feature: "WhatsApp", time: "2022-01-25 15:15" },
  { keyword: "dating", feature: "Facebook", time: "2022-01-25 15:15" },
  { keyword: "babe", feature: "Snapchat", time: "2022-01-25 15:15" },
  { keyword: "damn", feature: "Messages", time: "2022-01-25 15:15" },
  { keyword: "drunk", feature: "WhatsApp", time: "2022-01-25 15:15" },
  { keyword: "erotic", feature: "WhatsApp", time: "2022-01-25 15:15" },
  { keyword: "public", feature: "Kik", time: "2022-01-25 15:15" },
];

const features = ["All", "Snapchat", "WhatsApp", "Facebook", "Messages", "Kik"];
const notificationTypes = ["Notify to email", "Notify to phone", "Both"];

const Keywords = () => {
  const [tab, setTab] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [selectedFeature, setSelectedFeature] = useState("All");
  const [notificationType, setNotificationType] = useState("Notify to email");
  const [addedRules, setAddedRules] = useState([
    { keyword: "public", feature: "All", notify: "Notify to email" },
    { keyword: "erotic", feature: "All", notify: "Notify to email" },
    { keyword: "drunk", feature: "All", notify: "Notify to email" },
    { keyword: "damn", feature: "All", notify: "Notify to email" },
    { keyword: "babe", feature: "All", notify: "Notify to email" },
    { keyword: "date with", feature: "All", notify: "Notify to email" },
    { keyword: "dating", feature: "Facebook", notify: "Notify to email" },
    { keyword: "dating", feature: "WhatsApp", notify: "Notify to email" },
    { keyword: "dating", feature: "Snapchat", notify: "Notify to email" },
  ]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleAddRule = () => {
    if (keyword.trim()) {
      setAddedRules([
        { keyword, feature: selectedFeature, notify: notificationType },
        ...addedRules,
      ]);
      setKeyword("");
      setSelectedFeature("All");
      setNotificationType("Notify to email");
    }
  };

  return (
    <Box className="!p-6 !bg-gray-50 !min-h-screen">
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
              color: "#6b7280",
            },
            "& .Mui-selected": {
              color: "#0695c8 !important",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#0695c8",
              height: 3,
              borderRadius: "2px",
            },
          }}
        >
          <Tab label="Tracking Rules"  />
          <Tab label="Keywords Detected"  />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {tab === 0 ? (
        /* === Tracking Rules === */
        <Box
          className={
            isMobile
              ? "!space-y-6"
              : "!grid !grid-cols-1 md:!grid-cols-2 !gap-6"
          }
        >
          {/* Add Rule */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: "16px",
              border: "1px solid #e5e7eb",
              p: 4,
              height: "fit-content",
            }}
          >
            <Typography
              variant="h6"
              className="!font-bold !text-gray-800 !mb-4 !text-[14px]"
            >
              Add Rule
            </Typography>
            <Stack spacing={3}>
              <TextField
                label="Word or Phrase"
                placeholder="Word or Phrase"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "#f9fafb",
                  },
                }}
              />

              <FormControl fullWidth size="small">
                <InputLabel>Select Features</InputLabel>
                <Select
                  value={selectedFeature}
                  onChange={(e) => setSelectedFeature(e.target.value)}
                  label="Select Features"
                  sx={{
                    borderRadius: "12px",
                    backgroundColor: "#f9fafb",
                  }}
                >
                  {features.map((f) => (
                    <MenuItem key={f} value={f}>
                      {f}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>Notification Type</InputLabel>
                <Select
                  value={notificationType}
                  onChange={(e) => setNotificationType(e.target.value)}
                  label="Notification Type"
                  sx={{
                    borderRadius: "12px",
                    backgroundColor: "#f9fafb",
                  }}
                >
                  {notificationTypes.map((n) => (
                    <MenuItem key={n} value={n}>
                      {n}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="contained"
                onClick={handleAddRule}
                startIcon={<FiPlus />}
                sx={{
                  backgroundColor: "#0695c8",
                  borderRadius: "999px",
                  textTransform: "none",
                  fontWeight: 600,
                  py: 1.5,
                  "&:hover": {
                    backgroundColor: "#057aa3",
                    transform: "translateY(-1px)",
                    boxShadow: "0 8px 16px rgba(6,149,200,0.3)",
                  },
                }}
              >
                Add
              </Button>
            </Stack>
          </Paper>

          {/* Added Rules - No Borders */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: "16px",
              border: "1px solid #e5e7eb",
              p: 4,
              overflow: "hidden",
            }}
          >
            <Typography
              variant="h6"
              className="!font-bold !text-gray-800 !mb-4 !text-[14px]"
            >
              Added Rules
            </Typography>
            <TableContainer sx={{ maxHeight: 500 }} className="scrollbar-hide">
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f9fafb" }}>
                    {["Keywords", "Features", "Notification Type"].map((h) => (
                      <TableCell
                        key={h}
                        sx={{
                          fontWeight: 600,
                          color: "#374151",
                          fontSize: "0.8125rem",
                          py: 2,
                          pl: 3,
                          pr: 3,
                          border: "none", // No border
                        }}
                      >
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {addedRules.map((rule, i) => (
                    <TableRow
                      key={i}
                      hover
                      sx={{
                        backgroundColor:
                          i % 2 === 0 ? "#fdfdfe" : "transparent",
                        "&:hover": { backgroundColor: "#f0f9ff" },
                      }}
                    >
                      <TableCell
                        sx={{
                          pl: 3,
                          fontWeight: 500,
                          color: "#1f2937",
                          fontSize: "0.875rem",
                          border: "none", // No border
                          py: 2.5,
                        }}
                      >
                        {rule.keyword}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#4b5563",
                          fontSize: "0.875rem",
                          border: "none",
                          py: 2.5,
                        }}
                      >
                        {rule.feature}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#0695c8",
                          fontWeight: 500,
                          fontSize: "0.875rem",
                          border: "none",
                          py: 2.5,
                        }}
                      >
                        {rule.notify}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      ) : (
        /* === Keywords Detected - No Borders === */
        <Paper
          elevation={0}
          sx={{
            borderRadius: "16px",
            border: "1px solid #e5e7eb",
            overflow: "hidden",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f9fafb" }}>
                  {["Keywords", "Features", "Time"].map((h) => (
                    <TableCell
                      key={h}
                      sx={{
                        fontWeight: 600,
                        color: "#374151",
                        fontSize: "0.875rem",
                        py: 2.5,
                        pl: h === "Keywords" ? 4 : 3,
                        pr: h === "Time" ? 4 : 3,
                        border: "none", // No border
                      }}
                    >
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {detectedKeywords.map((item, i) => (
                  <TableRow
                    key={i}
                    hover
                    sx={{
                      backgroundColor: i % 2 === 0 ? "#fdfdfe" : "transparent",
                      "&:hover": { backgroundColor: "#f0f9ff" },
                    }}
                  >
                    <TableCell
                      sx={{
                        pl: 4,
                        fontWeight: 500,
                        color: "#1f2937",
                        fontSize: "0.875rem",
                        border: "none",
                        py: 2.5,
                      }}
                    >
                      {item.keyword}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#4b5563",
                        fontSize: "0.875rem",
                        border: "none",
                        py: 2.5,
                      }}
                    >
                      {item.feature}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        pr: 4,
                        fontFamily: "monospace",
                        color: "#6b7280",
                        fontSize: "0.8125rem",
                        border: "none",
                        py: 2.5,
                      }}
                    >
                      {item.time}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
};

export default Keywords;
