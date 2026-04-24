package com.example.payments.payments;

import com.example.payments.payments.api.AuthorizePaymentRequest;
import com.example.payments.payments.api.AuthorizePaymentResponse;
import com.example.payments.payments.events.PaymentAuthorizedEvent;
import java.time.Instant;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaymentService {
  private final PaymentRepository repo;
  private final KafkaTemplate<String, Object> kafkaTemplate;
  private final String authorizedTopic;

  public PaymentService(
      PaymentRepository repo,
      KafkaTemplate<String, Object> kafkaTemplate,
      @Value("${app.kafka.topic.paymentAuthorized}") String authorizedTopic) {
    this.repo = repo;
    this.kafkaTemplate = kafkaTemplate;
    this.authorizedTopic = authorizedTopic;
  }

  @Transactional
  public AuthorizePaymentResponse authorize(AuthorizePaymentRequest req) {
    String paymentId = UUID.randomUUID().toString();
    String authorizationId = "AUTH-" + UUID.randomUUID();
    Instant now = Instant.now();

    Payment saved =
        repo.save(
            new Payment(
                paymentId,
                req.fromAccount(),
                req.toAccount(),
                req.amount(),
                req.currency(),
                authorizationId,
                "AUTHORIZED",
                now));

    kafkaTemplate.send(
        authorizedTopic,
        saved.getAuthorizationId(),
        new PaymentAuthorizedEvent(
            saved.getId(),
            saved.getAuthorizationId(),
            saved.getFromAccount(),
            saved.getToAccount(),
            saved.getAmount(),
            saved.getCurrency(),
            saved.getCreatedAt()));

    return new AuthorizePaymentResponse(
        saved.getId(), saved.getAuthorizationId(), saved.getStatus(), saved.getCreatedAt());
  }
}

