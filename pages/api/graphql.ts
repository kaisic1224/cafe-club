import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse, PageConfig } from "next";
import { createContext } from "../../graphql/context";
import { resolvers } from "../../graphql/resolvers";
import { typeDefs } from "../../graphql/schema";

const apolloserver = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext
});

const startServer = apolloserver.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;

  await apolloserver.createHandler({
    path: "/api/graphql"
  })(req, res);
}

export const config: PageConfig = {
  api: {
    bodyParser: false
  }
};
