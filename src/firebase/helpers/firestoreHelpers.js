// src/firestoreHelpers.js
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
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


//Jobs Collection

const jobsCollection = collection(db, "jobs");

export const getJobsByType = async (jobType) => {
  try {
    const q = query(jobsCollection, where("jobType", "==", jobType));
    const querySnapshot = await getDocs(q);

    const jobs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return jobs;
  } catch (error) {
    console.error("Error retrieving jobs:", error);
    throw error;
  }
};


// ✅ Find a job document by jobId
const getJobDocByJobId = async (jobId) => {
  try {
    const q = query(jobsCollection, where("jobId", "==", jobId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log(`No job found with jobId: ${jobId}`);
      return null;
    }

    // Assuming jobId is unique, take the first document
    const docSnap = querySnapshot.docs[0];
    return docSnap;
  } catch (error) {
    console.error("Error finding job by jobId:", error);
    throw error;
  }
};

// ✅ Find and return job data by jobId
export const findJobByJobId = async (jobId) => {
  const jobDoc = await getJobDocByJobId(jobId);
  if (!jobDoc) return null;
  return { id: jobDoc.id, ...jobDoc.data() };
};

// ✅ Delete job by jobId
export const deleteJobByJobId = async (jobId) => {
  const jobDoc = await getJobDocByJobId(jobId);
  if (!jobDoc) {
    throw new Error(`Job with jobId ${jobId} not found.`);
  }
  await deleteDoc(doc(db, "jobs", jobDoc.id));
  console.log(`Job with jobId ${jobId} deleted successfully.`);
};

// ✅ Update job by jobId
export const updateJobByJobId = async (jobId, updatedData) => {
  const jobDoc = await getJobDocByJobId(jobId);
  if (!jobDoc) {
    throw new Error(`Job with jobId ${jobId} not found.`);
  }
  await updateDoc(doc(db, "jobs", jobDoc.id), updatedData);
  console.log(`Job with jobId ${jobId} updated successfully.`);
};

// ✅ Example method: get all jobs by jobFunction
export const getJobsByFunction = async (jobFunction) => {
  try {
    const q = query(jobsCollection, where("jobFunction", "==", jobFunction));
    const querySnapshot = await getDocs(q);

    const jobs = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));

    return jobs;
  } catch (error) {
    console.error("Error retrieving jobs by function:", error);
    throw error;
  }
};