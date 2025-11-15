# Deployment Checklist

Use this checklist to promote the Ionora stack (Next.js frontend + Express API + PostgreSQL) from staging to production.

---

## 1. Pre-Deployment
- **Code review & CI**  
  - Ensure main branch is green in CI, linting/tests pass.
  - Confirm environment-specific config files are not committed.
- **Versioning**  
  - Tag release (e.g., `v1.2.0`) once ready.

---

## 2. Database Migration Steps
1. Provision production PostgreSQL with required extensions (uuid-ossp, etc.).
2. Backup current database (`pg_dump`).
3. Copy `backend/src/config/migrations.sql` to the server (or pull latest repo).
4. Export `DATABASE_URL` pointing to production DB.
5. Run migrations:
   ```bash
   cd backend
   npm install --production
   npm run migrate
   ```
6. Verify schema (check `SELECT * FROM information_schema.tables` or run smoke query).

---

## 3. Environment Variables

Configure for both frontend (build-time) and backend (runtime). Never commit secrets.

| Variable | Description |
|----------|-------------|
| `NODE_ENV` | `production` |
| `PORT` | Express port (default `5000`) |
| `DATABASE_URL` | Production Postgres connection string |
| `JWT_SECRET` | Strong random string (>= 32 characters) |
| `JWT_EXPIRY` | e.g., `7d` |
| `SALT_ROUNDS` | Bcrypt cost (e.g., `12`) |
| `FRONTEND_ORIGIN` | Comma-separated list of allowed frontend origins |
| `SENDGRID_API_KEY` | Live SendGrid key |
| `FROM_EMAIL` | Verified sender email |
| `RAZORPAY_KEY_ID` | Live Razorpay key |
| `RAZORPAY_KEY_SECRET` | Live Razorpay secret |
| `RAZORPAY_WEBHOOK_SECRET` | Live webhook secret |
| `AWS_ACCESS_KEY_ID` | Optional: S3 |
| `AWS_SECRET_ACCESS_KEY` | Optional: S3 |
| `AWS_S3_BUCKET` | Optional: S3 bucket name |

Store secrets in your platform’s secret manager (AWS SSM, Vercel environment variables, etc.).

---

## 4. SSL Certificate Setup
- Use a managed load balancer (AWS ELB, GCP LB) or reverse proxy (Nginx/Traefik) to terminate HTTPS.
- Obtain cert via:
  - **Automatic**: AWS ACM, Cloudflare, Vercel.
  - **Manual**: Let’s Encrypt certbot with cron renewal.
- Redirect all HTTP ➝ HTTPS.
- Ensure backend trust proxy is set if behind reverse proxy (`app.set('trust proxy', 1)` if needed).

---

## 5. Payment Gateway (Razorpay) Live Configuration
1. Complete KYC and enable live mode.
2. Generate live keys in Razorpay dashboard.
3. Update `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET` in production env.
4. Update frontend to use live key in checkout embed.
5. Configure live webhook endpoint:
   - URL: `https://api.yourdomain.com/api/payment/webhooks/payment`
   - Secret: match `RAZORPAY_WEBHOOK_SECRET`.
   - Events: `payment.captured`, `payment.failed`, `order.paid`, `refund.*`.
6. Run live-mode smoke test (₹1 payment) and verify order transitions.

---

## 6. Email Service (SendGrid) Configuration
1. Verify sender domain (`noreply@alkalinewater.com`) in SendGrid.
2. Configure SPF/DKIM DNS records.
3. Set `SENDGRID_API_KEY` and `FROM_EMAIL`.
4. Run transactional email smoke test:
   ```bash
   curl -X POST https://api.yourdomain.com/api/auth/register ...
   ```
5. Monitor SendGrid dashboard for bounces/spam.

---

## 7. Security Checklist
- **Helmet**: Confirm `helmet()` middleware enabled in `backend/src/app.js`.
- **Rate limiting**: `generalLimiter`, `authLimiter` configured and tuned for production traffic.
- **CORS**: `FRONTEND_ORIGIN` limited to production domains.
- **HTTPS**: All traffic via TLS; secure cookies if using sessions.
- **Secrets**: Stored in secret manager, not `.env` on server.
- **Dependencies**: Run `npm audit --production` before deploy.
- **Process user**: Run Node under non-root user; restrict file permissions.
- **Logging**: Rotate logs; ensure sensitive data (tokens/passwords) not logged.
- **Headers**: Confirm `Content-Security-Policy`, `X-Frame-Options` as needed.

---

## 8. Monitoring & Observability
- **Logs**: Ship to centralized platform (ELK, Datadog, CloudWatch) with JSON format.
- **Metrics**: Use Prometheus/Grafana or managed services (Datadog, New Relic).
- **APM**: Optional Node.js APM agent for tracing.
- **Uptime**: Set up synthetic ping (`/health`) checks (Pingdom, UptimeRobot).
- **Alerts**: Configure alerts for high latency, error spikes, low disk, DB CPU.

---

## 9. Backup Strategy
- **Database**: Automated daily snapshots (RDS snapshots / pgBackRest). Retain ≥30 days.
- **S3 Assets**: Enable versioning + lifecycle policies.
- **Config**: Store infrastructure-as-code (Terraform, CloudFormation) in VCS.
- **Test restores**: Quarterly restore drill to staging to validate backups.

---

## 10. Rollback Plan

1. **Code rollback**  
   - Use previous tagged release.  
   - `git checkout v1.1.0 && git push production main`.
2. **Database rollback**  
   - If schema migration failed, restore from latest backup or use down-migration script.  
   - Keep migration scripts idempotent or provide `down` scripts.
3. **Feature toggles**  
   - Disable problematic features behind flags if available.
4. **Communication**  
   - Notify stakeholders of rollback; update incident tracker.

Maintain a runbook with on-call contact info and escalation paths.

---

## 11. Post-Deployment Verification
- Hit `/health` endpoint.
- Run smoke tests (login, checkout, order creation).
- Check Razorpay dashboard for live transactions.
- Confirm emails deliver successfully.
- Review logs/dashboards for anomalies during first hours.

---

## 12. Useful Commands

```bash
# install dependencies
npm install

# run migrations
npm run migrate

# seed base data
npm run seed

# start API in development
npm run dev

# start API in production
npm run start
```

Keep this document updated as infrastructure or processes evolve.








