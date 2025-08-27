// src/firebase/helpers/appwriteHelper.js
import { uploadResumePDF } from "../firebase/helpers/appwriteHelper";

export async function saveResumeToAppwrite(file) {
    if (!file) {
        throw new Error("No file provided for upload.");
    }

    try {
        const response = await uploadResumePDF(file);

        if (!response || !response.$id) {
            throw new Error("Invalid response from Appwrite upload.");
        }

        return response.$id; // Return file ID for reference
    } catch (error) {
        console.error("Appwrite file upload failed:", error);
        throw error;
    }
}

