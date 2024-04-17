import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../App.css";
import { TextField, Button } from "@mui/material";

type Education = {
  schoolName: string;
  degree: string;
  description?: string;
  startDate: string;
  endDate?: string;
};

type FormData = {
  name: string;
  email: string;
  age?: number;
  educations: Education[];
};

const schema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  email: yup
    .string()
    .required("Email is a required field")
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email"),
  age: yup.number().typeError("Age must be a number"),
  educations: yup.array().of(
    yup
      .object()
      .shape({
        schoolName: yup.string().required("School name is required"),
        degree: yup.string().required("Degree is required"),
        description: yup.string(),
        startDate: yup.string().required("Start date is required"),
        endDate: yup.string().when("startDate", (startDate, schema) => {
          return schema.test({
            name: "endDate",
            exclusive: true,
            message: "End date must be greater than start date",
            test: (endDate) => {
              if (!startDate) return true; // Skip validation if startDate is not provided
              const startDateValue = new Date(startDate).getTime();
              const endDateValue = endDate ? new Date(endDate).getTime() : null;
              return !endDateValue || endDateValue > startDateValue;
            },
          });
        }),
      })
      .required("At least one education entry required")
  ),
});

export const ReactHookForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form
      style={{
        border: "solid",
        borderColor: "#0c5930",
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <label style={{ color: "#0C5930", fontWeight: 600 }}>STUDENT FORM</label>
      <div className="form-field" style={{ height: 268 }}>
        <TextField
          id="name"
          label="Name"
          className="form-text-field-width"
          error={!!errors.name}
          helperText={errors.name?.message}
          {...register("name")}
        />
        <TextField
          id="email"
          label="Email"
          className="form-text-field-width"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email")}
        />
        <TextField
          id="age"
          label="Age"
          className="form-text-field-width"
          type="number"
          error={!!errors.age}
          helperText={errors.age?.message}
          {...register("age")}
        />
      </div>
      <div style={{ textAlign: "start", marginTop: 8, marginBottom: 16 }}>
        <label>Educations</label>
        {[...Array(1)].map((_, index) => (
          <div
            key={index}
            className="form-field form-text-field-width"
            style={{ height: 425 }}
          >
            <TextField
              id={`educations[${index}].schoolName`}
              label="School Name"
              error={!!errors.educations?.[index]?.schoolName}
              helperText={errors.educations?.[index]?.schoolName?.message}
              {...register(`educations[${index}].schoolName` as keyof FormData)}
            />
            <TextField
              id={`educations[${index}].degree`}
              label="Degree"
              error={!!errors.educations?.[index]?.degree}
              helperText={errors.educations?.[index]?.degree?.message}
              {...register(`educations[${index}].degree` as keyof FormData)}
            />
            <TextField
              id={`educations[${index}].description`}
              label="Description (optional)"
              error={!!errors.educations?.[index]?.description}
              helperText={errors.educations?.[index]?.description?.message}
              {...register(
                `educations[${index}].description` as keyof FormData
              )}
            />
            <TextField
              id={`educations[${index}].startDate`}
              label="Start Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.educations?.[index]?.startDate}
              helperText={errors.educations?.[index]?.startDate?.message}
              {...register(`educations[${index}].startDate` as keyof FormData)}
            />
            <TextField
              id={`educations[${index}].endDate`}
              label="End Date (optional)"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.educations?.[index]?.endDate}
              helperText={errors.educations?.[index]?.endDate?.message}
              {...register(`educations[${index}].endDate` as keyof FormData)}
            />
          </div>
        ))}
        {errors.educations && (
          <p className="error-message">{errors.educations.message}</p>
        )}
      </div>
      <Button
        disabled={!isValid}
        type="submit"
        variant="contained"
        style={
          !isValid
            ? {
                backgroundColor: "#0C5930",
                opacity: 0.6,
                color: "white",
                width: "30%",
              }
            : {
                backgroundColor: "#0C5930",
                width: "30%",
              }
        }
      >
        Submit
      </Button>
    </form>
  );
};
