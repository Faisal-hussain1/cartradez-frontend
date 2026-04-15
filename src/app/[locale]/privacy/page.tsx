import PolicyLayout from "@/shared/components/policylayout";

export default function PrivacyPolicy() {
  return (
    <PolicyLayout title="Privacy Policy">

      <p><strong>Effective Date:</strong> 2026-04-15</p>

      <p>
        CarTradez collects personal information such as name, email, phone number,
        location, CNIC, and transaction details to provide and improve services.
      </p>

      <h2 className="font-semibold text-lg">Who We Are</h2>
      <p>CarTradez is an online car selling and buying platform that allows users to browse, list, inquire
about, purchase, and/or sell vehicles through our website and associated channels.
If you have any questions about this Privacy Policy, you may contact us at:
</p>

<p>Company Name: Car Tradez
Email: [Insert Email Address]
Phone: [Insert Phone Number]
Address: [Insert Office Address]</p>

      <h2 className="font-semibold text-lg">Information We Collect</h2>
      <ul className="list-disc ml-5">
        <li>Personal Information (Name, Email, Phone)</li>
        <li>Account Data (Username, Login Activity)</li>
        <li>Vehicle Listings Data</li>
        <li>Transaction Details</li>
        <li>Technical Data (IP, Browser, Cookies)</li>
      </ul>

      <h2 className="font-semibold text-lg">How We Use Data</h2>
      <ul className="list-disc ml-5">
        <li>Account management</li>
        <li>Processing transactions</li>
        <li>Fraud prevention</li>
        <li>Improving user experience</li>
      </ul>

      <h2 className="font-semibold text-lg">Data Security</h2>
      <p>
        We apply industry-standard security measures, but no system is 100% secure.
      </p>

      <h2 className="font-semibold text-lg">Your Rights</h2>
      <p>
        You can request access, correction, or deletion of your data at any time.
      </p>

    </PolicyLayout>
  );
}