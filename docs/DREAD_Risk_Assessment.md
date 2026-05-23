# DREAD Risk Assessment Report

## Application Name
Secure Web Application – Application Security Project

---

## Risk Assessment Method

Each threat is evaluated using DREAD model:

- **D** = Damage Potential  
- **R** = Reproducibility  
- **E** = Exploitability  
- **A** = Affected Users  
- **D** = Discoverability  

Each value is rated from **1 (Low) to 10 (High)**.

---

## Risk Matrix

| Threat | D (Damage) | R (Reproducibility) | E (Exploitability) | A (Affected Users) | D (Discoverability) | Total (50) | Risk Level |
|--------|------------|---------------------|--------------------|--------------------|----------------------|-------------|------------|
| SQL Injection | 9 | 8 | 8 | 9 | 8 | 42 | High |
| Session Hijacking | 8 | 7 | 7 | 8 | 7 | 37 | High |
| XSS Attack | 7 | 6 | 6 | 7 | 6 | 32 | Medium |
| Brute Force Attack | 6 | 5 | 5 | 6 | 5 | 27 | Medium |
| Privilege Escalation | 9 | 6 | 7 | 8 | 6 | 36 | High |

---

## Threat Explanation

### SQL Injection
- Attackers try to inject malicious queries into inputs.
- Mitigation:
  - Input validation (validator.js)
  - Mongoose ORM prevents raw queries
  - Sanitization of user input

---

### Session Hijacking
- Attackers steal JWT token and access user account.
- Mitigation:
  - JWT expiration (1 hour)
  - Secure storage in localStorage
  - Role-based middleware checks

---

### XSS (Cross Site Scripting)
- Injecting malicious scripts into frontend input fields.
- Mitigation:
  - Helmet CSP headers
  - Input sanitization
  - Avoid rendering raw HTML

---

### Brute Force Attack
- Repeated login attempts to guess password.
- Mitigation:
  - express-rate-limit (100 requests / 15 min)
  - bcrypt hashing slows guessing

---

### Privilege Escalation
- Normal user tries to access admin routes.
- Mitigation:
  - adminMiddleware role check
  - JWT role verification

---

## Risk Handling Strategy

- **High Risk:** Must be fixed before deployment
- **Medium Risk:** Monitor and mitigate
- **Low Risk:** Accept or monitor

---

## Summary

The application implements multiple layers of security including authentication, encryption, and access control to reduce overall risk exposure according to the DREAD model.