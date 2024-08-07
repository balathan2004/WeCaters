import { firestore } from "@/config";
import { getDoc, updateDoc, doc, collection, addDoc } from "firebase/firestore";
export default function (req, res) {
  const commentData = JSON.parse(req.body);
}
