import React, { useState } from "react";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Paper,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { getAPICall, postAPICall } from 'utils/api';
import { useHistory } from "react-router-dom";

const typeOptions = ["External", "Internal", "Vendor"];
const divisionOptions = [
  "Filters",
  "Strategic",
  "Budget",
  "Departmental",
  "Size",
];
const priorityOptions = ["High", "Medium", "Low"];
const deptOptions = ["Stratergy", "Finance", "Quality", "HR", "STO"];
const locationOptions = ["Pune", "Mumbai", "Nagpur", "Delhi", "Hydrabad"];
const catgoryOptions = ["Quality A", "Quality B", "Quality C", "Quality D"];
const reasonOptions = [
  "For Business",
  "For Development",
  "For Marketing",
  "For Restructuring",
];

const ProjectForm = () => {
 
  const history = useHistory();
  const [formData, setFormData] = useState({
    projectTheme: "",
    reason: "",
    type: "",
    division: "",
    category: "",
    priority: "",
    department: "",
    startDate: null,
    endDate: null,
    location: "",
  });

  
  const [formErrors, setFormErrors] = useState({
    projectTheme: false,
    reason: false,
    type: false,
    division: false,
    category: false,
    priority: false,
    department: false,
    startDate: false,
    endDate: false,
    location: false,
  });

 
  const handleSubmit = async (event) => {
    event.preventDefault();

    
    const requiredFields = [
      "projectTheme",
      "reason",
      "type",
      "division",
      "category",
      "priority",
      "department",
      "startDate",
      "endDate",
      "location",
    ];


    const hasErrors = requiredFields.some((field) => !formData[field]);

    
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      projectTheme: !formData.projectTheme,
      reason: !formData.reason,
      type: !formData.type,
      division: !formData.division,
      category: !formData.category,
      priority: !formData.priority,
      department: !formData.department,
      startDate: !formData.startDate,
      endDate: !formData.endDate,
      location: !formData.location,
    }));

    if (!hasErrors) {
      
      const payload = {
        ...formData,
        status: "Registered",
      }
      await postAPICall("/project", payload);
      history.push("/project/list");
    }
  };

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const renderSelectInput = ({ label, name, options }) => {
    return (
      <FormControl fullWidth variant="outlined">
        <InputLabel>{label}</InputLabel>
        <Select
          label={label}
          name={name}
          value={formData?.[name]}
          onChange={handleChange}
          error={formErrors?.[name]}
        >
          {options.map((type) => {
            return <MenuItem value={type}>{type}</MenuItem>;
          })}
        </Select>
      </FormControl>
    );
  };

  const disablePastDates = (date) => {
    
    if (!formData.startDate) {
      return false;
    }
    return date < new Date(formData.startDate);
  };
  const disablePastStartDates = (date) => {

  
    if (!formData.endDate) {
      return false;
    }
    return date > new Date(formData.endDate);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Paper style={{ padding: "30px 20px" }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            
            <TextField
              label="Project Theme"
              multiline
              rows={2} 
              fullWidth
              variant="outlined"
              name="projectTheme"
              value={formData.projectTheme}
              onChange={handleChange}
              error={formErrors.projectTheme}
              helperText={formErrors.projectTheme && "Project Theme is required"}
              autoFocus
            />
          </Grid>

          <Grid style={{ display: "flex" }} item xs={12} sm={6}>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <Button type="submit" variant="contained" color="primary" style={{ borderRadius: '20px' }} fullWidth>
                Save Project
              </Button>
            </Grid>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            {renderSelectInput({
              label: "Reason",
              name: "reason",
              options: reasonOptions,
            })}
          </Grid>
          {/* Type */}
          <Grid item xs={12} sm={4}>
            {renderSelectInput({
              label: "Type",
              name: "type",
              options: typeOptions,
            })}
          </Grid>

          <Grid item xs={12} sm={4}>
            {renderSelectInput({
              label: "Division",
              name: "division",
              options: divisionOptions,
            })}
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* Category */}
            {renderSelectInput({
              label: "Category",
              name: "category",
              options: catgoryOptions,
            })}
          </Grid>

          <Grid item xs={12} sm={4}>
            {/* Priority */}
            {renderSelectInput({
              label: "Priority",
              name: "priority",
              options: priorityOptions,
            })}
          </Grid>

          <Grid item xs={12} sm={4}>
            {/* Department */}
            {renderSelectInput({
              label: "Department",
              name: "department",
              options: deptOptions,
            })}
          </Grid>

          <Grid item xs={12} sm={4}>
            {/* Start Date */}
            <KeyboardDatePicker
              label="Start Date"
              format="dd/MM/yyyy"
              fullWidth
              autoOk
              variant="inline"
              inputVariant="outlined"
              name="startDate"
              shouldDisableDate={disablePastStartDates}
              value={formData?.startDate?.toString() || null}
              onChange={(date) =>
                handleChange({ target: { value: date, name: "startDate" } })
              }
              error={formErrors.startDate}
              helperText={formErrors.startDate && "Start Date is required"}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            {/* End Date */}
            <KeyboardDatePicker
              label="End Date"
              format="dd/MM/yyyy"
              shouldDisableDate={disablePastDates}
              fullWidth
              autoOk
              variant="inline"
              inputVariant="outlined"
              name="endDate"
              value={formData?.endDate?.toString() || null}
              onChange={(date) =>
                handleChange({ target: { value: date, name: "endDate" } })
              }
              error={formErrors.endDate}
              helperText={formErrors.endDate && "End Date is required"}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            {/* Location */}
            {renderSelectInput({
              label: "Location",
              name: "location",
              options: locationOptions,
            })}
          </Grid>
          <Grid item xs={12} sm={8}></Grid>
          <Grid
            item
            xs={12}
            sm={4}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Typography variant="h7" style={{ marginTop: "3px" }}>
              Status:
            </Typography>
            <Typography variant="h6" style={{ marginLeft: "9px" }}>
              <b>Registered</b>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default ProjectForm;
