import "reflect-metadata";
import { Types } from "mongoose";
import NotificationsFaker from "./notifications.faker";

describe("Notification faker", () => {
  it("Should return a notification random", () => {
    const notification = NotificationsFaker.get(
      new Types.ObjectId().toString(),
    );
    expect(notification).toHaveProperty("from");
    expect(notification).toHaveProperty("leyend");
    expect(notification).toHaveProperty("status");
    expect(notification).toHaveProperty("type");
    expect(notification).toHaveProperty("message");
    expect(notification).toHaveProperty("owner");
    expect(notification).toHaveProperty("idReference");
  });
});
