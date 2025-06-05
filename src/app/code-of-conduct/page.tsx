import { Metadata } from 'next';
import { contactInfo } from '@/lib/social';

export const metadata: Metadata = {
  title: 'Code of Conduct | Gophercamp 2026',
  description: 'Code of conduct for Gophercamp 2026 conference, ensuring a safe and inclusive environment for all participants.',
};

export default function CodeOfConductPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Code of Conduct</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="lead text-xl text-gray-600 mb-8">
              Creating a safe, inclusive, and welcoming environment for all participants
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h2>
              <p>
                Gophercamp 2026 is dedicated to providing a harassment-free conference experience 
                for everyone, regardless of gender, gender identity and expression, age, sexual 
                orientation, disability, physical appearance, body size, race, ethnicity, religion 
                (or lack thereof), or technology choices.
              </p>
              <p className="mt-4">
                We do not tolerate harassment of conference participants in any form. Conference 
                participants violating these rules may be sanctioned or expelled from the conference 
                without a refund at the discretion of the conference organizers.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Expected Behavior</h2>
              <p className="mb-4">All participants are expected to:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Be respectful and considerate to others</li>
                <li>Communicate openly with respect for others</li>
                <li>Be collaborative and supportive</li>
                <li>Be mindful of your surroundings and fellow participants</li>
                <li>Alert community leaders if you notice violations of this Code of Conduct</li>
                <li>Respect the boundaries and personal space of others</li>
                <li>Be patient with questions and mistakes</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Unacceptable Behavior</h2>
              <p className="mb-4">
                Harassment includes, but is not limited to:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Verbal or written comments that reinforce social structures of domination</li>
                <li>Sexual language and imagery in any conference venue</li>
                <li>Deliberate intimidation, stalking, or following</li>
                <li>Harassing photography or recording</li>
                <li>Sustained disruption of talks or other events</li>
                <li>Inappropriate physical contact</li>
                <li>Unwelcome sexual attention or advances</li>
                <li>Advocating for or encouraging any of the above behaviors</li>
              </ul>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-6">
                <h3 className="text-lg font-semibold text-red-800 mb-2">Zero Tolerance</h3>
                <p className="text-red-700">
                  We have zero tolerance for harassment, discrimination, or any behavior that 
                  makes others feel unsafe or unwelcome. This applies to all conference spaces, 
                  including online interactions.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Scope</h2>
              <p className="mb-4">This Code of Conduct applies to:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>All conference venues and events</li>
                <li>Conference-related social events</li>
                <li>Online spaces (including social media, chat rooms, and forums)</li>
                <li>Communication between participants</li>
                <li>Any other conference-related activities</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Enforcement</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Reporting</h3>
              <p className="mb-4">
                If you experience or witness unacceptable behavior, please immediately report it to:
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <p><strong>Email:</strong> {contactInfo.conduct}</p>
                <p><strong>Phone:</strong> [Emergency contact number]</p>
                <p className="mt-2 text-sm text-blue-700">
                  Reports can be made anonymously if preferred
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Response</h3>
              <p className="mb-4">
                All reports will be handled with discretion and confidentiality. Conference 
                organizers will respond to reports promptly and may take any action deemed 
                necessary, including:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Warning the offender</li>
                <li>Requiring an apology</li>
                <li>Expulsion from the conference without refund</li>
                <li>Banning from future events</li>
                <li>Involving law enforcement if necessary</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Speaker Guidelines</h2>
              <p className="mb-4">Speakers and presenters are expected to:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Avoid using language or imagery that could be considered offensive</li>
                <li>Be respectful of different skill levels in the audience</li>
                <li>Create inclusive presentations that welcome all participants</li>
                <li>Respect time limits and session guidelines</li>
                <li>Be available for questions while maintaining professional boundaries</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sponsor Guidelines</h2>
              <p className="mb-4">Sponsors and exhibitors are expected to:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Follow all aspects of this Code of Conduct</li>
                <li>Avoid sexualized imagery or activities in their booths</li>
                <li>Treat all participants with respect and professionalism</li>
                <li>Comply with conference policies regarding promotions and giveaways</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Photography and Recording</h2>
              <p>
                By attending Gophercamp 2026, you consent to being photographed or recorded 
                for promotional purposes. If you prefer not to be photographed, please inform 
                the organizers, and we will make reasonable efforts to accommodate your request.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Accessibility</h2>
              <p>
                We are committed to making Gophercamp 2026 accessible to all participants. 
                If you have specific accessibility needs, please contact us at 
                <strong> {contactInfo.accessibility}</strong> so we can ensure your 
                full participation in the conference.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Open Source and Community Values</h2>
              <p>
                As a conference celebrating the Go programming language and its community, 
                we embrace the open source values of collaboration, transparency, and mutual 
                respect. We encourage participants to:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Share knowledge freely and constructively</li>
                <li>Welcome newcomers to the Go community</li>
                <li>Celebrate diverse perspectives and approaches</li>
                <li>Foster an environment of learning and growth</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions and Concerns</h2>
              <p>
                If you have questions about this Code of Conduct or need clarification on 
                any policies, please don&apos;t hesitate to contact the organizing committee at 
                <strong> {contactInfo.conduct}</strong>.
              </p>
            </section>

            <section className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-green-800 mb-4">Thank You</h2>
              <p className="text-green-700">
                Thank you for helping make Gophercamp 2026 a welcoming, safe, and inclusive 
                event for all participants. Together, we can create an amazing conference 
                experience that celebrates our shared passion for Go and technology.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
