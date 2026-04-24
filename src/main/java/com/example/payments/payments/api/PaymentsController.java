package com.example.payments.payments.api;

import com.example.payments.payments.PaymentService;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/payments", produces = MediaType.APPLICATION_JSON_VALUE)
public class PaymentsController {
  private final PaymentService paymentService;

  public PaymentsController(PaymentService paymentService) {
    this.paymentService = paymentService;
  }

  @PostMapping(path = "/authorize", consumes = MediaType.APPLICATION_JSON_VALUE)
  public AuthorizePaymentResponse authorize(@Valid @RequestBody AuthorizePaymentRequest req) {
    return paymentService.authorize(req);
  }
}

