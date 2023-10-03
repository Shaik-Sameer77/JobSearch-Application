import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Input,
  Box,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name cannot exceed 30 characters")
    .matches(/^[^\s].*$/, "Name cannot start with a space")
    .matches(/^[A-Za-z\s]+$/, "Symbols and numbers are not allowed in Name"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .matches(/^[^\s].*$/, "Email cannot start with a space"),
  coverLetter: yup
    .string()
    .required("Cover Letter is required")
    .min(50, "Cover Letter must be at least 50 characters")
    .max(300, "Cover Letter cannot exceed 300 characters")
    .matches(/^[^\s].*$/, "Cover Letter cannot start with a space"),
});

const Form = ({ open, onClose, onSubmit }) => {
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Apply for the Job</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            required
            size="small"
            margin="normal"
            {...register("name")}
          />
          {errors.name && (
            <Typography variant="caption" color="error">
              {errors.name.message}
            </Typography>
          )}
          <TextField
            label="Email"
            name="email"
            fullWidth
            required
            size="small"
            type="email"
            margin="normal"
            {...register("email")}
          />
          {errors.email && (
            <Typography variant="caption" color="error">
              {errors.email.message}
            </Typography>
          )}
          <TextField
            label="Cover Letter Note"
            name="coverLetter"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            {...register("coverLetter")}
          />
          {errors.coverLetter && (
            <Typography variant="caption" color="error">
              {errors.coverLetter.message}
            </Typography>
          )}
          <FormControl fullWidth>
            <Input
              id="resume-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              required
              onChange={handleFileChange}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Submit Application
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Form;
