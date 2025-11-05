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
import { FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import BuyModal from "../../components/buyModal/BuyModal";

// Sample Data
const detectedKeywords = [
  {
    keyword: "dating",
    featureKey: "dmkeywords.features.snapchat",
    time: "2022-01-25 15:15",
  },
  {
    keyword: "dating",
    featureKey: "dmkeywords.features.whatsapp",
    time: "2022-01-25 15:15",
  },
  {
    keyword: "dating",
    featureKey: "dmkeywords.features.facebook",
    time: "2022-01-25 15:15",
  },
  {
    keyword: "babe",
    featureKey: "dmkeywords.features.snapchat",
    time: "2022-01-25 15:15",
  },
  {
    keyword: "damn",
    featureKey: "dmkeywords.features.messages",
    time: "2022-01-25 15:15",
  },
  {
    keyword: "drunk",
    featureKey: "dmkeywords.features.whatsapp",
    time: "2022-01-25 15:15",
  },
  {
    keyword: "erotic",
    featureKey: "dmkeywords.features.whatsapp",
    time: "2022-01-25 15:15",
  },
  {
    keyword: "public",
    featureKey: "dmkeywords.features.kik",
    time: "2022-01-25 15:15",
  },
];

const features = [
  "dmkeywords.features.all",
  "dmkeywords.features.snapchat",
  "dmkeywords.features.whatsapp",
  "dmkeywords.features.facebook",
  "dmkeywords.features.messages",
  "dmkeywords.features.kik",
];

const notificationTypes = [
  "dmkeywords.notifications.notify_email",
  "dmkeywords.notifications.notify_phone",
  "dmkeywords.notifications.notify_both",
];

const Keywords = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [selectedFeature, setSelectedFeature] = useState(
    "dmkeywords.features.all"
  );
  const [notificationType, setNotificationType] = useState(
    "dmkeywords.notifications.notify_email"
  );
  const [addedRules, setAddedRules] = useState([
    {
      keyword: "public",
      feature: "dmkeywords.features.all",
      notify: "dmkeywords.notifications.notify_email",
    },
    {
      keyword: "erotic",
      feature: "dmkeywords.features.all",
      notify: "dmkeywords.notifications.notify_email",
    },
    {
      keyword: "drunk",
      feature: "dmkeywords.features.all",
      notify: "dmkeywords.notifications.notify_email",
    },
    {
      keyword: "damn",
      feature: "dmkeywords.features.all",
      notify: "dmkeywords.notifications.notify_email",
    },
    {
      keyword: "babe",
      feature: "dmkeywords.features.all",
      notify: "dmkeywords.notifications.notify_email",
    },
    {
      keyword: "date with",
      feature: "dmkeywords.features.all",
      notify: "dmkeywords.notifications.notify_email",
    },
    {
      keyword: "dating",
      feature: "dmkeywords.features.facebook",
      notify: "dmkeywords.notifications.notify_email",
    },
    {
      keyword: "dating",
      feature: "dmkeywords.features.whatsapp",
      notify: "dmkeywords.notifications.notify_email",
    },
    {
      keyword: "dating",
      feature: "dmkeywords.features.snapchat",
      notify: "dmkeywords.notifications.notify_email",
    },
  ]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleAddRule = () => {
    if (keyword.trim()) {
      setAddedRules([
        { keyword, feature: selectedFeature, notify: notificationType },
        ...addedRules,
      ]);
      setKeyword("");
      setSelectedFeature("dmkeywords.features.all");
      setNotificationType("dmkeywords.notifications.notify_email");
    }
  };

  return (
    <>
      <header className="!mb-4 sm:!mb-6 !px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
          <div className="flex items-center !gap-2 sm:!gap-3">
            <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
              {t("dmkeywords.header.title")}{" "}
              <FaSearch className="text-[#0695c8]" />
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center !gap-2 sm:!gap-3">
            <span className="text-[10px] sm:text-xs text-orange-600 bg-orange-100 !px-3 sm:!px-4 !py-1.5 sm:!py-2 rounded-full font-medium">
              {t("dmkeywords.header.demo_message")}
            </span>
            <button
              onClick={handleOpen}
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[13px] !px-4 sm:!px-5 !py-1.5 sm:!py-2 rounded-full font-semibold shadow-md hover:shadow-xl transition-all hover:scale-105 whitespace-nowrap"
              aria-label={t("dmkeywords.header.bind_button_aria")}
            >
              {t("dmkeywords.header.bind_button")}
            </button>
          </div>
        </div>
      </header>
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
                fontSize: "0.8rem",
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
            <Tab label={t("dmkeywords.tabs.tracking_rules")} />
            <Tab label={t("dmkeywords.tabs.keywords_detected")} />
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
                className="!font-bold !text-gray-800 !mb-4 !text-[13px]"
              >
                {t("dmkeywords.add_rule.title")}
              </Typography>
              <Stack spacing={3}>
                <TextField
                  label={t("dmkeywords.add_rule.word_or_phrase")}
                  placeholder={t(
                    "dmkeywords.add_rule.word_or_phrase_placeholder"
                  )}
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
                  <InputLabel>
                    {t("dmkeywords.add_rule.select_features")}
                  </InputLabel>
                  <Select
                    value={selectedFeature}
                    onChange={(e) => setSelectedFeature(e.target.value)}
                    label={t("dmkeywords.add_rule.select_features")}
                    sx={{
                      borderRadius: "12px",
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    {features.map((f) => (
                      <MenuItem key={f} value={f}>
                        {t(f)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth size="small">
                  <InputLabel>
                    {t("dmkeywords.add_rule.notification_type")}
                  </InputLabel>
                  <Select
                    value={notificationType}
                    onChange={(e) => setNotificationType(e.target.value)}
                    label={t("dmkeywords.add_rule.notification_type")}
                    sx={{
                      borderRadius: "12px",
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    {notificationTypes.map((n) => (
                      <MenuItem key={n} value={n}>
                        {t(n)}
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
                  aria-label={t("dmkeywords.add_rule.add_button_aria")}
                >
                  {t("dmkeywords.add_rule.add_button")}
                </Button>
              </Stack>
            </Paper>

            {/* Added Rules */}
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
                className="!font-bold !text-gray-800 !mb-4 lg:!text-[14px] !text-[12px]"
              >
                {t("dmkeywords.added_rules.title")}
              </Typography>
              <TableContainer
                sx={{ maxHeight: 500 }}
                className="scrollbar-hide"
              >
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f9fafb" }}>
                      {[
                        "dmkeywords.added_rules.table.keywords",
                        "dmkeywords.added_rules.table.features",
                        "dmkeywords.added_rules.table.notification_type",
                      ].map((h) => (
                        <TableCell
                          className="!text-[12px] lg!text-[14px] truncate-text"
                          key={h}
                          sx={{
                            fontWeight: 600,
                            color: "#374151",
                            py: 2,
                            pl: 3,
                            pr: 3,
                            border: "none",
                          }}
                        >
                          {t(h)}
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
                            border: "none",
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
                          {t(rule.feature)}
                        </TableCell>
                        <TableCell
                          className="truncate-text"
                          sx={{
                            color: "#0695c8",
                            fontWeight: 500,
                            fontSize: "0.875rem",
                            border: "none",
                            py: 2.5,
                          }}
                        >
                          {t(rule.notify)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        ) : (
          /* === Keywords Detected === */
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
                    {[
                      "dmkeywords.detected.table.keywords",
                      "dmkeywords.detected.table.features",
                      "dmkeywords.detected.table.time",
                    ].map((h) => (
                      <TableCell
                        key={h}
                        sx={{
                          fontWeight: 600,
                          color: "#374151",
                          fontSize: "0.875rem",
                          py: 2.5,
                          pl:
                            h === "dmkeywords.detected.table.keywords" ? 4 : 3,
                          pr: h === "dmkeywords.detected.table.time" ? 4 : 3,
                          border: "none",
                        }}
                      >
                        {t(h)}
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
                        backgroundColor:
                          i % 2 === 0 ? "#fdfdfe" : "transparent",
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
                        {t(item.featureKey)}
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
      <BuyModal handleClose={handleClose} open={open} />
    </>
  );
};

export default Keywords;
