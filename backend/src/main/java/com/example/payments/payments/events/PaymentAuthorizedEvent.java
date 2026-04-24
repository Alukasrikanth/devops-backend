package com.example.payments.payments.events;

import java.math.BigDecimal;
import java.time.Instant;

public record PaymentAuthorizedEvent(
    String paymentId,
    String authorizationId,
    String fromAccount,
    String toAccount,
    BigDecimal amount,
    String currency,
    Instant createdAt) {}

