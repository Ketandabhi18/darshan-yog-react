import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Print } from "@mui/icons-material";

interface ProgramScheduleProps {
  items: Array<{
    avatarLabel: string;
    title: string;
    subheader: string;
    imageSrc: string;
    content: string;
    expandContent: string;
  }>;
  itemsPerPage: number;
}

const ProgramScheduleCard: React.FC<ProgramScheduleProps> = ({
  items,
  itemsPerPage,
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [expanded, setExpanded] = React.useState(
    Array(paginatedItems.length).fill(false)
  );

  const handleExpandClick = (index: number) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  const calculateVisiblePages = () => {
    const visiblePages = [];
    const totalVisible = 5;

    let startPage = Math.max(1, currentPage - Math.floor(totalVisible / 2));
    let endPage = Math.min(totalPages, startPage + totalVisible - 1);

    if (endPage - startPage < totalVisible - 1) {
      startPage = Math.max(1, endPage - totalVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  const visiblePages = calculateVisiblePages();

  return (
    <div>
      {paginatedItems.map((item, index) => (
        <Card key={index} style={{ paddingTop: "1%", marginTop: "1%" }}>
          <CardHeader
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={item.title}
            subheader={item.subheader}
          />
          <div style={{ justifyContent: "center", overflow: "auto" }}>
            <img
              style={{ height: "300px", display: "block", margin: "auto" }}
              src={item.imageSrc}
              alt={item.title}
            />
          </div>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {item.content}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <Print />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <Button
              onClick={() => handleExpandClick(index)}
              variant="outlined"
              size="small"
              style={{ marginLeft: "auto" }}
            >
              {expanded[index] ? "Read Less" : "Read More"}
            </Button>
          </CardActions>
          <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
            <CardContent>{item?.expandContent}</CardContent>
          </Collapse>
        </Card>
      ))}

      {/* Dynamic Pagination Controls */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <IconButton onClick={handleFirstPage} disabled={currentPage === 1}>
          <FirstPageIcon />
        </IconButton>
        <IconButton onClick={handlePreviousPage} disabled={currentPage === 1}>
          <KeyboardArrowLeft />
        </IconButton>
        {visiblePages.map((page, index) => (
          <Button
            key={index}
            onClick={() => handlePageChange(page)}
            variant={currentPage === page ? "contained" : "outlined"}
            style={{ margin: "5px" }}
          >
            {page}
          </Button>
        ))}
        <IconButton
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
        >
          <LastPageIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ProgramScheduleCard;
