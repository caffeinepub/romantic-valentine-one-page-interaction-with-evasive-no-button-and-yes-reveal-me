# Custom Domain Setup for Internet Computer Applications

This guide explains how to connect a custom domain to your Internet Computer-hosted application.

## Overview

Your application is currently accessible via an Internet Computer URL (e.g., `https://xxxxx-xxxxx-xxxxx-xxxxx-xxx.icp0.io`). By configuring DNS records, you can make it accessible via your own custom domain.

## Prerequisites

- A registered domain name
- Access to your domain's DNS settings (via your domain registrar or DNS provider)
- Your application's current Internet Computer URL

## Step-by-Step Instructions

### 1. Choose Your Domain Type

You can use either:
- **Subdomain**: `app.example.com`, `valentine.example.com`, `www.example.com`
- **Apex domain**: `example.com`

**Recommendation**: Use a subdomain for easier setup and better compatibility.

### 2. Get Your Application's Canister URL

1. Open your application in a browser
2. Click the settings icon (⚙️) in the top-right corner
3. Copy the "Current Application URL" shown in the Custom Domain panel
4. Note the hostname (e.g., `xxxxx-xxxxx-xxxxx-xxxxx-xxx.icp0.io`)

### 3. Configure DNS Records

#### For Subdomains (Recommended)

Add a **CNAME record** with these values:

| Field | Value | Example |
|-------|-------|---------|
| **Type** | CNAME | CNAME |
| **Name/Host** | Your subdomain | `app` or `valentine` or `www` |
| **Target/Value** | Your canister hostname | `xxxxx-xxxxx-xxxxx-xxxxx-xxx.icp0.io` |
| **TTL** | Auto or 3600 | 3600 |

**Example**: To set up `valentine.mysite.com`:
- Type: `CNAME`
- Name: `valentine`
- Target: `xxxxx-xxxxx-xxxxx-xxxxx-xxx.icp0.io`

#### For Apex Domains (Advanced)

Apex domains (e.g., `example.com` without a subdomain) require special DNS record types:

**Option 1: ALIAS or ANAME Record** (if your DNS provider supports it)

| Field | Value | Example |
|-------|-------|---------|
| **Type** | ALIAS or ANAME | ALIAS |
| **Name/Host** | @ | @ |
| **Target/Value** | Your canister hostname | `xxxxx-xxxxx-xxxxx-xxxxx-xxx.icp0.io` |

**Option 2: Redirect to Subdomain** (if ALIAS/ANAME not supported)

1. Set up a subdomain (e.g., `www.example.com`) using a CNAME record
2. Configure a redirect from `example.com` → `www.example.com` in your DNS provider's settings

### 4. Save and Wait for Propagation

1. Save your DNS changes
2. DNS propagation typically takes **5-60 minutes** but can take up to **48 hours**
3. You can check propagation status using tools like:
   - [DNS Checker](https://dnschecker.org)
   - [What's My DNS](https://whatsmydns.net)

### 5. Verify Your Domain

Once DNS has propagated:
1. Open your custom domain in a browser
2. Your application should load normally
3. HTTPS will be automatically provided by the Internet Computer

## Common DNS Providers

### Cloudflare
1. Log in to Cloudflare dashboard
2. Select your domain
3. Go to **DNS** → **Records**
4. Click **Add record**
5. Enter the CNAME details
6. Set **Proxy status** to **DNS only** (gray cloud)

### Namecheap
1. Log in to Namecheap
2. Go to **Domain List** → **Manage**
3. Select **Advanced DNS**
4. Click **Add New Record**
5. Choose **CNAME Record**
6. Enter the details

### GoDaddy
1. Log in to GoDaddy
2. Go to **My Products** → **DNS**
3. Click **Add** under Records
4. Select **CNAME**
5. Enter the details

### Google Domains
1. Log in to Google Domains
2. Select your domain
3. Go to **DNS**
4. Scroll to **Custom resource records**
5. Add a CNAME record

## Troubleshooting

### Domain Not Working After 24 Hours

**Possible causes:**
- DNS records not saved correctly
- Incorrect target/value (should be your canister hostname without `https://`)
- DNS provider doesn't support CNAME flattening for apex domains

**Solutions:**
1. Verify DNS records using `dig` or `nslookup`:
   ```bash
   dig your-domain.com
   nslookup your-domain.com
   ```
2. Check that the CNAME points to your canister hostname
3. Try using a subdomain instead of apex domain
4. Contact your DNS provider's support

### HTTPS Certificate Issues

**The Internet Computer automatically provides HTTPS certificates.** If you see certificate warnings:

- Wait longer for DNS propagation (certificates are issued after DNS resolves)
- Clear your browser cache
- Try accessing in an incognito/private window
- Check that you're using the correct domain (no typos)

### "DNS_PROBE_FINISHED_NXDOMAIN" Error

This means DNS cannot resolve your domain.

**Solutions:**
1. Verify DNS records are saved and active
2. Wait longer for propagation
3. Check for typos in the domain name or DNS records
4. Flush your local DNS cache:
   - **Windows**: `ipconfig /flushdns`
   - **Mac**: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`
   - **Linux**: `sudo systemd-resolve --flush-caches`

### Mixed Content Warnings

If you see mixed content warnings:
- Ensure all resources (images, scripts) use HTTPS or relative URLs
- The Internet Computer serves all content over HTTPS by default

### Apex Domain Not Supported

If your DNS provider doesn't support ALIAS/ANAME records:
1. Use a subdomain (e.g., `www.example.com`) with a CNAME record
2. Set up a redirect from apex to subdomain
3. Consider switching to a DNS provider that supports ALIAS records (e.g., Cloudflare, DNSimple)

## DNS Propagation Time

| Provider | Typical Time | Maximum Time |
|----------|--------------|--------------|
| Cloudflare | 2-5 minutes | 24 hours |
| Namecheap | 30 minutes | 48 hours |
| GoDaddy | 1 hour | 48 hours |
| Google Domains | 5-10 minutes | 24 hours |

**Note**: Propagation time varies by provider and geographic location. Be patient!

## Best Practices

1. **Use subdomains** for easier setup and better compatibility
2. **Set TTL to 3600** (1 hour) for faster updates during initial setup
3. **Test in incognito mode** to avoid browser caching issues
4. **Keep DNS records simple** - avoid unnecessary records that might conflict
5. **Document your setup** - save your DNS configuration for future reference

## Security Considerations

- **HTTPS is automatic** - The Internet Computer provides free SSL/TLS certificates
- **No additional configuration needed** - Certificates are managed automatically
- **Certificate renewal is automatic** - No manual intervention required
- **DNSSEC** - Consider enabling DNSSEC at your DNS provider for additional security

## Additional Resources

- [Internet Computer Documentation](https://internetcomputer.org/docs)
- [DNS Checker Tool](https://dnschecker.org)
- [What's My DNS](https://whatsmydns.net)
- [Understanding DNS Records](https://www.cloudflare.com/learning/dns/dns-records/)

## Support

If you continue to experience issues:
1. Check the troubleshooting section above
2. Verify your DNS records using online tools
3. Contact your DNS provider's support team
4. Consult the Internet Computer community forums

---

**Last Updated**: February 2026
