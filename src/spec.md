# Specification

## Summary
**Goal:** Add a frontend “Custom domain” setup view and documentation so users can point their own domain to the deployed Internet Computer canister URL.

**Planned changes:**
- Add a “Custom domain” setup view in the frontend with a domain name input that persists locally across refresh.
- Display the current deployed IC app (canister) URL in that view, with a one-click copy-to-clipboard action.
- Show clear, step-by-step, provider-agnostic DNS instructions (including any DNS values shown) with copy-to-clipboard for relevant fields.
- Add README documentation (or a new docs page linked from the README) explaining custom domain setup, required DNS records, expected reachability after propagation, and basic troubleshooting (propagation time, HTTPS/certificate expectations, common misconfiguration symptoms).

**User-visible outcome:** Users can enter their domain in the app, copy the canister URL/DNS values, follow on-screen and README guidance to configure DNS, and understand what to expect while the domain propagates.
