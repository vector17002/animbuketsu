import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: "https://able-grizzly-50251.upstash.io",
  token: "AcRLAAIncDE4N2JjYjQ3NWJmMGY0ODZmOWFlNjVhMTdkNmMxNzQ4MnAxNTAyNTE"
})

export default redis