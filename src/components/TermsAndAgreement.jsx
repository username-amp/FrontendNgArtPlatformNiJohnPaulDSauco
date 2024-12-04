import React from 'react';

const TermsAndAgreement = () => {
  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Terms and Agreement</h2>
      <p className="text-gray-600 mb-6">
        By using our platform, you agree to adhere to the following terms and conditions. Violations may result in account restrictions or permanent bans.
      </p>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Prohibited Content</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>No use of offensive or vulgar language.</li>
          <li>No sharing or posting of explicit or suggestive content, including nudity or sexually explicit material.</li>
          <li>No posting of artwork, images, or content that promotes violence, hate, or discrimination.</li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Consequences of Violations</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>
            <strong>First Violation:</strong> Warning issued, and the content will be removed.
          </li>
          <li>
            <strong>Second Violation:</strong> Account restrictions, including limited access to features.
          </li>
          <li>
            <strong>Severe or Repeat Violations:</strong> Permanent ban and account termination.
          </li>
        </ul>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-gray-700 text-sm">
          If you have any questions or wish to appeal a decision, please contact our support team. We aim to foster a safe and respectful community for everyone.
        </p>
      </div>
    </div>
  );
};

export default TermsAndAgreement;
