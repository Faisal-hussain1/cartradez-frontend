import PolicyLayout from "@/shared/components/policylayout";

export default function RefundPolicy() {
  return (
    <PolicyLayout title="Refund Policy">

      <p><strong>Effective Date:</strong>2026-04-15</p>

      <h2 className="font-semibold text-lg">General Rule</h2>
      <p>
        Vehicle purchases are generally non-refundable unless misrepresentation or fraud occurs.
      </p>

      <h2 className="font-semibold text-lg">Refundable Cases</h2>
      <ul className="list-disc ml-5">
        <li>Seller cancels listing</li>
        <li>Duplicate payment</li>
        <li>Vehicle unavailable</li>
      </ul>

      <h2 className="font-semibold text-lg">Non-Refundable Cases</h2>
      <ul className="list-disc ml-5">
        <li>Change of mind</li>
        <li>Missed payment deadlines</li>
      </ul>

      <h2 className="font-semibold text-lg">Service Fees</h2>
      <p>
        Inspection, documentation, and listing services are non-refundable once started.
      </p>

      <h2 className="font-semibold text-lg">Processing Time</h2>
      <p>
        Refunds are processed within 7–14 business days.
      </p>

    </PolicyLayout>
  );
}