import { Button, Container } from "@mui/material";
import React from "react";
import ModalCourses from "../Modal/Modal";

const Content = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="courses__list">
      <Container maxWidth="sm">
        <Button onClick={handleOpen}>Open modal</Button>
        <ModalCourses handleClose={handleClose} open={open} />
      </Container>
    </div>
  );
};

export default Content;
