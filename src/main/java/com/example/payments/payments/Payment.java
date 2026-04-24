package com.example.payments.payments;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "payments")
public class Payment {
  @Id
  @Column(name = "id", nullable = false, updatable = false)
  private String id;

  @Column(name = "from_account", nullable = false)
  private String fromAccount;

  @Column(name = "to_account", nullable = false)
  private String toAccount;

  @Column(name = "amount", nullable = false, precision = 19, scale = 2)
  private BigDecimal amount;

  @Column(name = "currency", nullable = false)
  private String currency;

  @Column(name = "authorization_id", nullable = false, unique = true)
  private String authorizationId;

  @Column(name = "status", nullable = false)
  private String status;

  @Column(name = "created_at", nullable = false)
  private Instant createdAt;

  protected Payment() {}

  public Payment(
      String id,
      String fromAccount,
      String toAccount,
      BigDecimal amount,
      String currency,
      String authorizationId,
      String status,
      Instant createdAt) {
    this.id = id;
    this.fromAccount = fromAccount;
    this.toAccount = toAccount;
    this.amount = amount;
    this.currency = currency;
    this.authorizationId = authorizationId;
    this.status = status;
    this.createdAt = createdAt;
  }

  public String getId() {
    return id;
  }

  public String getFromAccount() {
    return fromAccount;
  }

  public String getToAccount() {
    return toAccount;
  }

  public BigDecimal getAmount() {
    return amount;
  }

  public String getCurrency() {
    return currency;
  }

  public String getAuthorizationId() {
    return authorizationId;
  }

  public String getStatus() {
    return status;
  }

  public Instant getCreatedAt() {
    return createdAt;
  }
}

