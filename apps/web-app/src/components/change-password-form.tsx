import { Form } from './form'

export function ChangePasswordForm() {
  return (
    <div className="space-y-4">
      <Form.Input
        label="Current Password"
        name="oldPassword"
        type="password"
        placeholder="Enter your current password"
        autoComplete="current-password"
      />
      <Form.Input
        label="New Password"
        name="newPassword"
        type="password"
        placeholder="Enter your new password"
        autoComplete="new-password"
      />
      <Form.Input
        label="Confirm New Password"
        name="confirmPassword"
        type="password"
        placeholder="Confirm your new password"
        autoComplete="new-password"
      />
    </div>
  )
}
