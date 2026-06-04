# Madessa — turning on the live integrations

The site works fully on its own (curated photos + curated products). These two
optional steps make it pull **live** data. Both are free and one-time.

---

## 1. Live Instagram feed (@madessaco)

Shows real, auto-updating posts instead of the curated photos. The section
reads `NEXT_PUBLIC_INSTAGRAM_FEED` (any JSON feed URL). Free options:

**Option A — Free, fully on-brand (recommended): Instagram Graph API, self-hosted.**
@madessaco must be a Business/Creator account (free to switch in the IG app).
Create a free Meta app, connect the account, generate a long-lived token, then
set `INSTAGRAM_TOKEN` in Vercel — our `/api/instagram` route serves it and a
Vercel Cron auto-refreshes the token. No watermark, no monthly fee.
(Ask the developer to finish this; it needs the one-time token.)

**Option B — Free, fastest: a free widget (e.g. SnapWidget free).**
Sign up, connect @madessaco, copy the JSON/embed. Free tier has a small
watermark and less styling control. Paste its feed URL into
`NEXT_PUBLIC_INSTAGRAM_FEED`.

**Option C — Do nothing.** The section keeps showing the curated real Madessa
photos (free, zero setup), just not auto-updating.

If `NEXT_PUBLIC_INSTAGRAM_FEED` isn't set, the curated gallery shows (no error).

---

## 2. Live products + checkout (Shopify)

Shows the real, current Shopify catalog and sends the cart to Shopify checkout.

1. In **Shopify admin → Settings → Apps and sales channels → Develop apps**
   → **Create an app** (e.g. "Madessa Website").
2. Open **Configuration → Storefront API → Configure**, enable read access to
   products (`unauthenticated_read_product_listings`, `_product_inventory`,
   `_product_tags`) and the cart/checkout scopes. **Save**.
3. **API credentials → Install app**, then copy the **Storefront API access token**.
4. Note the store address: `xxxxx.myshopify.com` (Settings → Domains, or the
   admin URL `admin.shopify.com/store/xxxxx`).
5. In Vercel → Environment Variables, add:
   - `NEXT_PUBLIC_SHOPIFY_DOMAIN` = `xxxxx.myshopify.com`
   - `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` = the token
6. Redeploy. Real products + correct product links + live sync turn on.

If unset, the site shows the curated product set (no error).

---

## 3. Form delivery (newsletter + contact) — optional

To actually receive newsletter signups and contact messages by email:

1. Get a free API key from **https://resend.com**.
2. In Vercel → Environment Variables, add:
   - `RESEND_API_KEY` = the key
   - `CONTACT_TO_EMAIL` = where messages should land (e.g. hello@madessa.co)
3. Redeploy. Until then forms still "succeed" for visitors but aren't delivered.
