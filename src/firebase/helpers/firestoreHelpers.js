// src/firestoreHelpers.js
import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';


// Reference to the "jobApplications" collection
const jobCollection = collection(db, 'jobApplications');

// Save a new job application
export const saveJobApplication = async (formData, resumeId) => {
  try {
    // Remove the 'resume' file object from the form data
    const { resume, ...dataWithoutResume } = formData;

    // Build the object without undefined values and add submission date
    const finalData = {
      ...dataWithoutResume,
      ...(resumeId ? { resumeId } : {}), // only include if resumeId exists
      submissionDate: new Date().toISOString().split("T")[0], // YYYY-MM-DD format
    };

    // Save to Firestore
    const docRef = await addDoc(jobCollection, finalData);

    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};





// Get all job applications
export const getAllApplications = async () => {
  try {
    const snapshot = await getDocs(jobCollection);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return data;
  } catch (e) {
    console.error("Error fetching documents: ", e);
    throw e;
  }
};


export const deleteApplication = async (id) => {
  const docRef = doc(db, 'jobApplications', id);
  await deleteDoc(docRef);
};



export const updateApplication = async (id, updatedData) => {
  const docRef = doc(db, 'jobApplications', id);
  await updateDoc(docRef, updatedData);
};

