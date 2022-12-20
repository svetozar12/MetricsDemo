import { Client } from "@elastic/elasticsearch";

export const client = new Client({
  node: "http://localhost:9200",
});

export const Index = "requestdata";

async function run() {
  await client.index({
    index: Index,
  });

  await client.indices.refresh({ index: Index });
}

run().catch(console.log);
