import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { GridSmartDay, GridSmartSession } from '@/lib/sessionize';

// ---------------------------------------------------------------------------
// Fonts
// ---------------------------------------------------------------------------

Font.register({
  family: 'Inter',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZg.ttf',
      fontWeight: 700,
    },
  ],
});

// ---------------------------------------------------------------------------
// Design tokens
// ---------------------------------------------------------------------------

const BLUE = '#00ADD8';
const GRAY_DARK = '#1a1a2e';
const GRAY_MID = '#4a4a6a';
const GRAY_LIGHT = '#e8e8f0';
const GRAY_BG = '#f5f5fa';
const WHITE = '#ffffff';

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Inter',
    fontSize: 9,
    color: GRAY_DARK,
    backgroundColor: WHITE,
    paddingTop: 36,
    paddingBottom: 48,
    paddingHorizontal: 36,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: BLUE,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: GRAY_DARK,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 10,
    color: GRAY_MID,
    marginTop: 2,
  },
  headerMeta: {
    fontSize: 8,
    color: GRAY_MID,
    textAlign: 'right',
  },

  // Day section
  dayContainer: {
    marginBottom: 20,
  },
  dayHeader: {
    backgroundColor: BLUE,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginBottom: 8,
  },
  dayHeaderText: {
    fontSize: 11,
    fontWeight: 700,
    color: WHITE,
    letterSpacing: 0.3,
  },

  // Table
  table: {
    width: '100%',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: GRAY_LIGHT,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 3,
    marginBottom: 2,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: GRAY_LIGHT,
  },
  tableRowAlt: {
    backgroundColor: GRAY_BG,
  },
  tableRowService: {
    backgroundColor: '#fffbe6',
  },

  // Columns
  colTime: {
    width: '12%',
  },
  colRoom: {
    width: '15%',
  },
  colTitle: {
    width: '48%',
    paddingRight: 8,
  },
  colSpeaker: {
    width: '25%',
  },

  // Cell text
  cellHeaderText: {
    fontSize: 8,
    fontWeight: 700,
    color: GRAY_MID,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  cellText: {
    fontSize: 8.5,
    color: GRAY_DARK,
    lineHeight: 1.4,
  },
  cellTextMuted: {
    fontSize: 8,
    color: GRAY_MID,
    lineHeight: 1.4,
  },
  cellTextBold: {
    fontSize: 8.5,
    fontWeight: 700,
    color: GRAY_DARK,
    lineHeight: 1.4,
  },
  cellTextService: {
    fontSize: 8.5,
    color: '#7a6500',
    fontWeight: 700,
    lineHeight: 1.4,
  },
  blueAccent: {
    color: BLUE,
    fontWeight: 700,
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 36,
    right: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: GRAY_LIGHT,
    paddingTop: 6,
  },
  footerText: {
    fontSize: 7,
    color: GRAY_MID,
  },
  footerBlue: {
    fontSize: 7,
    color: BLUE,
  },
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString('en-GB', {
    timeZone: 'Europe/Prague',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function formatDayHeader(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    timeZone: 'Europe/Prague',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

interface FlatRow {
  time: string;
  room: string;
  title: string;
  speakers: string;
  isService: boolean;
  isPlenum: boolean;
}

/**
 * Flattens a GridSmartDay into a sorted list of display rows, one per
 * session-room combination.
 */
function flattenDay(day: GridSmartDay): FlatRow[] {
  const rows: FlatRow[] = [];

  for (const timeSlot of day.timeSlots) {
    for (const roomSlot of timeSlot.rooms) {
      const session: GridSmartSession = roomSlot.session;
      if (!session.startsAt) continue;

      const time = `${formatTime(session.startsAt)}${session.endsAt ? ` – ${formatTime(session.endsAt)}` : ''}`;
      const speakers = session.speakers.map(s => s.name).join(', ');

      rows.push({
        time,
        room: roomSlot.name,
        title: session.title,
        speakers,
        isService: session.isServiceSession,
        isPlenum: session.isPlenumSession,
      });
    }
  }

  // De-duplicate: plenum / service sessions appear once per room in the API
  // but we want them on a single row.
  const seen = new Set<string>();
  const deduped: FlatRow[] = [];
  for (const row of rows) {
    const key = `${row.time}||${row.title}`;
    if (row.isPlenum || row.isService) {
      if (seen.has(key)) continue;
      seen.add(key);
      deduped.push({ ...row, room: 'All rooms' });
    } else {
      deduped.push(row);
    }
  }

  // Sort by start time string (ISO-safe lexicographic sort)
  deduped.sort((a, b) => a.time.localeCompare(b.time));

  return deduped;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function TableHeader() {
  return (
    <View style={styles.tableHeaderRow}>
      <View style={styles.colTime}>
        <Text style={styles.cellHeaderText}>Time</Text>
      </View>
      <View style={styles.colRoom}>
        <Text style={styles.cellHeaderText}>Room</Text>
      </View>
      <View style={styles.colTitle}>
        <Text style={styles.cellHeaderText}>Session</Text>
      </View>
      <View style={styles.colSpeaker}>
        <Text style={styles.cellHeaderText}>Speaker(s)</Text>
      </View>
    </View>
  );
}

function SessionRow({ row, index }: { row: FlatRow; index: number }) {
  const isAlt = index % 2 === 1;
  const rowStyle = [
    styles.tableRow,
    row.isService ? styles.tableRowService : isAlt ? styles.tableRowAlt : undefined,
  ].filter(Boolean);

  return (
    // @ts-expect-error: mixed style array is fine for react-pdf
    <View style={rowStyle} wrap={false}>
      <View style={styles.colTime}>
        <Text style={styles.cellTextMuted}>{row.time}</Text>
      </View>
      <View style={styles.colRoom}>
        <Text style={row.isPlenum || row.isService ? styles.cellTextMuted : styles.cellTextMuted}>
          {row.room}
        </Text>
      </View>
      <View style={styles.colTitle}>
        <Text style={row.isService ? styles.cellTextService : styles.cellTextBold}>
          {row.title}
        </Text>
      </View>
      <View style={styles.colSpeaker}>
        <Text style={styles.cellText}>{row.speakers}</Text>
      </View>
    </View>
  );
}

function DaySection({ day }: { day: GridSmartDay }) {
  const rows = flattenDay(day);
  return (
    <View style={styles.dayContainer} wrap={false}>
      <View style={styles.dayHeader}>
        <Text style={styles.dayHeaderText}>{formatDayHeader(day.date)}</Text>
      </View>
      <View style={styles.table}>
        <TableHeader />
        {rows.map((row, i) => (
          <SessionRow key={`${row.time}-${row.room}-${i}`} row={row} index={i} />
        ))}
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Document
// ---------------------------------------------------------------------------

interface ProgramPdfProps {
  days: GridSmartDay[];
  generatedAt: string;
}

/**
 * React-PDF document for the Gophercamp conference program.
 */
export default function ProgramPdf({ days, generatedAt }: ProgramPdfProps) {
  return (
    <Document
      title="Gophercamp 2026 — Program"
      author="Gophercamp"
      subject="Conference Program"
      keywords="Gophercamp, Go, Golang, conference, schedule"
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header} fixed>
          <View>
            <Text style={styles.headerTitle}>Gophercamp 2026</Text>
            <Text style={styles.headerSubtitle}>Conference Program · April 23–24, Brno</Text>
          </View>
          <View>
            <Text style={styles.headerMeta}>gophercamp.cz</Text>
            <Text style={styles.headerMeta}>Generated {generatedAt}</Text>
          </View>
        </View>

        {/* Days */}
        {days.map(day => (
          <DaySection key={day.date} day={day} />
        ))}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            Program is subject to change · This program is not final
          </Text>
          <Text style={styles.footerBlue}>gophercamp.cz</Text>
        </View>
      </Page>
    </Document>
  );
}
