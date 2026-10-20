# In-app purchase setup (App Store Connect)

The code side is in `src/purchases.js` (StoreKit 2 via `@capgo/native-purchases`, no server and no third-party account). The steps below are what Gustavo has to do in Apple's tools. The product IDs and bundle ID must match the code exactly.

## Checklist

1. **Apple Developer Program.** Enroll ($99/year) as an individual or an organization. The seller name shown on the App Store comes from this.
2. **Paid Applications agreement.** App Store Connect → Business: accept the Paid Apps agreement and add banking and tax info. Subscriptions cannot be bought, even in sandbox, until this agreement is active.
3. **Bundle ID.** Developer portal → Identifiers: register an explicit App ID such as `com.yourname.cadence`, with the In-App Purchase capability on (it is enabled by default). Put the same ID in:
   - `capacitor.config.ts` (`appId`, currently the placeholder `com.cadence.app`)
   - Xcode → App target → Signing & Capabilities → Bundle Identifier
4. **App record.** App Store Connect → Apps → + New App, using that bundle ID. Use the name, subtitle, and category from `STORE.md`.
5. **Subscription group.** App record → Monetization → Subscriptions → create one group, e.g. "Cadence". Both products go in the same group, so a person can only hold one at a time and can switch between them.
6. **Products.** Their IDs must match `PRODUCTS` in `src/purchases.js`:

   | Reference name | Product ID | Duration |
   |---|---|---|
   | Cadence Monthly | `cadence.monthly` | 1 month |
   | Cadence Yearly | `cadence.yearly` | 1 year |

   If you choose different IDs, change `PRODUCTS` to match. Product IDs can never be reused, even after deletion. For each product, set the price, add a display name and description (localization), and add the review screenshot of the paywall.
7. **Introductory offer: do not add one.** The app already gives 14 free days on the phone with no card, then shows the paywall. Leave both products without an introductory offer so nobody gets a second free period and "No card tonight" stays true.
8. **App Privacy.** Fill in the form from the answers in `STORE.md`.
9. **Sandbox tester.** Users and Access → Sandbox → add a tester with an email that is not a real Apple ID. On the iPhone, sign in under Settings → App Store → Sandbox Account. Sandbox renewals are sped up (1 month ≈ 5 minutes).
10. **Review submission.** Attach both subscriptions to the first app version ("In-App Purchases and Subscriptions" on the version page). The first subscriptions must be submitted with a binary.

## Mac / Xcode build

Linux cannot build iOS. On a Mac with Xcode and Node 22 or newer:

```
npm ci
npm run cap:sync        # builds dist-ios and copies it plus plugins into ios/
npx cap open ios
```

In Xcode:
- Signing & Capabilities: choose your Team, set the bundle ID, and add the **In-App Purchase** capability if it is not listed.
- Optional local testing without App Store Connect: File → New → StoreKit Configuration File, add `cadence.monthly` and `cadence.yearly`, then select it under Product → Scheme → Edit Scheme → Run → Options → StoreKit Configuration.
- Run on a device signed in to the sandbox account. Check that buying, cancelling, and **Restore Purchases** all work.
- Product → Archive → Distribute App → App Store Connect.

## How the app decides access

- `trial`: within 14 days of "Get started" (stored on the device). The whole app is open.
- `subscribed`: StoreKit reports a current `cadence.monthly` or `cadence.yearly` subscription (including billing grace period). Refunded or expired subscriptions don't count.
- `expired`: neither. The iOS app shows the paywall (Subscribe, Restore Purchases, Terms of Use, Privacy Policy). The web preview never locks, because it can't take payment.

There is no server-side receipt check. StoreKit 2 verifies transactions on the device, which is enough for an app with no account. If accounts or a server are added later, validate on the server too.
