import { APP } from '@inspin/constants'
import { Link } from 'wouter'

function PlaceOrder() {
  return (
    <div className="text-xs text-gray-400">
      <span>By clicking "Place Order", you agree to</span>
      {' '}
      {APP.appName}
      's
      {' '}
      <Link href="/docs/terms-of-use" className="text-cyan-600">Terms of Service</Link>
      {' '}
      <Link href="/docs/refund-policy" className="text-cyan-600">Customer Service</Link>
      .
      {' '}
      <span>Learn more</span>
    </div>
  )
}

export const Agree = { PlaceOrder }
