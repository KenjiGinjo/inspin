import { Form } from './form'

export function UserAddressForm() {
  return (
    <>
      <Form.Input
        label="Full Name"
        name="name"
        placeholder="Full Name (No business name or company name)"
      />
      <Form.Input
        label="Address line 1"
        name="area"
        placeholder="Area"
      />
      <Form.Input
        label="Address line 2"
        name="address"
        placeholder="Address"
      />

      <div className="flex gap-2">
        <Form.Input
          label="Country"
          name="country"
          placeholder="Country"
        />

        <Form.Input
          label="Province"
          name="province"
          placeholder="State/Region"
        />
      </div>
      <div className="flex gap-2">
        <Form.Input
          label="City"
          name="city"
          placeholder="City"
        />

        <Form.Input
          label="Zip Code"
          name="zipCode"
          placeholder="Zip/Postal Code"
        />
      </div>
      <Form.Radio
        label="Tag"
        name="tag"
        items={[
          { label: 'Home', value: 'home' },
          { label: 'Office', value: 'office' },
          { label: 'Other', value: 'other' },
        ]}
      />
      <Form.Input
        label="Phone Number"
        name="phone"
        placeholder="Mobile Number / Billing Phone Number"
      />
      <Form.Switch
        label="Default Shipping Address"
        name="isDefault"
      />
    </>
  )
}
