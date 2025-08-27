import { Client, Storage, ID } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT) // Example: 'https://cloud.appwrite.io/v1'
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);

const storage = new Storage(client);

export const uploadResumePDF = async (file) => {
  if (!file || file.type !== "application/pdf") {
    throw new Error("Only PDF files are allowed");
  }

  try {
    const result = await storage.createFile(
      process.env.REACT_APP_APPWRITE_BUCKET_ID, // bucket where you store resumes
      ID.unique(),
      file
    );
    return result;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};
