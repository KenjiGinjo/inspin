import { EnumGender } from '@inspin/enums'
import { Link } from 'wouter'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Form } from './form'
import { Checkbox } from './ui/checkbox'
import { DescSec } from './ui/desc-sec'
import { Divider } from './ui/divider'
import { Label } from './ui/label'

function Base({ defaultTab = 'c_illustration' }: { defaultTab?: 'c_illustration' | 'c_homepage' }) {
  return (
    <>
      <Form.Input
        label="Name of the Character"
        name="name"
        placeholder="The name of the character you wish to submit"
      />
      <Form.Radio
        label="Gender of the Character:"
        name="gender"
        items={[
          { label: 'Male', value: EnumGender.Male },
          { label: 'Female', value: EnumGender.Female },
          { label: 'Other', value: EnumGender.Other },
        ]}
      />
      <Form.Textarea
        label="Description of the Character"
        name="description"
        placeholder="Give a brief description or background of the character to help users understand its story or concept."
      />

      <Form.Input
        label="Character Creator's Name"
        name="creatorName"
        placeholder="Enter the name of the character creator’s name"
      />

      <Form.Input
        label="Character Creator's Website"
        name="creatorWebsite"
        placeholder="Enter the name of the character creator’s website"
      />

      <Tabs defaultValue={defaultTab} className="bg-gray-100 p-2 rounded-lg">
        <TabsList>
          <TabsTrigger value="c_illustration">Character’s Illustration</TabsTrigger>
          <TabsTrigger value="c_homepage">Character’s Homepage</TabsTrigger>
        </TabsList>
        <TabsContent value="c_illustration">
          <Form.Image
            name="illustration"
            uploaderProps={{
              emptyMessage: 'Upload an illustration representing the character. This will help users visualize it.',
            }}
            wrapperClassName="pb-0"
          />
        </TabsContent>
        <TabsContent value="c_homepage">
          <Form.Input
            name="website"
            placeholder="Provide a link to the official website or a relevant page for the character."
            wrapperClassName="pb-2"
          />
        </TabsContent>
      </Tabs>

      <Form.Tags
        label="Genre of the Character"
        name="genre"
        placeholder="Enter the genre of the character"
      />

      <Form.Textarea
        label="Additional Notes"
        name="note"
        placeholder="Include any other information you think might be relevant or helpful for users to know."
      />
    </>
  )
}

function Desc() {
  return (
    <>
      <Divider className="my-12" />
      <DescSec
        title="Why Submit?"
        desc="Share your character with a wider audience and gather support to bring it to life as a collectible figurine."
      />
      <DescSec
        title="How It Works?"
        desc="Users will vote on their favorite submissions. The most popular ones will have the opportunity to be turned into figurines through crowdfunding."
      />
      <DescSec
        title="Tips for Success"
        desc="Ensure your illustration is clear and captivating. If you know or have a website, make sure it provides additional context or information about the character."
      />

    </>
  )
}

function Agree({ setAgree }: { setAgree: (value: boolean) => void }) {
  return (
    <div className="flex items-start gap-3 mt-12">
      <Checkbox
        id="terms"
        className="mt-1"
        onCheckedChange={e => setAgree(Boolean(e))}
      />
      <Label htmlFor="terms" className="inline-block leading-tight">
        <span className="text-gray-500">Agree to the</span>
        <Link href="/docs/submission-rules" className="text-cyan-600  font-bold ml-1">Submission Rules</Link>
        <span className="text-gray-500 ml-1">and</span>
        <Link href="/docs/terms-of-use" className="text-cyan-600 font-bold ml-1">Terms of Service</Link>
        <span className="text-gray-500">.</span>
      </Label>
    </div>
  )
}
export const CharacterForm = {
  Base,
  Desc,
  Agree,
}
