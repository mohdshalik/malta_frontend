// modal popup open js in salary component


$(document).ready(function () {
    $('#is_fixed').change(function () {
      if (!$(this).is(':checked')) {
        $('#myModal').modal('show'); // Show modal if unchecked
      }
    });
  });






//   value get textarea in salary component

  $('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
    var $this = $(this),
        label = $this.prev('label');
  
        if (e.type === 'keyup') {
              if ($this.val() === '') {
            label.removeClass('active highlight');
          } else {
            label.addClass('active highlight');
          }
      } else if (e.type === 'blur') {
          if( $this.val() === '' ) {
              label.removeClass('active highlight'); 
              } else {
              label.removeClass('highlight');   
              }   
      } else if (e.type === 'focus') {
        
        if( $this.val() === '' ) {
              label.removeClass('highlight'); 
              } 
        else if( $this.val() !== '' ) {
              label.addClass('highlight');
              }
      }
  
  });
  
  $('.tab a').on('click', function (e) {
    
    e.preventDefault();
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    
    target = $(this).attr('href');
  
    $('.tab-content > div').not(target).hide();
    
    $(target).fadeIn(600);
    
  });





// chevron code in salary component

  document.addEventListener('DOMContentLoaded', function () {
    const chevron = document.getElementById('toggleChevron');
    const content = document.getElementById('expandContent');

    chevron.addEventListener('click', () => {
        if (content.style.display === 'none') {
            content.style.display = 'block';
            chevron.classList.remove('bi-chevron-down');
            chevron.classList.add('bi-chevron-up');
        } else {
            content.style.display = 'none';
            chevron.classList.remove('bi-chevron-up');
            chevron.classList.add('bi-chevron-down');
        }
    });
}); 





// get employee


document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem('access_token');

    fetch('http://127.0.0.1:8001/employee/employee/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch employee");
      return response.json();
    })
    .then(companies => {
      const companySelect = document.getElementById("employee");

      companies.forEach(employee => {
        const option = document.createElement("option");
        option.value = employee.id;
        option.textContent = employee.emp_code;
        companySelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error("Error fetching Employee list:", error);
    });
  });



  // get Salary Component 


document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem('access_token');

    fetch('http://127.0.0.1:8001/employee/salarycomponent/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch component");
      return response.json();
    })
    .then(companies => {
      const companySelect = document.getElementById("component");

      companies.forEach(component => {
        const option = document.createElement("option");
        option.value = component.id;
        option.textContent = component.name;
        companySelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error("Error fetching component list:", error);
    });
  });






//   <!-- post employee salart -->



  document.getElementById('salarycomponent').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    const token = localStorage.getItem('access_token'); // If your API requires authentication

  const data = {
    amount: document.getElementById('amount').value,
    employee: document.getElementById('employee').value,
    component: document.getElementById('component').value,
    is_active: document.getElementById('is_active').checked,

};

    fetch('http://127.0.0.1:8001/employee/employeesalary/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // Remove this line if your API doesn't require login
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) throw new Error("Failed to register user.");
      return response.json();
    })
    .then(result => {
      alert('Employee Salary  Assigned successfully!');
      document.getElementById('salarycomponent').reset();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error registering user.');
    });
  });




// employee salary table view get method


document.getElementById('logoutBtn').addEventListener('click', function (e) {
    e.preventDefault();

    // Clear token or any other user session data
    localStorage.removeItem('access_token');

    // Optional: Clear any other session keys
    // localStorage.clear();

    // Redirect to login page
    window.location.href = 'login.html';  // Update this path if needed
  });