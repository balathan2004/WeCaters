import sendMailToAdmin from "@/components/server/mailer";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseConfig } from "@/components/interfaces/shared";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) {
  try {
    const { report } = JSON.parse(req.body);

    if (report) {
      await sendMailToAdmin({ report });

      res.json({ message: "your report has been sent", status: 200 });
    }
  } catch (err) {
    res.json({ message: "Server error", status:400 });
  }
}
