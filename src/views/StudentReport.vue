<template>
  <main class="dashboard__main">
    <div class="main__search">
      <input
        v-model="selectedStudentIdInput"
        @keyup.enter="searchStudent"
        type="text"
        placeholder="Search student ID"
      />
    </div>

    <h2 class="main__title">Student Performance Report</h2>
    <div class="main__student-name">Student Name: {{ selectedStudent.name }}</div>
    <div>TESTING STUDENT REPORT VIEW</div>

    <!-- Stats Section -->
    <div class="stats">
      <div class="stat-box">
        <strong>GPA</strong>
        <div>{{ selectedStudent.gpa }}</div>
      </div>
      <div class="stat-box" :class="{ negative: selectedStudent.zScore < 0 }">
        <strong>Z Score</strong>
        <div>{{ selectedStudent.zScore }}</div>
      </div>
      <div class="stat-box" :class="{ negative: selectedStudent.gpaVsAverage < 0 }">
        <strong>GPA vs Class Average</strong>
        <div>{{ selectedStudent.gpaVsAverage }}</div>
      </div>
    </div>

    <!-- Subject Table -->
    <table class="subject-table">
      <thead>
        <tr>
          <th>Subject Code</th>
          <th>Description</th>
          <th>Student Grade</th>
          <th>Class Average</th>
          <th>Rate</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(subject, index) in selectedStudent.subjects" :key="index">
          <td>{{ subject.code }}</td>
          <td>{{ subject.description }}</td>
          <td>{{ subject.grade }}</td>
          <td>{{ subject.classAverage }}</td>
          <td>{{ subject.rate }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script>
export default {
  name: 'StudentReport',
  data() {
    return {
      selectedStudentId: 1001,
      selectedStudentIdInput: '',
      students: [
        {
          id: 1001,
          name: 'MAMA MO',
          gpa: 1.75,
          zScore: -0.84,
          gpaVsAverage: -0.11,
          subjects: [
            { code: 'CSELEC 3', description: 'Parallel Computing', grade: 1.5, classAverage: 1.857, rate: 'Higher' },
            { code: 'CSPC 112', description: 'OS', grade: 1.75, classAverage: 1.687, rate: 'Higher' },
            { code: 'SSPE 111', description: 'Physical Education', grade: 2.0, classAverage: 1.95, rate: 'Lower' },
            { code: 'MSTE 111', description: 'Math Sciences', grade: 1.75, classAverage: 2.1, rate: 'Higher' }
          ]
        },
        {
          id: 2002,
          name: 'JOHN DOE',
          gpa: 2.5,
          zScore: 0.34,
          gpaVsAverage: 0.2,
          subjects: [
            { code: 'ENG 101', description: 'English', grade: 2.5, classAverage: 2.3, rate: 'Higher' },
            { code: 'MATH 101', description: 'Calculus', grade: 2.0, classAverage: 2.2, rate: 'Lower' },
            { code: 'SCI 101', description: 'Physics', grade: 2.75, classAverage: 2.6, rate: 'Higher' }
          ]
        }
      ]
    };
  },
  computed: {
    selectedStudent() {
      return this.students.find(student => student.id === this.selectedStudentId) || this.students[0];
    }
  },
  methods: {
    searchStudent() {
      const id = parseInt(this.selectedStudentIdInput);
      const match = this.students.find(student => student.id === id);
      if (match) {
        this.selectedStudentId = id;
        this.selectedStudentIdInput = ''; // Clear input
      } else {
        alert('Student ID not found.');
      }
    }
  }
};
</script>

<style scoped>
.dashboard__main {
  padding: 40px;
  overflow-y: auto;
  background-color: #f9fafc;
  font-family: 'Segoe UI', sans-serif;
}

.main__search input[type="text"] {
  padding: 10px;
  width: 280px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
}

.main__title {
  margin-top: 20px;
  font-size: 24px;
  color: #333;
}

.main__student-name {
  margin-top: 10px;
  font-weight: 500;
  color: #555;
}

.stats {
  display: flex;
  gap: 20px;
  margin: 30px 0;
}

.stat-box {
  flex: 1;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 3px 6px rgba(0,0,0,0.05);
}

.negative div {
  color: #e53935;
  font-weight: bold;
}

.subject-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.subject-table th,
.subject-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
}

.subject-table th {
  background-color: #f5f5f5;
  color: #333;
}

.subject-table tr:last-child td {
  border-bottom: none;
}
</style>
