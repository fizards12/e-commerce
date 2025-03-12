// Import necessary modules
import { AxiosError } from "axios";
import store from '../stores'; // Adjust the import path as necessary
import { showToastThunk } from '../stores/app/app'; // Adjust the import path as necessary
import { logoutThunk } from "../stores/auth/authThunks";

export class GeneralError extends Error {
  message: string;
  status?: number;
  details?:
    | { message?: string; error_type?: string; error?: unknown }
    | unknown;

  constructor(error: {
    message: string, status?: number, details?: unknown
  }) {
    super(error.message);
    this.message = error.message;
    this.status = error.status;
    this.details = error.details;
  }
}

export function extractError(error: unknown) : GeneralError {
  let generalError: GeneralError;

  if (error instanceof AxiosError) {
    // Handle Axios errors
    if (error.response) {
      // Server responded with a status other than 200 range
      generalError = new GeneralError({
        status: error.status,
        message:
          error.response.data?.message ||
          "Error: Server responded with an error.",
        details: error.response.data,
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
      generalError = new GeneralError({
        status: error.status,
        message: "Error: No response received from server.",
        details: error.request,
      });
    } else {
      // Something happened in setting up the request
      console.error("Request setup error:", error.message);
      generalError =  new GeneralError({
        status: error.status,
        message: error.message,
        details: error.config,
      });
    }
  } else if (error instanceof Error) {
    // Handle generic errors
    console.error("Generic error:", error.message);
    generalError =  new GeneralError({
      status: 500,
      message: error.message,
      details: error.stack,
    });
  } else {
    // Handle unknown errors
    console.error("Unknown error:", error);
    generalError = new GeneralError({
      status: 500,
      message: "An unknown error occurred.",
      details: error,
    });
  }

  
  return generalError;
}

// Define a general error handler function
export function handleError(error: unknown) {
  const dispatch = store.dispatch;
  const generatedError = extractError(error);
  if(generatedError.status == 401){
    dispatch(logoutThunk());
  }
  // Dispatch toast notification
  dispatch(showToastThunk({ message: generatedError.message, type: 'error', duration: 2000 }));
}
