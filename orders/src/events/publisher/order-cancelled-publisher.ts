import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from "@summerivetickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
