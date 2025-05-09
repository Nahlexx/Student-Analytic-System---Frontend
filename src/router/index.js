import { createRouter, createWebHistory } from 'vue-router';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import StudentReport from '@/views/StudentReport.vue';
import AtRisk from '@/views/AtRisk.vue';
import Analytics from '@/views/Analytics.vue';
import Comparison from '@/views/Comparison.vue';
import Grades from '@/views/Grades.vue';

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    children: [
      { path: '', redirect: 'report' },
      { path: 'report', component: StudentReport },
      { path: 'at-risk', component: AtRisk },
      { path: 'analytics', component: Analytics },
      { path: 'comparison', component: Comparison },
      { path: 'grades', component: Grades }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
