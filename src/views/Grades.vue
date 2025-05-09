// GradeUpdateSystem.vue
<template>
  <div class="grade-system">
    <div v-if="currentView === 'main'" class="main-view">
      <h2 class="header">Real-Time Grade Update Stream</h2>
      
      <div class="search-container">
        <input type="text" placeholder="search student id" v-model="searchQuery" class="search-input">
      </div>
      
      <div class="grades-table">
        <div class="table-header">
          <div class="student-id-col">student id</div>
          <div class="gpa-col">average gpa</div>
          <div class="edit-col">edit grade</div>
        </div>
        
        <div v-for="(student, index) in filteredStudents" :key="index" class="table-row">
          <div class="student-id-col">{{ student.id }}</div>
          <div class="gpa-col">{{ student.gpa }}</div>
          <div class="edit-col">
            <button class="edit-button" @click="editStudent(student)">edit grade</button>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else-if="currentView === 'subject-select'" class="subject-select-view">
      <h2 class="header">EDIT GRADE</h2>
      <h3 class="sub-header">STUDENT ID</h3>
      
      <div class="subject-container">
        <div class="subject-label">Subject</div>
        <div class="subject-dropdown">
          <div class="selected-subject" @click="toggleDropdown">{{ selectedSubject }}</div>
          <div class="dropdown-arrow">▼</div>
          
          <div v-if="showDropdown" class="dropdown-options">
            <div 
              v-for="subject in subjects" 
              :key="subject" 
              class="dropdown-option"
              @click="selectSubject(subject)"
            >
              {{ subject }}
            </div>
          </div>
        </div>
        
        <div class="grade-info">
          <div class="grade-label">Previous Grade:</div>
          <div class="grade-value">{{ currentStudent.previousGrade }}</div>
        </div>
        
        <div class="grade-info">
          <div class="grade-label">Corrected Grade:</div>
          <input type="text" v-model="correctedGrade" class="grade-input" />
        </div>
        
        <div class="buttons">
          <button class="cancel-button" @click="cancelEdit">Cancel</button>
          <button class="submit-button" @click="proceedToCorrection">Submit Grade</button>
        </div>
      </div>
    </div>
    
    <div v-else-if="currentView === 'correction'" class="correction-view">
      <h2 class="header">Edit Grade - {{ currentStudent.name }} ({{ currentStudent.course }})</h2>
      
      <div class="correction-form">
        <div class="grade-info">
          <div class="grade-label">Previous Grade:</div>
          <div class="grade-value">{{ currentStudent.previousGrade }}</div>
        </div>
        
        <div class="grade-info">
          <div class="grade-label">Correct Grade:</div>
          <div class="grade-value">{{ correctedGrade }}</div>
        </div>
        
        <div class="grade-info">
          <div class="grade-label">Date of Correction:</div>
          <input type="text" class="date-input" />
        </div>
        
        <div class="grade-info">
          <div class="grade-label">Note (optional):</div>
          <textarea class="note-input"></textarea>
        </div>
        
        <div class="impact-info">
          <div class="impact-label">GPA Impact:</div>
          <div class="impact-value">-0.05 → +0.03</div>
        </div>
        
        <div class="impact-info">
          <div class="impact-label">Z-score Impact:</div>
          <div class="impact-value">-0.03 → +0.06</div>
        </div>
        
        <div class="buttons">
          <button class="cancel-button" @click="cancelCorrection">Cancel</button>
          <button class="submit-button" @click="submitCorrection">Submit Correction</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GradeUpdateSystem',
  data() {
    return {
      currentView: 'main', // 'main', 'subject-select', 'correction'
      searchQuery: '',
      students: [
        { id: 'STU123456', name: 'Juan Dela Cruz', gpa: '3.45', previousGrade: '2.50', course: 'CSPC 112' },
        { id: 'STU123457', name: 'Maria Santos', gpa: '3.20', previousGrade: '2.75', course: 'CS101' },
        { id: 'STU123458', name: 'Pedro Reyes', gpa: '3.67', previousGrade: '3.00', course: 'CS102' },
        { id: 'STU123459', name: 'Ana Garcia', gpa: '3.52', previousGrade: '2.25', course: 'CS103' },
        { id: 'STU123460', name: 'Carlos Lim', gpa: '3.15', previousGrade: '2.50', course: 'CSPC 112' },
        { id: 'STU123461', name: 'Sofia Tan', gpa: '3.88', previousGrade: '3.75', course: 'CS101' },
        { id: 'STU123462', name: 'Luis Mendoza', gpa: '3.42', previousGrade: '3.25', course: 'CS102' },
      ],
      currentStudent: null,
      subjects: ['CS101', 'CS102', 'CS103'],
      selectedSubject: 'CS101',
      showDropdown: false,
      correctedGrade: '',
    };
  },
  computed: {
    filteredStudents() {
      if (!this.searchQuery) {
        return this.students;
      }
      
      const query = this.searchQuery.toLowerCase();
      return this.students.filter(student => 
        student.id.toLowerCase().includes(query) || 
        student.name.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    editStudent(student) {
      this.currentStudent = student;
      this.selectedSubject = 'CS101';
      this.correctedGrade = student.previousGrade;
      this.currentView = 'subject-select';
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    selectSubject(subject) {
      this.selectedSubject = subject;
      this.showDropdown = false;
    },
    cancelEdit() {
      this.currentView = 'main';
      this.currentStudent = null;
    },
    proceedToCorrection() {
      this.currentView = 'correction';
    },
    cancelCorrection() {
      this.currentView = 'subject-select';
    },
    submitCorrection() {
      // Here you would typically call an API to update the grade
      alert(`Grade correction submitted for ${this.currentStudent.name}: ${this.correctedGrade}`);
      this.currentView = 'main';
      this.currentStudent = null;
    }
  }
};
</script>

<style scoped>
.grade-system {
  font-family: Arial, sans-serif;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  position: relative;
}

/* Main View Styles */
.main-view {
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  min-height: 500px;
}

.header {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.search-container {
  padding: 16px;
}

.search-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.grades-table {
  padding: 0 16px 16px;
}

.table-header, .table-row {
  display: flex;
  border-bottom: 1px solid #eee;
  padding: 12px 0;
}

.student-id-col {
  flex: 1;
}

.gpa-col {
  flex: 1;
}

.edit-col {
  flex: 1;
  text-align: right;
}

.edit-button {
  background-color: #f0f0f0;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 4px;
}

.edit-button:hover {
  background-color: #e0e0e0;
}



/* Subject Select View Styles */
.subject-select-view {
  background-color: #f0f0f0;
  padding: 20px;
}

.sub-header {
  margin-top: 0;
  font-size: 16px;
}

.subject-container {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.subject-label {
  margin-bottom: 8px;
  font-weight: bold;
}

.subject-dropdown {
  display: flex;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  position: relative;
  cursor: pointer;
}

.selected-subject {
  flex: 1;
  padding: 8px;
}

.dropdown-arrow {
  padding: 8px;
  background-color: #f8f8f8;
}

.dropdown-options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ddd;
  border-top: none;
  z-index: 10;
}

.dropdown-option {
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.dropdown-option:hover {
  background-color: #f8f8f8;
}

.grade-info {
  display: flex;
  margin-bottom: 12px;
  align-items: center;
}

.grade-label {
  width: 120px;
  font-weight: bold;
}

.grade-value {
  flex: 1;
}

.grade-input {
  flex: 1;
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 2px;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.cancel-button {
  background-color: #f0f0f0;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  margin-right: 8px;
}

.submit-button {
  background-color: #ddd;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
}

/* Correction View Styles */
.correction-view {
  background-color: #f0f0f0;
  padding: 16px;
}

.correction-form {
  background-color: white;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.date-input {
  flex: 1;
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 2px;
}

.note-input {
  flex: 1;
  padding: 4px 8px;
  height: 60px;
  border: 1px solid #ddd;
  border-radius: 2px;
  resize: vertical;
}

.impact-info {
  display: flex;
  margin-bottom: 12px;
}

.impact-label {
  width: 120px;
  font-weight: bold;
}

.impact-value {
  flex: 1;
}
</style>