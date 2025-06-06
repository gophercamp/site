import { Metadata } from 'next';
import { contactInfo } from '@/lib/social';
import PolicyPage from '@/components/ui/PolicyPage';
import Section from '@/components/ui/Section';
import BulletList from '@/components/ui/BulletList';
import InfoBox from '@/components/ui/InfoBox';
import LeadText from '@/components/ui/LeadText';

export const metadata: Metadata = {
  title: 'Code of Conduct | Gophercamp 2026',
  description:
    'Code of conduct for Gophercamp 2026 conference, ensuring a safe and inclusive environment for all participants.',
};

export default function CodeOfConductPage() {
  const expectedBehaviorItems = [
    'Be respectful and considerate to others',
    'Communicate openly with respect for others',
    'Be collaborative and supportive',
    'Be mindful of your surroundings and fellow participants',
    'Alert community leaders if you notice violations of this Code of Conduct',
    'Respect the boundaries and personal space of others',
    'Be patient with questions and mistakes',
  ];

  const unacceptableBehaviorItems = [
    'Verbal or written comments that reinforce social structures of domination',
    'Sexual language and imagery in any conference venue',
    'Deliberate intimidation, stalking, or following',
    'Harassing photography or recording',
    'Sustained disruption of talks or other events',
    'Inappropriate physical contact',
    'Unwelcome sexual attention or advances',
    'Advocating for or encouraging any of the above behaviors',
  ];

  const scopeItems = [
    'All conference venues and events',
    'Conference-related social events',
    'Online spaces (including social media, chat rooms, and forums)',
    'Communication between participants',
    'Any other conference-related activities',
  ];

  const responseItems = [
    'Warning the offender',
    'Requiring an apology',
    'Expulsion from the conference without refund',
    'Banning from future events',
    'Involving law enforcement if necessary',
  ];

  const speakerItems = [
    'Avoid using language or imagery that could be considered offensive',
    'Be respectful of different skill levels in the audience',
    'Create inclusive presentations that welcome all participants',
    'Respect time limits and session guidelines',
    'Be available for questions while maintaining professional boundaries',
  ];

  const sponsorItems = [
    'Follow all aspects of this Code of Conduct',
    'Avoid sexualized imagery or activities in their booths',
    'Treat all participants with respect and professionalism',
    'Comply with conference policies regarding promotions and giveaways',
  ];

  const communityValueItems = [
    'Share knowledge freely and constructively',
    'Welcome newcomers to the Go community',
    'Celebrate diverse perspectives and approaches',
    'Foster an environment of learning and growth',
  ];

  return (
    <PolicyPage title="Code of Conduct">
      <LeadText>
        Creating a safe, inclusive, and welcoming environment for all participants
      </LeadText>

      <Section title="Our Commitment">
        <p>
          Gophercamp 2026 is dedicated to providing a harassment-free conference experience for
          everyone, regardless of gender, gender identity and expression, age, sexual orientation,
          disability, physical appearance, body size, race, ethnicity, religion (or lack thereof),
          or technology choices.
        </p>
        <p className="mt-4">
          We do not tolerate harassment of conference participants in any form. Conference
          participants violating these rules may be sanctioned or expelled from the conference
          without a refund at the discretion of the conference organizers.
        </p>
      </Section>

      <Section title="Expected Behavior">
        <p className="mb-4">All participants are expected to:</p>
        <BulletList items={expectedBehaviorItems} />
      </Section>

      <Section title="Unacceptable Behavior">
        <p className="mb-4">Harassment includes, but is not limited to:</p>
        <BulletList items={unacceptableBehaviorItems} />

        <InfoBox variant="warning" title="Zero Tolerance">
          We have zero tolerance for harassment, discrimination, or any behavior that makes others
          feel unsafe or unwelcome. This applies to all conference spaces, including online
          interactions.
        </InfoBox>
      </Section>

      <Section title="Scope">
        <p className="mb-4">This Code of Conduct applies to:</p>
        <BulletList items={scopeItems} />
      </Section>

      <Section title="Enforcement">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Reporting</h3>
        <p className="mb-4">
          If you experience or witness unacceptable behavior, please immediately report it to:
        </p>
        <InfoBox variant="info">
          <p>
            <strong>Email:</strong> {contactInfo.conduct}
          </p>
          <p>
            <strong>Phone:</strong> [Emergency contact number]
          </p>
          <p className="mt-2 text-sm">Reports can be made anonymously if preferred</p>
        </InfoBox>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Response</h3>
        <p className="mb-4">
          All reports will be handled with discretion and confidentiality. Conference organizers
          will respond to reports promptly and may take any action deemed necessary, including:
        </p>
        <BulletList items={responseItems} />
      </Section>

      <Section title="Speaker Guidelines">
        <p className="mb-4">Speakers and presenters are expected to:</p>
        <BulletList items={speakerItems} />
      </Section>

      <Section title="Sponsor Guidelines">
        <p className="mb-4">Sponsors and exhibitors are expected to:</p>
        <BulletList items={sponsorItems} />
      </Section>

      <Section title="Photography and Recording">
        <p>
          By attending Gophercamp 2026, you consent to being photographed or recorded for
          promotional purposes. If you prefer not to be photographed, please inform the organizers,
          and we will make reasonable efforts to accommodate your request.
        </p>
      </Section>

      <Section title="Accessibility">
        <p>
          We are committed to making Gophercamp 2026 accessible to all participants. If you have
          specific accessibility needs, please contact us at
          <strong> {contactInfo.accessibility}</strong> so we can ensure your full participation in
          the conference.
        </p>
      </Section>

      <Section title="Open Source and Community Values">
        <p className="mb-4">
          As a conference celebrating the Go programming language and its community, we embrace the
          open source values of collaboration, transparency, and mutual respect. We encourage
          participants to:
        </p>
        <BulletList items={communityValueItems} />
      </Section>

      <Section title="Questions and Concerns">
        <p>
          If you have questions about this Code of Conduct or need clarification on any policies,
          please don&apos;t hesitate to contact the organizing committee at
          <strong> {contactInfo.conduct}</strong>.
        </p>
      </Section>

      <InfoBox variant="default" title="Thank You">
        <p>
          Thank you for helping make Gophercamp 2026 a welcoming, safe, and inclusive event for all
          participants. Together, we can create an amazing conference experience that celebrates our
          shared passion for Go and technology.
        </p>
      </InfoBox>
    </PolicyPage>
  );
}
