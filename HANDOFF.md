# Madessa site — handoff guide (for Yaren)

This is the **new Madessa storefront** (Next.js). It replaces the old Shopify
theme as the public website. **Shopify stays underneath** — you keep doing
products, prices, **inventory**, orders, payments and shipping in the Shopify
admin exactly like today. This site just reads your live catalog from Shopify
and sends every checkout to Shopify's secure checkout.

You will **own everything yourself** after these steps: the code (GitHub) and
the hosting (Vercel).

---

## Step 1 — Get the code (GitHub)

The code lives at: `github.com/canberkvarli/madessa`

Pick one:
- **Easiest:** ask Canberk to **transfer the repo** to your GitHub account
  (GitHub → repo → Settings → Danger Zone → Transfer ownership), **or**
- Ask to be added as a **collaborator** (repo → Settings → Collaborators).

You need a free GitHub account: https://github.com/signup

## Step 2 — Host it (Vercel)

1. Sign up free at https://vercel.com (choose "Continue with GitHub").
2. Click **Add New → Project → Import** and pick the `madessa` repo.
3. Vercel auto-detects Next.js. Click **Deploy**. You'll get a test URL like
   `madessa-xxxx.vercel.app`.

## Step 3 — Connect Shopify (makes the catalog LIVE)

Without this, products are a frozen copy. With it, prices/stock update
automatically from Shopify.

**Get 2 values from Shopify admin:**
- **Store address** — Settings → Domains, looks like `xxxx.myshopify.com`.
- **Storefront API token** — Settings → Apps and sales channels →
  Develop apps → Create an app → Configuration → Storefront API → enable
  **read** access → Install app → copy the **Storefront API access token**.

**Add them in Vercel** (Project → Settings → Environment Variables):
| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SHOPIFY_DOMAIN` | `xxxx.myshopify.com` |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` | the token |
| `NEXT_PUBLIC_SHOPIFY_CHECKOUT_URL` | `https://xxxx.myshopify.com` |

Then **Redeploy** (Deployments → ⋯ → Redeploy).

## Step 4 — Test BEFORE touching the domain

On the `vercel.app` test URL:
- Check products show correct prices and that sold-out items look right.
- Add to cart → checkout → it should jump to **Shopify checkout**.
- Place a small real/test order → confirm it appears in **Shopify → Orders**
  and that inventory dropped. ✅ That proves Shopify is fully in control.

## Step 5 — Move madessa.co to the new site (last!)

1. In Vercel: Project → Settings → **Domains** → add `madessa.co` and
   `www.madessa.co`. Vercel shows the DNS records to set.
2. Update DNS where `madessa.co` is registered:
   - If the domain was **bought through Shopify**: transfer it out or repoint it.
   - If it's at a **registrar** (GoDaddy/Namecheap/etc.): just set the records
     Vercel gives you.
3. Once DNS points to Vercel, the new site is live on madessa.co. Shopify
   checkout keeps running on `xxxx.myshopify.com` (that's why Step 3 set
   `NEXT_PUBLIC_SHOPIFY_CHECKOUT_URL`).

---

## Editing copy later
Text, contact info and the offer banner live in `src/data/site.ts`. Edit on
GitHub and Vercel auto-redeploys. Product content comes from Shopify.

## Cost
- Shopify: your current plan (unchanged).
- Vercel: free Hobby plan is fine to start; ~$20/mo Pro only if you outgrow it.
