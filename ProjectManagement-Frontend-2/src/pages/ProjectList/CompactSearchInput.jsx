import React from "react";
import { InputBase, withStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const styles = {
  compactSearchInput: {
    padding: "4px 12px", // Adjust padding as needed
    fontSize: "0.875rem", // Adjust font size as needed
    display: "flex",
    alignItems: "center",
    width: 150, // Adjust the width as needed
    backgroundColor: "#f5f5f5", // Set a background color for a cleaner appearance
    borderRadius: 10, // Add border radius for rounded corners
    borderBottom: '2px solid #ccc',
  },
  searchIcon: {
    marginRight: 8, // Add spacing between the search icon and the input text
    color: "#888", // Set the color of the search icon
  },
};

const CompactSearchInput = ({ classes, placeholder, value, onChange }) => {
  return (
    <div className={classes.compactSearchInput}>
      <SearchIcon className={classes.searchIcon} />
      <InputBase
        placeholder={placeholder}
        fullWidth
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default withStyles(styles)(CompactSearchInput);
