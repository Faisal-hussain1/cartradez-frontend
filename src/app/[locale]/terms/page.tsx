import PolicyLayout from "@/shared/components/policylayout";

export default function TermsConditions() {
  return (
    <PolicyLayout title="Terms & Conditions">

      <p><strong>Effective Date:</strong>2026-04-15</p>

      <p>
        By using CarTradez, you agree to comply with these Terms & Conditions.
      </p>

      <h2 className="font-semibold text-lg">User Responsibilities</h2>
      <ul className="list-disc ml-5">
        <li>Provide accurate information</li>
        <li>Maintain account security</li>
        <li>Comply with laws</li>
      </ul>

      <h2 className="font-semibold text-lg">Platform Role</h2>
      <p>
        CarTradez may act as a marketplace or service provider but does not guarantee transactions.
      </p>

      <h2 className="font-semibold text-lg">Buyer Responsibilities</h2>
      <ul className="list-disc ml-5">
        <li>Verify vehicle details</li>
        <li>Inspect before purchase</li>
      </ul>

      <h2 className="font-semibold text-lg">Seller Responsibilities</h2>
      <ul className="list-disc ml-5">
        <li>Provide accurate listing info</li>
        <li>Ensure legal ownership</li>
      </ul>

      <h2 className="font-semibold text-lg">Limitation of Liability</h2>
      <p>
        CarTradez is not liable for transaction failures, delays, or third-party issues.
      </p>

    </PolicyLayout>
  );
}