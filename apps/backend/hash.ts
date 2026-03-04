import * as bcrypt from "bcrypt";

async function run() {
  const password = "123456";
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  console.log("HASH_START");
  console.log(hash);
  console.log("HASH_END");
}

run();
