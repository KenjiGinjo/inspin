import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'

export function PageSubmissionRules() {
  return (
    <MainLayout>
      <Header.SubPage title="Submission Rules" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated:
              {' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Eligibility Requirements</h2>
              <div className="text-gray-700 mb-4">
                <p className="mb-3">To submit a project for voting, you must meet the following criteria:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Registered User:</strong>
                    {' '}
                    Only registered users can submit a project for voting
                  </li>
                  <li>
                    <strong>Age Requirement:</strong>
                    {' '}
                    You must be at least 18 years old or have parental consent
                  </li>
                  <li>
                    <strong>Account Status:</strong>
                    {' '}
                    Your account must be in good standing with no violations
                  </li>
                  <li>
                    <strong>Verification:</strong>
                    {' '}
                    You may be required to verify your identity and contact information
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Content Guidelines</h2>
              <div className="text-gray-700 mb-4">
                <p className="mb-3">All submissions must adhere to our content guidelines:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Appropriate Content:</strong>
                    {' '}
                    All submissions must be appropriate and respectful
                  </li>
                  <li>
                    <strong>No Offensive Material:</strong>
                    {' '}
                    Content that is offensive, discriminatory, or harmful is prohibited
                  </li>
                  <li>
                    <strong>No Illegal Content:</strong>
                    {' '}
                    Submissions must not violate any applicable laws or regulations
                  </li>
                  <li>
                    <strong>Quality Standards:</strong>
                    {' '}
                    Projects should demonstrate creativity, originality, and potential value
                  </li>
                  <li>
                    <strong>Complete Information:</strong>
                    {' '}
                    All required fields must be filled out accurately and completely
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Copyright and Intellectual Property</h2>
              <div className="text-gray-700 mb-4">
                <p className="mb-3">By submitting content, you confirm that you have the rights to use and share the material:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Ownership:</strong>
                    {' '}
                    You must own or have proper licensing rights to all submitted content
                  </li>
                  <li>
                    <strong>Original Work:</strong>
                    {' '}
                    Submissions should be original or properly attributed to original creators
                  </li>
                  <li>
                    <strong>No Infringement:</strong>
                    {' '}
                    Content must not infringe on any third-party intellectual property rights
                  </li>
                  <li>
                    <strong>License Grant:</strong>
                    {' '}
                    By submitting, you grant us a license to display and distribute your content
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Submission Process</h2>
              <div className="text-gray-700 mb-4">
                <p className="mb-3">Our submission process works as follows:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Review Process:</strong>
                    {' '}
                    Submissions will be reviewed and displayed transparently
                  </li>
                  <li>
                    <strong>Modification Rights:</strong>
                    {' '}
                    The platform reserves the right to modify the submission process if necessary
                  </li>
                  <li>
                    <strong>Rejection Criteria:</strong>
                    {' '}
                    We may reject submissions that do not meet our guidelines
                  </li>
                  <li>
                    <strong>Appeal Process:</strong>
                    {' '}
                    Rejected submissions may be appealed with additional information
                  </li>
                  <li>
                    <strong>Timeline:</strong>
                    {' '}
                    Review times may vary depending on submission volume and complexity
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Privacy and Data Protection</h2>
              <p className="text-gray-700 mb-4">
                Personal information provided will be handled according to our Privacy Policy. We are committed to protecting
                your privacy and will only use your information for the purposes outlined in our privacy policy.
                Your personal contact information will not be shared publicly without your consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Platform Rights and Final Decisions</h2>
              <div className="text-gray-700 mb-4">
                <p className="mb-3">Important information about platform rights:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Final Authority:</strong>
                    {' '}
                    The platform reserves the right to make the final decision regarding which projects proceed to crowdfunding
                  </li>
                  <li>
                    <strong>Selection Criteria:</strong>
                    {' '}
                    Projects are selected based on various factors including community interest, feasibility, and platform guidelines
                  </li>
                  <li>
                    <strong>No Guarantees:</strong>
                    {' '}
                    Submission does not guarantee that your project will be selected for crowdfunding
                  </li>
                  <li>
                    <strong>Process Changes:</strong>
                    {' '}
                    We may modify selection criteria or processes at any time
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Prohibited Activities</h2>
              <div className="text-gray-700 mb-4">
                <p className="mb-3">The following activities are strictly prohibited:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Submitting fake or misleading information</li>
                  <li>Attempting to manipulate voting or selection processes</li>
                  <li>Submitting multiple similar projects to increase chances of selection</li>
                  <li>Using automated tools or bots to submit content</li>
                  <li>Harassing or threatening other users or platform staff</li>
                  <li>Attempting to circumvent any platform rules or restrictions</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Consequences of Violations</h2>
              <p className="text-gray-700 mb-4">
                Violations of these submission rules may result in:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Rejection of your submission</li>
                <li>Temporary or permanent suspension of your account</li>
                <li>Removal of previously accepted submissions</li>
                <li>Legal action if violations involve illegal activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact and Support</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about these submission rules or need assistance with your submission,
                please contact our support team through our designated channels. We're here to help ensure
                a fair and transparent submission process for all users.
              </p>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
