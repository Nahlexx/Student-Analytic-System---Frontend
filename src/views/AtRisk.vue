<template>
  <div class="dashboard-container">
    
    <!-- Main Content -->
    <div class="content">
      <h1 class="title">STUDENT AT RISK</h1>
      
      <!-- Filter Controls -->
      <div class="filter-controls">
        <div class="filter-item">
          <label for="year-select">Academic Year:</label>
          <select id="year-select" v-model="selectedYear" @change="filterStudents">
            <option v-for="year in academicYears" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
        
        <div class="filter-item">
          <label for="semester-select">Semester:</label>
          <select id="semester-select" v-model="selectedSemester" @change="filterStudents">
            <option v-for="sem in semesters" :key="sem.value" :value="sem.value">{{ sem.label }}</option>
          </select>
        </div>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>STUDENT</th>
            <th>SUBJECT</th>
            <th>GRADE</th>
            <th>SUPPORT NEEDED</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in filteredStudents" :key="student.id">
            <td>{{ student.name }}</td>
            <td>{{ student.subject }}</td>
            <td>{{ student.grade }}</td>
            <td>
              <div class="gauge-container">
                <div>
                  <svg class="gauge" viewBox="0 0 100 50">
                    <path d="M10,40 A40,40 0 0,1 90,40" fill="none" stroke="#ddd" stroke-width="10" />
                    <path 
                      :d="getSupportPath(student.supportLevel)" 
                      fill="none" 
                      stroke="#999" 
                      stroke-width="10" 
                    />
                  </svg>
                  <div class="gauge-labels">
                    <span>low</span>
                    <span>med</span>
                    <span>high</span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentAtRiskDashboard',
  data() {
    return {
      menuItems: [
        { text: 'Student Performance Report', active: false },
        { text: 'At-Risk Student List', active: true },
        { text: 'Subject Analytics', active: false },
        { text: 'School Year Comparison Report', active: false },
        { text: 'Real-Time Grade Update Stream', active: false }
      ],
      // Academic years and semesters for filtering
      academicYears: ['2024-2025', '2023-2024', '2022-2023', '2021-2022'],
      selectedYear: '2024-2025',
      semesters: [
        { value: 'all', label: 'All Semesters' },
        { value: '1', label: '1st Semester' },
        { value: '2', label: '2nd Semester' },
        { value: '3', label: 'Summer' }
      ],
      selectedSemester: 'all',
      atRiskStudents: [],
      filteredStudents: [],
      subjects: [
        { code: "SSPE 11", name: "Physical Education 1" },
        { code: "SSPE 111", name: "Physical Education 2" },
        { code: "CSELEC 3", name: "Computer Science Elective 3" },
        { code: "CSPC 112", name: "Data Structures and Algorithms" },
        { code: "MSTE 111", name: "Calculus 1" },
        { code: "CSPC 114", name: "Introduction to Programming" },
        { code: "GEED 10", name: "Mathematics in Modern World" },
        { code: "GEED 20", name: "Science, Technology and Society" },
        { code: "GEED 30", name: "Ethics" },
        { code: "LBYCPA1", name: "Computer Programming 1" }
      ],
      riskFactors: [
        "Poor attendance", "Missing assignments", "Low test scores", "Lack of participation",
        "Behavioral issues", "Health concerns", "Family issues", "Financial problems",
        "Work commitments", "Transportation issues"
      ],
      interventionTypes: [
        "Academic counseling", "Tutoring sessions", "Study group placement", "Mentorship program",
        "Parent-teacher conference", "Additional practice materials", "Extended submission deadlines",
        "Weekly progress checks", "Psychological support", "Financial aid assistance"
      ]
    };
  },
  methods: {
    selectMenuItem(index) {
      this.menuItems.forEach((item, i) => {
        item.active = (i === index);
      });
    },
    getSupportPath(level) {
      let endX, endY;
      if (level <= 3) {
        endX = 80 + (level * 3);
        endY = 10 + (level * 5);
      } else if (level <= 7) {
        endX = 60 + ((level - 3) * 3);
        endY = 15 - ((level - 3) * 1);
      } else {
        endX = 50 - ((level - 7) * 10);
        endY = 20 - ((level - 7) * 2);
      }
      return `M10,40 A40,40 0 0,1 ${endX},${endY}`;
    },
    generateGrade() {
      const rand = Math.random();
      if (rand < 0.1) return (Math.floor(Math.random() * 6) / 4 + 1).toFixed(2);
      if (rand < 0.3) return (Math.floor(Math.random() * 4) / 4 + 1.75).toFixed(2);
      if (rand < 0.5) return (Math.floor(Math.random() * 2) / 4 + 2.75).toFixed(2);
      if (rand < 0.7) return (Math.floor(Math.random() * 3) / 4 + 3.25).toFixed(2);
      return (Math.floor(Math.random() * 5) / 4 + 4).toFixed(2);
    },
    calculateSupportLevel(grade, riskFactorsCount) {
      const gradeNum = parseFloat(grade);
      let supportScore = 0;
      if (gradeNum >= 4) supportScore += 7;
      else if (gradeNum >= 3.25) supportScore += 5;
      else if (gradeNum >= 2.75) supportScore += 3;
      else if (gradeNum >= 1.75) supportScore += 1;
      supportScore += riskFactorsCount * 0.5;
      return Math.min(Math.round(supportScore), 10);
    },
    generateStudentRecord() {
      const firstNames = ["Si", "Ante", "Juan", "Cha", "Binu", "Maria", "Pedro", "Juana", "Carlo", "Erica", "Renz", "Leo", "Anna", "Miguel", "Jose", "Tala", "Bayani", "Maya"];
      const lastNames = ["Angkol", "Mo", "Tamad", "Nak", "Li", "Santos", "Cruz", "Reyes", "Tan", "Lim", "Garcia", "Lopez", "Mendoza", "Pascual", "Dizon", "Flores", "Aquino"];
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const subject = this.subjects[Math.floor(Math.random() * this.subjects.length)];
      const grade = this.generateGrade();
      const studentRiskFactors = [];
      const riskFactorCount = Math.floor(Math.random() * 5) + 1;
      while (studentRiskFactors.length < riskFactorCount) {
        const factor = this.riskFactors[Math.floor(Math.random() * this.riskFactors.length)];
        if (!studentRiskFactors.includes(factor)) studentRiskFactors.push(factor);
      }
      const supportLevel = this.calculateSupportLevel(grade, studentRiskFactors.length);
      const recommendedInterventions = [];
      const interventionCount = Math.min(Math.ceil(supportLevel / 3), 3);
      while (recommendedInterventions.length < interventionCount) {
        const intervention = this.interventionTypes[Math.floor(Math.random() * this.interventionTypes.length)];
        if (!recommendedInterventions.includes(intervention)) recommendedInterventions.push(intervention);
      }
      
      // Assign random academic year and semester
      const year = this.academicYears[Math.floor(Math.random() * this.academicYears.length)];
      const semester = this.semesters[Math.floor(Math.random() * (this.semesters.length - 1)) + 1].value;
      
      return {
        id: Math.floor(Math.random() * 100000) + 10000,
        name: `${firstName} ${lastName}`,
        subject: subject.code,
        subjectName: subject.name,
        grade: grade,
        academicYear: year,
        semester: semester,
        riskFactors: studentRiskFactors,
        supportLevel: supportLevel,
        supportCategory: supportLevel <= 3 ? "low" : supportLevel <= 7 ? "medium" : "high",
        recommendedInterventions: recommendedInterventions,
        lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString()
      };
    },
    generateStudentDataset(count = 20) {
      const students = [];
      for (let i = 0; i < count; i++) {
        students.push(this.generateStudentRecord());
      }
      return students;
    },
    async fetchAtRiskStudents() {
      try {
        const mockData = this.generateMockData();
        this.atRiskStudents = mockData;
        this.filterStudents();
      } catch (error) {
        console.error('Error fetching at-risk students:', error);
      }
    },
    generateMockData() {
      // Generate some random students
      const randomStudents = this.generateStudentDataset(15);
      
      // Add example students with specific academic years and semesters
      const exampleStudents = [
        { 
          id: 12345, 
          name: "Si Angkol", 
          subject: "SSPE 11", 
          grade: "3.00", 
          academicYear: "2024-2025", 
          semester: "1", 
          supportLevel: 6, 
          supportCategory: "medium" 
        },
        { 
          id: 23456, 
          name: "Ante Mo", 
          subject: "CSELEC 3", 
          grade: "5.00", 
          academicYear: "2024-2025", 
          semester: "1", 
          supportLevel: 9, 
          supportCategory: "high" 
        },
        { 
          id: 34567, 
          name: "Juan Tamad", 
          subject: "SSPE 111", 
          grade: "5.00", 
          academicYear: "2023-2024", 
          semester: "2", 
          supportLevel: 8, 
          supportCategory: "high" 
        },
        { 
          id: 45678, 
          name: "Cha Nak", 
          subject: "CSPC 112", 
          grade: "3.50", 
          academicYear: "2023-2024", 
          semester: "1", 
          supportLevel: 5, 
          supportCategory: "medium" 
        },
        { 
          id: 56789, 
          name: "Binu Li", 
          subject: "MSTE 111", 
          grade: "3.00", 
          academicYear: "2022-2023", 
          semester: "3", 
          supportLevel: 4, 
          supportCategory: "medium" 
        }
      ];
      
      return [...exampleStudents, ...randomStudents];
    },
    filterStudents() {
      // Filter students based on selected year and semester
      this.filteredStudents = this.atRiskStudents.filter(student => {
        const yearMatch = student.academicYear === this.selectedYear;
        const semesterMatch = this.selectedSemester === 'all' || student.semester === this.selectedSemester;
        return yearMatch && semesterMatch;
      });
    }
  },
  mounted() {
    this.fetchAtRiskStudents();
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

.dashboard-container {
  display: flex;
  height: 100vh;
}

.content {
  flex: 1;
  padding: 20px;
  background-color: #fff;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* Filter controls styling */
.filter-controls {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-item label {
  font-weight: bold;
  color: #333;
}

.filter-item select {
  padding: 8px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 14px;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px 15px;
  text-align: left;
}

th {
  background-color: #f9f9f9;
  border-bottom: 2px solid #ddd;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

.gauge-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.gauge {
  width: 100px;
  height: 50px;
}

.gauge-labels {
  display: flex;
  justify-content: space-between;
  width: 100px;
  font-size: 12px;
  color: #666;
}
</style>