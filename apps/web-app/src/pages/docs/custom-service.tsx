import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'

export function PageCustomService() {
  return (
    <MainLayout>
      <Header.SubPage title="Custom Service Agreement" />
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
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Service Overview</h2>
              <p className="text-gray-700 mb-4">
                This Custom Service Agreement outlines the terms and conditions for our specialized services,
                including project consultation, custom development, and premium support features.
                These services are designed to provide enhanced value and personalized assistance to our users.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Service Eligibility</h2>
              <div className="text-gray-700 mb-4">
                <p className="mb-3">Custom services are available to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Registered Users:</strong>
                    {' '}
                    Only registered users can access custom services
                  </li>
                  <li>
                    <strong>Verified Accounts:</strong>
                    {' '}
                    Users with verified email addresses and complete profiles
                  </li>
                  <li>
                    <strong>Good Standing:</strong>
                    {' '}
                    Accounts must be in good standing with no policy violations
                  </li>
                  <li>
                    <strong>Service Requirements:</strong>
                    {' '}
                    Some services may have additional eligibility criteria
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Service Types</h2>
              <div className="text-gray-700 mb-4">
                <p className="mb-3">We offer the following custom services:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Project Consultation:</strong>
                    {' '}
                    Expert guidance on project development and optimization
                  </li>
                  <li>
                    <strong>Custom Development:</strong>
                    {' '}
                    Tailored solutions for specific project requirements
                  </li>
                  <li>
                    <strong>Premium Support:</strong>
                    {' '}
                    Priority customer support and technical assistance
                  </li>
                  <li>
                    <strong>Analytics and Insights:</strong>
                    {' '}
                    Detailed project performance analysis and recommendations
                  </li>
                  <li>
                    <strong>Integration Services:</strong>
                    {' '}
                    Custom integrations with third-party platforms and tools
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Service Delivery</h2>
              <div className="text-gray-700 mb-4">
                <p className="mb-3">Our service delivery process includes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Initial Assessment:</strong>
                    {' '}
                    Comprehensive evaluation of your project requirements
                  </li>
                  <li>
                    <strong>Custom Proposal:</strong>
                    {' '}
                    Detailed service proposal with timelines and deliverables
                  </li>
                  <li>
                    <strong>Regular Updates:</strong>
                    {' '}
                    Ongoing communication and progress reports
                  </li>
                  <li>
                    <strong>Quality Assurance:</strong>
                    {' '}
                    Thorough testing and validation of deliverables
                  </li>
                  <li>
                    <strong>Post-Service Support:</strong>
                    {' '}
                    Follow-up assistance and maintenance as needed
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Content Guidelines and Standards</h2>
              <p className="text-gray-700 mb-4">
                All custom service work must adhere to our content guidelines, ensuring they are appropriate and respectful.
                We maintain high standards for all deliverables and reserve the right to refuse service for projects
                that do not meet our ethical and quality standards.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Intellectual Property and Copyright</h2>
              <div className="text-gray-700 mb-4">
                <p className="mb-3">By engaging our custom services, you confirm that you have the rights to use and share the material:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Client Ownership:</strong>
                    {' '}
                    You retain ownership of your original content and intellectual property
                  </li>
                  <li>
                    <strong>Service Deliverables:</strong>
                    {' '}
                    Custom work created for you becomes your property upon completion
                  </li>
                  <li>
                    <strong>Platform Rights:</strong>
                    {' '}
                    We retain rights to use anonymized work for portfolio and improvement purposes
                  </li>
                  <li>
                    <strong>Third-Party Content:</strong>
                    {' '}
                    You must have proper licensing for any third-party content used
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Service Process and Modifications</h2>
              <p className="text-gray-700 mb-4">
                Our custom service process will be reviewed and displayed transparently. The platform reserves the right
                to modify the service process if necessary to ensure quality and efficiency. We will communicate any
                changes promptly and work with you to minimize disruption to your project.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Privacy and Confidentiality</h2>
              <p className="text-gray-700 mb-4">
                Personal information provided during custom service engagements will be handled according to our Privacy Policy.
                We maintain strict confidentiality regarding your project details and business information.
                All communications and project materials are treated as confidential unless otherwise agreed.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Service Decisions and Quality Control</h2>
              <p className="text-gray-700 mb-4">
                The platform reserves the right to make the final decision regarding service delivery methods,
                quality standards, and project acceptance. We maintain high standards for all custom services
                and may decline projects that do not align with our capabilities or ethical guidelines.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment and Billing</h2>
              <div className="text-gray-700 mb-4">
                <p className="mb-3">Payment terms for custom services:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Service Pricing:</strong>
                    {' '}
                    Custom services are priced based on scope and complexity
                  </li>
                  <li>
                    <strong>Payment Schedule:</strong>
                    {' '}
                    Payment terms will be specified in your service proposal
                  </li>
                  <li>
                    <strong>Refund Policy:</strong>
                    {' '}
                    Refunds are handled on a case-by-case basis according to service completion
                  </li>
                  <li>
                    <strong>Additional Costs:</strong>
                    {' '}
                    Any additional costs will be communicated and approved in advance
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                While we strive for excellence in all custom services, we cannot guarantee specific outcomes or results.
                Our liability is limited to the amount paid for the specific service. We are not responsible for
                indirect damages or losses arising from the use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact and Support</h2>
              <p className="text-gray-700 mb-4">
                For questions about our custom services or to discuss your project requirements,
                please contact our custom services team through our designated channels.
                We're committed to providing exceptional service and support for all your custom project needs.
              </p>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
