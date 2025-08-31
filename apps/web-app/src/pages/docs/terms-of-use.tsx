import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'

export function PageTermsOfUse() {
  return (
    <MainLayout>
      <Header.SubPage title="Terms of Use" />
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
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using this platform, you accept and agree to be bound by the terms and provision of this agreement.
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">User Eligibility</h2>
              <p className="text-gray-700 mb-4">
                Only registered users can submit a project for voting. You must be at least 18 years old or have parental consent
                to use this platform. You are responsible for maintaining the confidentiality of your account information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Content Guidelines</h2>
              <p className="text-gray-700 mb-4">
                All submissions must adhere to our content guidelines, ensuring they are appropriate and respectful.
                Content that is offensive, illegal, or violates intellectual property rights is strictly prohibited.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Copyright and Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                By submitting content, you confirm that you have the rights to use and share the material.
                You retain ownership of your content while granting us a license to display and distribute it on our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Submission Process</h2>
              <p className="text-gray-700 mb-4">
                Submissions will be reviewed and displayed transparently. The platform reserves the right to modify
                the submission process if necessary. We may reject submissions that do not meet our guidelines.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Privacy and Data Protection</h2>
              <p className="text-gray-700 mb-4">
                Personal information provided will be handled according to our Privacy Policy.
                We are committed to protecting your privacy and will not share your personal information with third parties
                without your consent, except as required by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Platform Rights and Decisions</h2>
              <p className="text-gray-700 mb-4">
                The platform reserves the right to make the final decision regarding which projects proceed to crowdfunding.
                We may modify, suspend, or discontinue any aspect of the service at any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                The platform is provided "as is" without warranties of any kind. We are not liable for any damages
                arising from the use of our service or any content submitted by users.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Use, please contact us through our support channels.
              </p>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
