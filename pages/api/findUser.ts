import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  // grab userid from query

  // decode it back to utf-8 string
  const dbUserId = Buffer.from(userId as string, "base64").toString();

  // perform query to find relation that has this id
  const dbUser = await prisma.user.findFirst({
    where: { id: dbUserId }
  });

  return res.status(200).json(dbUser);
}
