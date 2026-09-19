# Onuros Website

This repository is reserved for the public Onuros website.

The site is a statically generated Astro project. It prioritizes semantic HTML,
fast delivery, accessibility, and accurate development-stage wording.

## Local development

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run build
```

Static output is written to `dist/`. The production VPS serves only this output
through Caddy; Node.js is not required at runtime.

## Accuracy rule

Public pages must distinguish research, testnet and production. The current
Onuros Privacy Lab candidate is an experimental 584-byte private payment with a
192-byte Groth16 proof. Onuros Proof Bundles are proposed research for reducing
stored proof bytes. Neither is active in Onuros consensus or independently
audited, and no production throughput claim is approved.

The website must not claim that private payments are untraceable, that an audit
will certainly pass, or that aggregation removes all individual-payment costs.
Measured proof size, complete payment bytes, transaction-object throughput and
recipient-transfer rates must be labelled separately.
