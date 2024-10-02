import { storage } from "../firebase_config";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";


interface props{
  file:File,
  path:string,
  fileName:string,
}

const uploadVideo=async({file, path, fileName}:props)=> {
  try {
    const storageRef = ref(storage, `${path}/${fileName}.mp4`);
    const uploadTask = await uploadBytesResumable(storageRef, file, {
      contentType: "video/mp4",
    });
    var imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
  } catch (e) {
    console.log(e);
    return ""
  }
}

export default uploadVideo
