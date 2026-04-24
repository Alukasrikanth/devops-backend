package com.example.payments.payments.api;

import java.time.Instant;

public record AuthorizePaymentResponse(
    String paymentId,
    String authorizationId,
    String status,
    Instant createdAt) {}

