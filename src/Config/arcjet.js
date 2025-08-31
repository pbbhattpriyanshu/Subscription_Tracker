import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "DRY_RUN"}),
    detectBot({
      mode: "DRY_RUN",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "CATEGORY:MONITOR", // Allow uptime monitors
        "CATEGORY:PREVIEW", // Allow link previews
        "UA:Mozilla",
        "UA:PostmanRuntime/7.45.0", // <-- Add this for Postman
      ],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5, // Refill 5 tokens per interval
      interval: 30, // Refill every 30 seconds
      capacity: 10, // Bucket capacity of 10 tokens
    }),
  ],
});

export default aj;
