import { Form } from './form'

export function ProfileForm() {
  return (
    <>
      <Form.Image
        name="avatar"
        uploaderProps={{
          emptyMessage: 'Upload an avatar',
        }}
        wrapperClassName="pb-0"
      />
      <Form.Input
        label="Nickname"
        name="nickname"
        placeholder="Enter your nickname"
      />
      <Form.Textarea
        label="Bio"
        name="bio"
        placeholder="Give a brief description or background of yourself to help users understand you."
      />
    </>
  )
}
