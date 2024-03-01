import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from "@summerivetickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
