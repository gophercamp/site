'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function LocationPage() {
  const [selectedAirport, setSelectedAirport] = useState<'BRQ' | 'PRG' | 'VIE'>('BRQ');

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-go-blue/10 to-go-blue/5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Getting to Gophercamp 2026
              </h1>
              <p className="text-lg text-secondary mb-6">
                Clubco Brno, Vlněna 5, 602 00 Brno-střed, Czech Republic
              </p>
            </motion.div>
          </div>
        </section>

        {/* Venue Photo and Map */}
        <section className="py-12 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Large Photo */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative h-[400px] rounded-lg overflow-hidden shadow-xl bg-gradient-to-br from-go-blue/20 to-go-blue/10"
                >
                  <Image
                    src="/images/clubco.jpg"
                    alt="Clubco Brno - Modern Coworking Space"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>

                {/* Large Map */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2606.6847516886826!2d16.614781576923447!3d49.189698371332314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471295e59b9ac4e9%3A0x8a934dd181c8d98e!2sClubco!5e0!3m2!1sen!2scz!4v1647890123456!5m2!1sen!2scz"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Clubco Brno Location Map"
                  ></iframe>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* About the Venue */}
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-primary mb-6 text-center">About the Venue</h2>
              <div className="bg-primary rounded-lg p-6 md:p-8">
                <p className="text-secondary mb-4">
                  Clubco is a modern coworking and event space located in the historic Vlněna
                  textile factory, now transformed into a vibrant creative hub in Brno. The venue
                  offers excellent facilities for conferences, with state-of-the-art AV equipment,
                  comfortable seating, and great networking spaces.
                </p>
                <p className="text-secondary">
                  The location is perfect for attendees, being just a 5-minute walk from Brno&apos;s
                  main railway station and well-connected by public transport. The area is full of
                  cafes, restaurants, and hotels, making it easy to explore Brno before or after the
                  conference.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Directions */}
        <section className="py-12 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-primary mb-8 text-center">How to Get There</h2>

              <div className="space-y-8">
                {/* From Brno Main Station */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-secondary rounded-lg p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-go-blue text-white rounded-full p-3 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary mb-3">
                        From Brno Main Railway Station (Hlavní nádraží)
                      </h3>
                      <ol className="list-decimal list-inside space-y-2 text-secondary">
                        <li>Exit the station and head south on Nádražní street</li>
                        <li>Turn right onto Vlněna street</li>
                        <li>Walk approximately 400 meters (5 minutes)</li>
                        <li>
                          Clubco is on your right in the renovated Vlněna textile factory complex
                        </li>
                      </ol>
                      <div className="mt-4 p-3 bg-go-blue/10 rounded">
                        <p className="text-sm text-secondary">
                          <strong>Walking time:</strong> 5 minutes | <strong>Distance:</strong> 400m
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* By Tram/Bus */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-secondary rounded-lg p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-go-blue text-white rounded-full p-3 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary mb-3">By Public Transport</h3>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-bold text-primary mb-2">Tram:</h4>
                          <p className="text-secondary">
                            Take tram <strong>1, 2, or 4</strong> to{' '}
                            <strong>&quot;Hlavní nádraží&quot;</strong> stop, then walk 5 minutes to
                            Clubco.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-bold text-primary mb-2">Bus:</h4>
                          <p className="text-secondary">
                            Multiple bus lines stop at <strong>&quot;Hlavní nádraží&quot;</strong>{' '}
                            (Main Station), from where it&apos;s a 5-minute walk.
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-go-blue/10 rounded">
                        <p className="text-sm text-secondary">
                          <strong>Tip:</strong> You can use the{' '}
                          <a
                            href="https://idos.idnes.cz/en/brno/spojeni/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-go-blue hover:underline"
                          >
                            IDOS journey planner
                          </a>{' '}
                          to find the best route.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* By Car */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-secondary rounded-lg p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-go-blue text-white rounded-full p-3 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary mb-3">By Car</h3>
                      <p className="text-secondary mb-3">
                        If you&apos;re driving to Gophercamp, you can use GPS navigation with the
                        address: Vlněna 5, 602 00 Brno.
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-bold text-primary">Parking Options:</h4>
                        <ul className="list-disc list-inside space-y-1 text-secondary">
                          <li>Street parking available nearby (paid during working hours)</li>
                          <li>
                            Parking garage at <strong>Main Station</strong> (5 minutes walk)
                          </li>
                          <li>
                            Public parking at <strong>OC Vaňkovka</strong> shopping center (10
                            minutes walk)
                          </li>
                        </ul>
                      </div>
                      <div className="mt-4 p-3 bg-go-blue/10 rounded">
                        <p className="text-sm text-secondary">
                          <strong>Note:</strong> Parking in the city center can be limited. We
                          recommend using public transport or arriving early.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* From Airport - with picker */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-secondary rounded-lg p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-go-blue text-white rounded-full p-3 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary mb-4">From Airport</h3>

                      {/* Airport Picker */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-secondary mb-3">
                          Select your arrival airport:
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          <button
                            onClick={() => setSelectedAirport('BRQ')}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              selectedAirport === 'BRQ'
                                ? 'border-go-blue bg-go-blue/10 text-primary'
                                : 'border-primary bg-primary text-secondary hover:border-go-blue/50'
                            }`}
                          >
                            <div className="font-bold text-lg">BRQ</div>
                            <div className="text-xs">Brno</div>
                            <div className="text-xs opacity-75">10 km</div>
                          </button>
                          <button
                            onClick={() => setSelectedAirport('PRG')}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              selectedAirport === 'PRG'
                                ? 'border-go-blue bg-go-blue/10 text-primary'
                                : 'border-primary bg-primary text-secondary hover:border-go-blue/50'
                            }`}
                          >
                            <div className="font-bold text-lg">PRG</div>
                            <div className="text-xs">Prague</div>
                            <div className="text-xs opacity-75">200 km</div>
                          </button>
                          <button
                            onClick={() => setSelectedAirport('VIE')}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              selectedAirport === 'VIE'
                                ? 'border-go-blue bg-go-blue/10 text-primary'
                                : 'border-primary bg-primary text-secondary hover:border-go-blue/50'
                            }`}
                          >
                            <div className="font-bold text-lg">VIE</div>
                            <div className="text-xs">Vienna</div>
                            <div className="text-xs opacity-75">130 km</div>
                          </button>
                        </div>
                      </div>

                      {/* BRQ Instructions */}
                      {selectedAirport === 'BRQ' && (
                        <div className="space-y-3">
                          <h4 className="font-bold text-primary text-lg">
                            From Brno-Tuřany Airport (BRQ)
                          </h4>
                          <div>
                            <h5 className="font-bold text-primary mb-2">By Bus:</h5>
                            <p className="text-secondary">
                              Take bus <strong>76</strong> or <strong>Airport Express</strong> to
                              the city center (Main Station), then walk 5 minutes to Clubco.
                            </p>
                            <p className="text-secondary text-sm mt-1">
                              Duration: ~25 minutes | Cost: ~30 CZK
                            </p>
                          </div>
                          <div>
                            <h5 className="font-bold text-primary mb-2">By Taxi/Uber:</h5>
                            <p className="text-secondary">
                              Direct ride from the airport to Clubco takes approximately 15-20
                              minutes.
                            </p>
                            <p className="text-secondary text-sm mt-1">
                              Duration: ~15-20 minutes | Cost: ~300-400 CZK
                            </p>
                          </div>
                          <div className="mt-4 p-3 bg-go-blue/10 rounded">
                            <p className="text-sm text-secondary">
                              <strong>Note:</strong> BRQ is a small regional airport with limited
                              international connections. Most international travelers use Prague or
                              Vienna airports.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* PRG Instructions */}
                      {selectedAirport === 'PRG' && (
                        <div className="space-y-3">
                          <h4 className="font-bold text-primary text-lg">
                            From Prague Václav Havel Airport (PRG)
                          </h4>
                          <div>
                            <h5 className="font-bold text-primary mb-2">By Train (Recommended):</h5>
                            <ol className="list-decimal list-inside space-y-1 text-secondary">
                              <li>
                                Take <strong>Airport Express (AE)</strong> bus from the airport to{' '}
                                <strong>Prague Main Station (Praha hl.n.)</strong>
                              </li>
                              <li>
                                Board a direct train to <strong>Brno Main Station</strong>
                              </li>
                              <li>Walk 5 minutes from Brno station to Clubco</li>
                            </ol>
                            <p className="text-secondary text-sm mt-2">
                              Duration: ~3.5 hours total | Cost: ~60 CZK (bus) + ~200-400 CZK
                              (train)
                            </p>
                            <p className="text-secondary text-sm">
                              Trains run every hour. Book tickets at{' '}
                              <a
                                href="https://www.cd.cz/en/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-go-blue hover:underline"
                              >
                                cd.cz
                              </a>{' '}
                              or{' '}
                              <a
                                href="https://www.regiojet.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-go-blue hover:underline"
                              >
                                RegioJet
                              </a>
                            </p>
                          </div>
                          <div>
                            <h5 className="font-bold text-primary mb-2">By Bus:</h5>
                            <p className="text-secondary">
                              Direct <strong>FlixBus</strong> or <strong>RegioJet</strong> buses run
                              from Prague Airport to Brno Main Station.
                            </p>
                            <p className="text-secondary text-sm mt-1">
                              Duration: ~3 hours | Cost: ~150-300 CZK
                            </p>
                          </div>
                          <div>
                            <h5 className="font-bold text-primary mb-2">By Car/Transfer:</h5>
                            <p className="text-secondary">
                              Private transfer or rental car via D1 motorway to Brno.
                            </p>
                            <p className="text-secondary text-sm mt-1">
                              Duration: ~2-2.5 hours | Cost: Varies
                            </p>
                          </div>
                          <div className="mt-4 p-3 bg-go-blue/10 rounded">
                            <p className="text-sm text-secondary">
                              <strong>Tip:</strong> PRG is the largest airport in Czech Republic
                              with excellent connections to Brno. Book train/bus tickets in advance
                              for better prices.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* VIE Instructions */}
                      {selectedAirport === 'VIE' && (
                        <div className="space-y-3">
                          <h4 className="font-bold text-primary text-lg">
                            From Vienna International Airport (VIE)
                          </h4>
                          <div>
                            <h5 className="font-bold text-primary mb-2">By Bus (Recommended):</h5>
                            <p className="text-secondary">
                              Direct <strong>FlixBus</strong> or <strong>RegioJet</strong> buses run
                              from Vienna Airport to Brno Main Station (multiple daily departures).
                            </p>
                            <p className="text-secondary text-sm mt-2">
                              Duration: ~2 hours | Cost: ~200-400 CZK (~8-15 EUR)
                            </p>
                            <p className="text-secondary text-sm">
                              Book at{' '}
                              <a
                                href="https://www.flixbus.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-go-blue hover:underline"
                              >
                                FlixBus
                              </a>{' '}
                              or{' '}
                              <a
                                href="https://www.regiojet.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-go-blue hover:underline"
                              >
                                RegioJet
                              </a>
                            </p>
                          </div>
                          <div>
                            <h5 className="font-bold text-primary mb-2">By Train:</h5>
                            <ol className="list-decimal list-inside space-y-1 text-secondary">
                              <li>
                                Take the <strong>City Airport Train (CAT)</strong> or{' '}
                                <strong>S7</strong> train to Vienna Main Station (Wien Hbf)
                              </li>
                              <li>
                                Board a train to Brno (some require transfer in Wien Meidling)
                              </li>
                              <li>Walk 5 minutes from Brno station to Clubco</li>
                            </ol>
                            <p className="text-secondary text-sm mt-2">
                              Duration: ~2.5-3 hours total | Cost: ~15-30 EUR
                            </p>
                          </div>
                          <div>
                            <h5 className="font-bold text-primary mb-2">By Car/Transfer:</h5>
                            <p className="text-secondary">
                              Private transfer or rental car via A5/E461 highway to Brno.
                            </p>
                            <p className="text-secondary text-sm mt-1">
                              Duration: ~1.5-2 hours | Cost: Varies
                            </p>
                          </div>
                          <div className="mt-4 p-3 bg-go-blue/10 rounded">
                            <p className="text-sm text-secondary">
                              <strong>Tip:</strong> Vienna Airport is often cheaper for
                              international flights and closer to Brno than Prague. The direct bus
                              is the easiest option!
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-primary mb-6 text-center">Accessibility</h2>
              <div className="bg-primary rounded-lg p-6 md:p-8">
                <div className="flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-go-blue flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-secondary mb-4">
                      Clubco is a wheelchair-accessible venue with elevators and accessible
                      restrooms. If you have any specific accessibility needs or questions, please
                      contact us at{' '}
                      <a
                        href="mailto:accessibility@gophercamp.cz"
                        className="text-go-blue hover:underline"
                      >
                        accessibility@gophercamp.cz
                      </a>
                    </p>
                    <p className="text-secondary">
                      We&apos;re committed to making Gophercamp an inclusive event for everyone. Let
                      us know how we can help make your conference experience better.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact for Questions */}
        <section className="py-12 bg-primary">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold text-primary mb-4">Still Have Questions?</h2>
              <p className="text-secondary mb-6">
                If you need help finding the venue or have any questions about getting to
                Gophercamp, feel free to reach out!
              </p>
              <Button href="mailto:info@gophercamp.cz" variant="primary" size="lg">
                Contact Us
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
