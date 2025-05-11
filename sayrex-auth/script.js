let users = [
  {
    id: 1,
    username: "Admin",
    hwid: "-",
    ip: "192.168.1.1",
    createdAt: "2025-05-01 @ 7:57 PM",
    lastLogin: "2025-05-06 @ 2:03 AM",
    banned: false
  },
  {
    id: 2,
    username: "SayrexTest",
    hwid: "-",
    ip: "192.168.1.45",
    createdAt: "2025-05-02 @ 3:06 AM",
    lastLogin: "2025-05-11 @ 9:40 PM",
    banned: true
  }
];


function renderUsers() {
  const tableBody = document.getElementById("usersTableBody");
  tableBody.innerHTML = "";

  users.forEach(user => {
    const row = document.createElement("tr");
    row.className = "hover:bg-gray-750";
    row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap">
        <input type="checkbox" class="user-checkbox rounded border-gray-500" data-id="${user.id}">
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center">
          <div class="flex-shrink-0 h-10 w-10 bg-gray-700 rounded-full flex items-center justify-center">
            <i class="fas fa-user text-blue-400"></i>
          </div>
          <div class="ml-4">
            <div class="text-sm font-medium">${user.username}</div>
          </div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-300 font-mono">${user.hwid}</div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-700 text-green-300">
          ${user.ip}
        </span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
        ${user.createdAt}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
        ${user.lastLogin}
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
          user.banned ? 'bg-red-900 text-red-300' : 'bg-green-900 text-green-300'
        }">
          ${user.banned ? 'Banned' : 'Active'}
        </span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div class="flex space-x-2">
          <button onclick="toggleBan(${user.id})" class="action-btn ${user.banned ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}">
            <i class="fas ${user.banned ? 'fa-unlock' : 'fa-ban'}"></i>
          </button>
          <button onclick="deleteSingleUser(${user.id})" class="action-btn bg-gray-600 hover:bg-gray-700">
            <i class="fas fa-trash"></i>
          </button>
          <button onclick="editUser(${user.id})" class="action-btn bg-blue-600 hover:bg-blue-700">
            <i class="fas fa-edit"></i>
          </button>
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}


function toggleBan(id) {
  const user = users.find(u => u.id === id);
  if (user) {
    user.banned = !user.banned;
    showAlert(`User <strong>${user.username}</strong> ${user.banned ? 'banned' : 'unbanned'}`, 
              user.banned ? 'red' : 'green');
    renderUsers();
  }
}

function deleteSingleUser(id) {
  const user = users.find(u => u.id === id);
  if (confirm(`Delete user ${user.username} permanently?`)) {
    users = users.filter(u => u.id !== id);
    showAlert(`User <strong>${user.username}</strong> deleted`, 'red');
    renderUsers();
  }
}

function editUser(id) {
  const user = users.find(u => u.id === id);
  showAlert(`Editing user <strong>${user.username}</strong>`, 'blue');

}


function deleteAllUsers() {
  if (users.length === 0) {
    showAlert("No users to delete", "yellow");
    return;
  }
  
  if (confirm(`Delete ALL ${users.length} users permanently?`)) {
    users = [];
    showAlert("All users deleted", "red");
    renderUsers();
  }
}

function resetAllHWID() {
  users.forEach(user => {
    user.hwid = "RESET-" + Math.random().toString(36).substr(2, 8);
  });
  showAlert("All HWIDs reset", "blue");
  renderUsers();
}

function unbanAllUsers() {
  users.forEach(user => user.banned = false);
  showAlert("All users unbanned", "green");
  renderUsers();
}


function showAlert(message, color = 'blue') {
  const alert = document.createElement("div");
  alert.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-xl flex items-center ${
    color === 'red' ? 'bg-red-900/80' : 
    color === 'green' ? 'bg-green-900/80' : 
    color === 'yellow' ? 'bg-yellow-900/80' : 'bg-blue-900/80'
  } text-white animate-fade-in`;
  
  alert.innerHTML = `
    <i class="fas ${
      color === 'red' ? 'fa-times-circle' : 
      color === 'green' ? 'fa-check-circle' : 
      color === 'yellow' ? 'fa-exclamation-triangle' : 'fa-info-circle'
    } mr-3 text-lg"></i>
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" class="ml-4 text-gray-300 hover:text-white">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  document.body.appendChild(alert);
  setTimeout(() => alert.remove(), 5000);
}


document.addEventListener("DOMContentLoaded", () => {
  renderUsers();
  

  document.querySelectorAll('.admin-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = e.target.closest('button').getAttribute('data-action');
      if (action === 'delete-all') deleteAllUsers();
      if (action === 'reset-hwid') resetAllHWID();
      if (action === 'unban-all') unbanAllUsers();
    });
  });
});