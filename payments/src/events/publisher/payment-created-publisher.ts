import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from "@summerivetickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
