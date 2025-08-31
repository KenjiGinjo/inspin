import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'

export function PagePrivacyPolicy() {
  return (
    <MainLayout>
      <Header.SubPage title="Privacy Policy" />
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
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Information We Collect</h2>
              <div className="text-gray-700 mb-4">
                <p className="mb-3">We collect the following types of information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Personal Information:</strong>
                    {' '}
                    Name, email address, and contact information when you register
                  </li>
                  <li>
                    <strong>Profile Information:</strong>
                    {' '}
                    Username, profile picture, and biographical information
                  </li>
                  <li>
                    <strong>Content:</strong>
                    {' '}
                    Projects, submissions, comments, and other content you create
                  </li>
                  <li>
                    <strong>Usage Data:</strong>
                    {' '}
                    How you interact with our platform, including pages visited and features used
                  </li>
                  <li>
                    <strong>Technical Information:</strong>
                    {' '}
                    IP address, browser type, device information, and cookies
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
              <div className="text-gray-700 mb-4">
                <p className="mb-3">We use your information for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To provide and maintain our platform services</li>
                  <li>To process your project submissions and voting</li>
                  <li>To communicate with you about your account and platform updates</li>
                  <li>To improve our services and user experience</li>
                  <li>To ensure platform security and prevent fraud</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Information Sharing</h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>
                  <strong>With Your Consent:</strong>
                  {' '}
                  When you explicitly agree to share your information
                </li>
                <li>
                  <strong>Service Providers:</strong>
                  {' '}
                  With trusted third-party services that help us operate our platform
                </li>
                <li>
                  <strong>Legal Requirements:</strong>
                  {' '}
                  When required by law or to protect our rights and safety
                </li>
                <li>
                  <strong>Public Content:</strong>
                  {' '}
                  Your submitted projects and public profile information may be visible to other users
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate security measures to protect your personal information against unauthorized access,
                alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure,
                and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your personal information for as long as necessary to provide our services and comply with legal obligations.
                You may request deletion of your account and associated data at any time, subject to certain legal requirements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Rights</h2>
              <div className="text-gray-700 mb-4">
                <p className="mb-3">You have the following rights regarding your personal information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Access:</strong>
                    {' '}
                    Request a copy of the personal information we hold about you
                  </li>
                  <li>
                    <strong>Correction:</strong>
                    {' '}
                    Update or correct your personal information
                  </li>
                  <li>
                    <strong>Deletion:</strong>
                    {' '}
                    Request deletion of your personal information
                  </li>
                  <li>
                    <strong>Portability:</strong>
                    {' '}
                    Request a copy of your data in a portable format
                  </li>
                  <li>
                    <strong>Objection:</strong>
                    {' '}
                    Object to certain processing of your personal information
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Cookies and Tracking</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar tracking technologies to enhance your experience on our platform.
                You can control cookie settings through your browser preferences. Some features may not function
                properly if cookies are disabled.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our platform is not intended for children under 13 years of age. We do not knowingly collect
                personal information from children under 13. If you are a parent or guardian and believe your
                child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting
                the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of
                the platform after any changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us through
                our support channels or at our designated privacy contact address.
              </p>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
