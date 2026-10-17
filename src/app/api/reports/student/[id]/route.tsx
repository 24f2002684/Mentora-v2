import { NextRequest, NextResponse } from 'next/server';
import React from 'react';
import ReactPDF, { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { getMockStore } from '@/lib/mock/store';
import { COMPETENCIES, CompetencyKey } from '@/lib/types/competencies';

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#0F1F1D',
    backgroundColor: '#FFFFFF',
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: '#0D9488',
    paddingBottom: 12,
    marginBottom: 16,
  },
  foundationTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#0D9488',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  reportSubtitle: {
    fontSize: 10,
    color: '#5B6F6C',
    marginTop: 2,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#0F1F1D',
    borderBottomWidth: 1,
    borderBottomColor: '#E1ECEA',
    paddingBottom: 4,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    width: 140,
    color: '#5B6F6C',
    fontFamily: 'Helvetica-Bold',
  },
  value: {
    flex: 1,
    color: '#0F1F1D',
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E1ECEA',
    borderRadius: 4,
    marginTop: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F6FAF9',
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E1ECEA',
    fontFamily: 'Helvetica-Bold',
    color: '#5B6F6C',
    fontSize: 9,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E1ECEA',
    fontSize: 9,
  },
  col1: { width: '55%' },
  col2: { width: '25%' },
  col3: { width: '20%', textAlign: 'right' },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 36,
    right: 36,
    textAlign: 'center',
    color: '#8FA7A3',
    fontSize: 8,
    borderTopWidth: 1,
    borderTopColor: '#E1ECEA',
    paddingTop: 8,
  },
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const store = getMockStore();
    const student = store.students.find((s) => s.id === id) || store.students[0];

    const studentTasks = store.tasks.filter((t) => t.student_id === student.id);
    const studentGoals = store.goals.filter((g) => g.student_id === student.id);
    const studentScores = store.competencyScores.filter((s) => s.student_id === student.id);
    const gamification = store.gamification[student.id] || { xp: 350, current_streak: 5 };

    const ReportDocument = (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.foundationTitle}>VASUMATHI RAMASWAMI CENTENARY FOUNDATION</Text>
            <Text style={styles.reportSubtitle}>
              Mentora Leadership Development &amp; Scholar Performance Report
            </Text>
          </View>

          {/* Scholar Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Scholar Profile</Text>
            <View style={styles.row}>
              <Text style={styles.label}>VRCF Scholar ID:</Text>
              <Text style={styles.value}>{student.vrcf_id} (Cohort {student.cohort})</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Full Name:</Text>
              <Text style={styles.value}>{student.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Degree &amp; Year:</Text>
              <Text style={styles.value}>{student.course_name} ({student.year_of_study})</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>College &amp; District:</Text>
              <Text style={styles.value}>{student.college} ({student.college_district || student.home_district})</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Residence Type:</Text>
              <Text style={styles.value}>{student.residence_type.replace('_', ' ').toUpperCase()}</Text>
            </View>
          </View>

          {/* Goals & Vision */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Academic Aim &amp; Leadership Vision</Text>
            {studentGoals.slice(0, 3).map((g, i) => (
              <View key={i} style={styles.row}>
                <Text style={styles.label}>[{g.kind.toUpperCase()}]:</Text>
                <Text style={styles.value}>{g.title} ({g.progress}% completed)</Text>
              </View>
            ))}
          </View>

          {/* Competency Ratings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Core Competency Ratings (1.0 - 5.0)</Text>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.col1}>Competency Domain</Text>
                <Text style={styles.col2}>Evaluation Source</Text>
                <Text style={styles.col3}>Rating / 5.0</Text>
              </View>
              {studentScores.slice(0, 10).map((cs, idx) => (
                <View key={idx} style={styles.tableRow}>
                  <Text style={styles.col1}>{COMPETENCIES[cs.competency as CompetencyKey]?.label || cs.competency}</Text>
                  <Text style={styles.col2}>{cs.source.toUpperCase()}</Text>
                  <Text style={styles.col3}>{cs.score.toFixed(1)} / 5.0</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Task Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Leadership Milestones &amp; Task History</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Total Tasks Assigned:</Text>
              <Text style={styles.value}>{studentTasks.length} milestones</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Completed &amp; Reviewed:</Text>
              <Text style={styles.value}>
                {studentTasks.filter((t) => t.status === 'reviewed').length} tasks
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Platform Engagement:</Text>
              <Text style={styles.value}>{gamification.xp} XP • {gamification.current_streak}-Day Active Learning Streak</Text>
            </View>
          </View>

          {/* Mentor Remarks */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Lead Mentor Remarks</Text>
            <Text style={{ lineHeight: 1.4, color: '#0F1F1D', fontStyle: 'italic' }}>
              &ldquo;{student.name} demonstrates exceptional discipline, active intellectual curiosity, and grounded leadership values. Consistently applies first-principles inquiry to coursework and community problem-solving.&rdquo;
            </Text>
            <Text style={{ marginTop: 6, fontFamily: 'Helvetica-Bold', color: '#0D9488' }}>
              — Ramkumar SKR, VRCF Lead Mentor
            </Text>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text>
              Generated on {new Date().toLocaleDateString()} • Vasumathi Ramaswami Centenary Foundation (VRCF) • Confidential
            </Text>
          </View>
        </Page>
      </Document>
    );

    const pdfBuffer = await ReactPDF.renderToBuffer(ReportDocument);

    return new NextResponse(pdfBuffer as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="VRCF_Report_${student.vrcf_id}.pdf"`,
      },
    });
  } catch (err: unknown) {
    console.error('PDF generation error:', err);
    return NextResponse.json({ error: 'Failed to render PDF report' }, { status: 500 });
  }
}
