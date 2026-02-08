import { isSpoofedBot } from "@arcjet/inspect";
import { aj } from "../lib/arcjet.js";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res
          .status(429)
          .json({ message: "Too Many Requests. Please try again later!" });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ message: "No bots allowed" });
      } else {
        res.status(403).json({ message: "Forbidden" });
      }
    } else if (decision.ip.isHosting()) {
      res.status(403).json({ message: "Forbidden" });
    } else if (decision.results.some(isSpoofedBot)) {
      res.status(403).json({
        error: "Spoofed Bot detected",
        message: "ForbMalicious bot activity detected",
      });
    }
    next();
  } catch (err) {
    console.log("Arcjet Protection Error : ", err);
    next();
  }
};
