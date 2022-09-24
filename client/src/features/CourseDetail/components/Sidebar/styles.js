// Mui custom styles for sidebar accordion
export const accordion = {
  "&": {
    width: "100%",
  },
  background: "#FFFFFF",
  "& .MuiButtonBase-root.Mui-expended": {
    background: "#E36F59",
  },
  "&:before": {
    display: "none",
  },
  overflow: "hidden",
  "&:first-of-type .MuiAccordionSummary-content": {
    borderTop: "none",
  },
  "&  .MuiTypography-root": {
    lineHeight: "18px",
    fontWeight: 600,
    fontSize: "16px",
    "& .menu__num": {
      fontWeight: 600,
      color: "#E36F59",
      marginRight: 8,
    },
  },
  "& .MuiAccordionSummary-root.Mui-expanded": {
    "& .MuiTypography-root": {
      color: "#fff",
      "&::before": {
        color: "#fff",
      },
    },
  },
  "& .MuiAccordionDetails-root": {
    padding: 0,
  },

  "&.menu-sidebar-list": {
    border: "2px solid #E2E7EB",
    borderRadius: "8px",
    "& > .MuiAccordionSummary-root": {
      background: "#fff",
      ".MuiTypography-root": {
        color: "#23262D",
        fontSize: 18,
        fontFamily: "Bitter",
      },
      ".MuiAccordionSummary-content": {
        padding: "16px 0",
      },
      " .MuiAccordionSummary-expandIconWrapper": {
        display: "flex",
        alignItems: "center",
        transform: "rotate(90deg)",
        "&.Mui-expanded": {
          transform: "rotate(270deg)",
        },
      },
    },
  },
};

export const accordionItem = {
  padding: "0 15px",
  backgroundColor: "#fff",
  border: "none",
  "& .MuiAccordionSummary-expandIconWrapper": {
    display: "none",
  },
  "& .MuiAccordionSummary-content": {
    padding: "20px 0 23px 0",
    margin: 0,
    "&.Mui-expanded": {
      border: "none",
    },
  },
};
