let workouts = [];
let goal = { calories: 0, duration: 0 };

const ctx = document.getElementById('progressChart').getContext('2d');
const progressChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Calories Burned',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
        borderRadius: 8
      },
      {
        label: 'Duration (mins)',
        data: [],
        backgroundColor: 'rgba(153, 102, 255, 0.8)',
        borderRadius: 8
      }
    ]
  },
  options: {
    responsive: true,
    animation: {
      duration: 1200,
      easing: 'easeOutBounce'
    },
    plugins: {
      legend: { position: 'top' }
    }
  }
});

// Handle Workout Form Submission
$('#workoutForm').on('submit', function (e) {
  e.preventDefault();
  const type = $('#workoutType').val();
  const duration = parseInt($('#duration').val());
  const calories = parseInt($('#calories').val());

  workouts.push({ type, duration, calories });

  // Animate row insertion
  $('#workoutTable tbody').append(`
    <tr class="animate__animated animate__fadeIn">
      <td>${type}</td>
      <td>${duration}</td>
      <td>${calories}</td>
    </tr>
  `);

  // Update Chart
  progressChart.data.labels.push(type);
  progressChart.data.datasets[0].data.push(calories);
  progressChart.data.datasets[1].data.push(duration);
  progressChart.update();

  // Reset Form
  this.reset();

  updateGoalStatus();
});

// Handle Goal Form Submission
$('#goalForm').on('submit', function (e) {
  e.preventDefault();
  goal.calories = parseInt($('#goalCalories').val());
  goal.duration = parseInt($('#goalDuration').val());
  updateGoalStatus();
});

// Update Goal Status
function updateGoalStatus() {
  const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0);
  const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0);

  let status = `Calories: ${totalCalories}/${goal.calories} | Duration: ${totalDuration}/${goal.duration}`;

  if (goal.calories && totalCalories >= goal.calories && goal.duration && totalDuration >= goal.duration) {
    status += ' ✅ Goal Achieved!';
    $('#goalStatus').addClass('animate__animated animate__pulse');
  }

  $('#goalStatus').text(status);
}
