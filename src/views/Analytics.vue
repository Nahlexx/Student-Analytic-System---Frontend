<template>
  <div class="subject-analytics">
    <h1 class="title">SUBJECT ANALYTICS</h1>
    
    <div class="filter-section">
      <div class="dropdowns">
        <div class="dropdown">
          <select v-model="selectedYear">
            <option value="all">All Years</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
        <div class="dropdown">
          <select v-model="selectedSemester">
            <option value="all">All Semesters</option>
            <option v-for="semester in semesters" :key="semester" :value="semester">{{ semester }}</option>
          </select>
        </div>
        <div class="dropdown">
          <select v-model="sortByPassingRate">
            <option value="none">Sort by Passing Rate</option>
            <option value="high">Highest First</option>
            <option value="low">Lowest First</option>
          </select>
        </div>
      </div>
      
      <div class="filter-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="4" y1="6" x2="20" y2="6"></line>
          <line x1="7" y1="12" x2="17" y2="12"></line>
          <line x1="10" y1="18" x2="14" y2="18"></line>
        </svg>
      </div>
    </div>
    
    <div class="analytics-table">
      <div class="table-header">
        <div class="header-cell subject-code">SUBJECT CODE</div>
        <div class="header-cell average-grade">AVERAGE GRADE</div>
        <div class="header-cell passing-rate">PASSING RATE</div>
      </div>
      
      <div v-for="(subject, index) in filteredSubjects" :key="index" class="table-row" :class="{ 'shaded': index % 2 === 0 }">
        <div class="table-cell subject-code">{{ subject.code }}</div>
        <div class="table-cell average-grade">{{ subject.averageGrade }}</div>
        <div class="table-cell passing-rate">
          <div class="passing-rate-chart">
            <div class="chart-dots">
              <div class="dot" :class="{ 'active': subject.passingRate >= 'low' }"></div>
              <div class="dot" :class="{ 'active': subject.passingRate >= 'med' }"></div>
              <div class="dot" :class="{ 'active': subject.passingRate >= 'high' }"></div>
            </div>
            <div class="chart-labels">
              <span>low</span>
              <span>med</span>
              <span>high</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubjectAnalytics',
  data() {
    return {
      selectedYear: 'all',
      selectedSemester: 'all',
      sortByPassingRate: 'none',
      years: ['2023', '2024', '2025'],
      semesters: ['1st Semester', '2nd Semester', 'Summer'],
      passingRateValue: {
        'low': 1,
        'med': 2,
        'high': 3
      },
      subjectData: [
        {
          code: 'CSELEC 3',
          averageGrade: '1.5784',
          passingRate: 'high',
          year: '2024',
          semester: '1st Semester'
        },
        {
          code: 'CSPC 112',
          averageGrade: '1.7590',
          passingRate: 'med',
          year: '2024',
          semester: '1st Semester'
        },
        {
          code: 'SSPE 111',
          averageGrade: '2.0753',
          passingRate: 'low',
          year: '2024',
          semester: '2nd Semester'
        },
        {
          code: 'MSTE 111',
          averageGrade: '2.7094',
          passingRate: 'low',
          year: '2023',
          semester: '2nd Semester'
        },
        {
          code: 'MATH 214',
          averageGrade: '1.8920',
          passingRate: 'med',
          year: '2023',
          semester: '1st Semester'
        },
        {
          code: 'PHYS 101',
          averageGrade: '2.1450',
          passingRate: 'med',
          year: '2025',
          semester: 'Summer'
        }
      ]
    }
  },
  computed: {
    filteredSubjects() {
      // First filter by year and semester
      let filtered = this.subjectData.filter(subject => {
        const yearMatch = this.selectedYear === 'all' || subject.year === this.selectedYear;
        const semesterMatch = this.selectedSemester === 'all' || subject.semester === this.selectedSemester;
        return yearMatch && semesterMatch;
      });
      
      // Then sort by passing rate if selected
      if (this.sortByPassingRate !== 'none') {
        filtered.sort((a, b) => {
          const aValue = this.passingRateValue[a.passingRate];
          const bValue = this.passingRateValue[b.passingRate];
          
          if (this.sortByPassingRate === 'high') {
            return bValue - aValue; // Highest first
          } else {
            return aValue - bValue; // Lowest first
          }
        });
      }
      
      return filtered;
    }
  }
}
</script>

<style scoped>
.subject-analytics {
  background-color: white;
  padding: 24px;
  font-family: Arial, sans-serif;
  position: relative;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.filter-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.dropdowns {
  display: flex;
  gap: 16px;
}

.dropdown select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 14px;
  cursor: pointer;
}

.filter-icon {
  cursor: pointer;
}

.analytics-table {
  width: 100%;
}

.table-header {
  display: flex;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
  font-size: 14px;
  padding-bottom: 8px;
}

.table-row {
  display: flex;
  padding: 12px 0;
}

.shaded {
  background-color: #f5f5f5;
}

.header-cell, .table-cell {
  flex: 1;
}

.subject-code {
  flex: 1;
}

.average-grade {
  flex: 1;
  text-align: center;
}

.passing-rate {
  flex: 1;
  text-align: right;
}

.passing-rate-chart {
  display: inline-block;
  width: 100px;
}

.chart-dots {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ddd;
}

.dot.active {
  background-color: #000;
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
}
</style>