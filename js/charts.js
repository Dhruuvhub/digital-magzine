/* ================================================
   PARALLEL FUTURES — Chart.js Configurations
   ================================================ */

// Chart.js default styling
const chartDefaults = {
  color: 'rgba(255, 255, 255, 0.7)',
  borderColor: 'rgba(255, 255, 255, 0.1)',
  font: {
    family: "'IBM Plex Mono', monospace",
    size: 11
  }
};

// Colors
const URBAN_COLOR = '#2563EB';
const URBAN_COLOR_LIGHT = 'rgba(37, 99, 235, 0.2)';
const RURAL_COLOR = '#B45309';
const RURAL_COLOR_LIGHT = 'rgba(180, 83, 9, 0.2)';
const ACCENT_COLOR = '#F59E0B';

// Common options
function getCommonOptions(titleText) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: 'easeOutQuart'
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: chartDefaults.color,
          font: chartDefaults.font,
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleFont: { family: "'IBM Plex Mono', monospace", size: 12 },
        bodyFont: { family: "'Inter', sans-serif", size: 13 },
        padding: 14,
        cornerRadius: 8,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        ticks: { color: chartDefaults.color, font: chartDefaults.font },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        border: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      y: {
        ticks: { color: chartDefaults.color, font: chartDefaults.font },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        border: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    }
  };
}

// ===== CHART INSTANCES (created lazily via IntersectionObserver) =====
const chartInstances = {};

// Page 4: Internet Penetration 2000–2010
function createInternetChart2005() {
  const ctx = document.getElementById('chartInternet2005');
  if (!ctx || chartInstances.internet2005) return;

  const options = getCommonOptions();
  options.scales.y.min = 0;
  options.scales.y.max = 25;
  options.scales.y.ticks.callback = (v) => v + '%';

  chartInstances.internet2005 = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2000', '2002', '2004', '2006', '2008', '2010'],
      datasets: [
        {
          label: 'Urban',
          data: [1.5, 3, 7, 12, 16, 22],
          borderColor: URBAN_COLOR,
          backgroundColor: URBAN_COLOR_LIGHT,
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 8,
          pointBackgroundColor: URBAN_COLOR
        },
        {
          label: 'Rural',
          data: [0.1, 0.3, 0.5, 1, 2, 4],
          borderColor: RURAL_COLOR,
          backgroundColor: RURAL_COLOR_LIGHT,
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 8,
          pointBackgroundColor: RURAL_COLOR
        }
      ]
    },
    options
  });
}

// Page 5: Education Gap Bar Chart 2015
function createGapChart2015() {
  const ctx = document.getElementById('chartGap2015');
  if (!ctx || chartInstances.gap2015) return;

  const options = getCommonOptions();
  options.scales.y.max = 100;
  options.scales.y.ticks.callback = (v) => v + '%';
  options.indexAxis = 'x';

  chartInstances.gap2015 = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Literacy Rate', 'Computer Labs', 'Qualified Teachers', 'Completion Rate'],
      datasets: [
        {
          label: 'Urban',
          data: [88, 60, 85, 78],
          backgroundColor: URBAN_COLOR,
          borderRadius: 6,
          barPercentage: 0.6,
          categoryPercentage: 0.7
        },
        {
          label: 'Rural',
          data: [68, 8, 52, 56],
          backgroundColor: RURAL_COLOR,
          borderRadius: 6,
          barPercentage: 0.6,
          categoryPercentage: 0.7
        }
      ]
    },
    options
  });
}

// Page 8: Dropout Rates
function createDropoutChart() {
  const ctx = document.getElementById('chartDropout');
  if (!ctx || chartInstances.dropout) return;

  const options = getCommonOptions();
  options.scales.y.max = 40;
  options.scales.y.ticks.callback = (v) => v + '%';

  chartInstances.dropout = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Primary', 'Upper Primary', 'Secondary', 'Sr. Secondary'],
      datasets: [
        {
          label: 'Urban',
          data: [2.8, 4.5, 9.2, 14.1],
          backgroundColor: URBAN_COLOR,
          borderRadius: 6,
          barPercentage: 0.6
        },
        {
          label: 'Rural',
          data: [6.5, 12.3, 21.7, 34.5],
          backgroundColor: RURAL_COLOR,
          borderRadius: 6,
          barPercentage: 0.6
        }
      ]
    },
    options
  });
}

// Page 8: Teacher-Student Ratio
function createTeacherChart() {
  const ctx = document.getElementById('chartTeacher');
  if (!ctx || chartInstances.teacher) return;

  const options = getCommonOptions();
  options.scales.y.ticks.callback = (v) => '1:' + v;

  chartInstances.teacher = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2010', '2013', '2016', '2019', '2022', '2025'],
      datasets: [
        {
          label: 'Urban',
          data: [32, 30, 27, 25, 24, 22],
          borderColor: URBAN_COLOR,
          backgroundColor: URBAN_COLOR_LIGHT,
          fill: true,
          tension: 0.3,
          pointRadius: 5,
          pointBackgroundColor: URBAN_COLOR
        },
        {
          label: 'Rural',
          data: [42, 40, 38, 36, 35, 33],
          borderColor: RURAL_COLOR,
          backgroundColor: RURAL_COLOR_LIGHT,
          fill: true,
          tension: 0.3,
          pointRadius: 5,
          pointBackgroundColor: RURAL_COLOR
        }
      ]
    },
    options
  });
}

// Page 8: Internet Access
function createInternetAccessChart() {
  const ctx = document.getElementById('chartInternet');
  if (!ctx || chartInstances.internet) return;

  const options = getCommonOptions();
  options.scales.y.max = 100;
  options.scales.y.ticks.callback = (v) => v + '%';

  chartInstances.internet = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2015', '2017', '2019', '2021', '2023', '2025'],
      datasets: [
        {
          label: 'Urban',
          data: [42, 56, 68, 75, 83, 89],
          borderColor: URBAN_COLOR,
          backgroundColor: URBAN_COLOR_LIGHT,
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: URBAN_COLOR
        },
        {
          label: 'Rural',
          data: [12, 18, 25, 31, 38, 48],
          borderColor: RURAL_COLOR,
          backgroundColor: RURAL_COLOR_LIGHT,
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: RURAL_COLOR
        }
      ]
    },
    options
  });
}

// Page 8: Higher Education Enrollment
function createEnrollmentChart() {
  const ctx = document.getElementById('chartEnrollment');
  if (!ctx || chartInstances.enrollment) return;

  const options = getCommonOptions();
  options.scales.y.max = 50;
  options.scales.y.ticks.callback = (v) => v + '%';

  chartInstances.enrollment = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2010', '2013', '2016', '2019', '2022', '2025'],
      datasets: [
        {
          label: 'Urban',
          data: [28, 31, 35, 38, 42, 46],
          backgroundColor: URBAN_COLOR,
          borderRadius: 6,
          barPercentage: 0.5
        },
        {
          label: 'Rural',
          data: [12, 14, 17, 20, 23, 27],
          backgroundColor: RURAL_COLOR,
          borderRadius: 6,
          barPercentage: 0.5
        }
      ]
    },
    options
  });
}

// Export chart creation functions
window.PFCharts = {
  createInternetChart2005,
  createGapChart2015,
  createDropoutChart,
  createTeacherChart,
  createInternetAccessChart,
  createEnrollmentChart
};
