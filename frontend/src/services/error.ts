// Import necessary modules
import { AxiosError } from "axios";
import store from '../stores'; // Adjust the import path as necessary
import { showToastThunk } from '../stores/app/app'; // Adjust the import path as necessary

export interface GeneralError {
  message: string;
  status?: number;
  details?:
    | { message?: string; error_type?: string; error?: unknown }
    | unknown;
}

// Define a general error handler function
export function handleError(error: unknown): GeneralError {
  const dispatch = store.dispatch;
  let generalError: GeneralError;

  if (error instanceof AxiosError) {
    // Handle Axios errors
    if (error.response) {
      // Server responded with a status other than 200 range
      generalError = {
        status: error.status,
        message:
          error.response.data?.message ||
          "Error: Server responded with an error.",
        details: error.response.data,
      };
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
      generalError = {
        status: error.status,
        message: "Error: No response received from server.",
        details: error.request,
      };
    } else {
      // Something happened in setting up the request
      console.error("Request setup error:", error.message);
      generalError = {
        status: error.status,
        message: error.message,
        details: error.config,
      };
    }
  } else if (error instanceof Error) {
    // Handle generic errors
    console.error("Generic error:", error.message);
    generalError = {
      status: 500,
      message: error.message,
      details: error.stack,
    };
  } else {
    // Handle unknown errors
    console.error("Unknown error:", error);
    generalError = {
      status: 500,
      message: "An unknown error occurred.",
      details: error,
    };
  }

  // Dispatch toast notification
  dispatch(showToastThunk({ message: generalError.message, type: 'error', duration: 2000 }));

  return generalError;
}
