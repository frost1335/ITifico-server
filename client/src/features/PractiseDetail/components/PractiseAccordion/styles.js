// Mui custom styles for practise accordion
export const accordion = {
  background: "#FFFFFF",
  border: "2px solid #E2E7EB",
  borderRadius: "8px",
  overflow: "hidden",
  "&:before": {
    display: "none",
  },
  "&.practise__container": {
    ".MuiAccordionSummary-root": {
      padding: "0 30px",
      "& .MuiAccordionSummary-content": {
        margin: "24px 0 26px 0",
      },
      '&.Mui-expanded':{
        minHeight: 'unset'
      }
    },
    ".MuiAccordionDetails-root": {
      padding: "30px 0",
    },
    border: "none",
  },
  "&.practise__answer": {
    " .MuiAccordionSummary-root": {
      padding: "0 20px",
      "& .MuiAccordionSummary-content": {
        margin: "15px 0",
      },
    },
    ".MuiAccordionDetails-root": {
      padding: "20px 0 25px 0",
    },
  },
  "& .MuiPaper-root": {
    marginBottom: 50,
    "&:nth-last-of-type(2)": {
      marginBottom: 30,
    },
  },
};

export const accordionItem = {
  backgroundColor: "#FFFFFF",
  padding: "0 18px",
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: "#23262D",
    fontSize: 21.3,
    transform: "rotate(90deg)",
    "&.Mui-expanded": {
      transform: "rotate(270deg)",
    },
  },
  "& .MuiAccordionSummary-content": {
    margin: "15px 0",
  },
};

export const accordionDetail = {
  borderTop: "1px solid #E2E7EB",
  margin: "0 20px",
  padding: "14px 0 25px 0",
  background: "#FFFFFF",
};
