import * as yup from "yup"

export const contactFormSchema = yup.object().shape({
  parentName: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^[\d\s\-\(\)+]+$/, "Invalid phone number")
    .required("Phone number is required"),
  studentGrade: yup.string().required("Student grade is required"),
  message: yup
    .string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required")
})

export type ContactFormValues = yup.InferType<typeof contactFormSchema>
