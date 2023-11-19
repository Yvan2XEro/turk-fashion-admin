import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

const uploadImageToFirebase = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `images/${v4()}${file.name}`);
    try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    } catch (error: any) {
        console.error('Erreur lors de l\'upload de l\'image :', error.message);
        throw error;
    }
};

export { uploadImageToFirebase }