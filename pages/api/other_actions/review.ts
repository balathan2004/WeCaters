import {
  ResponseConfig,
  reviewInterface,
} from "./../../../components/interfaces/shared";
import { NextApiRequest, NextApiResponse } from "next";
import { firestore_admin } from "@/config/firebase_admin";
import { FieldValue } from "firebase-admin/firestore";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) {
  const { from, to, rating } = JSON.parse(req.body);
  console.log(req.body)
  const batch = firestore_admin.batch();
  const reviewGiver = from;
  const reviewAccepter = to;
  try {
    const reviewGiverDocRef = firestore_admin
      .collection("personal_account_meta")
      .doc(reviewGiver);
    const reviewAccepterDocRef = firestore_admin
      .collection("professional_account_meta")
      .doc(reviewAccepter);
    const reviewGiverSnap = await reviewGiverDocRef.get();
    const reviewAccepterSnap = await reviewAccepterDocRef.get();

    const alreadyFromReview =
      reviewGiverSnap.data()?.reviews?.some((review: reviewInterface) => {
        review.to === reviewGiver;
      }) || false;
    const alreadyToReview =
      reviewAccepterSnap.data()?.reviews?.some((review: reviewInterface) => {
        review.from === reviewAccepter;
      }) || false;

    console.log("already from and to", alreadyFromReview, alreadyToReview);
    console.log("review",reviewGiverSnap.data(), reviewAccepterSnap.data())
    if (reviewGiverSnap.exists && reviewAccepterSnap.exists) {
      if (!alreadyFromReview && !alreadyToReview) {
        batch.update(reviewAccepterDocRef, {
          reviews: FieldValue.arrayUnion({
            from: reviewGiver,
            rating: rating,
          }),
        });
        batch.update(reviewGiverDocRef, {
          reviews: FieldValue.arrayUnion({ to: reviewAccepter, rating: rating }),
        });
        await batch.commit();

      }
      res.json({ status: 200, message: "review added" });
    }else{
        res.json({ status: 300, message: "review isnt added" });
    }

 
  } catch (err) {
    console.log(err);
    res.json({ status: 300, message: "review isnt added" });
  }
}
