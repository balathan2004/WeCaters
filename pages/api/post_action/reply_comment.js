import { firestore } from "@/config";
import { getDoc, doc, updateDoc } from "firebase/firestore";

export default async function (req, res) {
  const { post_id, comment_id, comment, comment_user, comment_reply, time } =
    JSON.parse(req.body);
  console.log(req.body);

  const docRef = doc(firestore, "comment", post_id);
  const docData = (await getDoc(docRef)).data();

  const docComment = docData.comment.find(
    (file) => file.comment_id == comment_id
  );

  const otherComments = docData.comment.filter(
    (file) => file.comment_id != comment_id
  );
  console.log(otherComments);

  const replyData = {
    comment: comment,
    comment_id: comment_id,
    comment_user: comment_user,
    comment_reply: comment_reply,
    time: time,
  };

  if (docComment.hasReplies && docComment.hasReplies.length > 0) {
    docComment.hasReplies.push(replyData);
    otherComments.push(docComment);
    console.log(otherComments);
    await updateDoc(docRef, { comment: otherComments });
  } else {
    docComment.hasReplies = [];
    docComment.hasReplies.push(replyData);
    otherComments.push(docComment);
    console.log(otherComments);
    await updateDoc(docRef, { comment: otherComments });
  }

  res.json({ message: "comment added", authType: 200 });
}
