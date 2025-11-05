import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Collapse,
  Stack,
  IconButton,
  Paper,
} from "@mui/material";
import { FiPhone, FiMail, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { RiContactsBook2Fill } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import BuyModal from "../../components/buyModal/BuyModal";

// Sample Contacts Data
const contacts = [
  // Section A
  {
    id: 1,
    section: "A",
    name: "Aaron",
    number: "3327465723",
    email: "aaron@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    section: "A",
    name: "Alice",
    number: "3474652243",
    email: "alice@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    section: "A",
    name: "Allison",
    number: "3345678901",
    email: "allison@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: 4,
    section: "A",
    name: "Arya",
    number: "3367890123",
    email: "arya@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  // Section B
  {
    id: 5,
    section: "B",
    name: "Barry",
    number: "334247568",
    email: "barry@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: 6,
    section: "B",
    name: "Bob J",
    number: "3327465723",
    email: "bobj@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=20",
  },
  {
    id: 7,
    section: "B",
    name: "Brenda",
    number: "3474652243",
    email: "brenda@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=25",
  },
];

const ContactsPage = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  // Group by section
  const grouped = contacts.reduce((acc, contact) => {
    if (!acc[contact.section]) acc[contact.section] = [];
    acc[contact.section].push(contact);
    return acc;
  }, {});

  return (
    <>
      <header className="!mb-4 sm:!mb-6 !px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
          <div className="flex items-center !gap-2 sm:!gap-3">
            <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
              {t("dct.header.title")}{" "}
              <RiContactsBook2Fill className="text-[#0695c8]" />
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center !gap-2 sm:!gap-3">
            <span className="text-[10px] sm:text-xs text-orange-600 bg-orange-100 !px-3 sm:!px-4 !py-1.5 sm:!py-2 rounded-full font-medium">
              {t("dct.header.demo_message")}
            </span>
            <button
              onClick={handleOpen}
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[13px] !px-4 sm:!px-5 !py-1.5 sm:!py-2 rounded-full font-semibold shadow-md hover:shadow-xl transition-all hover:scale-105 whitespace-nowrap"
              aria-label={t("dct.header.bind_button_aria")}
            >
              {t("dct.header.bind_button")}
            </button>
          </div>
        </div>
      </header>
      <Box className="!p-6 !bg-gray-50">
        {Object.keys(grouped).map((section) => (
          <Box key={section} className="!mb-6">
            {/* Section Header */}
            <Box
              className="!sticky !top-0 !bg-gray-200 !text-gray-700 !font-bold !text-sm !py-2 !px-4 !z-10"
              sx={{ borderRadius: "8px 8px 0 0" }}
            >
              {section}
            </Box>

            {/* Contacts List */}
            <Box>
              {grouped[section].map((contact) => (
                <Box key={contact.id}>
                  {/* Contact Row */}
                  <Paper
                    elevation={0}
                    onClick={() => handleExpand(contact.id)}
                    className="!rounded-none !border-b !border-gray-200 !cursor-pointer !hover:!bg-gray-100 !transition-all"
                    sx={{ borderRadius: 0 }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      className="!px-4 !py-3"
                    >
                      <Stack direction="row" spacing={3} alignItems="center">
                        <Avatar
                          src={contact.avatar}
                          sx={{ width: 40, height: 40 }}
                          className="!ring-2 !ring-white"
                        />
                        <Typography
                          variant="body1"
                          className="!font-medium !text-gray-800"
                        >
                          {contact.name}
                        </Typography>
                      </Stack>

                      <IconButton
                        size="small"
                        className="!text-gray-500"
                        aria-label={t(
                          expanded === contact.id
                            ? "dct.contact.collapse"
                            : "dct.contact.expand"
                        )}
                      >
                        {expanded === contact.id ? (
                          <FiChevronUp />
                        ) : (
                          <FiChevronDown />
                        )}
                      </IconButton>
                    </Stack>
                  </Paper>

                  {/* Expandable Details */}
                  <Collapse in={expanded === contact.id}>
                    <Box className="!px-4 !py-3 !bg-white !border-b !border-gray-200">
                      <Stack spacing={2} className="!ml-12">
                        {/* Phone */}
                        <Paper
                          elevation={0}
                          className="!flex !items-center !gap-3 !bg-green-50 !border !border-green-200 !rounded-xl !px-4 !py-2 !w-fit"
                        >
                          <div className="!w-8 !h-8 !rounded-full !bg-green-500 !flex !items-center !justify-center">
                            <FiPhone className="!text-white !text-sm" />
                          </div>
                          <Box>
                            <Typography className="!text-xs !text-gray-600">
                              {t("dct.contact.number")}
                            </Typography>
                            <Typography className="!font-mono !text-sm !text-gray-800">
                              {contact.number}
                            </Typography>
                          </Box>
                        </Paper>

                        {/* Email */}
                        <Paper
                          elevation={0}
                          className="!flex !items-center !gap-3 !bg-blue-50 !border !border-blue-200 !rounded-xl !px-4 !py-2 !w-fit"
                        >
                          <div className="!w-8 !h-8 !rounded-full !bg-blue-500 !flex !items-center !justify-center">
                            <FiMail className="!text-white !text-sm" />
                          </div>
                          <Box>
                            <Typography className="!text-xs !text-gray-600">
                              {t("dct.contact.email")}
                            </Typography>
                            <Typography className="!text-sm !text-gray-800">
                              {contact.email}
                            </Typography>
                          </Box>
                        </Paper>
                      </Stack>
                    </Box>
                  </Collapse>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      <BuyModal handleClose={handleClose} open={open} />
    </>
  );
};

export default ContactsPage;
