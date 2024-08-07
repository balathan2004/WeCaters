import { Interface } from "readline";
import { storage,app } from "../firebase_config";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";


interface props{
  file:File,
  path:string,
  fileName:string,
}

const uploadImage=async({file, path, fileName}:props)=> {
  try {
    const storageRef = ref(storage, `${path}/${fileName}.jpg`);
    const uploadTask = await uploadBytesResumable(storageRef, file, {
      contentType: "image/jpeg",
    });
    var imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
  } catch (e) {
    console.log(e);
    return ""
  }
}

export default uploadImage
