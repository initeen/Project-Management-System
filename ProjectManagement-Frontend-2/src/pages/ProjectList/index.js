import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  withStyles,
  makeStyles,
} from "@material-ui/core";
import CompactSearchInput from './CompactSearchInput'
import { getAPICall, putAPICall } from 'utils/api';
import { format } from 'date-fns';



const styles = {};

const useStyles = makeStyles((theme) => ({
  buttonChip: {
    minWidth: 0,
    padding: "6px 12px",
    borderRadius: "20px",
    textTransform: "none",
    margin: "0 5px",
    minWidth: "40px",
    //   backgroundColor: theme.palette.grey[300],
    //   '&:hover': {
    //     backgroundColor: theme.palette.grey[400],
    //   },
  },
  tableCell: {
    padding: "8px", // Adjust padding as needed
    textAlign: "center",
  },
  projectTheme: {
    padding: "8px", // Adjust padding as needed
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
  },
  compactTextField: {
    "& .MuiInputBase-root": {
      padding: "8px 12px", // Adjust padding as needed
      fontSize: "0.875rem", // Adjust font size as needed
    },
    // "& .MuiInputLabel-shrink": {
    //   transform: "translate(10px, -3px) scale(0.75)", // Adjust label position for compact size
    // },
  },
}));

const ProjectList = () => {
  // Sample data for the table (Replace this with your actual data)
  const [projects, setProjects] = useState([]);
  const classes = useStyles();

  const fetchProjects = async () => {
    const pro = await getAPICall('/projects');
    setProjects(pro?.data || []);
  }


  useEffect(() => {
    fetchProjects()
  }, []);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Sorting state
  const [sortBy, setSortBy] = useState("priority"); // Default sorting by project projectTheme
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order
  const [searchQuery, setSearchQuery] = useState("");

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle sorting change
  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortBy(value);
    setSortOrder("asc"); // Default ascending for project projectTheme, descending for others
  };

  const handleAction = async (status, project) => {
    // Replace this with your actual logic to handle the actions (Start, Close, Cancel) based on the project ID.
    // console.log(`Performing ${action} action on project with ID ${projectId}`);

    const newData = {
      ...project,
      status,
    };
    await putAPICall(`/project/${project.projectId}`, newData)
    fetchProjects();
  };

  const [tableData, setTableData] = useState(projects);
  const [paginatedData, setPaginatedData] = useState(projects);

  const handleSearchSortingPagination = () => {
    const filteredPro = projects
      .filter((project) => {
        const lowerCasedQuery = searchQuery.trim().toLowerCase();
        return (
          project.projectTheme.toLowerCase().includes(lowerCasedQuery) ||
          project.reason.toLowerCase().includes(lowerCasedQuery) ||
          project.type.toLowerCase().includes(lowerCasedQuery) ||
          project.division.toLowerCase().includes(lowerCasedQuery) ||
          project.category.toLowerCase().includes(lowerCasedQuery) ||
          project.priority.toLowerCase().includes(lowerCasedQuery) ||
          project.department.toLowerCase().includes(lowerCasedQuery) ||
          project.location.toLowerCase().includes(lowerCasedQuery) ||
          project.status.toLowerCase().includes(lowerCasedQuery)
        );
      })
      .sort((a, b) => {
        const compareResult =
          sortOrder === "asc"
            ? a[sortBy].localeCompare(b[sortBy])
            : b[sortBy].localeCompare(a[sortBy]);
        return compareResult;
      });
    setPaginatedData(filteredPro);
    const newPro = filteredPro.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    setTableData(newPro);
  };

  useEffect(() => {
    handleSearchSortingPagination();
  }, [searchQuery, projects, sortBy, sortOrder, page, rowsPerPage]);

  const getFormatedDate = (date) => {
    const originalDate = new Date(date);
    return format(originalDate, 'MMMM-dd, yyyy');
  };

  return (
    <Paper>
      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        {/* Search input */}
        {/* <TextField
          label="Search"
          variant="outlined"
          className={classes.compactTextField}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        /> */}
        <CompactSearchInput value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} />
        {/* Sort by dropdown */}
        <FormControl variant="outlined">
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} onChange={handleSortChange} label="Sort By">
          <MenuItem value="priority">Priority</MenuItem>
          <MenuItem value="category">Category</MenuItem>
            <MenuItem value="reason">Reason</MenuItem>
            <MenuItem value="division">Division</MenuItem>
            <MenuItem value="department">Department</MenuItem>
            <MenuItem value="location">Location</MenuItem>
            {/* Add more columns for sorting here... */}
          </Select>
        </FormControl>
      </div>
      <TableContainer>
        <Table style={{ padding: "8px" }}>
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Division</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Dept.</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((projectDate) => {
              const { projectId, startDate, endDate, projectTheme, ...project } = projectDate;
              return (
                <TableRow key={projectId}>
                  <TableCell key={projectId} className={classes.projectTheme}>
                    <b>{projectTheme}</b>
                    {getFormatedDate(startDate)} to {getFormatedDate(endDate)}
                  </TableCell>
                  {Object.values(project).map((value, index) => (
                    <TableCell key={index} className={classes.tableCell}>
                      {value}
                    </TableCell>
                  ))}
                  <TableCell className={classes.tableCell}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.buttonChip}
                      onClick={() => handleAction("Running", projectDate)}
                    >
                      Start
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.buttonChip}
                      onClick={() => handleAction("Closed", projectDate)}
                    >
                      Close
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.buttonChip}
                      onClick={() => handleAction("Cancelled", projectDate)}
                    >
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {tableData.length === 0 && (
        <Typography
          variant="body2"
          style={{ margin: "20px 0" }}
          color="textSecondary"
          align="center"
        >
          No matching projects found.
        </Typography>
      )}
      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={paginatedData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ textAlign: 'center' }}
        showFirstButton
        showLastButton
      />
    </Paper>
  );
};

export default ProjectList;
